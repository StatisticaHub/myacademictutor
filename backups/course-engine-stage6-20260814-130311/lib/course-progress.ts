import {
  getCourseAssessments,
} from "@/lib/assessments";

import {
  getCourseLessons,
} from "@/lib/course-lessons";


export type CourseNextKind =
  | "lesson"
  | "checkpoint"
  | "final"
  | "complete"
  | "course";


export type FinalAssessmentStatus =
  | "not-required"
  | "locked"
  | "ready"
  | "passed";


export type CourseProgressSummary = {
  totalLessons: number;
  completedLessons: number;

  totalCheckpoints: number;
  passedCheckpoints: number;

  finalAssessmentExists: boolean;
  finalAssessmentPassed: boolean;
  finalAssessmentStatus:
    FinalAssessmentStatus;

  allLessonsComplete: boolean;
  allCheckpointsPassed: boolean;

  courseComplete: boolean;
  certificateEligible: boolean;

  overallCompletedUnits: number;
  overallTotalUnits: number;
  overallPercentage: number;

  nextHref: string;
  nextActionLabel: string;
  nextKind: CourseNextKind;
};


export function getModuleNumberFromLessonKey(
  lessonKey: string
) {
  const match =
    lessonKey.match(
      /^m(\d+)-/
    );


  if (!match) {
    return null;
  }


  return Number(
    match[1]
  );
}


export function getModuleLessonKeys(
  courseSlug: string,
  moduleNumber: number
) {
  return getCourseLessons(
    courseSlug
  )
    .filter(
      (lesson) =>
        getModuleNumberFromLessonKey(
          lesson.key
        ) ===
        moduleNumber
    )
    .map(
      (lesson) =>
        lesson.key
    );
}


export function buildCourseProgress(
  courseSlug: string,
  completedLessonKeys:
    string[],
  passedAssessmentKeys:
    string[]
): CourseProgressSummary {

  const lessons =
    getCourseLessons(
      courseSlug
    );


  const assessments =
    getCourseAssessments(
      courseSlug
    );


  const completedSet =
    new Set(
      completedLessonKeys
    );


  const passedSet =
    new Set(
      passedAssessmentKeys
    );


  const checkpoints =
    assessments
      .filter(
        (assessment) =>
          assessment.type ===
          "module-checkpoint"
      )
      .sort(
        (
          a,
          b
        ) =>
          (
            a.moduleNumber ??
            999
          ) -
          (
            b.moduleNumber ??
            999
          )
      );


  const finalAssessment =
    assessments.find(
      (assessment) =>
        assessment.type ===
        "final-assessment"
    );


  const completedLessons =
    lessons.filter(
      (lesson) =>
        completedSet.has(
          lesson.key
        )
    ).length;


  const passedCheckpoints =
    checkpoints.filter(
      (assessment) =>
        passedSet.has(
          assessment.key
        )
    ).length;


  const finalAssessmentPassed =
    Boolean(
      finalAssessment &&
      passedSet.has(
        finalAssessment.key
      )
    );


  const allLessonsComplete =
    lessons.length > 0 &&
    completedLessons ===
      lessons.length;


  const allCheckpointsPassed =
    checkpoints.every(
      (assessment) =>
        passedSet.has(
          assessment.key
        )
    );


  const courseComplete =
    allLessonsComplete &&
    allCheckpointsPassed &&
    (
      !finalAssessment ||
      finalAssessmentPassed
    );


  const certificateEligible =
    courseComplete &&
    assessments.length > 0;


  let finalAssessmentStatus:
    FinalAssessmentStatus =
      "not-required";


  if (finalAssessment) {
    if (
      finalAssessmentPassed
    ) {
      finalAssessmentStatus =
        "passed";
    } else if (
      allLessonsComplete &&
      allCheckpointsPassed
    ) {
      finalAssessmentStatus =
        "ready";
    } else {
      finalAssessmentStatus =
        "locked";
    }
  }


  const overallTotalUnits =
    lessons.length +
    checkpoints.length +
    (
      finalAssessment
        ? 1
        : 0
    );


  const overallCompletedUnits =
    completedLessons +
    passedCheckpoints +
    (
      finalAssessmentPassed
        ? 1
        : 0
    );


  const overallPercentage =
    overallTotalUnits > 0
      ? Math.min(
          100,
          Math.round(
            (
              overallCompletedUnits /
              overallTotalUnits
            ) *
              100
          )
        )
      : 0;


  /*
   * Guided course order:
   *
   * Module lessons
   *      ↓
   * That module's checkpoint
   *      ↓
   * Next module
   *      ↓
   * Final assessment
   *      ↓
   * Completion page
   */
  for (
    const checkpoint
    of checkpoints
  ) {

    const moduleNumber =
      checkpoint
        .moduleNumber;


    if (
      typeof moduleNumber ===
      "number"
    ) {

      const moduleLessons =
        lessons.filter(
          (lesson) =>
            getModuleNumberFromLessonKey(
              lesson.key
            ) ===
            moduleNumber
        );


      const firstIncomplete =
        moduleLessons.find(
          (lesson) =>
            !completedSet.has(
              lesson.key
            )
        );


      if (
        firstIncomplete
      ) {
        return {
          totalLessons:
            lessons.length,

          completedLessons,

          totalCheckpoints:
            checkpoints.length,

          passedCheckpoints,

          finalAssessmentExists:
            Boolean(
              finalAssessment
            ),

          finalAssessmentPassed,

          finalAssessmentStatus,

          allLessonsComplete,

          allCheckpointsPassed,

          courseComplete,

          certificateEligible,

          overallCompletedUnits,

          overallTotalUnits,

          overallPercentage,

          nextHref:
            `/courses/${courseSlug}/learn/${firstIncomplete.key}`,

          nextActionLabel:
            "Continue learning",

          nextKind:
            "lesson",
        };
      }
    }


    if (
      !passedSet.has(
        checkpoint.key
      )
    ) {
      return {
        totalLessons:
          lessons.length,

        completedLessons,

        totalCheckpoints:
          checkpoints.length,

        passedCheckpoints,

        finalAssessmentExists:
          Boolean(
            finalAssessment
          ),

        finalAssessmentPassed,

        finalAssessmentStatus,

        allLessonsComplete,

        allCheckpointsPassed,

        courseComplete,

        certificateEligible,

        overallCompletedUnits,

        overallTotalUnits,

        overallPercentage,

        nextHref:
          `/courses/${courseSlug}/assessment/${checkpoint.key}`,

        nextActionLabel:
          checkpoint.moduleNumber
            ? `Take Module ${checkpoint.moduleNumber} checkpoint`
            : "Take checkpoint",

        nextKind:
          "checkpoint",
      };
    }
  }


  /*
   * Fallback for courses whose lesson
   * keys are not grouped by module.
   */
  const firstIncompleteLesson =
    lessons.find(
      (lesson) =>
        !completedSet.has(
          lesson.key
        )
    );


  if (
    firstIncompleteLesson
  ) {
    return {
      totalLessons:
        lessons.length,

      completedLessons,

      totalCheckpoints:
        checkpoints.length,

      passedCheckpoints,

      finalAssessmentExists:
        Boolean(
          finalAssessment
        ),

      finalAssessmentPassed,

      finalAssessmentStatus,

      allLessonsComplete,

      allCheckpointsPassed,

      courseComplete,

      certificateEligible,

      overallCompletedUnits,

      overallTotalUnits,

      overallPercentage,

      nextHref:
        `/courses/${courseSlug}/learn/${firstIncompleteLesson.key}`,

      nextActionLabel:
        "Continue learning",

      nextKind:
        "lesson",
    };
  }


  const firstUnpassedCheckpoint =
    checkpoints.find(
      (assessment) =>
        !passedSet.has(
          assessment.key
        )
    );


  if (
    firstUnpassedCheckpoint
  ) {
    return {
      totalLessons:
        lessons.length,

      completedLessons,

      totalCheckpoints:
        checkpoints.length,

      passedCheckpoints,

      finalAssessmentExists:
        Boolean(
          finalAssessment
        ),

      finalAssessmentPassed,

      finalAssessmentStatus,

      allLessonsComplete,

      allCheckpointsPassed,

      courseComplete,

      certificateEligible,

      overallCompletedUnits,

      overallTotalUnits,

      overallPercentage,

      nextHref:
        `/courses/${courseSlug}/assessment/${firstUnpassedCheckpoint.key}`,

      nextActionLabel:
        firstUnpassedCheckpoint
          .moduleNumber
          ? `Take Module ${firstUnpassedCheckpoint.moduleNumber} checkpoint`
          : "Take checkpoint",

      nextKind:
        "checkpoint",
    };
  }


  if (
    finalAssessment &&
    !finalAssessmentPassed
  ) {
    return {
      totalLessons:
        lessons.length,

      completedLessons,

      totalCheckpoints:
        checkpoints.length,

      passedCheckpoints,

      finalAssessmentExists:
        true,

      finalAssessmentPassed,

      finalAssessmentStatus,

      allLessonsComplete,

      allCheckpointsPassed,

      courseComplete,

      certificateEligible,

      overallCompletedUnits,

      overallTotalUnits,

      overallPercentage,

      nextHref:
        `/courses/${courseSlug}/assessment/${finalAssessment.key}`,

      nextActionLabel:
        "Take final assessment",

      nextKind:
        "final",
    };
  }


  if (
    courseComplete
  ) {
    return {
      totalLessons:
        lessons.length,

      completedLessons,

      totalCheckpoints:
        checkpoints.length,

      passedCheckpoints,

      finalAssessmentExists:
        Boolean(
          finalAssessment
        ),

      finalAssessmentPassed,

      finalAssessmentStatus,

      allLessonsComplete,

      allCheckpointsPassed,

      courseComplete,

      certificateEligible,

      overallCompletedUnits,

      overallTotalUnits,

      overallPercentage,

      nextHref:
        `/courses/${courseSlug}/complete`,

      nextActionLabel:
        "View completion",

      nextKind:
        "complete",
    };
  }


  return {
    totalLessons:
      lessons.length,

    completedLessons,

    totalCheckpoints:
      checkpoints.length,

    passedCheckpoints,

    finalAssessmentExists:
      Boolean(
        finalAssessment
      ),

    finalAssessmentPassed,

    finalAssessmentStatus,

    allLessonsComplete,

    allCheckpointsPassed,

    courseComplete,

    certificateEligible,

    overallCompletedUnits,

    overallTotalUnits,

    overallPercentage,

    nextHref:
      `/courses/${courseSlug}`,

    nextActionLabel:
      "View course",

    nextKind:
      "course",
  };
}
