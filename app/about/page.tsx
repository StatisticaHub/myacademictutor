import type { Metadata } from "next";
import Link from "next/link";

import Icon from "@/components/Icon";
import SectionHeading from "@/components/SectionHeading";

import { subjects } from "@/lib/data";


/* ==========================================================================
   METADATA
   ========================================================================== */

export const metadata: Metadata = {
  title: "About",

  description:
    "Learn about My Academic Tutor, a quantitative and computational learning platform built around Statistics, Mathematics, Data Science, Bioinformatics and Computer Science.",

  openGraph: {
    title: "About | My Academic Tutor",

    description:
      "Structured courses, learning pathways, interactive exploration and expert academic support across quantitative and computational disciplines.",
  },
};


/* ==========================================================================
   PAGE
   ========================================================================== */

export default function AboutPage() {
  return (
    <>
      {/* ==================================================================
          HERO
         ================================================================== */}

      <section className="page-hero about-hero">
        <div className="shell about-hero-grid">
          <div>
            <div className="breadcrumbs">
              Home / About
            </div>

            <span className="eyebrow about-hero-eyebrow">
              About My Academic Tutor
            </span>

            <h1>
              Serious subjects.
              <br />
              Clear learning.
              <br />
              Human support.
            </h1>

            <p>
              My Academic Tutor is being built as a focused learning
              platform for quantitative and computational disciplines:
              Statistics, Mathematics, Data Science, Bioinformatics and
              Computer Science.
            </p>

            <div className="hero-actions">
              <Link
                href="/learning"
                className="button"
              >
                Start learning

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
          </div>


          {/* --------------------------------------------------------------
              Statement card
             -------------------------------------------------------------- */}

          <aside className="about-statement-card">
            <span className="eyebrow light">
              The idea
            </span>

            <blockquote>
              Technical learning should feel structured enough to guide
              you, rigorous enough to trust and flexible enough to meet
              you where you are.
            </blockquote>

            <div className="about-statement-divider" />

            <p>
              The platform is designed to connect independent learning
              with targeted expert support rather than treating courses
              and tutoring as unrelated products.
            </p>
          </aside>
        </div>
      </section>


      {/* ==================================================================
          WHY WE EXIST
         ================================================================== */}

      <section className="section soft">
        <div className="shell">
          <SectionHeading
            eyebrow="Why this platform"
            title="Technical subjects are difficult enough without fragmented learning."
            description="Learners often move between lectures, videos, textbooks, code snippets, forums and tutoring without a clear sense of how the pieces fit together. My Academic Tutor is designed around a more coherent learning journey."
          />

          <div className="about-problem-grid">
            <div className="about-problem-card">
              <span className="num">
                01
              </span>

              <h3>
                Too much disconnected content
              </h3>

              <p>
                A learner may find hundreds of explanations but still
                not know which concepts are foundational, what order to
                learn them in or when they are ready to move forward.
              </p>
            </div>


            <div className="about-problem-card">
              <span className="num">
                02
              </span>

              <h3>
                Too little intuition
              </h3>

              <p>
                Technical education can become a sequence of formulas,
                commands and procedures without enough attention to why
                the method works or how the ideas connect.
              </p>
            </div>


            <div className="about-problem-card">
              <span className="num">
                03
              </span>

              <h3>
                Help arrives too late
              </h3>

              <p>
                Learners often seek tutoring only after becoming stuck
                for a long time. Better learning identifies bottlenecks
                early and uses expert support strategically.
              </p>
            </div>


            <div className="about-problem-card">
              <span className="num">
                04
              </span>

              <h3>
                Theory and application drift apart
              </h3>

              <p>
                Students may understand a definition but struggle to use
                it in an exam, dataset, piece of code, research project
                or unfamiliar problem.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* ==================================================================
          SUBJECT FOCUS
         ================================================================== */}

      <section className="section">
        <div className="shell">
          <SectionHeading
            eyebrow="Focused expertise"
            title="Five disciplines. Intentionally connected."
            description="The platform does not try to cover every school and university subject. It concentrates on areas where mathematical reasoning, data, computation and scientific analysis overlap."
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
                  {subject.short}
                </p>

                <div className="card-arrow">
                  <span>
                    Explore discipline
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
          LEARNING SYSTEM
         ================================================================== */}

      <section className="section dark">
        <div className="shell">
          <SectionHeading
            eyebrow="The learning system"
            title="Different tools for different learning problems."
            description="A good educational platform should not force every learner into the same format. Each part of My Academic Tutor has a distinct role."
          />

          <div className="about-system-grid">
            <Link
              href="/courses"
              className="about-system-card"
            >
              <span className="about-system-number">
                01
              </span>

              <span className="eyebrow light">
                Structured depth
              </span>

              <h3>
                Courses
              </h3>

              <p>
                Learn a topic progressively from foundations through
                explanation, practice and application.
              </p>

              <div className="about-system-link">
                Explore courses
                <Icon
                  name="arrow"
                  size={15}
                />
              </div>
            </Link>


            <Link
              href="/pathways"
              className="about-system-card"
            >
              <span className="about-system-number">
                02
              </span>

              <span className="eyebrow light">
                Longer direction
              </span>

              <h3>
                Pathways
              </h3>

              <p>
                Connect courses and skills into larger academic,
                research and career journeys.
              </p>

              <div className="about-system-link">
                Explore pathways
                <Icon
                  name="arrow"
                  size={15}
                />
              </div>
            </Link>


            <Link
              href="/labs"
              className="about-system-card"
            >
              <span className="about-system-number">
                03
              </span>

              <span className="eyebrow light">
                Build intuition
              </span>

              <h3>
                Interactive Labs
              </h3>

              <p>
                Manipulate concepts, observe outcomes and make abstract
                ideas easier to see.
              </p>

              <div className="about-system-link">
                Explore labs
                <Icon
                  name="arrow"
                  size={15}
                />
              </div>
            </Link>


            <Link
              href="/tutoring"
              className="about-system-card"
            >
              <span className="about-system-number">
                04
              </span>

              <span className="eyebrow light">
                Targeted support
              </span>

              <h3>
                Expert Tutoring
              </h3>

              <p>
                Bring in human support when a difficult concept,
                technical problem or learning bottleneck needs focused
                attention.
              </p>

              <div className="about-system-link">
                Explore tutoring
                <Icon
                  name="arrow"
                  size={15}
                />
              </div>
            </Link>
          </div>
        </div>
      </section>


      {/* ==================================================================
          PHILOSOPHY
         ================================================================== */}

      <section className="section soft">
        <div className="shell">
          <SectionHeading
            eyebrow="Learning philosophy"
            title="Understanding should come before performance."
            description="Good marks, successful projects and technical fluency are valuable outcomes. But the platform is built around the belief that durable performance comes from understanding the ideas underneath."
          />

          <div className="about-principles">
            <div className="about-principle-row">
              <span>
                01
              </span>

              <div>
                <h3>
                  Build intuition before memorisation.
                </h3>

                <p>
                  Formulas, syntax and procedures are easier to use when
                  you understand the problem they are designed to solve.
                </p>
              </div>
            </div>


            <div className="about-principle-row">
              <span>
                02
              </span>

              <div>
                <h3>
                  Progress from foundations.
                </h3>

                <p>
                  Difficult advanced topics often become manageable once
                  the missing prerequisite is identified and repaired.
                </p>
              </div>
            </div>


            <div className="about-principle-row">
              <span>
                03
              </span>

              <div>
                <h3>
                  Practise actively.
                </h3>

                <p>
                  Watching somebody else solve a problem is not the same
                  as being able to solve it yourself.
                </p>
              </div>
            </div>


            <div className="about-principle-row">
              <span>
                04
              </span>

              <div>
                <h3>
                  Connect theory with application.
                </h3>

                <p>
                  Learning becomes useful when concepts can be applied
                  to unfamiliar questions, code, datasets and research.
                </p>
              </div>
            </div>


            <div className="about-principle-row">
              <span>
                05
              </span>

              <div>
                <h3>
                  Ask for help strategically.
                </h3>

                <p>
                  Expert support should remove bottlenecks and improve
                  independence rather than create dependence.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ==================================================================
          LEARNER RANGE
         ================================================================== */}

      <section className="section">
        <div className="shell">
          <SectionHeading
            eyebrow="Who the platform is for"
            title="Different stages. The same expectation of clarity."
            description="The depth changes, but the learning principles remain consistent from school foundations through postgraduate study and independent professional learning."
          />

          <div className="level-grid">
            <Link
              href="/learning?level=high-school"
              className="level-card"
            >
              <span className="num">
                01
              </span>

              <h3>
                High School
              </h3>

              <small>
                Foundations + examinations
              </small>

              <p>
                Build confidence, strengthen core concepts and prepare
                for more advanced study.
              </p>

              <div className="level-card-footer">
                <span>
                  Explore level
                </span>

                <Icon
                  name="arrow"
                  size={15}
                />
              </div>
            </Link>


            <Link
              href="/learning?level=undergraduate"
              className="level-card"
            >
              <span className="num">
                02
              </span>

              <h3>
                Undergraduate
              </h3>

              <small>
                University understanding
              </small>

              <p>
                Go beyond lecture notes and develop stronger theoretical
                and practical understanding.
              </p>

              <div className="level-card-footer">
                <span>
                  Explore level
                </span>

                <Icon
                  name="arrow"
                  size={15}
                />
              </div>
            </Link>


            <Link
              href="/learning?level=postgraduate"
              className="level-card"
            >
              <span className="num">
                03
              </span>

              <h3>
                Postgraduate
              </h3>

              <small>
                Advanced + research
              </small>

              <p>
                Develop specialist methods, critical reasoning and
                research-oriented technical capability.
              </p>

              <div className="level-card-footer">
                <span>
                  Explore level
                </span>

                <Icon
                  name="arrow"
                  size={15}
                />
              </div>
            </Link>


            <Link
              href="/learning?level=casual"
              className="level-card"
            >
              <span className="num">
                04
              </span>

              <h3>
                Learn for Yourself
              </h3>

              <small>
                Career + curiosity
              </small>

              <p>
                Build useful quantitative and computational skills at
                your own pace.
              </p>

              <div className="level-card-footer">
                <span>
                  Explore level
                </span>

                <Icon
                  name="arrow"
                  size={15}
                />
              </div>
            </Link>
          </div>
        </div>
      </section>


      {/* ==================================================================
          STANDARDS
         ================================================================== */}

      <section className="section about-standards-section">
        <div className="shell">
          <div className="about-standards-grid">
            <div>
              <span className="eyebrow light">
                What should define the platform
              </span>

              <h2>
                Academic enough to trust.
                <br />
                Modern enough to enjoy using.
              </h2>
            </div>

            <div className="about-standards-list">
              <div>
                <span>
                  01
                </span>

                <div>
                  <strong>
                    Clear
                  </strong>

                  <p>
                    Explain technical ideas without unnecessary
                    complexity.
                  </p>
                </div>
              </div>

              <div>
                <span>
                  02
                </span>

                <div>
                  <strong>
                    Rigorous
                  </strong>

                  <p>
                    Respect assumptions, limitations and the reasoning
                    behind methods.
                  </p>
                </div>
              </div>

              <div>
                <span>
                  03
                </span>

                <div>
                  <strong>
                    Applied
                  </strong>

                  <p>
                    Connect concepts to real analysis, programming,
                    problem solving and research.
                  </p>
                </div>
              </div>

              <div>
                <span>
                  04
                </span>

                <div>
                  <strong>
                    Honest
                  </strong>

                  <p>
                    Avoid false guarantees, invented credentials and
                    unrealistic claims about learning outcomes.
                  </p>
                </div>
              </div>

              <div>
                <span>
                  05
                </span>

                <div>
                  <strong>
                    Responsible
                  </strong>

                  <p>
                    Support learners without replacing their academic
                    responsibility.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ==================================================================
          ACADEMIC INTEGRITY
         ================================================================== */}

      <section className="section soft">
        <div className="shell">
          <div className="about-integrity">
            <div className="about-integrity-symbol">
              ✓
            </div>

            <div>
              <span className="eyebrow">
                Academic integrity
              </span>

              <h2>
                Help should make learners more capable.
              </h2>

              <p>
                My Academic Tutor is designed around teaching,
                explanation, guidance and skill development. Academic
                support should help learners complete their own work,
                make their own decisions and develop their own
                understanding.
              </p>

              <Link
                href="/academic-integrity"
                className="button button-outline"
              >
                Read our academic integrity policy

                <Icon
                  name="arrow"
                  size={15}
                />
              </Link>
            </div>
          </div>
        </div>
      </section>


      {/* ==================================================================
          BUILDING FORWARD
         ================================================================== */}

      <section className="section">
        <div className="shell">
          <SectionHeading
            eyebrow="Building forward"
            title="The platform is designed to grow without losing focus."
            description="New courses, resources and interactive experiences can be added over time while preserving the same five-discipline structure and learning philosophy."
          />

          <div className="feature-list">
            <div className="feature-item">
              <span className="mini-symbol">
                01
              </span>

              <div>
                <strong>
                  Deeper course libraries
                </strong>

                <p className="about-feature-copy">
                  Expand each subject from foundational learning into
                  increasingly specialised topics.
                </p>
              </div>
            </div>


            <div className="feature-item">
              <span className="mini-symbol">
                02
              </span>

              <div>
                <strong>
                  More Interactive Labs
                </strong>

                <p className="about-feature-copy">
                  Make difficult mathematical, statistical and
                  computational concepts explorable.
                </p>
              </div>
            </div>


            <div className="feature-item">
              <span className="mini-symbol">
                03
              </span>

              <div>
                <strong>
                  Better learner pathways
                </strong>

                <p className="about-feature-copy">
                  Help learners move from their current level towards
                  specific academic and professional goals.
                </p>
              </div>
            </div>


            <div className="feature-item">
              <span className="mini-symbol">
                04
              </span>

              <div>
                <strong>
                  Stronger support systems
                </strong>

                <p className="about-feature-copy">
                  Connect independent learning with expert support at
                  the moments where it has the greatest value.
                </p>
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
                Start somewhere useful
              </span>

              <h2>
                Choose a subject.
                <br />
                Find your level.
                <br />
                Start building.
              </h2>
            </div>

            <div>
              <p>
                Explore the platform by discipline, browse the full
                course catalogue or use the Learning Path Finder if
                you are unsure where to begin.
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
                  href="/subjects"
                  className="button course-dark-outline"
                >
                  Explore subjects
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}