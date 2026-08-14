#!/bin/bash
set -e

echo "Applying Stage 6 compatibility fix..."

if [ ! -f package.json ]; then
  echo "ERROR: Run this from the myacademictutor-premium project root."
  exit 1
fi

STAMP="$(date +%Y%m%d-%H%M%S)"
BACKUP_DIR="backups/stage6-compatibility-$STAMP"
mkdir -p "$BACKUP_DIR/lib"

cp lib/course-lessons.ts "$BACKUP_DIR/lib/course-lessons.ts"
cp lib/course-progress.ts "$BACKUP_DIR/lib/course-progress.ts"

cat > lib/course-lessons.ts <<'__MAT_EOF__'
import type {
  Course,
} from "@/lib/data";

import {
  getCourseDefinition,
} from "@/lib/course-engine";


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
__MAT_EOF__

cat > lib/course-progress.ts <<'__MAT_EOF__'
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

  /*
   * Backwards-compatible boolean used by existing course UI.
   */
  finalAssessmentExists:
    boolean;

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


  const finalAssessmentExists =
    Boolean(
      finalKey
    );


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

    finalAssessmentExists,

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
__MAT_EOF__

echo ""
echo "Compatibility fix applied."
echo "Backup: $BACKUP_DIR"
echo ""
echo "Now run:"
echo "  node scripts/audit-course-engine.mjs"
echo "  npm run build"
