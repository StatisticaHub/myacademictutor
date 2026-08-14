import type {
  Metadata,
} from "next";

import Link from "next/link";

import {
  redirect,
} from "next/navigation";

import {
  updateProfile,
} from "@/app/account/actions";

import {
  createClient,
} from "@/lib/supabase/server";


export const dynamic =
  "force-dynamic";


export const metadata:
  Metadata = {

  title:
    "Account & Profile",

  description:
    "Manage your My Academic Tutor learner profile.",

  robots: {
    index:
      false,
    follow:
      false,
  },
};


type PageProps = {
  searchParams:
    Promise<{
      updated?:
        string;
      error?:
        string;
    }>;
};


function normaliseSubject(
  value:
    string |
    null |
    undefined
) {
  const cleaned =
    value
      ?.trim()
      .toLowerCase();


  switch (
    cleaned
  ) {
    case "statistics":
      return "statistics";

    case "mathematics":
    case "maths":
      return "mathematics";

    case "data science":
    case "data-science":
      return "data-science";

    case "bioinformatics":
      return "bioinformatics";

    case "computer science":
    case "computer-science":
      return "computer-science";

    default:
      return "";
  }
}


function normaliseLevel(
  value:
    string |
    null |
    undefined
) {
  const cleaned =
    value
      ?.trim()
      .toLowerCase();


  switch (
    cleaned
  ) {
    case "high school":
    case "school":
    case "high-school":
      return "high-school";

    case "undergraduate":
    case "under grad":
    case "under-grad":
      return "undergraduate";

    case "postgraduate":
    case "post graduate":
    case "post-graduate":
      return "postgraduate";

    case "casual":
    case "learn for yourself":
      return "casual";

    default:
      return "";
  }
}


export default async function AccountPage({
  searchParams,
}: PageProps) {

  const params =
    await searchParams;


  const supabase =
    await createClient();


  const {
    data:
      claimsData,
    error:
      claimsError,
  } =
    await supabase
      .auth
      .getClaims();


  const claims =
    claimsData
      ?.claims;


  const userId =
    typeof claims
      ?.sub ===
    "string"
      ? claims.sub
      : null;


  if (
    claimsError ||
    !userId
  ) {
    redirect(
      "/login?next=/account"
    );
  }


  const email =
    typeof claims
      ?.email ===
    "string"
      ? claims.email
      : "";


  const [
    profileResult,
    enrolmentCountResult,
    certificateCountResult,
  ] =
    await Promise.all([

      supabase
        .from(
          "profiles"
        )
        .select(
          `
            full_name,
            preferred_subject,
            learner_level,
            created_at,
            updated_at
          `
        )
        .eq(
          "id",
          userId
        )
        .maybeSingle(),

      supabase
        .from(
          "enrollments"
        )
        .select(
          "*",
          {
            count:
              "exact",
            head:
              true,
          }
        )
        .eq(
          "user_id",
          userId
        ),

      supabase
        .from(
          "certificates"
        )
        .select(
          "*",
          {
            count:
              "exact",
            head:
              true,
          }
        )
        .eq(
          "user_id",
          userId
        )
        .is(
          "revoked_at",
          null
        ),
    ]);


  const profile =
    profileResult
      .data;


  const fullName =
    profile
      ?.full_name
      ?.trim() ||
    "";


  const subject =
    normaliseSubject(
      profile
        ?.preferred_subject
    );


  const level =
    normaliseLevel(
      profile
        ?.learner_level
    );


  return (
    <main className="account-page">

      <section className="account-hero">

        <div className="account-shell">

          <span className="eyebrow light">
            Learner account
          </span>

          <h1>
            Account & profile.
          </h1>

          <p>
            Keep your learner details
            up to date and manage the
            information used across
            your dashboard and future
            course certificates.
          </p>

        </div>

      </section>


      <section className="account-content">

        <div className="account-shell account-layout">

          <aside className="account-side">

            <div className="account-identity-card">

              <span>
                Signed in as
              </span>

              <strong>
                {fullName ||
                  email.split(
                    "@"
                  )[0] ||
                  "Learner"}
              </strong>

              <small>
                {email}
              </small>

            </div>


            <nav
              className="account-nav"
              aria-label="Account navigation"
            >

              <Link
                href="/account"
                className="active"
              >
                Profile
              </Link>

              <Link href="/dashboard">
                Dashboard
              </Link>

              <Link href="/courses">
                Courses
              </Link>

              <Link href="/certificate-policy">
                Certificate policy
              </Link>

            </nav>


            <form
              action="/auth/signout"
              method="post"
            >
              <button
                type="submit"
                className="account-signout"
              >
                Sign out
              </button>
            </form>

          </aside>


          <div className="account-main">

            {params.updated ===
            "1" && (
              <div className="account-message success">
                Profile saved
                successfully.
              </div>
            )}


            {params.error && (
              <div className="account-message error">
                {params.error}
              </div>
            )}


            <section className="account-summary-grid">

              <article>
                <span>
                  Enrolled courses
                </span>

                <strong>
                  {enrolmentCountResult
                    .count ??
                    0}
                </strong>
              </article>


              <article>
                <span>
                  Certificates
                </span>

                <strong>
                  {certificateCountResult
                    .count ??
                    0}
                </strong>
              </article>


              <article>
                <span>
                  Account email
                </span>

                <strong className="account-summary-email">
                  {email}
                </strong>
              </article>

            </section>


            <section className="account-card">

              <div className="account-card-heading">

                <span className="eyebrow">
                  Personal details
                </span>

                <h2>
                  Your learner profile
                </h2>

                <p>
                  These details help us
                  personalise your
                  learning experience.
                </p>

              </div>


              <form
                action={
                  updateProfile
                }
                className="account-form"
              >

                <div className="account-field">

                  <label htmlFor="fullName">
                    Full name
                  </label>

                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    defaultValue={
                      fullName
                    }
                    autoComplete="name"
                    required
                    minLength={
                      2
                    }
                    maxLength={
                      100
                    }
                  />

                  <small>
                    This name will be
                    used for future
                    certificates issued
                    after the profile is
                    updated.
                  </small>

                </div>


                <div className="account-field">

                  <label htmlFor="email">
                    Email address
                  </label>

                  <input
                    id="email"
                    type="email"
                    value={
                      email
                    }
                    readOnly
                    disabled
                  />

                  <small>
                    Your sign-in email is
                    managed through your
                    authenticated
                    account.
                  </small>

                </div>


                <div className="account-field">

                  <label htmlFor="learnerLevel">
                    Academic level
                  </label>

                  <select
                    id="learnerLevel"
                    name="learnerLevel"
                    defaultValue={
                      level
                    }
                  >
                    <option value="">
                      Select a level
                    </option>

                    <option value="high-school">
                      High School
                    </option>

                    <option value="undergraduate">
                      Undergraduate
                    </option>

                    <option value="postgraduate">
                      Postgraduate
                    </option>

                    <option value="casual">
                      Learn for Yourself
                    </option>
                  </select>

                </div>


                <div className="account-field">

                  <label htmlFor="preferredSubject">
                    Preferred subject
                  </label>

                  <select
                    id="preferredSubject"
                    name="preferredSubject"
                    defaultValue={
                      subject
                    }
                  >
                    <option value="">
                      Select a subject
                    </option>

                    <option value="statistics">
                      Statistics
                    </option>

                    <option value="mathematics">
                      Mathematics
                    </option>

                    <option value="data-science">
                      Data Science
                    </option>

                    <option value="bioinformatics">
                      Bioinformatics
                    </option>

                    <option value="computer-science">
                      Computer Science
                    </option>
                  </select>

                </div>


                <div className="account-form-actions">

                  <button
                    type="submit"
                    className="button"
                  >
                    Save profile
                  </button>


                  <Link
                    href="/dashboard"
                    className="button button-outline"
                  >
                    Back to dashboard
                  </Link>

                </div>

              </form>

            </section>


            <section className="account-card account-security-card">

              <div className="account-card-heading">

                <span className="eyebrow">
                  Account security
                </span>

                <h2>
                  Sign-in & security
                </h2>

                <p>
                  Your course progress,
                  assessment results and
                  certificates remain
                  linked to this
                  authenticated account.
                </p>

              </div>


              <div className="account-security-row">

                <div>
                  <strong>
                    Signed-in email
                  </strong>

                  <span>
                    {email}
                  </span>
                </div>


                <Link
                  href="/login"
                  className="button button-outline"
                >
                  Sign-in page
                </Link>

              </div>

            </section>

          </div>

        </div>

      </section>

    </main>
  );
}
