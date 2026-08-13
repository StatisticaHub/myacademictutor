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
