import type { Metadata } from "next";
import Link from "next/link";

import Icon from "@/components/Icon";


/* ==========================================================================
   METADATA
   ========================================================================== */

export const metadata: Metadata = {
  title: "Privacy",

  description:
    "Read the My Academic Tutor privacy notice and learn how personal information may be collected, used, stored and protected when you use the website or contact us.",

  openGraph: {
    title:
      "Privacy | My Academic Tutor",

    description:
      "Information about privacy and personal data when using My Academic Tutor.",
  },
};


/* ==========================================================================
   PAGE
   ========================================================================== */

export default function PrivacyPage() {
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
              Home / Privacy
            </div>

            <span className="eyebrow legal-hero-eyebrow">
              Privacy notice
            </span>

            <h1>
              Your information
              <br />
              should be handled
              <br />
              with care.
            </h1>

            <p>
              This notice explains the types of personal information
              My Academic Tutor may receive, why we may use it and the
              choices and rights that may apply to you.
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
              Quick summary
             -------------------------------------------------------------- */}

          <aside className="legal-summary-card">
            <span className="eyebrow light">
              Privacy in brief
            </span>

            <h2>
              The important points.
            </h2>

            <div className="legal-summary-list">
              <div>
                <span>
                  01
                </span>

                <p>
                  We only ask for information that has a purpose.
                </p>
              </div>

              <div>
                <span>
                  02
                </span>

                <p>
                  Contact-form information is used to respond to your
                  enquiry.
                </p>
              </div>

              <div>
                <span>
                  03
                </span>

                <p>
                  We do not currently operate live learner accounts or
                  payment processing.
                </p>
              </div>

              <div>
                <span>
                  04
                </span>

                <p>
                  This notice will be updated as new platform services
                  are introduced.
                </p>
              </div>
            </div>

            <Link
              href="/contact"
              className="button button-white"
            >
              Privacy question

              <Icon
                name="arrow"
                size={15}
              />
            </Link>
          </aside>
        </div>
      </section>


      {/* ==================================================================
          LEGAL CONTENT
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
              <a href="#who-we-are">
                01 · Who we are
              </a>

              <a href="#information">
                02 · Information we collect
              </a>

              <a href="#how-we-use">
                03 · How we use information
              </a>

              <a href="#lawful-basis">
                04 · Legal basis
              </a>

              <a href="#sharing">
                05 · Sharing information
              </a>

              <a href="#international">
                06 · International processing
              </a>

              <a href="#retention">
                07 · Retention
              </a>

              <a href="#security">
                08 · Security
              </a>

              <a href="#rights">
                09 · Your rights
              </a>

              <a href="#children">
                10 · Children
              </a>

              <a href="#cookies">
                11 · Cookies
              </a>

              <a href="#changes">
                12 · Changes
              </a>

              <a href="#contact">
                13 · Contact
              </a>
            </nav>
          </aside>


          {/* --------------------------------------------------------------
              Main policy
             -------------------------------------------------------------- */}

          <article className="legal-content">
            {/* ==========================================================
                INTRO
               ========================================================== */}

            <div className="legal-introduction">
              <p>
                This privacy notice applies to information processed
                through the My Academic Tutor website and related
                enquiries.
              </p>

              <p>
                The platform is currently being developed. Some planned
                features—including learner accounts, payments and
                personalised progress tracking—are not yet live. This
                notice will be updated before additional personal-data
                processing associated with those services begins.
              </p>
            </div>


            {/* ==========================================================
                1
               ========================================================== */}

            <section
              id="who-we-are"
              className="legal-section"
            >
              <span className="legal-section-number">
                01
              </span>

              <h2>
                Who we are
              </h2>

              <p>
                My Academic Tutor is an online learning platform focused
                on Statistics, Mathematics, Data Science, Bioinformatics
                and Computer Science.
              </p>

              <p>
                References to “My Academic Tutor”, “we”, “us” or “our”
                in this notice refer to the operator of the My Academic
                Tutor website.
              </p>

              <div className="legal-callout">
                <strong>
                  Before commercial launch
                </strong>

                <p>
                  The final legal operator identity and any additional
                  business contact details should be published here
                  before paid services and learner accounts go live.
                </p>
              </div>

              <p>
                For privacy questions relating to the current website,
                you can contact us through the{" "}
                <Link href="/contact">
                  Contact page
                </Link>.
              </p>
            </section>


            {/* ==========================================================
                2
               ========================================================== */}

            <section
              id="information"
              className="legal-section"
            >
              <span className="legal-section-number">
                02
              </span>

              <h2>
                Information we may collect
              </h2>

              <p>
                The information we receive depends on how you interact
                with the website.
              </p>

              <h3>
                Information you provide directly
              </h3>

              <p>
                If you use our enquiry form, you may provide information
                such as:
              </p>

              <ul>
                <li>
                  your name;
                </li>

                <li>
                  your email address;
                </li>

                <li>
                  the type of enquiry;
                </li>

                <li>
                  the subject you are interested in;
                </li>

                <li>
                  your academic or learning level;
                </li>

                <li>
                  a topic or learning challenge;
                </li>

                <li>
                  your learning goal;
                </li>

                <li>
                  your preferred timeframe; and
                </li>

                <li>
                  any additional information you choose to include in
                  your message.
                </li>
              </ul>


              <h3>
                Technical information
              </h3>

              <p>
                Like most websites, hosting and security infrastructure
                may process limited technical information required to
                deliver, secure and diagnose the website. Depending on
                the services used, this may include information such as
                IP address, browser information, device information,
                request logs and timestamps.
              </p>


              <h3>
                Future learner accounts
              </h3>

              <p>
                Learner accounts are not currently operational. If
                accounts are introduced, this notice will be updated to
                explain what account, enrolment, progress and preference
                information is processed.
              </p>


              <h3>
                Future payment information
              </h3>

              <p>
                The website does not currently provide live payment
                processing. Before paid services are introduced, this
                notice will be updated to explain the payment provider
                used and the information involved.
              </p>
            </section>


            {/* ==========================================================
                3
               ========================================================== */}

            <section
              id="how-we-use"
              className="legal-section"
            >
              <span className="legal-section-number">
                03
              </span>

              <h2>
                How we may use your information
              </h2>

              <p>
                Depending on how you interact with the platform,
                information may be used to:
              </p>

              <ul>
                <li>
                  receive, review and respond to enquiries;
                </li>

                <li>
                  understand the type of course, tutoring or learning
                  support someone is seeking;
                </li>

                <li>
                  operate and maintain the website;
                </li>

                <li>
                  investigate technical problems;
                </li>

                <li>
                  protect the website against misuse, fraud and spam;
                </li>

                <li>
                  understand and improve the learning platform; and
                </li>

                <li>
                  comply with legal or regulatory obligations where
                  applicable.
                </li>
              </ul>

              <div className="legal-callout">
                <strong>
                  Contact enquiries
                </strong>

                <p>
                  Information submitted through the current contact form
                  is intended for handling the enquiry. We do not treat
                  a general enquiry as automatic consent to receive
                  unrelated promotional email.
                </p>
              </div>
            </section>


            {/* ==========================================================
                4
               ========================================================== */}

            <section
              id="lawful-basis"
              className="legal-section"
            >
              <span className="legal-section-number">
                04
              </span>

              <h2>
                Legal basis for using personal information
              </h2>

              <p>
                Where data-protection law requires a lawful basis for
                processing personal information, the appropriate basis
                depends on the purpose and circumstances of the
                processing.
              </p>

              <p>
                Depending on the situation, processing may be necessary
                to:
              </p>

              <ul>
                <li>
                  respond to steps you ask us to take before entering
                  into a service arrangement;
                </li>

                <li>
                  provide a service you have requested;
                </li>

                <li>
                  pursue legitimate operational interests, where those
                  interests are not overridden by your rights and
                  interests;
                </li>

                <li>
                  meet a legal obligation; or
                </li>

                <li>
                  act on valid consent where consent is the appropriate
                  basis.
                </li>
              </ul>

              <p>
                As the platform gains accounts, payments, marketing and
                other services, the specific processing purposes and
                bases will be reviewed and documented before those
                features are launched.
              </p>
            </section>


            {/* ==========================================================
                5
               ========================================================== */}

            <section
              id="sharing"
              className="legal-section"
            >
              <span className="legal-section-number">
                05
              </span>

              <h2>
                Who information may be shared with
              </h2>

              <p>
                We may use service providers where they are necessary to
                operate the website or handle an enquiry.
              </p>

              <p>
                Depending on the systems configured, categories of
                recipient may include:
              </p>

              <ul>
                <li>
                  website hosting and infrastructure providers;
                </li>

                <li>
                  email or enquiry-delivery providers;
                </li>

                <li>
                  security and anti-abuse services;
                </li>

                <li>
                  technical service providers; and
                </li>

                <li>
                  professional or legal advisers where reasonably
                  necessary.
                </li>
              </ul>

              <p>
                We may also disclose information when required to do so
                by law or where necessary to protect legitimate legal
                rights.
              </p>

              <div className="legal-callout">
                <strong>
                  Production providers
                </strong>

                <p>
                  Once the final hosting, authentication, email,
                  analytics and payment services are selected, this
                  section should be updated with additional detail where
                  required.
                </p>
              </div>
            </section>


            {/* ==========================================================
                6
               ========================================================== */}

            <section
              id="international"
              className="legal-section"
            >
              <span className="legal-section-number">
                06
              </span>

              <h2>
                International processing
              </h2>

              <p>
                Some technology providers may operate infrastructure in
                more than one country.
              </p>

              <p>
                Where personal information is transferred internationally,
                we will assess the arrangements required for the
                relevant processing and update this notice where
                necessary.
              </p>

              <p>
                The final position will depend on the production
                providers used by the website.
              </p>
            </section>


            {/* ==========================================================
                7
               ========================================================== */}

            <section
              id="retention"
              className="legal-section"
            >
              <span className="legal-section-number">
                07
              </span>

              <h2>
                How long we keep information
              </h2>

              <p>
                We do not intend to keep personal information
                indefinitely.
              </p>

              <p>
                Retention should reflect why the information was
                collected, whether the enquiry or service relationship
                remains active, operational requirements and any legal,
                accounting or dispute-related obligations that apply.
              </p>

              <p>
                Specific retention periods will be documented as the
                production systems and commercial services are
                finalised.
              </p>

              <div className="legal-callout">
                <strong>
                  Data minimisation
                </strong>

                <p>
                  Please avoid sending unnecessary sensitive,
                  confidential or identifiable datasets through the
                  general contact form.
                </p>
              </div>
            </section>


            {/* ==========================================================
                8
               ========================================================== */}

            <section
              id="security"
              className="legal-section"
            >
              <span className="legal-section-number">
                08
              </span>

              <h2>
                Security
              </h2>

              <p>
                We aim to use proportionate technical and organisational
                measures to protect information against unauthorised
                access, disclosure, alteration or loss.
              </p>

              <p>
                However, no internet-based system can guarantee absolute
                security. You should therefore avoid sending information
                through the website that is not necessary for your
                enquiry.
              </p>

              <p>
                In particular, do not send passwords, payment-card
                details, medical records, confidential research datasets
                or other highly sensitive material through the general
                enquiry form.
              </p>
            </section>


            {/* ==========================================================
                9
               ========================================================== */}

            <section
              id="rights"
              className="legal-section"
            >
              <span className="legal-section-number">
                09
              </span>

              <h2>
                Your privacy rights
              </h2>

              <p>
                Depending on the law that applies to you and the
                circumstances of the processing, you may have rights
                relating to your personal information.
              </p>

              <p>
                These may include rights concerning:
              </p>

              <ul>
                <li>
                  access to personal information;
                </li>

                <li>
                  correction of inaccurate information;
                </li>

                <li>
                  deletion in certain circumstances;
                </li>

                <li>
                  restriction of processing in certain circumstances;
                </li>

                <li>
                  objection to certain processing;
                </li>

                <li>
                  portability of certain information; and
                </li>

                <li>
                  withdrawal of consent where processing relies on
                  consent.
                </li>
              </ul>

              <p>
                These rights are not identical in every situation and
                may depend on the legal basis and other circumstances
                surrounding the processing.
              </p>

              <p>
                To raise a privacy request relating to My Academic Tutor,
                contact us through the{" "}
                <Link href="/contact">
                  Contact page
                </Link>.
              </p>
            </section>


            {/* ==========================================================
                10
               ========================================================== */}

            <section
              id="children"
              className="legal-section"
            >
              <span className="legal-section-number">
                10
              </span>

              <h2>
                Children and younger learners
              </h2>

              <p>
                Some educational content on My Academic Tutor is designed
                for school-level learners.
              </p>

              <p>
                The current public website does not provide live learner
                accounts or payment functionality. Before account-based
                services for younger users are introduced, the relevant
                privacy, consent, safeguarding and account-design
                requirements will be reviewed separately.
              </p>

              <p>
                Younger learners should avoid providing unnecessary
                personal information through general enquiry forms.
              </p>
            </section>


            {/* ==========================================================
                11
               ========================================================== */}

            <section
              id="cookies"
              className="legal-section"
            >
              <span className="legal-section-number">
                11
              </span>

              <h2>
                Cookies and similar technologies
              </h2>

              <p>
                Websites may use cookies or similar technologies for
                functions such as maintaining essential website
                behaviour, remembering preferences, security or
                measuring website usage.
              </p>

              <p>
                Our separate Cookies page explains the technologies used
                by My Academic Tutor and the choices available to
                visitors.
              </p>

              <Link
                href="/cookies"
                className="legal-inline-link"
              >
                Read the Cookies policy

                <Icon
                  name="arrow"
                  size={14}
                />
              </Link>
            </section>


            {/* ==========================================================
                12
               ========================================================== */}

            <section
              id="changes"
              className="legal-section"
            >
              <span className="legal-section-number">
                12
              </span>

              <h2>
                Changes to this notice
              </h2>

              <p>
                This notice may change as the platform develops, new
                services are introduced or privacy practices change.
              </p>

              <p>
                The date at the top of the notice shows when this version
                was last updated.
              </p>

              <p>
                Where a significant change affects how existing personal
                information is used, we will consider whether additional
                notice should be provided.
              </p>
            </section>


            {/* ==========================================================
                13
               ========================================================== */}

            <section
              id="contact"
              className="legal-section legal-section-last"
            >
              <span className="legal-section-number">
                13
              </span>

              <h2>
                Privacy questions or concerns
              </h2>

              <p>
                If you have a question about this notice, want to raise a
                concern or want to make a request relating to personal
                information associated with My Academic Tutor, please
                contact us.
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


              <div className="legal-regulator-note">
                <strong>
                  Independent concerns
                </strong>

                <p>
                  Depending on where you are located, you may also have
                  the right to raise concerns with the relevant
                  data-protection supervisory authority.
                </p>
              </div>
            </section>
          </article>
        </div>
      </section>


      {/* ==================================================================
          RELATED POLICIES
         ================================================================== */}

      <section className="section soft">
        <div className="shell">
          <div className="legal-related">
            <div>
              <span className="eyebrow">
                Related information
              </span>

              <h2>
                More about how the platform operates.
              </h2>
            </div>

            <div className="legal-related-grid">
              <Link href="/cookies">
                <span>
                  01
                </span>

                <strong>
                  Cookies
                </strong>

                <Icon
                  name="arrow"
                  size={14}
                />
              </Link>

              <Link href="/terms">
                <span>
                  02
                </span>

                <strong>
                  Terms
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