"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import Icon from "@/components/Icon";
import {
  courses,
  levels,
  subjects,
  type LevelSlug,
  type SubjectSlug,
} from "@/lib/data";

type Goal =
  | "understand"
  | "exam"
  | "university"
  | "career"
  | "research"
  | "project";

const goals: {
  value: Goal;
  label: string;
}[] = [
  {
    value: "understand",
    label: "Understand the subject better",
  },
  {
    value: "exam",
    label: "Prepare for an exam",
  },
  {
    value: "university",
    label: "Improve at university",
  },
  {
    value: "career",
    label: "Build career skills",
  },
  {
    value: "research",
    label: "Support research or a dissertation",
  },
  {
    value: "project",
    label: "Complete a practical project",
  },
];

export default function PathFinder() {
  const [subjectSlug, setSubjectSlug] =
    useState<SubjectSlug>("statistics");

  const [levelSlug, setLevelSlug] =
    useState<LevelSlug>("undergraduate");

  const [goal, setGoal] =
    useState<Goal>("understand");

  const [submitted, setSubmitted] =
    useState(false);

  const selectedSubject = useMemo(
    () =>
      subjects.find(
        (subject) => subject.slug === subjectSlug
      ),
    [subjectSlug]
  );

  const selectedLevel = useMemo(
    () =>
      levels.find(
        (level) => level.slug === levelSlug
      ),
    [levelSlug]
  );

  const recommendedCourses = useMemo(() => {
    const exactMatches = courses.filter(
      (course) =>
        course.subject === subjectSlug &&
        course.level === levelSlug
    );

    if (exactMatches.length > 0) {
      return exactMatches.slice(0, 3);
    }

    return courses
      .filter(
        (course) =>
          course.subject === subjectSlug
      )
      .slice(0, 3);
  }, [subjectSlug, levelSlug]);

  const goalLabel =
    goals.find(
      (item) => item.value === goal
    )?.label ?? "";

  function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    setSubmitted(true);
  }

  return (
    <div className="pathfinder-card">
      {/* --------------------------------------------------------------
          Header
         -------------------------------------------------------------- */}

      <div className="pathfinder-head">
        <div>
          <span className="eyebrow light">
            Not sure where to start?
          </span>

          <h2>
            Find your learning path.
          </h2>

          <p className="pathfinder-intro">
            Tell us what you want to learn, where you are now and what
            you want to achieve. We&apos;ll point you towards a sensible
            starting route.
          </p>
        </div>

        <span className="pathfinder-badge">
          <Icon
            name="spark"
            size={14}
          />
          Guided recommendation
        </span>
      </div>

      {/* --------------------------------------------------------------
          Form
         -------------------------------------------------------------- */}

      <form
        className="pathfinder-grid"
        onSubmit={handleSubmit}
      >
        <label>
          <span>
            Subject
          </span>

          <select
            value={subjectSlug}
            onChange={(event) => {
              setSubjectSlug(
                event.target.value as SubjectSlug
              );

              setSubmitted(false);
            }}
          >
            {subjects.map((subject) => (
              <option
                key={subject.slug}
                value={subject.slug}
              >
                {subject.name}
              </option>
            ))}
          </select>
        </label>

        <label>
          <span>
            Level
          </span>

          <select
            value={levelSlug}
            onChange={(event) => {
              setLevelSlug(
                event.target.value as LevelSlug
              );

              setSubmitted(false);
            }}
          >
            {levels.map((level) => (
              <option
                key={level.slug}
                value={level.slug}
              >
                {level.name}
              </option>
            ))}
          </select>
        </label>

        <label>
          <span>
            Goal
          </span>

          <select
            value={goal}
            onChange={(event) => {
              setGoal(
                event.target.value as Goal
              );

              setSubmitted(false);
            }}
          >
            {goals.map((item) => (
              <option
                key={item.value}
                value={item.value}
              >
                {item.label}
              </option>
            ))}
          </select>
        </label>

        <button
          type="submit"
          className="button button-white pathfinder-button"
        >
          Show my path
          <Icon
            name="arrow"
            size={15}
          />
        </button>
      </form>

      {/* --------------------------------------------------------------
          Default state
         -------------------------------------------------------------- */}

      {!submitted && (
        <div className="pathfinder-result">
          <span
            className={`mini-symbol ${
              selectedSubject?.accent ?? ""
            }`}
          >
            {selectedSubject?.symbol ?? "•"}
          </span>

          <p>
            Currently exploring{" "}
            <em>
              {selectedSubject?.name}
            </em>{" "}
            at{" "}
            <em>
              {selectedLevel?.name}
            </em>{" "}
            level.
          </p>
        </div>
      )}

      {/* --------------------------------------------------------------
          Recommendation result
         -------------------------------------------------------------- */}

      {submitted && (
        <div className="pathfinder-recommendation">
          <div className="pathfinder-recommendation-top">
            <div
              className={`pathfinder-recommendation-symbol ${
                selectedSubject?.accent ?? ""
              }`}
            >
              <span className="subject-symbol">
                {selectedSubject?.symbol}
              </span>
            </div>

            <div>
              <span className="eyebrow light">
                Your suggested starting route
              </span>

              <h3>
                {selectedSubject?.name} ·{" "}
                {selectedLevel?.name}
              </h3>

              <p>
                Goal: {goalLabel}
              </p>
            </div>
          </div>

          <div className="pathfinder-course-list">
            {recommendedCourses.length > 0 ? (
              recommendedCourses.map(
                (course, index) => (
                  <Link
                    key={course.slug}
                    href={`/courses/${course.slug}`}
                    className="pathfinder-course-row"
                  >
                    <span className="pathfinder-course-number">
                      {String(
                        index + 1
                      ).padStart(2, "0")}
                    </span>

                    <span className="pathfinder-course-copy">
                      <strong>
                        {course.title}
                      </strong>

                      <small>
                        {course.lessons} lessons ·{" "}
                        {course.duration}
                      </small>
                    </span>

                    <Icon
                      name="arrow"
                      size={15}
                    />
                  </Link>
                )
              )
            ) : (
              <div className="pathfinder-empty">
                We&apos;re still expanding this learning route.
              </div>
            )}
          </div>

          <div className="pathfinder-recommendation-bottom">
            <p>
              Start with the first course, then move through the route
              in order. You can change your subject, level or goal
              above at any time.
            </p>

            <Link
              href={`/subjects/${subjectSlug}/${levelSlug}`}
              className="button button-white"
            >
              Explore this level
              <Icon
                name="arrow"
                size={15}
              />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}