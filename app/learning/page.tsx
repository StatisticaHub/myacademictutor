import type { Metadata } from "next";
import Link from "next/link";

import CourseCard from "@/components/CourseCard";
import Icon from "@/components/Icon";
import PathFinder from "@/components/PathFinder";
import SectionHeading from "@/components/SectionHeading";

import {
  courses,
  getLevel,
  levels,
  pathways,
  subjects,
  type LevelSlug,
} from "@/lib/data";


/* ==========================================================================
   METADATA
   ========================================================================== */

export const metadata: Metadata = {
  title: "Learning Paths",

  description:
    "Find the right learning route across Statistics, Mathematics, Data Science, Bioinformatics and Computer Science based on your level and goals.",

  openGraph: {
    title: "Learning Paths | My Academic Tutor",

    description:
      "Choose your subject, level and goal to build a structured quantitative or computational learning pathway.",
  },
};


/* ==========================================================================
   HELPERS
   ========================================================================== */

function isValidLevel(
  value: string
): value is LevelSlug {
  return levels.some(
    (level) => level.slug === value
  );
}


function getLevelJourney(
  level: LevelSlug
) {
  switch (level) {
    case "high-school":
      return {
        eyebrow: "High School learning",

        title:
          "Build foundations now. Keep your options open later.",

        description:
          "Strengthen core mathematical, statistical and computational thinking while preparing confidently for school assessments and future university study.",

        goals: [
          "Understand difficult school topics",
          "Prepare for exams",
          "Improve problem-solving confidence",
          "Prepare for university",
        ],
      };


    case "undergraduate":
      return {
        eyebrow: "Undergraduate learning",

        title:
          "Turn university modules into real understanding.",

        description:
          "Go beyond lecture notes and memorised procedures. Build the conceptual, mathematical and computational understanding needed for assignments, examinations and later study.",

        goals: [
          "Master university modules",
          "Prepare for examinations",
          "Improve coding and analysis skills",
          "Build foundations for postgraduate study",
        ],
      };


    case "postgraduate":
      return {
        eyebrow: "Postgraduate learning",

        title:
          "Move from taught methods to independent expertise.",

        description:
          "Develop specialist technical knowledge for MSc, MRes, doctoral and professional study, with greater emphasis on research workflows, advanced methods and critical interpretation.",

        goals: [
          "Learn advanced methods",
          "Support dissertation work",
          "Develop research skills",
          "Work with real analytical workflows",
        ],
      };


    case "casual":
      return {
        eyebrow: "Independent learning",

        title:
          "Learn because the skill matters to you.",

        description:
          "Build useful quantitative and computational capability for career development, curiosity, personal projects or a change of direction—without following a formal syllabus.",

        goals: [
          "Build career skills",
          "Learn programming",
          "Understand data",
          "Complete practical projects",
        ],
      };
  }
}


/* ==========================================================================
   PAGE
   ========================================================================== */

export default async function LearningPage({
  searchParams,
}: {
  searchParams?: Promise<{
    level?: string | string[];
  }>;
}) {
  const resolvedSearchParams =
    searchParams
      ? await searchParams
      : undefined;

  const requestedLevelValue =
    Array.isArray(
      resolvedSearchParams?.level
    )
      ? resolvedSearchParams?.level[0]
      : resolvedSearchParams?.level;

  const activeLevelSlug: LevelSlug =
    requestedLevelValue &&
    isValidLevel(requestedLevelValue)
      ? requestedLevelValue
      : "undergraduate";

  const activeLevel =
    getLevel(activeLevelSlug);

  const journey =
    getLevelJourney(activeLevelSlug);

  const levelCourses = courses
    .filter(
      (course) =>
        course.level ===
        activeLevelSlug
    )
    .sort(
      (a, b) =>
        Number(Boolean(b.featured)) -
        Number(Boolean(a.featured))
    )
    .slice(0, 6);

  const featuredPathways =
    pathways.slice(0, 6);


  return (
    <>
      {/* ==================================================================
          HERO
         ================================================================== */}

      <section className="page-hero">
        <div className="shell">
          <div className="breadcrumbs">
            Home / Learning Paths
          </div>

          <span
            className="eyebrow"
            style={{
              display: "inline-block",
              marginTop: "30px",
            }}
          >
            Start with direction
          </span>

          <h1>
            Find the right path
            <br />
            through what you want to learn.
          </h1>

          <p>
            You do not need to know the perfect
            course before you begin. Start with
            your subject, current level and goal.
            We&apos;ll help turn them into a
            structured route.
          </p>

          <div className="hero-actions">
            <Link
              href="#pathfinder"
              className="button"
            >
              Find my learning path

              <Icon
                name="arrow"
                size={16}
              />
            </Link>

            <Link
              href="/subjects"
              className="button button-outline"
            >
              Explore subjects
            </Link>
          </div>

          <div className="hero-proof">
            <span>
              <Icon
                name="check"
                size={14}
              />

              5 disciplines
            </span>

            <span>
              <Icon
                name="check"
                size={14}
              />

              4 learning stages
            </span>

            <span>
              <Icon
                name="check"
                size={14}
              />

              Academic + career pathways
            </span>

            <span>
              <Icon
                name="check"
                size={14}
              />

              Expert support when needed
            </span>
          </div>
        </div>
      </section>


      {/* ==================================================================
          THE MODEL
         ================================================================== */}

      <section className="section soft">
        <div className="shell">
          <SectionHeading
            eyebrow="How the platform works"
            title="Start broad. Become specific."
            description="Instead of confronting you with a giant catalogue, the platform progressively narrows your options until you reach a learning route that makes sense."
          />

          <div className="level-grid">
            <div className="level-card">
              <span className="num">
                01
              </span>

              <h3>
                Subject
              </h3>

              <small>
                What do you want to learn?
              </small>

              <p>
                Choose Statistics,
                Mathematics, Data Science,
                Bioinformatics or Computer
                Science.
              </p>
            </div>


            <div className="level-card">
              <span className="num">
                02
              </span>

              <h3>
                Level
              </h3>

              <small>
                Where are you now?
              </small>

              <p>
                Choose High School,
                Undergraduate, Postgraduate or
                Learn for Yourself.
              </p>
            </div>


            <div className="level-card">
              <span className="num">
                03
              </span>

              <h3>
                Goal
              </h3>

              <small>
                Why are you learning?
              </small>

              <p>
                Prepare for an exam, understand
                a module, build career skills,
                support research or complete a
                project.
              </p>
            </div>


            <div className="level-card">
              <span className="num">
                04
              </span>

              <h3>
                Path
              </h3>

              <small>
                Know what comes next
              </small>

              <p>
                Follow a deliberate sequence of
                courses and skills instead of
                choosing content randomly.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* ==================================================================
          PATH FINDER
         ================================================================== */}

      <section
        className="section"
        id="pathfinder"
      >
        <div className="shell">
          <PathFinder />
        </div>
      </section>


      {/* ==================================================================
          CHOOSE LEVEL
         ================================================================== */}

      <section className="section soft">
        <div className="shell">
          <SectionHeading
            eyebrow="Choose your stage"
            title="Your current stage changes what good learning looks like."
            description="Select a level below to see the kind of courses and outcomes that are most relevant to you."
          />

          <div className="level-grid">
            {levels.map(
              (level, index) => {
                const count =
                  courses.filter(
                    (course) =>
                      course.level ===
                      level.slug
                  ).length;

                const active =
                  level.slug ===
                  activeLevelSlug;

                return (
                  <Link
                    key={level.slug}
                    href={`/learning?level=${level.slug}`}
                    className="level-card"
                    style={
                      active
                        ? {
                            background:
                              "#111",

                            color:
                              "#fff",

                            borderColor:
                              "#111",
                          }
                        : undefined
                    }
                  >
                    <span
                      className="num"
                      style={
                        active
                          ? {
                              color:
                                "#4c4c4c",
                            }
                          : undefined
                      }
                    >
                      {String(
                        index + 1
                      ).padStart(
                        2,
                        "0"
                      )}
                    </span>

                    <h3>
                      {level.name}
                    </h3>

                    <small
                      style={
                        active
                          ? {
                              color:
                                "#d5d1c9",
                            }
                          : undefined
                      }
                    >
                      {count} courses
                    </small>

                    <p
                      style={
                        active
                          ? {
                              color:
                                "#99958d",
                            }
                          : undefined
                      }
                    >
                      {level.copy}
                    </p>

                    <div className="level-card-footer">
                      <span>
                        {active
                          ? "Currently viewing"
                          : "Explore this stage"}
                      </span>

                      <Icon
                        name={
                          active
                            ? "check"
                            : "arrow"
                        }
                        size={15}
                      />
                    </div>
                  </Link>
                );
              }
            )}
          </div>
        </div>
      </section>


      {/* ==================================================================
          ACTIVE LEVEL EXPERIENCE
         ================================================================== */}

      <section className="section">
        <div className="shell">
          <SectionHeading
            eyebrow={journey.eyebrow}
            title={journey.title}
            description={journey.description}
          />

          <div className="feature-list">
            {journey.goals.map(
              (goal, index) => (
                <div
                  key={goal}
                  className="feature-item"
                >
                  <span className="mini-symbol">
                    {String(
                      index + 1
                    ).padStart(
                      2,
                      "0"
                    )}
                  </span>

                  <div>
                    <strong>
                      {goal}
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
                      Build towards this
                      outcome through a
                      deliberate combination
                      of explanation,
                      practice and application.
                    </p>
                  </div>
                </div>
              )
            )}
          </div>

          {activeLevel && (
            <div
              style={{
                marginTop: "26px",

                padding: "22px",

                border:
                  "1px solid var(--line)",

                borderRadius:
                  "18px",

                background:
                  "#fff",
              }}
            >
              <span className="eyebrow">
                About this stage
              </span>

              <h3
                style={{
                  margin:
                    "7px 0 7px",

                  fontFamily:
                    "var(--font-serif), serif",

                  fontSize:
                    "27px",

                  fontWeight:
                    610,

                  letterSpacing:
                    "-.03em",
                }}
              >
                {activeLevel.name}
              </h3>

              <p
                style={{
                  maxWidth:
                    "760px",

                  margin: 0,

                  color:
                    "#6b675f",

                  fontSize:
                    "13px",

                  lineHeight:
                    1.65,
                }}
              >
                {activeLevel.copy}
              </p>
            </div>
          )}
        </div>
      </section>


      {/* ==================================================================
          SUBJECT × LEVEL
         ================================================================== */}

      <section className="section dark">
        <div className="shell">
          <SectionHeading
            eyebrow="Choose a discipline"
            title={`Explore ${activeLevel?.name ?? "your level"} learning by subject.`}
            description="Each discipline has a dedicated route at this learning stage, so the depth, examples and applications can be appropriate for you."
          />

          <div className="subject-grid">
            {subjects.map(
              (subject) => {
                const count =
                  courses.filter(
                    (course) =>
                      course.subject ===
                        subject.slug &&
                      course.level ===
                        activeLevelSlug
                  ).length;

                return (
                  <Link
                    key={
                      subject.slug
                    }
                    href={`/subjects/${subject.slug}/${activeLevelSlug}`}
                    className={`subject-card ${subject.accent}`}
                    style={{
                      background:
                        "#181818",

                      borderColor:
                        "#292929",

                      color: "#fff",
                    }}
                  >
                    <span className="subject-symbol">
                      {subject.symbol}
                    </span>

                    <h3>
                      {subject.name}
                    </h3>

                    <p
                      style={{
                        color:
                          "#9d9991",
                      }}
                    >
                      {
                        subject.short
                      }
                    </p>

                    <div className="card-arrow">
                      <span>
                        {count}{" "}
                        {count === 1
                          ? "course"
                          : "courses"}
                      </span>

                      <Icon
                        name="arrow"
                        size={16}
                      />
                    </div>
                  </Link>
                );
              }
            )}
          </div>
        </div>
      </section>


      {/* ==================================================================
          RECOMMENDED COURSES BY ACTIVE LEVEL
         ================================================================== */}

      <section className="section soft">
        <div className="shell">
          <SectionHeading
            eyebrow={`${activeLevel?.name ?? "Recommended"} courses`}
            title="A few places you could start."
            description="These courses span different subjects at your selected learning stage. Your best starting point depends on the foundations you already have and what you want to achieve."
          />

          {levelCourses.length >
          0 ? (
            <>
              <div className="course-grid">
                {levelCourses.map(
                  (course) => (
                    <CourseCard
                      key={
                        course.slug
                      }
                      course={
                        course
                      }
                    />
                  )
                )}
              </div>

              <div
                style={{
                  marginTop:
                    "34px",
                }}
              >
                <Link
                  href="/courses"
                  className="button button-outline"
                >
                  Browse all courses

                  <Icon
                    name="arrow"
                    size={16}
                  />
                </Link>
              </div>
            </>
          ) : (
            <div className="empty-state">
              More courses for this
              stage are currently being
              developed.
            </div>
          )}
        </div>
      </section>


      {/* ==================================================================
          PATHWAYS
         ================================================================== */}

      <section className="section">
        <div className="shell">
          <SectionHeading
            eyebrow="Longer journeys"
            title="Sometimes one course is not the goal."
            description="Pathways combine multiple courses and capabilities into a structured route towards an academic, research or career objective."
          />

          <div className="pathway-grid">
            {featuredPathways.map(
              (pathway) => (
                <Link
                  key={
                    pathway.slug
                  }
                  href={`/pathways/${pathway.slug}`}
                  className="pathway-card"
                >
                  <div className="top">
                    <span className="eyebrow">
                      {pathway.tag}
                    </span>

                    <span
                      style={{
                        color:
                          "#8a857b",

                        fontSize:
                          "10px",

                        fontWeight:
                          700,
                      }}
                    >
                      {
                        pathway.duration
                      }
                    </span>
                  </div>

                  <h3>
                    {pathway.name}
                  </h3>

                  <p>
                    {
                      pathway.description
                    }
                  </p>

                  <div
                    className="pathway-steps"
                    aria-hidden="true"
                  >
                    {pathway.steps
                      .slice(0, 7)
                      .map(
                        (
                          _,
                          index
                        ) => (
                          <span
                            key={
                              index
                            }
                          />
                        )
                      )}
                  </div>

                  <div
                    style={{
                      display:
                        "flex",

                      alignItems:
                        "center",

                      justifyContent:
                        "space-between",

                      gap:
                        "12px",

                      marginTop:
                        "12px",

                      fontSize:
                        "10px",

                      fontWeight:
                        700,
                    }}
                  >
                    <span>
                      {
                        pathway.steps
                          .length
                      }{" "}
                      stages
                    </span>

                    <Icon
                      name="arrow"
                      size={15}
                    />
                  </div>
                </Link>
              )
            )}
          </div>

          <div
            style={{
              marginTop:
                "32px",
            }}
          >
            <Link
              href="/pathways"
              className="button button-outline"
            >
              Explore all pathways

              <Icon
                name="arrow"
                size={16}
              />
            </Link>
          </div>
        </div>
      </section>


      {/* ==================================================================
          DON'T KNOW FOUNDATIONS?
         ================================================================== */}

      <section className="section soft">
        <div className="shell">
          <div className="testimonial">
            <div className="quote-mark">
              ?
            </div>

            <div>
              <span className="eyebrow">
                Unsure about your level?
              </span>

              <blockquote>
                Start slightly below the
                point where everything feels
                difficult.
              </blockquote>

              <cite>
                Strong foundations usually
                make advanced learning faster,
                not slower.
              </cite>

              <div
                style={{
                  display:
                    "flex",

                  flexWrap:
                    "wrap",

                  gap:
                    "10px",

                  marginTop:
                    "26px",
                }}
              >
                <Link
                  href="#pathfinder"
                  className="button"
                >
                  Use the Path Finder

                  <Icon
                    name="arrow"
                    size={16}
                  />
                </Link>

                <Link
                  href="/contact"
                  className="button button-outline"
                >
                  Ask for guidance
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ==================================================================
          TUTORING
         ================================================================== */}

      <section className="section">
        <div className="shell">
          <div className="cta-band">
            <div>
              <span className="eyebrow light">
                Human support when it matters
              </span>

              <h2>
                A learning path does not have
                to be a solo journey.
              </h2>
            </div>

            <div>
              <p>
                Use courses and interactive
                resources independently, then
                bring in an expert tutor for
                difficult concepts, exam
                preparation, university work,
                coding or research support.
              </p>

              <div
                style={{
                  display:
                    "flex",

                  gap:
                    "10px",

                  flexWrap:
                    "wrap",

                  marginTop:
                    "20px",
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
                  Talk to us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}