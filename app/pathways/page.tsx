import type { Metadata } from "next";
import Link from "next/link";

import Icon from "@/components/Icon";
import SectionHeading from "@/components/SectionHeading";

import {
  pathways,
  subjects,
} from "@/lib/data";


/* ==========================================================================
   METADATA
   ========================================================================== */

export const metadata: Metadata = {
  title: "Learning Pathways",

  description:
    "Explore structured academic, research and career pathways across Statistics, Mathematics, Data Science, Bioinformatics and Computer Science.",

  openGraph: {
    title: "Learning Pathways | My Academic Tutor",

    description:
      "Follow structured multi-course routes towards academic, research and career goals.",
  },
};


/* ==========================================================================
   PAGE
   ========================================================================== */

export default function PathwaysPage() {
  const careerPathways = pathways.filter(
    (pathway) =>
      pathway.tag.toLowerCase().includes("career") ||
      pathway.tag.toLowerCase().includes("skills") ||
      pathway.tag.toLowerCase().includes("technical")
  );

  const researchPathways = pathways.filter(
    (pathway) =>
      pathway.tag.toLowerCase().includes("research") ||
      pathway.tag.toLowerCase().includes("academic")
  );


  return (
    <>
      {/* ==================================================================
          HERO
         ================================================================== */}

      <section className="page-hero">
        <div className="shell">
          <div className="breadcrumbs">
            Home / Learning Pathways
          </div>

          <span
            className="eyebrow"
            style={{
              display: "inline-block",
              marginTop: "30px",
            }}
          >
            Learn with direction
          </span>

          <h1>
            Don&apos;t collect courses.
            <br />
            Build capability.
          </h1>

          <p>
            Learning pathways connect individual courses into deliberate
            academic, technical, research and career journeys. Know what
            foundations you need, what comes next and what you are building
            towards.
          </p>

          <div className="hero-actions">
            <Link
              href="#all-pathways"
              className="button"
            >
              Explore pathways

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

              {pathways.length} structured pathways
            </span>

            <span>
              <Icon
                name="check"
                size={14}
              />

              Career + academic routes
            </span>

            <span>
              <Icon
                name="check"
                size={14}
              />

              Cross-disciplinary learning
            </span>
          </div>
        </div>
      </section>


      {/* ==================================================================
          WHAT IS A PATHWAY
         ================================================================== */}

      <section className="section soft">
        <div className="shell">
          <SectionHeading
            eyebrow="Why pathways?"
            title="Because knowing what to learn next matters."
            description="A good pathway removes unnecessary guesswork. It shows which foundations matter, how topics connect and what sequence is likely to help you reach a larger goal."
          />

          <div className="level-grid">
            <div className="level-card">
              <span className="num">
                01
              </span>

              <h3>
                Define the goal
              </h3>

              <small>
                Know what you are building towards
              </small>

              <p>
                Start with an academic, research, technical or career
                objective rather than an isolated course.
              </p>
            </div>


            <div className="level-card">
              <span className="num">
                02
              </span>

              <h3>
                Build foundations
              </h3>

              <small>
                Fill the important gaps
              </small>

              <p>
                Develop the mathematical, statistical, programming or
                biological foundations required for later stages.
              </p>
            </div>


            <div className="level-card">
              <span className="num">
                03
              </span>

              <h3>
                Progress deliberately
              </h3>

              <small>
                Learn in a sensible order
              </small>

              <p>
                Move from core concepts into specialist methods and
                applied workflows without skipping critical foundations.
              </p>
            </div>


            <div className="level-card">
              <span className="num">
                04
              </span>

              <h3>
                Apply your skills
              </h3>

              <small>
                Make the learning useful
              </small>

              <p>
                Finish with projects, analyses, research workflows or
                practical tasks that demonstrate what you can actually do.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* ==================================================================
          FEATURED PATHWAYS
         ================================================================== */}

      <section className="section">
        <div className="shell">
          <SectionHeading
            eyebrow="Popular journeys"
            title="Start with the destination."
            description="These pathways combine multiple disciplines and skills into larger journeys designed around meaningful outcomes."
          />

          <div className="pathway-grid">
            {pathways.slice(0, 4).map(
              (pathway) => (
                <Link
                  key={pathway.slug}
                  href={`/pathways/${pathway.slug}`}
                  className="pathway-card pathway-card-premium"
                >
                  <div className="top">
                    <span className="eyebrow">
                      {pathway.tag}
                    </span>

                    <span className="pathway-duration">
                      {pathway.duration}
                    </span>
                  </div>

                  <h3>
                    {pathway.name}
                  </h3>

                  <p>
                    {pathway.description}
                  </p>

                  <div className="pathway-stage-preview">
                    {pathway.steps
                      .slice(0, 4)
                      .map((step, index) => (
                        <div
                          className="pathway-stage-preview-row"
                          key={step}
                        >
                          <span>
                            {String(index + 1).padStart(
                              2,
                              "0"
                            )}
                          </span>

                          <strong>
                            {step}
                          </strong>
                        </div>
                      ))}
                  </div>

                  <div className="pathway-card-footer">
                    <span>
                      {pathway.steps.length} stages
                    </span>

                    <span className="circle-arrow">
                      <Icon
                        name="arrow"
                        size={15}
                      />
                    </span>
                  </div>
                </Link>
              )
            )}
          </div>
        </div>
      </section>


      {/* ==================================================================
          CAREER PATHWAYS
         ================================================================== */}

      {careerPathways.length > 0 && (
        <section className="section dark">
          <div className="shell">
            <SectionHeading
              eyebrow="Career pathways"
              title="Build towards work you want to do."
              description="Career pathways bring together technical knowledge, analytical reasoning and practical capability across multiple courses and disciplines."
            />

            <div className="pathway-grid">
              {careerPathways.map(
                (pathway) => (
                  <Link
                    key={pathway.slug}
                    href={`/pathways/${pathway.slug}`}
                    className="pathway-card pathway-card-dark"
                  >
                    <div className="top">
                      <span className="eyebrow light">
                        {pathway.tag}
                      </span>

                      <span className="pathway-duration dark">
                        {pathway.duration}
                      </span>
                    </div>

                    <h3>
                      {pathway.name}
                    </h3>

                    <p>
                      {pathway.description}
                    </p>

                    <div className="pathway-steps">
                      {pathway.steps
                        .slice(0, 7)
                        .map((_, index) => (
                          <span key={index} />
                        ))}
                    </div>

                    <div className="pathway-card-footer">
                      <span>
                        {pathway.steps.length} structured stages
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
          </div>
        </section>
      )}


      {/* ==================================================================
          RESEARCH / ACADEMIC PATHWAYS
         ================================================================== */}

      {researchPathways.length > 0 && (
        <section className="section soft">
          <div className="shell">
            <SectionHeading
              eyebrow="Academic & research pathways"
              title="Go from learning methods to using them independently."
              description="These routes are designed for learners who want stronger methodological foundations for advanced university study, dissertations and research."
            />

            <div className="pathway-grid">
              {researchPathways.map(
                (pathway) => (
                  <Link
                    key={pathway.slug}
                    href={`/pathways/${pathway.slug}`}
                    className="pathway-card pathway-card-premium"
                  >
                    <div className="top">
                      <span className="eyebrow">
                        {pathway.tag}
                      </span>

                      <span className="pathway-duration">
                        {pathway.duration}
                      </span>
                    </div>

                    <h3>
                      {pathway.name}
                    </h3>

                    <p>
                      {pathway.description}
                    </p>

                    <div className="pathway-stage-preview">
                      {pathway.steps
                        .slice(0, 4)
                        .map((step, index) => (
                          <div
                            key={step}
                            className="pathway-stage-preview-row"
                          >
                            <span>
                              {String(index + 1).padStart(
                                2,
                                "0"
                              )}
                            </span>

                            <strong>
                              {step}
                            </strong>
                          </div>
                        ))}
                    </div>

                    <div className="pathway-card-footer">
                      <span>
                        Explore pathway
                      </span>

                      <span className="circle-arrow">
                        <Icon
                          name="arrow"
                          size={15}
                        />
                      </span>
                    </div>
                  </Link>
                )
              )}
            </div>
          </div>
        </section>
      )}


      {/* ==================================================================
          ALL PATHWAYS
         ================================================================== */}

      <section
        className="section"
        id="all-pathways"
      >
        <div className="shell">
          <SectionHeading
            eyebrow="Complete directory"
            title="Explore every pathway."
            description="Compare goals, duration, subject focus and progression before deciding where you want to begin."
          />

          <div className="pathway-directory">
            {pathways.map(
              (pathway, index) => (
                <Link
                  key={pathway.slug}
                  href={`/pathways/${pathway.slug}`}
                  className="pathway-directory-row"
                >
                  <span className="pathway-directory-number">
                    {String(index + 1).padStart(
                      2,
                      "0"
                    )}
                  </span>

                  <div className="pathway-directory-main">
                    <span className="eyebrow">
                      {pathway.tag}
                    </span>

                    <h3>
                      {pathway.name}
                    </h3>

                    <p>
                      {pathway.description}
                    </p>
                  </div>

                  <div className="pathway-directory-meta">
                    <span>
                      {pathway.subject}
                    </span>

                    <strong>
                      {pathway.duration}
                    </strong>
                  </div>

                  <span className="circle-arrow">
                    <Icon
                      name="arrow"
                      size={15}
                    />
                  </span>
                </Link>
              )
            )}
          </div>
        </div>
      </section>


      {/* ==================================================================
          DISCIPLINE CONNECTION
         ================================================================== */}

      <section className="section soft">
        <div className="shell">
          <SectionHeading
            eyebrow="Cross-disciplinary learning"
            title="Real expertise rarely belongs to one subject."
            description="Many pathways intentionally cross disciplines because modern quantitative and computational work depends on combinations of mathematics, statistics, computing and domain knowledge."
          />

          <div className="subject-grid">
            {subjects.map(
              (subject) => (
                <Link
                  key={subject.slug}
                  href={`/subjects/${subject.slug}`}
                  className={`subject-card ${subject.accent}`}
                >
                  <span className="subject-symbol">
                    {subject.symbol}
                  </span>

                  <h3>
                    {subject.name}
                  </h3>

                  <p>
                    {subject.short}
                  </p>

                  <div className="card-arrow">
                    <span>
                      Explore subject
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
        </div>
      </section>


      {/* ==================================================================
          HELP ME CHOOSE
         ================================================================== */}

      <section className="section">
        <div className="shell">
          <div className="testimonial">
            <div className="quote-mark">
              ?
            </div>

            <div>
              <span className="eyebrow">
                Not sure which pathway fits?
              </span>

              <blockquote>
                Start from the work you want to be able to do.
              </blockquote>

              <cite>
                Then work backwards to the skills and foundations you
                need.
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
          FINAL CTA
         ================================================================== */}

      <section className="section soft">
        <div className="shell">
          <div className="cta-band">
            <div>
              <span className="eyebrow light">
                Learn with support
              </span>

              <h2>
                Follow the path independently.
                <br />
                Bring in an expert when you need one.
              </h2>
            </div>

            <div>
              <p>
                Use structured courses and resources for independent
                progress, then work with an expert tutor when you need
                explanation, feedback, project support or research guidance.
              </p>

              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "10px",
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
                  href="/courses"
                  className="button"
                  style={{
                    borderColor: "#444",
                  }}
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