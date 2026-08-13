#!/bin/bash
set -e

echo "Installing certificate PDF + verification layer..."

if [ ! -f package.json ]; then
  echo "ERROR: Run this script from the root of myacademictutor-premium."
  exit 1
fi

echo "Installing pdf-lib..."
npm install pdf-lib

mkdir -p "supabase"
cat > 'supabase/certificate_issuance_and_verification.sql' <<'__MAT_EOF__'
-- ============================================================================
-- MY ACADEMIC TUTOR
-- Certificate issuance + public verification
-- Run this in Supabase SQL Editor.
-- ============================================================================

create table if not exists public.certificates (
  id uuid primary key default gen_random_uuid(),

  user_id uuid not null
    references auth.users(id)
    on delete cascade,

  course_slug text not null,

  certificate_code text not null
    unique,

  learner_name text not null,

  course_title text not null,

  completed_at timestamptz not null,

  final_assessment_percentage numeric(5,2),

  issued_at timestamptz not null
    default now(),

  revoked_at timestamptz,

  created_at timestamptz not null
    default now(),

  unique (
    user_id,
    course_slug
  ),

  check (
    final_assessment_percentage is null
    or (
      final_assessment_percentage >= 0
      and final_assessment_percentage <= 100
    )
  )
);


alter table public.certificates
enable row level security;


drop policy if exists
"Users can view own certificates"
on public.certificates;


create policy
"Users can view own certificates"
on public.certificates
for select
using (
  auth.uid() = user_id
);


drop policy if exists
"Users can insert own certificates"
on public.certificates;


create policy
"Users can insert own certificates"
on public.certificates
for insert
with check (
  auth.uid() = user_id
);


-- Public certificate verification is exposed only through this restricted
-- function. It returns certificate fields but never user_id or account data.
create or replace function public.verify_certificate(
  p_certificate_code text
)
returns table (
  certificate_code text,
  learner_name text,
  course_title text,
  completed_at timestamptz,
  final_assessment_percentage numeric,
  issued_at timestamptz,
  status text
)
language sql
security definer
set search_path = public
stable
as $$
  select
    c.certificate_code,
    c.learner_name,
    c.course_title,
    c.completed_at,
    c.final_assessment_percentage,
    c.issued_at,
    case
      when c.revoked_at is null
        then 'valid'::text
      else 'revoked'::text
    end as status
  from public.certificates c
  where upper(c.certificate_code) =
        upper(trim(p_certificate_code))
  limit 1;
$$;


revoke all
on function public.verify_certificate(text)
from public;


grant execute
on function public.verify_certificate(text)
to anon, authenticated;
__MAT_EOF__

mkdir -p "lib"
cat > 'lib/certificates.ts' <<'__MAT_EOF__'
import {
  randomBytes,
} from "crypto";

import {
  getCourseAssessments,
} from "@/lib/assessments";

import {
  buildCourseProgress,
} from "@/lib/course-progress";

import {
  getCourse,
} from "@/lib/data";


export type CertificateRecord = {
  id: string;
  user_id: string;
  course_slug: string;
  certificate_code: string;
  learner_name: string;
  course_title: string;
  completed_at: string;
  final_assessment_percentage:
    number | null;
  issued_at: string;
  revoked_at: string | null;
};


export function makeCertificateCode(
  courseSlug: string
) {
  const coursePart =
    courseSlug
      .split("-")
      .map(
        (part) =>
          part
            .slice(
              0,
              1
            )
            .toUpperCase()
      )
      .join("")
      .slice(
        0,
        4
      ) ||
    "COUR";


  const year =
    new Date()
      .getUTCFullYear();


  const randomPart =
    randomBytes(
      4
    )
      .toString(
        "hex"
      )
      .toUpperCase();


  return `MAT-${coursePart}-${year}-${randomPart}`;
}


export async function ensureCertificate({
  supabase,
  userId,
  courseSlug,
}: {
  supabase: any;
  userId: string;
  courseSlug: string;
}) {

  const course =
    getCourse(
      courseSlug
    );


  if (!course) {
    return {
      certificate:
        null,

      eligible:
        false,

      error:
        "Course not found.",
    };
  }


  const [
    profileResult,
    progressResult,
    attemptsResult,
    existingCertificateResult,
  ] =
    await Promise.all([

      supabase
        .from(
          "profiles"
        )
        .select(
          "full_name"
        )
        .eq(
          "id",
          userId
        )
        .maybeSingle(),

      supabase
        .from(
          "lesson_progress"
        )
        .select(
          `
            lesson_key,
            completed,
            completed_at
          `
        )
        .eq(
          "user_id",
          userId
        )
        .eq(
          "course_slug",
          courseSlug
        )
        .eq(
          "completed",
          true
        ),

      supabase
        .from(
          "assessment_attempts"
        )
        .select(
          `
            assessment_key,
            passed,
            percentage,
            submitted_at
          `
        )
        .eq(
          "user_id",
          userId
        )
        .eq(
          "course_slug",
          courseSlug
        ),

      supabase
        .from(
          "certificates"
        )
        .select(
          `
            id,
            user_id,
            course_slug,
            certificate_code,
            learner_name,
            course_title,
            completed_at,
            final_assessment_percentage,
            issued_at,
            revoked_at
          `
        )
        .eq(
          "user_id",
          userId
        )
        .eq(
          "course_slug",
          courseSlug
        )
        .maybeSingle(),
    ]);


  if (
    existingCertificateResult
      .data
  ) {
    return {
      certificate:
        existingCertificateResult
          .data as CertificateRecord,

      eligible:
        true,

      error:
        null,
    };
  }


  const completedKeys =
    (
      progressResult
        .data ??
      []
    ).map(
      (
        item: {
          lesson_key:
            string;
        }
      ) =>
        item.lesson_key
    );


  const attempts =
    attemptsResult
      .data ??
    [];


  const passedKeys =
    attempts
      .filter(
        (
          attempt: {
            passed:
              boolean;
          }
        ) =>
          attempt.passed
      )
      .map(
        (
          attempt: {
            assessment_key:
              string;
          }
        ) =>
          attempt
            .assessment_key
      );


  const summary =
    buildCourseProgress(
      courseSlug,
      completedKeys,
      passedKeys
    );


  if (
    !summary
      .certificateEligible
  ) {
    return {
      certificate:
        null,

      eligible:
        false,

      error:
        null,
    };
  }


  const finalAssessment =
    getCourseAssessments(
      courseSlug
    )
      .find(
        (assessment) =>
          assessment.type ===
          "final-assessment"
      );


  const finalAttempts =
    finalAssessment
      ? attempts.filter(
          (
            attempt: {
              assessment_key:
                string;
              passed:
                boolean;
            }
          ) =>
            attempt
              .assessment_key ===
              finalAssessment.key &&
            attempt.passed
        )
      : [];


  const finalAssessmentPercentage =
    finalAttempts.length >
    0
      ? Math.max(
          ...finalAttempts.map(
            (
              attempt: {
                percentage:
                  number |
                  string;
              }
            ) =>
              Number(
                attempt
                  .percentage
              )
          )
        )
      : null;


  const completionDates = [

    ...(
      progressResult
        .data ??
      []
    )
      .map(
        (
          item: {
            completed_at:
              string |
              null;
          }
        ) =>
          item
            .completed_at
      )
      .filter(
        Boolean
      ),

    ...attempts
      .filter(
        (
          attempt: {
            passed:
              boolean;
          }
        ) =>
          attempt.passed
      )
      .map(
        (
          attempt: {
            submitted_at:
              string;
          }
        ) =>
          attempt
            .submitted_at
      ),

  ] as string[];


  const completedAt =
    completionDates.length >
    0
      ? completionDates
          .sort(
            (
              a,
              b
            ) =>
              new Date(
                b
              ).getTime() -
              new Date(
                a
              ).getTime()
          )[0]
      : new Date()
          .toISOString();


  const learnerName =
    profileResult
      .data
      ?.full_name
      ?.trim() ||
    "Learner";


  /*
   * Certificate code collisions are
   * extremely unlikely, but retry a
   * few times if the unique constraint
   * is hit.
   */
  for (
    let attemptIndex =
      0;
    attemptIndex <
      4;
    attemptIndex +=
      1
  ) {

    const certificateCode =
      makeCertificateCode(
        courseSlug
      );


    const {
      data:
        inserted,
      error:
        insertError,
    } =
      await supabase
        .from(
          "certificates"
        )
        .insert({
          user_id:
            userId,

          course_slug:
            courseSlug,

          certificate_code:
            certificateCode,

          learner_name:
            learnerName,

          course_title:
            course.title,

          completed_at:
            completedAt,

          final_assessment_percentage:
            finalAssessmentPercentage,
        })
        .select(
          `
            id,
            user_id,
            course_slug,
            certificate_code,
            learner_name,
            course_title,
            completed_at,
            final_assessment_percentage,
            issued_at,
            revoked_at
          `
        )
        .single();


    if (
      !insertError &&
      inserted
    ) {
      return {
        certificate:
          inserted as CertificateRecord,

        eligible:
          true,

        error:
          null,
      };
    }


    if (
      insertError?.code ===
      "23505"
    ) {

      const {
        data:
          nowExisting,
      } =
        await supabase
          .from(
            "certificates"
          )
          .select(
            `
              id,
              user_id,
              course_slug,
              certificate_code,
              learner_name,
              course_title,
              completed_at,
              final_assessment_percentage,
              issued_at,
              revoked_at
            `
          )
          .eq(
            "user_id",
            userId
          )
          .eq(
            "course_slug",
            courseSlug
          )
          .maybeSingle();


      if (
        nowExisting
      ) {
        return {
          certificate:
            nowExisting as CertificateRecord,

          eligible:
            true,

          error:
            null,
        };
      }


      continue;
    }


    return {
      certificate:
        null,

      eligible:
        true,

      error:
        insertError
          ?.message ??
        "Certificate could not be issued.",
    };
  }


  return {
    certificate:
      null,

    eligible:
      true,

    error:
      "Certificate code could not be generated. Please try again.",
  };
}
__MAT_EOF__

mkdir -p "app/courses/[slug]/certificate"
cat > 'app/courses/[slug]/certificate/route.ts' <<'__MAT_EOF__'
import {
  readFile,
} from "fs/promises";

import {
  join,
} from "path";

import {
  PDFDocument,
  StandardFonts,
  rgb,
} from "pdf-lib";

import {
  createClient,
} from "@/lib/supabase/server";

import {
  ensureCertificate,
} from "@/lib/certificates";


export const dynamic =
  "force-dynamic";


function formatCertificateDate(
  value: string
) {
  return new Intl
    .DateTimeFormat(
      "en-GB",
      {
        day:
          "numeric",
        month:
          "long",
        year:
          "numeric",
      }
    )
    .format(
      new Date(
        value
      )
    );
}


function safeFilename(
  value: string
) {
  return value
    .replace(
      /[^a-z0-9]+/gi,
      "-"
    )
    .replace(
      /^-+|-+$/g,
      ""
    )
    .toLowerCase();
}


export async function GET(
  _request: Request,
  {
    params,
  }: {
    params:
      Promise<{
        slug:
          string;
      }>;
  }
) {

  const {
    slug,
  } =
    await params;


  const supabase =
    await createClient();


  const {
    data:
      claimsData,
    error:
      claimsError,
  } =
    await supabase
      .auth
      .getClaims();


  const userId =
    typeof claimsData
      ?.claims
      ?.sub ===
    "string"
      ? claimsData
          .claims
          .sub
      : null;


  if (
    claimsError ||
    !userId
  ) {
    return new Response(
      "Sign in required.",
      {
        status:
          401,
      }
    );
  }


  const result =
    await ensureCertificate({
      supabase,
      userId,
      courseSlug:
        slug,
    });


  if (
    !result.eligible
  ) {
    return new Response(
      "Course completion requirements have not been met.",
      {
        status:
          403,
      }
    );
  }


  if (
    !result.certificate
  ) {
    return new Response(
      result.error ??
        "Certificate could not be created.",
      {
        status:
          500,
      }
    );
  }


  const certificate =
    result.certificate;


  if (
    certificate.revoked_at
  ) {
    return new Response(
      "This certificate has been revoked.",
      {
        status:
          403,
      }
    );
  }


  const pdf =
    await PDFDocument
      .create();


  const page =
    pdf.addPage([
      841.89,
      595.28,
    ]);


  const {
    width,
    height,
  } =
    page.getSize();


  const serif =
    await pdf.embedFont(
      StandardFonts
        .TimesRoman
    );


  const serifBold =
    await pdf.embedFont(
      StandardFonts
        .TimesRomanBold
    );


  const sans =
    await pdf.embedFont(
      StandardFonts
        .Helvetica
    );


  const sansBold =
    await pdf.embedFont(
      StandardFonts
        .HelveticaBold
    );


  /*
   * Palette intentionally mirrors
   * the website: warm paper, near
   * black, restrained neutral lines.
   */
  page.drawRectangle({
    x:
      0,
    y:
      0,
    width,
    height,
    color:
      rgb(
        0.965,
        0.953,
        0.929
      ),
  });


  page.drawRectangle({
    x:
      22,
    y:
      22,
    width:
      width -
      44,
    height:
      height -
      44,
    borderColor:
      rgb(
        0.10,
        0.10,
        0.10
      ),
    borderWidth:
      1.5,
  });


  page.drawRectangle({
    x:
      32,
    y:
      32,
    width:
      width -
      64,
    height:
      height -
      64,
    borderColor:
      rgb(
        0.68,
        0.65,
        0.60
      ),
    borderWidth:
      0.6,
  });


  /*
   * Logo is optional. If the file
   * cannot be embedded, certificate
   * generation still succeeds.
   */
  try {
    const logoBytes =
      await readFile(
        join(
          process.cwd(),
          "public",
          "logo.png"
        )
      );


    const logo =
      await pdf.embedPng(
        logoBytes
      );


    const logoWidth =
      112;


    const logoHeight =
      logo.height /
      logo.width *
      logoWidth;


    page.drawImage(
      logo,
      {
        x:
          (
            width -
            logoWidth
          ) /
          2,
        y:
          height -
          118,
        width:
          logoWidth,
        height:
          logoHeight,
      }
    );
  } catch {
    // Logo is decorative only.
  }


  function centeredText(
    text:
      string,
    y:
      number,
    size:
      number,
    font:
      any,
    color =
      rgb(
        0.10,
        0.10,
        0.10
      )
  ) {
    const textWidth =
      font.widthOfTextAtSize(
        text,
        size
      );


    page.drawText(
      text,
      {
        x:
          (
            width -
            textWidth
          ) /
          2,
        y,
        size,
        font,
        color,
      }
    );
  }


  centeredText(
    "CERTIFICATE OF COMPLETION",
    height -
      167,
    10,
    sansBold,
    rgb(
      0.38,
      0.36,
      0.33
    )
  );


  centeredText(
    "This certifies that",
    height -
      211,
    13,
    serif
  );


  centeredText(
    certificate
      .learner_name,
    height -
      260,
    31,
    serifBold
  );


  centeredText(
    "has successfully completed",
    height -
      298,
    13,
    serif
  );


  centeredText(
    certificate
      .course_title,
    height -
      343,
    24,
    serifBold
  );


  const completedText =
    `Completed ${formatCertificateDate(
      certificate
        .completed_at
    )}`;


  centeredText(
    completedText,
    height -
      386,
    10,
    sans,
    rgb(
      0.34,
      0.32,
      0.30
    )
  );


  if (
    certificate
      .final_assessment_percentage !==
    null
  ) {
    centeredText(
      `Final assessment: ${Number(
        certificate
          .final_assessment_percentage
      ).toFixed(
        0
      )}%`,
      height -
        408,
      9,
      sans,
      rgb(
        0.34,
        0.32,
        0.30
      )
    );
  }


  const ruleY =
    130;


  page.drawLine({
    start: {
      x:
        175,
      y:
        ruleY,
    },
    end: {
      x:
        width -
        175,
      y:
        ruleY,
    },
    thickness:
      0.7,
    color:
      rgb(
        0.58,
        0.55,
        0.51
      ),
  });


  centeredText(
    "My Academic Tutor",
    103,
    11,
    serifBold
  );


  centeredText(
    `Certificate ID: ${certificate.certificate_code}`,
    77,
    8,
    sans,
    rgb(
      0.40,
      0.38,
      0.35
    )
  );


  centeredText(
    `Verify at www.myacademictutor.com/certificate/${certificate.certificate_code}`,
    60,
    7.5,
    sans,
    rgb(
      0.40,
      0.38,
      0.35
    )
  );


  const bytes =
    await pdf.save();


  return new Response(
    bytes,
    {
      status:
        200,

      headers: {
        "Content-Type":
          "application/pdf",

        "Content-Disposition":
          `attachment; filename="${safeFilename(
            certificate
              .course_title
          )}-certificate.pdf"`,

        "Cache-Control":
          "private, no-store",
      },
    }
  );
}
__MAT_EOF__

mkdir -p "app/certificate/[code]"
cat > 'app/certificate/[code]/page.tsx' <<'__MAT_EOF__'
import type {
  Metadata,
} from "next";

import Link from "next/link";

import {
  createClient,
} from "@/lib/supabase/server";


export const dynamic =
  "force-dynamic";


export const metadata:
  Metadata = {

  title:
    "Verify Certificate",

  description:
    "Verify a My Academic Tutor course certificate.",

  robots: {
    index:
      false,
    follow:
      true,
  },
};


type PageProps = {
  params:
    Promise<{
      code:
        string;
    }>;
};


function formatDate(
  value:
    string
) {
  return new Intl
    .DateTimeFormat(
      "en-GB",
      {
        day:
          "numeric",
        month:
          "long",
        year:
          "numeric",
      }
    )
    .format(
      new Date(
        value
      )
    );
}


export default async function VerifyCertificatePage({
  params,
}: PageProps) {

  const {
    code,
  } =
    await params;


  const cleanCode =
    decodeURIComponent(
      code
    )
      .trim()
      .toUpperCase();


  const supabase =
    await createClient();


  const {
    data,
    error,
  } =
    await supabase.rpc(
      "verify_certificate",
      {
        p_certificate_code:
          cleanCode,
      }
    );


  const certificate =
    Array.isArray(
      data
    )
      ? data[0]
      : null;


  const valid =
    !error &&
    certificate &&
    certificate.status ===
      "valid";


  return (
    <main className="certificate-verify-page">

      <section className="certificate-verify-hero">
        <div className="certificate-verify-shell">

          <span>
            Certificate verification
          </span>

          <h1>
            {valid
              ? "Certificate verified."
              : "Certificate not verified."}
          </h1>

          <p>
            Certificate ID{" "}
            <strong>
              {cleanCode}
            </strong>
          </p>

        </div>
      </section>


      <section className="certificate-verify-content">
        <div className="certificate-verify-shell">

          {valid ? (

            <div className="certificate-verify-card valid">

              <div className="certificate-verify-status">
                ✓ Valid certificate
              </div>


              <dl>

                <div>
                  <dt>
                    Learner
                  </dt>

                  <dd>
                    {certificate
                      .learner_name}
                  </dd>
                </div>


                <div>
                  <dt>
                    Course
                  </dt>

                  <dd>
                    {certificate
                      .course_title}
                  </dd>
                </div>


                <div>
                  <dt>
                    Completed
                  </dt>

                  <dd>
                    {formatDate(
                      certificate
                        .completed_at
                    )}
                  </dd>
                </div>


                <div>
                  <dt>
                    Final assessment
                  </dt>

                  <dd>
                    {certificate
                      .final_assessment_percentage ===
                    null
                      ? "Not recorded"
                      : `${Number(
                          certificate
                            .final_assessment_percentage
                        ).toFixed(
                          0
                        )}%`}
                  </dd>
                </div>


                <div>
                  <dt>
                    Issued
                  </dt>

                  <dd>
                    {formatDate(
                      certificate
                        .issued_at
                    )}
                  </dd>
                </div>

              </dl>

            </div>

          ) : (

            <div className="certificate-verify-card invalid">

              <div className="certificate-verify-status">
                No valid certificate found
              </div>

              <p>
                Check the certificate
                ID carefully. A revoked
                or unknown certificate
                will not be shown as
                valid.
              </p>

            </div>

          )}


          <div className="certificate-verify-actions">

            <Link
              href="/"
              className="button"
            >
              My Academic Tutor
            </Link>


            <Link
              href="/certificate-policy"
              className="button button-outline"
            >
              Certificate policy
            </Link>

          </div>

        </div>
      </section>

    </main>
  );
}
__MAT_EOF__

mkdir -p "app/courses/[slug]/complete"
cat > 'app/courses/[slug]/complete/page.tsx' <<'__MAT_EOF__'
import type {
  Metadata,
} from "next";

import Link from "next/link";

import {
  notFound,
  redirect,
} from "next/navigation";

import {
  ensureCertificate,
} from "@/lib/certificates";

import {
  buildCourseProgress,
} from "@/lib/course-progress";

import {
  getCourse,
} from "@/lib/data";

import {
  createClient,
} from "@/lib/supabase/server";


export const dynamic =
  "force-dynamic";


export const metadata:
  Metadata = {

  title:
    "Course Completion",

  description:
    "Course completion and certificate.",

  robots: {
    index: false,
    follow: false,
  },
};


type PageProps = {
  params:
    Promise<{
      slug:
        string;
    }>;
};


export default async function CourseCompletionPage({
  params,
}: PageProps) {

  const {
    slug,
  } =
    await params;


  const course =
    getCourse(
      slug
    );


  if (!course) {
    notFound();
  }


  const supabase =
    await createClient();


  const {
    data:
      claimsData,
  } =
    await supabase
      .auth
      .getClaims();


  const userId =
    typeof claimsData
      ?.claims
      ?.sub ===
    "string"
      ? claimsData
          .claims
          .sub
      : null;


  if (!userId) {
    redirect(
      `/login?next=/courses/${slug}/complete`
    );
  }


  const [
    enrolmentResult,
    progressResult,
    attemptsResult,
  ] =
    await Promise.all([

      supabase
        .from(
          "enrollments"
        )
        .select(
          "course_slug"
        )
        .eq(
          "user_id",
          userId
        )
        .eq(
          "course_slug",
          slug
        )
        .maybeSingle(),

      supabase
        .from(
          "lesson_progress"
        )
        .select(
          "lesson_key"
        )
        .eq(
          "user_id",
          userId
        )
        .eq(
          "course_slug",
          slug
        )
        .eq(
          "completed",
          true
        ),

      supabase
        .from(
          "assessment_attempts"
        )
        .select(
          `
            assessment_key,
            percentage,
            passed
          `
        )
        .eq(
          "user_id",
          userId
        )
        .eq(
          "course_slug",
          slug
        ),
    ]);


  if (
    !enrolmentResult
      .data
  ) {
    redirect(
      `/courses/${slug}`
    );
  }


  const completedKeys =
    (
      progressResult
        .data ??
      []
    ).map(
      (item) =>
        item.lesson_key
    );


  const attempts =
    attemptsResult
      .data ??
    [];


  const passedKeys =
    attempts
      .filter(
        (attempt) =>
          attempt.passed
      )
      .map(
        (attempt) =>
          attempt
            .assessment_key
      );


  const summary =
    buildCourseProgress(
      slug,
      completedKeys,
      passedKeys
    );


  if (
    !summary
      .courseComplete
  ) {
    redirect(
      "/dashboard"
    );
  }


  const certificateResult =
    await ensureCertificate({
      supabase,
      userId,
      courseSlug:
        slug,
    });


  const certificate =
    certificateResult
      .certificate;


  const finalScores =
    attempts
      .filter(
        (attempt) =>
          attempt
            .assessment_key ===
          "final-assessment"
      )
      .map(
        (attempt) =>
          Number(
            attempt
              .percentage
          )
      );


  const finalBest =
    finalScores.length >
    0
      ? Math.max(
          ...finalScores
        )
      : null;


  return (
    <main className="course-complete-page">

      <section className="course-complete-hero">
        <div className="course-complete-shell">

          <span className="course-complete-kicker">
            Course complete
          </span>

          <div className="course-complete-mark">
            ✓
          </div>

          <h1>
            Course completed.
          </h1>

          <p>
            You have completed every
            required learning component
            for{" "}
            <strong>
              {course.title}
            </strong>.
          </p>

        </div>
      </section>


      <section className="course-complete-content">
        <div className="course-complete-shell">

          <div className="course-complete-grid">

            <article>
              <span>
                Lessons
              </span>

              <strong>
                {summary.completedLessons}
                /
                {summary.totalLessons}
              </strong>

              <p>
                All required lessons
                completed.
              </p>
            </article>


            <article>
              <span>
                Module checkpoints
              </span>

              <strong>
                {summary.passedCheckpoints}
                /
                {summary.totalCheckpoints}
              </strong>

              <p>
                Every checkpoint passed.
              </p>
            </article>


            <article>
              <span>
                Final assessment
              </span>

              <strong>
                {finalBest !==
                null
                  ? `${finalBest.toFixed(
                      0
                    )}%`
                  : "Passed"}
              </strong>

              <p>
                Final assessment
                requirement satisfied.
              </p>
            </article>

          </div>


          <section className="certificate-eligibility-card">

            <div>

              <span>
                Certificate status
              </span>

              <h2>
                Certificate issued.
              </h2>

              {certificate ? (
                <>
                  <p>
                    Your certificate ID
                    is{" "}
                    <strong>
                      {certificate
                        .certificate_code}
                    </strong>
                    . This ID can be
                    independently
                    verified on the
                    public certificate
                    verification page.
                  </p>


                  <div className="certificate-primary-actions">

                    <a
                      href={`/courses/${slug}/certificate`}
                      className="button"
                    >
                      Download certificate PDF
                    </a>


                    <Link
                      href={`/certificate/${certificate.certificate_code}`}
                      className="button button-outline"
                    >
                      Verify certificate
                    </Link>

                  </div>
                </>
              ) : (
                <p>
                  Your completion is
                  confirmed, but the
                  certificate record
                  could not be issued.
                  Please refresh this
                  page or contact
                  support.
                </p>
              )}

            </div>


            <div className="certificate-seal">
              MAT
              <small>
                Complete
              </small>
            </div>

          </section>


          <div className="course-complete-actions">

            <Link
              href="/dashboard"
              className="button"
            >
              Back to dashboard
            </Link>


            <Link
              href={`/courses/${slug}`}
              className="button button-outline"
            >
              Review course
            </Link>


            <Link
              href="/certificate-policy"
              className="button button-outline"
            >
              Certificate policy
            </Link>

          </div>

        </div>
      </section>

    </main>
  );
}
__MAT_EOF__

mkdir -p "scripts"
cat > 'scripts/audit-certificate-setup.mjs' <<'__MAT_EOF__'
import fs from "node:fs";
import path from "node:path";


const requiredFiles = [
  "lib/certificates.ts",
  "app/courses/[slug]/certificate/route.ts",
  "app/certificate/[code]/page.tsx",
  "app/courses/[slug]/complete/page.tsx",
];


let failed =
  false;


for (
  const relativePath
  of requiredFiles
) {

  const fullPath =
    path.join(
      process.cwd(),
      relativePath
    );


  if (
    fs.existsSync(
      fullPath
    )
  ) {
    console.log(
      `✓ ${relativePath}`
    );
  } else {
    failed =
      true;

    console.error(
      `✗ Missing ${relativePath}`
    );
  }
}


const packagePath =
  path.join(
    process.cwd(),
    "package.json"
  );


if (
  fs.existsSync(
    packagePath
  )
) {

  const pkg =
    JSON.parse(
      fs.readFileSync(
        packagePath,
        "utf8"
      )
    );


  const hasPdfLib =
    Boolean(
      pkg.dependencies
        ?.["pdf-lib"] ||
      pkg.devDependencies
        ?.["pdf-lib"]
    );


  if (
    hasPdfLib
  ) {
    console.log(
      "✓ pdf-lib dependency"
    );
  } else {
    failed =
      true;

    console.error(
      "✗ pdf-lib is not installed"
    );
  }
}


if (
  failed
) {
  process.exit(
    1
  );
}


console.log(
  "\nCertificate source audit passed."
);
__MAT_EOF__

mkdir -p "."
cat > 'CERTIFICATE_QA.md' <<'__MAT_EOF__'
# Statistics Foundations - Final Production QA

Use this after the certificate migration, installer and build all succeed.

## 1. Authentication and access

- Logged-out learner cannot download a certificate.
- Logged-out learner cannot open the private completion page.
- Learner who is enrolled but incomplete cannot open `/courses/statistics-foundations/complete`.
- Learner who is incomplete receives 403 from `/courses/statistics-foundations/certificate`.
- A completed learner can access both completion and PDF routes.

## 2. Learning progression

- Continue starts at the first incomplete lesson.
- A module checkpoint remains locked until every lesson in that module is complete.
- After a module checkpoint is passed, Continue advances into the next module.
- Final assessment stays locked until 26/26 lessons and 7/7 checkpoints are complete.
- Passing the final assessment changes the course to Complete.

## 3. Assessment persistence

- Failed attempts remain in Supabase.
- A later higher score becomes Previous best.
- A passed checkpoint remains passed after a later failed retake.
- Final assessment pass remains recorded after refresh.

## 4. Certificate issuance

- Only a completed learner gets a row in `public.certificates`.
- Reopening the completion page does not generate a second certificate.
- `certificate_code` is stable after issuance.
- Certificate learner name matches `profiles.full_name`.
- Certificate course title is correct.
- Completion date is sensible.
- Best passed final-assessment percentage is shown.
- PDF downloads successfully.
- PDF filename is readable.

## 5. Public verification

- `/certificate/<valid-code>` shows Valid certificate.
- Verification reveals learner name, course, completion date, score and issue date only.
- Verification does not expose user UUID, email or assessment answers.
- A made-up code returns Not verified.
- A revoked certificate does not show as valid.

## 6. PDF visual QA

Check the downloaded certificate at desktop size and when printed:

- Logo renders.
- Learner name is not clipped.
- Course title is not clipped.
- Completion date is correct.
- Certificate ID is legible.
- Verification URL is legible.
- No unexpected black boxes or missing glyphs.
- Landscape A4 proportions look balanced.

## 7. Mobile UI

Test approximately 390 px width:

- Dashboard course requirements stack correctly.
- Completion card remains readable.
- Download and Verify buttons do not overflow.
- Verification details stack correctly.
- No horizontal page scrolling.

## 8. Production build

Run:

```bash
node scripts/audit-certificate-setup.mjs
npm run build
```

Then run any existing project audits:

```bash
node scripts/audit-routes.mjs
node scripts/audit-links.mjs
node scripts/audit-content.mjs
```

## 9. Production deployment smoke test

After deploying:

1. Sign in using a test learner.
2. Open Dashboard.
3. Confirm course progress.
4. Complete or use an already-completed course.
5. Open completion page.
6. Download PDF.
7. Copy certificate ID.
8. Sign out.
9. Open public verification URL in a private/incognito window.
10. Confirm it verifies without revealing private account data.
__MAT_EOF__

if ! grep -q "CERTIFICATE DOWNLOAD + VERIFICATION" app/globals.css 2>/dev/null; then
  cat >> app/globals.css <<'__MAT_CSS_EOF__'


/* ==========================================================================
   CERTIFICATE DOWNLOAD + VERIFICATION
   ========================================================================== */

.certificate-primary-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 9px;
  margin-top: 18px;
}

.certificate-verify-page {
  min-height: 100vh;
  background: #f4f1eb;
}

.certificate-verify-shell {
  width: min(820px, calc(100% - 40px));
  margin: 0 auto;
}

.certificate-verify-hero {
  padding: 72px 0 52px;
  background: #171717;
  color: #fff;
}

.certificate-verify-hero span {
  color: #aaa49b;
  font-size: 8px;
  font-weight: 800;
  letter-spacing: .09em;
  text-transform: uppercase;
}

.certificate-verify-hero h1 {
  max-width: 700px;
  margin: 12px 0 10px;
  font-family: var(--font-serif), Georgia, serif;
  font-size: clamp(40px, 6vw, 68px);
  font-weight: 500;
  line-height: 1;
}

.certificate-verify-hero p {
  margin: 0;
  color: #c9c4bd;
  font-size: 10px;
}

.certificate-verify-hero p strong {
  color: #fff;
}

.certificate-verify-content {
  padding: 32px 0 80px;
}

.certificate-verify-card {
  padding: 28px;
  border: 1px solid #d8d2c9;
  border-radius: 16px;
  background: #fff;
}

.certificate-verify-card.valid {
  border-top: 4px solid #59735d;
}

.certificate-verify-card.invalid {
  border-top: 4px solid #95665f;
}

.certificate-verify-status {
  font-family: var(--font-serif), Georgia, serif;
  font-size: 24px;
  font-weight: 500;
}

.certificate-verify-card dl {
  display: grid;
  gap: 0;
  margin: 22px 0 0;
}

.certificate-verify-card dl > div {
  display: grid;
  grid-template-columns: 180px 1fr;
  gap: 20px;
  padding: 13px 0;
  border-top: 1px solid #e3ddd4;
}

.certificate-verify-card dt {
  color: #8a837a;
  font-size: 8px;
  font-weight: 800;
  letter-spacing: .05em;
  text-transform: uppercase;
}

.certificate-verify-card dd {
  margin: 0;
  color: #292520;
  font-size: 10px;
  line-height: 1.5;
}

.certificate-verify-card > p {
  max-width: 600px;
  margin: 12px 0 0;
  color: #716a62;
  font-size: 10px;
  line-height: 1.7;
}

.certificate-verify-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 9px;
  margin-top: 18px;
}

@media (max-width: 560px) {
  .certificate-verify-card dl > div {
    grid-template-columns: 1fr;
    gap: 5px;
  }

  .certificate-primary-actions {
    flex-direction: column;
    align-items: stretch;
  }
}
__MAT_CSS_EOF__
  echo "Certificate CSS appended to app/globals.css"
else
  echo "Certificate CSS already present; skipping duplicate append."
fi

echo ""
echo "Code installation complete."
echo ""
echo "IMPORTANT:"
echo "Run the SQL in:"
echo "  supabase/certificate_issuance_and_verification.sql"
echo "inside the Supabase SQL Editor before testing certificates."
echo ""
echo "Then run:"
echo "  node scripts/audit-certificate-setup.mjs"
echo "  npm run build"
echo ""
