import {
  getCourseDefinition,
} from "@/lib/course-engine";

import {
  getCourseLessons,
  getCourseModules,
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
  courseSlug: string;

  totalLessons: number;
  completedLessons: number;

  totalCheckpoints: number;
  passedCheckpoints: number;

  finalAssessmentStatus:
    FinalAssessmentStatus;

  allLessonsComplete:
    boolean;

  allCheckpointsPassed:
    boolean;

  courseComplete:
    boolean;

  certificateEligible:
    boolean;

  totalRequiredUnits:
    number;

  completedRequiredUnits:
    number;

  overallPercentage:
    number;

  nextHref: string;
  nextKind: CourseNextKind;

  nextActionLabel:
    string;

  /*
   * Alias retained for older UI code.
   */
  nextLabel:
    string;
};


export function getModuleNumberFromLessonKey(
  lessonKey:
    string
) {
  const match =
    /^m(\d+)-/
      .exec(
        lessonKey
      );


  if (!match) {
    return null;
  }


  const value =
    Number(
      match[1]
    );


  return Number.isFinite(
    value
  )
    ? value
    : null;
}


export function getModuleLessonKeys(
  courseSlug:
    string,
  moduleNumber:
    number
) {
  return getCourseModules(
    courseSlug
  )
    .find(
      (
        module
      ) =>
        module.moduleNumber ===
        moduleNumber
    )
    ?.lessons
    .map(
      (
        lesson
      ) =>
        lesson.key
    ) ??
    [];
}


function safePercentage(
  completed:
    number,
  total:
    number
) {
  if (
    total <=
    0
  ) {
    return 0;
  }


  return Math.min(
    100,
    Math.max(
      0,
      Math.round(
        completed /
        total *
        100
      )
    )
  );
}


export function buildCourseProgress(
  courseSlug:
    string,
  completedLessonKeys:
    string[],
  passedAssessmentKeys:
    string[]
):
  CourseProgressSummary {

  const definition =
    getCourseDefinition(
      courseSlug
    );


  const lessons =
    getCourseLessons(
      courseSlug
    );


  const modules =
    getCourseModules(
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


  const completedLessons =
    lessons.filter(
      (
        lesson
      ) =>
        completedSet.has(
          lesson.key
        )
    ).length;


  const checkpointKeys =
    modules.flatMap(
      (
        module
      ) =>
        module.checkpointKey
          ? [
              module.checkpointKey,
            ]
          : []
    );


  const passedCheckpoints =
    checkpointKeys.filter(
      (
        key
      ) =>
        passedSet.has(
          key
        )
    ).length;


  const allLessonsComplete =
    lessons.length >
      0 &&
    completedLessons ===
      lessons.length;


  const allCheckpointsPassed =
    checkpointKeys.length ===
      0 ||
    passedCheckpoints ===
      checkpointKeys.length;


  const finalKey =
    definition
      ?.completion
      .finalAssessmentKey;


  const finalRequired =
    Boolean(
      definition
        ?.completion
        .requireFinalAssessment &&
      finalKey
    );


  const finalPassed =
    Boolean(
      finalKey &&
      passedSet.has(
        finalKey
      )
    );


  let finalAssessmentStatus:
    FinalAssessmentStatus =
    "not-required";


  if (
    finalRequired
  ) {

    if (
      finalPassed
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


  const completion =
    definition
      ?.completion;


  const lessonRequirementMet =
    !completion
      ?.requireAllLessons ||
    allLessonsComplete;


  const checkpointRequirementMet =
    !completion
      ?.requireAllCheckpoints ||
    allCheckpointsPassed;


  const finalRequirementMet =
    !completion
      ?.requireFinalAssessment ||
    finalPassed;


  const courseComplete =
    Boolean(
      definition &&
      lessonRequirementMet &&
      checkpointRequirementMet &&
      finalRequirementMet
    );


  const certificateEligible =
    Boolean(
      courseComplete &&
      completion
        ?.certificateEnabled
    );


  const lessonUnits =
    completion
      ?.requireAllLessons
      ? lessons.length
      : 0;


  const checkpointUnits =
    completion
      ?.requireAllCheckpoints
      ? checkpointKeys.length
      : 0;


  const finalUnits =
    completion
      ?.requireFinalAssessment
      ? 1
      : 0;


  const totalRequiredUnits =
    lessonUnits +
    checkpointUnits +
    finalUnits;


  const completedRequiredUnits =
    (
      completion
        ?.requireAllLessons
        ? completedLessons
        : 0
    ) +
    (
      completion
        ?.requireAllCheckpoints
        ? passedCheckpoints
        : 0
    ) +
    (
      completion
        ?.requireFinalAssessment &&
      finalPassed
        ? 1
        : 0
    );


  const overallPercentage =
    safePercentage(
      completedRequiredUnits,
      totalRequiredUnits
    );


  let nextHref =
    `/courses/${courseSlug}`;


  let nextKind:
    CourseNextKind =
    "course";


  let nextActionLabel =
    "View course";


  /*
   * The progression order is defined by the course engine:
   * module lessons → module checkpoint → next module → final → completion.
   */
  outer:
  for (
    const module
    of modules
  ) {

    for (
      const lesson
      of module.lessons
    ) {

      if (
        !completedSet.has(
          lesson.key
        )
      ) {
        nextHref =
          `/courses/${courseSlug}/learn/${lesson.key}`;

        nextKind =
          "lesson";

        nextActionLabel =
          `Continue: ${lesson.title}`;

        break outer;
      }
    }


    if (
      module.checkpointKey &&
      !passedSet.has(
        module.checkpointKey
      )
    ) {
      nextHref =
        `/courses/${courseSlug}/assessment/${module.checkpointKey}`;

      nextKind =
        "checkpoint";

      nextActionLabel =
        `Complete Module ${module.moduleNumber} checkpoint`;

      break;
    }
  }


  if (
    allLessonsComplete &&
    allCheckpointsPassed &&
    finalRequired &&
    !finalPassed &&
    finalKey
  ) {
    nextHref =
      `/courses/${courseSlug}/assessment/${finalKey}`;

    nextKind =
      "final";

    nextActionLabel =
      "Take final assessment";
  }


  if (
    courseComplete
  ) {
    nextHref =
      `/courses/${courseSlug}/complete`;

    nextKind =
      "complete";

    nextActionLabel =
      "View course completion";
  }


  return {
    courseSlug,

    totalLessons:
      lessons.length,

    completedLessons,

    totalCheckpoints:
      checkpointKeys.length,

    passedCheckpoints,

    finalAssessmentStatus,

    allLessonsComplete,

    allCheckpointsPassed,

    courseComplete,

    certificateEligible,

    totalRequiredUnits,

    completedRequiredUnits,

    overallPercentage,

    nextHref,
    nextKind,

    nextActionLabel,

    nextLabel:
      nextActionLabel,
  };
}
