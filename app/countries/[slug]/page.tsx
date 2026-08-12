import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import CourseCard from "@/components/CourseCard";
import Icon from "@/components/Icon";
import SectionHeading from "@/components/SectionHeading";

import {
  countries,
  courses,
  getCountry,
  subjects,
} from "@/lib/data";


/* ==========================================================================
   TYPES
   ========================================================================== */

type CountryPageProps = {
  params: Promise<{
    slug: string;
  }>;
};


type CountryGuidance = {
  learnerContext: string;

  schoolHeading: string;

  schoolCopy: string;

  universityHeading: string;

  universityCopy: string;

  assessmentCopy: string;

  progressionCopy: string;

  terminologyCopy: string;

  courseSlugs: string[];

  schoolExamples: string[];

  principles: {
    title: string;
    copy: string;
  }[];
};


/* ==========================================================================
   COUNTRY-SPECIFIC GUIDANCE
   ========================================================================== */

const countryGuidance: Record<
  string,
  CountryGuidance
> = {
  uk: {
    learnerContext:
      "Use familiar UK academic stages and qualification language while building mathematical, statistical and computational understanding that transfers beyond any single examination.",

    schoolHeading:
      "Build strong foundations alongside UK school study.",

    schoolCopy:
      "School learners can use subject routes alongside the qualifications and courses they are already studying. The emphasis remains on understanding concepts rather than memorising examination procedures alone.",

    universityHeading:
      "Move from qualification-based study into specialist university learning.",

    universityCopy:
      "At undergraduate and postgraduate level, learning increasingly becomes organised around modules, methods, programming tools and research questions rather than one national curriculum.",

    assessmentCopy:
      "Use practice that develops mathematical reasoning, interpretation and problem solving alongside preparation for formal assessment.",

    progressionCopy:
      "Connect school foundations to university-level mathematics, statistics, computing and scientific data analysis.",

    terminologyCopy:
      "Present school learning using terminology that feels familiar within UK education while keeping the underlying concepts internationally transferable.",

    courseSlugs: [
      "a-level-mathematics",
      "a-level-statistics",
      "calculus-foundations",
      "statistics-foundations",
      "python-programming",
      "data-literacy",
    ],

    schoolExamples: [
      "Secondary mathematics",
      "Statistics foundations",
      "A-level progression",
      "Programming foundations",
    ],

    principles: [
      {
        title:
          "Qualification-aware",
        copy:
          "Use the learner's current programme or qualification as context without reducing learning to exam technique.",
      },

      {
        title:
          "University-ready",
        copy:
          "Strengthen the mathematical and computational foundations needed for later quantitative study.",
      },

      {
        title:
          "Transferable",
        copy:
          "Teach ideas in a way that remains useful beyond a particular specification or examination.",
      },
    ],
  },


  usa: {
    learnerContext:
      "Support learners across school, college and university study while recognising that course structures and expectations can vary considerably between states, schools and institutions.",

    schoolHeading:
      "Build quantitative foundations for US school and college preparation.",

    schoolCopy:
      "Learners can strengthen algebra, statistics, calculus and computing while using the course structure that best matches their current programme.",

    universityHeading:
      "Develop the mathematical and computational depth used across college and university study.",

    universityCopy:
      "University-level routes focus increasingly on disciplines, methods and technical capability rather than one standardised school curriculum.",

    assessmentCopy:
      "Combine conceptual understanding with problem solving and preparation for the style of assessment used in the learner's own course.",

    progressionCopy:
      "Move from high-school quantitative foundations into college-level statistics, mathematics, data science and computer science.",

    terminologyCopy:
      "Use familiar US terminology where useful while avoiding assumptions that every school or institution follows the same sequence.",

    courseSlugs: [
      "ap-statistics",
      "algebra-foundations",
      "calculus-foundations",
      "statistics-foundations",
      "python-programming",
      "computer-science-foundations",
    ],

    schoolExamples: [
      "High-school mathematics",
      "AP-style statistics",
      "Calculus preparation",
      "Computer science foundations",
    ],

    principles: [
      {
        title:
          "Course-aware",
        copy:
          "Start from the learner's actual school or college course rather than assuming one national sequence.",
      },

      {
        title:
          "Concept-first",
        copy:
          "Build the reasoning needed for unfamiliar quantitative problems rather than relying only on pattern recognition.",
      },

      {
        title:
          "College-ready",
        copy:
          "Connect school learning with the deeper mathematical and computational demands of higher education.",
      },
    ],
  },


  canada: {
    learnerContext:
      "Support learners across provincial and institutional contexts while keeping the underlying quantitative and computational learning broadly transferable.",

    schoolHeading:
      "Build foundations that work across Canadian school contexts.",

    schoolCopy:
      "Because curriculum structures can vary, the platform focuses on the mathematical, statistical and computational concepts that learners need while allowing the learner's own programme to provide the local sequence.",

    universityHeading:
      "Transition into discipline-based university learning.",

    universityCopy:
      "At university level, methods, theory, programming and research skills become increasingly portable across institutions and provinces.",

    assessmentCopy:
      "Use the learner's own course expectations as assessment context while developing durable quantitative reasoning.",

    progressionCopy:
      "Strengthen the bridge from secondary education into university mathematics, statistics, computing and data-driven disciplines.",

    terminologyCopy:
      "Avoid assuming that one provincial programme represents all Canadian learners.",

    courseSlugs: [
      "algebra-foundations",
      "calculus-foundations",
      "statistics-foundations",
      "probability-data",
      "python-programming",
      "data-literacy",
    ],

    schoolExamples: [
      "Secondary mathematics",
      "Probability & statistics",
      "Calculus preparation",
      "Programming foundations",
    ],

    principles: [
      {
        title:
          "Provincial context",
        copy:
          "Recognise that school programmes can differ while keeping the subject foundations consistent.",
      },

      {
        title:
          "Strong prerequisites",
        copy:
          "Repair gaps in algebra, probability and mathematical reasoning before advanced study.",
      },

      {
        title:
          "University progression",
        copy:
          "Prepare learners for increasingly method-focused quantitative study.",
      },
    ],
  },


  australia: {
    learnerContext:
      "Support learners within their local school and university context while emphasising mathematical reasoning, statistics, programming and transferable analytical skills.",

    schoolHeading:
      "Strengthen quantitative learning alongside Australian secondary study.",

    schoolCopy:
      "Learners can use the platform to reinforce mathematical, statistical and computational concepts while their own school programme determines the exact local sequence and assessment requirements.",

    universityHeading:
      "Move from secondary foundations into specialist university study.",

    universityCopy:
      "University learning increasingly centres on disciplinary methods, technical tools and applied problem solving rather than school-level curriculum labels.",

    assessmentCopy:
      "Develop understanding that supports both formal assessment and later independent quantitative work.",

    progressionCopy:
      "Build a strong bridge into university mathematics, statistics, computing, data science and related scientific disciplines.",

    terminologyCopy:
      "Use broad Australian educational context without assuming identical course structures across every state, territory or institution.",

    courseSlugs: [
      "algebra-foundations",
      "calculus-foundations",
      "statistics-foundations",
      "probability-data",
      "python-programming",
      "data-literacy",
    ],

    schoolExamples: [
      "Secondary mathematics",
      "Statistics & probability",
      "Calculus foundations",
      "Computational skills",
    ],

    principles: [
      {
        title:
          "Local context",
        copy:
          "Use the learner's own programme as the detailed curriculum reference.",
      },

      {
        title:
          "Understanding first",
        copy:
          "Develop concepts that remain useful after the immediate assessment is finished.",
      },

      {
        title:
          "Higher-study preparation",
        copy:
          "Connect mathematical and computational foundations to university-level work.",
      },
    ],
  },


  "new-zealand": {
    learnerContext:
      "Support learners through school and tertiary study while keeping the platform focused on strong quantitative and computational understanding.",

    schoolHeading:
      "Build durable mathematics, statistics and computing foundations.",

    schoolCopy:
      "Use the learner's current programme as the local curriculum context while developing the core reasoning needed across quantitative subjects.",

    universityHeading:
      "Move towards increasingly specialised tertiary learning.",

    universityCopy:
      "At higher levels, the platform focuses on methods, theory, programming and research-oriented capability that transfers between institutions.",

    assessmentCopy:
      "Combine course-specific preparation with deeper conceptual understanding and independent problem solving.",

    progressionCopy:
      "Connect school-level quantitative study with university mathematics, statistics, computing and data analysis.",

    terminologyCopy:
      "Keep local academic context visible without treating one qualification structure as the definition of the subject itself.",

    courseSlugs: [
      "algebra-foundations",
      "calculus-foundations",
      "statistics-foundations",
      "probability-data",
      "python-programming",
      "data-literacy",
    ],

    schoolExamples: [
      "School mathematics",
      "Statistics foundations",
      "Calculus preparation",
      "Programming foundations",
    ],

    principles: [
      {
        title:
          "Context-aware",
        copy:
          "Use the learner's own course or qualification to determine local expectations.",
      },

      {
        title:
          "Reasoning-led",
        copy:
          "Strengthen understanding and problem solving rather than short-term memorisation.",
      },

      {
        title:
          "Progressive",
        copy:
          "Build foundations that support increasingly advanced tertiary study.",
      },
    ],
  },


  ireland: {
    learnerContext:
      "Support learners from school through university while recognising the local qualification context and preserving transferable mathematical and computational understanding.",

    schoolHeading:
      "Strengthen quantitative foundations alongside Irish school study.",

    schoolCopy:
      "School-level learning can complement the learner's existing programme by focusing on concepts, reasoning and problem solving across mathematics, statistics and computing.",

    universityHeading:
      "Transition from school qualifications into specialist higher education.",

    universityCopy:
      "At university level, the emphasis increasingly shifts towards disciplinary theory, quantitative methods, programming and research capability.",

    assessmentCopy:
      "Prepare for the learner's own academic assessments while ensuring that understanding extends beyond examination-specific patterns.",

    progressionCopy:
      "Connect school-level quantitative learning to university mathematics, statistics, computing and scientific data analysis.",

    terminologyCopy:
      "Use familiar Irish academic context where appropriate without implying official alignment or endorsement.",

    courseSlugs: [
      "algebra-foundations",
      "calculus-foundations",
      "statistics-foundations",
      "probability-data",
      "python-programming",
      "data-literacy",
    ],

    schoolExamples: [
      "School mathematics",
      "Statistics foundations",
      "Calculus preparation",
      "Computational learning",
    ],

    principles: [
      {
        title:
          "Qualification-aware",
        copy:
          "Understand the learner's current academic programme before deciding what support is most relevant.",
      },

      {
        title:
          "Foundation-led",
        copy:
          "Strengthen prerequisite knowledge before moving into advanced quantitative material.",
      },

      {
        title:
          "University-ready",
        copy:
          "Build skills that remain valuable in higher education and technical study.",
      },
    ],
  },


  international: {
    learnerContext:
      "Provide a flexible international route for learners using international programmes or educational systems that do not fit one of the country-specific routes.",

    schoolHeading:
      "Use an internationally transferable quantitative foundation.",

    schoolCopy:
      "Start from the subject and level you are studying, then use your own school programme or international qualification as the detailed curriculum reference.",

    universityHeading:
      "Learn through globally transferable academic disciplines.",

    universityCopy:
      "At undergraduate and postgraduate level, mathematical theory, statistical methods, programming and computational research skills transfer strongly across countries and institutions.",

    assessmentCopy:
      "Use your own programme's assessment requirements while building deeper understanding that remains useful across different academic environments.",

    progressionCopy:
      "Move from school-level foundations into internationally transferable university and professional quantitative skills.",

    terminologyCopy:
      "Use broad academic language and adapt terminology to the learner's own educational system where necessary.",

    courseSlugs: [
      "statistics-foundations",
      "algebra-foundations",
      "calculus-foundations",
      "python-programming",
      "data-literacy",
      "computer-science-foundations",
    ],

    schoolExamples: [
      "International mathematics",
      "Statistics foundations",
      "IB-style progression",
      "Computational foundations",
    ],

    principles: [
      {
        title:
          "Flexible",
        copy:
          "Start from the learner's actual programme rather than forcing it into an unsuitable national structure.",
      },

      {
        title:
          "International",
        copy:
          "Prioritise concepts and technical skills that transfer across educational systems.",
      },

      {
        title:
          "Adaptable",
        copy:
          "Use local terminology and assessment requirements when they matter to the learner.",
      },
    ],
  },
};


/* ==========================================================================
   STATIC PARAMS
   ========================================================================== */

export function generateStaticParams() {
  return countries.map(
    (country) => ({
      slug: country.slug,
    })
  );
}


/* ==========================================================================
   METADATA
   ========================================================================== */

export async function generateMetadata({
  params,
}: CountryPageProps): Promise<Metadata> {
  const { slug } =
    await params;

  const country =
    getCountry(slug);


  if (!country) {
    return {
      title:
        "Global Learning",
    };
  }


  return {
    title:
      `${country.name} Learning`,

    description:
      `Explore Statistics, Mathematics, Data Science, Bioinformatics and Computer Science learning for students in ${country.name}.`,

    openGraph: {
      title:
        `${country.name} Learning | My Academic Tutor`,

      description:
        country.copy,
    },
  };
}


/* ==========================================================================
   PAGE
   ========================================================================== */

export default async function CountryPage({
  params,
}: CountryPageProps) {
  const { slug } =
    await params;

  const country =
    getCountry(slug);


  if (!country) {
    notFound();
  }


  const guidance =
    countryGuidance[
      country.slug
    ] ??
    countryGuidance.international;


  const recommendedCourses =
    guidance.courseSlugs
      .map((courseSlug) =>
        courses.find(
          (course) =>
            course.slug ===
            courseSlug
        )
      )
      .filter(
        (
          course
        ): course is NonNullable<
          typeof course
        > => Boolean(course)
      );


  const otherCountries =
    countries
      .filter(
        (item) =>
          item.slug !==
          country.slug
      )
      .slice(0, 4);


  return (
    <>
      {/* ==================================================================
          HERO
         ================================================================== */}

      <section className="page-hero country-detail-hero">
        <div className="shell country-detail-hero-grid">
          <div>
            <div className="breadcrumbs">
              <Link href="/countries">
                Global Learning
              </Link>

              {" / "}

              {country.name}
            </div>

            <span className="eyebrow country-detail-eyebrow">
              Learning in {country.name}
            </span>

            <div className="country-detail-title-row">
              <span className="country-detail-flag">
                {country.flag}
              </span>

              <h1>
                {country.name}
              </h1>
            </div>

            <p>
              {guidance.learnerContext}
            </p>

            <div className="hero-actions">
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

            <div className="hero-proof">
              {country.systems
                .slice(0, 4)
                .map((system) => (
                  <span key={system}>
                    <Icon
                      name="check"
                      size={14}
                    />

                    {system}
                  </span>
                ))}
            </div>
          </div>


          {/* --------------------------------------------------------------
              Context card
             -------------------------------------------------------------- */}

          <aside className="country-context-card">
            <div className="country-context-top">
              <span className="eyebrow light">
                Academic context
              </span>

              <span className="country-context-flag">
                {country.flag}
              </span>
            </div>

            <h2>
              Start from the system
              you already know.
            </h2>

            <p>
              {country.copy}
            </p>

            <div className="country-context-systems">
              <span>
                Relevant systems
              </span>

              {country.systems.map(
                (system) => (
                  <div key={system}>
                    <Icon
                      name="check"
                      size={13}
                    />

                    <strong>
                      {system}
                    </strong>
                  </div>
                )
              )}
            </div>

            <small>
              References to educational systems are descriptive. They do
              not imply official endorsement or affiliation.
            </small>
          </aside>
        </div>
      </section>


      {/* ==================================================================
          HOW TO USE THE COUNTRY ROUTE
         ================================================================== */}

      <section className="section soft">
        <div className="shell">
          <SectionHeading
            eyebrow={`${country.name} learning route`}
            title="Use curriculum context where it helps. Keep the learning transferable."
            description="The regional layer helps learners recognise their academic stage and terminology without changing the underlying mathematical, statistical or computational principles."
          />

          <div className="country-detail-principles">
            {guidance.principles.map(
              (
                principle,
                index
              ) => (
                <div
                  key={
                    principle.title
                  }
                  className="country-detail-principle"
                >
                  <span>
                    {String(
                      index + 1
                    ).padStart(
                      2,
                      "0"
                    )}
                  </span>

                  <h3>
                    {principle.title}
                  </h3>

                  <p>
                    {principle.copy}
                  </p>
                </div>
              )
            )}
          </div>
        </div>
      </section>


      {/* ==================================================================
          SUBJECTS
         ================================================================== */}

      <section className="section">
        <div className="shell">
          <SectionHeading
            eyebrow="Choose a discipline"
            title={`What do you want to learn in ${country.name}?`}
            description="Start with the discipline, then choose the academic level that best matches where you are now."
          />

          <div className="subject-grid">
            {subjects.map(
              (subject) => (
                <Link
                  key={subject.slug}
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


      {/* ==================================================================
          SCHOOL
         ================================================================== */}

      <section className="section dark">
        <div className="shell">
          <div className="country-stage-detail-grid">
            <div>
              <span className="eyebrow light">
                School learning
              </span>

              <h2>
                {guidance.schoolHeading}
              </h2>

              <p>
                {guidance.schoolCopy}
              </p>

              <div className="course-cta-actions">
                <Link
                  href="/learning?level=high-school"
                  className="button button-white"
                >
                  Explore High School

                  <Icon
                    name="arrow"
                    size={16}
                  />
                </Link>

                <Link
                  href="/courses"
                  className="button course-dark-outline"
                >
                  Browse courses
                </Link>
              </div>
            </div>


            <div className="country-school-context">
              <span className="eyebrow light">
                Typical areas to strengthen
              </span>

              {guidance.schoolExamples.map(
                (
                  example,
                  index
                ) => (
                  <div
                    key={example}
                  >
                    <span>
                      {String(
                        index + 1
                      ).padStart(
                        2,
                        "0"
                      )}
                    </span>

                    <strong>
                      {example}
                    </strong>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </section>


      {/* ==================================================================
          SCHOOL COURSE STARTING POINTS
         ================================================================== */}

      {recommendedCourses.length >
        0 && (
        <section className="section soft">
          <div className="shell">
            <SectionHeading
              eyebrow="Useful starting points"
              title={`Courses that may be useful for learners in ${country.name}.`}
              description="These are general learning recommendations rather than an official curriculum mapping. The right starting point depends on the learner's actual course and prior knowledge."
            />

            <div className="course-grid">
              {recommendedCourses.map(
                (course) => (
                  <CourseCard
                    key={
                      course.slug
                    }
                    course={
                      course
                    }
                  />
                )
              )}
            </div>
          </div>
        </section>
      )}


      {/* ==================================================================
          UNIVERSITY
         ================================================================== */}

      <section className="section">
        <div className="shell">
          <div className="country-university-grid">
            <div>
              <span className="eyebrow">
                Undergraduate + postgraduate
              </span>

              <h2>
                {guidance.universityHeading}
              </h2>

              <p>
                {guidance.universityCopy}
              </p>

              <div className="hero-actions">
                <Link
                  href="/learning?level=undergraduate"
                  className="button"
                >
                  Undergraduate

                  <Icon
                    name="arrow"
                    size={15}
                  />
                </Link>

                <Link
                  href="/learning?level=postgraduate"
                  className="button button-outline"
                >
                  Postgraduate
                </Link>
              </div>
            </div>


            <div className="country-university-points">
              <div>
                <span>
                  01
                </span>

                <div>
                  <strong>
                    Terminology
                  </strong>

                  <p>
                    {
                      guidance.terminologyCopy
                    }
                  </p>
                </div>
              </div>

              <div>
                <span>
                  02
                </span>

                <div>
                  <strong>
                    Assessment
                  </strong>

                  <p>
                    {
                      guidance.assessmentCopy
                    }
                  </p>
                </div>
              </div>

              <div>
                <span>
                  03
                </span>

                <div>
                  <strong>
                    Progression
                  </strong>

                  <p>
                    {
                      guidance.progressionCopy
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* ==================================================================
          FOUR LEARNING ROUTES
         ================================================================== */}

      <section className="section soft">
        <div className="shell">
          <SectionHeading
            eyebrow="Choose your stage"
            title="The learning route changes as you progress."
            description="Select the level that best describes what you are trying to achieve now."
          />

          <div className="level-grid">
            <Link
              href="/learning?level=high-school"
              className="level-card"
            >
              <span className="num">
                01
              </span>

              <h3>
                High School
              </h3>

              <small>
                Curriculum + foundations
              </small>

              <p>
                Build the mathematical, statistical and computational
                foundations needed for current study and later progression.
              </p>

              <div className="level-card-footer">
                <span>
                  Explore level
                </span>

                <Icon
                  name="arrow"
                  size={15}
                />
              </div>
            </Link>


            <Link
              href="/learning?level=undergraduate"
              className="level-card"
            >
              <span className="num">
                02
              </span>

              <h3>
                Undergraduate
              </h3>

              <small>
                Theory + application
              </small>

              <p>
                Develop deeper understanding of university modules,
                quantitative methods and technical workflows.
              </p>

              <div className="level-card-footer">
                <span>
                  Explore level
                </span>

                <Icon
                  name="arrow"
                  size={15}
                />
              </div>
            </Link>


            <Link
              href="/learning?level=postgraduate"
              className="level-card"
            >
              <span className="num">
                03
              </span>

              <h3>
                Postgraduate
              </h3>

              <small>
                Advanced + research
              </small>

              <p>
                Move into specialist methods, research-oriented analysis
                and advanced computational learning.
              </p>

              <div className="level-card-footer">
                <span>
                  Explore level
                </span>

                <Icon
                  name="arrow"
                  size={15}
                />
              </div>
            </Link>


            <Link
              href="/learning?level=casual"
              className="level-card"
            >
              <span className="num">
                04
              </span>

              <h3>
                Learn for Yourself
              </h3>

              <small>
                Career + curiosity
              </small>

              <p>
                Learn useful mathematical, programming and data skills
                outside a formal academic programme.
              </p>

              <div className="level-card-footer">
                <span>
                  Explore route
                </span>

                <Icon
                  name="arrow"
                  size={15}
                />
              </div>
            </Link>
          </div>
        </div>
      </section>


      {/* ==================================================================
          CURRICULUM INTEGRITY
         ================================================================== */}

      <section className="section country-integrity-section">
        <div className="shell">
          <div className="country-integrity">
            <div className="country-integrity-symbol">
              ✓
            </div>

            <div>
              <span className="eyebrow light">
                Curriculum integrity
              </span>

              <h2>
                Contextualised for learners.
                <br />
                Not presented as official endorsement.
              </h2>

              <p>
                References to qualifications, education systems or
                academic structures help learners find relevant material.
                Unless explicitly stated otherwise, My Academic Tutor is
                not claiming affiliation with or endorsement by an
                examination board, university, ministry, department or
                other education authority.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* ==================================================================
          TUTORING
         ================================================================== */}

      <section className="section">
        <div className="shell">
          <div className="country-support-grid">
            <div>
              <span className="eyebrow">
                Need individual support?
              </span>

              <h2>
                Tell us what you are studying—not just where you live.
              </h2>

              <p>
                For tutoring, the most useful context is your subject,
                academic level, current course or qualification and the
                exact concept or skill causing difficulty.
              </p>
            </div>

            <div className="country-support-action">
              <Link
                href="/tutoring"
                className="button"
              >
                Explore tutoring

                <Icon
                  name="arrow"
                  size={16}
                />
              </Link>

              <Link
                href="/contact"
                className="button button-outline"
              >
                Send an enquiry
              </Link>
            </div>
          </div>
        </div>
      </section>


      {/* ==================================================================
          OTHER REGIONS
         ================================================================== */}

      <section className="section soft">
        <div className="shell">
          <SectionHeading
            eyebrow="Other academic systems"
            title="Studying somewhere else?"
            description="Switch to another regional context, or use the International / IB route when that is a better fit."
          />

          <div className="country-related-grid">
            {otherCountries.map(
              (item) => (
                <Link
                  key={item.slug}
                  href={`/countries/${item.slug}`}
                  className="country-related-card"
                >
                  <span className="country-related-flag">
                    {item.flag}
                  </span>

                  <div>
                    <strong>
                      {item.name}
                    </strong>

                    <small>
                      {item.systems
                        .slice(0, 2)
                        .join(" · ")}
                    </small>
                  </div>

                  <Icon
                    name="arrow"
                    size={15}
                  />
                </Link>
              )
            )}
          </div>

          <div className="country-related-all">
            <Link
              href="/countries"
              className="button button-outline"
            >
              View all regions

              <Icon
                name="arrow"
                size={15}
              />
            </Link>
          </div>
        </div>
      </section>


      {/* ==================================================================
          FINAL CTA
         ================================================================== */}

      <section className="section">
        <div className="shell">
          <div className="country-detail-final">
            <span className="eyebrow">
              Learning in {country.name}
            </span>

            <h2>
              Your location gives context.
              <br />
              Your goal determines the path.
            </h2>

            <p>
              Choose your discipline and current level, then use courses,
              pathways, Interactive Labs and expert support to build from
              where you are towards where you want to go.
            </p>

            <div className="hero-actions">
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
                href="/courses"
                className="button button-outline"
              >
                Browse courses
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}