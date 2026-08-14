import type {
  Course,
} from "@/lib/data";

import {
  getCourseDefinition,
} from "@/lib/course-engine";

import {
  isCourseLearningAccessible,
} from "@/lib/course-engine/publication";


type CourseReference =
  | string
  | Pick<
      Course,
      "slug"
    >;


export type CourseLesson = {
  key: string;
  title: string;

  courseSlug: string;

  moduleIndex: number;
  moduleNumber: number;
  moduleTitle: string;
  moduleSlug: string;
  moduleKey: string;

  lessonIndex: number;
  lessonNumber: number;

  globalIndex: number;
  globalNumber: number;

  /*
   * Backwards-compatible alias used by the existing lesson page.
   * This is the course-wide lesson number (1, 2, 3, ...).
   */
  number: number;

  contentKey?: string;
  estimatedMinutes?: number;
  labKey?: string;
};


export type CourseModule = {
  key: string;
  slug: string;
  title: string;

  index: number;
  number: number;
  moduleIndex: number;
  moduleNumber: number;

  checkpointKey?: string;

  lessons: CourseLesson[];
};


function resolveCourseSlug(
  course:
    CourseReference
) {
  return typeof course ===
    "string"
    ? course
    : course.slug;
}


function buildCourseStructure(
  course:
    CourseReference
) {

  const courseSlug =
    resolveCourseSlug(
      course
    );


  if (
    !isCourseLearningAccessible(
      courseSlug
    )
  ) {
    return {
      modules:
        [] as CourseModule[],

      lessons:
        [] as CourseLesson[],
    };
  }


  const definition =
    getCourseDefinition(
      courseSlug
    );


  if (!definition) {
    return {
      modules:
        [] as CourseModule[],

      lessons:
        [] as CourseLesson[],
    };
  }


  const lessons:
    CourseLesson[] =
    [];


  const modules:
    CourseModule[] =
    definition
      .modules
      .map(
        (
          module,
          moduleIndex
        ) => {

          const moduleNumber =
            moduleIndex +
            1;


          const moduleLessons =
            module.lessons.map(
              (
                source,
                lessonIndex
              ) => {

                const lessonNumber =
                  lessonIndex +
                  1;


                const globalIndex =
                  lessons.length;


                const globalNumber =
                  globalIndex +
                  1;


                const result:
                  CourseLesson = {

                  key:
                    source.key,

                  title:
                    source.title,

                  courseSlug,

                  moduleIndex,
                  moduleNumber,

                  moduleTitle:
                    module.title,

                  moduleSlug:
                    module.key,

                  moduleKey:
                    module.key,

                  lessonIndex,
                  lessonNumber,

                  globalIndex,
                  globalNumber,

                  number:
                    globalNumber,

                  contentKey:
                    source.contentKey,

                  estimatedMinutes:
                    source.estimatedMinutes,

                  labKey:
                    source.labKey,
                };


                lessons.push(
                  result
                );


                return result;
              }
            );


          return {
            key:
              module.key,

            slug:
              module.key,

            title:
              module.title,

            index:
              moduleIndex,

            number:
              moduleNumber,

            moduleIndex,
            moduleNumber,

            checkpointKey:
              module.checkpointKey,

            lessons:
              moduleLessons,
          };
        }
      );


  return {
    modules,
    lessons,
  };
}


export function getCourseModules(
  course:
    CourseReference
) {
  return buildCourseStructure(
    course
  ).modules;
}


export function getCourseLessons(
  course:
    CourseReference
) {
  return buildCourseStructure(
    course
  ).lessons;
}


export function getCourseLesson(
  course:
    CourseReference,
  lessonKey:
    string
) {
  return getCourseLessons(
    course
  ).find(
    (
      lesson
    ) =>
      lesson.key ===
      lessonKey
  );
}


export function getFirstLesson(
  course:
    CourseReference
) {
  return getCourseLessons(
    course
  )[0];
}


export function getActualLessonCount(
  course:
    CourseReference
) {
  return getCourseLessons(
    course
  ).length;
}


export function getLessonNavigation(
  course:
    CourseReference,
  lessonKey:
    string
) {

  const lessons =
    getCourseLessons(
      course
    );


  const index =
    lessons.findIndex(
      (
        lesson
      ) =>
        lesson.key ===
        lessonKey
    );


  if (
    index <
    0
  ) {
    return {
      previous:
        undefined,

      next:
        undefined,

      previousLesson:
        undefined,

      nextLesson:
        undefined,
    };
  }


  const previous =
    index >
    0
      ? lessons[
          index -
          1
        ]
      : undefined;


  const next =
    index <
    lessons.length -
      1
      ? lessons[
          index +
          1
        ]
      : undefined;


  return {
    previous,
    next,

    previousLesson:
      previous,

    nextLesson:
      next,
  };
}
