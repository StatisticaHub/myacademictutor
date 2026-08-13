import type {
  Metadata,
} from "next";

import {
  notFound,
  redirect,
} from "next/navigation";

import AssessmentRunner from "@/components/assessments/AssessmentRunner";

import {
  getAssessment,
  getPublicQuestions,
} from "@/lib/assessments";

import {
  buildCourseProgress,
  getModuleLessonKeys,
} from "@/lib/course-progress";

import {
  createClient,
} from "@/lib/supabase/server";


export const dynamic =
  "force-dynamic";


type PageProps = {
  params: Promise<{
    slug: string;
    assessmentKey: string;
  }>;
};


export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {

  const {
    slug,
    assessmentKey,
  } =
    await params;


  const assessment =
    getAssessment(
      slug,
      assessmentKey
    );


  if (!assessment) {
    return {
      title:
        "Assessment",
    };
  }


  return {
    title:
      `${assessment.title} | My Academic Tutor`,

    description:
      assessment.description,

    robots: {
      index: false,
      follow: false,
    },
  };
}


export default async function AssessmentPage({
  params,
}: PageProps) {

  const {
    slug,
    assessmentKey,
  } =
    await params;


  const assessment =
    getAssessment(
      slug,
      assessmentKey
    );


  if (!assessment) {
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
      `/login?next=/courses/${slug}/assessment/${assessmentKey}`
    );
  }


  const [
    enrolmentResult,
    progressResult,
    passedAttemptsResult,
    previousAttemptResult,
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
          "assessment_key"
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
          "passed",
          true
        ),

      supabase
        .from(
          "assessment_attempts"
        )
        .select(
          "percentage"
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
          "assessment_key",
          assessmentKey
        )
        .order(
          "percentage",
          {
            ascending:
              false,
          }
        )
        .limit(
          1
        )
        .maybeSingle(),
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


  const passedKeys =
    (
      passedAttemptsResult
        .data ??
      []
    ).map(
      (item) =>
        item.assessment_key
    );


  const passedSet =
    new Set(
      passedKeys
    );


  /*
   * A module checkpoint unlocks
   * after every lesson in that
   * module is complete.
   *
   * If the learner has already
   * passed the checkpoint, they
   * may still revisit it.
   */
  if (
    assessment.type ===
      "module-checkpoint" &&
    typeof assessment
      .moduleNumber ===
      "number" &&
    !passedSet.has(
      assessment.key
    )
  ) {

    const requiredLessonKeys =
      getModuleLessonKeys(
        slug,
        assessment
          .moduleNumber
      );


    const completedSet =
      new Set(
        completedKeys
      );


    const moduleComplete =
      requiredLessonKeys
        .length > 0 &&
      requiredLessonKeys
        .every(
          (lessonKey) =>
            completedSet.has(
              lessonKey
            )
        );


    if (!moduleComplete) {
      redirect(
        `/courses/${slug}`
      );
    }
  }


  /*
   * The final assessment unlocks
   * only after every lesson and
   * every module checkpoint has
   * been completed.
   */
  if (
    assessment.type ===
      "final-assessment" &&
    !passedSet.has(
      assessment.key
    )
  ) {

    const summary =
      buildCourseProgress(
        slug,
        completedKeys,
        passedKeys
      );


    if (
      !summary
        .allLessonsComplete ||
      !summary
        .allCheckpointsPassed
    ) {
      redirect(
        `/courses/${slug}`
      );
    }
  }


  const previousBest =
    previousAttemptResult
      .data
      ? Number(
          previousAttemptResult
            .data
            .percentage
        )
      : null;


  const publicQuestions =
    getPublicQuestions(
      assessment
    );


  return (
    <main className="assessment-page">

      <AssessmentRunner
        courseSlug={
          slug
        }
        assessmentKey={
          assessmentKey
        }
        assessmentType={
          assessment.type
        }
        title={
          assessment.title
        }
        description={
          assessment.description
        }
        passingPercentage={
          assessment
            .passingPercentage
        }
        questions={
          publicQuestions
        }
        previousBest={
          previousBest
        }
      />

    </main>
  );
}
