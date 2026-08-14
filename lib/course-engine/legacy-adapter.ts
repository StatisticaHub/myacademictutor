import type {
  Course,
} from "@/lib/data";

import type {
  CourseEngineDefinition,
  CourseEngineLesson,
  CourseEngineModule,
} from "@/lib/course-engine/types";


export function slugifyCourseEngineValue(
  value: string
) {
  return value
    .toLowerCase()
    .trim()
    .replace(
      /&/g,
      " and "
    )
    .replace(
      /[^a-z0-9]+/g,
      "-"
    )
    .replace(
      /^-+|-+$/g,
      ""
    );
}


export function buildCourseLessonKey(
  moduleNumber: number,
  lessonNumber: number,
  moduleKey: string
) {
  return [
    `m${moduleNumber}`,
    `l${lessonNumber}`,
    moduleKey,
  ].join(
    "-"
  );
}


function distributeLessonCounts(
  totalLessons: number,
  moduleCount: number
) {
  if (
    moduleCount <= 0
  ) {
    return [];
  }


  const safeTotal =
    Math.max(
      totalLessons,
      moduleCount
    );


  const base =
    Math.floor(
      safeTotal /
      moduleCount
    );


  const remainder =
    safeTotal %
    moduleCount;


  return Array.from(
    {
      length:
        moduleCount,
    },
    (
      _,
      index
    ) =>
      base +
      (
        index <
        remainder
          ? 1
          : 0
      )
  );
}


export function legacyCourseToEngineDefinition(
  course: Course
): CourseEngineDefinition {

  const counts =
    distributeLessonCounts(
      course.lessons,
      course.modules.length
    );


  const modules:
    CourseEngineModule[] =
    course.modules.map(
      (
        moduleTitle,
        moduleIndex
      ) => {

        const moduleNumber =
          moduleIndex +
          1;


        const moduleKey =
          slugifyCourseEngineValue(
            moduleTitle
          ) ||
          `module-${moduleNumber}`;


        const count =
          counts[
            moduleIndex
          ] ??
          0;


        const lessons:
          CourseEngineLesson[] =
          Array.from(
            {
              length:
                count,
            },
            (
              _,
              lessonIndex
            ) => {

              const lessonNumber =
                lessonIndex +
                1;


              return {
                key:
                  buildCourseLessonKey(
                    moduleNumber,
                    lessonNumber,
                    moduleKey
                  ),

                title:
                  `${moduleTitle} — Lesson ${lessonNumber}`,

                contentKey:
                  buildCourseLessonKey(
                    moduleNumber,
                    lessonNumber,
                    moduleKey
                  ),
              };
            }
          );


        return {
          key:
            moduleKey,

          title:
            moduleTitle,

          lessons,
        };
      }
    );


  return {
    slug:
      course.slug,

    version:
      1,

    title:
      course.title,

    subject:
      course.subject,

    level:
      course.level,

    /*
     * Catalogue courses remain compatible with the existing lesson
     * infrastructure, but they do not suddenly gain formal assessment
     * or certificate requirements simply because they exist in data.ts.
     */
    status:
      "catalogue",

    modules,

    completion: {
      requireAllLessons:
        true,

      requireAllCheckpoints:
        false,

      requireFinalAssessment:
        false,

      certificateEnabled:
        false,
    },
  };
}
