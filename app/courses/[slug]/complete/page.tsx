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
