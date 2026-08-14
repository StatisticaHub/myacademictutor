import {
  getCourse,
  type Course,
} from "@/lib/data";


/* ==========================================================================
   TYPES
   ========================================================================== */

export type CourseLesson = {
  key: string;

  number: number;

  moduleIndex: number;

  moduleNumber: number;

  lessonInModule: number;

  title: string;

  moduleTitle: string;

  courseSlug: string;
};


export type CourseModule = {
  number: number;

  title: string;

  lessons: CourseLesson[];
};


/* ==========================================================================
   AUTHORED COURSE OUTLINES
   ========================================================================== */

/*
 * Courses can gradually receive their own canonical lesson titles here.
 *
 * IMPORTANT:
 * The lesson key does NOT depend on the lesson title.
 *
 * Example:
 *
 * m1-l1-thinking-with-data
 *
 * This means changing a lesson title later will not break:
 *
 * - learner progress
 * - Supabase lesson_progress records
 * - existing lesson URLs
 *
 * The module slug remains the stable part of the lesson key.
 */

const courseLessonTitles:
  Record<string, string[][]> = {

  /* ========================================================================
     STATISTICS FOUNDATIONS
     ======================================================================== */

  "statistics-foundations": [

    /* ----------------------------------------------------------------------
       MODULE 1 — THINKING WITH DATA
       ---------------------------------------------------------------------- */

    [
      "What does it mean to think with data?",
      "Types of data and variables",
      "Populations, samples and studies",
      "From questions to evidence",
    ],


    /* ----------------------------------------------------------------------
       MODULE 2 — DESCRIBING DISTRIBUTIONS
       ---------------------------------------------------------------------- */

    [
      "Seeing a distribution",
      "Measuring the centre",
      "Measuring variability",
      "Shape, outliers and comparing distributions",
    ],


    /* ----------------------------------------------------------------------
       MODULE 3 — PROBABILITY ESSENTIALS
       ---------------------------------------------------------------------- */

    [
      "Probability, outcomes and events",
      "Rules of probability",
      "Conditional probability and independence",
      "Probability through trees and simulation",
    ],


    /* ----------------------------------------------------------------------
       MODULE 4 — RANDOM VARIABLES
       ---------------------------------------------------------------------- */

    [
      "Random variables and probability distributions",
      "Expected value and variability",
      "The binomial distribution",
      "The normal distribution",
    ],


    /* ----------------------------------------------------------------------
       MODULE 5 — SAMPLING AND UNCERTAINTY
       ---------------------------------------------------------------------- */

    [
      "Why samples give different answers",
      "Sampling methods and bias",
      "Sampling distributions",
      "Sample size and the Central Limit idea",
    ],


    /* ----------------------------------------------------------------------
       MODULE 6 — CONFIDENCE INTERVALS
       ---------------------------------------------------------------------- */

    [
      "From an estimate to an interval",
      "Building confidence intervals",
      "Interpreting confidence intervals correctly",
    ],


    /* ----------------------------------------------------------------------
       MODULE 7 — HYPOTHESIS TESTING
       ---------------------------------------------------------------------- */

    [
      "Claims, hypotheses and the null model",
      "p-values and statistical significance",
      "From data to a responsible conclusion",
    ],

  ],
};


/* ==========================================================================
   FALLBACK LESSON PATTERN
   ========================================================================== */

/*
 * Courses without a fully authored outline continue to work.
 *
 * As we design each course properly, we will add its real lesson titles to
 * courseLessonTitles above.
 */

const lessonPatterns = [
  "Introduction and core ideas",
  "Key concepts and terminology",
  "Understanding the method",
  "Worked examples",
  "Interpretation and reasoning",
  "Guided practice",
  "Independent application",
  "Common mistakes and misconceptions",
  "Review and consolidation",
];


/* ==========================================================================
   SLUG HELPER
   ========================================================================== */

function slugify(
  value: string
) {
  return value
    .toLowerCase()
    .trim()
    .replace(
      /&/g,
      "and"
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


/* ==========================================================================
   LESSON DISTRIBUTION
   ========================================================================== */

/*
 * Distribute a course's declared number of lessons across its modules.
 *
 * Example:
 *
 * 26 lessons / 7 modules
 *
 * becomes:
 *
 * 4, 4, 4, 4, 4, 3, 3
 */

function distributeLessons(
  totalLessons: number,
  moduleCount: number
) {
  if (
    totalLessons <= 0 ||
    moduleCount <= 0
  ) {
    return [];
  }


  const base =
    Math.floor(
      totalLessons /
      moduleCount
    );


  const remainder =
    totalLessons %
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


/* ==========================================================================
   COURSE MODULES + LESSONS
   ========================================================================== */

export function getCourseModules(
  courseOrSlug:
    Course |
    string
): CourseModule[] {
  const course =
    typeof courseOrSlug ===
      "string"
      ? getCourse(
          courseOrSlug
        )
      : courseOrSlug;


  if (!course) {
    return [];
  }


  const distribution =
    distributeLessons(
      course.lessons,
      course.modules.length
    );


  const authoredOutline =
    courseLessonTitles[
      course.slug
    ];


  let globalLessonNumber =
    1;


  return course.modules.map(
    (
      moduleTitle,
      moduleIndex
    ) => {

      const lessonCount =
        distribution[
          moduleIndex
        ] ?? 0;


      const customTitles =
        authoredOutline?.[
          moduleIndex
        ];


      const moduleSlug =
        slugify(
          moduleTitle
        );


      const lessons =
        Array.from(
          {
            length:
              lessonCount,
          },
          (
            _,
            lessonIndex
          ) => {

            const lessonNumber =
              globalLessonNumber++;


            const fallbackTitle =
              lessonPatterns[
                lessonIndex %
                lessonPatterns.length
              ];


            const title =
              customTitles?.[
                lessonIndex
              ] ??
              fallbackTitle;


            const key =
              `m${moduleIndex + 1}-l${lessonIndex + 1}-${moduleSlug}`;


            return {
              key,

              number:
                lessonNumber,

              moduleIndex,

              moduleNumber:
                moduleIndex +
                1,

              lessonInModule:
                lessonIndex +
                1,

              title,

              moduleTitle,

              courseSlug:
                course.slug,
            };
          }
        );


      return {
        number:
          moduleIndex +
          1,

        title:
          moduleTitle,

        lessons,
      };
    }
  );
}


/* ==========================================================================
   ALL COURSE LESSONS
   ========================================================================== */

export function getCourseLessons(
  courseOrSlug:
    Course |
    string
) {
  return getCourseModules(
    courseOrSlug
  ).flatMap(
    (module) =>
      module.lessons
  );
}


/* ==========================================================================
   SINGLE LESSON
   ========================================================================== */

export function getCourseLesson(
  courseSlug: string,
  lessonKey: string
) {
  return getCourseLessons(
    courseSlug
  ).find(
    (lesson) =>
      lesson.key ===
      lessonKey
  );
}


/* ==========================================================================
   PREVIOUS / NEXT
   ========================================================================== */

export function getLessonNavigation(
  courseSlug: string,
  lessonKey: string
) {
  const lessons =
    getCourseLessons(
      courseSlug
    );


  const index =
    lessons.findIndex(
      (lesson) =>
        lesson.key ===
        lessonKey
    );


  if (index === -1) {
    return {
      previous:
        null,

      next:
        null,
    };
  }


  return {
    previous:
      index > 0
        ? lessons[
            index - 1
          ]
        : null,

    next:
      index <
      lessons.length - 1
        ? lessons[
            index + 1
          ]
        : null,
  };
}


/* ==========================================================================
   FIRST LESSON
   ========================================================================== */

export function getFirstLesson(
  courseSlug: string
) {
  return (
    getCourseLessons(
      courseSlug
    )[0] ??
    null
  );
}


/* ==========================================================================
   ACTUAL LESSON COUNT
   ========================================================================== */

export function getActualLessonCount(
  courseSlug: string
) {
  return getCourseLessons(
    courseSlug
  ).length;
}