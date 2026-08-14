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

import {
  calculusFoundationsModule02,
} from "./calculus-foundations/module-02";

import {
  calculusFoundationsModule03,
} from "./calculus-foundations/module-03";

import {
  calculusFoundationsModule04,
} from "./calculus-foundations/module-04";

import {
  calculusFoundationsModule05,
} from "./calculus-foundations/module-05";

import {
  calculusFoundationsModule06,
} from "./calculus-foundations/module-06";

import {
  calculusFoundationsModule07,
} from "./calculus-foundations/module-07";

import {
  pythonDataAnalysisModule01,
} from "./python-for-data-analysis/module-01";

import {
  pythonDataAnalysisModule02,
} from "./python-for-data-analysis/module-02";

import {
  pythonDataAnalysisModule03,
} from "./python-for-data-analysis/module-03";

import {
  pythonDataAnalysisModule04,
} from "./python-for-data-analysis/module-04";

import {
  pythonDataAnalysisModule05,
} from "./python-for-data-analysis/module-05";

import {
  pythonDataAnalysisModule06,
} from "./python-for-data-analysis/module-06";

import {
  pythonDataAnalysisModule07,
} from "./python-for-data-analysis/module-07";

import {
  pythonDataAnalysisModule08,
} from "./python-for-data-analysis/module-08";

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

  ...calculusFoundationsModule02,

  ...calculusFoundationsModule03,

  ...calculusFoundationsModule04,

  ...calculusFoundationsModule05,

  ...calculusFoundationsModule06,

  ...calculusFoundationsModule07,

  ...pythonDataAnalysisModule01,

  ...pythonDataAnalysisModule02,

  ...pythonDataAnalysisModule03,

  ...pythonDataAnalysisModule04,

  ...pythonDataAnalysisModule05,

  ...pythonDataAnalysisModule06,

  ...pythonDataAnalysisModule07,

  ...pythonDataAnalysisModule08,
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