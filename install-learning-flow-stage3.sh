#!/bin/bash
set -e

echo "Installing intelligent course progress, completion and certificate eligibility..."

mkdir -p "lib"
cat > 'lib/course-progress.ts' <<'__MAT_EOF__'
import {
  getCourseAssessments,
} from "@/lib/assessments";

import {
  getCourseLessons,
} from "@/lib/course-lessons";


export type CourseNextKind =
  | "lesson"
  | "checkpoint"
  | "final"
  | "complete"
  | "course";


export type FinalAssessmentStatus =
  | "not-required"
  | "locked"
  | "ready"
  | "passed";


export type CourseProgressSummary = {
  totalLessons: number;
  completedLessons: number;

  totalCheckpoints: number;
  passedCheckpoints: number;

  finalAssessmentExists: boolean;
  finalAssessmentPassed: boolean;
  finalAssessmentStatus:
    FinalAssessmentStatus;

  allLessonsComplete: boolean;
  allCheckpointsPassed: boolean;

  courseComplete: boolean;
  certificateEligible: boolean;

  overallCompletedUnits: number;
  overallTotalUnits: number;
  overallPercentage: number;

  nextHref: string;
  nextActionLabel: string;
  nextKind: CourseNextKind;
};


export function getModuleNumberFromLessonKey(
  lessonKey: string
) {
  const match =
    lessonKey.match(
      /^m(\d+)-/
    );


  if (!match) {
    return null;
  }


  return Number(
    match[1]
  );
}


export function getModuleLessonKeys(
  courseSlug: string,
  moduleNumber: number
) {
  return getCourseLessons(
    courseSlug
  )
    .filter(
      (lesson) =>
        getModuleNumberFromLessonKey(
          lesson.key
        ) ===
        moduleNumber
    )
    .map(
      (lesson) =>
        lesson.key
    );
}


export function buildCourseProgress(
  courseSlug: string,
  completedLessonKeys:
    string[],
  passedAssessmentKeys:
    string[]
): CourseProgressSummary {

  const lessons =
    getCourseLessons(
      courseSlug
    );


  const assessments =
    getCourseAssessments(
      courseSlug
    );


  const completedSet =
    new Set(
      completedLessonKeys
    );


  const passedSet =
    new Set(
      passedAssessmentKeys
    );


  const checkpoints =
    assessments
      .filter(
        (assessment) =>
          assessment.type ===
          "module-checkpoint"
      )
      .sort(
        (
          a,
          b
        ) =>
          (
            a.moduleNumber ??
            999
          ) -
          (
            b.moduleNumber ??
            999
          )
      );


  const finalAssessment =
    assessments.find(
      (assessment) =>
        assessment.type ===
        "final-assessment"
    );


  const completedLessons =
    lessons.filter(
      (lesson) =>
        completedSet.has(
          lesson.key
        )
    ).length;


  const passedCheckpoints =
    checkpoints.filter(
      (assessment) =>
        passedSet.has(
          assessment.key
        )
    ).length;


  const finalAssessmentPassed =
    Boolean(
      finalAssessment &&
      passedSet.has(
        finalAssessment.key
      )
    );


  const allLessonsComplete =
    lessons.length > 0 &&
    completedLessons ===
      lessons.length;


  const allCheckpointsPassed =
    checkpoints.every(
      (assessment) =>
        passedSet.has(
          assessment.key
        )
    );


  const courseComplete =
    allLessonsComplete &&
    allCheckpointsPassed &&
    (
      !finalAssessment ||
      finalAssessmentPassed
    );


  const certificateEligible =
    courseComplete &&
    assessments.length > 0;


  let finalAssessmentStatus:
    FinalAssessmentStatus =
      "not-required";


  if (finalAssessment) {
    if (
      finalAssessmentPassed
    ) {
      finalAssessmentStatus =
        "passed";
    } else if (
      allLessonsComplete &&
      allCheckpointsPassed
    ) {
      finalAssessmentStatus =
        "ready";
    } else {
      finalAssessmentStatus =
        "locked";
    }
  }


  const overallTotalUnits =
    lessons.length +
    checkpoints.length +
    (
      finalAssessment
        ? 1
        : 0
    );


  const overallCompletedUnits =
    completedLessons +
    passedCheckpoints +
    (
      finalAssessmentPassed
        ? 1
        : 0
    );


  const overallPercentage =
    overallTotalUnits > 0
      ? Math.min(
          100,
          Math.round(
            (
              overallCompletedUnits /
              overallTotalUnits
            ) *
              100
          )
        )
      : 0;


  /*
   * Guided course order:
   *
   * Module lessons
   *      ↓
   * That module's checkpoint
   *      ↓
   * Next module
   *      ↓
   * Final assessment
   *      ↓
   * Completion page
   */
  for (
    const checkpoint
    of checkpoints
  ) {

    const moduleNumber =
      checkpoint
        .moduleNumber;


    if (
      typeof moduleNumber ===
      "number"
    ) {

      const moduleLessons =
        lessons.filter(
          (lesson) =>
            getModuleNumberFromLessonKey(
              lesson.key
            ) ===
            moduleNumber
        );


      const firstIncomplete =
        moduleLessons.find(
          (lesson) =>
            !completedSet.has(
              lesson.key
            )
        );


      if (
        firstIncomplete
      ) {
        return {
          totalLessons:
            lessons.length,

          completedLessons,

          totalCheckpoints:
            checkpoints.length,

          passedCheckpoints,

          finalAssessmentExists:
            Boolean(
              finalAssessment
            ),

          finalAssessmentPassed,

          finalAssessmentStatus,

          allLessonsComplete,

          allCheckpointsPassed,

          courseComplete,

          certificateEligible,

          overallCompletedUnits,

          overallTotalUnits,

          overallPercentage,

          nextHref:
            `/courses/${courseSlug}/learn/${firstIncomplete.key}`,

          nextActionLabel:
            "Continue learning",

          nextKind:
            "lesson",
        };
      }
    }


    if (
      !passedSet.has(
        checkpoint.key
      )
    ) {
      return {
        totalLessons:
          lessons.length,

        completedLessons,

        totalCheckpoints:
          checkpoints.length,

        passedCheckpoints,

        finalAssessmentExists:
          Boolean(
            finalAssessment
          ),

        finalAssessmentPassed,

        finalAssessmentStatus,

        allLessonsComplete,

        allCheckpointsPassed,

        courseComplete,

        certificateEligible,

        overallCompletedUnits,

        overallTotalUnits,

        overallPercentage,

        nextHref:
          `/courses/${courseSlug}/assessment/${checkpoint.key}`,

        nextActionLabel:
          checkpoint.moduleNumber
            ? `Take Module ${checkpoint.moduleNumber} checkpoint`
            : "Take checkpoint",

        nextKind:
          "checkpoint",
      };
    }
  }


  /*
   * Fallback for courses whose lesson
   * keys are not grouped by module.
   */
  const firstIncompleteLesson =
    lessons.find(
      (lesson) =>
        !completedSet.has(
          lesson.key
        )
    );


  if (
    firstIncompleteLesson
  ) {
    return {
      totalLessons:
        lessons.length,

      completedLessons,

      totalCheckpoints:
        checkpoints.length,

      passedCheckpoints,

      finalAssessmentExists:
        Boolean(
          finalAssessment
        ),

      finalAssessmentPassed,

      finalAssessmentStatus,

      allLessonsComplete,

      allCheckpointsPassed,

      courseComplete,

      certificateEligible,

      overallCompletedUnits,

      overallTotalUnits,

      overallPercentage,

      nextHref:
        `/courses/${courseSlug}/learn/${firstIncompleteLesson.key}`,

      nextActionLabel:
        "Continue learning",

      nextKind:
        "lesson",
    };
  }


  const firstUnpassedCheckpoint =
    checkpoints.find(
      (assessment) =>
        !passedSet.has(
          assessment.key
        )
    );


  if (
    firstUnpassedCheckpoint
  ) {
    return {
      totalLessons:
        lessons.length,

      completedLessons,

      totalCheckpoints:
        checkpoints.length,

      passedCheckpoints,

      finalAssessmentExists:
        Boolean(
          finalAssessment
        ),

      finalAssessmentPassed,

      finalAssessmentStatus,

      allLessonsComplete,

      allCheckpointsPassed,

      courseComplete,

      certificateEligible,

      overallCompletedUnits,

      overallTotalUnits,

      overallPercentage,

      nextHref:
        `/courses/${courseSlug}/assessment/${firstUnpassedCheckpoint.key}`,

      nextActionLabel:
        firstUnpassedCheckpoint
          .moduleNumber
          ? `Take Module ${firstUnpassedCheckpoint.moduleNumber} checkpoint`
          : "Take checkpoint",

      nextKind:
        "checkpoint",
    };
  }


  if (
    finalAssessment &&
    !finalAssessmentPassed
  ) {
    return {
      totalLessons:
        lessons.length,

      completedLessons,

      totalCheckpoints:
        checkpoints.length,

      passedCheckpoints,

      finalAssessmentExists:
        true,

      finalAssessmentPassed,

      finalAssessmentStatus,

      allLessonsComplete,

      allCheckpointsPassed,

      courseComplete,

      certificateEligible,

      overallCompletedUnits,

      overallTotalUnits,

      overallPercentage,

      nextHref:
        `/courses/${courseSlug}/assessment/${finalAssessment.key}`,

      nextActionLabel:
        "Take final assessment",

      nextKind:
        "final",
    };
  }


  if (
    courseComplete
  ) {
    return {
      totalLessons:
        lessons.length,

      completedLessons,

      totalCheckpoints:
        checkpoints.length,

      passedCheckpoints,

      finalAssessmentExists:
        Boolean(
          finalAssessment
        ),

      finalAssessmentPassed,

      finalAssessmentStatus,

      allLessonsComplete,

      allCheckpointsPassed,

      courseComplete,

      certificateEligible,

      overallCompletedUnits,

      overallTotalUnits,

      overallPercentage,

      nextHref:
        `/courses/${courseSlug}/complete`,

      nextActionLabel:
        "View completion",

      nextKind:
        "complete",
    };
  }


  return {
    totalLessons:
      lessons.length,

    completedLessons,

    totalCheckpoints:
      checkpoints.length,

    passedCheckpoints,

    finalAssessmentExists:
      Boolean(
        finalAssessment
      ),

    finalAssessmentPassed,

    finalAssessmentStatus,

    allLessonsComplete,

    allCheckpointsPassed,

    courseComplete,

    certificateEligible,

    overallCompletedUnits,

    overallTotalUnits,

    overallPercentage,

    nextHref:
      `/courses/${courseSlug}`,

    nextActionLabel:
      "View course",

    nextKind:
      "course",
  };
}
__MAT_EOF__

mkdir -p "app/courses/[slug]"
cat > 'app/courses/[slug]/actions.ts' <<'__MAT_EOF__'
"use server";

import {
  revalidatePath,
} from "next/cache";

import {
  redirect,
} from "next/navigation";

import {
  getCourse,
} from "@/lib/data";

import {
  getFirstLesson,
} from "@/lib/course-lessons";

import {
  buildCourseProgress,
} from "@/lib/course-progress";

import {
  createClient,
} from "@/lib/supabase/server";


export async function enrollInCourse(
  formData: FormData
) {
  const courseSlug =
    String(
      formData.get(
        "courseSlug"
      ) ??
        ""
    ).trim();


  const course =
    getCourse(
      courseSlug
    );


  if (!course) {
    redirect(
      "/courses"
    );
  }


  const firstLesson =
    getFirstLesson(
      courseSlug
    );


  if (!firstLesson) {
    redirect(
      `/courses/${courseSlug}`
    );
  }


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
    redirect(
      `/login?next=${encodeURIComponent(
        `/courses/${courseSlug}`
      )}&message=${encodeURIComponent(
        "Sign in to start this course."
      )}`
    );
  }


  const now =
    new Date()
      .toISOString();


  const {
    error:
      enrolmentError,
  } =
    await supabase
      .from(
        "enrollments"
      )
      .upsert(
        {
          user_id:
            userId,

          course_slug:
            courseSlug,

          last_opened_at:
            now,
        },
        {
          onConflict:
            "user_id,course_slug",
        }
      );


  if (
    enrolmentError
  ) {
    redirect(
      `/courses/${courseSlug}?error=${encodeURIComponent(
        "We could not enrol you in this course. Please try again."
      )}`
    );
  }


  revalidatePath(
    "/dashboard"
  );

  revalidatePath(
    `/courses/${courseSlug}`
  );


  redirect(
    `/courses/${courseSlug}/learn/${firstLesson.key}`
  );
}


export async function continueCourse(
  formData: FormData
) {
  const courseSlug =
    String(
      formData.get(
        "courseSlug"
      ) ??
        ""
    ).trim();


  const course =
    getCourse(
      courseSlug
    );


  if (!course) {
    redirect(
      "/courses"
    );
  }


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
    redirect(
      `/login?next=${encodeURIComponent(
        `/courses/${courseSlug}`
      )}`
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
          courseSlug
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
          "assessment_key"
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
          "passed",
          true
        ),
    ]);


  if (
    !enrolmentResult
      .data
  ) {
    redirect(
      `/courses/${courseSlug}`
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
      attemptsResult
        .data ??
      []
    ).map(
      (item) =>
        item.assessment_key
    );


  const summary =
    buildCourseProgress(
      courseSlug,
      completedKeys,
      passedKeys
    );


  await supabase
    .from(
      "enrollments"
    )
    .update({
      last_opened_at:
        new Date()
          .toISOString(),
    })
    .eq(
      "user_id",
      userId
    )
    .eq(
      "course_slug",
      courseSlug
    );


  revalidatePath(
    "/dashboard"
  );

  revalidatePath(
    `/courses/${courseSlug}`
  );


  redirect(
    summary.nextHref
  );
}
__MAT_EOF__

mkdir -p "components"
cat > 'components/CourseEnrollAction.tsx' <<'__MAT_EOF__'
import Link from "next/link";

import {
  continueCourse,
  enrollInCourse,
} from "@/app/courses/[slug]/actions";

import {
  buildCourseProgress,
} from "@/lib/course-progress";

import {
  createClient,
} from "@/lib/supabase/server";


type CourseEnrollActionProps = {
  courseSlug: string;
};


export default async function CourseEnrollAction({
  courseSlug,
}: CourseEnrollActionProps) {

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


  let enrolled =
    false;


  let completedKeys:
    string[] = [];


  let passedKeys:
    string[] = [];


  if (userId) {
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
            courseSlug
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
            "assessment_key"
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
            "passed",
            true
          ),
      ]);


    enrolled =
      Boolean(
        enrolmentResult
          .data
      );


    completedKeys =
      (
        progressResult
          .data ??
        []
      ).map(
        (item) =>
          item.lesson_key
      );


    passedKeys =
      (
        attemptsResult
          .data ??
        []
      ).map(
        (item) =>
          item.assessment_key
      );
  }


  if (enrolled) {
    const summary =
      buildCourseProgress(
        courseSlug,
        completedKeys,
        passedKeys
      );


    return (
      <div className="course-enrol-action">

        <div className="course-enrol-status">

          <span>
            ✓
          </span>


          <div>

            <strong>
              {summary.courseComplete
                ? "Course complete"
                : "Course added"}
            </strong>

            <small>
              {summary.courseComplete
                ? "All required learning and assessments are complete."
                : summary.nextKind ===
                    "checkpoint"
                  ? "Your next step is a module checkpoint."
                  : summary.nextKind ===
                      "final"
                    ? "Your final assessment is ready."
                    : "Continue from your next required lesson."}
            </small>

          </div>

        </div>


        <div className="course-enrol-progress-mini">

          <span>
            Lessons{" "}
            <strong>
              {summary.completedLessons}
              /{summary.totalLessons}
            </strong>
          </span>


          {summary.totalCheckpoints >
            0 && (
            <span>
              Checkpoints{" "}
              <strong>
                {summary.passedCheckpoints}
                /{summary.totalCheckpoints}
              </strong>
            </span>
          )}


          {summary.finalAssessmentExists && (
            <span>
              Final{" "}
              <strong>
                {summary.finalAssessmentStatus ===
                "passed"
                  ? "Passed"
                  : summary.finalAssessmentStatus ===
                      "ready"
                    ? "Ready"
                    : "Locked"}
              </strong>
            </span>
          )}

        </div>


        <div className="course-enrol-buttons">

          <form
            action={
              continueCourse
            }
          >
            <input
              type="hidden"
              name="courseSlug"
              value={
                courseSlug
              }
            />

            <button
              type="submit"
              className="button"
            >
              {summary.nextActionLabel}
            </button>
          </form>


          <Link
            href="/dashboard"
            className="button button-outline"
          >
            Dashboard
          </Link>

        </div>

      </div>
    );
  }


  return (
    <form
      action={
        enrollInCourse
      }
      className="course-enrol-form"
    >

      <input
        type="hidden"
        name="courseSlug"
        value={
          courseSlug
        }
      />


      <button
        type="submit"
        className="button course-start-button"
      >
        Start this course
      </button>


      <span>
        Add this course to your
        learner dashboard and begin
        Lesson 1.
      </span>

    </form>
  );
}
__MAT_EOF__

mkdir -p "app/dashboard"
cat > 'app/dashboard/page.tsx' <<'__MAT_EOF__'
import type {
  Metadata,
} from "next";

import Link from "next/link";

import {
  redirect,
} from "next/navigation";

import {
  continueCourse,
} from "@/app/courses/[slug]/actions";

import {
  buildCourseProgress,
} from "@/lib/course-progress";

import {
  getCourse,
} from "@/lib/data";

import {
  createClient,
} from "@/lib/supabase/server";


export const metadata:
  Metadata = {

  title:
    "Learner Dashboard",

  description:
    "Your My Academic Tutor learner dashboard.",

  robots: {
    index: false,
    follow: false,
  },
};


function formatDate(
  value:
    string |
    null
) {
  if (!value) {
    return null;
  }


  return new Intl
    .DateTimeFormat(
      "en-GB",
      {
        day:
          "numeric",

        month:
          "short",

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


export default async function DashboardPage() {

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


  const claims =
    claimsData
      ?.claims;


  if (
    claimsError ||
    !claims?.sub
  ) {
    redirect(
      "/login"
    );
  }


  const userId =
    claims.sub;


  const email =
    typeof claims
      .email ===
    "string"
      ? claims.email
      : "";


  const [
    profileResult,
    enrolmentsResult,
    progressResult,
    attemptsResult,
  ] =
    await Promise.all([

      supabase
        .from(
          "profiles"
        )
        .select(
          `
            full_name,
            preferred_subject,
            learner_level
          `
        )
        .eq(
          "id",
          userId
        )
        .maybeSingle(),

      supabase
        .from(
          "enrollments"
        )
        .select(
          `
            course_slug,
            enrolled_at,
            last_opened_at
          `
        )
        .eq(
          "user_id",
          userId
        )
        .order(
          "enrolled_at",
          {
            ascending:
              false,
          }
        ),

      supabase
        .from(
          "lesson_progress"
        )
        .select(
          `
            course_slug,
            lesson_key,
            completed
          `
        )
        .eq(
          "user_id",
          userId
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
            course_slug,
            assessment_key,
            passed,
            percentage
          `
        )
        .eq(
          "user_id",
          userId
        )
        .eq(
          "passed",
          true
        ),
    ]);


  const profile =
    profileResult
      .data;


  const enrolments =
    enrolmentsResult
      .data ??
    [];


  const progress =
    progressResult
      .data ??
    [];


  const attempts =
    attemptsResult
      .data ??
    [];


  const learnerName =
    profile
      ?.full_name
      ?.trim() ||
    email.split(
      "@"
    )[0] ||
    "Learner";


  const completedLessons =
    progress.length;


  const enrolledCourses =
    enrolments.map(
      (
        enrolment
      ) => {

        const course =
          getCourse(
            enrolment
              .course_slug
          );


        const completedKeys =
          progress
            .filter(
              (item) =>
                item.course_slug ===
                enrolment.course_slug
            )
            .map(
              (item) =>
                item.lesson_key
            );


        const passedKeys =
          attempts
            .filter(
              (item) =>
                item.course_slug ===
                enrolment.course_slug
            )
            .map(
              (item) =>
                item.assessment_key
            );


        const summary =
          buildCourseProgress(
            enrolment
              .course_slug,
            completedKeys,
            passedKeys
          );


        return {
          slug:
            enrolment
              .course_slug,

          title:
            course?.title ??
            enrolment
              .course_slug,

          summary,

          enrolledAt:
            formatDate(
              enrolment
                .enrolled_at
            ),

          lastOpenedAt:
            formatDate(
              enrolment
                .last_opened_at
            ),
        };
      }
    );


  const completedCourses =
    enrolledCourses
      .filter(
        (course) =>
          course.summary
            .courseComplete
      )
      .length;


  return (
    <main className="dashboard-live">

      <section className="dashboard-live-hero">
        <div className="shell">

          <div className="dashboard-live-top">

            <div>
              <span className="eyebrow">
                Learner dashboard
              </span>

              <h1>
                Welcome back,
                <br />
                {learnerName}.
              </h1>

              <p>
                Continue from your next
                required lesson, track
                checkpoints and see when
                your final assessment
                becomes available.
              </p>
            </div>


            <form
              action="/auth/signout"
              method="post"
            >
              <button
                type="submit"
                className="dashboard-signout"
              >
                Sign out
              </button>
            </form>

          </div>


          <div className="dashboard-identity">
            <span>
              Signed in as
            </span>

            <strong>
              {email}
            </strong>
          </div>

        </div>
      </section>


      <section className="dashboard-live-content">
        <div className="shell">

          <div className="dashboard-stat-grid">

            <article className="dashboard-stat">
              <span>
                Enrolled courses
              </span>

              <strong>
                {enrolledCourses.length}
              </strong>

              <p>
                Courses currently in
                your learning library.
              </p>
            </article>


            <article className="dashboard-stat">
              <span>
                Lessons completed
              </span>

              <strong>
                {completedLessons}
              </strong>

              <p>
                Completed lessons across
                your enrolled courses.
              </p>
            </article>


            <article className="dashboard-stat">
              <span>
                Courses completed
              </span>

              <strong>
                {completedCourses}
              </strong>

              <p>
                Courses where every
                required component has
                been passed.
              </p>
            </article>


            <article className="dashboard-stat">
              <span>
                Main subject
              </span>

              <strong className="dashboard-stat-text">
                {profile
                  ?.preferred_subject ||
                  "Explore"}
              </strong>

              <p>
                {profile
                  ?.learner_level
                  ? `Learning level: ${profile.learner_level}`
                  : "Your preferred area of study."}
              </p>
            </article>

          </div>


          <div className="dashboard-section-heading">

            <div>
              <span className="eyebrow">
                My learning
              </span>

              <h2>
                Your courses
              </h2>
            </div>


            <Link
              href="/courses"
              className="button"
            >
              Browse courses
            </Link>

          </div>


          {enrolledCourses.length >
          0 ? (

            <div className="dashboard-course-list">

              {enrolledCourses.map(
                (
                  course
                ) => (

                  <article
                    key={
                      course.slug
                    }
                    className="dashboard-course dashboard-course-expanded"
                  >

                    <div className="dashboard-course-main">

                      <div className="dashboard-course-title-row">

                        <div>
                          <span className="dashboard-course-label">
                            Enrolled course
                          </span>

                          <h3>
                            {course.title}
                          </h3>
                        </div>


                        <span
                          className={[
                            "dashboard-course-status",

                            course.summary
                              .courseComplete
                              ? "complete"
                              : "in-progress",
                          ].join(
                            " "
                          )}
                        >
                          {course.summary
                            .courseComplete
                            ? "Complete"
                            : "In progress"}
                        </span>

                      </div>


                      <div className="dashboard-course-requirements">

                        <article>
                          <span>
                            Lessons
                          </span>

                          <strong>
                            {course.summary
                              .completedLessons}
                            /
                            {course.summary
                              .totalLessons}
                          </strong>
                        </article>


                        <article>
                          <span>
                            Module checkpoints
                          </span>

                          <strong>
                            {course.summary
                              .totalCheckpoints >
                            0
                              ? `${course.summary.passedCheckpoints}/${course.summary.totalCheckpoints}`
                              : "—"}
                          </strong>
                        </article>


                        <article>
                          <span>
                            Final assessment
                          </span>

                          <strong>
                            {course.summary
                              .finalAssessmentStatus ===
                            "passed"
                              ? "Passed"
                              : course.summary
                                    .finalAssessmentStatus ===
                                  "ready"
                                ? "Ready"
                                : course.summary
                                      .finalAssessmentStatus ===
                                    "locked"
                                  ? "Locked"
                                  : "Not required"}
                          </strong>
                        </article>


                        <article>
                          <span>
                            Certificate
                          </span>

                          <strong>
                            {course.summary
                              .certificateEligible
                              ? "Eligible"
                              : "Not yet"}
                          </strong>
                        </article>

                      </div>


                      <div className="dashboard-course-meta">

                        {course.lastOpenedAt && (
                          <span>
                            Last opened{" "}
                            {course.lastOpenedAt}
                          </span>
                        )}


                        {!course.lastOpenedAt &&
                          course.enrolledAt && (
                            <span>
                              Enrolled{" "}
                              {course.enrolledAt}
                            </span>
                          )}

                      </div>


                      <div className="dashboard-progress">

                        <div className="dashboard-progress-track">
                          <span
                            style={{
                              width:
                                `${course.summary.overallPercentage}%`,
                            }}
                          />
                        </div>

                        <strong>
                          {course.summary
                            .overallPercentage}
                          %
                        </strong>

                      </div>


                      <p className="dashboard-next-step">
                        Next step:{" "}
                        <strong>
                          {course.summary
                            .nextActionLabel}
                        </strong>
                      </p>

                    </div>


                    <form
                      action={
                        continueCourse
                      }
                      className="dashboard-course-continue-form"
                    >
                      <input
                        type="hidden"
                        name="courseSlug"
                        value={
                          course.slug
                        }
                      />

                      <button
                        type="submit"
                        className="dashboard-course-link"
                      >
                        {course.summary
                          .courseComplete
                          ? "View completion"
                          : "Continue"}

                        <span>
                          →
                        </span>
                      </button>
                    </form>

                  </article>

                )
              )}

            </div>

          ) : (

            <div className="dashboard-empty">

              <span className="eyebrow">
                Your library is ready
              </span>

              <h3>
                Start your first course.
              </h3>

              <p>
                You have not enrolled in
                a course yet. Explore the
                catalogue and choose the
                subject and level that
                fits your goals.
              </p>

              <Link
                href="/courses"
                className="button"
              >
                Explore courses
              </Link>

            </div>

          )}

        </div>
      </section>

    </main>
  );
}
__MAT_EOF__

mkdir -p "app/courses/[slug]/assessment/[assessmentKey]"
cat > 'app/courses/[slug]/assessment/[assessmentKey]/page.tsx' <<'__MAT_EOF__'
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
    "Course completion and certificate eligibility.",

  robots: {
    index: false,
    follow: false,
  },
};


type PageProps = {
  params: Promise<{
    slug: string;
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


  const learnerName =
    typeof claimsData
      ?.claims
      ?.email ===
    "string"
      ? claimsData
          .claims
          .email
          .split(
            "@"
          )[0]
      : "Learner";


  if (!userId) {
    redirect(
      `/login?next=/courses/${slug}/complete`
    );
  }


  const [
    profileResult,
    enrolmentResult,
    progressResult,
    attemptsResult,
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


  const finalScores =
    attempts
      .filter(
        (attempt) =>
          attempt.assessment_key ===
          "final-assessment"
      )
      .map(
        (attempt) =>
          Number(
            attempt.percentage
          )
      );


  const finalBest =
    finalScores.length >
    0
      ? Math.max(
          ...finalScores
        )
      : null;


  const displayName =
    profileResult
      .data
      ?.full_name
      ?.trim() ||
    learnerName;


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
            Congratulations,
            <br />
            {displayName}.
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
                Certificate eligible.
              </h2>

              <p>
                Your learner record now
                satisfies the completion
                requirements for this
                assessed course.
              </p>

            </div>


            <div className="certificate-seal">
              MAT
              <small>
                Eligible
              </small>
            </div>

          </section>


          <div className="course-complete-note">

            <strong>
              What this means
            </strong>

            <p>
              Completion is calculated
              from your persisted lesson
              progress and passed
              assessment attempts. The
              downloadable certificate
              document itself can be
              added as the next
              certificate-generation
              layer.
            </p>

          </div>


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

mkdir -p "components/assessments"
cat > 'components/assessments/AssessmentRunner.tsx' <<'__MAT_EOF__'
"use client";

import {
  useState,
} from "react";

import Link from "next/link";

import type {
  AssessmentResult,
  AssessmentType,
  PublicAssessmentQuestion,
} from "@/lib/assessments/types";

import {
  submitAssessment,
} from "@/app/courses/[slug]/assessment/[assessmentKey]/actions";


type AssessmentRunnerProps = {
  courseSlug: string;
  assessmentKey: string;
  assessmentType: AssessmentType;
  title: string;
  description: string;
  passingPercentage: number;
  questions: PublicAssessmentQuestion[];
  previousBest: number | null;
};


export default function AssessmentRunner({
  courseSlug,
  assessmentKey,
  assessmentType,
  title,
  description,
  passingPercentage,
  questions,
  previousBest,
}: AssessmentRunnerProps) {

  const [
    answers,
    setAnswers,
  ] =
    useState<number[]>(
      Array.from(
        {
          length:
            questions.length,
        },
        () => -1
      )
    );


  const [
    submitting,
    setSubmitting,
  ] =
    useState(false);


  const [
    result,
    setResult,
  ] =
    useState<
      AssessmentResult | null
    >(null);


  const isFinal =
    assessmentType ===
    "final-assessment";


  const answeredCount =
    answers.filter(
      (answer) =>
        answer >= 0
    ).length;


  const allAnswered =
    answeredCount ===
    questions.length;


  function chooseAnswer(
    questionIndex: number,
    optionIndex: number
  ) {
    if (result) {
      return;
    }


    setAnswers(
      (
        current
      ) => {

        const updated =
          [...current];


        updated[
          questionIndex
        ] =
          optionIndex;


        return updated;
      }
    );
  }


  async function handleSubmit() {
    if (
      !allAnswered ||
      submitting
    ) {
      return;
    }


    setSubmitting(
      true
    );


    const submission =
      await submitAssessment(
        courseSlug,
        assessmentKey,
        answers
      );


    setResult(
      submission
    );


    setSubmitting(
      false
    );
  }


  function resetAssessment() {
    setAnswers(
      Array.from(
        {
          length:
            questions.length,
        },
        () => -1
      )
    );


    setResult(
      null
    );


    window.scrollTo({
      top: 0,
      behavior:
        "smooth",
    });
  }


  return (
    <div className="assessment-runner">

      <section className="assessment-hero">

        <span>
          {isFinal
            ? "Final course assessment"
            : "Module assessment"}
        </span>

        <h1>
          {title}
        </h1>

        <p>
          {description}
        </p>


        <div className="assessment-meta">

          <div>
            <span>
              Questions
            </span>

            <strong>
              {questions.length}
            </strong>
          </div>


          <div>
            <span>
              Pass mark
            </span>

            <strong>
              {passingPercentage}%
            </strong>
          </div>


          <div>
            <span>
              Previous best
            </span>

            <strong>
              {previousBest ===
              null
                ? "—"
                : `${previousBest.toFixed(
                    0
                  )}%`}
            </strong>
          </div>

        </div>

      </section>


      {!result && (
        <div className="assessment-progress">

          <div>

            <span>
              {answeredCount} of{" "}
              {questions.length} answered
            </span>


            <strong>
              {Math.round(
                (
                  answeredCount /
                  questions.length
                ) *
                  100
              )}
              %
            </strong>

          </div>


          <div className="assessment-progress-track">

            <div
              style={{
                width:
                  `${
                    (
                      answeredCount /
                      questions.length
                    ) *
                    100
                  }%`,
              }}
            />

          </div>

        </div>
      )}


      <div className="assessment-question-list">

        {questions.map(
          (
            question,
            questionIndex
          ) => {

            const reviewItem =
              result?.review?.[
                questionIndex
              ];


            return (
              <article
                className="assessment-question-card"
                key={
                  question.id
                }
              >

                <div className="assessment-question-heading">

                  <span>
                    Question{" "}
                    {questionIndex +
                      1}
                  </span>

                  <h2>
                    {question.question}
                  </h2>

                </div>


                <div className="assessment-options">

                  {question.options.map(
                    (
                      option,
                      optionIndex
                    ) => {

                      const selected =
                        answers[
                          questionIndex
                        ] ===
                        optionIndex;


                      const correct =
                        reviewItem &&
                        reviewItem
                          .correctIndex ===
                          optionIndex;


                      const incorrectSelected =
                        reviewItem &&
                        selected &&
                        !reviewItem.correct;


                      const classes = [
                        "assessment-option",

                        selected
                          ? "selected"
                          : "",

                        correct
                          ? "correct"
                          : "",

                        incorrectSelected
                          ? "incorrect"
                          : "",
                      ]
                        .filter(
                          Boolean
                        )
                        .join(
                          " "
                        );


                      return (
                        <button
                          key={
                            `${question.id}-${optionIndex}`
                          }
                          type="button"
                          className={
                            classes
                          }
                          disabled={
                            Boolean(
                              result
                            )
                          }
                          onClick={() =>
                            chooseAnswer(
                              questionIndex,
                              optionIndex
                            )
                          }
                        >

                          <span className="assessment-option-letter">
                            {String.fromCharCode(
                              65 +
                                optionIndex
                            )}
                          </span>


                          <span>
                            {option}
                          </span>

                        </button>
                      );
                    }
                  )}

                </div>


                {reviewItem && (
                  <div
                    className={[
                      "assessment-feedback",

                      reviewItem.correct
                        ? "correct"
                        : "incorrect",
                    ].join(
                      " "
                    )}
                  >

                    <strong>
                      {reviewItem.correct
                        ? "Correct"
                        : "Review this question"}
                    </strong>


                    <p>
                      {
                        reviewItem
                          .explanation
                      }
                    </p>

                  </div>
                )}

              </article>
            );
          }
        )}

      </div>


      {!result && (
        <section className="assessment-submit-panel">

          <div>

            <span>
              Ready to submit?
            </span>

            <p>
              You must answer every
              question before your
              assessment can be graded.
            </p>

          </div>


          <button
            type="button"
            disabled={
              !allAnswered ||
              submitting
            }
            onClick={
              handleSubmit
            }
          >
            {submitting
              ? "Marking assessment..."
              : isFinal
                ? "Submit final assessment"
                : "Submit checkpoint"}
          </button>

        </section>
      )}


      {result && (
        <section
          className={[
            "assessment-result",

            result.passed
              ? "passed"
              : "not-passed",
          ].join(
            " "
          )}
        >

          {!result.success ? (

            <>
              <span>
                Submission problem
              </span>

              <h2>
                We could not save your
                assessment.
              </h2>

              <p>
                {result.message}
              </p>

              <button
                type="button"
                onClick={
                  resetAssessment
                }
              >
                Try again
              </button>
            </>

          ) : (

            <>

              <span>
                {result.passed
                  ? isFinal
                    ? "Final assessment passed"
                    : "Checkpoint passed"
                  : isFinal
                    ? "Final assessment not yet passed"
                    : "Checkpoint not yet passed"}
              </span>


              <h2>
                {result.score}/
                {result.maxScore}
              </h2>


              <strong className="assessment-result-percentage">
                {result.percentage?.toFixed(
                  1
                )}
                %
              </strong>


              <p>
                {result.passed
                  ? isFinal
                    ? "Well done. Your final assessment result has been recorded and the course completion requirement is satisfied."
                    : "Well done. This checkpoint has been recorded as passed."
                  : `You need ${passingPercentage}% to pass. Review the explanations above and try again when ready.`}
              </p>


              <div className="assessment-result-actions">

                {!result.passed && (
                  <button
                    type="button"
                    onClick={
                      resetAssessment
                    }
                  >
                    {isFinal
                      ? "Retake final assessment"
                      : "Retake checkpoint"}
                  </button>
                )}


                {isFinal &&
                  result.passed && (
                    <Link
                      href={`/courses/${courseSlug}/complete`}
                    >
                      View course completion
                    </Link>
                  )}


                <Link
                  href={`/courses/${courseSlug}`}
                >
                  {result.passed &&
                  !isFinal
                    ? "Continue course"
                    : "Course overview"}
                </Link>


                <Link
                  href="/dashboard"
                >
                  Dashboard
                </Link>

              </div>

            </>

          )}

        </section>
      )}

    </div>
  );
}
__MAT_EOF__

if ! grep -q "LEARNING FLOW — PROGRESS, CHECKPOINTS & COMPLETION" app/globals.css 2>/dev/null; then
  cat >> app/globals.css <<'__MAT_CSS_EOF__'


/* ==========================================================================
   LEARNING FLOW — PROGRESS, CHECKPOINTS & COMPLETION
   ========================================================================== */

.course-enrol-progress-mini {
  display: flex;
  flex-wrap: wrap;
  gap: 8px 16px;
  margin: 16px 0 2px;
  color: #777168;
  font-size: 9px;
}

.course-enrol-progress-mini strong {
  color: #171717;
}

.course-enrol-buttons form {
  margin: 0;
}

.course-enrol-buttons form button {
  width: 100%;
}


/* DASHBOARD COURSE REQUIREMENTS */

.dashboard-course-expanded {
  align-items: stretch;
}

.dashboard-course-title-row {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  align-items: flex-start;
}

.dashboard-course-status {
  flex: none;
  padding: 7px 10px;
  border: 1px solid #d6d0c7;
  border-radius: 999px;
  color: #756f67;
  background: #f8f5ef;
  font-size: 7px;
  font-weight: 800;
  letter-spacing: .07em;
  text-transform: uppercase;
}

.dashboard-course-status.complete {
  border-color: #708273;
  background: #edf2ed;
  color: #4c6250;
}

.dashboard-course-requirements {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 8px;
  margin-top: 20px;
}

.dashboard-course-requirements article {
  padding: 13px;
  border: 1px solid #ded8cf;
  border-radius: 10px;
  background: #faf8f4;
}

.dashboard-course-requirements span {
  display: block;
  color: #8b847b;
  font-size: 7px;
  font-weight: 800;
  letter-spacing: .05em;
  text-transform: uppercase;
}

.dashboard-course-requirements strong {
  display: block;
  margin-top: 5px;
  color: #24211e;
  font-family: var(--font-serif), Georgia, serif;
  font-size: 17px;
  font-weight: 500;
}

.dashboard-next-step {
  margin: 11px 0 0;
  color: #777168;
  font-size: 9px;
}

.dashboard-next-step strong {
  color: #2a2622;
}

.dashboard-course-continue-form {
  display: flex;
  margin: 0;
}

.dashboard-course-continue-form .dashboard-course-link {
  border: 0;
  font: inherit;
  cursor: pointer;
}


/* COURSE COMPLETION */

.course-complete-page {
  min-height: 100vh;
  background: #f4f1eb;
}

.course-complete-shell {
  width: min(920px, calc(100% - 40px));
  margin: 0 auto;
}

.course-complete-hero {
  padding: 80px 0 64px;
  background: #171717;
  color: #fff;
}

.course-complete-kicker {
  color: #aaa49b;
  font-size: 8px;
  font-weight: 800;
  letter-spacing: .1em;
  text-transform: uppercase;
}

.course-complete-mark {
  display: grid;
  width: 60px;
  height: 60px;
  place-items: center;
  margin-top: 28px;
  border: 1px solid #67615b;
  border-radius: 50%;
  font-family: var(--font-serif), Georgia, serif;
  font-size: 26px;
}

.course-complete-hero h1 {
  max-width: 760px;
  margin: 22px 0 14px;
  font-family: var(--font-serif), Georgia, serif;
  font-size: clamp(46px, 7vw, 78px);
  font-weight: 500;
  line-height: .98;
}

.course-complete-hero p {
  max-width: 650px;
  margin: 0;
  color: #c8c3bc;
  font-size: 12px;
  line-height: 1.75;
}

.course-complete-hero p strong {
  color: #fff;
}

.course-complete-content {
  padding: 38px 0 90px;
}

.course-complete-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
}

.course-complete-grid article {
  padding: 22px;
  border: 1px solid #d8d2c9;
  border-radius: 14px;
  background: #fff;
}

.course-complete-grid article > span {
  color: #918a81;
  font-size: 7px;
  font-weight: 800;
  letter-spacing: .07em;
  text-transform: uppercase;
}

.course-complete-grid strong {
  display: block;
  margin-top: 8px;
  font-family: var(--font-serif), Georgia, serif;
  font-size: 30px;
  font-weight: 500;
}

.course-complete-grid p {
  margin: 7px 0 0;
  color: #736c64;
  font-size: 9px;
  line-height: 1.6;
}

.certificate-eligibility-card {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 30px;
  align-items: center;
  margin-top: 18px;
  padding: 30px;
  border-radius: 18px;
  background: #e3ded5;
}

.certificate-eligibility-card span {
  color: #878077;
  font-size: 7px;
  font-weight: 800;
  letter-spacing: .08em;
  text-transform: uppercase;
}

.certificate-eligibility-card h2 {
  margin: 8px 0;
  font-family: var(--font-serif), Georgia, serif;
  font-size: 34px;
  font-weight: 500;
}

.certificate-eligibility-card p {
  max-width: 560px;
  margin: 0;
  color: #686159;
  font-size: 10px;
  line-height: 1.7;
}

.certificate-seal {
  display: grid;
  width: 104px;
  height: 104px;
  place-items: center;
  align-content: center;
  border: 1px solid #8a837a;
  border-radius: 50%;
  font-family: var(--font-serif), Georgia, serif;
  font-size: 25px;
}

.certificate-seal small {
  display: block;
  margin-top: 3px;
  color: #777067;
  font-family: inherit;
  font-size: 8px;
  text-transform: uppercase;
  letter-spacing: .08em;
}

.course-complete-note {
  margin-top: 18px;
  padding: 22px;
  border-left: 3px solid #171717;
  background: #fff;
}

.course-complete-note strong {
  font-family: var(--font-serif), Georgia, serif;
  font-size: 18px;
  font-weight: 500;
}

.course-complete-note p {
  max-width: 680px;
  margin: 7px 0 0;
  color: #716a62;
  font-size: 9px;
  line-height: 1.7;
}

.course-complete-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 9px;
  margin-top: 22px;
}


@media (max-width: 820px) {
  .dashboard-course-requirements {
    grid-template-columns: repeat(2, 1fr);
  }

  .course-complete-grid {
    grid-template-columns: 1fr;
  }
}


@media (max-width: 560px) {
  .dashboard-course-title-row {
    flex-direction: column;
  }

  .dashboard-course-requirements {
    grid-template-columns: 1fr;
  }

  .certificate-eligibility-card {
    grid-template-columns: 1fr;
  }

  .certificate-seal {
    width: 88px;
    height: 88px;
  }
}
__MAT_CSS_EOF__
  echo "Learning-flow CSS appended to app/globals.css"
else
  echo "Learning-flow CSS already present; skipping duplicate append."
fi

echo ""
echo "Installation complete."
echo ""
echo "Run:"
echo "  npm run build"
echo ""
echo "If build passes:"
echo "  npm run dev"
echo ""
echo "Then test:"
echo "  http://localhost:3000/dashboard"
echo "  http://localhost:3000/courses/statistics-foundations"
echo ""
