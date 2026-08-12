import Link from "next/link";

import Icon from "@/components/Icon";


/* ==========================================================================
   NOT FOUND
   ========================================================================== */

export default function NotFound() {
  return (
    <>
      {/* ==================================================================
          HERO
         ================================================================== */}

      <section className="not-found-page">
        <div className="shell not-found-grid">
          <div className="not-found-main">
            <span className="not-found-code">
              404
            </span>

            <span className="eyebrow">
              Page not found
            </span>

            <h1>
              This route
              <br />
              doesn&apos;t lead
              <br />
              anywhere yet.
            </h1>

            <p>
              The page may have moved, the address may be incorrect, or
              the content may not exist yet. You can return to the
              learning platform from here.
            </p>

            <div className="hero-actions">
              <Link
                href="/"
                className="button"
              >
                Back to homepage

                <Icon
                  name="arrow"
                  size={16}
                />
              </Link>

              <Link
                href="/search"
                className="button button-outline"
              >
                Search the site
              </Link>
            </div>
          </div>


          {/* --------------------------------------------------------------
              Recovery card
             -------------------------------------------------------------- */}

          <aside className="not-found-card">
            <span className="eyebrow light">
              Find your way back
            </span>

            <h2>
              Where would you like to go?
            </h2>

            <div className="not-found-links">
              <Link href="/subjects">
                <span>
                  01
                </span>

                <div>
                  <strong>
                    Subjects
                  </strong>

                  <small>
                    Statistics, Mathematics, Data Science, Bioinformatics
                    and Computer Science
                  </small>
                </div>

                <Icon
                  name="arrow"
                  size={14}
                />
              </Link>


              <Link href="/courses">
                <span>
                  02
                </span>

                <div>
                  <strong>
                    Courses
                  </strong>

                  <small>
                    Browse structured learning across all levels
                  </small>
                </div>

                <Icon
                  name="arrow"
                  size={14}
                />
              </Link>


              <Link href="/learning">
                <span>
                  03
                </span>

                <div>
                  <strong>
                    Learning Paths
                  </strong>

                  <small>
                    Start from your subject, level and goal
                  </small>
                </div>

                <Icon
                  name="arrow"
                  size={14}
                />
              </Link>


              <Link href="/pathways">
                <span>
                  04
                </span>

                <div>
                  <strong>
                    Pathways
                  </strong>

                  <small>
                    Explore longer academic and career journeys
                  </small>
                </div>

                <Icon
                  name="arrow"
                  size={14}
                />
              </Link>


              <Link href="/tutoring">
                <span>
                  05
                </span>

                <div>
                  <strong>
                    Expert Tutoring
                  </strong>

                  <small>
                    Get targeted support when independent learning is
                    not enough
                  </small>
                </div>

                <Icon
                  name="arrow"
                  size={14}
                />
              </Link>
            </div>
          </aside>
        </div>
      </section>


      {/* ==================================================================
          QUICK SEARCH
         ================================================================== */}

      <section className="section soft">
        <div className="shell">
          <div className="not-found-search">
            <div>
              <span className="eyebrow">
                Looking for something specific?
              </span>

              <h2>
                Search the learning platform.
              </h2>

              <p>
                Try a topic such as regression, Python, calculus,
                machine learning or bioinformatics.
              </p>
            </div>

            <form
              action="/search"
              method="get"
              className="not-found-search-form"
            >
              <input
                type="search"
                name="q"
                placeholder="Search courses, subjects, pathways..."
                aria-label="Search My Academic Tutor"
              />

              <button
                type="submit"
                className="button"
              >
                Search

                <Icon
                  name="arrow"
                  size={15}
                />
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}