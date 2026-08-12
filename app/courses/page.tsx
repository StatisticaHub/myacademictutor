import type { Metadata } from "next";
import Link from "next/link";

import CourseCard from "@/components/CourseCard";
import Icon from "@/components/Icon";
import SectionHeading from "@/components/SectionHeading";

import {
  courses,
  featuredCourses,
  levels,
  subjectCourses,
  subjects,
} from "@/lib/data";


/* ==========================================================================
   METADATA
   ========================================================================== */

export const metadata: Metadata = {
  title: "Courses",

  description:
    "Explore courses in Statistics, Mathematics, Data Science, Bioinformatics and Computer Science for school, university and independent learners.",
};


/* ==========================================================================
   PAGE
   ========================================================================== */

export default function CoursesPage() {
  const highlightedCourses = featuredCourses().slice(0, 6);

  return (
    <>
      {/* ==================================================================
          HERO
         ================================================================== */}

      <section className="page-hero">
        <div className="shell">
          <div className="breadcrumbs">
            Home / Courses
          </div>

          <span
            className="eyebrow"
            style={{
              display: "inline-block",
              marginTop: "30px",
            }}
          >
            Structured learning
          </span>

          <h1>
            Courses built to
            <br />
            take you somewhere.
          </h1>

          <p>
            Explore focused courses across Statistics, Mathematics,
            Data Science, Bioinformatics and Computer Science.
            Learn one topic deeply or combine courses into a broader
            academic or career pathway.
          </p>

          <div className="hero-actions">
            <Link
              href="#catalogue"
              className="button"
            >
              Browse courses

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

              {courses.length} courses
            </span>

            <span>
              <Icon
                name="check"
                size={14}
              />

              5 subject areas
            </span>

            <span>
              <Icon
                name="check"
                size={14}
              />

              4 learning routes
            </span>
          </div>
        </div>
      </section>


      {/* ==================================================================
          QUICK SUBJECT NAVIGATION
         ================================================================== */}

      <section className="trust-strip">
        <div className="shell">
          <div className="course-directory-nav">
            <span className="course-directory-label">
              Jump to subject
            </span>

            {subjects.map((subject) => (
              <Link
                key={subject.slug}
                href={`#${subject.slug}`}
                className={`course-directory-link ${subject.accent}`}
              >
                <span className="course-directory-symbol">
                  {subject.symbol}
                </span>

                {subject.name}
              </Link>
            ))}
          </div>
        </div>
      </section>


      {/* ==================================================================
          FEATURED COURSES
         ================================================================== */}

      <section className="section">
        <div className="shell">
          <SectionHeading
            eyebrow="Recommended starting points"
            title="Popular courses across the platform."
            description="These courses represent useful entry points into some of our most important quantitative and computational learning areas."
          />

          <div className="course-grid">
            {highlightedCourses.map((course) => (
              <CourseCard
                key={course.slug}
                course={course}
              />
            ))}
          </div>
        </div>
      </section>


      {/* ==================================================================
          CHOOSE LEVEL
         ================================================================== */}

      <section className="section soft">
        <div className="shell">
          <SectionHeading
            eyebrow="Browse by stage"
            title="Study at the level that matches you."
            description="The same discipline can require very different depth depending on whether you are preparing for school exams, studying at university, conducting research or learning independently."
          />

          <div className="level-grid">
            {levels.map((level, index) => {
              const count = courses.filter(
                (course) =>
                  course.level === level.slug
              ).length;

              return (
                <Link
                  key={level.slug}
                  href={`/learning?level=${level.slug}`}
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
                    {count} courses
                  </small>

                  <p>
                    {level.copy}
                  </p>

                  <div className="level-card-footer">
                    <span>
                      Explore this level
                    </span>

                    <Icon
                      name="arrow"
                      size={15}
                    />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>


      {/* ==================================================================
          COMPLETE CATALOGUE
         ================================================================== */}

      <section
        className="section"
        id="catalogue"
      >
        <div className="shell">
          <SectionHeading
            eyebrow="Complete catalogue"
            title="Explore courses by subject."
            description="Every subject has its own progression from foundations through university study to specialist and practical applications."
          />

          <div className="course-catalogue-stack">
            {subjects.map((subject) => {
              const subjectCourseList =
                subjectCourses(subject.slug);

              return (
                <section
                  key={subject.slug}
                  id={subject.slug}
                  className="course-subject-section"
                >
                  {/* ------------------------------------------------------
                      Subject heading
                     ------------------------------------------------------ */}

                  <div className="course-subject-header">
                    <div className="course-subject-heading">
                      <span
                        className={`mini-symbol ${subject.accent}`}
                      >
                        {subject.symbol}
                      </span>

                      <div>
                        <span className="eyebrow">
                          {subject.eyebrow}
                        </span>

                        <h2>
                          {subject.name}
                        </h2>
                      </div>
                    </div>

                    <div className="course-subject-actions">
                      <span className="course-count">
                        {subjectCourseList.length}{" "}
                        {subjectCourseList.length === 1
                          ? "course"
                          : "courses"}
                      </span>

                      <Link
                        href={`/subjects/${subject.slug}`}
                        className="button button-outline"
                      >
                        Explore subject

                        <Icon
                          name="arrow"
                          size={15}
                        />
                      </Link>
                    </div>
                  </div>


                  {/* ------------------------------------------------------
                      Level availability
                     ------------------------------------------------------ */}

                  <div className="course-level-strip">
                    {levels.map((level) => {
                      const count =
                        subjectCourseList.filter(
                          (course) =>
                            course.level ===
                            level.slug
                        ).length;

                      return (
                        <Link
                          key={level.slug}
                          href={`/subjects/${subject.slug}/${level.slug}`}
                          className="course-level-chip"
                        >
                          <span>
                            {level.name}
                          </span>

                          <strong>
                            {count}
                          </strong>
                        </Link>
                      );
                    })}
                  </div>


                  {/* ------------------------------------------------------
                      Courses
                     ------------------------------------------------------ */}

                  {subjectCourseList.length > 0 ? (
                    <div className="course-grid">
                      {subjectCourseList.map(
                        (course) => (
                          <CourseCard
                            key={course.slug}
                            course={course}
                          />
                        )
                      )}
                    </div>
                  ) : (
                    <div className="empty-state">
                      More {subject.name} courses
                      are being prepared.
                    </div>
                  )}
                </section>
              );
            })}
          </div>
        </div>
      </section>


      {/* ==================================================================
          HOW COURSES FIT TOGETHER
         ================================================================== */}

      <section className="section dark">
        <div className="shell">
          <SectionHeading
            eyebrow="More than a catalogue"
            title="A course is one step. A pathway gives it direction."
            description="Rather than collecting unrelated certificates, combine courses deliberately so each one contributes to a larger academic, technical or career goal."
          />

          <div className="level-grid">
            <div className="level-card course-dark-card">
              <span className="num">
                01
              </span>

              <h3>
                Choose your goal
              </h3>

              <small>
                Know what you are building towards
              </small>

              <p>
                Start from an exam, university
                module, skill, research need or
                career objective.
              </p>
            </div>


            <div className="level-card course-dark-card">
              <span className="num">
                02
              </span>

              <h3>
                Build foundations
              </h3>

              <small>
                Fill the gaps first
              </small>

              <p>
                Learn the mathematical,
                statistical or programming
                foundations required for more
                advanced work.
              </p>
            </div>


            <div className="level-card course-dark-card">
              <span className="num">
                03
              </span>

              <h3>
                Go deeper
              </h3>

              <small>
                Progress deliberately
              </small>

              <p>
                Move from foundational courses
                into advanced methods and
                specialist applications.
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
                Turn learning into capability
              </small>

              <p>
                Use what you learn in exams,
                coding tasks, projects, data
                analyses and research.
              </p>
            </div>
          </div>

          <div
            style={{
              marginTop: "32px",
            }}
          >
            <Link
              href="/pathways"
              className="button button-white"
            >
              Explore learning pathways

              <Icon
                name="arrow"
                size={16}
              />
            </Link>
          </div>
        </div>
      </section>


      {/* ==================================================================
          INTERACTIVE LEARNING
         ================================================================== */}

      <section className="section soft">
        <div className="shell">
          <div className="cta-band">
            <div>
              <span className="eyebrow light">
                Beyond video lessons
              </span>

              <h2>
                Learn difficult ideas by interacting with them.
              </h2>
            </div>

            <div>
              <p>
                Use interactive labs, visual
                demonstrations and applied
                exercises alongside courses to
                build intuition rather than
                relying only on passive content.
              </p>

              <div className="course-cta-actions">
                <Link
                  href="/labs"
                  className="button button-white"
                >
                  Explore interactive labs

                  <Icon
                    name="arrow"
                    size={16}
                  />
                </Link>

                <Link
                  href="/resources"
                  className="button course-dark-outline"
                >
                  Browse resources
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ==================================================================
          FINAL CTA
         ================================================================== */}

      <section className="section">
        <div className="shell">
          <div className="courses-final-cta">
            <span className="eyebrow">
              Still unsure?
            </span>

            <h2>
              Don&apos;t choose a random course.
              <br />
              Find the right starting point.
            </h2>

            <p>
              Tell us your subject, current level
              and goal and use the Learning Path
              Finder to identify a sensible route
              through the platform.
            </p>

            <div className="hero-actions">
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
                href="/tutoring"
                className="button button-outline"
              >
                Ask an expert
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}