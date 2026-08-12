import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import CourseCard from "@/components/CourseCard";
import Icon from "@/components/Icon";
import SectionHeading from "@/components/SectionHeading";

import {
  getLevel,
  getSubject,
  levels,
  pathways,
  subjectCourses,
  subjects,
} from "@/lib/data";


/* ==========================================================================
   STATIC ROUTES
   ========================================================================== */

export function generateStaticParams() {
  return subjects.flatMap((subject) =>
    levels.map((level) => ({
      slug: subject.slug,
      level: level.slug,
    }))
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
    level: string;
  }>;
}): Promise<Metadata> {
  const { slug, level } = await params;

  const subject = getSubject(slug);
  const learningLevel = getLevel(level);

  if (!subject || !learningLevel) {
    return {
      title: "Learning Route",
    };
  }

  return {
    title: `${subject.name} — ${learningLevel.name}`,

    description:
      `Explore ${subject.name} courses, topics and structured learning pathways for ${learningLevel.name.toLowerCase()} learners.`,

    openGraph: {
      title:
        `${subject.name} — ${learningLevel.name} | My Academic Tutor`,

      description:
        `Structured ${subject.name} learning for ${learningLevel.name.toLowerCase()} learners.`,
    },
  };
}


/* ==========================================================================
   HELPERS
   ========================================================================== */

function getLevelIntro(
  subjectName: string,
  levelSlug: string
) {
  switch (levelSlug) {
    case "high-school":
      return {
        eyebrow: "Build strong foundations",

        title:
          `${subjectName} for High School`,

        description:
          `Develop confidence in ${subjectName.toLowerCase()} through clear explanations, structured practice and curriculum-aware learning designed for school-level study and examinations.`,

        emphasis:
          "Foundations · Confidence · Exams",
      };

    case "undergraduate":
      return {
        eyebrow: "Master university study",

        title:
          `${subjectName} for Undergraduates`,

        description:
          `Strengthen university-level understanding of ${subjectName.toLowerCase()} with structured courses, worked examples, practical applications and deeper conceptual explanation.`,

        emphasis:
          "Modules · Assignments · Exams",
      };

    case "postgraduate":
      return {
        eyebrow: "Go deeper",

        title:
          `Advanced ${subjectName}`,

        description:
          `Explore specialist methods, advanced theory, research workflows and technical applications in ${subjectName.toLowerCase()} for postgraduate and research-level learning.`,

        emphasis:
          "Advanced methods · Research · Application",
      };

    case "casual":
      return {
        eyebrow: "Learn for yourself",

        title:
          `Learn ${subjectName} at Your Own Pace`,

        description:
          `Build useful ${subjectName.toLowerCase()} skills for curiosity, career development, practical projects or personal growth—without needing to follow a formal academic programme.`,

        emphasis:
          "Skills · Career · Curiosity",
      };

    default:
      return {
        eyebrow: "Structured learning",

        title: subjectName,

        description:
          `Explore structured learning in ${subjectName}.`,

        emphasis:
          "Understand · Practise · Apply",
      };
  }
}


/* ==========================================================================
   PAGE
   ========================================================================== */

export default async function SubjectLevelPage({
  params,
}: {
  params: Promise<{
    slug: string;
    level: string;
  }>;
}) {
  const { slug, level } = await params;

  const subject = getSubject(slug);
  const learningLevel = getLevel(level);

  if (!subject || !learningLevel) {
    notFound();
  }

  const routeCourses = subjectCourses(
    subject.slug,
    learningLevel.slug
  );

  const subjectPathways = pathways
    .filter(
      (pathway) =>
        pathway.subject.toLowerCase() ===
        subject.name.toLowerCase()
    )
    .slice(0, 3);

  const intro = getLevelIntro(
    subject.name,
    learningLevel.slug
  );


  return (
    <>
      {/* ==================================================================
          HERO
         ================================================================== */}

      <section className="page-hero">
        <div className="shell subject-hero-grid">
          <div>
            <div className="breadcrumbs">
              Home / Subjects / {subject.name} /{" "}
              {learningLevel.name}
            </div>

            <span
              className="eyebrow"
              style={{
                display: "inline-block",
                marginTop: "30px",
              }}
            >
              {intro.eyebrow}
            </span>

            <h1>
              {intro.title}
            </h1>

            <p>
              {intro.description}
            </p>

            <div className="hero-actions">
              <Link
                href="#courses"
                className="button"
              >
                Explore courses

                <Icon
                  name="arrow"
                  size={16}
                />
              </Link>

              <Link
                href="/learning"
                className="button button-outline"
              >
                Find my learning path
              </Link>
            </div>

            <div className="hero-proof">
              <span>
                <Icon
                  name="check"
                  size={14}
                />

                {routeCourses.length} courses
              </span>

              <span>
                <Icon
                  name="check"
                  size={14}
                />

                {intro.emphasis}
              </span>
            </div>
          </div>


          {/* --------------------------------------------------------------
              Route summary panel
             -------------------------------------------------------------- */}

          <aside className="subject-panel">
            <span className="eyebrow light">
              Your route
            </span>

            <div
              className="big-symbol"
              style={{
                marginTop: "20px",
              }}
              aria-hidden="true"
            >
              {subject.symbol}
            </div>

            <h2
              style={{
                margin: "18px 0 8px",

                fontFamily:
                  "var(--font-serif), serif",

                fontSize: "30px",
                fontWeight: 600,

                lineHeight: 1.06,

                letterSpacing: "-0.035em",
              }}
            >
              {learningLevel.name}
            </h2>

            <p
              style={{
                margin: 0,

                color: "#aaa69e",

                fontSize: "12px",
                lineHeight: 1.65,
              }}
            >
              {learningLevel.copy}
            </p>

            <div
              className="topic-cloud"
              style={{
                marginTop: "24px",
              }}
            >
              {subject.topics
                .slice(0, 8)
                .map((topic) => (
                  <span key={topic}>
                    {topic}
                  </span>
                ))}
            </div>
          </aside>
        </div>
      </section>


      {/* ==================================================================
          OTHER LEVELS
         ================================================================== */}

      <section className="trust-strip">
        <div className="shell">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "9px",
              flexWrap: "wrap",
            }}
          >
            <span
              style={{
                marginRight: "6px",

                color: "#8b867e",

                fontSize: "9px",
                fontWeight: 800,

                textTransform: "uppercase",

                letterSpacing: ".13em",
              }}
            >
              Switch level
            </span>

            {levels.map((item) => (
              <Link
                key={item.slug}
                href={`/subjects/${subject.slug}/${item.slug}`}
                className="filter-link"
                style={
                  item.slug ===
                  learningLevel.slug
                    ? {
                        background: "#111",
                        color: "#fff",
                        borderColor: "#111",
                      }
                    : undefined
                }
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </section>


      {/* ==================================================================
          COURSES
         ================================================================== */}

      <section
        className="section"
        id="courses"
      >
        <div className="shell">
          <SectionHeading
            eyebrow={`${learningLevel.name} courses`}
            title={`Study ${subject.name} at ${learningLevel.name.toLowerCase()} level.`}
            description="Choose a focused course or combine several courses into a broader learning route. Each course is designed to build understanding progressively."
          />

          {routeCourses.length > 0 ? (
            <div className="course-grid">
              {routeCourses.map((course) => (
                <CourseCard
                  key={course.slug}
                  course={course}
                />
              ))}
            </div>
          ) : (
            <div className="empty-state">
              <h3
                style={{
                  marginTop: 0,

                  fontFamily:
                    "var(--font-serif), serif",

                  fontSize: "28px",
                  fontWeight: 610,

                  letterSpacing: "-.03em",
                }}
              >
                More courses are coming.
              </h3>

              <p>
                We&apos;re expanding the{" "}
                {learningLevel.name.toLowerCase()}{" "}
                {subject.name.toLowerCase()} route.
              </p>

              <Link
                href={`/subjects/${subject.slug}`}
                className="button button-outline"
                style={{
                  marginTop: "14px",
                }}
              >
                Explore all {subject.name}
              </Link>
            </div>
          )}
        </div>
      </section>


      {/* ==================================================================
          WHAT TO FOCUS ON
         ================================================================== */}

      <section className="section soft">
        <div className="shell">
          <SectionHeading
            eyebrow="Learning focus"
            title="What should you build at this stage?"
            description={`Your ${learningLevel.name.toLowerCase()} route should develop both subject knowledge and the ability to use it independently.`}
          />

          <div className="feature-list">
            {getStageOutcomes(
              learningLevel.slug,
              subject.name
            ).map((item, index) => (
              <div
                className="feature-item"
                key={item.title}
              >
                <span
                  className={`mini-symbol ${subject.accent}`}
                >
                  {String(index + 1).padStart(
                    2,
                    "0"
                  )}
                </span>

                <div>
                  <strong>
                    {item.title}
                  </strong>

                  <p
                    style={{
                      margin: "5px 0 0",

                      color: "#6d6961",

                      fontSize: "12px",
                      lineHeight: 1.6,
                    }}
                  >
                    {item.copy}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ==================================================================
          TOPICS
         ================================================================== */}

      <section className="section dark">
        <div className="shell">
          <SectionHeading
            eyebrow="Explore topics"
            title={`The ${subject.name} landscape.`}
            description="Use these topics to understand the breadth of the discipline and identify where you may want to specialise next."
          />

          <div
            className="topic-cloud"
            style={{
              maxWidth: "1000px",
              gap: "10px",
            }}
          >
            {subject.topics.map((topic) => (
              <span
                key={topic}
                style={{
                  padding: "10px 14px",
                  fontSize: "11px",

                  background:
                    "rgba(255,255,255,.025)",
                }}
              >
                {topic}
              </span>
            ))}
          </div>
        </div>
      </section>


      {/* ==================================================================
          PATHWAYS
         ================================================================== */}

      {subjectPathways.length > 0 && (
        <section className="section">
          <div className="shell">
            <SectionHeading
              eyebrow="Go further"
              title={`Where can ${subject.name} take you?`}
              description="Structured pathways connect individual courses into larger academic, technical and career goals."
            />

            <div className="pathway-grid">
              {subjectPathways.map(
                (pathway) => (
                  <Link
                    key={pathway.slug}
                    href={`/pathways/${pathway.slug}`}
                    className="pathway-card"
                  >
                    <div className="top">
                      <span className="eyebrow">
                        {pathway.tag}
                      </span>

                      <Icon
                        name="arrow"
                        size={16}
                      />
                    </div>

                    <h3>
                      {pathway.name}
                    </h3>

                    <p>
                      {pathway.description}
                    </p>

                    <div
                      className="pathway-steps"
                      aria-hidden="true"
                    >
                      {pathway.steps
                        .slice(0, 6)
                        .map((_, index) => (
                          <span
                            key={index}
                          />
                        ))}
                    </div>

                    <small>
                      {pathway.steps.length}{" "}
                      structured stages ·{" "}
                      {pathway.duration}
                    </small>
                  </Link>
                )
              )}
            </div>
          </div>
        </section>
      )}


      {/* ==================================================================
          NEED HELP
         ================================================================== */}

      <section className="section soft">
        <div className="shell">
          <div className="cta-band">
            <div>
              <span className="eyebrow light">
                Personal academic support
              </span>

              <h2>
                Need help with{" "}
                {learningLevel.name.toLowerCase()}{" "}
                {subject.name.toLowerCase()}?
              </h2>
            </div>

            <div>
              <p>
                Get expert support for difficult
                concepts, exam preparation,
                coursework guidance, coding,
                projects and research-related
                learning.
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
                    borderColor: "#444",
                  }}
                >
                  Contact us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ==================================================================
          BACK TO SUBJECT
         ================================================================== */}

      <section className="section">
        <div className="shell">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent:
                "space-between",

              gap: "24px",

              flexWrap: "wrap",
            }}
          >
            <div>
              <span className="eyebrow">
                Explore the full discipline
              </span>

              <h2
                style={{
                  margin: "8px 0 0",

                  fontFamily:
                    "var(--font-serif), serif",

                  fontSize:
                    "clamp(34px,5vw,52px)",

                  fontWeight: 610,

                  lineHeight: 1.04,

                  letterSpacing: "-.04em",
                }}
              >
                More {subject.name}.
              </h2>
            </div>

            <Link
              href={`/subjects/${subject.slug}`}
              className="button button-outline"
            >
              Back to {subject.name}

              <Icon
                name="arrow"
                size={16}
              />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}


/* ==========================================================================
   STAGE-SPECIFIC OUTCOMES
   ========================================================================== */

function getStageOutcomes(
  level: string,
  subjectName: string
) {
  switch (level) {
    case "high-school":
      return [
        {
          title:
            "Build strong foundations",

          copy:
            `Understand the core ideas and language of ${subjectName.toLowerCase()} before moving into more advanced work.`,
        },

        {
          title:
            "Develop problem-solving confidence",

          copy:
            "Learn how to approach unfamiliar questions systematically rather than relying only on memorised procedures.",
        },

        {
          title:
            "Prepare for assessments",

          copy:
            "Connect conceptual understanding with the style of questions, reasoning and communication required in formal examinations.",
        },

        {
          title:
            "Prepare for further study",

          copy:
            "Build the knowledge required to move confidently into university-level quantitative and computational subjects.",
        },
      ];


    case "undergraduate":
      return [
        {
          title:
            "Understand the theory",

          copy:
            `Move beyond lecture-note memorisation and understand why the key ideas in ${subjectName.toLowerCase()} work.`,
        },

        {
          title:
            "Solve university problems",

          copy:
            "Develop the reasoning needed for problem sheets, examinations, assignments and unfamiliar applications.",
        },

        {
          title:
            "Use technical tools",

          copy:
            "Build practical competence with the software, computation or analytical workflows relevant to the discipline.",
        },

        {
          title:
            "Connect modules together",

          copy:
            "See how topics fit into a larger academic framework rather than treating every university module as an isolated subject.",
        },
      ];


    case "postgraduate":
      return [
        {
          title:
            "Master advanced methods",

          copy:
            `Develop deeper technical understanding of specialist ${subjectName.toLowerCase()} methods and their assumptions.`,
        },

        {
          title:
            "Evaluate methods critically",

          copy:
            "Understand when techniques are appropriate, what their limitations are and how alternative approaches compare.",
        },

        {
          title:
            "Work reproducibly",

          copy:
            "Build research-quality computational and analytical workflows that can be understood, checked and reproduced.",
        },

        {
          title:
            "Apply knowledge to research",

          copy:
            "Move from textbook exercises towards independent research questions, projects, dissertations and real datasets.",
        },
      ];


    case "casual":
      return [
        {
          title:
            "Learn useful skills",

          copy:
            `Focus on the parts of ${subjectName.toLowerCase()} that are most valuable for your goals rather than following a formal syllabus.`,
        },

        {
          title:
            "Build practical confidence",

          copy:
            "Learn through realistic examples and projects that help you use your skills outside a classroom.",
        },

        {
          title:
            "Fill knowledge gaps",

          copy:
            "Refresh forgotten concepts or build missing foundations before progressing to more advanced material.",
        },

        {
          title:
            "Learn flexibly",

          copy:
            "Move at your own pace and combine courses from different subjects as your interests and career needs evolve.",
        },
      ];


    default:
      return [];
  }
}