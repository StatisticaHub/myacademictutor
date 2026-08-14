/* ==========================================================================
   MY ACADEMIC TUTOR
   Authored Lesson Registry
   ========================================================================== */

import type {
  LessonContent,
} from "./types";

import {
  statisticsFoundationsModule01,
} from "./statistics-foundations/module-01";

import {
  statisticsFoundationsModule02,
} from "./statistics-foundations/module-02";

import {
  statisticsFoundationsModule03,
} from "./statistics-foundations/module-03";

import {
  statisticsFoundationsModule04,
} from "./statistics-foundations/module-04";

import {
  statisticsFoundationsModule05,
} from "./statistics-foundations/module-05";

import {
  statisticsFoundationsModule06,
} from "./statistics-foundations/module-06";

import {
  statisticsFoundationsModule07,
} from "./statistics-foundations/module-07";

import {
  calculusFoundationsModule01,
} from "./calculus-foundations/module-01";

/* ==========================================================================
   EXPORT TYPES
   ========================================================================== */

export * from "./types";


/* ==========================================================================
   LESSON REGISTRY
   ========================================================================== */

export const authoredLessons:
  LessonContent[] = [

  ...statisticsFoundationsModule01,

  ...statisticsFoundationsModule02,

  ...statisticsFoundationsModule03,

  ...statisticsFoundationsModule04,
  
  ...statisticsFoundationsModule05,

  ...statisticsFoundationsModule06,

  ...statisticsFoundationsModule07,

  ...calculusFoundationsModule01,
];


/* ==========================================================================
   HELPERS
   ========================================================================== */

export function getAuthoredLesson(
  courseSlug: string,
  lessonKey: string
) {
  return authoredLessons.find(
    (lesson) =>
      lesson.courseSlug ===
        courseSlug &&
      lesson.lessonKey ===
        lessonKey
  );
}


export function hasAuthoredLesson(
  courseSlug: string,
  lessonKey: string
) {
  return Boolean(
    getAuthoredLesson(
      courseSlug,
      lessonKey
    )
  );
}