import type { Metadata } from "next";
import Link from "next/link";

import Icon from "@/components/Icon";


/* ==========================================================================
   METADATA
   ========================================================================== */

export const metadata: Metadata = {
  title: "Cookies",

  description:
    "Learn how My Academic Tutor may use cookies and similar storage or access technologies, what they do and what choices are available to visitors.",

  openGraph: {
    title:
      "Cookies | My Academic Tutor",

    description:
      "Information about cookies and similar technologies used by My Academic Tutor.",
  },
};


/* ==========================================================================
   PAGE
   ========================================================================== */

export default function CookiesPage() {
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
              Home / Cookies
            </div>

            <span className="eyebrow legal-hero-eyebrow">
              Cookies & storage technologies
            </span>

            <h1>
              Clear about
              <br />
              what the website
              <br />
              stores and accesses.
            </h1>

            <p>
              This page explains how My Academic Tutor may use cookies
              and similar technologies on your device, why they may be
              used and what choices may be available to you.
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
              In brief
            </span>

            <h2>
              Use technology only for a clear purpose.
            </h2>

            <div className="legal-summary-list">
              <div>
                <span>
                  01
                </span>

                <p>
                  Some technologies may be needed for the website to
                  operate securely and correctly.
                </p>
              </div>

              <div>
                <span>
                  02
                </span>

                <p>
                  Optional tracking should not be introduced silently.
                </p>
              </div>

              <div>
                <span>
                  03
                </span>

                <p>
                  Advertising or cross-site tracking is not currently
                  part of the planned core learning experience.
                </p>
              </div>

              <div>
                <span>
                  04
                </span>

                <p>
                  This page will be updated whenever the technologies
                  used by the production website change.
                </p>
              </div>
            </div>
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
              <a href="#what">
                01 · What these technologies are
              </a>

              <a href="#current">
                02 · Current website
              </a>

              <a href="#categories">
                03 · Technology categories
              </a>

              <a href="#necessary">
                04 · Essential technologies
              </a>

              <a href="#analytics">
                05 · Analytics
              </a>

              <a href="#preferences">
                06 · Preferences
              </a>

              <a href="#advertising">
                07 · Advertising
              </a>

              <a href="#third-parties">
                08 · Third parties
              </a>

              <a href="#choices">
                09 · Your choices
              </a>

              <a href="#browser">
                10 · Browser controls
              </a>

              <a href="#changes">
                11 · Changes
              </a>

              <a href="#contact">
                12 · Contact
              </a>
            </nav>
          </aside>


          {/* --------------------------------------------------------------
              Main content
             -------------------------------------------------------------- */}

          <article className="legal-content">
            <div className="legal-introduction">
              <p>
                “Cookies” is commonly used as a general term, but modern
                websites can store or access information on a device in
                several different ways.
              </p>

              <p>
                This policy therefore covers cookies and other comparable
                storage or access technologies used through My Academic
                Tutor.
              </p>

              <p>
                Because the platform is still being developed, the final
                production technology configuration must be reviewed
                before commercial launch and this policy updated to
                reflect what the website actually uses.
              </p>
            </div>


            {/* ==========================================================
                01
               ========================================================== */}

            <section
              id="what"
              className="legal-section"
            >
              <span className="legal-section-number">
                01
              </span>

              <h2>
                What are cookies and similar technologies?
              </h2>

              <p>
                A cookie is a small piece of information that a website
                may store on your browser or device and later access.
              </p>

              <p>
                Websites can also use other technologies that perform
                similar functions, including browser storage, scripts,
                pixels, tags and other mechanisms that store or access
                information on a device.
              </p>

              <p>
                These technologies may be used for different purposes,
                such as:
              </p>

              <ul>
                <li>
                  keeping a website secure;
                </li>

                <li>
                  remembering a user&apos;s choices;
                </li>

                <li>
                  maintaining a session;
                </li>

                <li>
                  understanding how a website is used;
                </li>

                <li>
                  measuring performance; or
                </li>

                <li>
                  supporting advertising or cross-site tracking.
                </li>
              </ul>

              <p>
                Different purposes may have different legal and consent
                requirements.
              </p>
            </section>


            {/* ==========================================================
                02
               ========================================================== */}

            <section
              id="current"
              className="legal-section"
            >
              <span className="legal-section-number">
                02
              </span>

              <h2>
                Current website status
              </h2>

              <p>
                My Academic Tutor is currently in active development.
                Learner accounts, payment processing and personalised
                progress tracking are not yet live.
              </p>

              <p>
                We have also not intentionally built behavioural
                advertising or cross-site advertising tracking into the
                core application.
              </p>

              <div className="legal-callout">
                <strong>
                  Production audit required
                </strong>

                <p>
                  Before public commercial launch, the deployed website
                  should be tested to identify every cookie, browser
                  storage item, embedded third-party technology and
                  similar storage or access mechanism actually used.
                  This policy should then be updated with the verified
                  results.
                </p>
              </div>

              <p>
                Hosting and security infrastructure may also process
                technical request information without necessarily using
                browser cookies. Information about broader personal-data
                processing is covered by our{" "}
                <Link href="/privacy">
                  Privacy Notice
                </Link>.
              </p>
            </section>


            {/* ==========================================================
                03
               ========================================================== */}

            <section
              id="categories"
              className="legal-section"
            >
              <span className="legal-section-number">
                03
              </span>

              <h2>
                Categories we may use
              </h2>

              <p>
                Storage and access technologies can be grouped according
                to why they are used.
              </p>

              <div className="cookie-category-grid">
                <div>
                  <span>
                    01
                  </span>

                  <strong>
                    Essential
                  </strong>

                  <p>
                    Security, service delivery and functions required for
                    something the visitor has requested.
                  </p>
                </div>

                <div>
                  <span>
                    02
                  </span>

                  <strong>
                    Preferences
                  </strong>

                  <p>
                    Remembering choices about how the website appears or
                    behaves.
                  </p>
                </div>

                <div>
                  <span>
                    03
                  </span>

                  <strong>
                    Analytics
                  </strong>

                  <p>
                    Understanding how the website is used and how it can
                    be improved.
                  </p>
                </div>

                <div>
                  <span>
                    04
                  </span>

                  <strong>
                    Advertising
                  </strong>

                  <p>
                    Tracking or profiling for advertising, targeting or
                    related measurement.
                  </p>
                </div>
              </div>
            </section>


            {/* ==========================================================
                04
               ========================================================== */}

            <section
              id="necessary"
              className="legal-section"
            >
              <span className="legal-section-number">
                04
              </span>

              <h2>
                Essential technologies
              </h2>

              <p>
                Some storage or access technologies may be necessary for
                a website or requested feature to function.
              </p>

              <p>
                Examples can include technologies used solely for:
              </p>

              <ul>
                <li>
                  security;
                </li>

                <li>
                  network and service delivery;
                </li>

                <li>
                  maintaining an authenticated session;
                </li>

                <li>
                  remembering a privacy choice; or
                </li>

                <li>
                  providing functionality specifically requested by the
                  user.
                </li>
              </ul>

              <p>
                The precise technologies used by My Academic Tutor will
                depend on the final production infrastructure and
                features.
              </p>
            </section>


            {/* ==========================================================
                05
               ========================================================== */}

            <section
              id="analytics"
              className="legal-section"
            >
              <span className="legal-section-number">
                05
              </span>

              <h2>
                Analytics and website measurement
              </h2>

              <p>
                We may in future use analytics to understand matters such
                as which pages are visited, whether pages work properly
                and how the learning experience can be improved.
              </p>

              <p>
                The exact privacy requirements depend on how the
                analytics technology operates and the purpose for which
                information is used.
              </p>

              <p>
                Where an analytics implementation falls within an
                applicable legal exception, we will provide the required
                information and user controls.
              </p>

              <p>
                Where consent is required, the relevant technology should
                not be enabled until the required choice has been made.
              </p>

              <div className="legal-callout">
                <strong>
                  No analytics provider selected yet
                </strong>

                <p>
                  We will update this section with the actual provider,
                  purpose, technology and applicable controls if website
                  analytics are added.
                </p>
              </div>
            </section>


            {/* ==========================================================
                06
               ========================================================== */}

            <section
              id="preferences"
              className="legal-section"
            >
              <span className="legal-section-number">
                06
              </span>

              <h2>
                Preference technologies
              </h2>

              <p>
                The platform may eventually remember choices such as
                appearance, accessibility settings or other interface
                preferences.
              </p>

              <p>
                If such functionality is introduced, this policy will
                explain the relevant technology and the controls
                available to users.
              </p>
            </section>


            {/* ==========================================================
                07
               ========================================================== */}

            <section
              id="advertising"
              className="legal-section"
            >
              <span className="legal-section-number">
                07
              </span>

              <h2>
                Advertising and cross-site tracking
              </h2>

              <p>
                Behavioural advertising and cross-site tracking are not
                currently intended as part of the core My Academic Tutor
                learning experience.
              </p>

              <p>
                If advertising, retargeting or comparable tracking is
                introduced later, this policy and the website&apos;s
                consent controls will be updated before such technology
                is activated where required.
              </p>

              <p>
                We will not describe advertising technology as
                “essential” merely because it may be commercially useful.
              </p>
            </section>


            {/* ==========================================================
                08
               ========================================================== */}

            <section
              id="third-parties"
              className="legal-section"
            >
              <span className="legal-section-number">
                08
              </span>

              <h2>
                Third-party technologies
              </h2>

              <p>
                Some future platform features may depend on third-party
                services.
              </p>

              <p>
                Examples could include:
              </p>

              <ul>
                <li>
                  authentication;
                </li>

                <li>
                  payment processing;
                </li>

                <li>
                  video or interactive content;
                </li>

                <li>
                  analytics;
                </li>

                <li>
                  customer support; or
                </li>

                <li>
                  embedded external services.
                </li>
              </ul>

              <p>
                Third-party technologies will be reviewed before
                integration so that relevant information and choices can
                be provided.
              </p>

              <div className="legal-callout">
                <strong>
                  Provider list
                </strong>

                <p>
                  Once production services have been selected, this
                  section should identify relevant third parties and
                  explain what their technologies do where required.
                </p>
              </div>
            </section>


            {/* ==========================================================
                09
               ========================================================== */}

            <section
              id="choices"
              className="legal-section"
            >
              <span className="legal-section-number">
                09
              </span>

              <h2>
                Your choices
              </h2>

              <p>
                Where the law requires consent before a storage or access
                technology is used, users should be given a genuine
                choice.
              </p>

              <p>
                Where consent controls are required, the intended design
                is to allow visitors to:
              </p>

              <ul>
                <li>
                  understand the purpose of optional technologies;
                </li>

                <li>
                  accept relevant optional technologies;
                </li>

                <li>
                  reject relevant optional technologies;
                </li>

                <li>
                  make more granular choices where appropriate; and
                </li>

                <li>
                  change or withdraw a previous choice.
                </li>
              </ul>

              <p>
                Where an applicable exception instead requires an
                objection mechanism, an appropriate way to exercise that
                choice should be provided.
              </p>

              <div className="legal-callout">
                <strong>
                  Cookie settings
                </strong>

                <p>
                  A dedicated cookie-preference control will be added if
                  the final production configuration contains
                  technologies that require or materially benefit from
                  such controls.
                </p>
              </div>
            </section>


            {/* ==========================================================
                10
               ========================================================== */}

            <section
              id="browser"
              className="legal-section"
            >
              <span className="legal-section-number">
                10
              </span>

              <h2>
                Browser controls
              </h2>

              <p>
                Most browsers provide controls for viewing, deleting or
                blocking cookies and other stored website information.
              </p>

              <p>
                The exact steps vary between browsers and devices.
              </p>

              <p>
                Blocking storage that is genuinely required for a
                requested feature may prevent that feature from working
                correctly.
              </p>
            </section>


            {/* ==========================================================
                11
               ========================================================== */}

            <section
              id="changes"
              className="legal-section"
            >
              <span className="legal-section-number">
                11
              </span>

              <h2>
                Changes to this policy
              </h2>

              <p>
                This policy will be reviewed when website technologies,
                providers or purposes change.
              </p>

              <p>
                In particular, it should be reviewed before introducing
                learner accounts, payments, analytics, embedded
                third-party media, marketing technology or advertising.
              </p>

              <p>
                The latest revision date appears at the top of this page.
              </p>
            </section>


            {/* ==========================================================
                12
               ========================================================== */}

            <section
              id="contact"
              className="legal-section legal-section-last"
            >
              <span className="legal-section-number">
                12
              </span>

              <h2>
                Questions about cookies or privacy
              </h2>

              <p>
                If you have a question about technology used by My
                Academic Tutor or about how your information is handled,
                please contact us.
              </p>

              <div className="hero-actions">
                <Link
                  href="/contact"
                  className="button"
                >
                  Contact us

                  <Icon
                    name="arrow"
                    size={16}
                  />
                </Link>

                <Link
                  href="/privacy"
                  className="button button-outline"
                >
                  Read Privacy Notice
                </Link>
              </div>
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
                Privacy should connect across the platform.
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