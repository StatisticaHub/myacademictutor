#!/bin/bash
set -e

echo "Installing learner account, auth-aware header and certificate library..."

if [ ! -f package.json ]; then
  echo "ERROR: Run this script from the root of myacademictutor-premium."
  exit 1
fi

mkdir -p "components"
cat > 'components/Header.tsx' <<'__MAT_EOF__'
"use client";

import Image from "next/image";
import Link from "next/link";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

import {
  createClient,
} from "@/lib/supabase/client";

import {
  subjects,
} from "@/lib/data";


type AuthState =
  | "loading"
  | "signed-out"
  | "signed-in";


export default function Header() {

  const supabase =
    useMemo(
      () =>
        createClient(),
      []
    );


  const [
    authState,
    setAuthState,
  ] =
    useState<AuthState>(
      "loading"
    );


  const [
    mobileOpen,
    setMobileOpen,
  ] =
    useState(false);


  const [
    subjectsOpen,
    setSubjectsOpen,
  ] =
    useState(false);


  useEffect(
    () => {

      let active =
        true;


      supabase
        .auth
        .getSession()
        .then(
          ({
            data,
          }) => {

            if (!active) {
              return;
            }


            setAuthState(
              data.session
                ? "signed-in"
                : "signed-out"
            );
          }
        );


      const {
        data:
          authListener,
      } =
        supabase
          .auth
          .onAuthStateChange(
            (
              _event,
              session
            ) => {

              setAuthState(
                session
                  ? "signed-in"
                  : "signed-out"
              );
            }
          );


      return () => {
        active =
          false;

        authListener
          .subscription
          .unsubscribe();
      };
    },
    [
      supabase,
    ]
  );


  function closeMenus() {
    setMobileOpen(
      false
    );

    setSubjectsOpen(
      false
    );
  }


  const signedIn =
    authState ===
    "signed-in";


  return (
    <>
      <header className="site-header">

        <div className="shell header-inner">

          <Link
            href="/"
            className="brand"
            aria-label="My Academic Tutor homepage"
            onClick={
              closeMenus
            }
          >
            <Image
              src="/logo.png"
              alt=""
              width={
                44
              }
              height={
                44
              }
              className="brand-logo"
              priority
            />

            <span className="brand-wordmark">
              <b>
                My Academic Tutor
              </b>

              <span>
                Learn with direction
              </span>
            </span>
          </Link>


          <nav
            className="desktop-nav"
            aria-label="Main navigation"
          >

            <div className="nav-drop">

              <button
                type="button"
                aria-expanded={
                  subjectsOpen
                }
                onClick={() =>
                  setSubjectsOpen(
                    (
                      current
                    ) =>
                      !current
                  )
                }
              >
                Subjects
              </button>


              {subjectsOpen && (
                <div className="mega-menu">

                  <div className="mega-intro">

                    <span className="eyebrow light">
                      Five academic pillars
                    </span>

                    <h3>
                      Learn the subjects
                      that power modern
                      quantitative work.
                    </h3>

                    <p>
                      Build strong
                      foundations and
                      progress into
                      applied,
                      computational and
                      research-level
                      learning.
                    </p>

                    <Link
                      href="/subjects"
                      className="button button-white"
                      onClick={
                        closeMenus
                      }
                    >
                      Explore all subjects
                    </Link>

                  </div>


                  <div className="mega-subjects">

                    {subjects.map(
                      (
                        subject
                      ) => (

                        <Link
                          key={
                            subject.slug
                          }
                          href={`/subjects/${subject.slug}`}
                          className={`mega-subject ${subject.accent}`}
                          onClick={
                            closeMenus
                          }
                        >

                          <span className="subject-symbol">
                            {subject.symbol}
                          </span>


                          <span>
                            <b>
                              {subject.name}
                            </b>

                            <small>
                              {subject.short}
                            </small>
                          </span>


                          <span
                            aria-hidden="true"
                          >
                            →
                          </span>

                        </Link>

                      )
                    )}

                  </div>

                </div>
              )}

            </div>


            <Link
              href="/learning"
              onClick={
                closeMenus
              }
            >
              Learning
            </Link>


            <Link
              href="/pathways"
              onClick={
                closeMenus
              }
            >
              Pathways
            </Link>


            <Link
              href="/labs"
              onClick={
                closeMenus
              }
            >
              Labs
            </Link>


            <Link
              href="/tutoring"
              onClick={
                closeMenus
              }
            >
              Tutoring
            </Link>

          </nav>


          <div className="header-actions">

            <Link
              href="/search"
              className="icon-button"
              aria-label="Search"
              onClick={
                closeMenus
              }
            >
              ⌕
            </Link>


            {authState ===
            "loading" ? (

              <span
                className="header-auth-placeholder"
                aria-hidden="true"
              />

            ) : signedIn ? (

              <>
                <Link
                  href="/dashboard"
                  className="signin-link"
                  onClick={
                    closeMenus
                  }
                >
                  Dashboard
                </Link>


                <Link
                  href="/account"
                  className="button button-small"
                  onClick={
                    closeMenus
                  }
                >
                  Account
                </Link>
              </>

            ) : (

              <>
                <Link
                  href="/login"
                  className="signin-link"
                  onClick={
                    closeMenus
                  }
                >
                  Sign In
                </Link>


                <Link
                  href="/courses"
                  className="button button-small"
                  onClick={
                    closeMenus
                  }
                >
                  Start learning
                </Link>
              </>

            )}


            <button
              type="button"
              className="mobile-menu-button icon-button"
              aria-label={
                mobileOpen
                  ? "Close menu"
                  : "Open menu"
              }
              aria-expanded={
                mobileOpen
              }
              onClick={() =>
                setMobileOpen(
                  (
                    current
                  ) =>
                    !current
                )
              }
            >
              {mobileOpen
                ? "×"
                : "☰"}
            </button>

          </div>

        </div>

      </header>


      {mobileOpen && (
        <div className="mobile-panel">

          <div className="shell mobile-panel-inner">

            <div className="mobile-panel-group">
              <span>
                Learn
              </span>

              <Link
                href="/subjects"
                onClick={
                  closeMenus
                }
              >
                Subjects
              </Link>

              <Link
                href="/courses"
                onClick={
                  closeMenus
                }
              >
                Courses
              </Link>

              <Link
                href="/learning"
                onClick={
                  closeMenus
                }
              >
                Learning
              </Link>

              <Link
                href="/pathways"
                onClick={
                  closeMenus
                }
              >
                Pathways
              </Link>

              <Link
                href="/labs"
                onClick={
                  closeMenus
                }
              >
                Interactive labs
              </Link>
            </div>


            <div className="mobile-panel-group">
              <span>
                Support
              </span>

              <Link
                href="/tutoring"
                onClick={
                  closeMenus
                }
              >
                Tutoring
              </Link>

              <Link
                href="/resources"
                onClick={
                  closeMenus
                }
              >
                Resources
              </Link>

              <Link
                href="/about"
                onClick={
                  closeMenus
                }
              >
                About
              </Link>

              <Link
                href="/contact"
                onClick={
                  closeMenus
                }
              >
                Contact
              </Link>
            </div>


            <div className="mobile-panel-group">
              <span>
                {signedIn
                  ? "Your account"
                  : "Learner account"}
              </span>

              {signedIn ? (
                <>
                  <Link
                    href="/dashboard"
                    onClick={
                      closeMenus
                    }
                  >
                    Dashboard
                  </Link>

                  <Link
                    href="/account"
                    onClick={
                      closeMenus
                    }
                  >
                    Account & profile
                  </Link>

                  <form
                    action="/auth/signout"
                    method="post"
                  >
                    <button
                      type="submit"
                      className="mobile-signout-link"
                    >
                      Sign out
                    </button>
                  </form>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={
                      closeMenus
                    }
                  >
                    Sign In
                  </Link>

                  <Link
                    href="/courses"
                    onClick={
                      closeMenus
                    }
                  >
                    Start learning
                  </Link>
                </>
              )}
            </div>

          </div>

        </div>
      )}
    </>
  );
}
__MAT_EOF__

mkdir -p "app/account"
cat > 'app/account/actions.ts' <<'__MAT_EOF__'
"use server";

import {
  revalidatePath,
} from "next/cache";

import {
  redirect,
} from "next/navigation";

import {
  createClient,
} from "@/lib/supabase/server";


const allowedSubjects =
  new Set([
    "statistics",
    "mathematics",
    "data-science",
    "bioinformatics",
    "computer-science",
  ]);


const allowedLevels =
  new Set([
    "high-school",
    "undergraduate",
    "postgraduate",
    "casual",
  ]);


export async function updateProfile(
  formData:
    FormData
) {

  const fullName =
    String(
      formData.get(
        "fullName"
      ) ??
        ""
    )
      .trim()
      .replace(
        /\s+/g,
        " "
      );


  const preferredSubject =
    String(
      formData.get(
        "preferredSubject"
      ) ??
        ""
    )
      .trim();


  const learnerLevel =
    String(
      formData.get(
        "learnerLevel"
      ) ??
        ""
    )
      .trim();


  if (
    fullName.length <
      2 ||
    fullName.length >
      100
  ) {
    redirect(
      `/account?error=${encodeURIComponent(
        "Please enter a valid name."
      )}`
    );
  }


  if (
    preferredSubject &&
    !allowedSubjects.has(
      preferredSubject
    )
  ) {
    redirect(
      `/account?error=${encodeURIComponent(
        "Please choose a valid subject."
      )}`
    );
  }


  if (
    learnerLevel &&
    !allowedLevels.has(
      learnerLevel
    )
  ) {
    redirect(
      `/account?error=${encodeURIComponent(
        "Please choose a valid learning level."
      )}`
    );
  }


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


  const userId =
    typeof claimsData
      ?.claims
      ?.sub ===
    "string"
      ? claimsData
          .claims
          .sub
      : null;


  if (
    claimsError ||
    !userId
  ) {
    redirect(
      "/login?next=/account"
    );
  }


  const {
    error,
  } =
    await supabase
      .from(
        "profiles"
      )
      .upsert(
        {
          id:
            userId,

          full_name:
            fullName,

          preferred_subject:
            preferredSubject ||
            null,

          learner_level:
            learnerLevel ||
            null,

          updated_at:
            new Date()
              .toISOString(),
        },
        {
          onConflict:
            "id",
        }
      );


  if (error) {
    redirect(
      `/account?error=${encodeURIComponent(
        "We could not save your profile. Please try again."
      )}`
    );
  }


  revalidatePath(
    "/account"
  );

  revalidatePath(
    "/dashboard"
  );


  redirect(
    "/account?updated=1"
  );
}
__MAT_EOF__

mkdir -p "app/account"
cat > 'app/account/page.tsx' <<'__MAT_EOF__'
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
__MAT_EOF__

mkdir -p "app/dashboard"
cat > 'app/dashboard/page.tsx' <<'__MAT_EOF__'
import type {
  Metadata,
} from "next";

import Link from "next/link";

import {
  redirect,
} from "next/navigation";

import {
  continueCourse,
} from "@/app/courses/[slug]/actions";

import {
  buildCourseProgress,
} from "@/lib/course-progress";

import {
  getCourse,
} from "@/lib/data";

import {
  createClient,
} from "@/lib/supabase/server";


export const metadata:
  Metadata = {

  title:
    "Learner Dashboard",

  description:
    "Your My Academic Tutor learner dashboard.",

  robots: {
    index:
      false,
    follow:
      false,
  },
};


function formatDate(
  value:
    string |
    null
) {
  if (!value) {
    return null;
  }


  return new Intl
    .DateTimeFormat(
      "en-GB",
      {
        day:
          "numeric",

        month:
          "short",

        year:
          "numeric",
      }
    )
    .format(
      new Date(
        value
      )
    );
}


export default async function DashboardPage() {

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


  if (
    claimsError ||
    !claims?.sub
  ) {
    redirect(
      "/login"
    );
  }


  const userId =
    claims.sub;


  const email =
    typeof claims
      .email ===
    "string"
      ? claims.email
      : "";


  const [
    profileResult,
    enrolmentsResult,
    progressResult,
    attemptsResult,
    certificatesResult,
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
            learner_level
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
          `
            course_slug,
            enrolled_at,
            last_opened_at
          `
        )
        .eq(
          "user_id",
          userId
        )
        .order(
          "enrolled_at",
          {
            ascending:
              false,
          }
        ),

      supabase
        .from(
          "lesson_progress"
        )
        .select(
          `
            course_slug,
            lesson_key,
            completed
          `
        )
        .eq(
          "user_id",
          userId
        )
        .eq(
          "completed",
          true
        ),

      supabase
        .from(
          "assessment_attempts"
        )
        .select(
          `
            course_slug,
            assessment_key,
            passed,
            percentage
          `
        )
        .eq(
          "user_id",
          userId
        )
        .eq(
          "passed",
          true
        ),

      supabase
        .from(
          "certificates"
        )
        .select(
          `
            course_slug,
            certificate_code,
            learner_name,
            course_title,
            completed_at,
            final_assessment_percentage,
            issued_at,
            revoked_at
          `
        )
        .eq(
          "user_id",
          userId
        )
        .is(
          "revoked_at",
          null
        )
        .order(
          "issued_at",
          {
            ascending:
              false,
          }
        ),
    ]);


  const profile =
    profileResult
      .data;


  const enrolments =
    enrolmentsResult
      .data ??
    [];


  const progress =
    progressResult
      .data ??
    [];


  const attempts =
    attemptsResult
      .data ??
    [];


  const certificates =
    certificatesResult
      .data ??
    [];


  const learnerName =
    profile
      ?.full_name
      ?.trim() ||
    email.split(
      "@"
    )[0] ||
    "Learner";


  const completedLessons =
    progress.length;


  const enrolledCourses =
    enrolments.map(
      (
        enrolment
      ) => {

        const course =
          getCourse(
            enrolment
              .course_slug
          );


        const completedKeys =
          progress
            .filter(
              (item) =>
                item.course_slug ===
                enrolment.course_slug
            )
            .map(
              (item) =>
                item.lesson_key
            );


        const passedKeys =
          attempts
            .filter(
              (item) =>
                item.course_slug ===
                enrolment.course_slug
            )
            .map(
              (item) =>
                item.assessment_key
            );


        const summary =
          buildCourseProgress(
            enrolment
              .course_slug,
            completedKeys,
            passedKeys
          );


        return {
          slug:
            enrolment
              .course_slug,

          title:
            course?.title ??
            enrolment
              .course_slug,

          summary,

          enrolledAt:
            formatDate(
              enrolment
                .enrolled_at
            ),

          lastOpenedAt:
            formatDate(
              enrolment
                .last_opened_at
            ),
        };
      }
    );


  const completedCourses =
    enrolledCourses
      .filter(
        (course) =>
          course.summary
            .courseComplete
      )
      .length;


  return (
    <main className="dashboard-live">

      <section className="dashboard-live-hero">

        <div className="shell">

          <div className="dashboard-live-top">

            <div>

              <span className="eyebrow">
                Learner dashboard
              </span>

              <h1>
                Welcome back,
                <br />
                {learnerName}.
              </h1>

              <p>
                Continue from your next
                required lesson, track
                assessments and keep
                your completed
                certificates in one
                place.
              </p>

            </div>


            <div className="dashboard-hero-actions">

              <Link
                href="/account"
                className="button button-white"
              >
                Account
              </Link>


              <form
                action="/auth/signout"
                method="post"
              >
                <button
                  type="submit"
                  className="dashboard-signout"
                >
                  Sign out
                </button>
              </form>

            </div>

          </div>


          <div className="dashboard-identity">

            <span>
              Signed in as
            </span>

            <strong>
              {email}
            </strong>

          </div>

        </div>

      </section>


      <section className="dashboard-live-content">

        <div className="shell">

          <div className="dashboard-stat-grid">

            <article className="dashboard-stat">

              <span>
                Enrolled courses
              </span>

              <strong>
                {enrolledCourses.length}
              </strong>

              <p>
                Courses currently in
                your learning library.
              </p>

            </article>


            <article className="dashboard-stat">

              <span>
                Lessons completed
              </span>

              <strong>
                {completedLessons}
              </strong>

              <p>
                Completed lessons across
                your enrolled courses.
              </p>

            </article>


            <article className="dashboard-stat">

              <span>
                Courses completed
              </span>

              <strong>
                {completedCourses}
              </strong>

              <p>
                Courses where every
                required component has
                been passed.
              </p>

            </article>


            <article className="dashboard-stat">

              <span>
                Certificates
              </span>

              <strong>
                {certificates.length}
              </strong>

              <p>
                Issued certificates
                available in your
                learner account.
              </p>

            </article>

          </div>


          <div className="dashboard-profile-strip">

            <div>
              <span>
                Learning level
              </span>

              <strong>
                {profile
                  ?.learner_level ||
                  "Not set"}
              </strong>
            </div>


            <div>
              <span>
                Preferred subject
              </span>

              <strong>
                {profile
                  ?.preferred_subject ||
                  "Not set"}
              </strong>
            </div>


            <Link
              href="/account"
            >
              Edit profile →
            </Link>

          </div>


          <div className="dashboard-section-heading">

            <div>

              <span className="eyebrow">
                My learning
              </span>

              <h2>
                Your courses
              </h2>

            </div>


            <Link
              href="/courses"
              className="button"
            >
              Browse courses
            </Link>

          </div>


          {enrolledCourses.length >
          0 ? (

            <div className="dashboard-course-list">

              {enrolledCourses.map(
                (
                  course
                ) => (

                  <article
                    key={
                      course.slug
                    }
                    className="dashboard-course dashboard-course-expanded"
                  >

                    <div className="dashboard-course-main">

                      <div className="dashboard-course-title-row">

                        <div>

                          <span className="dashboard-course-label">
                            Enrolled course
                          </span>

                          <h3>
                            {course.title}
                          </h3>

                        </div>


                        <span
                          className={[
                            "dashboard-course-status",

                            course.summary
                              .courseComplete
                              ? "complete"
                              : "in-progress",
                          ].join(
                            " "
                          )}
                        >
                          {course.summary
                            .courseComplete
                            ? "Complete"
                            : "In progress"}
                        </span>

                      </div>


                      <div className="dashboard-course-requirements">

                        <article>

                          <span>
                            Lessons
                          </span>

                          <strong>
                            {course.summary
                              .completedLessons}
                            /
                            {course.summary
                              .totalLessons}
                          </strong>

                        </article>


                        <article>

                          <span>
                            Module checkpoints
                          </span>

                          <strong>
                            {course.summary
                              .totalCheckpoints >
                            0
                              ? `${course.summary.passedCheckpoints}/${course.summary.totalCheckpoints}`
                              : "—"}
                          </strong>

                        </article>


                        <article>

                          <span>
                            Final assessment
                          </span>

                          <strong>
                            {course.summary
                              .finalAssessmentStatus ===
                            "passed"
                              ? "Passed"
                              : course.summary
                                    .finalAssessmentStatus ===
                                  "ready"
                                ? "Ready"
                                : course.summary
                                      .finalAssessmentStatus ===
                                    "locked"
                                  ? "Locked"
                                  : "Not required"}
                          </strong>

                        </article>


                        <article>

                          <span>
                            Certificate
                          </span>

                          <strong>
                            {course.summary
                              .certificateEligible
                              ? "Eligible"
                              : "Not yet"}
                          </strong>

                        </article>

                      </div>


                      <div className="dashboard-course-meta">

                        {course.lastOpenedAt && (
                          <span>
                            Last opened{" "}
                            {course.lastOpenedAt}
                          </span>
                        )}


                        {!course.lastOpenedAt &&
                          course.enrolledAt && (
                            <span>
                              Enrolled{" "}
                              {course.enrolledAt}
                            </span>
                          )}

                      </div>


                      <div className="dashboard-progress">

                        <div className="dashboard-progress-track">

                          <span
                            style={{
                              width:
                                `${course.summary.overallPercentage}%`,
                            }}
                          />

                        </div>


                        <strong>
                          {course.summary
                            .overallPercentage}
                          %
                        </strong>

                      </div>


                      <p className="dashboard-next-step">
                        Next step:{" "}
                        <strong>
                          {course.summary
                            .nextActionLabel}
                        </strong>
                      </p>

                    </div>


                    <form
                      action={
                        continueCourse
                      }
                      className="dashboard-course-continue-form"
                    >

                      <input
                        type="hidden"
                        name="courseSlug"
                        value={
                          course.slug
                        }
                      />


                      <button
                        type="submit"
                        className="dashboard-course-link"
                      >
                        {course.summary
                          .courseComplete
                          ? "View completion"
                          : "Continue"}

                        <span>
                          →
                        </span>
                      </button>

                    </form>

                  </article>

                )
              )}

            </div>

          ) : (

            <div className="dashboard-empty">

              <span className="eyebrow">
                Your library is ready
              </span>

              <h3>
                Start your first course.
              </h3>

              <p>
                You have not enrolled in
                a course yet. Explore
                the catalogue and choose
                the subject and level
                that fits your goals.
              </p>

              <Link
                href="/courses"
                className="button"
              >
                Explore courses
              </Link>

            </div>

          )}


          <div className="dashboard-section-heading dashboard-certificates-heading">

            <div>

              <span className="eyebrow">
                Achievements
              </span>

              <h2>
                My certificates
              </h2>

            </div>


            <Link
              href="/certificate-policy"
              className="button button-outline"
            >
              Certificate policy
            </Link>

          </div>


          {certificates.length >
          0 ? (

            <div className="dashboard-certificate-grid">

              {certificates.map(
                (
                  certificate
                ) => (

                  <article
                    key={
                      certificate
                        .certificate_code
                    }
                    className="dashboard-certificate-card"
                  >

                    <div className="dashboard-certificate-mark">
                      MAT
                    </div>


                    <div>

                      <span>
                        Certificate of completion
                      </span>

                      <h3>
                        {certificate
                          .course_title}
                      </h3>


                      <div className="dashboard-certificate-meta">

                        <span>
                          Issued to{" "}
                          <strong>
                            {certificate
                              .learner_name}
                          </strong>
                        </span>


                        <span>
                          Completed{" "}
                          {formatDate(
                            certificate
                              .completed_at
                          )}
                        </span>


                        {certificate
                          .final_assessment_percentage !==
                          null && (
                          <span>
                            Final assessment{" "}
                            {Number(
                              certificate
                                .final_assessment_percentage
                            ).toFixed(
                              0
                            )}
                            %
                          </span>
                        )}

                      </div>


                      <code>
                        {certificate
                          .certificate_code}
                      </code>


                      <div className="dashboard-certificate-actions">

                        <a
                          href={`/courses/${certificate.course_slug}/certificate`}
                          className="button"
                        >
                          Download PDF
                        </a>


                        <Link
                          href={`/certificate/${certificate.certificate_code}`}
                          className="button button-outline"
                        >
                          Verify
                        </Link>

                      </div>

                    </div>

                  </article>

                )
              )}

            </div>

          ) : (

            <div className="dashboard-certificate-empty">

              <div className="dashboard-certificate-mark">
                MAT
              </div>


              <div>

                <h3>
                  Your certificates will
                  appear here.
                </h3>

                <p>
                  Complete all required
                  lessons, module
                  checkpoints and the
                  final assessment in an
                  assessed course to
                  become certificate
                  eligible.
                </p>

              </div>

            </div>

          )}

        </div>

      </section>

    </main>
  );
}
__MAT_EOF__

mkdir -p "scripts"
cat > 'scripts/audit-learner-account.mjs' <<'__MAT_EOF__'
import fs from "node:fs";
import path from "node:path";


const required = [
  "components/Header.tsx",
  "app/account/page.tsx",
  "app/account/actions.ts",
  "app/dashboard/page.tsx",
];


let failed =
  false;


for (
  const relative
  of required
) {

  const full =
    path.join(
      process.cwd(),
      relative
    );


  if (
    fs.existsSync(
      full
    )
  ) {
    console.log(
      `✓ ${relative}`
    );
  } else {
    failed =
      true;

    console.error(
      `✗ Missing ${relative}`
    );
  }
}


const globals =
  path.join(
    process.cwd(),
    "app",
    "globals.css"
  );


if (
  fs.existsSync(
    globals
  )
) {

  const css =
    fs.readFileSync(
      globals,
      "utf8"
    );


  if (
    css.includes(
      "STAGE 5 — LEARNER ACCOUNT"
    )
  ) {
    console.log(
      "✓ Stage 5 CSS"
    );
  } else {
    failed =
      true;

    console.error(
      "✗ Stage 5 CSS not found"
    );
  }
}


if (
  failed
) {
  process.exit(
    1
  );
}


console.log(
  "\nLearner account source audit passed."
);
__MAT_EOF__

if ! grep -q "STAGE 5 — LEARNER ACCOUNT + AUTH-AWARE HEADER + CERTIFICATE LIBRARY" app/globals.css 2>/dev/null; then
  cat >> app/globals.css <<'__MAT_CSS_EOF__'


/* ==========================================================================
   STAGE 5 — LEARNER ACCOUNT + AUTH-AWARE HEADER + CERTIFICATE LIBRARY
   ========================================================================== */

/* HEADER AUTH */

.header-auth-placeholder {
  display: block;
  width: 92px;
  height: 38px;
}

.mobile-panel-group form {
  margin: 0;
}

.mobile-signout-link {
  padding: 0;
  border: 0;
  background: transparent;
  color: inherit;
  text-align: left;
  font: inherit;
  font-size: 16px;
  cursor: pointer;
}


/* ACCOUNT */

.account-page {
  min-height: 100vh;
  background: #f5f1e8;
}

.account-shell {
  width: min(1120px, calc(100% - 40px));
  margin: 0 auto;
}

.account-hero {
  padding: 68px 0 52px;
  background: #111;
  color: #fff;
}

.account-hero h1 {
  margin: 14px 0 14px;
  font: 700 clamp(46px, 7vw, 76px) / .98 Georgia, serif;
  letter-spacing: -.04em;
}

.account-hero p {
  max-width: 700px;
  margin: 0;
  color: #c8c3bb;
  font-size: 18px !important;
  line-height: 1.7;
}

.account-content {
  padding: 36px 0 90px;
}

.account-layout {
  display: grid;
  grid-template-columns: 245px minmax(0, 1fr);
  gap: 30px;
  align-items: start;
}

.account-side {
  position: sticky;
  top: 105px;
  display: grid;
  gap: 14px;
}

.account-identity-card {
  padding: 22px;
  border-radius: 18px;
  background: #111;
  color: #fff;
}

.account-identity-card > span {
  display: block;
  color: #aaa59d;
  font-size: 12px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: .08em;
}

.account-identity-card strong {
  display: block;
  margin-top: 9px;
  font: 700 22px Georgia, serif;
}

.account-identity-card small {
  display: block;
  margin-top: 7px;
  overflow-wrap: anywhere;
  color: #c9c4bc;
  font-size: 14px;
}

.account-nav {
  display: grid;
  padding: 10px;
  border: 1px solid #ded8ce;
  border-radius: 16px;
  background: #fff;
}

.account-nav a {
  padding: 11px 12px;
  border-radius: 10px;
  color: #5f5952;
  font-size: 15px;
  font-weight: 700;
}

.account-nav a:hover,
.account-nav a.active {
  background: #eee9df;
  color: #111;
}

.account-signout {
  width: 100%;
  padding: 12px 14px;
  border: 1px solid #d5cec3;
  border-radius: 999px;
  background: transparent;
  color: #534d46;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
}

.account-main {
  display: grid;
  gap: 18px;
}

.account-message {
  padding: 14px 16px;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 700;
}

.account-message.success {
  border: 1px solid #b8cbb9;
  background: #edf4ed;
  color: #3f5943;
}

.account-message.error {
  border: 1px solid #d8b9b2;
  background: #f8ece9;
  color: #754c46;
}

.account-summary-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 10px;
}

.account-summary-grid article {
  padding: 18px;
  border: 1px solid #ddd6cc;
  border-radius: 15px;
  background: #fff;
}

.account-summary-grid span {
  display: block;
  color: #756e66;
  font-size: 12px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: .06em;
}

.account-summary-grid strong {
  display: block;
  margin-top: 7px;
  font: 700 28px Georgia, serif;
}

.account-summary-email {
  overflow-wrap: anywhere;
  font-size: 16px !important;
  line-height: 1.35;
}

.account-card {
  padding: 28px;
  border: 1px solid #ddd6cc;
  border-radius: 20px;
  background: #fff;
}

.account-card-heading {
  max-width: 680px;
}

.account-card-heading h2 {
  margin: 8px 0;
  font: 700 34px / 1.1 Georgia, serif;
}

.account-card-heading p {
  margin: 0;
  color: #625c55;
  font-size: 16px !important;
  line-height: 1.7;
}

.account-form {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 18px;
  margin-top: 26px;
}

.account-field {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.account-field label {
  color: #403c37;
  font-size: 15px;
  font-weight: 800;
}

.account-field input,
.account-field select {
  width: 100%;
  min-height: 50px;
  padding: 12px 14px;
  border: 1px solid #cec7bd;
  border-radius: 12px;
  background: #fbfaf6;
  color: #111;
  font-size: 16px;
}

.account-field input:disabled {
  color: #7b746c;
  background: #f0ece4;
}

.account-field small {
  color: #706960;
  font-size: 13px;
  line-height: 1.55;
}

.account-form-actions {
  grid-column: 1 / -1;
  display: flex;
  flex-wrap: wrap;
  gap: 9px;
  margin-top: 4px;
}

.account-security-card {
  background: #e9e3d9;
}

.account-security-row {
  display: flex;
  justify-content: space-between;
  gap: 24px;
  align-items: center;
  margin-top: 22px;
  padding-top: 20px;
  border-top: 1px solid #d0c8bc;
}

.account-security-row strong,
.account-security-row span {
  display: block;
}

.account-security-row strong {
  font: 700 18px Georgia, serif;
}

.account-security-row span {
  margin-top: 4px;
  color: #686159;
  font-size: 14px;
}


/* DASHBOARD PROFILE */

.dashboard-hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 9px;
  align-items: center;
}

.dashboard-profile-strip {
  display: grid;
  grid-template-columns: 1fr 1fr auto;
  gap: 12px;
  align-items: center;
  margin-top: 18px;
  padding: 18px 20px;
  border: 1px solid #dcd5ca;
  border-radius: 14px;
  background: #fff;
}

.dashboard-profile-strip span {
  display: block;
  color: #726b63;
  font-size: 12px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: .06em;
}

.dashboard-profile-strip strong {
  display: block;
  margin-top: 4px;
  font: 700 18px Georgia, serif;
}

.dashboard-profile-strip > a {
  font-size: 14px;
  font-weight: 800;
}


/* CERTIFICATE LIBRARY */

.dashboard-certificates-heading {
  margin-top: 54px;
}

.dashboard-certificate-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}

.dashboard-certificate-card {
  display: grid;
  grid-template-columns: 74px minmax(0, 1fr);
  gap: 18px;
  padding: 24px;
  border: 1px solid #d7d0c6;
  border-radius: 18px;
  background: #fff;
}

.dashboard-certificate-mark {
  display: grid;
  width: 64px;
  height: 64px;
  place-items: center;
  border: 1px solid #7e776f;
  border-radius: 50%;
  font: 700 17px Georgia, serif;
}

.dashboard-certificate-card > div:last-child > span {
  color: #756e66;
  font-size: 12px;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: .06em;
}

.dashboard-certificate-card h3 {
  margin: 8px 0 13px;
  font: 700 25px / 1.15 Georgia, serif;
}

.dashboard-certificate-meta {
  display: grid;
  gap: 5px;
  color: #655f57;
  font-size: 14px;
  line-height: 1.5;
}

.dashboard-certificate-card code {
  display: inline-block;
  max-width: 100%;
  margin-top: 14px;
  padding: 7px 9px;
  overflow-wrap: anywhere;
  border-radius: 8px;
  background: #eee9e0;
  color: #3e3934;
  font-size: 12px;
}

.dashboard-certificate-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: 16px;
}

.dashboard-certificate-empty {
  display: grid;
  grid-template-columns: 74px minmax(0, 1fr);
  gap: 18px;
  align-items: center;
  padding: 25px;
  border: 1px dashed #cfc7bb;
  border-radius: 18px;
  background: #f8f5ef;
}

.dashboard-certificate-empty h3 {
  margin: 0;
  font: 700 24px Georgia, serif;
}

.dashboard-certificate-empty p {
  max-width: 680px;
  margin: 7px 0 0;
  color: #625c55;
  font-size: 15px !important;
  line-height: 1.65;
}


@media (max-width: 900px) {

  .account-layout {
    grid-template-columns: 1fr;
  }

  .account-side {
    position: static;
  }

  .account-nav {
    grid-template-columns: repeat(4, 1fr);
  }

  .account-nav a {
    text-align: center;
  }

  .dashboard-certificate-grid {
    grid-template-columns: 1fr;
  }

}


@media (max-width: 700px) {

  .header-auth-placeholder {
    display: none;
  }

  .account-shell {
    width: min(100% - 28px, 1120px);
  }

  .account-hero {
    padding: 50px 0 42px;
  }

  .account-summary-grid,
  .account-form {
    grid-template-columns: 1fr;
  }

  .account-nav {
    grid-template-columns: 1fr 1fr;
  }

  .account-security-row,
  .dashboard-profile-strip {
    grid-template-columns: 1fr;
  }

  .account-security-row {
    align-items: stretch;
    flex-direction: column;
  }

  .dashboard-profile-strip {
    display: grid;
  }

  .dashboard-certificate-card,
  .dashboard-certificate-empty {
    grid-template-columns: 1fr;
  }

  .dashboard-certificate-mark {
    width: 58px;
    height: 58px;
  }

}
__MAT_CSS_EOF__
  echo "Stage 5 CSS appended to app/globals.css"
else
  echo "Stage 5 CSS already present; skipping duplicate append."
fi

echo ""
echo "Installation complete."
echo ""
echo "Run:"
echo "  node scripts/audit-learner-account.mjs"
echo "  npm run build"
echo ""
echo "If build passes:"
echo "  npm run dev"
echo ""
echo "Test:"
echo "  http://localhost:3000/"
echo "  http://localhost:3000/account"
echo "  http://localhost:3000/dashboard"
