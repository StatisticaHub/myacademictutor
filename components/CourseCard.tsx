import Link from "next/link";

import Icon from "@/components/Icon";
import {
  type Course,
  getSubject,
} from "@/lib/data";

type CourseCardProps = {
  course: Course;
};

export default function CourseCard({
  course,
}: CourseCardProps) {
  const subject = getSubject(course.subject);

  const levelLabel =
    course.level === "high-school"
      ? "High School"
      : course.level === "undergraduate"
        ? "Undergraduate"
        : course.level === "postgraduate"
          ? "Postgraduate"
          : "Learn for Yourself";

  return (
    <Link
      href={`/courses/${course.slug}`}
      className={`course-card ${
        subject?.accent ?? ""
      }`}
    >
      {/* --------------------------------------------------------------
          Top
         -------------------------------------------------------------- */}

      <div className="course-card-top">
        <div className="course-card-subject-wrap">
          <span className="course-card-symbol">
            {subject?.symbol ?? "•"}
          </span>

          <span className="course-subject">
            {subject?.name ?? "Course"}
          </span>
        </div>

        <span className="pill">
          {levelLabel}
        </span>
      </div>

      {/* --------------------------------------------------------------
          Content
         -------------------------------------------------------------- */}

      <div className="course-card-content">
        {course.featured && (
          <span className="course-featured-label">
            Featured course
          </span>
        )}

        <h3>{course.title}</h3>

        <p>
          {course.description}
        </p>
      </div>

      {/* --------------------------------------------------------------
          Skills
         -------------------------------------------------------------- */}

      <div className="course-card-skills">
        {course.skills
          .slice(0, 3)
          .map((skill) => (
            <span key={skill}>
              {skill}
            </span>
          ))}
      </div>

      {/* --------------------------------------------------------------
          Meta
         -------------------------------------------------------------- */}

      <div className="course-meta">
        <span>
          {course.lessons} lessons
        </span>

        <span aria-hidden="true">
          •
        </span>

        <span>
          {course.duration}
        </span>
      </div>

      {/* --------------------------------------------------------------
          Bottom
         -------------------------------------------------------------- */}

      <div className="course-card-bottom">
        <span>
          View course
        </span>

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