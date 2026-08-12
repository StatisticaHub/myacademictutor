import type { Metadata } from "next";
import Link from "next/link";

import Icon from "@/components/Icon";
import SectionHeading from "@/components/SectionHeading";

import {
  countries,
  subjects,
} from "@/lib/data";


/* ==========================================================================
   METADATA
   ========================================================================== */

export const metadata: Metadata = {
  title: "Global Learning",

  description:
    "Explore My Academic Tutor learning routes for the UK, USA, Canada, Australia, New Zealand, Ireland and International or IB learners.",

  openGraph: {
    title: "Global Learning | My Academic Tutor",

    description:
      "Quantitative and computational learning designed to work across major English-speaking academic systems.",
  },
};


/* ==========================================================================
   PAGE
   ========================================================================== */

export default function CountriesPage() {
  return (
    <>
      {/* ==================================================================
          HERO
         ================================================================== */}

      <section className="page-hero countries-hero">
        <div className="shell countries-hero-grid">
          <div>
            <div className="breadcrumbs">
              Home / Global Learning
            </div>

            <span className="eyebrow countries-hero-eyebrow">
              Built for international learners
            </span>

            <h1>
              One platform.
              <br />
              Different academic systems.
            </h1>

            <p>
              Mathematics, statistics and computing are global
              disciplines, but learners encounter them through different
              qualifications, terminology and academic structures. Our
              learning routes are designed to recognise those differences.
            </p>

            <div className="hero-actions">
              <Link
                href="#regions"
                className="button"
              >
                Choose your region

                <Icon
                  name="arrow"
                  size={16}
                />
              </Link>

              <Link
                href="/learning"
                className="button button-outline"
              >
                Find my learning path
              </Link>
            </div>

            <div className="hero-proof">
              <span>
                <Icon
                  name="check"
                  size={14}
                />

                7 curriculum regions
              </span>

              <span>
                <Icon
                  name="check"
                  size={14}
                />

                School to postgraduate
              </span>

              <span>
                <Icon
                  name="check"
                  size={14}
                />

                International / IB
              </span>
            </div>
          </div>


          {/* --------------------------------------------------------------
              Global preview
             -------------------------------------------------------------- */}

          <aside className="countries-global-card">
            <div className="countries-global-top">
              <span className="eyebrow light">
                Global curriculum
              </span>

              <span className="countries-global-pill">
                7 regions
              </span>
            </div>

            <h2>
              Learn in the context you recognise.
            </h2>

            <div className="countries-global-list">
              {countries.map((country) => (
                <Link
                  key={country.slug}
                  href={`/countries/${country.slug}`}
                >
                  <span className="countries-global-flag">
                    {country.flag}
                  </span>

                  <div>
                    <strong>
                      {country.name}
                    </strong>

                    <small>
                      {country.systems
                        .slice(0, 2)
                        .join(" · ")}
                    </small>
                  </div>

                  <Icon
                    name="arrow"
                    size={14}
                  />
                </Link>
              ))}
            </div>
          </aside>
        </div>
      </section>


      {/* ==================================================================
          PRINCIPLE
         ================================================================== */}

      <section className="section soft">
        <div className="shell">
          <SectionHeading
            eyebrow="What changes by country?"
            title="The subject stays the same. The educational context changes."
            description="A derivative is still a derivative and regression is still regression, but the route through these ideas can differ by curriculum, qualification and academic stage."
          />

          <div className="level-grid">
            <div className="level-card">
              <span className="num">
                01
              </span>

              <h3>
                Terminology
              </h3>

              <small>
                Familiar academic language
              </small>

              <p>
                Qualifications, year groups, course names and assessment
                language differ between education systems.
              </p>
            </div>


            <div className="level-card">
              <span className="num">
                02
              </span>

              <h3>
                Curriculum depth
              </h3>

              <small>
                Different expectations
              </small>

              <p>
                Similar topics may appear at different stages or be taught
                with different levels of mathematical depth.
              </p>
            </div>


            <div className="level-card">
              <span className="num">
                03
              </span>

              <h3>
                Assessment
              </h3>

              <small>
                Different academic demands
              </small>

              <p>
                Examination style, coursework expectations and
                qualification structures vary across regions.
              </p>
            </div>


            <div className="level-card">
              <span className="num">
                04
              </span>

              <h3>
                Progression
              </h3>

              <small>
                Different routes forward
              </small>

              <p>
                School qualifications connect differently to university,
                professional and postgraduate study around the world.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* ==================================================================
          REGIONS
         ================================================================== */}

      <section
        className="section"
        id="regions"
      >
        <div className="shell">
          <SectionHeading
            eyebrow="Choose your academic system"
            title="Explore learning in your context."
            description="Select the region closest to your academic system. International learners can use the International / IB route where a country-specific pathway is not appropriate."
          />

          <div className="countries-grid">
            {countries.map(
              (country, index) => (
                <Link
                  key={country.slug}
                  href={`/countries/${country.slug}`}
                  className="country-card-premium"
                >
                  <div className="country-card-premium-top">
                    <span className="country-card-number">
                      {String(index + 1).padStart(
                        2,
                        "0"
                      )}
                    </span>

                    <span className="country-card-flag">
                      {country.flag}
                    </span>
                  </div>

                  <h3>
                    {country.name}
                  </h3>

                  <p>
                    {country.copy}
                  </p>

                  <div className="country-system-list">
                    {country.systems
                      .slice(0, 4)
                      .map((system) => (
                        <span key={system}>
                          {system}
                        </span>
                      ))}
                  </div>

                  <div className="country-card-bottom">
                    <span>
                      Explore region
                    </span>

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
      </section>


      {/* ==================================================================
          SUBJECTS
         ================================================================== */}

      <section className="section dark">
        <div className="shell">
          <SectionHeading
            eyebrow="Subjects across systems"
            title="Five disciplines. Globally useful foundations."
            description="The academic context may differ, but these quantitative and computational disciplines remain strongly connected across education systems."
          />

          <div className="subject-grid">
            {subjects.map((subject) => (
              <Link
                key={subject.slug}
                href={`/subjects/${subject.slug}`}
                className={`subject-card ${subject.accent}`}
                style={{
                  background: "#181818",
                  borderColor: "#292929",
                  color: "#fff",
                }}
              >
                <span className="subject-symbol">
                  {subject.symbol}
                </span>

                <h3>
                  {subject.name}
                </h3>

                <p
                  style={{
                    color: "#99958d",
                  }}
                >
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
            ))}
          </div>
        </div>
      </section>


      {/* ==================================================================
          SCHOOL LEARNING
         ================================================================== */}

      <section className="section soft">
        <div className="shell">
          <div className="countries-stage-grid">
            <div>
              <span className="eyebrow">
                School-level learning
              </span>

              <h2>
                Curriculum matters most at school level.
              </h2>

              <p>
                School learners are often preparing for a specific
                qualification, so terminology, topic sequencing and
                assessment style become especially important.
              </p>

              <Link
                href="/learning?level=high-school"
                className="button"
              >
                Explore High School learning

                <Icon
                  name="arrow"
                  size={16}
                />
              </Link>
            </div>

            <div className="countries-stage-list">
              <div>
                <span>
                  01
                </span>

                <div>
                  <strong>
                    Qualification-aware
                  </strong>

                  <p>
                    Understand whether the learner is working towards a
                    national, state, provincial or international
                    qualification.
                  </p>
                </div>
              </div>

              <div>
                <span>
                  02
                </span>

                <div>
                  <strong>
                    Foundation-focused
                  </strong>

                  <p>
                    Build mathematical and computational understanding
                    that remains useful beyond one examination.
                  </p>
                </div>
              </div>

              <div>
                <span>
                  03
                </span>

                <div>
                  <strong>
                    Assessment-aware
                  </strong>

                  <p>
                    Connect conceptual understanding with the style of
                    reasoning expected in the learner&apos;s academic
                    system.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ==================================================================
          UNIVERSITY LEARNING
         ================================================================== */}

      <section className="section">
        <div className="shell">
          <div className="countries-stage-grid reverse">
            <div className="countries-stage-list">
              <div>
                <span>
                  01
                </span>

                <div>
                  <strong>
                    Module-focused
                  </strong>

                  <p>
                    University learners increasingly need support around
                    the content of a particular module or technical area.
                  </p>
                </div>
              </div>

              <div>
                <span>
                  02
                </span>

                <div>
                  <strong>
                    Method-focused
                  </strong>

                  <p>
                    Statistical, mathematical and computational methods
                    become more transferable across countries.
                  </p>
                </div>
              </div>

              <div>
                <span>
                  03
                </span>

                <div>
                  <strong>
                    Research-focused
                  </strong>

                  <p>
                    At postgraduate level, methodological reasoning and
                    technical capability often matter more than a national
                    syllabus.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <span className="eyebrow">
                University & postgraduate
              </span>

              <h2>
                Academic systems converge as learning becomes more specialised.
              </h2>

              <p>
                At university and postgraduate level, learners increasingly
                work with common theories, methods, software and research
                practices across international institutions.
              </p>

              <div className="hero-actions">
                <Link
                  href="/learning?level=undergraduate"
                  className="button"
                >
                  Undergraduate learning
                </Link>

                <Link
                  href="/learning?level=postgraduate"
                  className="button button-outline"
                >
                  Postgraduate learning
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ==================================================================
          INTERNATIONAL / IB
         ================================================================== */}

      <section className="section countries-international-section">
        <div className="shell">
          <div className="countries-international">
            <div className="countries-international-symbol">
              🌐
            </div>

            <div>
              <span className="eyebrow light">
                International learners
              </span>

              <h2>
                Studying outside these systems?
              </h2>

              <p>
                Use the International / IB route as the closest general
                academic framework, or start directly from your subject
                and current learning level.
              </p>

              <div className="course-cta-actions">
                <Link
                  href="/countries/international"
                  className="button button-white"
                >
                  International / IB

                  <Icon
                    name="arrow"
                    size={16}
                  />
                </Link>

                <Link
                  href="/learning"
                  className="button course-dark-outline"
                >
                  Find my learning path
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ==================================================================
          IMPORTANT POSITIONING
         ================================================================== */}

      <section className="section soft">
        <div className="shell">
          <SectionHeading
            eyebrow="A useful distinction"
            title="Curriculum alignment is not the same as curriculum ownership."
            description="My Academic Tutor can organise learning around recognised educational systems without claiming endorsement, affiliation or official status with examination boards, universities or national education authorities."
          />

          <div className="feature-list">
            <div className="feature-item">
              <span className="mini-symbol">
                01
              </span>

              <div>
                <strong>
                  Use recognised terminology
                </strong>

                <p className="countries-feature-copy">
                  Make it easier for learners to identify the level and
                  academic context relevant to them.
                </p>
              </div>
            </div>

            <div className="feature-item">
              <span className="mini-symbol">
                02
              </span>

              <div>
                <strong>
                  Map relevant topics
                </strong>

                <p className="countries-feature-copy">
                  Connect courses and resources to the ideas commonly
                  encountered within a qualification or academic stage.
                </p>
              </div>
            </div>

            <div className="feature-item">
              <span className="mini-symbol">
                03
              </span>

              <div>
                <strong>
                  Avoid false endorsement
                </strong>

                <p className="countries-feature-copy">
                  Never imply that an examination board, university or
                  government body officially approves the platform unless
                  a real partnership exists.
                </p>
              </div>
            </div>

            <div className="feature-item">
              <span className="mini-symbol">
                04
              </span>

              <div>
                <strong>
                  Keep content transferable
                </strong>

                <p className="countries-feature-copy">
                  Teach durable mathematical and computational
                  understanding rather than exam tricks alone.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ==================================================================
          FINAL CTA
         ================================================================== */}

      <section className="section">
        <div className="shell">
          <div className="countries-final">
            <span className="eyebrow">
              Start from your context
            </span>

            <h2>
              Choose your system.
              <br />
              Then choose what you want to learn.
            </h2>

            <p>
              Use a regional route when curriculum context matters, or
              move directly into a subject, course or learning pathway.
            </p>

            <div className="hero-actions">
              <Link
                href="#regions"
                className="button"
              >
                Choose my region

                <Icon
                  name="arrow"
                  size={16}
                />
              </Link>

              <Link
                href="/subjects"
                className="button button-outline"
              >
                Explore subjects
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}