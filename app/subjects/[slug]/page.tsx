import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import CourseCard from "@/components/CourseCard";
import Icon from "@/components/Icon";
import SectionHeading from "@/components/SectionHeading";

import {
  getSubject,
  levels,
  subjectCourses,
  subjects,
} from "@/lib/data";


/* ==========================================================================
   STATIC ROUTES
   ========================================================================== */

export function generateStaticParams() {
  return subjects.map((subject) => ({
    slug: subject.slug,
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

  const subject = getSubject(slug);

  if (!subject) {
    return {
      title: "Subject",
    };
  }

  return {
    title: subject.name,

    description: subject.description,

    openGraph: {
      title: `${subject.name} | My Academic Tutor`,
      description: subject.description,
    },
  };
}


/* ==========================================================================
   PAGE
   ========================================================================== */

export default async function SubjectPage({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}) {
  const { slug } = await params;

  const subject = getSubject(slug);

  if (!subject) {
    notFound();
  }

  const allCourses = subjectCourses(subject.slug);

  const featuredCourses = allCourses
    .filter((course) => course.featured)
    .slice(0, 3);

  const additionalCourses = allCourses
    .filter((course) => !course.featured)
    .slice(0, 3);

  const displayedCourses = [
    ...featuredCourses,
    ...additionalCourses,
  ].slice(0, 6);


  return (
    <>
      {/* ==================================================================
          HERO
         ================================================================== */}

      <section className="page-hero">
        <div className="shell subject-hero-grid">
          {/* --------------------------------------------------------------
              Hero content
             -------------------------------------------------------------- */}

          <div>
            <div className="breadcrumbs">
              Home / Subjects / {subject.name}
            </div>

            <span
              className="eyebrow"
              style={{
                display: "inline-block",
                marginTop: "30px",
              }}
            >
              {subject.eyebrow}
            </span>

            <h1>
              {subject.name}
            </h1>

            <p>
              {subject.description}
            </p>

            <div className="hero-actions">
              <Link
                href={`/subjects/${subject.slug}/undergraduate`}
                className="button"
              >
                Choose your level

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

            {/* ----------------------------------------------------------
                Subject snapshot
               ---------------------------------------------------------- */}

            <div
              className="hero-proof"
              style={{
                marginTop: "32px",
              }}
            >
              <span>
                <Icon
                  name="check"
                  size={14}
                />

                {allCourses.length} courses
              </span>

              <span>
                <Icon
                  name="check"
                  size={14}
                />

                4 learning routes
              </span>

              <span>
                <Icon
                  name="check"
                  size={14}
                />

                Expert tutoring available
              </span>
            </div>
          </div>


          {/* --------------------------------------------------------------
              Subject panel
             -------------------------------------------------------------- */}

          <aside className="subject-panel">
            <span className="eyebrow light">
              Explore the discipline
            </span>

            <div
              className="big-symbol"
              aria-hidden="true"
              style={{
                marginTop: "22px",
              }}
            >
              {subject.symbol}
            </div>

            <h2
              style={{
                margin: "18px 0 10px",

                fontFamily:
                  "var(--font-serif), serif",

                fontSize: "31px",
                fontWeight: 600,

                lineHeight: 1.06,

                letterSpacing: "-0.035em",
              }}
            >
              What you can learn
            </h2>

            <p
              style={{
                margin: 0,

                color: "#aaa69e",

                fontSize: "12px",
                lineHeight: 1.65,
              }}
            >
              Explore foundations, university topics,
              advanced methods and practical applications.
            </p>

            <div className="topic-cloud">
              {subject.topics
                .slice(0, 12)
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
          LEVELS
         ================================================================== */}

      <section className="section soft">
        <div className="shell">
          <SectionHeading
            eyebrow="Choose your route"
            title={`Learn ${subject.name} at the right depth.`}
            description="Start at the level that matches your current experience. You can move between routes as your knowledge and goals develop."
          />

          <div className="level-grid">
            {levels.map((level, index) => (
              <Link
                key={level.slug}
                href={`/subjects/${subject.slug}/${level.slug}`}
                className="level-card"
              >
                <span className="num">
                  {String(index + 1).padStart(
                    2,
                    "0"
                  )}
                </span>

                <h3>
                  {level.name}
                </h3>

                <small>
                  {level.kicker}
                </small>

                <p>
                  {level.copy}
                </p>

                <div
                  style={{
                    marginTop: "20px",

                    display: "flex",
                    alignItems: "center",
                    justifyContent:
                      "space-between",

                    fontSize: "11px",
                    fontWeight: 750,
                  }}
                >
                  <span>
                    Explore route
                  </span>

                  <Icon
                    name="arrow"
                    size={15}
                  />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>


      {/* ==================================================================
          COURSE COLLECTION
         ================================================================== */}

      <section className="section">
        <div className="shell">
          <SectionHeading
            eyebrow={`${subject.name} courses`}
            title={`Start learning ${subject.name}.`}
            description="Focused courses combine clear explanation, structured progression and applied practice. Begin with one course or follow a broader pathway."
          />

          {displayedCourses.length > 0 ? (
            <>
              <div className="course-grid">
                {displayedCourses.map(
                  (course) => (
                    <CourseCard
                      key={course.slug}
                      course={course}
                    />
                  )
                )}
              </div>

              <div
                style={{
                  marginTop: "34px",
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
              More {subject.name} courses are
              currently being prepared.
            </div>
          )}
        </div>
      </section>


      {/* ==================================================================
          TOPICS
         ================================================================== */}

      <section className="section dark">
        <div className="shell">
          <SectionHeading
            eyebrow="Explore the discipline"
            title={`${subject.name} is more than one course.`}
            description="Build breadth across the discipline or focus deeply on the topics most relevant to your studies, career or research."
          />

          <div
            className="topic-cloud"
            style={{
              maxWidth: "960px",
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
          OUTCOMES
         ================================================================== */}

      <section className="section soft">
        <div className="shell">
          <SectionHeading
            eyebrow="What you will build"
            title="Capability, not just course completion."
            description={`Learning ${subject.name} should change what you can understand, analyse and create—not simply add another course to a list.`}
          />

          <div className="feature-list">
            {subject.outcomes.map(
              (outcome, index) => (
                <div
                  className="feature-item"
                  key={outcome}
                >
                  <span
                    className={`mini-symbol ${subject.accent}`}
                  >
                    {String(
                      index + 1
                    ).padStart(2, "0")}
                  </span>

                  <div>
                    <strong>
                      {outcome}
                    </strong>

                    <p
                      style={{
                        margin: "5px 0 0",

                        color: "#6d6961",

                        fontSize: "12px",
                        lineHeight: 1.6,
                      }}
                    >
                      Build this capability
                      progressively through
                      explanation, examples,
                      practice and application.
                    </p>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </section>


      {/* ==================================================================
          LEARNING MODEL
         ================================================================== */}

      <section className="section">
        <div className="shell">
          <SectionHeading
            eyebrow="How you learn"
            title="Understand it. Practise it. Apply it."
            description="Courses are designed around progression rather than passive content consumption."
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
                Build intuition first
              </small>

              <p>
                Concepts are introduced clearly
                so you understand the reasoning
                before memorising procedures.
              </p>
            </div>


            <div className="level-card">
              <span className="num">
                02
              </span>

              <h3>
                Explore
              </h3>

              <small>
                Make ideas visible
              </small>

              <p>
                Interactive examples and
                visual explanations help connect
                abstract ideas to intuition.
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
                Turn understanding into skill
              </small>

              <p>
                Work through structured examples,
                exercises and problems that
                increase gradually in difficulty.
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
                Use what you learned
              </small>

              <p>
                Connect your knowledge to
                examinations, university work,
                research, coding and real projects.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* ==================================================================
          TUTORING CTA
         ================================================================== */}

      <section className="section soft">
        <div className="shell">
          <div className="cta-band">
            <div>
              <span className="eyebrow light">
                Expert support
              </span>

              <h2>
                Stuck on a difficult{" "}
                {subject.name.toLowerCase()}{" "}
                problem?
              </h2>
            </div>

            <div>
              <p>
                Learn independently when you can,
                then work with an expert when you
                need deeper explanation, feedback,
                exam preparation or help applying
                your knowledge.
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
                  Ask about support
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ==================================================================
          OTHER SUBJECTS
         ================================================================== */}

      <section className="section">
        <div className="shell">
          <SectionHeading
            eyebrow="Keep exploring"
            title="Learning rarely stays inside one discipline."
            description="Move across connected subjects as your interests, studies and career goals develop."
          />

          <div className="subject-grid">
            {subjects
              .filter(
                (item) =>
                  item.slug !== subject.slug
              )
              .map((item) => (
                <Link
                  key={item.slug}
                  href={`/subjects/${item.slug}`}
                  className={`subject-card ${item.accent}`}
                >
                  <span className="subject-symbol">
                    {item.symbol}
                  </span>

                  <h3>
                    {item.name}
                  </h3>

                  <p>
                    {item.short}
                  </p>

                  <div className="card-arrow">
                    <span>
                      Explore {item.name}
                    </span>

                    <Icon
                      name="arrow"
                      size={16}
                    />
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </section>
    </>
  );
}