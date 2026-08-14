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
