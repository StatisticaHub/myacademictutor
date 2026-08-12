import Link from "next/link";

import Icon from "@/components/Icon";


export default function HomeHero() {
  const journey = [
    {
      number: "01",
      title: "Understand",
      copy:
        "Learn difficult ideas from first principles with clear, structured explanations.",
    },
    {
      number: "02",
      title: "Practise",
      copy:
        "Move through worked examples, guided exercises and independent problems.",
    },
    {
      number: "03",
      title: "Apply",
      copy:
        "Use interactive labs, code and real data to turn knowledge into practical skill.",
    },
    {
      number: "04",
      title: "Advance",
      copy:
        "Build towards university study, research, technical work and deeper learning.",
    },
  ];


  return (
    <section className="home-hero">
      <div className="shell home-hero-grid">

        {/* ================================================================
            LEFT
           ================================================================ */}

        <div className="home-hero-copy">
          <span className="home-hero-eyebrow">
            Structured learning. Deep understanding.
          </span>

          <h1>
            Build the skills
            <br />
            to understand,
            <br />
            analyse and create.
          </h1>

          <p className="home-hero-lead">
            Learn Statistics, Mathematics, Data Science,
            Bioinformatics and Computer Science through rigorous
            courses, interactive practice and expert academic support.
          </p>

          <div className="home-hero-actions">
            <Link
              href="/learning"
              className="button"
            >
              Find my learning path

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


          {/* --------------------------------------------------------------
              Learner levels
             -------------------------------------------------------------- */}

          <div className="home-hero-levels">
            <span>
              <i>✓</i>
              School
            </span>

            <span>
              <i>✓</i>
              Undergraduate
            </span>

            <span>
              <i>✓</i>
              Postgraduate
            </span>

            <span>
              <i>✓</i>
              Learn for Yourself
            </span>
          </div>
        </div>


        {/* ================================================================
            RIGHT — LEARNING JOURNEY
           ================================================================ */}

        <div className="hero-journey-card">
          <div className="hero-journey-glow" />

          <div className="hero-journey-top">
            <span>
              The My Academic Tutor approach
            </span>

            <div className="hero-journey-status">
              <i />
              Structured
            </div>
          </div>


          <div className="hero-journey-heading">
            <span className="eyebrow light">
              Your learning journey
            </span>

            <h2>
              From first principles
              <br />
              to advanced work.
            </h2>
          </div>


          {/* --------------------------------------------------------------
              Journey
             -------------------------------------------------------------- */}

          <div className="hero-journey-steps">
            {journey.map(
              (
                step,
                index
              ) => (
                <div
                  className="hero-journey-step"
                  key={step.number}
                >
                  <div className="hero-journey-marker">
                    <span>
                      {step.number}
                    </span>

                    {index <
                      journey.length -
                        1 && (
                      <i />
                    )}
                  </div>

                  <div className="hero-journey-step-copy">
                    <strong>
                      {step.title}
                    </strong>

                    <p>
                      {step.copy}
                    </p>
                  </div>
                </div>
              )
            )}
          </div>


          {/* --------------------------------------------------------------
              Bottom progression
             -------------------------------------------------------------- */}

          <div className="hero-journey-footer">
            <span>
              Your level can change.
              <br />
              The learning structure stays clear.
            </span>

            <div className="hero-journey-route">
              <span>
                School
              </span>

              <b>→</b>

              <span>
                University
              </span>

              <b>→</b>

              <span>
                Postgrad
              </span>

              <b>→</b>

              <span>
                Beyond
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}