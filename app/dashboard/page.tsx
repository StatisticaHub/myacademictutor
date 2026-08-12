import type { Metadata } from "next";
import Link from "next/link";

import Icon from "@/components/Icon";
import SectionHeading from "@/components/SectionHeading";


/* ==========================================================================
   METADATA
   ========================================================================== */

export const metadata: Metadata = {
  title: "Learner Area",

  description:
    "Access your My Academic Tutor learning area for courses, pathways, progress and saved learning.",

  robots: {
    index: false,
    follow: true,
  },
};


/* ==========================================================================
   PAGE
   ========================================================================== */

export default function DashboardPage() {
  return (
    <>
      {/* ==================================================================
          HERO
         ================================================================== */}

      <section className="page-hero dashboard-hero">
        <div className="shell dashboard-hero-grid">
          <div>
            <div className="breadcrumbs">
              Home / Learner Area
            </div>

            <span className="eyebrow dashboard-hero-eyebrow">
              Your learning space
            </span>

            <h1>
              One place for
              <br />
              everything you&apos;re learning.
            </h1>

            <p>
              The learner area will bring together your courses,
              pathways, progress, saved resources and expert support in
              one focused workspace.
            </p>

            <div className="hero-actions">
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

                Course progress
              </span>

              <span>
                <Icon
                  name="check"
                  size={14}
                />

                Saved learning
              </span>

              <span>
                <Icon
                  name="check"
                  size={14}
                />

                Pathway tracking
              </span>

              <span>
                <Icon
                  name="check"
                  size={14}
                />

                Support access
              </span>
            </div>
          </div>


          {/* --------------------------------------------------------------
              Dashboard preview
             -------------------------------------------------------------- */}

          <aside className="dashboard-preview">
            <div className="dashboard-preview-top">
              <div>
                <span className="eyebrow light">
                  Learner dashboard
                </span>

                <h2>
                  Welcome back.
                </h2>
              </div>

              <span className="dashboard-preview-status">
                Preview
              </span>
            </div>


            <div className="dashboard-preview-course">
              <div className="dashboard-preview-course-top">
                <span className="mini-symbol blue">
                  σ
                </span>

                <span className="dashboard-preview-label">
                  Continue learning
                </span>
              </div>

              <h3>
                Regression Modelling
              </h3>

              <p>
                Example of how an active course will appear once
                learner accounts and progress tracking are connected.
              </p>

              <div className="dashboard-preview-progress">
                <div>
                  <span>
                    Course progress
                  </span>

                  <strong>
                    42%
                  </strong>
                </div>

                <div className="dashboard-preview-progress-track">
                  <span />
                </div>
              </div>
            </div>


            <div className="dashboard-preview-stats">
              <div>
                <span>
                  Courses
                </span>

                <strong>
                  —
                </strong>
              </div>

              <div>
                <span>
                  Pathways
                </span>

                <strong>
                  —
                </strong>
              </div>

              <div>
                <span>
                  Completed
                </span>

                <strong>
                  —
                </strong>
              </div>
            </div>


            <small className="dashboard-preview-note">
              This is a design preview. Account authentication and real
              learner data have not yet been connected.
            </small>
          </aside>
        </div>
      </section>


      {/* ==================================================================
          STATUS
         ================================================================== */}

      <section className="dashboard-status-section">
        <div className="shell">
          <div className="dashboard-status">
            <div className="dashboard-status-icon">
              <Icon
                name="spark"
                size={18}
              />
            </div>

            <div>
              <strong>
                Learner accounts are being prepared.
              </strong>

              <p>
                You can already explore subjects, courses, pathways,
                Interactive Labs and tutoring. Personal accounts will be
                connected when authentication and course delivery are
                ready.
              </p>
            </div>

            <Link
              href="/courses"
              className="button button-outline"
            >
              Browse learning

              <Icon
                name="arrow"
                size={15}
              />
            </Link>
          </div>
        </div>
      </section>


      {/* ==================================================================
          FUTURE DASHBOARD CAPABILITIES
         ================================================================== */}

      <section className="section soft">
        <div className="shell">
          <SectionHeading
            eyebrow="Your learner workspace"
            title="Designed around progress, not administration."
            description="The dashboard should help you continue learning quickly, understand where you are and decide what to do next."
          />

          <div className="dashboard-feature-grid">
            <div className="dashboard-feature-card">
              <div className="dashboard-feature-top">
                <span className="dashboard-feature-number">
                  01
                </span>

                <Icon
                  name="book"
                  size={18}
                />
              </div>

              <h3>
                My Courses
              </h3>

              <p>
                See active courses, completed learning and the next
                lesson waiting for you.
              </p>

              <div className="dashboard-feature-preview">
                <span>
                  Active courses
                </span>

                <strong>
                  Your learning library
                </strong>
              </div>
            </div>


            <div className="dashboard-feature-card">
              <div className="dashboard-feature-top">
                <span className="dashboard-feature-number">
                  02
                </span>

                <Icon
                  name="arrow"
                  size={18}
                />
              </div>

              <h3>
                My Pathway
              </h3>

              <p>
                Track progress across a longer academic, technical or
                career learning journey.
              </p>

              <div className="dashboard-feature-preview">
                <span>
                  Current stage
                </span>

                <strong>
                  Know what comes next
                </strong>
              </div>
            </div>


            <div className="dashboard-feature-card">
              <div className="dashboard-feature-top">
                <span className="dashboard-feature-number">
                  03
                </span>

                <Icon
                  name="check"
                  size={18}
                />
              </div>

              <h3>
                Progress
              </h3>

              <p>
                See completed lessons, modules and learning milestones
                without turning progress into meaningless gamification.
              </p>

              <div className="dashboard-feature-preview">
                <span>
                  Learning history
                </span>

                <strong>
                  Evidence of progress
                </strong>
              </div>
            </div>


            <div className="dashboard-feature-card">
              <div className="dashboard-feature-top">
                <span className="dashboard-feature-number">
                  04
                </span>

                <Icon
                  name="spark"
                  size={18}
                />
              </div>

              <h3>
                Saved Learning
              </h3>

              <p>
                Bookmark courses, labs, resources and topics that you
                want to return to later.
              </p>

              <div className="dashboard-feature-preview">
                <span>
                  Saved items
                </span>

                <strong>
                  Build your own library
                </strong>
              </div>
            </div>


            <div className="dashboard-feature-card">
              <div className="dashboard-feature-top">
                <span className="dashboard-feature-number">
                  05
                </span>

                <Icon
                  name="clock"
                  size={18}
                />
              </div>

              <h3>
                Continue Learning
              </h3>

              <p>
                Return directly to the lesson, module or activity where
                you last stopped.
              </p>

              <div className="dashboard-feature-preview">
                <span>
                  Last activity
                </span>

                <strong>
                  Pick up where you left off
                </strong>
              </div>
            </div>


            <div className="dashboard-feature-card">
              <div className="dashboard-feature-top">
                <span className="dashboard-feature-number">
                  06
                </span>

                <Icon
                  name="arrow"
                  size={18}
                />
              </div>

              <h3>
                Expert Support
              </h3>

              <p>
                Move from independent learning into tutoring when a
                specific bottleneck requires human help.
              </p>

              <div className="dashboard-feature-preview">
                <span>
                  Need help?
                </span>

                <strong>
                  Connect learning to support
                </strong>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ==================================================================
          CONTINUE LEARNING EXPERIENCE
         ================================================================== */}

      <section className="section">
        <div className="shell">
          <SectionHeading
            eyebrow="Designed for returning learners"
            title="The first question should be: what should I do next?"
            description="Instead of opening to account settings and administrative details, the learner dashboard should put the next meaningful learning action first."
          />

          <div className="dashboard-learning-preview">
            <div className="dashboard-learning-main">
              <div className="dashboard-learning-heading">
                <div>
                  <span className="eyebrow light">
                    Continue learning
                  </span>

                  <h3>
                    Regression Modelling
                  </h3>

                  <p>
                    Example learner state showing how course progress
                    can become the primary dashboard experience.
                  </p>
                </div>

                <span className="mini-symbol blue">
                  σ
                </span>
              </div>


              <div className="dashboard-learning-module">
                <span>
                  Current module
                </span>

                <strong>
                  Multiple Linear Regression
                </strong>

                <small>
                  Example progress state
                </small>
              </div>


              <div className="dashboard-learning-progress">
                <div>
                  <span>
                    42% complete
                  </span>

                  <span>
                    Example only
                  </span>
                </div>

                <div>
                  <span />
                </div>
              </div>


              <Link
                href="/courses/regression-modelling"
                className="button button-white"
              >
                View example course

                <Icon
                  name="arrow"
                  size={15}
                />
              </Link>
            </div>


            <div className="dashboard-learning-side">
              <div>
                <span>
                  Next lesson
                </span>

                <strong>
                  Interpreting coefficients
                </strong>

                <small>
                  Example dashboard content
                </small>
              </div>

              <div>
                <span>
                  Recommended lab
                </span>

                <strong>
                  Regression Playground
                </strong>

                <small>
                  Interactive reinforcement
                </small>
              </div>

              <div>
                <span>
                  Need support?
                </span>

                <strong>
                  Ask an expert
                </strong>

                <Link href="/tutoring">
                  Explore tutoring →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ==================================================================
          LEARNING HISTORY
         ================================================================== */}

      <section className="section soft">
        <div className="shell">
          <SectionHeading
            eyebrow="Progress that means something"
            title="Track learning without turning education into a scoreboard."
            description="Progress information should answer useful questions: what have you completed, what are you working on and which skills still need attention?"
          />

          <div className="dashboard-history">
            <div className="dashboard-history-row">
              <span className="dashboard-history-number">
                01
              </span>

              <div>
                <span className="eyebrow">
                  Course progress
                </span>

                <h3>
                  Know what you&apos;ve completed.
                </h3>

                <p>
                  Track lessons and modules while keeping the focus on
                  understanding rather than arbitrary points.
                </p>
              </div>
            </div>


            <div className="dashboard-history-row">
              <span className="dashboard-history-number">
                02
              </span>

              <div>
                <span className="eyebrow">
                  Pathway progress
                </span>

                <h3>
                  See how each course contributes to a larger goal.
                </h3>

                <p>
                  Understand where you are within a longer academic,
                  career or research route.
                </p>
              </div>
            </div>


            <div className="dashboard-history-row">
              <span className="dashboard-history-number">
                03
              </span>

              <div>
                <span className="eyebrow">
                  Capability
                </span>

                <h3>
                  Focus on what you can now do.
                </h3>

                <p>
                  Over time, progress should connect to skills and
                  learning outcomes rather than course completion alone.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ==================================================================
          ACCOUNT PRINCIPLES
         ================================================================== */}

      <section className="section dark">
        <div className="shell">
          <SectionHeading
            eyebrow="Account principles"
            title="A learner account should be useful before it is complicated."
            description="When accounts are implemented, the priority should be a focused learning experience rather than unnecessary profile features."
          />

          <div className="level-grid">
            <div className="level-card course-dark-card">
              <span className="num">
                01
              </span>

              <h3>
                Simple
              </h3>

              <small>
                Minimal friction
              </small>

              <p>
                Sign in quickly and return directly to meaningful
                learning.
              </p>
            </div>


            <div className="level-card course-dark-card">
              <span className="num">
                02
              </span>

              <h3>
                Private
              </h3>

              <small>
                Respect learner data
              </small>

              <p>
                Collect only the account and learning data that the
                platform genuinely needs.
              </p>
            </div>


            <div className="level-card course-dark-card">
              <span className="num">
                03
              </span>

              <h3>
                Focused
              </h3>

              <small>
                Learning first
              </small>

              <p>
                Put active courses and next actions ahead of account
                administration.
              </p>
            </div>


            <div className="level-card course-dark-card">
              <span className="num">
                04
              </span>

              <h3>
                Connected
              </h3>

              <small>
                One learning system
              </small>

              <p>
                Courses, pathways, labs, resources and support should
                all connect to the same learner journey.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* ==================================================================
          CURRENT OPTIONS
         ================================================================== */}

      <section className="section">
        <div className="shell">
          <SectionHeading
            eyebrow="While accounts are being built"
            title="You can already explore the learning system."
            description="The public learning structure works independently of learner accounts, so you can explore subjects and decide what you want to study now."
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
                  Find your learning route
                </strong>

                <p className="dashboard-feature-copy">
                  Use your subject, level and goal to identify a
                  starting point.
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
                  Browse courses
                </strong>

                <p className="dashboard-feature-copy">
                  Explore focused learning across all five disciplines.
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
                  Explore pathways
                </strong>

                <p className="dashboard-feature-copy">
                  See how courses can connect into larger academic and
                  career goals.
                </p>
              </div>
            </Link>


            <Link
              href="/contact"
              className="feature-item"
            >
              <span className="mini-symbol">
                04
              </span>

              <div>
                <strong>
                  Register your interest
                </strong>

                <p className="dashboard-feature-copy">
                  Tell us what you want to learn while learner access is
                  being developed.
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>


      {/* ==================================================================
          FINAL CTA
         ================================================================== */}

      <section className="section soft">
        <div className="shell">
          <div className="dashboard-final">
            <span className="eyebrow">
              Learner accounts coming later
            </span>

            <h2>
              You don&apos;t need an account to start exploring.
            </h2>

            <p>
              Find your subject, choose your level and explore the
              learning routes already designed across the platform.
            </p>

            <div className="hero-actions">
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

              <Link
                href="/contact"
                className="button button-outline"
              >
                Register interest
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}