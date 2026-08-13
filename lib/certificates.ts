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
