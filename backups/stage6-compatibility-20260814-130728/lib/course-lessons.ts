import {
  getCourseDefinition,
} from "@/lib/course-engine";


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


function buildCourseStructure(
  courseSlug:
    string
) {

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

                  globalNumber:
                    globalIndex +
                    1,

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
  courseSlug:
    string
) {
  return buildCourseStructure(
    courseSlug
  ).modules;
}


export function getCourseLessons(
  courseSlug:
    string
) {
  return buildCourseStructure(
    courseSlug
  ).lessons;
}


export function getCourseLesson(
  courseSlug:
    string,
  lessonKey:
    string
) {
  return getCourseLessons(
    courseSlug
  ).find(
    (
      lesson
    ) =>
      lesson.key ===
      lessonKey
  );
}


export function getFirstLesson(
  courseSlug:
    string
) {
  return getCourseLessons(
    courseSlug
  )[0];
}


export function getActualLessonCount(
  courseSlug:
    string
) {
  return getCourseLessons(
    courseSlug
  ).length;
}


export function getLessonNavigation(
  courseSlug:
    string,
  lessonKey:
    string
) {

  const lessons =
    getCourseLessons(
      courseSlug
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


  /*
   * Both naming conventions are intentionally returned.
   * This keeps older lesson-page code compatible during the refactor.
   */
  return {
    previous,
    next,

    previousLesson:
      previous,

    nextLesson:
      next,
  };
}
