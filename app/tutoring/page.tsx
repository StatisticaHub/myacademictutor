import type { Metadata } from "next";
import Link from "next/link";

import Icon from "@/components/Icon";
import SectionHeading from "@/components/SectionHeading";

import { subjects } from "@/lib/data";


/* ==========================================================================
   METADATA
   ========================================================================== */

export const metadata: Metadata = {
  title: "Expert Tutoring",

  description:
    "Get expert one-to-one support in Statistics, Mathematics, Data Science, Bioinformatics and Computer Science for school, university, research and independent learning.",

  openGraph: {
    title: "Expert Tutoring | My Academic Tutor",

    description:
      "One-to-one quantitative and computational support when structured independent learning is not enough.",
  },
};


/* ==========================================================================
   SUPPORT TYPES
   ========================================================================== */

const supportTypes = [
  {
    number: "01",
    title: "Concept support",
    kicker: "Understand difficult ideas",
    copy:
      "Work through concepts that still feel unclear after lectures, reading or independent study.",
  },

  {
    number: "02",
    title: "Exam preparation",
    kicker: "Prepare with understanding",
    copy:
      "Strengthen weak topics, practise unfamiliar questions and improve the reasoning needed under exam conditions.",
  },

  {
    number: "03",
    title: "University support",
    kicker: "Navigate demanding modules",
    copy:
      "Get help understanding course material, methods, coding workflows and technical ideas at undergraduate or postgraduate level.",
  },

  {
    number: "04",
    title: "Research support",
    kicker: "Develop independent capability",
    copy:
      "Discuss statistical methods, computational approaches, research workflows and the reasoning behind analytical decisions.",
  },

  {
    number: "05",
    title: "Coding support",
    kicker: "Debug your understanding",
    copy:
      "Work through programming concepts, errors, analytical workflows and the logic behind code rather than simply receiving a finished script.",
  },

  {
    number: "06",
    title: "Learning direction",
    kicker: "Know what to learn next",
    copy:
      "Identify gaps, prioritise foundations and build a sensible route through courses, topics and practical skills.",
  },
];


/* ==========================================================================
   PAGE
   ========================================================================== */

export default function TutoringPage() {
  return (
    <>
      {/* ==================================================================
          HERO
         ================================================================== */}

      <section className="page-hero tutoring-hero">
        <div className="shell tutoring-hero-grid">
          <div>
            <div className="breadcrumbs">
              Home / Expert Tutoring
            </div>

            <span className="eyebrow tutoring-hero-eyebrow">
              Human support when it matters
            </span>

            <h1>
              Learn independently.
              <br />
              Get expert help when you&apos;re stuck.
            </h1>

            <p>
              Use structured courses, pathways and interactive resources
              for independent learning. When something still does not
              click, work one-to-one with an expert who can focus on the
              exact point where your understanding breaks down.
            </p>

            <div className="hero-actions">
              <Link
                href="/contact"
                className="button"
              >
                Request tutoring

                <Icon
                  name="arrow"
                  size={16}
                />
              </Link>

              <Link
                href="#subjects"
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

                One-to-one support
              </span>

              <span>
                <Icon
                  name="check"
                  size={14}
                />

                School to postgraduate
              </span>

              <span>
                <Icon
                  name="check"
                  size={14}
                />

                Quantitative + computational
              </span>

              <span>
                <Icon
                  name="check"
                  size={14}
                />

                Academic integrity first
              </span>
            </div>
          </div>


          {/* --------------------------------------------------------------
              Premium consultation card
             -------------------------------------------------------------- */}

          <aside className="tutoring-consult-card">
            <div className="tutoring-consult-top">
              <span className="eyebrow light">
                Expert support
              </span>

              <span className="tutoring-availability">
                1-to-1
              </span>
            </div>

            <h2>
              Start with the problem,
              not a package.
            </h2>

            <p>
              Tell us what you are studying, where you are stuck and
              what you want to achieve. We can then determine the kind
              of support that makes sense.
            </p>

            <div className="tutoring-consult-list">
              <div>
                <span>
                  01
                </span>

                <p>
                  Your subject and academic level
                </p>
              </div>

              <div>
                <span>
                  02
                </span>

                <p>
                  The topic or skill causing difficulty
                </p>
              </div>

              <div>
                <span>
                  03
                </span>

                <p>
                  Your goal and preferred type of support
                </p>
              </div>
            </div>

            <Link
              href="/contact"
              className="button button-white"
            >
              Tell us what you need

              <Icon
                name="arrow"
                size={15}
              />
            </Link>

            <small className="tutoring-consult-note">
              We focus on teaching, explanation and guidance—not
              completing assessed work on a learner&apos;s behalf.
            </small>
          </aside>
        </div>
      </section>


      {/* ==================================================================
          POSITIONING
         ================================================================== */}

      <section className="section soft">
        <div className="shell">
          <SectionHeading
            eyebrow="The role of tutoring"
            title="Tutoring should solve a learning bottleneck."
            description="The strongest model is not endless tutoring. It is independent learning supported by targeted expert help at the moments where explanation, feedback or direction can make the biggest difference."
          />

          <div className="tutoring-model">
            <div className="tutoring-model-item">
              <span>
                01
              </span>

              <h3>
                Learn independently
              </h3>

              <p>
                Use courses, lessons, notes, labs and practice to make
                progress on your own.
              </p>
            </div>

            <div className="tutoring-model-arrow">
              →
            </div>

            <div className="tutoring-model-item featured">
              <span>
                02
              </span>

              <h3>
                Identify the bottleneck
              </h3>

              <p>
                Notice the exact concept, method, code or reasoning step
                that is stopping further progress.
              </p>
            </div>

            <div className="tutoring-model-arrow">
              →
            </div>

            <div className="tutoring-model-item">
              <span>
                03
              </span>

              <h3>
                Work with an expert
              </h3>

              <p>
                Focus the session on understanding that bottleneck rather
                than repeating material you already know.
              </p>
            </div>

            <div className="tutoring-model-arrow">
              →
            </div>

            <div className="tutoring-model-item">
              <span>
                04
              </span>

              <h3>
                Continue independently
              </h3>

              <p>
                Apply the explanation yourself and return to structured
                learning with stronger understanding.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* ==================================================================
          SUBJECTS
         ================================================================== */}

      <section
        className="section"
        id="subjects"
      >
        <div className="shell">
          <SectionHeading
            eyebrow="Subject expertise"
            title="Specialist support across five connected disciplines."
            description="Tutoring is focused on quantitative and computational subjects rather than trying to cover every academic discipline."
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

                <div className="tutoring-topic-preview">
                  {subject.topics
                    .slice(0, 4)
                    .map((topic) => (
                      <span key={topic}>
                        {topic}
                      </span>
                    ))}
                </div>

                <div className="card-arrow">
                  <span>
                    Explore {subject.name}
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
          SUPPORT TYPES
         ================================================================== */}

      <section className="section dark">
        <div className="shell">
          <SectionHeading
            eyebrow="What we can support"
            title="Different problems need different kinds of help."
            description="One-to-one support can be used for conceptual understanding, academic progression, technical skills or research-oriented learning."
          />

          <div className="tutoring-support-grid">
            {supportTypes.map((item) => (
              <div
                key={item.title}
                className="tutoring-support-card"
              >
                <span className="tutoring-support-number">
                  {item.number}
                </span>

                <div>
                  <span className="eyebrow light">
                    {item.kicker}
                  </span>

                  <h3>
                    {item.title}
                  </h3>

                  <p>
                    {item.copy}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ==================================================================
          ACADEMIC STAGES
         ================================================================== */}

      <section className="section soft">
        <div className="shell">
          <SectionHeading
            eyebrow="Support at your stage"
            title="The right tutoring style changes with the learner."
            description="A school learner, an undergraduate and a postgraduate researcher should not be taught in exactly the same way."
          />

          <div className="level-grid">
            <div className="level-card">
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
                Build confidence, fill conceptual gaps and develop the
                reasoning needed for school-level assessments.
              </p>

              <div className="level-card-footer">
                <Link href="/learning?level=high-school">
                  Explore High School
                </Link>

                <Icon
                  name="arrow"
                  size={15}
                />
              </div>
            </div>


            <div className="level-card">
              <span className="num">
                02
              </span>

              <h3>
                Undergraduate
              </h3>

              <small>
                Modules + assignments + exams
              </small>

              <p>
                Go deeper than lecture notes and strengthen the theory,
                reasoning and technical skills required at university.
              </p>

              <div className="level-card-footer">
                <Link href="/learning?level=undergraduate">
                  Explore Undergraduate
                </Link>

                <Icon
                  name="arrow"
                  size={15}
                />
              </div>
            </div>


            <div className="level-card">
              <span className="num">
                03
              </span>

              <h3>
                Postgraduate
              </h3>

              <small>
                Advanced methods + research
              </small>

              <p>
                Discuss advanced methods, analytical workflows and the
                reasoning required for independent postgraduate study.
              </p>

              <div className="level-card-footer">
                <Link href="/learning?level=postgraduate">
                  Explore Postgraduate
                </Link>

                <Icon
                  name="arrow"
                  size={15}
                />
              </div>
            </div>


            <div className="level-card">
              <span className="num">
                04
              </span>

              <h3>
                Learn for Yourself
              </h3>

              <small>
                Skills + projects + career
              </small>

              <p>
                Get targeted guidance while learning programming, data
                analysis, mathematics or computational skills independently.
              </p>

              <div className="level-card-footer">
                <Link href="/learning?level=casual">
                  Explore independent learning
                </Link>

                <Icon
                  name="arrow"
                  size={15}
                />
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ==================================================================
          HOW IT WORKS
         ================================================================== */}

      <section className="section">
        <div className="shell">
          <SectionHeading
            eyebrow="How it works"
            title="From request to focused learning."
            description="The process starts by understanding what you need rather than immediately placing you into a generic lesson."
          />

          <div className="tutoring-process">
            <div className="tutoring-process-row">
              <span className="tutoring-process-number">
                01
              </span>

              <div>
                <span className="eyebrow">
                  Tell us what you need
                </span>

                <h3>
                  Describe your subject, level and challenge.
                </h3>

                <p>
                  Share enough context for us to understand what you are
                  learning, where you are stuck and what outcome you want.
                </p>
              </div>
            </div>


            <div className="tutoring-process-row">
              <span className="tutoring-process-number">
                02
              </span>

              <div>
                <span className="eyebrow">
                  Define the focus
                </span>

                <h3>
                  Turn a broad problem into a specific objective.
                </h3>

                <p>
                  A focused session is more useful than trying to cover an
                  entire subject at once.
                </p>
              </div>
            </div>


            <div className="tutoring-process-row">
              <span className="tutoring-process-number">
                03
              </span>

              <div>
                <span className="eyebrow">
                  Work through the problem
                </span>

                <h3>
                  Build the reasoning—not just the answer.
                </h3>

                <p>
                  The session should help you understand how to approach
                  similar problems independently in future.
                </p>
              </div>
            </div>


            <div className="tutoring-process-row">
              <span className="tutoring-process-number">
                04
              </span>

              <div>
                <span className="eyebrow">
                  Continue independently
                </span>

                <h3>
                  Leave knowing what to practise next.
                </h3>

                <p>
                  Use the session to unlock further progress through your
                  course, pathway, module or project.
                </p>
              </div>
            </div>
          </div>

          <div className="tutoring-process-action">
            <Link
              href="/contact"
              className="button"
            >
              Request support

              <Icon
                name="arrow"
                size={16}
              />
            </Link>
          </div>
        </div>
      </section>


      {/* ==================================================================
          ACADEMIC INTEGRITY
         ================================================================== */}

      <section className="section tutoring-integrity-section">
        <div className="shell">
          <div className="tutoring-integrity-card">
            <div className="tutoring-integrity-symbol">
              ✓
            </div>

            <div className="tutoring-integrity-copy">
              <span className="eyebrow light">
                Academic integrity
              </span>

              <h2>
                We help you do the work.
                <br />
                We do not do assessed work for you.
              </h2>

              <p>
                Tutoring can explain concepts, discuss methods, review your
                reasoning, help you debug code and teach you how to approach
                a problem. It should not replace your own authorship or
                academic responsibility.
              </p>

              <Link
                href="/academic-integrity"
                className="button button-white"
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
          INDEPENDENT LEARNING
         ================================================================== */}

      <section className="section soft">
        <div className="shell">
          <SectionHeading
            eyebrow="Between tutoring sessions"
            title="The platform should keep helping you."
            description="Expert support is strongest when it connects to a wider system of courses, pathways, practice and interactive learning."
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
                  Structured courses
                </strong>

                <p className="tutoring-feature-copy">
                  Build knowledge progressively before and after a tutoring
                  session.
                </p>
              </div>
            </Link>


            <Link
              href="/labs"
              className="feature-item"
            >
              <span className="mini-symbol">
                02
              </span>

              <div>
                <strong>
                  Interactive Labs
                </strong>

                <p className="tutoring-feature-copy">
                  Explore difficult concepts visually and test your
                  intuition.
                </p>
              </div>
            </Link>


            <Link
              href="/pathways"
              className="feature-item"
            >
              <span className="mini-symbol">
                03
              </span>

              <div>
                <strong>
                  Learning pathways
                </strong>

                <p className="tutoring-feature-copy">
                  Know where the current topic fits into a larger academic
                  or career journey.
                </p>
              </div>
            </Link>


            <Link
              href="/resources"
              className="feature-item"
            >
              <span className="mini-symbol">
                04
              </span>

              <div>
                <strong>
                  Learning resources
                </strong>

                <p className="tutoring-feature-copy">
                  Reinforce learning with guides, explanations and practical
                  reference material.
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>


      {/* ==================================================================
          FINAL CTA
         ================================================================== */}

      <section className="section">
        <div className="shell">
          <div className="tutoring-final">
            <span className="eyebrow">
              Need expert support?
            </span>

            <h2>
              Tell us where you&apos;re stuck.
            </h2>

            <p>
              Share your subject, academic level, topic and goal. We&apos;ll
              use that information to understand what kind of support would
              be most useful.
            </p>

            <div className="hero-actions">
              <Link
                href="/contact"
                className="button"
              >
                Request tutoring

                <Icon
                  name="arrow"
                  size={16}
                />
              </Link>

              <Link
                href="/learning"
                className="button button-outline"
              >
                Try independent learning first
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}