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
