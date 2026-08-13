import type {
  CourseAssessment,
  PublicAssessmentQuestion,
} from "./types";

import {
  statisticsFoundationsAssessments,
} from "./statistics-foundations";


export * from "./types";


export const assessments:
  CourseAssessment[] = [

  ...statisticsFoundationsAssessments,

];


export function getAssessment(
  courseSlug: string,
  assessmentKey: string
) {
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