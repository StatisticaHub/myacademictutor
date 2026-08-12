import Link from "next/link";

import CourseCard from "@/components/CourseCard";
import HomeHero from "@/components/HomeHero";
import Icon from "@/components/Icon";
import PathFinder from "@/components/PathFinder";
import SectionHeading from "@/components/SectionHeading";

import {
  courses,
  pathways,
  subjects,
} from "@/lib/data";

export default function HomePage() {
  const featuredCourses = courses.slice(0, 6);
  const featuredPathways = pathways.slice(0, 4);

  return (
    <>
      {/* ====================================================================
          HERO
         ==================================================================== */}

      <HomeHero />

      {/* ====================================================================
          NEXT HOMEPAGE SECTION
         ==================================================================== */}

      {/* ====================================================================
          TRUST STRIP
         ==================================================================== */}

      <section className="trust-strip">
        <div className="shell trust-inner">
          <span>Structured pathways</span>
          <span>Interactive learning</span>
          <span>University-level depth</span>
          <span>Expert tutoring</span>
          <span>Global curricula</span>
        </div>
      </section>

      {/* ====================================================================
          SUBJECTS
         ==================================================================== */}

      <section className="section">
        <div className="shell">
          <SectionHeading
            eyebrow="Explore by subject"
            title="Five disciplines. One place to learn them deeply."
            description="Start with your subject, then choose the level, pathway and course that match where you are and where you want to go."
          />

          <div className="subject-grid">
            {subjects.map((subject) => (
              <Link
                key={subject.slug}
                href={`/subjects/${subject.slug}`}
                className={`subject-card ${subject.accent}`}
              >
                <span className="subject-symbol">
                  {subject.symbol}
                </span>

                <h3>{subject.name}</h3>

                <p>
                  {subject.description}
                </p>

                <div className="card-arrow">
                  <span>Explore {subject.name}</span>

                  <Icon name="arrow" size={16} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
          LEVELS
         ==================================================================== */}

      <section className="section soft">
        <div className="shell">
          <SectionHeading
            eyebrow="Choose your level"
            title="Learning that meets you where you are."
            description="Study for school, strengthen university understanding, specialise at postgraduate level or simply learn because you want to."
          />

          <div className="level-grid">
            <Link
              href="/learning?level=high-school"
              className="level-card"
            >
              <span className="num">01</span>

              <h3>High School</h3>

              <small>
                Foundations, exams and confidence
              </small>

              <p>
                Build strong fundamentals and prepare for GCSE, A-Level,
                AP, IB and other major international curricula.
              </p>
            </Link>

            <Link
              href="/learning?level=undergraduate"
              className="level-card"
            >
              <span className="num">02</span>

              <h3>Undergraduate</h3>

              <small>
                University modules and skills
              </small>

              <p>
                Master core university topics through structured
                explanations, worked examples and practical exercises.
              </p>
            </Link>

            <Link
              href="/learning?level=postgraduate"
              className="level-card"
            >
              <span className="num">03</span>

              <h3>Postgraduate</h3>

              <small>
                Advanced methods and research
              </small>

              <p>
                Go deeper into advanced statistics, machine learning,
                bioinformatics, computing and research methods.
              </p>
            </Link>

            <Link
              href="/learning?level=casual"
              className="level-card"
            >
              <span className="num">04</span>

              <h3>Learn for Yourself</h3>

              <small>
                Skills, curiosity and career growth
              </small>

              <p>
                Learn Python, statistics, mathematics, data analysis and
                computational skills at your own pace.
              </p>
            </Link>
          </div>
        </div>
      </section>

      {/* ====================================================================
          PATH FINDER
         ==================================================================== */}

      <section className="section">
        <div className="shell">
          <PathFinder />
        </div>
      </section>

      {/* ====================================================================
          FEATURED COURSES
         ==================================================================== */}

      <section className="section soft">
        <div className="shell">
          <SectionHeading
            eyebrow="Popular courses"
            title="Start with a course that moves you forward."
            description="Each course is designed as part of a broader learning journey, so you always know what to learn next."
          />

          <div className="course-grid">
            {featuredCourses.map((course) => (
              <CourseCard
                key={course.slug}
                course={course}
              />
            ))}
          </div>

          <div style={{ marginTop: "34px" }}>
            <Link href="/courses" className="button button-outline">
              Browse all courses
              <Icon name="arrow" size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ====================================================================
          INTERACTIVE LEARNING
         ==================================================================== */}

      <section className="section dark">
        <div className="shell labs-showcase">
          <div>
            <span className="eyebrow light">
              Learn by doing
            </span>

            <div className="section-heading">
              <h2>
                Don&apos;t just watch.
                Understand what changes when you interact.
              </h2>

              <p>
                Explore statistical concepts, mathematical ideas, algorithms
                and data workflows through interactive labs designed to make
                abstract concepts visible.
              </p>
            </div>

            <div className="feature-list">
              <div className="feature-item">
                <Icon name="check" size={17} />
                <span>
                  Manipulate parameters and see results change instantly
                </span>
              </div>

              <div className="feature-item">
                <Icon name="check" size={17} />
                <span>
                  Connect equations with visual intuition
                </span>
              </div>

              <div className="feature-item">
                <Icon name="check" size={17} />
                <span>
                  Explore code and computational workflows
                </span>
              </div>

              <div className="feature-item">
                <Icon name="check" size={17} />
                <span>
                  Practise before moving to assessed work
                </span>
              </div>
            </div>

            <div style={{ marginTop: "28px" }}>
              <Link href="/labs" className="button button-white">
                Explore interactive labs
                <Icon name="arrow" size={16} />
              </Link>
            </div>
          </div>

          <div className="lab-visual">
            <span className="eyebrow">
              Interactive example
            </span>

            <h3
              style={{
                fontFamily: "var(--font-serif), serif",
                fontSize: "31px",
                fontWeight: 610,
                letterSpacing: "-0.03em",
                marginBottom: "8px",
              }}
            >
              See a distribution change in real time.
            </h3>

            <p
              style={{
                color: "#69655e",
                fontSize: "13px",
                maxWidth: "430px",
              }}
            >
              Interactive learning helps move concepts from memorisation
              to intuition.
            </p>

            <div className="chart-demo" aria-hidden="true">
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          PATHWAYS
         ==================================================================== */}

      <section className="section">
        <div className="shell">
          <SectionHeading
            eyebrow="Learning pathways"
            title="Know where you are going, not just what lesson comes next."
            description="Follow curated pathways that connect foundations, technical skills and applied work into a coherent route."
          />

          <div className="pathway-grid">
            {featuredPathways.map((pathway) => (
              <Link
                key={pathway.slug}
                href={`/pathways/${pathway.slug}`}
                className="pathway-card"
              >
                <div className="top">
                  <span className="eyebrow">
                    Pathway
                  </span>

                  <Icon name="arrow" size={17} />
                </div>

                <h3>
                  {pathway.name}
                </h3>

                <p>
                  {pathway.description}
                </p>

                <div className="pathway-steps" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                </div>

                <small>
                  {pathway.steps.length} structured stages
                </small>
              </Link>
            ))}
          </div>

          <div style={{ marginTop: "34px" }}>
            <Link href="/pathways" className="button button-outline">
              Explore all pathways
              <Icon name="arrow" size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ====================================================================
          TUTORING
         ==================================================================== */}

      <section className="section soft">
        <div className="shell">
          <div className="cta-band">
            <div>
              <span className="eyebrow light">
                Expert human support
              </span>

              <h2>
                Learn independently when you can.
                <br />
                Get expert help when you need it.
              </h2>
            </div>

            <div>
              <p>
                Get support with difficult concepts, exam preparation,
                university modules, programming, data analysis, dissertations
                and research methods.
              </p>

              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  flexWrap: "wrap",
                  marginTop: "20px",
                }}
              >
                <Link
                  href="/tutoring"
                  className="button button-white"
                >
                  Explore tutoring
                  <Icon name="arrow" size={16} />
                </Link>

                <Link
                  href="/contact"
                  className="button"
                  style={{
                    borderColor: "#444",
                  }}
                >
                  Talk to us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          GLOBAL LEARNING
         ==================================================================== */}

      <section className="section">
        <div className="shell">
          <SectionHeading
            eyebrow="Global learning"
            title="Built for learners across major English-speaking education systems."
            description="Core concepts stay universal, while curriculum and exam pathways can be aligned to the system you study in."
          />

          <div className="feature-list">
            <Link
              href="/countries/uk"
              className="feature-item"
            >
              <span>🇬🇧</span>
              <div>
                <strong>United Kingdom</strong>
                <div style={{ color: "#6b675f", fontSize: "12px" }}>
                  GCSE, A-Level and university learning
                </div>
              </div>
            </Link>

            <Link
              href="/countries/usa"
              className="feature-item"
            >
              <span>🇺🇸</span>
              <div>
                <strong>United States</strong>
                <div style={{ color: "#6b675f", fontSize: "12px" }}>
                  High school, AP and college pathways
                </div>
              </div>
            </Link>

            <Link
              href="/countries/canada"
              className="feature-item"
            >
              <span>🇨🇦</span>
              <div>
                <strong>Canada</strong>
                <div style={{ color: "#6b675f", fontSize: "12px" }}>
                  Secondary and university learning
                </div>
              </div>
            </Link>

            <Link
              href="/countries/australia"
              className="feature-item"
            >
              <span>🇦🇺</span>
              <div>
                <strong>Australia</strong>
                <div style={{ color: "#6b675f", fontSize: "12px" }}>
                  Secondary and university pathways
                </div>
              </div>
            </Link>

            <Link
              href="/countries/new-zealand"
              className="feature-item"
            >
              <span>🇳🇿</span>
              <div>
                <strong>New Zealand</strong>
                <div style={{ color: "#6b675f", fontSize: "12px" }}>
                  School and tertiary learning
                </div>
              </div>
            </Link>

            <Link
              href="/countries/ireland"
              className="feature-item"
            >
              <span>🇮🇪</span>
              <div>
                <strong>Ireland</strong>
                <div style={{ color: "#6b675f", fontSize: "12px" }}>
                  Secondary and higher education
                </div>
              </div>
            </Link>

            <Link
              href="/countries/international"
              className="feature-item"
            >
              <span>🌍</span>
              <div>
                <strong>International / IB</strong>
                <div style={{ color: "#6b675f", fontSize: "12px" }}>
                  International learners and IB pathways
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ====================================================================
          FINAL CTA
         ==================================================================== */}

      <section className="section soft">
        <div className="shell">
          <div className="testimonial">
            <div className="quote-mark">
              “
            </div>

            <div>
              <blockquote>
                Learning works better when you can see the path, understand the
                idea and practise it until it becomes yours.
              </blockquote>

              <cite>
                The learning philosophy behind My Academic Tutor
              </cite>

              <div style={{ marginTop: "28px" }}>
                <Link href="/learning" className="button">
                  Find your starting point
                  <Icon name="arrow" size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}