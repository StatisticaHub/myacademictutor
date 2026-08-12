import type { Metadata } from "next";
import Link from "next/link";

import Icon from "@/components/Icon";
import SectionHeading from "@/components/SectionHeading";

import { subjects } from "@/lib/data";


/* ==========================================================================
   METADATA
   ========================================================================== */

export const metadata: Metadata = {
  title: "Learning Resources",

  description:
    "Explore quantitative and computational learning resources across Statistics, Mathematics, Data Science, Bioinformatics and Computer Science.",

  openGraph: {
    title: "Learning Resources | My Academic Tutor",

    description:
      "Academic guides, study support, technical references and practical resources for quantitative and computational learning.",
  },
};


/* ==========================================================================
   RESOURCE COLLECTIONS
   ========================================================================== */

const resourceCollections = [
  {
    number: "01",
    title: "Concept Guides",
    kicker: "Understand difficult ideas",
    description:
      "Clear explanations that focus on intuition, terminology, assumptions and the reasoning behind important quantitative concepts.",
    examples: [
      "Probability & distributions",
      "Regression & modelling",
      "Calculus & linear algebra",
      "Machine learning concepts",
    ],
  },

  {
    number: "02",
    title: "Technical Reference",
    kicker: "Find what you need quickly",
    description:
      "Compact reference material for formulas, statistical methods, programming syntax and analytical workflows.",
    examples: [
      "Statistical reference",
      "R & Python essentials",
      "SQL patterns",
      "Algorithm reference",
    ],
  },

  {
    number: "03",
    title: "Research Toolkit",
    kicker: "Work more rigorously",
    description:
      "Resources for students and researchers working with data, statistical methods, computational workflows and reproducible analysis.",
    examples: [
      "Research planning",
      "Reproducible analysis",
      "Data visualisation",
      "Method interpretation",
    ],
  },

  {
    number: "04",
    title: "Study Support",
    kicker: "Learn more effectively",
    description:
      "Practical guidance for understanding technical subjects, preparing for examinations and approaching university-level work.",
    examples: [
      "Problem solving",
      "Exam preparation",
      "Technical note-taking",
      "Learning mathematics",
    ],
  },

  {
    number: "05",
    title: "Coding Workflows",
    kicker: "Move from syntax to practice",
    description:
      "Structured guidance for using programming tools in data analysis, statistics, bioinformatics and computational projects.",
    examples: [
      "R workflows",
      "Python workflows",
      "Git & GitHub",
      "Linux essentials",
    ],
  },

  {
    number: "06",
    title: "Applied Examples",
    kicker: "See methods in context",
    description:
      "Worked examples that connect theory to realistic analytical, scientific and computational problems.",
    examples: [
      "Health data",
      "Genomic data",
      "Machine learning",
      "Scientific computing",
    ],
  },
];


/* ==========================================================================
   FEATURED RESOURCES
   ========================================================================== */

const featuredResources = [
  {
    category: "Statistics",
    title: "Start with Statistical Foundations",
    description:
      "Build the probability, data and inference foundations required for later statistical modelling.",
    href: "/courses/statistics-foundations",
    accent: "blue",
    symbol: "σ",
  },

  {
    category: "Mathematics",
    title: "Build Your Calculus Foundations",
    description:
      "Strengthen functions, limits, derivatives and the mathematical reasoning used across quantitative subjects.",
    href: "/courses/calculus-foundations",
    accent: "violet",
    symbol: "∑",
  },

  {
    category: "Data Science",
    title: "Learn Python for Data Science",
    description:
      "Develop practical Python skills for working with data, analysis and computational workflows.",
    href: "/courses/python-data-science",
    accent: "teal",
    symbol: "◉",
  },

  {
    category: "Bioinformatics",
    title: "Understand RNA-seq Analysis",
    description:
      "Explore the foundations and workflow behind bulk transcriptomic analysis.",
    href: "/courses/bulk-rnaseq",
    accent: "green",
    symbol: "⌬",
  },

  {
    category: "Computer Science",
    title: "Strengthen Algorithms & Data Structures",
    description:
      "Build the reasoning required to understand efficient algorithms and core data structures.",
    href: "/courses/data-structures-algorithms",
    accent: "orange",
    symbol: "</>",
  },

  {
    category: "Interactive Learning",
    title: "Explore Concepts Visually",
    description:
      "Use Interactive Labs to make statistical, mathematical and computational ideas easier to see and reason about.",
    href: "/labs",
    accent: "",
    symbol: "↗",
  },
];


/* ==========================================================================
   PAGE
   ========================================================================== */

export default function ResourcesPage() {
  return (
    <>
      {/* ==================================================================
          HERO
         ================================================================== */}

      <section className="page-hero resources-hero">
        <div className="shell resources-hero-grid">
          <div>
            <div className="breadcrumbs">
              Home / Resources
            </div>

            <span className="eyebrow resources-hero-eyebrow">
              Academic knowledge hub
            </span>

            <h1>
              Learn something.
              <br />
              Look something up.
              <br />
              Understand it better.
            </h1>

            <p>
              Use concise guides, technical references, practical
              workflows and applied examples alongside your courses
              and pathways.
            </p>

            <div className="hero-actions">
              <Link
                href="#featured-resources"
                className="button"
              >
                Explore resources

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

                Concepts
              </span>

              <span>
                <Icon
                  name="check"
                  size={14}
                />

                Technical reference
              </span>

              <span>
                <Icon
                  name="check"
                  size={14}
                />

                Research workflows
              </span>

              <span>
                <Icon
                  name="check"
                  size={14}
                />

                Study guidance
              </span>
            </div>
          </div>


          {/* --------------------------------------------------------------
              Resource index visual
             -------------------------------------------------------------- */}

          <aside className="resources-index-card">
            <div className="resources-index-top">
              <span className="eyebrow light">
                Resource index
              </span>

              <span className="resources-index-pill">
                Knowledge
              </span>
            </div>

            <h2>
              What are you trying to do?
            </h2>

            <div className="resources-index-list">
              <Link href="#collections">
                <span>
                  01
                </span>

                <strong>
                  Understand a concept
                </strong>

                <Icon
                  name="arrow"
                  size={14}
                />
              </Link>

              <Link href="#collections">
                <span>
                  02
                </span>

                <strong>
                  Look up a method
                </strong>

                <Icon
                  name="arrow"
                  size={14}
                />
              </Link>

              <Link href="#featured-resources">
                <span>
                  03
                </span>

                <strong>
                  Learn a technical skill
                </strong>

                <Icon
                  name="arrow"
                  size={14}
                />
              </Link>

              <Link href="#research">
                <span>
                  04
                </span>

                <strong>
                  Support university or research work
                </strong>

                <Icon
                  name="arrow"
                  size={14}
                />
              </Link>

              <Link href="/learning">
                <span>
                  05
                </span>

                <strong>
                  Find what I should learn next
                </strong>

                <Icon
                  name="arrow"
                  size={14}
                />
              </Link>
            </div>
          </aside>
        </div>
      </section>


      {/* ==================================================================
          RESOURCE PHILOSOPHY
         ================================================================== */}

      <section className="section soft">
        <div className="shell">
          <SectionHeading
            eyebrow="Designed for usefulness"
            title="Not every question needs another full course."
            description="Sometimes you need a clear explanation, a quick reference, a worked example or guidance on how to approach a technical task. Resources are designed for those moments."
          />

          <div className="level-grid">
            <div className="level-card">
              <span className="num">
                01
              </span>

              <h3>
                Learn
              </h3>

              <small>
                Build understanding
              </small>

              <p>
                Read focused explanations when you need to understand
                an idea without beginning an entire course.
              </p>
            </div>

            <div className="level-card">
              <span className="num">
                02
              </span>

              <h3>
                Reference
              </h3>

              <small>
                Find information quickly
              </small>

              <p>
                Return to formulas, assumptions, terminology and
                technical patterns while working independently.
              </p>
            </div>

            <div className="level-card">
              <span className="num">
                03
              </span>

              <h3>
                Apply
              </h3>

              <small>
                Follow practical workflows
              </small>

              <p>
                Use structured guides when moving from theoretical
                understanding into analysis, programming or research.
              </p>
            </div>

            <div className="level-card">
              <span className="num">
                04
              </span>

              <h3>
                Continue
              </h3>

              <small>
                Know what comes next
              </small>

              <p>
                Move from a resource into the right course, pathway or
                interactive lab when you want to go deeper.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* ==================================================================
          SUBJECT NAVIGATION
         ================================================================== */}

      <section className="trust-strip">
        <div className="shell">
          <div className="course-directory-nav">
            <span className="course-directory-label">
              Explore by subject
            </span>

            {subjects.map((subject) => (
              <Link
                key={subject.slug}
                href={`/subjects/${subject.slug}`}
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
          FEATURED RESOURCES
         ================================================================== */}

      <section
        className="section"
        id="featured-resources"
      >
        <div className="shell">
          <SectionHeading
            eyebrow="Start here"
            title="Useful places to go next."
            description="These resources connect directly into structured areas of the platform that are already available."
          />

          <div className="resource-featured-grid">
            {featuredResources.map((resource) => (
              <Link
                key={resource.title}
                href={resource.href}
                className={`resource-featured-card ${resource.accent}`}
              >
                <div className="resource-featured-top">
                  <span className="resource-featured-symbol">
                    {resource.symbol}
                  </span>

                  <span className="eyebrow">
                    {resource.category}
                  </span>
                </div>

                <h3>
                  {resource.title}
                </h3>

                <p>
                  {resource.description}
                </p>

                <div className="resource-featured-bottom">
                  <span>
                    Explore resource
                  </span>

                  <span className="circle-arrow">
                    <Icon
                      name="arrow"
                      size={15}
                    />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>


      {/* ==================================================================
          COLLECTIONS
         ================================================================== */}

      <section
        className="section dark"
        id="collections"
      >
        <div className="shell">
          <SectionHeading
            eyebrow="Resource library"
            title="A growing library organised by purpose."
            description="As the platform develops, these collections can become searchable libraries containing concise guides, worked examples and technical reference material."
          />

          <div className="resource-collection-grid">
            {resourceCollections.map((collection) => (
              <article
                key={collection.title}
                className="resource-collection-card"
              >
                <span className="resource-collection-number">
                  {collection.number}
                </span>

                <span className="eyebrow light">
                  {collection.kicker}
                </span>

                <h3>
                  {collection.title}
                </h3>

                <p>
                  {collection.description}
                </p>

                <div className="resource-example-list">
                  {collection.examples.map((example) => (
                    <span key={example}>
                      {example}
                    </span>
                  ))}
                </div>

                <div className="resource-coming-soon">
                  Library expanding
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>


      {/* ==================================================================
          RESEARCH HUB
         ================================================================== */}

      <section
        className="section"
        id="research"
      >
        <div className="shell">
          <div className="resources-research-grid">
            <div>
              <span className="eyebrow">
                University & research
              </span>

              <h2>
                From using a method to understanding the decision.
              </h2>

              <p>
                Research-oriented resources should help learners
                understand assumptions, analytical choices,
                reproducibility and interpretation—not simply reproduce
                a sequence of software commands.
              </p>

              <div className="hero-actions">
                <Link
                  href="/learning?level=postgraduate"
                  className="button"
                >
                  Explore postgraduate learning

                  <Icon
                    name="arrow"
                    size={16}
                  />
                </Link>

                <Link
                  href="/tutoring"
                  className="button button-outline"
                >
                  Research support
                </Link>
              </div>
            </div>

            <div className="resources-research-list">
              <div>
                <span>
                  01
                </span>

                <div>
                  <strong>
                    Understand assumptions
                  </strong>

                  <p>
                    Know what must be true for a method to be
                    appropriate.
                  </p>
                </div>
              </div>

              <div>
                <span>
                  02
                </span>

                <div>
                  <strong>
                    Choose methods deliberately
                  </strong>

                  <p>
                    Connect the research question, data structure and
                    analytical method.
                  </p>
                </div>
              </div>

              <div>
                <span>
                  03
                </span>

                <div>
                  <strong>
                    Work reproducibly
                  </strong>

                  <p>
                    Organise code, data and outputs so the analysis can
                    be checked and repeated.
                  </p>
                </div>
              </div>

              <div>
                <span>
                  04
                </span>

                <div>
                  <strong>
                    Interpret carefully
                  </strong>

                  <p>
                    Understand what the result supports—and what it does
                    not.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ==================================================================
          INTERACTIVE RESOURCES
         ================================================================== */}

      <section className="section soft">
        <div className="shell">
          <SectionHeading
            eyebrow="Beyond reading"
            title="Some ideas are easier to explore than explain."
            description="Interactive Labs complement written resources by allowing you to manipulate parameters, observe outcomes and build intuition visually."
          />

          <div className="resource-interactive-band">
            <div className="resource-interactive-visual">
              <div className="resource-mini-axis horizontal" />
              <div className="resource-mini-axis vertical" />

              <span className="resource-mini-point one" />
              <span className="resource-mini-point two" />
              <span className="resource-mini-point three" />
              <span className="resource-mini-point four" />

              <div className="resource-mini-line" />
            </div>

            <div>
              <span className="eyebrow">
                Interactive Labs
              </span>

              <h3>
                See the concept respond.
              </h3>

              <p>
                Explore distributions, regression, calculus,
                optimisation, genomic data and algorithms through
                interactive visual experiences.
              </p>

              <Link
                href="/labs"
                className="button"
              >
                Explore Interactive Labs

                <Icon
                  name="arrow"
                  size={16}
                />
              </Link>
            </div>
          </div>
        </div>
      </section>


      {/* ==================================================================
          HOW RESOURCES CONNECT
         ================================================================== */}

      <section className="section">
        <div className="shell">
          <SectionHeading
            eyebrow="One learning system"
            title="Resources should always lead somewhere."
            description="Use them independently, or move into deeper learning when the question becomes larger than a single guide can answer."
          />

          <div className="feature-list">
            <Link
              href="/courses"
              className="feature-item"
            >
              <span className="mini-symbol">
                01
              </span>

              <div>
                <strong>
                  Need structured depth?
                </strong>

                <p className="resource-feature-copy">
                  Move from a guide into a complete course.
                </p>
              </div>
            </Link>

            <Link
              href="/pathways"
              className="feature-item"
            >
              <span className="mini-symbol">
                02
              </span>

              <div>
                <strong>
                  Need a longer direction?
                </strong>

                <p className="resource-feature-copy">
                  Combine multiple skills through a pathway.
                </p>
              </div>
            </Link>

            <Link
              href="/labs"
              className="feature-item"
            >
              <span className="mini-symbol">
                03
              </span>

              <div>
                <strong>
                  Need better intuition?
                </strong>

                <p className="resource-feature-copy">
                  Explore the idea visually in an Interactive Lab.
                </p>
              </div>
            </Link>

            <Link
              href="/tutoring"
              className="feature-item"
            >
              <span className="mini-symbol">
                04
              </span>

              <div>
                <strong>
                  Still stuck?
                </strong>

                <p className="resource-feature-copy">
                  Work through the bottleneck with an expert.
                </p>
              </div>
            </Link>
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
                Learn with direction
              </span>

              <h2>
                A useful resource answers the question.
                <br />
                A good platform helps with what comes next.
              </h2>
            </div>

            <div>
              <p>
                Explore focused resources when you need them, then move
                into structured courses, pathways, interactive learning
                or expert support when your goal requires more depth.
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
                  href="/courses"
                  className="button course-dark-outline"
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