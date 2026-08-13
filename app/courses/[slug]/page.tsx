import type { Metadata } from "next";

import Link from "next/link";
import { notFound } from "next/navigation";

import CourseCard from "@/components/CourseCard";
import CourseEnrollAction from "@/components/CourseEnrollAction";
import Icon from "@/components/Icon";
import SectionHeading from "@/components/SectionHeading";

import {
  courses,
  getCourse,
  getLevel,
  getSubject,
  relatedCourses,
} from "@/lib/data";


/* ==========================================================================
   STATIC ROUTES
   ========================================================================== */

export function generateStaticParams() {
  return courses.map((course) => ({
    slug: course.slug,
  }));
}


/* ==========================================================================
   METADATA
   ========================================================================== */

export async function generateMetadata({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const course = getCourse(slug);

  if (!course) {
    return {
      title: "Course",
    };
  }

  const subject = getSubject(
    course.subject
  );

  const level = getLevel(
    course.level
  );


  return {
    title: course.title,

    description:
      course.description,

    openGraph: {
      title:
        `${course.title} | My Academic Tutor`,

      description:
        course.description,
    },

    keywords: [
      course.title,
      subject?.name ?? "",
      level?.name ?? "",
      ...course.skills,
    ].filter(Boolean),
  };
}


/* ==========================================================================
   LEVEL HELPERS
   ========================================================================== */

function getLevelLabel(
  level: string
) {
  switch (level) {
    case "high-school":
      return "High School";

    case "undergraduate":
      return "Undergraduate";

    case "postgraduate":
      return "Postgraduate";

    case "casual":
      return "Learn for Yourself";

    default:
      return "Course";
  }
}


function getRecommendedBackground(
  level: string
) {
  switch (level) {
    case "high-school":
      return {
        title:
          "Beginner-friendly",

        copy:
          "No advanced prior knowledge is expected. The course is designed to build understanding step by step.",
      };

    case "undergraduate":
      return {
        title:
          "University foundations",

        copy:
          "Some familiarity with basic quantitative reasoning is useful, but important concepts are developed carefully throughout the course.",
      };

    case "postgraduate":
      return {
        title:
          "Advanced study",

        copy:
          "This course is best suited to learners with relevant undergraduate-level foundations or equivalent practical experience.",
      };

    case "casual":
      return {
        title:
          "Flexible entry",

        copy:
          "Designed for independent learners. Start with the foundations and progress at your own pace.",
      };

    default:
      return {
        title:
          "Structured learning",

        copy:
          "Follow the course progressively from the opening module.",
      };
  }
}


/* ==========================================================================
   PAGE
   ========================================================================== */

export default async function CoursePage({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}) {
  const { slug } =
    await params;

  const course =
    getCourse(slug);


  if (!course) {
    notFound();
  }


  const subject =
    getSubject(
      course.subject
    );

  const level =
    getLevel(
      course.level
    );


  if (
    !subject ||
    !level
  ) {
    notFound();
  }


  const recommendations =
    relatedCourses(
      course.slug,
      3
    );

  const background =
    getRecommendedBackground(
      course.level
    );

  const levelLabel =
    getLevelLabel(
      course.level
    );


  return (
    <>

      {/* ==================================================================
          HERO
         ================================================================== */}

      <section className="page-hero">
        <div className="shell course-hero">

          {/* --------------------------------------------------------------
              MAIN HERO
             -------------------------------------------------------------- */}

          <div>

            <div className="breadcrumbs">
              Home / Courses / {course.title}
            </div>


            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                flexWrap: "wrap",
                marginTop: "30px",
              }}
            >

              <Link
                href={`/subjects/${subject.slug}`}
                className={`mini-symbol ${subject.accent}`}
                aria-label={`Explore ${subject.name}`}
              >
                {subject.symbol}
              </Link>


              <span className="eyebrow">
                {subject.name}
              </span>


              <span
                style={{
                  color: "#b1aba0",
                  fontSize: "11px",
                }}
                aria-hidden="true"
              >
                •
              </span>


              <span className="eyebrow">
                {levelLabel}
              </span>

            </div>


            <h1>
              {course.title}
            </h1>


            <p>
              {course.description}
            </p>


            {/* REAL LEARNER ENROLMENT */}

            <CourseEnrollAction
              courseSlug={
                course.slug
              }
            />


            <div className="hero-actions">

              <Link
                href="#curriculum"
                className="button"
              >
                Explore curriculum

                <Icon
                  name="arrow"
                  size={16}
                />
              </Link>


              <Link
                href="/contact"
                className="button button-outline"
              >
                Ask about this course
              </Link>

            </div>


            <div className="hero-proof">

              <span>
                <Icon
                  name="check"
                  size={14}
                />

                {course.lessons} lessons
              </span>


              <span>
                <Icon
                  name="check"
                  size={14}
                />

                {course.duration}
              </span>


              <span>
                <Icon
                  name="check"
                  size={14}
                />

                {course.modules.length} modules
              </span>


              <span>
                <Icon
                  name="check"
                  size={14}
                />

                {levelLabel}
              </span>

            </div>

          </div>


          {/* --------------------------------------------------------------
              COURSE SUMMARY CARD
             -------------------------------------------------------------- */}

          <aside className="course-hero-card">

            <span className="eyebrow light">
              Course overview
            </span>


            <div
              className={`mini-symbol ${subject.accent}`}
              style={{
                width: "52px",
                height: "52px",
                marginTop: "24px",
                fontSize: "18px",
              }}
            >
              {subject.symbol}
            </div>


            <h3>
              {course.title}
            </h3>


            <p
              style={{
                color: "#aaa69e",
                fontSize: "12px",
                lineHeight: 1.65,
              }}
            >
              A structured{" "}
              {levelLabel.toLowerCase()}{" "}
              course in {subject.name},
              designed around
              understanding, progressive
              practice and practical
              application.
            </p>


            <div
              style={{
                display: "grid",
                gap: "10px",
                marginTop: "24px",
              }}
            >

              <div
                style={{
                  display: "flex",
                  justifyContent:
                    "space-between",
                  gap: "20px",
                  paddingBottom: "10px",
                  borderBottom:
                    "1px solid #2e2e2e",
                }}
              >
                <span
                  style={{
                    color: "#88847d",
                    fontSize: "10px",
                  }}
                >
                  Subject
                </span>

                <strong
                  style={{
                    fontSize: "11px",
                  }}
                >
                  {subject.name}
                </strong>
              </div>


              <div
                style={{
                  display: "flex",
                  justifyContent:
                    "space-between",
                  gap: "20px",
                  paddingBottom: "10px",
                  borderBottom:
                    "1px solid #2e2e2e",
                }}
              >
                <span
                  style={{
                    color: "#88847d",
                    fontSize: "10px",
                  }}
                >
                  Level
                </span>

                <strong
                  style={{
                    fontSize: "11px",
                  }}
                >
                  {levelLabel}
                </strong>
              </div>


              <div
                style={{
                  display: "flex",
                  justifyContent:
                    "space-between",
                  gap: "20px",
                  paddingBottom: "10px",
                  borderBottom:
                    "1px solid #2e2e2e",
                }}
              >
                <span
                  style={{
                    color: "#88847d",
                    fontSize: "10px",
                  }}
                >
                  Lessons
                </span>

                <strong
                  style={{
                    fontSize: "11px",
                  }}
                >
                  {course.lessons}
                </strong>
              </div>


              <div
                style={{
                  display: "flex",
                  justifyContent:
                    "space-between",
                  gap: "20px",
                }}
              >
                <span
                  style={{
                    color: "#88847d",
                    fontSize: "10px",
                  }}
                >
                  Suggested pace
                </span>

                <strong
                  style={{
                    fontSize: "11px",
                  }}
                >
                  {course.duration}
                </strong>
              </div>

            </div>


            <Link
              href="#curriculum"
              className="button button-white"
              style={{
                width: "100%",
                marginTop: "26px",
              }}
            >
              View curriculum

              <Icon
                name="arrow"
                size={15}
              />
            </Link>


            <p
              style={{
                margin: "13px 0 0",
                color: "#77736d",
                fontSize: "9px",
                textAlign: "center",
                lineHeight: 1.5,
              }}
            >
              Start the course to add it
              to your learner dashboard
              and track your progress.
            </p>

          </aside>

        </div>
      </section>


      {/* ==================================================================
          COURSE NAVIGATION
         ================================================================== */}

      <section className="trust-strip">
        <div className="shell">

          <div
            style={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "9px",
            }}
          >

            <span
              style={{
                marginRight: "6px",
                color: "#8b867e",
                fontSize: "9px",
                fontWeight: 800,
                textTransform:
                  "uppercase",
                letterSpacing:
                  ".13em",
              }}
            >
              Course
            </span>


            <Link
              href="#overview"
              className="filter-link"
            >
              Overview
            </Link>


            <Link
              href="#skills"
              className="filter-link"
            >
              Skills
            </Link>


            <Link
              href="#curriculum"
              className="filter-link"
            >
              Curriculum
            </Link>


            <Link
              href="#approach"
              className="filter-link"
            >
              Learning approach
            </Link>


            <Link
              href="#support"
              className="filter-link"
            >
              Tutor support
            </Link>

          </div>

        </div>
      </section>


      {/* ==================================================================
          OVERVIEW
         ================================================================== */}

      <section
        className="section"
        id="overview"
      >
        <div className="shell">

          <SectionHeading
            eyebrow="Course overview"
            title="Know what you are learning—and why."
            description={
              course.description
            }
          />


          <div className="feature-list">

            <div className="feature-item">

              <span
                className={`mini-symbol ${subject.accent}`}
              >
                01
              </span>

              <div>
                <strong>
                  Structured progression
                </strong>

                <p
                  style={{
                    margin: "5px 0 0",
                    color: "#6d6961",
                    fontSize: "12px",
                    lineHeight: 1.6,
                  }}
                >
                  Move through topics in a
                  logical order rather than
                  learning isolated
                  techniques.
                </p>
              </div>

            </div>


            <div className="feature-item">

              <span
                className={`mini-symbol ${subject.accent}`}
              >
                02
              </span>

              <div>
                <strong>
                  Clear explanations
                </strong>

                <p
                  style={{
                    margin: "5px 0 0",
                    color: "#6d6961",
                    fontSize: "12px",
                    lineHeight: 1.6,
                  }}
                >
                  Build conceptual
                  understanding before
                  moving into procedures,
                  calculations or code.
                </p>
              </div>

            </div>


            <div className="feature-item">

              <span
                className={`mini-symbol ${subject.accent}`}
              >
                03
              </span>

              <div>
                <strong>
                  Applied practice
                </strong>

                <p
                  style={{
                    margin: "5px 0 0",
                    color: "#6d6961",
                    fontSize: "12px",
                    lineHeight: 1.6,
                  }}
                >
                  Reinforce learning through
                  examples, exercises and
                  practical applications.
                </p>
              </div>

            </div>


            <div className="feature-item">

              <span
                className={`mini-symbol ${subject.accent}`}
              >
                04
              </span>

              <div>
                <strong>
                  Connected learning
                </strong>

                <p
                  style={{
                    margin: "5px 0 0",
                    color: "#6d6961",
                    fontSize: "12px",
                    lineHeight: 1.6,
                  }}
                >
                  See where this course fits
                  within the wider{" "}
                  {subject.name} learning
                  journey.
                </p>
              </div>

            </div>

          </div>

        </div>
      </section>


      {/* ==================================================================
          SKILLS
         ================================================================== */}

      <section
        className="section soft"
        id="skills"
      >
        <div className="shell">

          <SectionHeading
            eyebrow="Skills you will build"
            title="Finish with capability, not just content watched."
            description="The course is organised around the knowledge and practical abilities you should develop as you progress."
          />


          <div className="feature-list">

            {course.skills.map(
              (
                skill,
                index
              ) => (
                <div
                  className="feature-item"
                  key={skill}
                >

                  <span
                    className={`mini-symbol ${subject.accent}`}
                  >
                    {String(
                      index + 1
                    ).padStart(
                      2,
                      "0"
                    )}
                  </span>


                  <div>

                    <strong>
                      {skill}
                    </strong>

                    <p
                      style={{
                        margin:
                          "5px 0 0",
                        color:
                          "#6d6961",
                        fontSize:
                          "12px",
                        lineHeight:
                          1.6,
                      }}
                    >
                      Develop this skill
                      progressively through
                      explanation, examples
                      and application
                      throughout the course.
                    </p>

                  </div>

                </div>
              )
            )}

          </div>

        </div>
      </section>


      {/* ==================================================================
          CURRICULUM
         ================================================================== */}

      <section
        className="section"
        id="curriculum"
      >
        <div className="shell">

          <SectionHeading
            eyebrow="Course curriculum"
            title={`${course.modules.length} modules. One coherent journey.`}
            description={`Work through the curriculum in sequence to build a complete understanding of ${course.title}.`}
          />


          <div className="module-list">

            {course.modules.map(
              (
                module,
                index
              ) => (
                <div
                  className="module-row"
                  key={module}
                >

                  <span className="module-num">
                    {String(
                      index + 1
                    ).padStart(
                      2,
                      "0"
                    )}
                  </span>


                  <div>

                    <strong
                      style={{
                        display:
                          "block",
                        fontSize:
                          "13px",
                      }}
                    >
                      {module}
                    </strong>

                    <small
                      style={{
                        display:
                          "block",
                        marginTop:
                          "3px",
                        color:
                          "#858077",
                        fontSize:
                          "10px",
                      }}
                    >
                      Concepts · Examples ·
                      Practice
                    </small>

                  </div>


                  <span
                    style={{
                      color: "#918c84",
                      fontSize: "10px",
                      fontWeight: 700,
                    }}
                  >
                    Module {index + 1}
                  </span>

                </div>
              )
            )}

          </div>

        </div>
      </section>


      {/* ==================================================================
          BACKGROUND
         ================================================================== */}

      <section className="section dark">
        <div className="shell">

          <SectionHeading
            eyebrow="Before you start"
            title={
              background.title
            }
            description={
              background.copy
            }
          />


          <div className="level-grid">

            <div className="level-card course-dark-card">

              <span className="num">
                01
              </span>

              <h3>
                Start where you are
              </h3>

              <small>
                No need to know
                everything
              </small>

              <p>
                Use the course structure
                to identify gaps and build
                missing foundations
                progressively.
              </p>

            </div>


            <div className="level-card course-dark-card">

              <span className="num">
                02
              </span>

              <h3>
                Work actively
              </h3>

              <small>
                Learning requires practice
              </small>

              <p>
                Pause, calculate, code,
                explain and solve rather
                than treating lessons as
                passive video content.
              </p>

            </div>


            <div className="level-card course-dark-card">

              <span className="num">
                03
              </span>

              <h3>
                Ask questions
              </h3>

              <small>
                Confusion is useful
                information
              </small>

              <p>
                Identify exactly where
                your understanding breaks
                down and revisit the
                concept or seek expert
                help.
              </p>

            </div>


            <div className="level-card course-dark-card">

              <span className="num">
                04
              </span>

              <h3>
                Apply it
              </h3>

              <small>
                Move beyond examples
              </small>

              <p>
                Use the ideas in your own
                problems, assignments,
                projects, analyses or
                research.
              </p>

            </div>

          </div>

        </div>
      </section>


      {/* ==================================================================
          LEARNING APPROACH
         ================================================================== */}

      <section
        className="section"
        id="approach"
      >
        <div className="shell">

          <SectionHeading
            eyebrow="Learning approach"
            title="From explanation to independent application."
            description="The goal is not simply to finish lessons. The goal is to reach the point where you can use the ideas without being guided through every step."
          />


          <div className="level-grid">

            <div className="level-card">

              <span className="num">
                01
              </span>

              <h3>
                Understand
              </h3>

              <small>
                Learn the idea
              </small>

              <p>
                Start with intuitive
                explanation and build the
                underlying reasoning.
              </p>

            </div>


            <div className="level-card">

              <span className="num">
                02
              </span>

              <h3>
                See it
              </h3>

              <small>
                Use examples and visuals
              </small>

              <p>
                Connect abstract ideas to
                examples, diagrams,
                computation and
                interactive
                demonstrations.
              </p>

            </div>


            <div className="level-card">

              <span className="num">
                03
              </span>

              <h3>
                Practise
              </h3>

              <small>
                Build fluency
              </small>

              <p>
                Work through
                progressively more
                challenging questions and
                applications.
              </p>

            </div>


            <div className="level-card">

              <span className="num">
                04
              </span>

              <h3>
                Apply
              </h3>

              <small>
                Work independently
              </small>

              <p>
                Transfer your learning to
                examinations, code,
                projects, research or
                real datasets.
              </p>

            </div>

          </div>


          <div
            style={{
              marginTop: "30px",
            }}
          >
            <Link
              href="/labs"
              className="button button-outline"
            >
              Explore interactive labs

              <Icon
                name="arrow"
                size={16}
              />
            </Link>
          </div>

        </div>
      </section>


      {/* ==================================================================
          TUTOR SUPPORT
         ================================================================== */}

      <section
        className="section soft"
        id="support"
      >
        <div className="shell">

          <div className="cta-band">

            <div>

              <span className="eyebrow light">
                Expert support
              </span>

              <h2>
                Stuck somewhere in the
                course?
              </h2>

            </div>


            <div>

              <p>
                Use 1-to-1 tutoring when
                you need a deeper
                explanation, feedback on
                your understanding, help
                with a related university
                topic or support applying
                the method to your own
                work.
              </p>


              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  flexWrap: "wrap",
                  marginTop: "20px",
                }}
              >

                <Link
                  href="/tutoring"
                  className="button button-white"
                >
                  Explore tutoring

                  <Icon
                    name="arrow"
                    size={16}
                  />
                </Link>


                <Link
                  href="/contact"
                  className="button"
                  style={{
                    borderColor:
                      "#444",
                  }}
                >
                  Ask about support
                </Link>

              </div>

            </div>

          </div>

        </div>
      </section>


      {/* ==================================================================
          RELATED COURSES
         ================================================================== */}

      {recommendations.length >
        0 && (
        <section className="section">
          <div className="shell">

            <SectionHeading
              eyebrow="Continue learning"
              title={`More in ${subject.name}.`}
              description="Build on this course by continuing into related topics within the same discipline."
            />


            <div className="course-grid">

              {recommendations.map(
                (
                  recommendedCourse
                ) => (
                  <CourseCard
                    key={
                      recommendedCourse.slug
                    }
                    course={
                      recommendedCourse
                    }
                  />
                )
              )}

            </div>


            <div
              style={{
                marginTop: "32px",
              }}
            >
              <Link
                href={`/subjects/${subject.slug}`}
                className="button button-outline"
              >
                Explore all{" "}
                {subject.name}

                <Icon
                  name="arrow"
                  size={16}
                />
              </Link>
            </div>

          </div>
        </section>
      )}


      {/* ==================================================================
          FINAL CTA
         ================================================================== */}

      <section className="section soft">
        <div className="shell">

          <div className="testimonial">

            <div className="quote-mark">
              “
            </div>


            <div>

              <blockquote>
                The aim is not to finish{" "}
                {course.title}. The aim
                is to reach the point
                where you can use it.
              </blockquote>


              <cite>
                My Academic Tutor
                learning philosophy
              </cite>


              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "10px",
                  marginTop: "26px",
                }}
              >

                <Link
                  href="/learning"
                  className="button"
                >
                  Find my learning path

                  <Icon
                    name="arrow"
                    size={16}
                  />
                </Link>


                <Link
                  href="/courses"
                  className="button button-outline"
                >
                  Browse courses
                </Link>

              </div>

            </div>

          </div>

        </div>
      </section>

    </>
  );
}