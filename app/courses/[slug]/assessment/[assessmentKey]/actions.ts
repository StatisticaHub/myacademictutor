"use server";

import {
  createClient,
} from "@/lib/supabase/server";

import {
  getAssessment,
} from "@/lib/assessments";

import type {
  AssessmentResult,
} from "@/lib/assessments/types";


export async function submitAssessment(
  courseSlug: string,
  assessmentKey: string,
  answers: number[]
): Promise<AssessmentResult> {

  /* ----------------------------------------------------------------------
     FIND ASSESSMENT
     ---------------------------------------------------------------------- */

  const assessment =
    getAssessment(
      courseSlug,
      assessmentKey
    );


  if (!assessment) {
    return {
      success: false,
      message:
        "Assessment not found.",
    };
  }


  /* ----------------------------------------------------------------------
     AUTHENTICATION
     ---------------------------------------------------------------------- */

  const supabase =
    await createClient();


  const {
    data,
    error:
      claimsError,
  } =
    await supabase.auth.getClaims();


  const userId =
    data?.claims?.sub;


  if (
    claimsError ||
    !userId
  ) {
    return {
      success: false,
      message:
        "You need to sign in before submitting an assessment.",
    };
  }


  /* ----------------------------------------------------------------------
     CONFIRM ENROLMENT
     ---------------------------------------------------------------------- */

  const {
    data:
      enrollment,
    error:
      enrollmentError,
  } =
    await supabase
      .from(
        "enrollments"
      )
      .select(
        "course_slug"
      )
      .eq(
        "user_id",
        userId
      )
      .eq(
        "course_slug",
        courseSlug
      )
      .maybeSingle();


  if (
    enrollmentError ||
    !enrollment
  ) {
    return {
      success: false,
      message:
        "You must be enrolled in this course before taking its assessments.",
    };
  }


  /* ----------------------------------------------------------------------
     VALIDATE ANSWERS
     ---------------------------------------------------------------------- */

  if (
    answers.length !==
    assessment.questions.length
  ) {
    return {
      success: false,
      message:
        "Please answer every question before submitting.",
    };
  }


  const valid =
    answers.every(
      (
        answer,
        index
      ) => {

        const question =
          assessment
            .questions[
            index
          ];


        return (
          Number.isInteger(
            answer
          ) &&
          answer >= 0 &&
          answer <
            question.options.length
        );
      }
    );


  if (!valid) {
    return {
      success: false,
      message:
        "One or more submitted answers are invalid.",
    };
  }


  /* ----------------------------------------------------------------------
     GRADE SERVER-SIDE
     ---------------------------------------------------------------------- */

  const review =
    assessment.questions.map(
      (
        question,
        index
      ) => {

        const selectedIndex =
          answers[
            index
          ];


        return {
          questionId:
            question.id,

          selectedIndex,

          correctIndex:
            question.correctIndex,

          correct:
            selectedIndex ===
            question.correctIndex,

          explanation:
            question.explanation,
        };
      }
    );


  const score =
    review.filter(
      (item) =>
        item.correct
    ).length;


  const maxScore =
    assessment
      .questions
      .length;


  const percentage =
    Number(
      (
        (
          score /
          maxScore
        ) *
        100
      ).toFixed(
        2
      )
    );


  const passed =
    percentage >=
    assessment
      .passingPercentage;


  /* ----------------------------------------------------------------------
     SAVE ATTEMPT
     ---------------------------------------------------------------------- */

  const {
    error:
      insertError,
  } =
    await supabase
      .from(
        "assessment_attempts"
      )
      .insert({
        user_id:
          userId,

        course_slug:
          courseSlug,

        assessment_key:
          assessmentKey,

        assessment_type:
          assessment.type,

        score,

        max_score:
          maxScore,

        percentage,

        passed,

        answers,
      });


  if (insertError) {
    console.error(
      "Assessment attempt insert failed:",
      insertError
    );


    return {
      success: false,
      message:
        "Your assessment could not be saved. Please try again.",
    };
  }


  return {
    success: true,
    score,
    maxScore,
    percentage,
    passed,
    review,
  };
}