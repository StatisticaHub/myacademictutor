import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import Icon from "@/components/Icon";
import SectionHeading from "@/components/SectionHeading";

import {
  courses,
  getPathway,
  pathways,
  subjects,
} from "@/lib/data";


/* ==========================================================================
   STATIC ROUTES
   ========================================================================== */

export function generateStaticParams() {
  return pathways.map((pathway) => ({
    slug: pathway.slug,
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

  const pathway = getPathway(slug);

  if (!pathway) {
    return {
      title: "Learning Pathway",
    };
  }

  return {
    title: pathway.name,

    description: pathway.description,

    openGraph: {
      title: `${pathway.name} Pathway | My Academic Tutor`,
      description: pathway.description,
    },
  };
}


/* ==========================================================================
   HELPERS
   ========================================================================== */

function findMatchingCourse(step: string) {
  const normalizedStep = step.toLowerCase();

  return courses.find((course) => {
    const normalizedTitle =
      course.title.toLowerCase();

    return (
      normalizedStep.includes(normalizedTitle) ||
      normalizedTitle.includes(normalizedStep)
    );
  });
}


function getPathwayOutcome(
  pathwayName: string
) {
  const name = pathwayName.toLowerCase();

  if (name.includes("data scientist")) {
    return {
      headline:
        "Move from raw data to defensible predictive insight.",

      outcomes: [
        "Work confidently with Python and SQL",
        "Understand statistical modelling",
        "Build and evaluate machine learning models",
        "Communicate analytical findings",
        "Complete portfolio-ready projects",
        "Understand the mathematics behind the methods",
      ],
    };
  }

  if (name.includes("data analyst")) {
    return {
      headline:
        "Turn business and research questions into clear analysis.",

      outcomes: [
        "Clean and organise real datasets",
        "Analyse data with Excel and SQL",
        "Use statistics appropriately",
        "Build effective visualisations",
        "Communicate findings clearly",
        "Develop practical portfolio work",
      ],
    };
  }

  if (name.includes("biostatistician")) {
    return {
      headline:
        "Build the statistical toolkit used in health and medical research.",

      outcomes: [
        "Understand statistical inference",
        "Fit and interpret regression models",
        "Analyse time-to-event data",
        "Work reproducibly in R",
        "Understand epidemiological reasoning",
        "Apply methods to health research questions",
      ],
    };
  }

  if (
    name.includes("statistical researcher")
  ) {
    return {
      headline:
        "Progress from statistical methods to independent methodological thinking.",

      outcomes: [
        "Evaluate statistical assumptions",
        "Choose suitable analytical methods",
        "Work with advanced regression",
        "Understand Bayesian and causal methods",
        "Build reproducible research workflows",
        "Communicate methodological decisions",
      ],
    };
  }

  if (
    name.includes("bioinformatics analyst")
  ) {
    return {
      headline:
        "Develop the computational skills needed to analyse modern biological data.",

      outcomes: [
        "Work confidently in Linux",
        "Process biological sequence data",
        "Use R or Python for analysis",
        "Understand genomics workflows",
        "Analyse RNA-seq data",
        "Create reproducible biological analyses",
      ],
    };
  }

  if (
    name.includes("computational biologist")
  ) {
    return {
      headline:
        "Connect biology, statistics and computing for advanced research.",

      outcomes: [
        "Analyse sequencing data",
        "Understand statistical genomics",
        "Work with transcriptomic data",
        "Analyse single-cell datasets",
        "Explore spatial transcriptomics",
        "Integrate multiple computational approaches",
      ],
    };
  }

  if (
    name.includes("python developer")
  ) {
    return {
      headline:
        "Go from writing scripts to designing reliable software.",

      outcomes: [
        "Write clean Python programs",
        "Understand object-oriented design",
        "Use core data structures",
        "Reason about algorithms",
        "Use Git and GitHub professionally",
        "Build complete programming projects",
      ],
    };
  }

  if (
    name.includes("machine learning")
  ) {
    return {
      headline:
        "Build machine learning from the mathematics upwards.",

      outcomes: [
        "Understand core machine learning concepts",
        "Prepare data for modelling",
        "Evaluate models correctly",
        "Apply regularisation and tuning",
        "Interpret model behaviour",
        "Complete end-to-end ML projects",
      ],
    };
  }

  return {
    headline:
      "Build a coherent set of skills towards a meaningful goal.",

    outcomes: [
      "Build strong foundations",
      "Progress systematically",
      "Develop practical skills",
      "Apply concepts independently",
      "Connect related disciplines",
      "Complete meaningful projects",
    ],
  };
}


/* ==========================================================================
   PAGE
   ========================================================================== */

export default async function PathwayPage({
  params,
}: {
  params: Promise<{
    slug: string;
  }>;
}) {
  const { slug } = await params;

  const pathway = getPathway(slug);

  if (!pathway) {
    notFound();
  }

  const pathwayOutcome =
    getPathwayOutcome(pathway.name);

  const relatedPathways = pathways
    .filter(
      (item) =>
        item.slug !== pathway.slug
    )
    .slice(0, 3);

  const primarySubject =
    subjects.find(
      (subject) =>
        subject.name.toLowerCase() ===
        pathway.subject.toLowerCase()
    );


  return (
    <>
      {/* ==================================================================
          HERO
         ================================================================== */}

      <section className="page-hero">
        <div className="shell pathway-hero-grid">
          <div>
            <div className="breadcrumbs">
              Home / Pathways / {pathway.name}
            </div>

            <span
              className="eyebrow"
              style={{
                display: "inline-block",
                marginTop: "30px",
              }}
            >
              {pathway.tag}
            </span>

            <h1>
              {pathway.name}
            </h1>

            <p>
              {pathway.description}
            </p>

            <div className="hero-actions">
              <Link
                href="#roadmap"
                className="button"
              >
                View roadmap

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

                {pathway.steps.length} stages
              </span>

              <span>
                <Icon
                  name="check"
                  size={14}
                />

                {pathway.duration}
              </span>

              <span>
                <Icon
                  name="check"
                  size={14}
                />

                {pathway.subject}
              </span>
            </div>
          </div>


          {/* --------------------------------------------------------------
              Summary card
             -------------------------------------------------------------- */}

          <aside className="pathway-summary-card">
            <span className="eyebrow light">
              Your destination
            </span>

            {primarySubject && (
              <span
                className={`mini-symbol ${primarySubject.accent}`}
                style={{
                  width: "52px",
                  height: "52px",
                  marginTop: "24px",
                  fontSize: "18px",
                }}
              >
                {primarySubject.symbol}
              </span>
            )}

            <h2>
              {pathwayOutcome.headline}
            </h2>

            <div className="pathway-summary-meta">
              <div>
                <span>
                  Duration
                </span>

                <strong>
                  {pathway.duration}
                </strong>
              </div>

              <div>
                <span>
                  Main discipline
                </span>

                <strong>
                  {pathway.subject}
                </strong>
              </div>

              <div>
                <span>
                  Structure
                </span>

                <strong>
                  {pathway.steps.length} stages
                </strong>
              </div>
            </div>

            <Link
              href="#roadmap"
              className="button button-white"
              style={{
                width: "100%",
                marginTop: "24px",
              }}
            >
              Start with stage 1

              <Icon
                name="arrow"
                size={15}
              />
            </Link>
          </aside>
        </div>
      </section>


      {/* ==================================================================
          PATHWAY OVERVIEW
         ================================================================== */}

      <section className="section soft">
        <div className="shell">
          <SectionHeading
            eyebrow="What this pathway builds"
            title={pathwayOutcome.headline}
            description="The aim is not simply to complete the stages below. Each stage should add a capability that makes the next one easier and moves you closer to independent application."
          />

          <div className="feature-list">
            {pathwayOutcome.outcomes.map(
              (outcome, index) => (
                <div
                  key={outcome}
                  className="feature-item"
                >
                  <span
                    className={`mini-symbol ${
                      primarySubject?.accent ?? ""
                    }`}
                  >
                    {String(index + 1).padStart(
                      2,
                      "0"
                    )}
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
                      Develop this capability
                      progressively as you move
                      through the roadmap.
                    </p>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </section>


      {/* ==================================================================
          ROADMAP
         ================================================================== */}

      <section
        className="section"
        id="roadmap"
      >
        <div className="shell">
          <SectionHeading
            eyebrow="Your roadmap"
            title={`${pathway.steps.length} stages from foundation to application.`}
            description="Follow the stages in sequence unless you already have strong evidence that you have mastered an earlier requirement."
          />

          <div className="pathway-roadmap">
            {pathway.steps.map(
              (step, index) => {
                const matchedCourse =
                  findMatchingCourse(step);

                return (
                  <div
                    key={step}
                    className="pathway-roadmap-row"
                  >
                    <div className="pathway-roadmap-marker">
                      <span>
                        {String(
                          index + 1
                        ).padStart(
                          2,
                          "0"
                        )}
                      </span>

                      {index <
                        pathway.steps.length -
                          1 && (
                        <div className="pathway-roadmap-line" />
                      )}
                    </div>

                    <div className="pathway-roadmap-card">
                      <div className="pathway-roadmap-card-top">
                        <div>
                          <span className="eyebrow">
                            Stage {index + 1}
                          </span>

                          <h3>
                            {step}
                          </h3>
                        </div>

                        {matchedCourse && (
                          <span className="pill">
                            Course available
                          </span>
                        )}
                      </div>

                      <p>
                        {getStageDescription(
                          step,
                          index,
                          pathway.steps.length
                        )}
                      </p>

                      <div className="pathway-roadmap-card-bottom">
                        <span>
                          {index === 0
                            ? "Foundation"
                            : index ===
                                pathway.steps
                                  .length -
                                  1
                              ? "Application"
                              : "Progression"}
                        </span>

                        {matchedCourse ? (
                          <Link
                            href={`/courses/${matchedCourse.slug}`}
                            className="button button-outline"
                          >
                            View course

                            <Icon
                              name="arrow"
                              size={15}
                            />
                          </Link>
                        ) : (
                          <Link
                            href="/courses"
                            className="pathway-stage-text-link"
                          >
                            Browse related courses →
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                );
              }
            )}
          </div>
        </div>
      </section>


      {/* ==================================================================
          HOW TO USE PATHWAY
         ================================================================== */}

      <section className="section dark">
        <div className="shell">
          <SectionHeading
            eyebrow="How to use this roadmap"
            title="Progress by mastery, not by calendar."
            description="The suggested duration is a guide. Move faster through skills you already have and spend longer where your foundations are weaker."
          />

          <div className="level-grid">
            <div className="level-card course-dark-card">
              <span className="num">
                01
              </span>

              <h3>
                Diagnose
              </h3>

              <small>
                Identify your starting point
              </small>

              <p>
                Review the early stages and decide
                which foundations you genuinely
                already understand.
              </p>
            </div>


            <div className="level-card course-dark-card">
              <span className="num">
                02
              </span>

              <h3>
                Learn
              </h3>

              <small>
                Build concepts carefully
              </small>

              <p>
                Use structured courses,
                explanations and practice to build
                the skills required at each stage.
              </p>
            </div>


            <div className="level-card course-dark-card">
              <span className="num">
                03
              </span>

              <h3>
                Test
              </h3>

              <small>
                Check independent understanding
              </small>

              <p>
                Move on when you can explain and
                apply the ideas without following a
                worked example step by step.
              </p>
            </div>


            <div className="level-card course-dark-card">
              <span className="num">
                04
              </span>

              <h3>
                Apply
              </h3>

              <small>
                Build something real
              </small>

              <p>
                Complete analyses, projects,
                research workflows or technical
                tasks that combine multiple stages.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* ==================================================================
          CROSS DISCIPLINARY
         ================================================================== */}

      <section className="section soft">
        <div className="shell">
          <SectionHeading
            eyebrow="Connected knowledge"
            title="This pathway may cross several disciplines."
            description="Modern technical work rarely fits inside one academic subject. Use the wider platform to strengthen any supporting areas you discover along the way."
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
                      Explore
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
          TUTORING
         ================================================================== */}

      <section className="section">
        <div className="shell">
          <div className="cta-band">
            <div>
              <span className="eyebrow light">
                Pathway support
              </span>

              <h2>
                Hit a difficult stage?
                <br />
                Get expert help without abandoning the path.
              </h2>
            </div>

            <div>
              <p>
                Use tutoring for difficult concepts,
                technical troubleshooting, project
                feedback, research methods or guidance
                on what to learn next.
              </p>

              <div className="course-cta-actions">
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
                  className="button course-dark-outline"
                >
                  Ask for guidance
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ==================================================================
          RELATED PATHWAYS
         ================================================================== */}

      <section className="section soft">
        <div className="shell">
          <SectionHeading
            eyebrow="Other directions"
            title="Compare related pathways."
            description="Your goal may change as you learn more about the field. Explore other routes before deciding how deeply you want to specialise."
          />

          <div className="pathway-grid">
            {relatedPathways.map(
              (item) => (
                <Link
                  key={item.slug}
                  href={`/pathways/${item.slug}`}
                  className="pathway-card pathway-card-premium"
                >
                  <div className="top">
                    <span className="eyebrow">
                      {item.tag}
                    </span>

                    <span className="pathway-duration">
                      {item.duration}
                    </span>
                  </div>

                  <h3>
                    {item.name}
                  </h3>

                  <p>
                    {item.description}
                  </p>

                  <div className="pathway-stage-preview">
                    {item.steps
                      .slice(0, 4)
                      .map(
                        (
                          stage,
                          index
                        ) => (
                          <div
                            key={stage}
                            className="pathway-stage-preview-row"
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
                              {stage}
                            </strong>
                          </div>
                        )
                      )}
                  </div>

                  <div className="pathway-card-footer">
                    <span>
                      {item.steps.length} stages
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

          <div
            style={{
              marginTop: "32px",
            }}
          >
            <Link
              href="/pathways"
              className="button button-outline"
            >
              Browse all pathways

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
   ROADMAP COPY
   ========================================================================== */

function getStageDescription(
  stage: string,
  index: number,
  total: number
) {
  if (index === 0) {
    return `Build the foundation required for the rest of the pathway. Spend enough time here that ${stage.toLowerCase()} feels usable rather than merely familiar.`;
  }

  if (index === total - 1) {
    return `Bring the earlier stages together through ${stage.toLowerCase()}. The aim is to demonstrate independent application rather than isolated technical knowledge.`;
  }

  return `Develop your capability in ${stage.toLowerCase()} and connect it with the knowledge from earlier stages before progressing further.`;
}