import type { Metadata } from "next";
import Link from "next/link";

import Icon from "@/components/Icon";


/* ==========================================================================
   METADATA
   ========================================================================== */

export const metadata: Metadata = {
  title: "Terms of Use",

  description:
    "Read the terms that apply when using the My Academic Tutor website, learning content, resources and related services.",

  openGraph: {
    title:
      "Terms of Use | My Academic Tutor",

    description:
      "Terms governing use of the My Academic Tutor website and educational platform.",
  },
};


/* ==========================================================================
   PAGE
   ========================================================================== */

export default function TermsPage() {
  const updated =
    "12 August 2026";

  return (
    <>
      {/* ==================================================================
          HERO
         ================================================================== */}

      <section className="page-hero legal-hero">
        <div className="shell legal-hero-grid">
          <div>
            <div className="breadcrumbs">
              Home / Terms
            </div>

            <span className="eyebrow legal-hero-eyebrow">
              Terms of use
            </span>

            <h1>
              Clear expectations
              <br />
              for using
              <br />
              the platform.
            </h1>

            <p>
              These terms explain the rules that apply when you access
              and use the My Academic Tutor website, educational content
              and related public services.
            </p>

            <div className="legal-hero-meta">
              <div>
                <span>
                  Last updated
                </span>

                <strong>
                  {updated}
                </strong>
              </div>

              <div>
                <span>
                  Applies to
                </span>

                <strong>
                  myacademictutor.com
                </strong>
              </div>
            </div>
          </div>


          {/* --------------------------------------------------------------
              Summary
             -------------------------------------------------------------- */}

          <aside className="legal-summary-card">
            <span className="eyebrow light">
              Terms in brief
            </span>

            <h2>
              Use the platform for learning.
            </h2>

            <div className="legal-summary-list">
              <div>
                <span>
                  01
                </span>

                <p>
                  Learning content supports education but does not
                  guarantee a particular academic result.
                </p>
              </div>

              <div>
                <span>
                  02
                </span>

                <p>
                  Academic support must be used consistently with our
                  Academic Integrity policy.
                </p>
              </div>

              <div>
                <span>
                  03
                </span>

                <p>
                  Platform content may not be copied, resold or
                  redistributed without permission.
                </p>
              </div>

              <div>
                <span>
                  04
                </span>

                <p>
                  Paid services and learner accounts are not yet live
                  and will have additional terms before launch.
                </p>
              </div>
            </div>

            <Link
              href="/contact"
              className="button button-white"
            >
              Ask a question

              <Icon
                name="arrow"
                size={15}
              />
            </Link>
          </aside>
        </div>
      </section>


      {/* ==================================================================
          CONTENT
         ================================================================== */}

      <section className="section">
        <div className="shell legal-layout">
          {/* --------------------------------------------------------------
              Contents
             -------------------------------------------------------------- */}

          <aside className="legal-toc">
            <span className="eyebrow">
              On this page
            </span>

            <nav>
              <a href="#about">
                01 · About these terms
              </a>

              <a href="#using-site">
                02 · Using the website
              </a>

              <a href="#educational">
                03 · Educational purpose
              </a>

              <a href="#integrity">
                04 · Academic integrity
              </a>

              <a href="#accounts">
                05 · Learner accounts
              </a>

              <a href="#purchases">
                06 · Purchases & paid services
              </a>

              <a href="#content">
                07 · Our content
              </a>

              <a href="#submissions">
                08 · Information you provide
              </a>

              <a href="#prohibited">
                09 · Prohibited use
              </a>

              <a href="#third-party">
                10 · Third-party services
              </a>

              <a href="#availability">
                11 · Platform availability
              </a>

              <a href="#liability">
                12 · Responsibility & liability
              </a>

              <a href="#changes">
                13 · Changes
              </a>

              <a href="#law">
                14 · Legal framework
              </a>

              <a href="#contact">
                15 · Contact
              </a>
            </nav>
          </aside>


          {/* --------------------------------------------------------------
              Terms
             -------------------------------------------------------------- */}

          <article className="legal-content">
            <div className="legal-introduction">
              <p>
                These terms apply to your use of the public My Academic
                Tutor website.
              </p>

              <p>
                The platform is currently under development. Learner
                accounts, paid course access, subscriptions and payment
                processing are not yet live. Additional or revised terms
                will be introduced before commercial services requiring
                them are made available.
              </p>

              <p>
                If you do not agree with these terms, you should not use
                the website.
              </p>
            </div>


            {/* ==========================================================
                01
               ========================================================== */}

            <section
              id="about"
              className="legal-section"
            >
              <span className="legal-section-number">
                01
              </span>

              <h2>
                About these terms
              </h2>

              <p>
                My Academic Tutor is an online learning platform focused
                on Statistics, Mathematics, Data Science, Bioinformatics
                and Computer Science.
              </p>

              <p>
                References in these terms to “My Academic Tutor”, “we”,
                “us” or “our” mean the operator of the My Academic Tutor
                website.
              </p>

              <div className="legal-callout">
                <strong>
                  Before commercial launch
                </strong>

                <p>
                  The final legal operator name, business address and
                  other legally required trader information should be
                  inserted here before customers are able to purchase
                  services through the website.
                </p>
              </div>

              <p>
                These terms should be read together with our{" "}
                <Link href="/privacy">
                  Privacy Notice
                </Link>
                ,{" "}
                <Link href="/cookies">
                  Cookies information
                </Link>{" "}
                and{" "}
                <Link href="/academic-integrity">
                  Academic Integrity policy
                </Link>.
              </p>
            </section>


            {/* ==========================================================
                02
               ========================================================== */}

            <section
              id="using-site"
              className="legal-section"
            >
              <span className="legal-section-number">
                02
              </span>

              <h2>
                Using the website
              </h2>

              <p>
                You may use the public website for lawful personal,
                educational and informational purposes.
              </p>

              <p>
                You are responsible for ensuring that your use of the
                website is lawful in the country or jurisdiction from
                which you access it.
              </p>

              <p>
                You must not intentionally interfere with the normal
                operation, security or availability of the website.
              </p>

              <p>
                We may restrict access to parts of the platform where
                reasonably necessary for security, maintenance,
                development or misuse prevention.
              </p>
            </section>


            {/* ==========================================================
                03
               ========================================================== */}

            <section
              id="educational"
              className="legal-section"
            >
              <span className="legal-section-number">
                03
              </span>

              <h2>
                Educational purpose
              </h2>

              <p>
                My Academic Tutor provides educational material intended
                to support learning and skill development.
              </p>

              <p>
                Courses, explanations, worked examples, pathways,
                Interactive Labs, resources and tutoring should be used
                as learning tools rather than as substitutes for your
                own academic judgement and responsibility.
              </p>

              <h3>
                Academic outcomes
              </h3>

              <p>
                We do not guarantee particular examination grades,
                university outcomes, employment results, research
                results or other academic or professional outcomes.
              </p>

              <p>
                Learning outcomes depend on many factors including prior
                knowledge, engagement, practice, assessment requirements
                and circumstances outside our control.
              </p>


              <h3>
                Curriculum references
              </h3>

              <p>
                References to qualifications, curricula, educational
                systems, universities or examination structures are
                intended to help learners understand context.
              </p>

              <p>
                Unless expressly stated otherwise, they do not imply
                affiliation with, approval by or endorsement from an
                examination board, university, school, government body
                or other educational organisation.
              </p>


              <h3>
                Professional advice
              </h3>

              <p>
                Educational content on the website is not intended to
                replace advice from an appropriately qualified
                professional where professional advice is required.
              </p>
            </section>


            {/* ==========================================================
                04
               ========================================================== */}

            <section
              id="integrity"
              className="legal-section"
            >
              <span className="legal-section-number">
                04
              </span>

              <h2>
                Academic integrity
              </h2>

              <p>
                My Academic Tutor is designed to support learners in
                understanding and completing their own work.
              </p>

              <p>
                You must not use the platform or request tutoring for the
                purpose of academic dishonesty, impersonation or
                submitting work created by another person as your own.
              </p>

              <p>
                We may refuse or limit a request where the requested
                assistance appears inconsistent with legitimate
                educational support.
              </p>

              <Link
                href="/academic-integrity"
                className="legal-inline-link"
              >
                Read the Academic Integrity policy

                <Icon
                  name="arrow"
                  size={14}
                />
              </Link>
            </section>


            {/* ==========================================================
                05
               ========================================================== */}

            <section
              id="accounts"
              className="legal-section"
            >
              <span className="legal-section-number">
                05
              </span>

              <h2>
                Learner accounts
              </h2>

              <p>
                Learner accounts are not currently operational.
              </p>

              <p>
                Before account functionality launches, these terms will
                be updated to explain matters including:
              </p>

              <ul>
                <li>
                  account eligibility;
                </li>

                <li>
                  account registration;
                </li>

                <li>
                  password and account security;
                </li>

                <li>
                  learner progress and saved content;
                </li>

                <li>
                  account suspension or closure; and
                </li>

                <li>
                  any rules applicable to younger learners.
                </li>
              </ul>

              <p>
                Any account created in future must be used only by the
                person or authorised user for whom it is intended unless
                the applicable service expressly permits otherwise.
              </p>
            </section>


            {/* ==========================================================
                06
               ========================================================== */}

            <section
              id="purchases"
              className="legal-section"
            >
              <span className="legal-section-number">
                06
              </span>

              <h2>
                Purchases and paid services
              </h2>

              <p>
                My Academic Tutor does not currently operate live online
                checkout, subscription billing or paid course enrolment
                through this website.
              </p>

              <p>
                Before paid services are introduced, the terms applicable
                to purchasing will be updated to explain the actual
                commercial arrangement.
              </p>

              <p>
                Depending on the product, these may cover:
              </p>

              <ul>
                <li>
                  the identity and contact details of the seller;
                </li>

                <li>
                  the price and any applicable taxes;
                </li>

                <li>
                  what is included in the purchase;
                </li>

                <li>
                  how and when access is supplied;
                </li>

                <li>
                  the duration of access where relevant;
                </li>

                <li>
                  subscription and renewal arrangements where relevant;
                </li>

                <li>
                  cancellation rights where applicable;
                </li>

                <li>
                  refunds and remedies;
                </li>

                <li>
                  tutoring cancellation or rescheduling arrangements;
                  and
                </li>

                <li>
                  payment processing.
                </li>
              </ul>

              <div className="legal-callout">
                <strong>
                  No placeholder commercial rules
                </strong>

                <p>
                  We do not publish invented refund periods, cancellation
                  rules or subscription conditions before the products
                  and purchase process they relate to actually exist.
                </p>
              </div>
            </section>


            {/* ==========================================================
                07
               ========================================================== */}

            <section
              id="content"
              className="legal-section"
            >
              <span className="legal-section-number">
                07
              </span>

              <h2>
                Our content and intellectual property
              </h2>

              <p>
                Unless otherwise stated, the website design, original
                educational material, text, graphics, course structure,
                learning resources and other original platform content
                are protected by applicable intellectual-property laws.
              </p>

              <p>
                You may use publicly available platform content for your
                own personal learning.
              </p>

              <p>
                Unless permission has been granted or the law otherwise
                permits it, you must not:
              </p>

              <ul>
                <li>
                  reproduce substantial parts of courses or resources;
                </li>

                <li>
                  republish platform content as your own;
                </li>

                <li>
                  sell or commercially redistribute platform material;
                </li>

                <li>
                  remove copyright or attribution information;
                </li>

                <li>
                  systematically extract content to build a competing
                  content library; or
                </li>

                <li>
                  use our branding in a way that falsely suggests
                  endorsement, partnership or affiliation.
                </li>
              </ul>

              <p>
                Third-party names, trademarks, datasets, software and
                other materials remain subject to their respective
                owners&apos; rights and licences.
              </p>
            </section>


            {/* ==========================================================
                08
               ========================================================== */}

            <section
              id="submissions"
              className="legal-section"
            >
              <span className="legal-section-number">
                08
              </span>

              <h2>
                Information you provide
              </h2>

              <p>
                When you contact us, you are responsible for ensuring
                that the information you provide is reasonably accurate
                and that you are entitled to provide it.
              </p>

              <p>
                You should not use the general enquiry form to send
                information that is unnecessary for your request.
              </p>

              <div className="legal-callout">
                <strong>
                  Do not upload sensitive material
                </strong>

                <p>
                  Do not send passwords, payment-card details,
                  confidential datasets, identifiable health records,
                  unpublished confidential research data or similar
                  sensitive material through the general contact form.
                </p>
              </div>

              <p>
                Information submitted through the website is handled in
                accordance with our{" "}
                <Link href="/privacy">
                  Privacy Notice
                </Link>.
              </p>
            </section>


            {/* ==========================================================
                09
               ========================================================== */}

            <section
              id="prohibited"
              className="legal-section"
            >
              <span className="legal-section-number">
                09
              </span>

              <h2>
                Prohibited use
              </h2>

              <p>
                You must not misuse the platform.
              </p>

              <p>
                This includes attempting to:
              </p>

              <ul>
                <li>
                  gain unauthorised access to accounts, systems or data;
                </li>

                <li>
                  interfere with website security or availability;
                </li>

                <li>
                  introduce malicious software or harmful code;
                </li>

                <li>
                  scrape or extract platform content at unreasonable
                  scale;
                </li>

                <li>
                  use the platform to facilitate fraud or unlawful
                  activity;
                </li>

                <li>
                  impersonate another person;
                </li>

                <li>
                  abuse contact or communication systems;
                </li>

                <li>
                  infringe intellectual-property rights; or
                </li>

                <li>
                  use tutoring or learning services for prohibited
                  academic-assistance purposes.
                </li>
              </ul>

              <p>
                We may block or restrict activity where reasonably
                necessary to protect the website, other users or our
                legitimate interests.
              </p>
            </section>


            {/* ==========================================================
                10
               ========================================================== */}

            <section
              id="third-party"
              className="legal-section"
            >
              <span className="legal-section-number">
                10
              </span>

              <h2>
                Third-party websites and services
              </h2>

              <p>
                The website may contain links to third-party websites,
                software, datasets, educational resources or services.
              </p>

              <p>
                A link does not automatically mean that My Academic Tutor
                endorses or controls that third party.
              </p>

              <p>
                Third-party services may have their own terms, privacy
                practices and licences. You should review those where
                relevant before using the external service.
              </p>
            </section>


            {/* ==========================================================
                11
               ========================================================== */}

            <section
              id="availability"
              className="legal-section"
            >
              <span className="legal-section-number">
                11
              </span>

              <h2>
                Availability and changes to the platform
              </h2>

              <p>
                We may update, redesign, add to or remove parts of the
                website as the platform develops.
              </p>

              <p>
                We do not promise that every public feature will be
                available continuously or without interruption.
              </p>

              <p>
                Temporary interruptions may occur because of maintenance,
                technical problems, security measures, infrastructure
                changes or circumstances outside our reasonable control.
              </p>

              <p>
                Where future paid services involve specific access
                commitments, those commitments should be described in
                the terms applicable to that purchase.
              </p>
            </section>


            {/* ==========================================================
                12
               ========================================================== */}

            <section
              id="liability"
              className="legal-section"
            >
              <span className="legal-section-number">
                12
              </span>

              <h2>
                Responsibility and liability
              </h2>

              <p>
                We aim to provide accurate and useful educational
                material, but educational information can contain errors
                or become outdated.
              </p>

              <p>
                Learners remain responsible for checking requirements
                that matter to their own examination, university,
                research, professional or institutional context.
              </p>

              <p>
                Nothing in these terms is intended to exclude or restrict
                any responsibility or consumer right that cannot lawfully
                be excluded or restricted.
              </p>

              <p>
                Once paid services are introduced, this section should
                be reviewed alongside the actual service model and the
                legal status of the users purchasing those services.
              </p>
            </section>


            {/* ==========================================================
                13
               ========================================================== */}

            <section
              id="changes"
              className="legal-section"
            >
              <span className="legal-section-number">
                13
              </span>

              <h2>
                Changes to these terms
              </h2>

              <p>
                We may update these terms when the platform, services or
                applicable requirements change.
              </p>

              <p>
                The latest revision date appears at the top of this page.
              </p>

              <p>
                Significant changes affecting existing paid customers or
                account holders should be handled in accordance with the
                applicable agreement and legal requirements at that time.
              </p>
            </section>


            {/* ==========================================================
                14
               ========================================================== */}

            <section
              id="law"
              className="legal-section"
            >
              <span className="legal-section-number">
                14
              </span>

              <h2>
                Applicable legal framework
              </h2>

              <p>
                The website is currently being prepared before full
                commercial launch.
              </p>

              <p>
                The final business operator, contracting entity,
                governing-law wording and dispute provisions should be
                confirmed before paid services are offered.
              </p>

              <div className="legal-callout">
                <strong>
                  Consumer rights
                </strong>

                <p>
                  Nothing in the final commercial terms should be
                  interpreted as removing legal rights that consumers
                  have under applicable law.
                </p>
              </div>
            </section>


            {/* ==========================================================
                15
               ========================================================== */}

            <section
              id="contact"
              className="legal-section legal-section-last"
            >
              <span className="legal-section-number">
                15
              </span>

              <h2>
                Questions about these terms
              </h2>

              <p>
                If you have a question about these terms or how they
                apply to your use of My Academic Tutor, please contact
                us.
              </p>

              <Link
                href="/contact"
                className="button"
              >
                Contact My Academic Tutor

                <Icon
                  name="arrow"
                  size={16}
                />
              </Link>
            </section>
          </article>
        </div>
      </section>


      {/* ==================================================================
          RELATED
         ================================================================== */}

      <section className="section soft">
        <div className="shell">
          <div className="legal-related">
            <div>
              <span className="eyebrow">
                Related policies
              </span>

              <h2>
                Understand how the platform operates.
              </h2>
            </div>

            <div className="legal-related-grid">
              <Link href="/privacy">
                <span>
                  01
                </span>

                <strong>
                  Privacy
                </strong>

                <Icon
                  name="arrow"
                  size={14}
                />
              </Link>

              <Link href="/cookies">
                <span>
                  02
                </span>

                <strong>
                  Cookies
                </strong>

                <Icon
                  name="arrow"
                  size={14}
                />
              </Link>

              <Link href="/academic-integrity">
                <span>
                  03
                </span>

                <strong>
                  Academic Integrity
                </strong>

                <Icon
                  name="arrow"
                  size={14}
                />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}