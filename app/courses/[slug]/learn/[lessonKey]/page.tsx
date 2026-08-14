import type {
  Metadata,
} from "next";

import Link from "next/link";

import {
  notFound,
  redirect,
} from "next/navigation";
import DistributionExplorer from "@/components/labs/DistributionExplorer";
import LessonQuiz from "@/components/LessonQuiz";
import ProbabilitySimulator from "@/components/labs/ProbabilitySimulator";
import DistributionModelExplorer from "@/components/labs/DistributionModelExplorer";
import SamplingSimulator from "@/components/labs/SamplingSimulator";
import ConfidenceIntervalSimulator from "@/components/labs/ConfidenceIntervalSimulator";
import HypothesisTestSimulator from "@/components/labs/HypothesisTestSimulator";

import SecantSlopeExplorer from "@/components/labs/SecantSlopeExplorer";

import {
  getCourse,
  getSubject,
} from "@/lib/data";

import {
  getAuthoredLesson,
  type LessonBlock,
} from "@/lib/lesson-content";

import {
  getCourseLesson,
  getCourseLessons,
  getCourseModules,
  getLessonNavigation,
} from "@/lib/course-lessons";

import {
  createClient,
} from "@/lib/supabase/server";

import {
  completeLesson,
} from "./actions";


/* ==========================================================================
   DYNAMIC USER PAGE
   ========================================================================== */

export const dynamic =
  "force-dynamic";


/* ==========================================================================
   RICH CONTENT BLOCK
   ========================================================================== */
function LessonContentBlock({
  block,
}: {
  block: LessonBlock;
}) {
  switch (block.type) {

    case "heading":
      return (
        <h3 className="lesson-rich-heading">
          {block.text}
        </h3>
      );


    case "paragraph":
      return (
        <p className="lesson-rich-paragraph">
          {block.text}
        </p>
      );


    case "bullets":
      return (
        <ul className="lesson-rich-bullets">

          {block.items.map(
            (item) => (
              <li key={item}>
                {item}
              </li>
            )
          )}

        </ul>
      );


    case "callout":
      return (
        <div className="lesson-rich-callout">

          <span>
            {block.title}
          </span>

          <strong>
            {block.text}
          </strong>

        </div>
      );


    case "distribution-explorer":
      return (
        <DistributionExplorer
          title={block.title}
          description={block.description}
        />
      );


    case "probability-simulator":
      return (
        <ProbabilitySimulator
          title={block.title}
          description={block.description}
        />
      );


    case "distribution-model-explorer":
      return (
        <DistributionModelExplorer
          title={block.title}
          description={block.description}
        />
      );
    case "sampling-simulator":
  return (
    <SamplingSimulator
      title={block.title}
      description={block.description}
    />
  );


case "confidence-interval-simulator":
  return (
    <ConfidenceIntervalSimulator
      title={block.title}
      description={block.description}
    />
  );
  
case "hypothesis-test-simulator":
  return (
    <HypothesisTestSimulator
      title={block.title}
      description={block.description}
    />
  );

case "secant-slope-explorer":

  return (

    <SecantSlopeExplorer

      title={block.title}

      description={block.description}

    />

  );


default:

  return null;
  }
}

/* ==========================================================================
   FALLBACK LESSON
   ========================================================================== */

function FallbackLessonContent({
  moduleTitle,
  courseTitle,
  skills,
}: {
  moduleTitle: string;
  courseTitle: string;
  skills: string[];
}) {
  return (
    <>

      <section className="lesson-content-section">

        <span className="lesson-section-number">
          01
        </span>


        <div>

          <span className="eyebrow">
            Lesson goals
          </span>

          <h2>
            What you should take
            from this lesson.
          </h2>


          <div className="lesson-goal-list">

            <div>
              <span>
                01
              </span>

              <p>
                Explain the central
                ideas behind{" "}
                <strong>
                  {moduleTitle}
                </strong>{" "}
                in your own words.
              </p>
            </div>


            <div>
              <span>
                02
              </span>

              <p>
                Connect this topic
                to the wider concepts
                in{" "}
                <strong>
                  {courseTitle}
                </strong>.
              </p>
            </div>


            <div>
              <span>
                03
              </span>

              <p>
                Recognise when the
                ideas from this module
                should be applied.
              </p>
            </div>

          </div>

        </div>

      </section>


      <section className="lesson-content-section">

        <span className="lesson-section-number">
          02
        </span>


        <div className="lesson-reading">

          <span className="eyebrow">
            Build the idea
          </span>

          <h2>
            Start with
            understanding.
          </h2>


          <p>
            This lesson develops your
            understanding of{" "}
            <strong>
              {moduleTitle}
            </strong>.
            Before focusing on
            procedures, formulas,
            calculations or code,
            identify what problem the
            topic is designed to solve
            and why the underlying
            ideas matter.
          </p>


          <p>
            Distinguish between
            knowing a definition and
            being able to use the idea
            independently. A useful
            test is whether you can
            explain the concept
            without relying on the
            wording of the lesson.
          </p>


          <div className="lesson-callout">

            <span>
              Learning principle
            </span>

            <strong>
              Understand the reason
              before memorising the
              procedure.
            </strong>

          </div>

        </div>

      </section>


      <section className="lesson-content-section">

        <span className="lesson-section-number">
          03
        </span>


        <div>

          <span className="eyebrow">
            Worked thinking
          </span>

          <h2>
            A reliable way to
            approach the topic.
          </h2>


          <div className="lesson-thinking-grid">

            <article>
              <span>
                01
              </span>

              <h3>
                Identify
              </h3>

              <p>
                What is the question,
                problem or objective?
              </p>
            </article>


            <article>
              <span>
                02
              </span>

              <h3>
                Choose
              </h3>

              <p>
                Which concept from{" "}
                {moduleTitle} is
                relevant?
              </p>
            </article>


            <article>
              <span>
                03
              </span>

              <h3>
                Apply
              </h3>

              <p>
                Work through the
                reasoning carefully
                and systematically.
              </p>
            </article>


            <article>
              <span>
                04
              </span>

              <h3>
                Interpret
              </h3>

              <p>
                Explain what the
                result means in
                context.
              </p>
            </article>

          </div>

        </div>

      </section>


      <section className="lesson-content-section">

        <span className="lesson-section-number">
          04
        </span>


        <div>

          <span className="eyebrow">
            Course connection
          </span>

          <h2>
            Skills this supports.
          </h2>


          <div className="lesson-skill-list">

            {skills.map(
              (
                skill,
                index
              ) => (
                <div
                  key={skill}
                >
                  <span>
                    {String(
                      index + 1
                    ).padStart(
                      2,
                      "0"
                    )}
                  </span>

                  <strong>
                    {skill}
                  </strong>
                </div>
              )
            )}

          </div>

        </div>

      </section>


      <section className="lesson-content-section">

        <span className="lesson-section-number">
          05
        </span>


        <div className="lesson-reading">

          <span className="eyebrow">
            Active practice
          </span>

          <h2>
            Check your
            understanding.
          </h2>


          <div className="lesson-practice-card">

            <span>
              Reflection task
            </span>

            <p>
              Without looking back,
              explain{" "}
              <strong>
                {moduleTitle}
              </strong>{" "}
              in your own words.
            </p>

            <p>
              Identify one idea that
              feels clear and one
              idea that would benefit
              from another example or
              more practice.
            </p>

          </div>

        </div>

      </section>

    </>
  );
}


/* ==========================================================================
   METADATA
   ========================================================================== */

export async function generateMetadata({
  params,
}: {
  params: Promise<{
    slug: string;
    lessonKey: string;
  }>;
}): Promise<Metadata> {
  const {
    slug,
    lessonKey,
  } =
    await params;


  const course =
    getCourse(slug);

  const lesson =
    getCourseLesson(
      slug,
      lessonKey
    );

  const authored =
    getAuthoredLesson(
      slug,
      lessonKey
    );


  if (
    !course ||
    !lesson
  ) {
    return {
      title:
        "Lesson",
    };
  }


  return {
    title:
      `${authored?.title ?? lesson.title} | ${course.title}`,

    description:
      authored?.subtitle ??
      `${lesson.title} from ${course.title}.`,

    robots: {
      index: false,
      follow: false,
    },
  };
}


/* ==========================================================================
   PAGE
   ========================================================================== */

export default async function LessonPage({
  params,
  searchParams,
}: {
  params: Promise<{
    slug: string;
    lessonKey: string;
  }>;

  searchParams: Promise<{
    error?: string;
  }>;
}) {
  const {
    slug,
    lessonKey,
  } =
    await params;

  const query =
    await searchParams;


  /* ------------------------------------------------------------------------
     COURSE
     ------------------------------------------------------------------------ */

  const course =
    getCourse(slug);


  if (!course) {
    notFound();
  }


  const lesson =
    getCourseLesson(
      course.slug,
      lessonKey
    );


  if (!lesson) {
    notFound();
  }


  const subject =
    getSubject(
      course.subject
    );


  if (!subject) {
    notFound();
  }


  const authored =
    getAuthoredLesson(
      course.slug,
      lesson.key
    );


  const modules =
    getCourseModules(
      course
    );

  const allLessons =
    getCourseLessons(
      course
    );

  const navigation =
    getLessonNavigation(
      course.slug,
      lesson.key
    );


  /* ------------------------------------------------------------------------
     AUTH
     ------------------------------------------------------------------------ */

  const supabase =
    await createClient();


  const {
    data: claimsData,
    error: claimsError,
  } =
    await supabase.auth.getClaims();


  const userId =
    typeof claimsData
      ?.claims
      ?.sub === "string"
      ? claimsData.claims.sub
      : null;


  if (
    claimsError ||
    !userId
  ) {
    redirect(
      `/login?next=${encodeURIComponent(
        `/courses/${course.slug}/learn/${lesson.key}`
      )}`
    );
  }


  /* ------------------------------------------------------------------------
     REQUIRE ENROLMENT
     ------------------------------------------------------------------------ */

  const {
    data: enrolment,
  } =
    await supabase
      .from("enrollments")
      .select(
        "course_slug"
      )
      .eq(
        "user_id",
        userId
      )
      .eq(
        "course_slug",
        course.slug
      )
      .maybeSingle();


  if (!enrolment) {
    redirect(
      `/courses/${course.slug}`
    );
  }


  /* ------------------------------------------------------------------------
     PROGRESS
     ------------------------------------------------------------------------ */

  const {
    data: progressData,
  } =
    await supabase
      .from("lesson_progress")
      .select(
        `
          lesson_key,
          completed
        `
      )
      .eq(
        "user_id",
        userId
      )
      .eq(
        "course_slug",
        course.slug
      )
      .eq(
        "completed",
        true
      );


  const completedKeys =
    new Set(
      (
        progressData ??
        []
      ).map(
        (item) =>
          item.lesson_key
      )
    );


  const isCompleted =
    completedKeys.has(
      lesson.key
    );


  const completedCount =
    completedKeys.size;


  const progressPercentage =
    allLessons.length > 0
      ? Math.min(
          100,
          Math.round(
            (
              completedCount /
              allLessons.length
            ) *
              100
          )
        )
      : 0;


  const lessonSkills =
    course.skills.slice(
      0,
      3
    );


  const previousTitle =
    navigation.previous
      ? getAuthoredLesson(
          course.slug,
          navigation
            .previous
            .key
        )?.title ??
        navigation
          .previous
          .title
      : null;


  const nextTitle =
    navigation.next
      ? getAuthoredLesson(
          course.slug,
          navigation.next.key
        )?.title ??
        navigation
          .next
          .title
      : null;


  return (
    <main className="lesson-page">

      <div className="lesson-shell">

        {/* ================================================================
            SIDEBAR
            ================================================================ */}

        <aside className="lesson-sidebar">

          <div className="lesson-sidebar-top">

            <Link
              href={`/courses/${course.slug}`}
              className="lesson-back"
            >
              ← Course overview
            </Link>


            <span
              className={`mini-symbol ${subject.accent}`}
            >
              {subject.symbol}
            </span>


            <span className="eyebrow">
              {subject.name}
            </span>


            <h2>
              {course.title}
            </h2>


            <div className="lesson-course-progress">

              <div className="lesson-progress-copy">

                <span>
                  Course progress
                </span>

                <strong>
                  {progressPercentage}%
                </strong>

              </div>


              <div className="lesson-progress-track">

                <span
                  style={{
                    width:
                      `${progressPercentage}%`,
                  }}
                />

              </div>


              <small>
                {completedCount} of{" "}
                {allLessons.length} lessons
                complete
              </small>

            </div>

          </div>


          <nav
            className="lesson-module-nav"
            aria-label="Course lessons"
          >

            {modules.map(
              (module) => (

                <div
                  className="lesson-module-group"
                  key={
                    module.number
                  }
                >

                  <div className="lesson-module-heading">

                    <span>
                      Module{" "}
                      {String(
                        module.number
                      ).padStart(
                        2,
                        "0"
                      )}
                    </span>

                    <strong>
                      {module.title}
                    </strong>

                  </div>


                  <div className="lesson-module-links">

                    {module.lessons.map(
                      (item) => {

                        const current =
                          item.key ===
                          lesson.key;

                        const complete =
                          completedKeys.has(
                            item.key
                          );

                        const authoredItem =
                          getAuthoredLesson(
                            course.slug,
                            item.key
                          );


                        return (
                          <Link
                            key={
                              item.key
                            }
                            href={`/courses/${course.slug}/learn/${item.key}`}
                            className={[
                              "lesson-nav-link",

                              current
                                ? "current"
                                : "",

                              complete
                                ? "complete"
                                : "",
                            ]
                              .filter(
                                Boolean
                              )
                              .join(
                                " "
                              )}
                          >

                            <span className="lesson-nav-number">
                              {complete
                                ? "✓"
                                : item.number}
                            </span>


                            <span>
                              {authoredItem
                                ?.title ??
                                item.title}
                            </span>

                          </Link>
                        );
                      }
                    )}

                  </div>

                </div>
              )
            )}

          </nav>


          <div className="lesson-sidebar-footer">

            <Link
              href="/dashboard"
            >
              Learner dashboard
            </Link>

          </div>

        </aside>


        {/* ================================================================
            MAIN
            ================================================================ */}

        <article className="lesson-main">

          <header className="lesson-header">

            <div className="lesson-header-meta">

              <span>
                Module{" "}
                {lesson.moduleNumber}
              </span>

              <span>
                Lesson{" "}
                {lesson.number}
                {" of "}
                {allLessons.length}
              </span>


              {authored && (
                <span>
                  {authored.estimatedMinutes}
                  {" min"}
                </span>
              )}


              {isCompleted && (
                <span className="lesson-completed-label">
                  ✓ Completed
                </span>
              )}

            </div>


            <span className="eyebrow">
              {lesson.moduleTitle}
            </span>


            <h1>
              {authored?.title ??
                lesson.title}
            </h1>


            <p>
              {authored?.subtitle ??
                `Build your understanding of ${lesson.moduleTitle.toLowerCase()} and connect it to the wider ${course.title} learning journey.`}
            </p>

          </header>


          {query.error && (
            <div className="lesson-error">
              {query.error}
            </div>
          )}


          {/* ==============================================================
              AUTHORED CONTENT
              ============================================================== */}

          {authored ? (
            <>

              {/* OBJECTIVES */}

              <section className="lesson-content-section">

                <span className="lesson-section-number">
                  01
                </span>


                <div>

                  <span className="eyebrow">
                    Learning objectives
                  </span>

                  <h2>
                    By the end of this
                    lesson.
                  </h2>


                  <div className="lesson-objectives">

                    {authored.objectives.map(
                      (
                        objective,
                        index
                      ) => (
                        <div
                          key={
                            objective
                          }
                        >

                          <span>
                            {String(
                              index + 1
                            ).padStart(
                              2,
                              "0"
                            )}
                          </span>

                          <p>
                            {objective}
                          </p>

                        </div>
                      )
                    )}

                  </div>

                </div>

              </section>


              {/* LECTURE / NOTES */}

              <section className="lesson-content-section">

                <span className="lesson-section-number">
                  02
                </span>


                <div>

                  <span className="eyebrow">
                    Detailed lesson
                  </span>

                  <h2>
                    Build the
                    understanding.
                  </h2>


                  <div className="lesson-rich-content">

                    {authored.content.map(
                      (
                        block,
                        index
                      ) => (
                        <LessonContentBlock
                          key={
                            index
                          }
                          block={
                            block
                          }
                        />
                      )
                    )}

                  </div>

                </div>

              </section>


              {/* WORKED EXAMPLES */}

              {authored.workedExamples &&
                authored.workedExamples.length >
                  0 && (
                <section className="lesson-content-section">

                  <span className="lesson-section-number">
                    03
                  </span>


                  <div>

                    <span className="eyebrow">
                      Worked examples
                    </span>

                    <h2>
                      See the reasoning
                      in action.
                    </h2>


                    <div className="lesson-example-list">

                      {authored.workedExamples.map(
                        (
                          example,
                          exampleIndex
                        ) => (
                          <article
                            key={
                              example.title
                            }
                            className="lesson-example-card"
                          >

                            <div className="lesson-example-heading">

                              <span>
                                Example{" "}
                                {exampleIndex +
                                  1}
                              </span>

                              <h3>
                                {
                                  example.title
                                }
                              </h3>

                            </div>


                            <div className="lesson-example-question">

                              <span>
                                Question
                              </span>

                              <p>
                                {
                                  example.question
                                }
                              </p>

                            </div>


                            <div className="lesson-example-steps">

                              <span className="eyebrow">
                                Reasoning
                              </span>


                              {example.steps.map(
                                (
                                  step,
                                  stepIndex
                                ) => (
                                  <div
                                    key={
                                      step
                                    }
                                  >

                                    <span>
                                      {String(
                                        stepIndex +
                                          1
                                      ).padStart(
                                        2,
                                        "0"
                                      )}
                                    </span>

                                    <p>
                                      {step}
                                    </p>

                                  </div>
                                )
                              )}

                            </div>


                            <div className="lesson-example-answer">

                              <span>
                                Answer
                              </span>

                              <p>
                                {
                                  example.answer
                                }
                              </p>

                            </div>

                          </article>
                        )
                      )}

                    </div>

                  </div>

                </section>
              )}


              {/* EXERCISES */}

              {authored.exercises &&
                authored.exercises.length >
                  0 && (
                <section className="lesson-content-section">

                  <span className="lesson-section-number">
                    04
                  </span>


                  <div>

                    <span className="eyebrow">
                      Practice
                    </span>

                    <h2>
                      Try it yourself.
                    </h2>


                    <div className="lesson-exercise-list">

                      {authored.exercises.map(
                        (
                          exercise,
                          index
                        ) => (
                          <article
                            key={
                              exercise.question
                            }
                            className="lesson-exercise-card"
                          >

                            <span className="lesson-exercise-number">
                              Exercise{" "}
                              {index + 1}
                            </span>


                            <p>
                              {
                                exercise.question
                              }
                            </p>


                            {exercise.hint && (
                              <details>

                                <summary>
                                  Show hint
                                </summary>

                                <p>
                                  {
                                    exercise.hint
                                  }
                                </p>

                              </details>
                            )}


                            <details>

                              <summary>
                                Check answer
                              </summary>

                              <p>
                                {
                                  exercise.answer
                                }
                              </p>

                            </details>

                          </article>
                        )
                      )}

                    </div>

                  </div>

                </section>
              )}


              {/* QUIZ */}

              {authored.quiz &&
                authored.quiz.length >
                  0 && (
                <section className="lesson-content-section">

                  <span className="lesson-section-number">
                    05
                  </span>


                  <div>

                    <span className="eyebrow">
                      Knowledge check
                    </span>

                    <h2>
                      Test your
                      understanding.
                    </h2>


                    <LessonQuiz
                      questions={
                        authored.quiz
                      }
                    />

                  </div>

                </section>
              )}


              {/* SUMMARY */}

              <section className="lesson-content-section">

                <span className="lesson-section-number">
                  06
                </span>


                <div>

                  <span className="eyebrow">
                    Lesson summary
                  </span>

                  <h2>
                    What to remember.
                  </h2>


                  <div className="lesson-summary-list">

                    {authored.summary.map(
                      (
                        point,
                        index
                      ) => (
                        <div
                          key={
                            point
                          }
                        >

                          <span>
                            {String(
                              index + 1
                            ).padStart(
                              2,
                              "0"
                            )}
                          </span>

                          <p>
                            {point}
                          </p>

                        </div>
                      )
                    )}

                  </div>


                  {authored.nextStep && (
                    <div className="lesson-next-step">

                      <span>
                        Up next
                      </span>

                      <strong>
                        {
                          authored.nextStep
                        }
                      </strong>

                    </div>
                  )}

                </div>

              </section>

            </>
          ) : (

            <FallbackLessonContent
              moduleTitle={
                lesson.moduleTitle
              }
              courseTitle={
                course.title
              }
              skills={
                lessonSkills
              }
            />

          )}


          {/* ==============================================================
              COMPLETE LESSON
              ============================================================== */}

          <section className="lesson-complete-panel">

            {isCompleted ? (

              <div className="lesson-complete-success">

                <span className="lesson-complete-icon">
                  ✓
                </span>


                <div>

                  <span className="eyebrow">
                    Lesson complete
                  </span>

                  <h2>
                    Progress saved.
                  </h2>

                  <p>
                    This lesson has been
                    added to your course
                    progress.
                  </p>

                </div>

              </div>

            ) : (

              <div>

                <span className="eyebrow">
                  Finish lesson
                </span>

                <h2>
                  Ready to move on?
                </h2>

                <p>
                  Mark this lesson
                  complete when you are
                  comfortable with the
                  main ideas.
                </p>


                <form
                  action={
                    completeLesson
                  }
                >

                  <input
                    type="hidden"
                    name="courseSlug"
                    value={
                      course.slug
                    }
                  />

                  <input
                    type="hidden"
                    name="lessonKey"
                    value={
                      lesson.key
                    }
                  />


                  <button
                    type="submit"
                    className="button lesson-complete-button"
                  >
                    Mark lesson complete
                  </button>

                </form>

              </div>

            )}

          </section>


          {/* ==============================================================
              PREVIOUS / NEXT
              ============================================================== */}

          <nav
            className="lesson-bottom-nav"
            aria-label="Lesson navigation"
          >

            <div>

              {navigation.previous &&
              previousTitle ? (

                <Link
                  href={`/courses/${course.slug}/learn/${navigation.previous.key}`}
                  className="lesson-bottom-link"
                >
                  <small>
                    ← Previous lesson
                  </small>

                  <strong>
                    {previousTitle}
                  </strong>
                </Link>

              ) : (
                <div />
              )}

            </div>


            <div>

              {navigation.next &&
              nextTitle ? (

                <Link
                  href={`/courses/${course.slug}/learn/${navigation.next.key}`}
                  className="lesson-bottom-link next"
                >
                  <small>
                    Next lesson →
                  </small>

                  <strong>
                    {nextTitle}
                  </strong>
                </Link>

              ) : (

                <Link
                  href="/dashboard"
                  className="lesson-bottom-link next"
                >
                  <small>
                    Course progress →
                  </small>

                  <strong>
                    Return to dashboard
                  </strong>
                </Link>

              )}

            </div>

          </nav>

        </article>

      </div>

    </main>
  );
}