import type { Metadata } from "next";
import Link from "next/link";

import Icon from "@/components/Icon";
import SectionHeading from "@/components/SectionHeading";

import { subjects } from "@/lib/data";


/* ==========================================================================
   METADATA
   ========================================================================== */

export const metadata: Metadata = {
  title: "Interactive Labs",

  description:
    "Explore interactive learning labs for Statistics, Mathematics, Data Science, Bioinformatics and Computer Science.",

  openGraph: {
    title: "Interactive Labs | My Academic Tutor",
    description:
      "Learn difficult quantitative and computational concepts through visual and interactive exploration.",
  },
};


/* ==========================================================================
   LAB DATA
   ========================================================================== */

const labs = [
  {
    slug: "normal-distribution",
    subject: "Statistics",
    accent: "blue",
    symbol: "σ",

    title: "Normal Distribution Explorer",

    description:
      "Change the mean and standard deviation and watch the distribution respond instantly.",

    type: "Interactive visual",

    concepts: [
      "Mean",
      "Standard deviation",
      "Probability",
    ],
  },

  {
    slug: "confidence-intervals",
    subject: "Statistics",
    accent: "blue",
    symbol: "σ",

    title: "Confidence Interval Simulator",

    description:
      "Repeatedly sample from a population and see what confidence level really means.",

    type: "Simulation",

    concepts: [
      "Sampling",
      "Confidence intervals",
      "Coverage",
    ],
  },

  {
    slug: "linear-regression",
    subject: "Statistics",
    accent: "blue",
    symbol: "σ",

    title: "Regression Playground",

    description:
      "Move data points, change relationships and see how the regression line and residuals respond.",

    type: "Interactive visual",

    concepts: [
      "Regression",
      "Residuals",
      "Correlation",
    ],
  },

  {
    slug: "derivative-visualiser",
    subject: "Mathematics",
    accent: "violet",
    symbol: "∑",

    title: "Derivative Visualiser",

    description:
      "Move along a function and see the tangent slope change in real time.",

    type: "Interactive visual",

    concepts: [
      "Functions",
      "Derivatives",
      "Rates of change",
    ],
  },

  {
    slug: "matrix-transformations",
    subject: "Mathematics",
    accent: "violet",
    symbol: "∑",

    title: "Matrix Transformation Lab",

    description:
      "See how matrices rotate, stretch, reflect and transform points in two-dimensional space.",

    type: "Visual mathematics",

    concepts: [
      "Matrices",
      "Linear transformations",
      "Geometry",
    ],
  },

  {
    slug: "gradient-descent",
    subject: "Data Science",
    accent: "teal",
    symbol: "◉",

    title: "Gradient Descent Explorer",

    description:
      "Watch an optimisation algorithm move across a loss surface towards a minimum.",

    type: "Machine learning",

    concepts: [
      "Optimisation",
      "Loss functions",
      "Learning rate",
    ],
  },

  {
    slug: "classification-boundary",
    subject: "Data Science",
    accent: "teal",
    symbol: "◉",

    title: "Classification Boundary Lab",

    description:
      "Change training data and observe how a classifier separates regions of feature space.",

    type: "Machine learning",

    concepts: [
      "Classification",
      "Decision boundaries",
      "Model complexity",
    ],
  },

  {
    slug: "sequence-alignment",
    subject: "Bioinformatics",
    accent: "green",
    symbol: "⌬",

    title: "Sequence Alignment Explorer",

    description:
      "Compare biological sequences and explore how matches, mismatches and gaps affect alignment.",

    type: "Bioinformatics",

    concepts: [
      "DNA sequences",
      "Alignment",
      "Similarity",
    ],
  },

  {
    slug: "gene-expression",
    subject: "Bioinformatics",
    accent: "green",
    symbol: "⌬",

    title: "Gene Expression Explorer",

    description:
      "Explore expression values across samples and see how biological patterns emerge from high-dimensional data.",

    type: "Transcriptomics",

    concepts: [
      "Gene expression",
      "Samples",
      "Normalisation",
    ],
  },

  {
    slug: "sorting-algorithms",
    subject: "Computer Science",
    accent: "orange",
    symbol: "</>",

    title: "Sorting Algorithm Visualiser",

    description:
      "Watch different sorting algorithms operate step by step and compare their behaviour.",

    type: "Algorithms",

    concepts: [
      "Sorting",
      "Complexity",
      "Algorithms",
    ],
  },

  {
    slug: "data-structures",
    subject: "Computer Science",
    accent: "orange",
    symbol: "</>",

    title: "Data Structure Explorer",

    description:
      "Interact with stacks, queues, trees and graphs to understand how they store and organise information.",

    type: "Computer Science",

    concepts: [
      "Stacks",
      "Queues",
      "Trees",
    ],
  },
];


/* ==========================================================================
   PAGE
   ========================================================================== */

export default function LabsPage() {
  return (
    <>
      {/* ==================================================================
          HERO
         ================================================================== */}

      <section className="page-hero labs-page-hero">
        <div className="shell labs-page-hero-grid">
          <div>
            <div className="breadcrumbs">
              Home / Interactive Labs
            </div>

            <span className="eyebrow labs-page-eyebrow">
              Learn by doing
            </span>

            <h1>
              Make difficult ideas
              <br />
              visible.
            </h1>

            <p>
              Interactive Labs help you explore concepts rather than
              simply read about them. Change parameters, test ideas and
              see the consequences immediately.
            </p>

            <div className="hero-actions">
              <Link
                href="#lab-directory"
                className="button"
              >
                Explore labs

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

            <div className="hero-proof">
              <span>
                <Icon
                  name="check"
                  size={14}
                />

                Visual learning
              </span>

              <span>
                <Icon
                  name="check"
                  size={14}
                />

                Interactive simulations
              </span>

              <span>
                <Icon
                  name="check"
                  size={14}
                />

                Applied intuition
              </span>
            </div>
          </div>


          {/* --------------------------------------------------------------
              Hero visual
             -------------------------------------------------------------- */}

          <div className="labs-hero-demo">
            <div className="labs-demo-top">
              <div>
                <span className="eyebrow light">
                  Live concept preview
                </span>

                <h2>
                  Explore how data shape a model.
                </h2>
              </div>

              <span className="labs-live-pill">
                Interactive
              </span>
            </div>

            <div className="labs-demo-chart">
              <div className="labs-demo-line" />

              <span className="labs-point point-1" />
              <span className="labs-point point-2" />
              <span className="labs-point point-3" />
              <span className="labs-point point-4" />
              <span className="labs-point point-5" />
              <span className="labs-point point-6" />

              <div className="labs-axis-x" />
              <div className="labs-axis-y" />
            </div>

            <div className="labs-demo-controls">
              <div>
                <span>
                  Parameter
                </span>

                <div className="labs-slider">
                  <div className="labs-slider-fill" />
                  <div className="labs-slider-knob" />
                </div>
              </div>

              <div className="labs-demo-value">
                <span>
                  Result
                </span>

                <strong>
                  0.78
                </strong>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ==================================================================
          WHY INTERACTIVE
         ================================================================== */}

      <section className="section soft">
        <div className="shell">
          <SectionHeading
            eyebrow="Why interactive learning?"
            title="Understanding improves when you can change the system yourself."
            description="Interactive learning turns abstract ideas into something you can manipulate, observe and reason about."
          />

          <div className="level-grid">
            <div className="level-card">
              <span className="num">
                01
              </span>

              <h3>
                Change
              </h3>

              <small>
                Manipulate parameters
              </small>

              <p>
                Adjust values, assumptions and inputs instead of
                seeing only one fixed example.
              </p>
            </div>


            <div className="level-card">
              <span className="num">
                02
              </span>

              <h3>
                Observe
              </h3>

              <small>
                See immediate consequences
              </small>

              <p>
                Watch distributions, models, algorithms and
                visualisations respond in real time.
              </p>
            </div>


            <div className="level-card">
              <span className="num">
                03
              </span>

              <h3>
                Explain
              </h3>

              <small>
                Build intuition
              </small>

              <p>
                Ask why the result changed and connect the visual
                behaviour to the underlying theory.
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
                Transfer the idea
              </small>

              <p>
                Move from the interactive example to exercises,
                code, datasets and independent problem solving.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* ==================================================================
          SUBJECT FILTER
         ================================================================== */}

      <section className="trust-strip">
        <div className="shell">
          <div className="course-directory-nav">
            <span className="course-directory-label">
              Explore by subject
            </span>

            {subjects.map(
              (subject) => (
                <Link
                  key={subject.slug}
                  href={`#labs-${subject.slug}`}
                  className={`course-directory-link ${subject.accent}`}
                >
                  <span className="course-directory-symbol">
                    {subject.symbol}
                  </span>

                  {subject.name}
                </Link>
              )
            )}
          </div>
        </div>
      </section>


      {/* ==================================================================
          LAB DIRECTORY
         ================================================================== */}

      <section
        className="section"
        id="lab-directory"
      >
        <div className="shell">
          <SectionHeading
            eyebrow="Interactive Lab directory"
            title="Explore concepts across all five disciplines."
            description="Labs are organised around ideas that become easier to understand when you can see them respond visually."
          />

          <div className="labs-directory-stack">
            {subjects.map(
              (subject) => {
                const subjectLabs =
                  labs.filter(
                    (lab) =>
                      lab.subject ===
                      subject.name
                  );

                if (
                  subjectLabs.length === 0
                ) {
                  return null;
                }

                return (
                  <section
                    key={subject.slug}
                    id={`labs-${subject.slug}`}
                    className="labs-subject-section"
                  >
                    <div className="course-subject-header">
                      <div className="course-subject-heading">
                        <span
                          className={`mini-symbol ${subject.accent}`}
                        >
                          {subject.symbol}
                        </span>

                        <div>
                          <span className="eyebrow">
                            {
                              subject.eyebrow
                            }
                          </span>

                          <h2>
                            {subject.name}
                          </h2>
                        </div>
                      </div>

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

                    <div className="labs-card-grid">
                      {subjectLabs.map(
                        (lab) => (
                          <article
                            key={lab.slug}
                            className={`lab-card ${lab.accent}`}
                          >
                            <div className="lab-card-top">
                              <span className="lab-card-symbol">
                                {lab.symbol}
                              </span>

                              <span className="pill">
                                {lab.type}
                              </span>
                            </div>

                            <div className="lab-card-visual">
                              <div className="lab-mini-grid" />

                              <div className="lab-mini-wave" />

                              <span className="lab-mini-dot dot-a" />
                              <span className="lab-mini-dot dot-b" />
                              <span className="lab-mini-dot dot-c" />
                            </div>

                            <div className="lab-card-content">
                              <h3>
                                {lab.title}
                              </h3>

                              <p>
                                {
                                  lab.description
                                }
                              </p>
                            </div>

                            <div className="course-card-skills">
                              {lab.concepts.map(
                                (
                                  concept
                                ) => (
                                  <span
                                    key={
                                      concept
                                    }
                                  >
                                    {
                                      concept
                                    }
                                  </span>
                                )
                              )}
                            </div>

                            <div className="lab-card-bottom">
                              <span>
                                Preview lab
                              </span>

                              <span className="circle-arrow">
                                <Icon
                                  name="arrow"
                                  size={15}
                                />
                              </span>
                            </div>
                          </article>
                        )
                      )}
                    </div>
                  </section>
                );
              }
            )}
          </div>
        </div>
      </section>


      {/* ==================================================================
          HOW LABS FIT WITH COURSES
         ================================================================== */}

      <section className="section dark">
        <div className="shell">
          <SectionHeading
            eyebrow="Connected learning"
            title="Labs are not separate from courses."
            description="They are designed to sit between explanation and formal practice, helping difficult ideas become intuitive before you apply them independently."
          />

          <div className="labs-learning-flow">
            <div className="labs-flow-item">
              <span>
                01
              </span>

              <h3>
                Learn
              </h3>

              <p>
                Start with a structured explanation inside a course.
              </p>
            </div>

            <div className="labs-flow-arrow">
              →
            </div>

            <div className="labs-flow-item">
              <span>
                02
              </span>

              <h3>
                Explore
              </h3>

              <p>
                Use an Interactive Lab to manipulate the concept.
              </p>
            </div>

            <div className="labs-flow-arrow">
              →
            </div>

            <div className="labs-flow-item">
              <span>
                03
              </span>

              <h3>
                Practise
              </h3>

              <p>
                Solve problems and work through examples independently.
              </p>
            </div>

            <div className="labs-flow-arrow">
              →
            </div>

            <div className="labs-flow-item">
              <span>
                04
              </span>

              <h3>
                Apply
              </h3>

              <p>
                Use the concept in code, exams, projects or research.
              </p>
            </div>
          </div>

          <div
            style={{
              marginTop: "32px",
            }}
          >
            <Link
              href="/courses"
              className="button button-white"
            >
              Browse courses

              <Icon
                name="arrow"
                size={16}
              />
            </Link>
          </div>
        </div>
      </section>


      {/* ==================================================================
          FUTURE LAB TYPES
         ================================================================== */}

      <section className="section soft">
        <div className="shell">
          <SectionHeading
            eyebrow="Where this can grow"
            title="A full library of interactive understanding."
            description="The lab system can eventually expand beyond demonstrations into coding environments, simulations, calculators and structured practice."
          />

          <div className="feature-list">
            <div className="feature-item">
              <span className="mini-symbol blue">
                σ
              </span>

              <div>
                <strong>
                  Statistical simulations
                </strong>

                <p className="lab-feature-copy">
                  Sampling, distributions, hypothesis testing,
                  regression and probability.
                </p>
              </div>
            </div>


            <div className="feature-item">
              <span className="mini-symbol violet">
                ∑
              </span>

              <div>
                <strong>
                  Mathematical visualisers
                </strong>

                <p className="lab-feature-copy">
                  Functions, calculus, vectors, matrices and
                  optimisation.
                </p>
              </div>
            </div>


            <div className="feature-item">
              <span className="mini-symbol teal">
                ◉
              </span>

              <div>
                <strong>
                  Machine learning sandboxes
                </strong>

                <p className="lab-feature-copy">
                  Classification, regression, clustering and model
                  evaluation.
                </p>
              </div>
            </div>


            <div className="feature-item">
              <span className="mini-symbol green">
                ⌬
              </span>

              <div>
                <strong>
                  Bioinformatics explorers
                </strong>

                <p className="lab-feature-copy">
                  Sequences, expression data, genomics and
                  transcriptomics.
                </p>
              </div>
            </div>


            <div className="feature-item">
              <span className="mini-symbol orange">
                {"</>"}
              </span>

              <div>
                <strong>
                  Algorithm visualisers
                </strong>

                <p className="lab-feature-copy">
                  Sorting, graph traversal, recursion and data
                  structures.
                </p>
              </div>
            </div>


            <div className="feature-item">
              <span className="mini-symbol">
                ▶
              </span>

              <div>
                <strong>
                  Guided coding environments
                </strong>

                <p className="lab-feature-copy">
                  Run code, change examples and learn through
                  experimentation.
                </p>
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
          <div className="cta-band">
            <div>
              <span className="eyebrow light">
                Learn actively
              </span>

              <h2>
                See it.
                <br />
                Change it.
                <br />
                Understand it.
              </h2>
            </div>

            <div>
              <p>
                Combine courses with visual exploration and expert
                support to make difficult quantitative and
                computational ideas easier to understand.
              </p>

              <div className="course-cta-actions">
                <Link
                  href="/learning"
                  className="button button-white"
                >
                  Find my learning path

                  <Icon
                    name="arrow"
                    size={16}
                  />
                </Link>

                <Link
                  href="/tutoring"
                  className="button course-dark-outline"
                >
                  Explore tutoring
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}