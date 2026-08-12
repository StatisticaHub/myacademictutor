import type { Metadata } from "next";
import Link from "next/link";

import Icon from "@/components/Icon";
import SectionHeading from "@/components/SectionHeading";

import {
  levels,
  subjects,
} from "@/lib/data";


export const metadata: Metadata = {
  title: "Subjects",

  description:
    "Explore Statistics, Mathematics, Data Science, Bioinformatics and Computer Science at high school, undergraduate, postgraduate and independent learning levels.",
};


export default function SubjectsPage() {
  return (
    <>
      {/* ====================================================================
          HERO
         ==================================================================== */}

      <section className="page-hero">
        <div className="shell">
          <div className="breadcrumbs">
            Home / Subjects
          </div>

          <span
            className="eyebrow"
            style={{
              display: "inline-block",
              marginTop: "30px",
            }}
          >
            Five connected disciplines
          </span>

          <h1>
            Choose a subject.
            <br />
            Build real understanding.
          </h1>

          <p>
            Start with the discipline you want to master, then choose
            the level and pathway that fit your goals. Learn from school
            foundations through advanced university and professional
            applications.
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
              href="/courses"
              className="button button-outline"
            >
              Browse all courses
            </Link>
          </div>
        </div>
      </section>


      {/* ====================================================================
          SUBJECTS
         ==================================================================== */}

      <section className="section">
        <div className="shell">
          <SectionHeading
            eyebrow="Explore"
            title="Five subjects designed to work together."
            description="Each discipline has its own learning routes, but the platform is intentionally connected. Mathematics supports statistics. Statistics powers data science. Computing enables bioinformatics. You can move across them as your goals evolve."
          />

          <div className="subject-grid">
            {subjects.map((subject) => (
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
                  {subject.description}
                </p>

                <div className="card-arrow">
                  <span>
                    Explore {subject.name}
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


      {/* ====================================================================
          HOW THE SUBJECTS CONNECT
         ==================================================================== */}

      <section className="section dark">
        <div className="shell">
          <SectionHeading
            eyebrow="Connected learning"
            title="The strongest learners see the connections."
            description="Quantitative and computational subjects rarely exist in isolation. My Academic Tutor is designed so you can build across disciplines rather than treating every course as a separate island."
          />

          <div
            className="feature-list"
            style={{
              marginTop: "10px",
            }}
          >
            <div className="feature-item">
              <span
                className="mini-symbol violet"
                aria-hidden="true"
              >
                ∑
              </span>

              <div>
                <strong>
                  Mathematics → Statistics
                </strong>

                <p
                  style={{
                    margin: "6px 0 0",
                    color: "#a9a59d",
                    fontSize: "12px",
                    lineHeight: 1.6,
                  }}
                >
                  Algebra, calculus, probability and linear algebra
                  provide the foundations for modern statistical
                  modelling.
                </p>
              </div>
            </div>


            <div className="feature-item">
              <span
                className="mini-symbol blue"
                aria-hidden="true"
              >
                σ
              </span>

              <div>
                <strong>
                  Statistics → Data Science
                </strong>

                <p
                  style={{
                    margin: "6px 0 0",
                    color: "#a9a59d",
                    fontSize: "12px",
                    lineHeight: 1.6,
                  }}
                >
                  Statistical reasoning turns machine learning and
                  data analysis from button-clicking into informed
                  decision making.
                </p>
              </div>
            </div>


            <div className="feature-item">
              <span
                className="mini-symbol orange"
                aria-hidden="true"
              >
                {"</>"}
              </span>

              <div>
                <strong>
                  Computer Science → Data Science
                </strong>

                <p
                  style={{
                    margin: "6px 0 0",
                    color: "#a9a59d",
                    fontSize: "12px",
                    lineHeight: 1.6,
                  }}
                >
                  Programming, algorithms and databases make it
                  possible to work with data efficiently and build
                  scalable analytical tools.
                </p>
              </div>
            </div>


            <div className="feature-item">
              <span
                className="mini-symbol green"
                aria-hidden="true"
              >
                ⌬
              </span>

              <div>
                <strong>
                  Statistics + Computing → Bioinformatics
                </strong>

                <p
                  style={{
                    margin: "6px 0 0",
                    color: "#a9a59d",
                    fontSize: "12px",
                    lineHeight: 1.6,
                  }}
                >
                  Modern genomics, transcriptomics and multi-omics
                  depend on statistical reasoning and computational
                  workflows.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ====================================================================
          LEVELS
         ==================================================================== */}

      <section className="section soft">
        <div className="shell">
          <SectionHeading
            eyebrow="Choose your stage"
            title="The same subject can mean very different things at different levels."
            description="Instead of mixing beginner and advanced material together, every discipline is organised by academic stage and learning goal."
          />

          <div className="level-grid">
            {levels.map((level, index) => (
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
                  {level.kicker}
                </small>

                <p>
                  {level.copy}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>


      {/* ====================================================================
          SUBJECT QUICK GUIDE
         ==================================================================== */}

      <section className="section">
        <div className="shell">
          <SectionHeading
            eyebrow="Where should I start?"
            title="Choose by what you want to achieve."
            description="You do not need to know the perfect course before you begin. Start with the goal closest to yours and refine your route from there."
          />

          <div className="feature-list">
            <Link
              href="/subjects/mathematics"
              className="feature-item"
            >
              <span
                className="mini-symbol violet"
              >
                ∑
              </span>

              <div>
                <strong>
                  I want stronger quantitative foundations
                </strong>

                <p
                  style={{
                    margin: "5px 0 0",
                    color: "#6d6961",
                    fontSize: "12px",
                  }}
                >
                  Start with Mathematics.
                </p>
              </div>
            </Link>


            <Link
              href="/subjects/statistics"
              className="feature-item"
            >
              <span
                className="mini-symbol blue"
              >
                σ
              </span>

              <div>
                <strong>
                  I want to understand data and evidence
                </strong>

                <p
                  style={{
                    margin: "5px 0 0",
                    color: "#6d6961",
                    fontSize: "12px",
                  }}
                >
                  Start with Statistics.
                </p>
              </div>
            </Link>


            <Link
              href="/subjects/data-science"
              className="feature-item"
            >
              <span
                className="mini-symbol teal"
              >
                ◉
              </span>

              <div>
                <strong>
                  I want practical data and machine learning skills
                </strong>

                <p
                  style={{
                    margin: "5px 0 0",
                    color: "#6d6961",
                    fontSize: "12px",
                  }}
                >
                  Start with Data Science.
                </p>
              </div>
            </Link>


            <Link
              href="/subjects/bioinformatics"
              className="feature-item"
            >
              <span
                className="mini-symbol green"
              >
                ⌬
              </span>

              <div>
                <strong>
                  I work with biological or genomic data
                </strong>

                <p
                  style={{
                    margin: "5px 0 0",
                    color: "#6d6961",
                    fontSize: "12px",
                  }}
                >
                  Start with Bioinformatics.
                </p>
              </div>
            </Link>


            <Link
              href="/subjects/computer-science"
              className="feature-item"
            >
              <span
                className="mini-symbol orange"
              >
                {"</>"}
              </span>

              <div>
                <strong>
                  I want to program and understand computing
                </strong>

                <p
                  style={{
                    margin: "5px 0 0",
                    color: "#6d6961",
                    fontSize: "12px",
                  }}
                >
                  Start with Computer Science.
                </p>
              </div>
            </Link>


            <Link
              href="/learning"
              className="feature-item"
            >
              <span
                className="mini-symbol"
              >
                ?
              </span>

              <div>
                <strong>
                  I&apos;m still not sure
                </strong>

                <p
                  style={{
                    margin: "5px 0 0",
                    color: "#6d6961",
                    fontSize: "12px",
                  }}
                >
                  Use the Learning Path Finder.
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>


      {/* ====================================================================
          TUTORING CONNECTION
         ==================================================================== */}

      <section className="section soft">
        <div className="shell">
          <div className="cta-band">
            <div>
              <span className="eyebrow light">
                Need personal support?
              </span>

              <h2>
                Every subject can also be supported by an expert tutor.
              </h2>
            </div>

            <div>
              <p>
                Use structured learning independently, then get human
                support for difficult concepts, assignments, exam
                preparation, coding, projects or research.
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
    </>
  );
}