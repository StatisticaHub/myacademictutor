import type { Metadata } from "next";
import Link from "next/link";

import Icon from "@/components/Icon";
import SectionHeading from "@/components/SectionHeading";


/* ==========================================================================
   METADATA
   ========================================================================== */

export const metadata: Metadata = {
  title: "Pricing",

  description:
    "Explore the planned access options for courses, learning pathways, Interactive Labs and expert tutoring at My Academic Tutor.",

  openGraph: {
    title: "Pricing | My Academic Tutor",

    description:
      "Flexible access for independent learning, structured courses and expert quantitative and computational tutoring.",
  },
};


/* ==========================================================================
   ACCESS MODELS
   ========================================================================== */

const accessModels = [
  {
    number: "01",
    eyebrow: "Independent learning",
    title: "Learning Access",

    description:
      "For learners who want structured courses, pathways, resources and interactive learning across quantitative and computational subjects.",

    features: [
      "Structured course access",
      "Learning pathways",
      "Interactive learning tools",
      "Practice and supporting resources",
      "Progressive subject routes",
      "Learn at your own pace",
    ],

    status: "Pricing to be announced",
    action: "Register interest",
    href: "/contact",
  },

  {
    number: "02",
    eyebrow: "Focused human support",
    title: "Expert Tutoring",

    description:
      "For learners who need targeted one-to-one support alongside independent study, university work, examinations or technical learning.",

    features: [
      "One-to-one expert support",
      "Subject-specific guidance",
      "Concept clarification",
      "Exam and university support",
      "Coding and analytical guidance",
      "Research-oriented learning support",
    ],

    status: "Quoted by support need",
    action: "Request tutoring",
    href: "/contact",
  },

  {
    number: "03",
    eyebrow: "Organisations & collaboration",
    title: "Institutional Access",

    description:
      "For educational organisations, academic groups or partners interested in structured access, resources or collaboration.",

    features: [
      "Custom learning requirements",
      "Group or institutional access",
      "Subject-specific learning collections",
      "Academic resource collaboration",
      "Potential bespoke pathways",
      "Partnership discussions",
    ],

    status: "Contact for discussion",
    action: "Discuss a partnership",
    href: "/contact",
  },
];


/* ==========================================================================
   PAGE
   ========================================================================== */

export default function PricingPage() {
  return (
    <>
      {/* ==================================================================
          HERO
         ================================================================== */}

      <section className="page-hero pricing-hero">
        <div className="shell pricing-hero-grid">
          <div>
            <div className="breadcrumbs">
              Home / Pricing
            </div>

            <span className="eyebrow pricing-hero-eyebrow">
              Flexible access
            </span>

            <h1>
              Pay for the depth
              <br />
              and support you need.
            </h1>

            <p>
              My Academic Tutor is being designed around different ways
              of learning: independent course access, structured
              pathways and targeted one-to-one expert support.
            </p>

            <div className="hero-actions">
              <Link
                href="#access-options"
                className="button"
              >
                Explore access options

                <Icon
                  name="arrow"
                  size={16}
                />
              </Link>

              <Link
                href="/contact"
                className="button button-outline"
              >
                Register interest
              </Link>
            </div>

            <div className="hero-proof">
              <span>
                <Icon
                  name="check"
                  size={14}
                />

                No invented pricing
              </span>

              <span>
                <Icon
                  name="check"
                  size={14}
                />

                Flexible learning
              </span>

              <span>
                <Icon
                  name="check"
                  size={14}
                />

                Optional expert support
              </span>
            </div>
          </div>


          {/* --------------------------------------------------------------
              Pricing philosophy card
             -------------------------------------------------------------- */}

          <aside className="pricing-philosophy-card">
            <div className="pricing-philosophy-top">
              <span className="eyebrow light">
                Pricing philosophy
              </span>

              <span className="pricing-status-pill">
                In development
              </span>
            </div>

            <h2>
              Clear pricing before paid access launches.
            </h2>

            <p>
              We will publish actual prices only when the corresponding
              product, access terms and learner experience are ready.
            </p>

            <div className="pricing-philosophy-list">
              <div>
                <span>
                  01
                </span>

                <strong>
                  No artificial discounts
                </strong>
              </div>

              <div>
                <span>
                  02
                </span>

                <strong>
                  No fake crossed-out prices
                </strong>
              </div>

              <div>
                <span>
                  03
                </span>

                <strong>
                  No unclear recurring charges
                </strong>
              </div>

              <div>
                <span>
                  04
                </span>

                <strong>
                  No hidden tutoring fees
                </strong>
              </div>
            </div>
          </aside>
        </div>
      </section>


      {/* ==================================================================
          PRINCIPLE
         ================================================================== */}

      <section className="section soft">
        <div className="shell">
          <SectionHeading
            eyebrow="One platform, different needs"
            title="Not every learner should pay for the same thing."
            description="Someone following a self-paced statistics course has a different need from a postgraduate learner requesting specialist one-to-one methodological support. The pricing structure should reflect that."
          />

          <div className="level-grid">
            <div className="level-card">
              <span className="num">
                01
              </span>

              <h3>
                Learn independently
              </h3>

              <small>
                Courses + resources
              </small>

              <p>
                Use structured learning when you are comfortable making
                progress without ongoing individual support.
              </p>
            </div>


            <div className="level-card">
              <span className="num">
                02
              </span>

              <h3>
                Follow a pathway
              </h3>

              <small>
                Longer-term direction
              </small>

              <p>
                Combine multiple courses and skills into a coherent
                academic, technical or career journey.
              </p>
            </div>


            <div className="level-card">
              <span className="num">
                03
              </span>

              <h3>
                Add expert support
              </h3>

              <small>
                Only when useful
              </small>

              <p>
                Bring in one-to-one tutoring for difficult concepts,
                feedback, technical problems or learning bottlenecks.
              </p>
            </div>


            <div className="level-card">
              <span className="num">
                04
              </span>

              <h3>
                Scale when needed
              </h3>

              <small>
                Groups + organisations
              </small>

              <p>
                Institutional or collaborative requirements can be
                discussed separately from individual learner access.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* ==================================================================
          ACCESS OPTIONS
         ================================================================== */}

      <section
        className="section"
        id="access-options"
      >
        <div className="shell">
          <SectionHeading
            eyebrow="Access options"
            title="Choose the kind of support you need."
            description="These are the intended product categories. Final prices will be published once each paid offering is ready for launch."
          />

          <div className="pricing-grid">
            {accessModels.map(
              (model, index) => (
                <article
                  key={model.title}
                  className={`pricing-card ${
                    index === 0
                      ? "featured"
                      : ""
                  }`}
                >
                  <div className="pricing-card-top">
                    <span className="pricing-number">
                      {model.number}
                    </span>

                    {index === 0 && (
                      <span className="pricing-featured-pill">
                        Core platform
                      </span>
                    )}
                  </div>

                  <span className="eyebrow">
                    {model.eyebrow}
                  </span>

                  <h2>
                    {model.title}
                  </h2>

                  <p className="pricing-description">
                    {model.description}
                  </p>

                  <div className="pricing-status">
                    <small>
                      Current status
                    </small>

                    <strong>
                      {model.status}
                    </strong>
                  </div>

                  <div className="pricing-feature-list">
                    {model.features.map(
                      (feature) => (
                        <div key={feature}>
                          <span>
                            <Icon
                              name="check"
                              size={13}
                            />
                          </span>

                          <p>
                            {feature}
                          </p>
                        </div>
                      )
                    )}
                  </div>

                  <Link
                    href={model.href}
                    className={
                      index === 0
                        ? "button"
                        : "button button-outline"
                    }
                  >
                    {model.action}

                    <Icon
                      name="arrow"
                      size={15}
                    />
                  </Link>
                </article>
              )
            )}
          </div>
        </div>
      </section>


      {/* ==================================================================
          WHAT PRICING MAY COVER
         ================================================================== */}

      <section className="section dark">
        <div className="shell">
          <SectionHeading
            eyebrow="What paid access should provide"
            title="The value should come from the learning experience."
            description="A price only makes sense when the product provides enough structure, depth and usefulness to justify it."
          />

          <div className="pricing-value-grid">
            <div className="pricing-value-card">
              <span>
                01
              </span>

              <h3>
                Structured depth
              </h3>

              <p>
                Courses should provide coherent progression rather than
                a loose collection of videos.
              </p>
            </div>


            <div className="pricing-value-card">
              <span>
                02
              </span>

              <h3>
                Strong explanations
              </h3>

              <p>
                Content should help learners understand why a method
                works, not only show which steps to follow.
              </p>
            </div>


            <div className="pricing-value-card">
              <span>
                03
              </span>

              <h3>
                Practical application
              </h3>

              <p>
                Learning should connect to exercises, coding,
                analytical work and realistic problems.
              </p>
            </div>


            <div className="pricing-value-card">
              <span>
                04
              </span>

              <h3>
                Interactive learning
              </h3>

              <p>
                Visual and interactive tools should make difficult
                ideas easier to explore.
              </p>
            </div>


            <div className="pricing-value-card">
              <span>
                05
              </span>

              <h3>
                Clear progression
              </h3>

              <p>
                Learners should know what comes next instead of being
                left inside an endless content library.
              </p>
            </div>


            <div className="pricing-value-card">
              <span>
                06
              </span>

              <h3>
                Appropriate support
              </h3>

              <p>
                When human help is purchased, it should focus on the
                learner&apos;s actual bottleneck.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* ==================================================================
          TUTORING MODEL
         ================================================================== */}

      <section className="section soft">
        <div className="shell">
          <div className="pricing-tutoring-grid">
            <div>
              <span className="eyebrow">
                Expert tutoring
              </span>

              <h2>
                Tutoring should remain separate from basic learning access.
              </h2>

              <p>
                One-to-one expert time is fundamentally different from
                self-paced digital learning. Keeping the two separate
                makes it easier for learners to pay for human support
                only when they actually need it.
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
                  Request support
                </Link>
              </div>
            </div>


            <div className="pricing-tutoring-list">
              <div>
                <span>
                  01
                </span>

                <div>
                  <strong>
                    Subject complexity
                  </strong>

                  <p>
                    Specialist postgraduate or research support may
                    require different expertise from foundational
                    tutoring.
                  </p>
                </div>
              </div>

              <div>
                <span>
                  02
                </span>

                <div>
                  <strong>
                    Session objective
                  </strong>

                  <p>
                    Concept explanation, exam preparation, debugging and
                    advanced methodological discussion are different
                    kinds of work.
                  </p>
                </div>
              </div>

              <div>
                <span>
                  03
                </span>

                <div>
                  <strong>
                    Level of preparation
                  </strong>

                  <p>
                    Some requests may require advance review or specialist
                    preparation before a useful session can take place.
                  </p>
                </div>
              </div>

              <div>
                <span>
                  04
                </span>

                <div>
                  <strong>
                    Transparent agreement
                  </strong>

                  <p>
                    The scope and price should be clear before a paid
                    tutoring arrangement begins.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ==================================================================
          NO FAKE DISCOUNTS
         ================================================================== */}

      <section className="section pricing-trust-section">
        <div className="shell">
          <div className="pricing-trust-grid">
            <div>
              <span className="eyebrow light">
                Pricing standards
              </span>

              <h2>
                Premium does not need pricing tricks.
              </h2>

              <p>
                When pricing launches, the goal should be straightforward
                value rather than artificial urgency.
              </p>
            </div>

            <div className="pricing-trust-list">
              <div>
                <Icon
                  name="check"
                  size={15}
                />

                <span>
                  Clear price before purchase
                </span>
              </div>

              <div>
                <Icon
                  name="check"
                  size={15}
                />

                <span>
                  Clear description of what is included
                </span>
              </div>

              <div>
                <Icon
                  name="check"
                  size={15}
                />

                <span>
                  Clear recurring-payment terms where applicable
                </span>
              </div>

              <div>
                <Icon
                  name="check"
                  size={15}
                />

                <span>
                  No permanently fake sale price
                </span>
              </div>

              <div>
                <Icon
                  name="check"
                  size={15}
                />

                <span>
                  No misleading countdown timers
                </span>
              </div>

              <div>
                <Icon
                  name="check"
                  size={15}
                />

                <span>
                  No hidden tutoring or booking charges
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ==================================================================
          FAQ
         ================================================================== */}

      <section className="section soft">
        <div className="shell">
          <SectionHeading
            eyebrow="Pricing questions"
            title="What can we say right now?"
            description="The commercial model is still being finalised, so the useful answer is transparency rather than invented certainty."
          />

          <div className="pricing-faq">
            <div className="pricing-faq-item">
              <span>
                01
              </span>

              <div>
                <h3>
                  How much will courses cost?
                </h3>

                <p>
                  Final course and learning-access prices have not yet
                  been published. They will appear here before paid
                  enrolment begins.
                </p>
              </div>
            </div>


            <div className="pricing-faq-item">
              <span>
                02
              </span>

              <div>
                <h3>
                  Will tutoring be included?
                </h3>

                <p>
                  Tutoring is intended to remain a separate expert
                  service so learners who only want independent study
                  are not required to pay for one-to-one support.
                </p>
              </div>
            </div>


            <div className="pricing-faq-item">
              <span>
                03
              </span>

              <div>
                <h3>
                  Will there be subscriptions?
                </h3>

                <p>
                  The final access model has not yet been announced.
                  Any recurring plan will clearly state its billing
                  period, inclusions and cancellation terms before
                  purchase.
                </p>
              </div>
            </div>


            <div className="pricing-faq-item">
              <span>
                04
              </span>

              <div>
                <h3>
                  Can I register interest now?
                </h3>

                <p>
                  Yes. You can contact us and tell us which subject,
                  course, pathway or type of tutoring you are interested
                  in.
                </p>

                <Link href="/contact">
                  Register interest →
                </Link>
              </div>
            </div>


            <div className="pricing-faq-item">
              <span>
                05
              </span>

              <div>
                <h3>
                  Are institutional arrangements available?
                </h3>

                <p>
                  Organisations interested in learning access,
                  educational collaboration or other partnership
                  arrangements can contact us to discuss requirements.
                </p>
              </div>
            </div>


            <div className="pricing-faq-item">
              <span>
                06
              </span>

              <div>
                <h3>
                  Why not publish placeholder prices?
                </h3>

                <p>
                  Because pricing should correspond to a real product,
                  with clearly defined access and terms. Placeholder
                  numbers create expectations before those decisions
                  are final.
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
          <div className="pricing-final">
            <span className="eyebrow">
              Interested in early access?
            </span>

            <h2>
              Tell us what you want to learn.
            </h2>

            <p>
              Register your interest in a subject, course, pathway or
              tutoring service while the full learning platform and
              commercial access model are being developed.
            </p>

            <div className="hero-actions">
              <Link
                href="/contact"
                className="button"
              >
                Register interest

                <Icon
                  name="arrow"
                  size={16}
                />
              </Link>

              <Link
                href="/courses"
                className="button button-outline"
              >
                Explore courses
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}