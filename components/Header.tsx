"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import Icon from "./Icon";
import { levels, subjects } from "@/lib/data";

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [subjectsOpen, setSubjectsOpen] = useState(false);

  /* ------------------------------------------------------------------------
     Close menus with Escape
     ------------------------------------------------------------------------ */

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMobileMenuOpen(false);
        setSubjectsOpen(false);
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  /* ------------------------------------------------------------------------
     Prevent background scrolling while mobile menu is open
     ------------------------------------------------------------------------ */

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  function closeMobileMenu() {
    setMobileMenuOpen(false);
  }

  return (
    <>
      <header className="site-header">
        <div className="shell header-inner">
          {/* ----------------------------------------------------------------
              Brand
             ---------------------------------------------------------------- */}

          <Link
            href="/"
            className="brand"
            aria-label="My Academic Tutor home"
            onClick={() => {
              setMobileMenuOpen(false);
              setSubjectsOpen(false);
            }}
          >
            <Image
              src="/logo.png"
              alt="My Academic Tutor"
              width={52}
              height={52}
              priority
              className="brand-logo"
            />

            <span className="brand-wordmark">
              <b>My Academic</b>
              <span>Tutor</span>
            </span>
          </Link>

          {/* ----------------------------------------------------------------
              Desktop navigation
             ---------------------------------------------------------------- */}

          <nav className="desktop-nav" aria-label="Main navigation">
            {/* Subjects mega menu */}

            <div
              className="nav-drop"
              onMouseEnter={() => setSubjectsOpen(true)}
              onMouseLeave={() => setSubjectsOpen(false)}
            >
              <button
                type="button"
                aria-haspopup="true"
                aria-expanded={subjectsOpen}
                onClick={() => setSubjectsOpen((current) => !current)}
              >
                Subjects <span aria-hidden="true">⌄</span>
              </button>

              {subjectsOpen && (
                <div className="mega-menu">
                  {/* Intro block */}

                  <div className="mega-intro">
                    <span className="eyebrow light">
                      Explore by subject
                    </span>

                    <h3>
                      Five disciplines.
                      <br />
                      One learning ecosystem.
                    </h3>

                    <p>
                      Build strong foundations, master university modules,
                      develop practical skills and progress towards advanced
                      study.
                    </p>

                    <Link
                      href="/subjects"
                      className="button button-white button-small"
                      onClick={() => setSubjectsOpen(false)}
                    >
                      Explore all subjects
                      <Icon name="arrow" size={15} />
                    </Link>
                  </div>

                  {/* Subject links */}

                  <div className="mega-subjects">
                    {subjects.map((subject) => (
                      <Link
                        href={`/subjects/${subject.slug}`}
                        key={subject.slug}
                        className={`mega-subject ${subject.accent}`}
                        onClick={() => setSubjectsOpen(false)}
                      >
                        <span className="subject-symbol">
                          {subject.symbol}
                        </span>

                        <span>
                          <b>{subject.name}</b>
                          <small>{subject.short}</small>
                        </span>

                        <Icon name="chevron" size={17} />
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link href="/learning">
              Learning Paths
            </Link>

            <Link href="/courses">
              Courses
            </Link>

            <Link href="/labs">
              Interactive Labs
            </Link>

            <Link href="/tutoring">
              Tutoring
            </Link>

            <Link href="/resources">
              Resources
            </Link>
          </nav>

          {/* ----------------------------------------------------------------
              Header actions
             ---------------------------------------------------------------- */}

          <div className="header-actions">
            <Link
              href="/search"
              className="icon-button"
              aria-label="Search My Academic Tutor"
            >
              <Icon name="search" size={18} />
            </Link>

            <Link
              href="/dashboard"
              className="signin-link"
            >
              Sign in
            </Link>

            <Link
              href="/learning"
              className="button button-small"
            >
              Start learning
            </Link>

            <button
              type="button"
              className="mobile-menu-button"
              aria-label={
                mobileMenuOpen
                  ? "Close navigation menu"
                  : "Open navigation menu"
              }
              aria-expanded={mobileMenuOpen}
              onClick={() =>
                setMobileMenuOpen((current) => !current)
              }
            >
              <Icon
                name={mobileMenuOpen ? "close" : "menu"}
                size={24}
              />
            </button>
          </div>
        </div>
      </header>

      {/* ====================================================================
          Mobile navigation
         ==================================================================== */}

      {mobileMenuOpen && (
        <div className="mobile-panel">
          <div className="shell mobile-panel-inner">
            {/* Subjects */}

            <div className="mobile-panel-group">
              <span>Subjects</span>

              {subjects.map((subject) => (
                <Link
                  key={subject.slug}
                  href={`/subjects/${subject.slug}`}
                  onClick={closeMobileMenu}
                >
                  {subject.name}
                </Link>
              ))}

              <Link
                href="/subjects"
                onClick={closeMobileMenu}
              >
                View all subjects →
              </Link>
            </div>

            {/* Learning */}

            <div className="mobile-panel-group">
              <span>Learning</span>

              {levels.map((level) => (
                <Link
                  key={level.slug}
                  href={`/learning?level=${level.slug}`}
                  onClick={closeMobileMenu}
                >
                  {level.name}
                </Link>
              ))}

              <Link
                href="/courses"
                onClick={closeMobileMenu}
              >
                All courses
              </Link>

              <Link
                href="/pathways"
                onClick={closeMobileMenu}
              >
                Career pathways
              </Link>
            </div>

            {/* More */}

            <div className="mobile-panel-group">
              <span>Explore</span>

              <Link
                href="/labs"
                onClick={closeMobileMenu}
              >
                Interactive Labs
              </Link>

              <Link
                href="/tutoring"
                onClick={closeMobileMenu}
              >
                Tutoring
              </Link>

              <Link
                href="/resources"
                onClick={closeMobileMenu}
              >
                Resources
              </Link>

              <Link
                href="/countries"
                onClick={closeMobileMenu}
              >
                Global curricula
              </Link>

              <Link
                href="/about"
                onClick={closeMobileMenu}
              >
                About
              </Link>
            </div>

            {/* Account */}

            <div className="mobile-panel-group">
              <span>Account</span>

              <Link
                href="/dashboard"
                onClick={closeMobileMenu}
              >
                Sign in
              </Link>

              <Link
                href="/search"
                onClick={closeMobileMenu}
              >
                Search
              </Link>

              <Link
                href="/learning"
                className="button"
                onClick={closeMobileMenu}
              >
                Start learning
                <Icon name="arrow" size={15} />
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}