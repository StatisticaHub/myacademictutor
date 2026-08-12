import Image from "next/image";
import Link from "next/link";

import { countries, subjects } from "@/lib/data";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="shell footer-main">
        {/* ------------------------------------------------------------------
            Brand
           ------------------------------------------------------------------ */}

        <div className="footer-brand">
          <Image
            src="/logo.png"
            alt="My Academic Tutor"
            width={66}
            height={66}
          />

          <div>
            <strong>My Academic Tutor</strong>

            <p>
              Structured learning, interactive understanding and expert
              academic support across Statistics, Mathematics, Data Science,
              Bioinformatics and Computer Science.
            </p>

            <div className="footer-brand-actions">
              <Link
                href="/learning"
                className="button button-white button-small"
              >
                Start learning
              </Link>

              <Link
                href="/tutoring"
                className="footer-text-link"
              >
                Find expert support →
              </Link>
            </div>
          </div>
        </div>

        {/* ------------------------------------------------------------------
            Subjects
           ------------------------------------------------------------------ */}

        <div className="footer-col">
          <h4>Subjects</h4>

          {subjects.map((subject) => (
            <Link
              key={subject.slug}
              href={`/subjects/${subject.slug}`}
            >
              {subject.name}
            </Link>
          ))}

          <Link href="/subjects">
            Explore all subjects →
          </Link>
        </div>

        {/* ------------------------------------------------------------------
            Learning
           ------------------------------------------------------------------ */}

        <div className="footer-col">
          <h4>Learning</h4>

          <Link href="/learning">
            Find your learning path
          </Link>

          <Link href="/courses">
            All courses
          </Link>

          <Link href="/pathways">
            Career pathways
          </Link>

          <Link href="/labs">
            Interactive labs
          </Link>

          <Link href="/resources">
            Resources
          </Link>

          <Link href="/tutoring">
            1-to-1 tutoring
          </Link>
        </div>

        {/* ------------------------------------------------------------------
            Platform
           ------------------------------------------------------------------ */}

        <div className="footer-col">
          <h4>Platform</h4>

          <Link href="/dashboard">
            Learner dashboard
          </Link>

          <Link href="/pricing">
            Pricing
          </Link>

          <Link href="/countries">
            Global curricula
          </Link>

          <Link href="/about">
            About us
          </Link>

          <Link href="/contact">
            Contact
          </Link>

          <Link href="/search">
            Search
          </Link>
        </div>
      </div>

      {/* --------------------------------------------------------------------
          Global curriculum strip
         -------------------------------------------------------------------- */}

      <div className="shell footer-countries">
        <span className="footer-countries-label">
          Learning around the world
        </span>

        <div className="footer-country-links">
          {countries.map((country) => (
            <Link
              key={country.slug}
              href={`/countries/${country.slug}`}
            >
              <span aria-hidden="true">
                {country.flag}
              </span>

              {country.name}
            </Link>
          ))}
        </div>
      </div>

      {/* --------------------------------------------------------------------
          Bottom
         -------------------------------------------------------------------- */}

      <div className="shell footer-bottom">
        <span>
          © {currentYear} My Academic Tutor. All rights reserved.
        </span>

        <div>
          <Link href="/academic-integrity">
            Academic integrity
          </Link>

          <Link href="/privacy">
            Privacy
          </Link>

          <Link href="/terms">
            Terms
          </Link>
        </div>
      </div>
    </footer>
  );
}