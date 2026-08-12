import type { Metadata } from "next";
import Link from "next/link";

import Icon from "@/components/Icon";

import {
  courses,
  getLevel,
  getSubject,
  pathways,
  subjects,
} from "@/lib/data";


/* ==========================================================================
   METADATA
   ========================================================================== */

export const metadata: Metadata = {
  title: "Search",

  description:
    "Search courses, subjects, pathways and learning areas across My Academic Tutor.",

  openGraph: {
    title: "Search | My Academic Tutor",

    description:
      "Find quantitative and computational courses, subjects, pathways and learning support.",
  },
};


/* ==========================================================================
   TYPES
   ========================================================================== */

type SearchType =
  | "all"
  | "courses"
  | "subjects"
  | "pathways"
  | "platform";


/* ==========================================================================
   PLATFORM PAGES
   ========================================================================== */

const platformPages = [
  {
    title: "Learning Paths",
    eyebrow: "Find your route",
    description:
      "Choose your subject, level and goal and identify a sensible learning route through the platform.",
    href: "/learning",
    keywords: [
      "learning",
      "path finder",
      "level",
      "goal",
      "study route",
      "where to start",
    ],
  },

  {
    title: "Interactive Labs",
    eyebrow: "Learn by exploring",
    description:
      "Build intuition through visual and interactive quantitative and computational learning experiences.",
    href: "/labs",
    keywords: [
      "interactive",
      "simulation",
      "visualisation",
      "lab",
      "explore",
      "practice",
    ],
  },

  {
    title: "Expert Tutoring",
    eyebrow: "One-to-one support",
    description:
      "Get targeted expert help with difficult concepts, examinations, university study, programming and research-oriented learning.",
    href: "/tutoring",
    keywords: [
      "tutor",
      "tutoring",
      "one to one",
      "support",
      "exam",
      "university",
      "research help",
    ],
  },

  {
    title: "Learning Resources",
    eyebrow: "Knowledge hub",
    description:
      "Explore concept guides, technical references, research workflows and practical learning resources.",
    href: "/resources",
    keywords: [
      "resources",
      "guide",
      "reference",
      "research",
      "study",
      "notes",
      "explanation",
    ],
  },

  {
    title: "Pricing",
    eyebrow: "Access options",
    description:
      "Explore planned learning access, tutoring and institutional options.",
    href: "/pricing",
    keywords: [
      "pricing",
      "price",
      "cost",
      "membership",
      "subscription",
      "access",
    ],
  },

  {
    title: "About My Academic Tutor",
    eyebrow: "About the platform",
    description:
      "Learn about our quantitative and computational learning philosophy and platform structure.",
    href: "/about",
    keywords: [
      "about",
      "platform",
      "philosophy",
      "mission",
      "academic",
    ],
  },

  {
    title: "Contact",
    eyebrow: "Get in touch",
    description:
      "Contact us about tutoring, courses, learning guidance, research-oriented learning or partnerships.",
    href: "/contact",
    keywords: [
      "contact",
      "email",
      "enquiry",
      "help",
      "support",
      "partnership",
    ],
  },
];


/* ==========================================================================
   HELPERS
   ========================================================================== */

function firstParam(
  value:
    | string
    | string[]
    | undefined
) {
  if (Array.isArray(value)) {
    return value[0] ?? "";
  }

  return value ?? "";
}


function isSearchType(
  value: string
): value is SearchType {
  return [
    "all",
    "courses",
    "subjects",
    "pathways",
    "platform",
  ].includes(value);
}


function matchesSearch(
  values: Array<
    | string
    | string[]
    | undefined
  >,
  query: string
) {
  if (!query) {
    return true;
  }

  const haystack = values
    .flatMap((value) =>
      Array.isArray(value)
        ? value
        : [value ?? ""]
    )
    .join(" ")
    .toLowerCase();

  const terms = query
    .toLowerCase()
    .split(/\s+/)
    .filter(Boolean);

  return terms.every((term) =>
    haystack.includes(term)
  );
}


function buildSearchHref(
  query: string,
  type: SearchType
) {
  const params =
    new URLSearchParams();

  if (query) {
    params.set("q", query);
  }

  if (type !== "all") {
    params.set("type", type);
  }

  const queryString =
    params.toString();

  return queryString
    ? `/search?${queryString}`
    : "/search";
}


/* ==========================================================================
   PAGE
   ========================================================================== */

export default async function SearchPage({
  searchParams,
}: {
  searchParams?: Promise<{
    q?: string | string[];
    type?: string | string[];
  }>;
}) {
  const resolvedSearchParams =
    searchParams
      ? await searchParams
      : undefined;

  const query = firstParam(
    resolvedSearchParams?.q
  ).trim();

  const requestedType = firstParam(
    resolvedSearchParams?.type
  );

  const activeType: SearchType =
    isSearchType(requestedType)
      ? requestedType
      : "all";


  /* ==========================================================================
     SEARCH RESULTS
     ========================================================================== */

  const courseResults =
    activeType === "all" ||
    activeType === "courses"
      ? courses.filter((course) => {
          const subject =
            getSubject(
              course.subject
            );

          const level =
            getLevel(
              course.level
            );

          return matchesSearch(
            [
              course.title,
              course.description,
              course.skills,
              course.modules,
              subject?.name,
              level?.name,
            ],
            query
          );
        })
      : [];


  const subjectResults =
    activeType === "all" ||
    activeType === "subjects"
      ? subjects.filter(
          (subject) =>
            matchesSearch(
              [
                subject.name,
                subject.short,
                subject.description,
                subject.eyebrow,
                subject.topics,
                subject.outcomes,
              ],
              query
            )
        )
      : [];


  const pathwayResults =
    activeType === "all" ||
    activeType === "pathways"
      ? pathways.filter(
          (pathway) =>
            matchesSearch(
              [
                pathway.name,
                pathway.title,
                pathway.tag,
                pathway.subject,
                pathway.description,
                pathway.steps,
              ],
              query
            )
        )
      : [];


  const platformResults =
    activeType === "all" ||
    activeType === "platform"
      ? platformPages.filter(
          (page) =>
            matchesSearch(
              [
                page.title,
                page.eyebrow,
                page.description,
                page.keywords,
              ],
              query
            )
        )
      : [];


  const resultCount =
    courseResults.length +
    subjectResults.length +
    pathwayResults.length +
    platformResults.length;


  const tabs: {
    value: SearchType;
    label: string;
  }[] = [
    {
      value: "all",
      label: "All",
    },

    {
      value: "courses",
      label: "Courses",
    },

    {
      value: "subjects",
      label: "Subjects",
    },

    {
      value: "pathways",
      label: "Pathways",
    },

    {
      value: "platform",
      label: "Platform",
    },
  ];


  return (
    <>
      {/* ==================================================================
          HERO / SEARCH
         ================================================================== */}

      <section className="site-search-hero">
        <div className="shell">
          <div className="breadcrumbs">
            Home / Search
          </div>

          <div className="site-search-heading">
            <span className="eyebrow">
              Search My Academic Tutor
            </span>

            <h1>
              What do you want
              <br />
              to understand?
            </h1>

            <p>
              Search across courses,
              disciplines, learning
              pathways and major areas
              of the platform.
            </p>
          </div>


          {/* --------------------------------------------------------------
              Search input
             -------------------------------------------------------------- */}

          <form
            action="/search"
            method="get"
            className="site-search-form"
          >
            <span className="site-search-icon">
              <Icon
                name="search"
                size={20}
              />
            </span>

            <input
              type="search"
              name="q"
              defaultValue={query}
              placeholder="Try regression, Python, single-cell, calculus..."
              aria-label="Search My Academic Tutor"
              autoFocus={!query}
            />

            {activeType !==
              "all" && (
              <input
                type="hidden"
                name="type"
                value={activeType}
              />
            )}

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


          {/* --------------------------------------------------------------
              Suggestions
             -------------------------------------------------------------- */}

          <div className="site-search-suggestions">
            <span>
              Popular searches
            </span>

            <Link href="/search?q=regression">
              Regression
            </Link>

            <Link href="/search?q=python">
              Python
            </Link>

            <Link href="/search?q=machine+learning">
              Machine learning
            </Link>

            <Link href="/search?q=single-cell">
              Single-cell
            </Link>

            <Link href="/search?q=calculus">
              Calculus
            </Link>
          </div>
        </div>
      </section>


      {/* ==================================================================
          EMPTY / STARTING STATE
         ================================================================== */}

      {!query && (
        <>
          <section className="section soft">
            <div className="shell">
              <div className="site-search-start-head">
                <span className="eyebrow">
                  Browse instead
                </span>

                <h2>
                  Start with a discipline.
                </h2>

                <p>
                  If you do not yet know
                  exactly what to search
                  for, begin with the
                  subject closest to your
                  goal.
                </p>
              </div>

              <div className="subject-grid">
                {subjects.map(
                  (subject) => (
                    <Link
                      key={
                        subject.slug
                      }
                      href={`/subjects/${subject.slug}`}
                      className={`subject-card ${subject.accent}`}
                    >
                      <span className="subject-symbol">
                        {
                          subject.symbol
                        }
                      </span>

                      <h3>
                        {subject.name}
                      </h3>

                      <p>
                        {subject.short}
                      </p>

                      <div className="card-arrow">
                        <span>
                          Explore subject
                        </span>

                        <Icon
                          name="arrow"
                          size={15}
                        />
                      </div>
                    </Link>
                  )
                )}
              </div>
            </div>
          </section>


          <section className="section">
            <div className="shell">
              <div className="site-search-start-head">
                <span className="eyebrow">
                  Or start from your goal
                </span>

                <h2>
                  You don&apos;t need
                  the right search term.
                </h2>
              </div>

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
                      I don&apos;t know
                      where to begin
                    </strong>

                    <p className="site-search-feature-copy">
                      Use the Learning
                      Path Finder.
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
                      I know the topic
                    </strong>

                    <p className="site-search-feature-copy">
                      Browse the complete
                      course catalogue.
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
                      I have a career or
                      research goal
                    </strong>

                    <p className="site-search-feature-copy">
                      Explore structured
                      pathways.
                    </p>
                  </div>
                </Link>

                <Link
                  href="/tutoring"
                  className="feature-item"
                >
                  <span className="mini-symbol">
                    04
                  </span>

                  <div>
                    <strong>
                      I&apos;m stuck
                    </strong>

                    <p className="site-search-feature-copy">
                      Explore expert
                      tutoring.
                    </p>
                  </div>
                </Link>
              </div>
            </div>
          </section>
        </>
      )}


      {/* ==================================================================
          RESULTS
         ================================================================== */}

      {query && (
        <section className="section">
          <div className="shell">
            {/* ----------------------------------------------------------
                Result summary
               ---------------------------------------------------------- */}

            <div className="site-search-result-header">
              <div>
                <span className="eyebrow">
                  Search results
                </span>

                <h2>
                  Results for
                  <em>
                    “{query}”
                  </em>
                </h2>
              </div>

              <span className="site-search-result-count">
                {resultCount}{" "}
                {resultCount === 1
                  ? "result"
                  : "results"}
              </span>
            </div>


            {/* ----------------------------------------------------------
                Filter tabs
               ---------------------------------------------------------- */}

            <nav
              className="site-search-tabs"
              aria-label="Search result type"
            >
              {tabs.map((tab) => (
                <Link
                  key={tab.value}
                  href={buildSearchHref(
                    query,
                    tab.value
                  )}
                  className={
                    activeType ===
                    tab.value
                      ? "active"
                      : ""
                  }
                >
                  {tab.label}
                </Link>
              ))}
            </nav>


            {/* ==========================================================
                NO RESULTS
               ========================================================== */}

            {resultCount === 0 && (
              <div className="site-search-empty">
                <span className="site-search-empty-symbol">
                  ?
                </span>

                <span className="eyebrow">
                  No exact match
                </span>

                <h3>
                  We couldn&apos;t find
                  anything for
                  “{query}”.
                </h3>

                <p>
                  Try a broader term,
                  search by subject, or
                  use the Learning Path
                  Finder if you are not
                  sure what the topic is
                  called.
                </p>

                <div className="hero-actions">
                  <Link
                    href="/search"
                    className="button"
                  >
                    Start a new search
                  </Link>

                  <Link
                    href="/learning"
                    className="button button-outline"
                  >
                    Find my learning path
                  </Link>
                </div>
              </div>
            )}


            {/* ==========================================================
                COURSES
               ========================================================== */}

            {courseResults.length >
              0 && (
              <div className="site-search-group">
                <div className="site-search-group-head">
                  <div>
                    <span className="eyebrow">
                      Courses
                    </span>

                    <h3>
                      Structured learning
                    </h3>
                  </div>

                  <span>
                    {
                      courseResults.length
                    }
                  </span>
                </div>

                <div className="site-search-result-list">
                  {courseResults.map(
                    (course) => {
                      const subject =
                        getSubject(
                          course.subject
                        );

                      const level =
                        getLevel(
                          course.level
                        );

                      return (
                        <Link
                          key={
                            course.slug
                          }
                          href={`/courses/${course.slug}`}
                          className="site-search-result-card"
                        >
                          <span
                            className={`mini-symbol ${
                              subject?.accent ??
                              ""
                            }`}
                          >
                            {subject?.symbol ??
                              "•"}
                          </span>

                          <div className="site-search-result-main">
                            <div className="site-search-result-meta">
                              <span>
                                {subject?.name}
                              </span>

                              <span>
                                •
                              </span>

                              <span>
                                {level?.name}
                              </span>
                            </div>

                            <h4>
                              {
                                course.title
                              }
                            </h4>

                            <p>
                              {
                                course.description
                              }
                            </p>

                            <div className="site-search-result-tags">
                              {course.skills
                                .slice(0, 3)
                                .map(
                                  (
                                    skill
                                  ) => (
                                    <span
                                      key={
                                        skill
                                      }
                                    >
                                      {
                                        skill
                                      }
                                    </span>
                                  )
                                )}
                            </div>
                          </div>

                          <div className="site-search-result-side">
                            <small>
                              {
                                course.lessons
                              }{" "}
                              lessons
                            </small>

                            <span className="circle-arrow">
                              <Icon
                                name="arrow"
                                size={15}
                              />
                            </span>
                          </div>
                        </Link>
                      );
                    }
                  )}
                </div>
              </div>
            )}


            {/* ==========================================================
                SUBJECTS
               ========================================================== */}

            {subjectResults.length >
              0 && (
              <div className="site-search-group">
                <div className="site-search-group-head">
                  <div>
                    <span className="eyebrow">
                      Subjects
                    </span>

                    <h3>
                      Explore a discipline
                    </h3>
                  </div>

                  <span>
                    {
                      subjectResults.length
                    }
                  </span>
                </div>

                <div className="site-search-result-list">
                  {subjectResults.map(
                    (subject) => (
                      <Link
                        key={
                          subject.slug
                        }
                        href={`/subjects/${subject.slug}`}
                        className="site-search-result-card"
                      >
                        <span
                          className={`mini-symbol ${subject.accent}`}
                        >
                          {
                            subject.symbol
                          }
                        </span>

                        <div className="site-search-result-main">
                          <div className="site-search-result-meta">
                            <span>
                              Discipline
                            </span>

                            <span>
                              •
                            </span>

                            <span>
                              {
                                subject.eyebrow
                              }
                            </span>
                          </div>

                          <h4>
                            {
                              subject.name
                            }
                          </h4>

                          <p>
                            {
                              subject.description
                            }
                          </p>

                          <div className="site-search-result-tags">
                            {subject.topics
                              .slice(0, 4)
                              .map(
                                (
                                  topic
                                ) => (
                                  <span
                                    key={
                                      topic
                                    }
                                  >
                                    {
                                      topic
                                    }
                                  </span>
                                )
                              )}
                          </div>
                        </div>

                        <div className="site-search-result-side">
                          <small>
                            Subject
                          </small>

                          <span className="circle-arrow">
                            <Icon
                              name="arrow"
                              size={15}
                            />
                          </span>
                        </div>
                      </Link>
                    )
                  )}
                </div>
              </div>
            )}


            {/* ==========================================================
                PATHWAYS
               ========================================================== */}

            {pathwayResults.length >
              0 && (
              <div className="site-search-group">
                <div className="site-search-group-head">
                  <div>
                    <span className="eyebrow">
                      Pathways
                    </span>

                    <h3>
                      Longer learning journeys
                    </h3>
                  </div>

                  <span>
                    {
                      pathwayResults.length
                    }
                  </span>
                </div>

                <div className="site-search-result-list">
                  {pathwayResults.map(
                    (pathway) => (
                      <Link
                        key={
                          pathway.slug
                        }
                        href={`/pathways/${pathway.slug}`}
                        className="site-search-result-card"
                      >
                        <span className="mini-symbol">
                          ↗
                        </span>

                        <div className="site-search-result-main">
                          <div className="site-search-result-meta">
                            <span>
                              {
                                pathway.tag
                              }
                            </span>

                            <span>
                              •
                            </span>

                            <span>
                              {
                                pathway.subject
                              }
                            </span>
                          </div>

                          <h4>
                            {
                              pathway.name
                            }
                          </h4>

                          <p>
                            {
                              pathway.description
                            }
                          </p>

                          <div className="site-search-result-tags">
                            {pathway.steps
                              .slice(0, 4)
                              .map(
                                (
                                  step
                                ) => (
                                  <span
                                    key={
                                      step
                                    }
                                  >
                                    {
                                      step
                                    }
                                  </span>
                                )
                              )}
                          </div>
                        </div>

                        <div className="site-search-result-side">
                          <small>
                            {
                              pathway.duration
                            }
                          </small>

                          <span className="circle-arrow">
                            <Icon
                              name="arrow"
                              size={15}
                            />
                          </span>
                        </div>
                      </Link>
                    )
                  )}
                </div>
              </div>
            )}


            {/* ==========================================================
                PLATFORM PAGES
               ========================================================== */}

            {platformResults.length >
              0 && (
              <div className="site-search-group">
                <div className="site-search-group-head">
                  <div>
                    <span className="eyebrow">
                      Platform
                    </span>

                    <h3>
                      Tools & support
                    </h3>
                  </div>

                  <span>
                    {
                      platformResults.length
                    }
                  </span>
                </div>

                <div className="site-search-result-list">
                  {platformResults.map(
                    (page) => (
                      <Link
                        key={
                          page.href
                        }
                        href={
                          page.href
                        }
                        className="site-search-result-card"
                      >
                        <span className="mini-symbol">
                          →
                        </span>

                        <div className="site-search-result-main">
                          <div className="site-search-result-meta">
                            <span>
                              Platform
                            </span>

                            <span>
                              •
                            </span>

                            <span>
                              {
                                page.eyebrow
                              }
                            </span>
                          </div>

                          <h4>
                            {
                              page.title
                            }
                          </h4>

                          <p>
                            {
                              page.description
                            }
                          </p>
                        </div>

                        <div className="site-search-result-side">
                          <small>
                            Explore
                          </small>

                          <span className="circle-arrow">
                            <Icon
                              name="arrow"
                              size={15}
                            />
                          </span>
                        </div>
                      </Link>
                    )
                  )}
                </div>
              </div>
            )}
          </div>
        </section>
      )}


      {/* ==================================================================
          SEARCH FOOTER
         ================================================================== */}

      {query &&
        resultCount > 0 && (
        <section className="section soft">
          <div className="shell">
            <div className="cta-band">
              <div>
                <span className="eyebrow light">
                  Search gave you options
                </span>

                <h2>
                  Still not sure which
                  result is right?
                </h2>
              </div>

              <div>
                <p>
                  Use the Learning Path
                  Finder to combine your
                  subject, current level
                  and goal into a more
                  structured recommendation.
                </p>

                <div className="course-cta-actions">
                  <Link
                    href="/learning"
                    className="button button-white"
                  >
                    Find my learning path

                    <Icon
                      name="arrow"
                      size={16}
                    />
                  </Link>

                  <Link
                    href="/contact"
                    className="button course-dark-outline"
                  >
                    Ask for guidance
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}