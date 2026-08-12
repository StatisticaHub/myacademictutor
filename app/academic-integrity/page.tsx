import type { Metadata } from "next";
import Link from "next/link";

import Icon from "@/components/Icon";
import SectionHeading from "@/components/SectionHeading";


/* ==========================================================================
   METADATA
   ========================================================================== */

export const metadata: Metadata = {
  title: "Academic Integrity",

  description:
    "Read the My Academic Tutor academic integrity policy covering tutoring, assignments, dissertations, coding, data analysis and research-method support.",

  openGraph: {
    title:
      "Academic Integrity | My Academic Tutor",

    description:
      "We support learning, explanation, feedback and skill development without completing assessed work on behalf of learners.",
  },
};


/* ==========================================================================
   SUPPORT EXAMPLES
   ========================================================================== */

const permittedSupport = [
  {
    number: "01",

    title:
      "Explain concepts",

    copy:
      "Teach statistical, mathematical, computational and scientific concepts using examples, diagrams, discussion and guided practice.",
  },

  {
    number: "02",

    title:
      "Work through practice problems",

    copy:
      "Demonstrate methods on tutor-created, textbook-style or clearly non-assessed examples and help learners practise similar problems themselves.",
  },

  {
    number: "03",

    title:
      "Discuss methods",

    copy:
      "Explain when a statistical or computational method may be appropriate, what assumptions it makes and how its output should be interpreted.",
  },

  {
    number: "04",

    title:
      "Teach programming",

    copy:
      "Explain code, programming concepts, debugging approaches, software workflows and how to reason through technical errors.",
  },

  {
    number: "05",

    title:
      "Give formative feedback",

    copy:
      "Comment on reasoning, clarity, interpretation or approach so the learner can make their own improvements.",
  },

  {
    number: "06",

    title:
      "Support research learning",

    copy:
      "Teach research methods, analytical principles, reproducible workflows and technical skills required for independent research.",
  },
];


const prohibitedSupport = [
  {
    number: "01",

    title:
      "Writing assessed answers",

    copy:
      "We do not produce answers, essays, reports or solutions intended to be submitted as the learner's own assessed work.",
  },

  {
    number: "02",

    title:
      "Completing assignments",

    copy:
      "We do not take an assignment brief and complete the required questions, analysis or deliverables on behalf of a learner.",
  },

  {
    number: "03",

    title:
      "Writing dissertations or theses",

    copy:
      "We do not author dissertation or thesis sections, produce original assessed analysis for submission or replace the learner's own research contribution.",
  },

  {
    number: "04",

    title:
      "Taking examinations",

    copy:
      "We do not provide answers during live examinations, online tests or other assessments where outside assistance is prohibited.",
  },

  {
    number: "05",

    title:
      "Impersonation",

    copy:
      "We do not log into academic systems, submit work, communicate with instructors or participate in assessment while pretending to be the learner.",
  },

  {
    number: "06",

    title:
      "Disguising authorship",

    copy:
      "We do not rewrite outsourced work merely to make it appear independently authored or help conceal prohibited external assistance.",
  },
];


/* ==========================================================================
   PAGE
   ========================================================================== */

export default function AcademicIntegrityPage() {
  return (
    <>
      {/* ==================================================================
          HERO
         ================================================================== */}

      <section className="page-hero integrity-hero">
        <div className="shell integrity-hero-grid">
          <div>
            <div className="breadcrumbs">
              Home / Academic Integrity
            </div>

            <span className="eyebrow integrity-hero-eyebrow">
              Learn with integrity
            </span>

            <h1>
              We help you
              <br />
              do the work.
              <br />
              We don&apos;t do it for you.
            </h1>

            <p>
              My Academic Tutor supports teaching, explanation,
              feedback and skill development. Our aim is to make
              learners more capable of completing their own academic
              and technical work.
            </p>

            <div className="hero-actions">
              <Link
                href="/tutoring"
                className="button"
              >
                Explore tutoring

                <Icon
                  name="arrow"
                  size={16}
                />
              </Link>

              <Link
                href="/contact"
                className="button button-outline"
              >
                Ask about acceptable support
              </Link>
            </div>

            <div className="hero-proof">
              <span>
                <Icon
                  name="check"
                  size={14}
                />

                Teaching
              </span>

              <span>
                <Icon
                  name="check"
                  size={14}
                />

                Explanation
              </span>

              <span>
                <Icon
                  name="check"
                  size={14}
                />

                Feedback
              </span>

              <span>
                <Icon
                  name="check"
                  size={14}
                />

                Independent learning
              </span>
            </div>
          </div>


          {/* --------------------------------------------------------------
              Principle card
             -------------------------------------------------------------- */}

          <aside className="integrity-principle-card">
            <div className="integrity-principle-top">
              <span className="eyebrow light">
                Core principle
              </span>

              <span className="integrity-principle-icon">
                ✓
              </span>
            </div>

            <blockquote>
              After receiving support, the learner should understand
              more and be better able to continue independently.
            </blockquote>

            <div className="integrity-principle-divider" />

            <p>
              If assistance would replace the learner&apos;s own
              authorship, reasoning or assessed contribution rather
              than develop it, we should not provide that assistance.
            </p>
          </aside>
        </div>
      </section>


      {/* ==================================================================
          SIMPLE DISTINCTION
         ================================================================== */}

      <section className="section soft">
        <div className="shell">
          <SectionHeading
            eyebrow="The distinction"
            title="Support the learning process. Do not replace the learner."
            description="Academic support can be extensive and still remain legitimate when the learner retains responsibility for understanding, decisions, analysis and authorship."
          />

          <div className="integrity-distinction-grid">
            <div className="integrity-distinction-card allowed">
              <span className="integrity-distinction-mark">
                ✓
              </span>

              <span className="eyebrow">
                Appropriate
              </span>

              <h3>
                “Teach me how to approach this.”
              </h3>

              <p>
                Explanation, guided examples, method discussion,
                debugging strategies and feedback that help the learner
                develop the capability to complete work independently.
              </p>
            </div>


            <div className="integrity-distinction-card prohibited">
              <span className="integrity-distinction-mark">
                ×
              </span>

              <span className="eyebrow">
                Not appropriate
              </span>

              <h3>
                “Complete this for me.”
              </h3>

              <p>
                Producing assessed answers, analysis, code, writing or
                other deliverables that the learner intends to submit
                as their own work.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* ==================================================================
          WHAT WE CAN DO
         ================================================================== */}

      <section className="section">
        <div className="shell">
          <SectionHeading
            eyebrow="What we can help with"
            title="Teaching, explanation and formative support."
            description="These forms of assistance are consistent with the platform's purpose of helping learners develop their own understanding and technical capability."
          />

          <div className="integrity-support-grid">
            {permittedSupport.map(
              (item) => (
                <article
                  key={item.title}
                  className="integrity-support-card"
                >
                  <div className="integrity-support-card-top">
                    <span>
                      {item.number}
                    </span>

                    <span className="integrity-allowed-icon">
                      <Icon
                        name="check"
                        size={13}
                      />
                    </span>
                  </div>

                  <h3>
                    {item.title}
                  </h3>

                  <p>
                    {item.copy}
                  </p>
                </article>
              )
            )}
          </div>
        </div>
      </section>


      {/* ==================================================================
          WHAT WE DO NOT DO
         ================================================================== */}

      <section className="section dark">
        <div className="shell">
          <SectionHeading
            eyebrow="What we do not provide"
            title="Assessment must remain the learner's work."
            description="We will not knowingly provide services whose purpose is to substitute external work for the learner's own assessed contribution."
          />

          <div className="integrity-prohibited-grid">
            {prohibitedSupport.map(
              (item) => (
                <article
                  key={item.title}
                  className="integrity-prohibited-card"
                >
                  <span className="integrity-prohibited-number">
                    {item.number}
                  </span>

                  <h3>
                    {item.title}
                  </h3>

                  <p>
                    {item.copy}
                  </p>
                </article>
              )
            )}
          </div>
        </div>
      </section>


      {/* ==================================================================
          ASSIGNMENTS
         ================================================================== */}

      <section className="section soft">
        <div className="shell">
          <div className="integrity-scenario-grid">
            <div>
              <span className="eyebrow">
                Assignments & coursework
              </span>

              <h2>
                We can teach the method.
                <br />
                You must produce the submission.
              </h2>

              <p>
                A learner may legitimately need help understanding a
                topic that also appears in an assignment. The boundary
                depends on whether the support develops understanding
                or substitutes for the learner&apos;s assessed work.
              </p>
            </div>

            <div className="integrity-scenario-list">
              <div className="allowed">
                <span>
                  ✓
                </span>

                <div>
                  <strong>
                    Explain the underlying concept
                  </strong>

                  <p>
                    We can teach the theory, terminology and method using
                    independent examples.
                  </p>
                </div>
              </div>

              <div className="allowed">
                <span>
                  ✓
                </span>

                <div>
                  <strong>
                    Discuss how to approach a problem
                  </strong>

                  <p>
                    We can help the learner identify the reasoning steps
                    they should work through themselves.
                  </p>
                </div>
              </div>

              <div className="allowed">
                <span>
                  ✓
                </span>

                <div>
                  <strong>
                    Give formative feedback
                  </strong>

                  <p>
                    We can identify conceptual issues or areas that need
                    further explanation.
                  </p>
                </div>
              </div>

              <div className="prohibited">
                <span>
                  ×
                </span>

                <div>
                  <strong>
                    Produce the final answer
                  </strong>

                  <p>
                    We do not complete assessed questions or create
                    submission-ready responses for the learner.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ==================================================================
          DISSERTATION / RESEARCH
         ================================================================== */}

      <section className="section">
        <div className="shell">
          <div className="integrity-scenario-grid reverse">
            <div className="integrity-scenario-list">
              <div className="allowed">
                <span>
                  ✓
                </span>

                <div>
                  <strong>
                    Explain statistical methods
                  </strong>

                  <p>
                    Learn why a method is used, its assumptions,
                    limitations and interpretation.
                  </p>
                </div>
              </div>

              <div className="allowed">
                <span>
                  ✓
                </span>

                <div>
                  <strong>
                    Teach analytical software
                  </strong>

                  <p>
                    Learn how to use R, Python or other tools through
                    teaching examples and guided practice.
                  </p>
                </div>
              </div>

              <div className="allowed">
                <span>
                  ✓
                </span>

                <div>
                  <strong>
                    Discuss analytical reasoning
                  </strong>

                  <p>
                    Explore why certain approaches may or may not be
                    suitable for a research question.
                  </p>
                </div>
              </div>

              <div className="prohibited">
                <span>
                  ×
                </span>

                <div>
                  <strong>
                    Deliver the dissertation analysis
                  </strong>

                  <p>
                    We do not independently conduct assessed research
                    analysis for a learner to submit as their own work.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <span className="eyebrow">
                Dissertations & research
              </span>

              <h2>
                Research support should develop the researcher.
              </h2>

              <p>
                Postgraduate learners often need substantial technical
                teaching. That can include statistical methods,
                programming, reproducibility and interpretation. The
                learner must still make and own the academic decisions
                required by their programme.
              </p>

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
            </div>
          </div>
        </div>
      </section>


      {/* ==================================================================
          CODING / DATA ANALYSIS
         ================================================================== */}

      <section className="section soft">
        <div className="shell">
          <SectionHeading
            eyebrow="Coding & data analysis"
            title="Debug with the learner, not instead of the learner."
            description="Programming and quantitative analysis often require hands-on support. The important question is whether the learner is developing technical understanding or merely receiving a finished assessed solution."
          />

          <div className="integrity-code-grid">
            <div className="integrity-code-card">
              <span>
                01
              </span>

              <h3>
                Explain an error
              </h3>

              <p>
                Discuss why code fails, how to interpret an error
                message and how to isolate the source of a problem.
              </p>

              <div className="integrity-code-status allowed">
                Appropriate
              </div>
            </div>


            <div className="integrity-code-card">
              <span>
                02
              </span>

              <h3>
                Demonstrate a technique
              </h3>

              <p>
                Show a programming or analytical method using a separate
                example so the learner can apply it independently.
              </p>

              <div className="integrity-code-status allowed">
                Appropriate
              </div>
            </div>


            <div className="integrity-code-card">
              <span>
                03
              </span>

              <h3>
                Review learner-written code
              </h3>

              <p>
                Explain conceptual problems, possible improvements and
                debugging strategies while keeping the learner engaged.
              </p>

              <div className="integrity-code-status allowed">
                Appropriate
              </div>
            </div>


            <div className="integrity-code-card">
              <span>
                04
              </span>

              <h3>
                Build the assessed project
              </h3>

              <p>
                Creating a complete assessed program, analysis pipeline
                or submission for the learner is outside acceptable
                support.
              </p>

              <div className="integrity-code-status prohibited">
                Not provided
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ==================================================================
          INSTITUTION RULES
         ================================================================== */}

      <section className="section integrity-rules-section">
        <div className="shell">
          <div className="integrity-rules-grid">
            <div>
              <span className="eyebrow light">
                Your institution&apos;s rules matter
              </span>

              <h2>
                Permitted assistance can vary between assessments.
              </h2>

              <p>
                Universities, schools, examination boards and individual
                modules may impose different rules about external
                tutoring, collaboration, editing, software, artificial
                intelligence and other forms of assistance.
              </p>
            </div>

            <div className="integrity-rules-list">
              <div>
                <span>
                  01
                </span>

                <div>
                  <strong>
                    Check the assessment instructions
                  </strong>

                  <p>
                    The learner is responsible for understanding the
                    rules that apply to their own work.
                  </p>
                </div>
              </div>

              <div>
                <span>
                  02
                </span>

                <div>
                  <strong>
                    Follow stricter local rules
                  </strong>

                  <p>
                    Where an institution prohibits assistance that might
                    otherwise appear reasonable, the institutional rule
                    should be followed.
                  </p>
                </div>
              </div>

              <div>
                <span>
                  03
                </span>

                <div>
                  <strong>
                    Tell us when work is assessed
                  </strong>

                  <p>
                    Learners should make the assessment context clear so
                    support can be kept within an appropriate boundary.
                  </p>
                </div>
              </div>

              <div>
                <span>
                  04
                </span>

                <div>
                  <strong>
                    Ask when uncertain
                  </strong>

                  <p>
                    If the permitted level of support is unclear, we may
                    limit assistance or ask the learner to confirm the
                    applicable rules.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ==================================================================
          RESPONSIBILITY
         ================================================================== */}

      <section className="section soft">
        <div className="shell">
          <SectionHeading
            eyebrow="Shared responsibility"
            title="Integrity requires cooperation from both sides."
            description="We design our support around legitimate learning, but learners also need to be transparent about the context in which assistance will be used."
          />

          <div className="integrity-responsibility-grid">
            <div className="integrity-responsibility-card">
              <span className="eyebrow">
                Our responsibility
              </span>

              <h3>
                Keep support educational.
              </h3>

              <div>
                <p>
                  Explain rather than impersonate.
                </p>

                <p>
                  Teach rather than outsource.
                </p>

                <p>
                  Encourage independent reasoning.
                </p>

                <p>
                  Decline inappropriate requests.
                </p>

                <p>
                  Avoid misleading claims about authorship.
                </p>
              </div>
            </div>


            <div className="integrity-responsibility-card">
              <span className="eyebrow">
                Learner responsibility
              </span>

              <h3>
                Use support appropriately.
              </h3>

              <div>
                <p>
                  Tell us when work is assessed.
                </p>

                <p>
                  Follow your institution&apos;s rules.
                </p>

                <p>
                  Produce your own final submission.
                </p>

                <p>
                  Make your own academic decisions.
                </p>

                <p>
                  Declare assistance where required.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ==================================================================
          DECLINING REQUESTS
         ================================================================== */}

      <section className="section">
        <div className="shell">
          <div className="integrity-decline">
            <span className="integrity-decline-symbol">
              !
            </span>

            <div>
              <span className="eyebrow">
                When we may decline support
              </span>

              <h2>
                Some requests need to be reframed before we can help.
              </h2>

              <p>
                If a request appears to involve prohibited assessment
                assistance, impersonation or outsourced authorship, we
                may decline it. Where possible, we can instead offer a
                learning-focused version of the support—for example,
                teaching the relevant method using a separate example.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* ==================================================================
          CONTACT
         ================================================================== */}

      <section className="section dark">
        <div className="shell">
          <div className="integrity-contact">
            <div>
              <span className="eyebrow light">
                Unsure where the boundary is?
              </span>

              <h2>
                Ask before the session.
              </h2>

              <p>
                Tell us what you are working on, whether it is assessed
                and what kind of help you want. We can determine whether
                the request fits the learning-focused support we provide.
              </p>
            </div>

            <div className="integrity-contact-actions">
              <Link
                href="/contact"
                className="button button-white"
              >
                Ask about your request

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
      </section>


      {/* ==================================================================
          FINAL
         ================================================================== */}

      <section className="section soft">
        <div className="shell">
          <div className="integrity-final">
            <span className="eyebrow">
              The standard
            </span>

            <h2>
              Better understanding.
              <br />
              Greater independence.
              <br />
              Your own work.
            </h2>

            <p>
              That is the role academic support should play throughout
              My Academic Tutor.
            </p>

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
          </div>
        </div>
      </section>
    </>
  );
}