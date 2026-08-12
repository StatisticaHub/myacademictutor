import type { Metadata } from "next";

import Link from "next/link";

import {
  login,
  signup,
} from "./actions";


export const metadata: Metadata = {
  title: "Learner Login",

  description:
    "Sign in or create your My Academic Tutor learner account.",

  robots: {
    index: false,
    follow: false,
  },
};


type LoginPageProps = {
  searchParams: Promise<{
    mode?: string;
    error?: string;
    message?: string;
  }>;
};


export default async function LoginPage({
  searchParams,
}: LoginPageProps) {
  const params =
    await searchParams;

  const signupMode =
    params.mode === "signup";


  return (
    <main className="auth-page">
      <div className="shell auth-layout">

        {/* LEFT */}

        <section className="auth-copy">
          <span className="eyebrow">
            Learner account
          </span>

          <h1>
            Learn deeply.
            <br />
            Keep progressing.
          </h1>

          <p>
            Your learner account brings
            your courses, progress and
            learning activity together
            in one place.
          </p>


          <div className="auth-points">
            <div>
              <strong>
                01
              </strong>

              <span>
                Access your enrolled
                courses
              </span>
            </div>

            <div>
              <strong>
                02
              </strong>

              <span>
                Track lessons and
                progress
              </span>
            </div>

            <div>
              <strong>
                03
              </strong>

              <span>
                Continue where you
                left off
              </span>
            </div>
          </div>
        </section>


        {/* CARD */}

        <section className="auth-card">

          <div className="auth-tabs">
            <Link
              href="/login"
              className={
                !signupMode
                  ? "active"
                  : ""
              }
            >
              Sign in
            </Link>

            <Link
              href="/login?mode=signup"
              className={
                signupMode
                  ? "active"
                  : ""
              }
            >
              Create account
            </Link>
          </div>


          <div className="auth-card-heading">
            <span className="eyebrow">
              {signupMode
                ? "New learner"
                : "Welcome back"}
            </span>

            <h2>
              {signupMode
                ? "Create your account"
                : "Sign in to continue"}
            </h2>

            <p>
              {signupMode
                ? "Create a learner account to enrol in courses and track your progress."
                : "Enter your details to return to your learning dashboard."}
            </p>
          </div>


          {params.error && (
            <div className="auth-message auth-error">
              {params.error}
            </div>
          )}


          {params.message && (
            <div className="auth-message auth-success">
              {params.message}
            </div>
          )}


          <form className="auth-form">

            {signupMode && (
              <div className="auth-field">
                <label htmlFor="fullName">
                  Full name
                </label>

                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  placeholder="Your full name"
                  autoComplete="name"
                  required
                />
              </div>
            )}


            <div className="auth-field">
              <label htmlFor="email">
                Email address
              </label>

              <input
                id="email"
                name="email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                required
              />
            </div>


            <div className="auth-field">
              <label htmlFor="password">
                Password
              </label>

              <input
                id="password"
                name="password"
                type="password"
                placeholder={
                  signupMode
                    ? "At least 8 characters"
                    : "Enter your password"
                }
                minLength={8}
                autoComplete={
                  signupMode
                    ? "new-password"
                    : "current-password"
                }
                required
              />
            </div>


            <button
              type="submit"
              className="button auth-primary-button"
              formAction={
                signupMode
                  ? signup
                  : login
              }
            >
              {signupMode
                ? "Create learner account"
                : "Sign in"}
            </button>

          </form>


          <div className="auth-bottom">
            {signupMode ? (
              <p>
                Already have an account?{" "}
                <Link href="/login">
                  Sign in
                </Link>
              </p>
            ) : (
              <p>
                New to My Academic Tutor?{" "}
                <Link href="/login?mode=signup">
                  Create an account
                </Link>
              </p>
            )}


            <p className="auth-legal">
              By continuing, you agree to
              our{" "}
              <Link href="/terms">
                Terms
              </Link>{" "}
              and{" "}
              <Link href="/privacy">
                Privacy Notice
              </Link>.
            </p>
          </div>

        </section>

      </div>
    </main>
  );
}