import type { Metadata } from "next";
import Link from "next/link";

import ContactForm from "./ContactForm";

import Icon from "@/components/Icon";
import SectionHeading from "@/components/SectionHeading";


/* ==========================================================================
   METADATA
   ========================================================================== */

export const metadata: Metadata = {
  title: "Contact",

  description:
    "Contact My Academic Tutor about tutoring, courses, learning pathways, research support, partnerships or general enquiries.",

  openGraph: {
    title: "Contact | My Academic Tutor",

    description:
      "Tell us what you are learning, where you need support and what you want to achieve.",
  },
};


/* ==========================================================================
   ENQUIRY TYPES
   ========================================================================== */

const enquiryTypes = [
  {
    number: "01",
    title: "Tutoring",
    copy:
      "Get one-to-one support with difficult concepts, examinations, university modules, programming or quantitative learning.",
  },

  {
    number: "02",
    title: "Course enquiry",
    copy:
      "Ask about a course, upcoming learning material, course suitability or where you should begin.",
  },

  {
    number: "03",
    title: "Research learning",
    copy:
      "Ask about statistical, computational or bioinformatics learning related to postgraduate study, dissertations and research methods.",
  },

  {
    number: "04",
    title: "Learning direction",
    copy:
      "Tell us your current background and goal if you are unsure which subject, course or pathway is right for you.",
  },

  {
    number: "05",
    title: "Partnerships",
    copy:
      "Discuss educational collaborations, institutional learning resources, content partnerships or other relevant opportunities.",
  },

  {
    number: "06",
    title: "Technical or general",
    copy:
      "Report a website issue, ask a general question or send feedback about the platform.",
  },
];


/* ==========================================================================
   PAGE
   ========================================================================== */

export default function ContactPage() {
  return (
    <>
      {/* ==================================================================
          HERO
         ================================================================== */}

      <section className="page-hero contact-hero">
        <div className="shell contact-hero-grid">
          <div>
            <div className="breadcrumbs">
              Home / Contact
            </div>

            <span className="eyebrow contact-hero-eyebrow">
              Contact My Academic Tutor
            </span>

            <h1>
              Tell us what
              <br />
              you&apos;re trying to achieve.
            </h1>

            <p>
              Whether you need tutoring, course guidance, research-oriented
              learning support or simply help deciding where to begin,
              give us enough context to understand the problem properly.
            </p>

            <div className="hero-actions">
              <Link
                href="#contact-form"
                className="button"
              >
                Send an enquiry

                <Icon
                  name="arrow"
                  size={16}
                />
              </Link>

              <Link
                href="/learning"
                className="button button-outline"
              >
                Try the Path Finder first
              </Link>
            </div>

            <div className="hero-proof">
              <span>
                <Icon
                  name="check"
                  size={14}
                />

                Tutoring enquiries
              </span>

              <span>
                <Icon
                  name="check"
                  size={14}
                />

                Course guidance
              </span>

              <span>
                <Icon
                  name="check"
                  size={14}
                />

                Research learning
              </span>

              <span>
                <Icon
                  name="check"
                  size={14}
                />

                General support
              </span>
            </div>
          </div>


          {/* --------------------------------------------------------------
              Hero enquiry panel
             -------------------------------------------------------------- */}

          <aside className="contact-intro-card">
            <div className="contact-intro-top">
              <span className="eyebrow light">
                Before you send
              </span>

              <span className="contact-intro-pill">
                Helpful context
              </span>
            </div>

            <h2>
              The better the context,
              the better the response.
            </h2>

            <div className="contact-intro-list">
              <div>
                <span>
                  01
                </span>

                <div>
                  <strong>
                    What are you studying?
                  </strong>

                  <p>
                    Include the subject and your current academic or
                    experience level.
                  </p>
                </div>
              </div>

              <div>
                <span>
                  02
                </span>

                <div>
                  <strong>
                    What do you need help with?
                  </strong>

                  <p>
                    Describe the concept, skill, course or learning
                    challenge as specifically as possible.
                  </p>
                </div>
              </div>

              <div>
                <span>
                  03
                </span>

                <div>
                  <strong>
                    What outcome do you want?
                  </strong>

                  <p>
                    Tell us whether your goal is understanding, exam
                    preparation, technical skills, research or something
                    else.
                  </p>
                </div>
              </div>
            </div>

            <Link
              href="#contact-form"
              className="button button-white"
            >
              Start enquiry

              <Icon
                name="arrow"
                size={15}
              />
            </Link>
          </aside>
        </div>
      </section>


      {/* ==================================================================
          ENQUIRY TYPES
         ================================================================== */}

      <section className="section soft">
        <div className="shell">
          <SectionHeading
            eyebrow="How can we help?"
            title="Choose the closest type of enquiry."
            description="You do not need to fit perfectly into one category. These simply help clarify the kinds of conversations the platform is designed to support."
          />

          <div className="contact-enquiry-grid">
            {enquiryTypes.map((item) => (
              <div
                key={item.title}
                className="contact-enquiry-card"
              >
                <span className="contact-enquiry-number">
                  {item.number}
                </span>

                <h3>
                  {item.title}
                </h3>

                <p>
                  {item.copy}
                </p>

                <Link
                  href="#contact-form"
                  className="contact-enquiry-link"
                >
                  Start enquiry

                  <Icon
                    name="arrow"
                    size={14}
                  />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ==================================================================
          CONTACT FORM
         ================================================================== */}

      <section
        className="section"
        id="contact-form"
      >
        <div className="shell">
          <div className="contact-form-layout">
            {/* ----------------------------------------------------------
                Supporting copy
               ---------------------------------------------------------- */}

            <div className="contact-form-copy">
              <span className="eyebrow">
                Send your enquiry
              </span>

              <h2>
                Give us the useful details.
              </h2>

              <p>
                The form is designed to collect enough information to
                understand your request before any follow-up conversation.
              </p>

              <div className="contact-form-guidance">
                <div>
                  <span>
                    01
                  </span>

                  <div>
                    <strong>
                      Be specific
                    </strong>

                    <p>
                      Mention the exact topic, method, module, programming
                      language or learning problem where possible.
                    </p>
                  </div>
                </div>

                <div>
                  <span>
                    02
                  </span>

                  <div>
                    <strong>
                      Include your level
                    </strong>

                    <p>
                      School, undergraduate, postgraduate and independent
                      learners often require very different support.
                    </p>
                  </div>
                </div>

                <div>
                  <span>
                    03
                  </span>

                  <div>
                    <strong>
                      Tell us your goal
                    </strong>

                    <p>
                      Understanding a concept, preparing for an exam and
                      learning a research method are different objectives.
                    </p>
                  </div>
                </div>
              </div>


              <div className="contact-integrity-note">
                <span className="contact-integrity-icon">
                  ✓
                </span>

                <div>
                  <strong>
                    Academic integrity matters
                  </strong>

                  <p>
                    We support explanation, learning, feedback and skill
                    development. We do not complete assessed work on a
                    learner&apos;s behalf.
                  </p>

                  <Link href="/academic-integrity">
                    Read the policy →
                  </Link>
                </div>
              </div>
            </div>


            {/* ----------------------------------------------------------
                Existing client form component
               ---------------------------------------------------------- */}

            <div className="contact-form-component">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>


      {/* ==================================================================
          WHAT HAPPENS NEXT
         ================================================================== */}

      <section className="section dark">
        <div className="shell">
          <SectionHeading
            eyebrow="After you contact us"
            title="From a broad enquiry to a useful next step."
            description="The aim of the first response is to understand the request and identify the most appropriate direction—not to push every enquiry into the same service."
          />

          <div className="contact-process">
            <div className="contact-process-card">
              <span>
                01
              </span>

              <h3>
                Review
              </h3>

              <small>
                Understand your request
              </small>

              <p>
                We review the subject, level, challenge and goal you
                provide.
              </p>
            </div>

            <div className="contact-process-arrow">
              →
            </div>

            <div className="contact-process-card">
              <span>
                02
              </span>

              <h3>
                Clarify
              </h3>

              <small>
                Fill important gaps
              </small>

              <p>
                If necessary, we may need more context before suggesting
                the most useful option.
              </p>
            </div>

            <div className="contact-process-arrow">
              →
            </div>

            <div className="contact-process-card">
              <span>
                03
              </span>

              <h3>
                Recommend
              </h3>

              <small>
                Choose the right route
              </small>

              <p>
                The next step may be a course, pathway, resource,
                tutoring or another form of support.
              </p>
            </div>

            <div className="contact-process-arrow">
              →
            </div>

            <div className="contact-process-card">
              <span>
                04
              </span>

              <h3>
                Continue
              </h3>

              <small>
                Keep learning
              </small>

              <p>
                The goal is to move you towards independent progress,
                not unnecessary ongoing support.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* ==================================================================
          SELF-SERVICE OPTIONS
         ================================================================== */}

      <section className="section soft">
        <div className="shell">
          <SectionHeading
            eyebrow="You may not need to wait"
            title="Some questions already have a next step."
            description="If your enquiry is mainly about finding learning material, these areas of the platform may help immediately."
          />

          <div className="feature-list">
            <Link
              href="/learning"
              className="feature-item"
            >
              <span className="mini-symbol">
                01
              </span>

              <div>
                <strong>
                  I don&apos;t know where to start
                </strong>

                <p className="contact-feature-copy">
                  Use the Learning Path Finder.
                </p>
              </div>
            </Link>


            <Link
              href="/courses"
              className="feature-item"
            >
              <span className="mini-symbol">
                02
              </span>

              <div>
                <strong>
                  I want to learn a specific topic
                </strong>

                <p className="contact-feature-copy">
                  Browse the complete course catalogue.
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
                  I have a larger career or research goal
                </strong>

                <p className="contact-feature-copy">
                  Explore structured learning pathways.
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
                  I need one-to-one help
                </strong>

                <p className="contact-feature-copy">
                  Learn how expert tutoring works.
                </p>
              </div>
            </Link>


            <Link
              href="/labs"
              className="feature-item"
            >
              <span className="mini-symbol">
                05
              </span>

              <div>
                <strong>
                  I need better intuition
                </strong>

                <p className="contact-feature-copy">
                  Explore concepts through Interactive Labs.
                </p>
              </div>
            </Link>


            <Link
              href="/resources"
              className="feature-item"
            >
              <span className="mini-symbol">
                06
              </span>

              <div>
                <strong>
                  I need a quick explanation or reference
                </strong>

                <p className="contact-feature-copy">
                  Browse the learning resources hub.
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>


      {/* ==================================================================
          FINAL STATEMENT
         ================================================================== */}

      <section className="section">
        <div className="shell">
          <div className="contact-final">
            <span className="eyebrow">
              Start with context
            </span>

            <h2>
              You don&apos;t need to know
              exactly what service you need.
            </h2>

            <p>
              Tell us what you are learning, where you are struggling
              and what you want to achieve. That is enough to start the
              conversation.
            </p>

            <Link
              href="#contact-form"
              className="button"
            >
              Send an enquiry

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