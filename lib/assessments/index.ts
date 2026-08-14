import type {
  CourseAssessment,
  PublicAssessmentQuestion,
} from "./types";

import {
  statisticsFoundationsAssessments,
} from "./statistics-foundations";

import {
  isCourseLearningAccessible,
} from "@/lib/course-engine/publication";

import {
  calculusFoundationsAssessments,
} from "./calculus-foundations";


export * from "./types";


export const assessments:
  CourseAssessment[] = [

  ...statisticsFoundationsAssessments,

  ...calculusFoundationsAssessments,

];


export function getAssessment(
  courseSlug: string,
  assessmentKey: string
) {
  /* ASSESSMENT PUBLICATION GUARD */
  if (
    !isCourseLearningAccessible(
      courseSlug
    )
  ) {
    return undefined;
  }

return assessments.find(
    (assessment) =>
      assessment.courseSlug ===
        courseSlug &&
      assessment.key ===
        assessmentKey
  );
}


export function getCourseAssessments(
  courseSlug: string
) {
  if (
    !isCourseLearningAccessible(
      courseSlug
    )
  ) {
    return [];
  }

return assessments.filter(
    (assessment) =>
      assessment.courseSlug ===
      courseSlug
  );
}


export function getPublicQuestions(
  assessment: CourseAssessment
): PublicAssessmentQuestion[] {

  return assessment.questions.map(
    (question) => ({
      id:
        question.id,

      question:
        question.question,

      options:
        question.options,
    })
  );
}