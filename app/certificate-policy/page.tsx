import type { Metadata } from "next";
import Link from "next/link";

import Icon from "@/components/Icon";


/* ==========================================================================
   METADATA
   ========================================================================== */

export const metadata: Metadata = {
  title: "Certificate Policy",

  description:
    "Read the My Academic Tutor certificate policy and understand what course completion certificates represent and what they do not represent.",

  openGraph: {
    title:
      "Certificate Policy | My Academic Tutor",

    description:
      "Information about learning completion certificates issued by My Academic Tutor.",
  },
};


/* ==========================================================================
   PAGE
   ========================================================================== */

export default function CertificatePolicyPage() {
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
              Home / Certificate Policy
            </div>

            <span className="eyebrow legal-hero-eyebrow">
              Certificate policy
            </span>

            <h1>
              Evidence of
              <br />
              learning.
              <br />
              Not inflated credentials.
            </h1>

            <p>
              My Academic Tutor certificates are intended to recognise
              genuine completion of learning activities without
              overstating what that completion represents.
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
                  My Academic Tutor certificates
                </strong>
              </div>
            </div>
          </div>


          {/* --------------------------------------------------------------
              Summary
             -------------------------------------------------------------- */}

          <aside className="legal-summary-card">
            <span className="eyebrow light">
              Certificate in brief
            </span>

            <h2>
              A record of completion.
            </h2>

            <div className="legal-summary-list">
              <div>
                <span>
                  01
                </span>

                <p>
                  Certificates may recognise completion of eligible
                  learning activities.
                </p>
              </div>

              <div>
                <span>
                  02
                </span>

                <p>
                  They do not automatically represent an accredited
                  academic qualification.
                </p>
              </div>

              <div>
                <span>
                  03
                </span>

                <p>
                  They do not automatically award university credit or
                  professional status.
                </p>
              </div>

              <div>
                <span>
                  04
                </span>

                <p>
                  Certificate requirements should be stated clearly for
                  each eligible course.
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
              <a href="#purpose">
                01 · Purpose
              </a>

              <a href="#meaning">
                02 · What a certificate means
              </a>

              <a href="#not-mean">
                03 · What it does not mean
              </a>

              <a href="#eligibility">
                04 · Eligibility
              </a>

              <a href="#assessment">
                05 · Assessments
              </a>

              <a href="#identity">
                06 · Learner identity
              </a>

              <a href="#verification">
                07 · Verification
              </a>

              <a href="#sharing">
                08 · Sharing certificates
              </a>

              <a href="#changes">
                09 · Changes
              </a>

              <a href="#withdrawal">
                10 · Withdrawal
              </a>

              <a href="#contact">
                11 · Contact
              </a>
            </nav>
          </aside>


          {/* --------------------------------------------------------------
              Main policy
             -------------------------------------------------------------- */}

          <article className="legal-content">
            <div className="legal-introduction">
              <p>
                Certificates are intended to provide a clear record that
                a learner has completed specified learning activity on
                My Academic Tutor.
              </p>

              <p>
                Certificate functionality is not yet fully operational.
                Before certificates are issued at scale, the technical
                verification process, completion requirements and final
                certificate design will be confirmed.
              </p>
            </div>


            {/* ==========================================================
                01
               ========================================================== */}

            <section
              id="purpose"
              className="legal-section"
            >
              <span className="legal-section-number">
                01
              </span>

              <h2>
                Purpose of a certificate
              </h2>

              <p>
                A My Academic Tutor certificate is intended to recognise
                completion of an eligible course, learning pathway or
                other defined educational activity.
              </p>

              <p>
                The certificate can provide learners with a record of
                learning that they may choose to keep or share.
              </p>

              <p>
                Our goal is to make certificates informative and
                verifiable without exaggerating their academic or
                professional status.
              </p>
            </section>


            {/* ==========================================================
                02
               ========================================================== */}

            <section
              id="meaning"
              className="legal-section"
            >
              <span className="legal-section-number">
                02
              </span>

              <h2>
                What a certificate may mean
              </h2>

              <p>
                Depending on the particular course or learning activity,
                a certificate may confirm that a learner has:
              </p>

              <ul>
                <li>
                  completed the required learning material;
                </li>

                <li>
                  completed specified modules or lessons;
                </li>

                <li>
                  completed required practice activities;
                </li>

                <li>
                  completed quizzes or other learning checks where
                  applicable; and
                </li>

                <li>
                  met the completion criteria published for that
                  particular course.
                </li>
              </ul>

              <div className="legal-callout">
                <strong>
                  Course-specific requirements
                </strong>

                <p>
                  Not every course needs to use identical certificate
                  requirements. The criteria should be stated on the
                  relevant course before a learner begins working towards
                  a certificate.
                </p>
              </div>
            </section>


            {/* ==========================================================
                03
               ========================================================== */}

            <section
              id="not-mean"
              className="legal-section"
            >
              <span className="legal-section-number">
                03
              </span>

              <h2>
                What a certificate does not automatically mean
              </h2>

              <p>
                Unless a particular course explicitly states otherwise
                on the basis of a genuine external arrangement, a
                certificate from My Academic Tutor does not represent:
              </p>

              <div className="certificate-not-grid">
                <div>
                  <span>
                    01
                  </span>

                  <strong>
                    A university degree
                  </strong>

                  <p>
                    It is not a degree, diploma or university award.
                  </p>
                </div>

                <div>
                  <span>
                    02
                  </span>

                  <strong>
                    Academic credit
                  </strong>

                  <p>
                    It does not automatically provide credits towards a
                    school, college or university programme.
                  </p>
                </div>

                <div>
                  <span>
                    03
                  </span>

                  <strong>
                    Regulated qualification
                  </strong>

                  <p>
                    It is not automatically a regulated academic or
                    vocational qualification.
                  </p>
                </div>

                <div>
                  <span>
                    04
                  </span>

                  <strong>
                    Professional licence
                  </strong>

                  <p>
                    It does not grant permission to practise in a
                    regulated profession.
                  </p>
                </div>

                <div>
                  <span>
                    05
                  </span>

                  <strong>
                    Examination-board award
                  </strong>

                  <p>
                    It is not an award issued by an examination board
                    unless a genuine arrangement specifically says so.
                  </p>
                </div>

                <div>
                  <span>
                    06
                  </span>

                  <strong>
                    Guaranteed competency
                  </strong>

                  <p>
                    Completion alone does not guarantee mastery in every
                    possible application of the subject.
                  </p>
                </div>
              </div>
            </section>


            {/* ==========================================================
                04
               ========================================================== */}

            <section
              id="eligibility"
              className="legal-section"
            >
              <span className="legal-section-number">
                04
              </span>

              <h2>
                Eligibility for certificates
              </h2>

              <p>
                Only learning activities identified as certificate-
                eligible should result in a certificate.
              </p>

              <p>
                The relevant course page should explain the completion
                requirements before certificate functionality is
                activated.
              </p>

              <p>
                Requirements may include:
              </p>

              <ul>
                <li>
                  completing a specified proportion of lessons;
                </li>

                <li>
                  completing required activities;
                </li>

                <li>
                  submitting required quizzes or checks;
                </li>

                <li>
                  achieving a stated threshold where an assessed
                  learning check is used; or
                </li>

                <li>
                  meeting another clearly published completion rule.
                </li>
              </ul>
            </section>


            {/* ==========================================================
                05
               ========================================================== */}

            <section
              id="assessment"
              className="legal-section"
            >
              <span className="legal-section-number">
                05
              </span>

              <h2>
                Assessments and learning checks
              </h2>

              <p>
                Some courses may include quizzes, exercises or other
                checks intended to reinforce learning.
              </p>

              <p>
                Where a certificate depends on a passing threshold, the
                course should state that requirement clearly.
              </p>

              <p>
                Unless explicitly described otherwise, internal quizzes
                and checks are educational assessments created for My
                Academic Tutor and should not be interpreted as formal
                examinations issued by an external academic body.
              </p>


              <div className="legal-callout">
                <strong>
                  Integrity still applies
                </strong>

                <p>
                  Where completion depends on individual learning checks,
                  learners should complete those checks themselves.
                  Misrepresentation may result in a certificate being
                  withheld or withdrawn.
                </p>
              </div>

              <Link
                href="/academic-integrity"
                className="legal-inline-link"
              >
                Read Academic Integrity policy

                <Icon
                  name="arrow"
                  size={14}
                />
              </Link>
            </section>


            {/* ==========================================================
                06
               ========================================================== */}

            <section
              id="identity"
              className="legal-section"
            >
              <span className="legal-section-number">
                06
              </span>

              <h2>
                Learner identity and certificate name
              </h2>

              <p>
                When learner accounts and certificates are introduced,
                learners may be asked to provide the name they want
                displayed on a certificate.
              </p>

              <p>
                Learners should provide accurate information and should
                not request certificates in another person&apos;s name or
                use certificates to impersonate someone else.
              </p>

              <p>
                The precise identity-verification process, if any, will
                depend on the type of certificate being issued.
              </p>

              <p>
                A standard completion certificate should not imply that
                My Academic Tutor has independently verified a
                learner&apos;s legal identity unless such verification
                has actually taken place.
              </p>
            </section>


            {/* ==========================================================
                07
               ========================================================== */}

            <section
              id="verification"
              className="legal-section"
            >
              <span className="legal-section-number">
                07
              </span>

              <h2>
                Certificate verification
              </h2>

              <p>
                The intended production certificate system should allow
                certificates to be checked against a unique certificate
                record.
              </p>

              <p>
                A future certificate may contain information such as:
              </p>

              <ul>
                <li>
                  the learner&apos;s displayed name;
                </li>

                <li>
                  the course or pathway title;
                </li>

                <li>
                  the date of completion;
                </li>

                <li>
                  a unique certificate identifier; and
                </li>

                <li>
                  a verification link or comparable verification
                  mechanism.
                </li>
              </ul>

              <div className="legal-callout">
                <strong>
                  Verification is not yet live
                </strong>

                <p>
                  We should not publish verification claims until the
                  database and public verification mechanism actually
                  exist.
                </p>
              </div>
            </section>


            {/* ==========================================================
                08
               ========================================================== */}

            <section
              id="sharing"
              className="legal-section"
            >
              <span className="legal-section-number">
                08
              </span>

              <h2>
                Sharing your certificate
              </h2>

              <p>
                Learners may generally share a valid certificate as a
                record of learning—for example on a CV, portfolio or
                professional profile.
              </p>

              <p>
                However, the certificate must be described accurately.
              </p>

              <div className="certificate-sharing-example">
                <div className="allowed">
                  <span>
                    ✓
                  </span>

                  <div>
                    <strong>
                      Appropriate
                    </strong>

                    <p>
                      “Completed the Regression Modelling course with
                      My Academic Tutor.”
                    </p>
                  </div>
                </div>

                <div className="prohibited">
                  <span>
                    ×
                  </span>

                  <div>
                    <strong>
                      Misleading
                    </strong>

                    <p>
                      “Qualified Statistician certified by My Academic
                      Tutor” where no such professional qualification
                      exists.
                    </p>
                  </div>
                </div>
              </div>

              <p>
                Learners are responsible for ensuring that statements
                made about certificates are accurate and do not imply
                accreditation, licensing or professional status that has
                not been awarded.
              </p>
            </section>


            {/* ==========================================================
                09
               ========================================================== */}

            <section
              id="changes"
              className="legal-section"
            >
              <span className="legal-section-number">
                09
              </span>

              <h2>
                Changes to certificate requirements
              </h2>

              <p>
                Course structures and certificate requirements may
                evolve as educational content is improved.
              </p>

              <p>
                Where changes affect learners who are already actively
                working towards a certificate, we should take reasonable
                steps to avoid unfairly changing the requirements after
                substantial progress has already been made.
              </p>

              <p>
                Certificate requirements displayed when a learner begins
                a course should therefore be recorded where practical.
              </p>
            </section>


            {/* ==========================================================
                10
               ========================================================== */}

            <section
              id="withdrawal"
              className="legal-section"
            >
              <span className="legal-section-number">
                10
              </span>

              <h2>
                Withholding or withdrawing a certificate
              </h2>

              <p>
                We may withhold, invalidate or withdraw a certificate
                where there is a reasonable basis to believe that it was
                obtained improperly.
              </p>

              <p>
                Examples may include:
              </p>

              <ul>
                <li>
                  fraudulent account activity;
                </li>

                <li>
                  deliberate identity misrepresentation;
                </li>

                <li>
                  falsification of completion records;
                </li>

                <li>
                  serious misuse of assessment functionality; or
                </li>

                <li>
                  technical error resulting in a certificate being
                  issued when completion requirements were not met.
                </li>
              </ul>

              <p>
                Where practicable, the learner should be given an
                opportunity to raise a genuine error or explain relevant
                circumstances.
              </p>
            </section>


            {/* ==========================================================
                11
               ========================================================== */}

            <section
              id="contact"
              className="legal-section legal-section-last"
            >
              <span className="legal-section-number">
                11
              </span>

              <h2>
                Questions about certificates
              </h2>

              <p>
                If you have a question about certificate eligibility,
                completion requirements or how a certificate may be
                described, contact My Academic Tutor.
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
                  href="/courses"
                  className="button button-outline"
                >
                  Explore courses
                </Link>
              </div>
            </section>
          </article>
        </div>
      </section>


      {/* ==================================================================
          PRINCIPLE
         ================================================================== */}

      <section className="section dark">
        <div className="shell">
          <div className="certificate-principle">
            <span className="eyebrow light">
              The certificate standard
            </span>

            <h2>
              Say exactly what was completed.
              <br />
              Nothing more.
            </h2>

            <p>
              A trustworthy certificate is valuable because its meaning
              is clear—not because its wording tries to make the
              credential sound more impressive than it is.
            </p>
          </div>
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
                Learning, integrity and platform terms.
              </h2>
            </div>

            <div className="legal-related-grid">
              <Link href="/academic-integrity">
                <span>
                  01
                </span>

                <strong>
                  Academic Integrity
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

              <Link href="/privacy">
                <span>
                  03
                </span>

                <strong>
                  Privacy
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