#!/bin/bash
set -e

echo "Installing Stage 6 — Course Engine..."
echo ""

if [ ! -f package.json ]; then
  echo "ERROR: Run this script from the root of myacademictutor-premium."
  exit 1
fi

STAMP="$(date +%Y%m%d-%H%M%S)"
BACKUP_DIR="backups/course-engine-stage6-$STAMP"

mkdir -p "$BACKUP_DIR/lib"

if [ -f lib/course-lessons.ts ]; then
  cp lib/course-lessons.ts "$BACKUP_DIR/lib/course-lessons.ts"
fi

if [ -f lib/course-progress.ts ]; then
  cp lib/course-progress.ts "$BACKUP_DIR/lib/course-progress.ts"
fi

echo "Backup created at $BACKUP_DIR"
echo ""
mkdir -p "lib/course-engine"
cat > 'lib/course-engine/types.ts' <<'__MAT_STAGE6_EOF__'
import type {
  LevelSlug,
  SubjectSlug,
} from "@/lib/data";


export type CoursePublicationStatus =
  | "catalogue"
  | "draft"
  | "published";


export type CourseEngineLesson = {
  key: string;
  title: string;

  /*
   * Optional authored-content identifier.
   * Existing lesson-content files can keep using the lesson key.
   */
  contentKey?: string;

  estimatedMinutes?: number;

  /*
   * Useful when a future lesson owns an interactive lab.
   * The current renderer can continue using existing lesson blocks.
   */
  labKey?: string;
};


export type CourseEngineModule = {
  key: string;
  title: string;
  lessons: CourseEngineLesson[];

  /*
   * If present, this module participates in checkpoint progression.
   */
  checkpointKey?: string;
};


export type CourseCompletionPolicy = {
  requireAllLessons: boolean;
  requireAllCheckpoints: boolean;
  requireFinalAssessment: boolean;

  /*
   * Kept here rather than hard-coded in the dashboard/progress layer.
   */
  finalAssessmentKey?: string;

  certificateEnabled: boolean;
};


export type CourseEngineDefinition = {
  slug: string;
  version: number;

  title: string;
  subject: SubjectSlug;
  level: LevelSlug;

  status: CoursePublicationStatus;

  modules: CourseEngineModule[];

  completion: CourseCompletionPolicy;
};


export type CourseEngineValidationResult = {
  valid: boolean;
  errors: string[];
};
__MAT_STAGE6_EOF__

mkdir -p "lib/course-engine"
cat > 'lib/course-engine/legacy-adapter.ts' <<'__MAT_STAGE6_EOF__'
import type {
  Course,
} from "@/lib/data";

import type {
  CourseEngineDefinition,
  CourseEngineLesson,
  CourseEngineModule,
} from "@/lib/course-engine/types";


export function slugifyCourseEngineValue(
  value: string
) {
  return value
    .toLowerCase()
    .trim()
    .replace(
      /&/g,
      " and "
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


export function buildCourseLessonKey(
  moduleNumber: number,
  lessonNumber: number,
  moduleKey: string
) {
  return [
    `m${moduleNumber}`,
    `l${lessonNumber}`,
    moduleKey,
  ].join(
    "-"
  );
}


function distributeLessonCounts(
  totalLessons: number,
  moduleCount: number
) {
  if (
    moduleCount <= 0
  ) {
    return [];
  }


  const safeTotal =
    Math.max(
      totalLessons,
      moduleCount
    );


  const base =
    Math.floor(
      safeTotal /
      moduleCount
    );


  const remainder =
    safeTotal %
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


export function legacyCourseToEngineDefinition(
  course: Course
): CourseEngineDefinition {

  const counts =
    distributeLessonCounts(
      course.lessons,
      course.modules.length
    );


  const modules:
    CourseEngineModule[] =
    course.modules.map(
      (
        moduleTitle,
        moduleIndex
      ) => {

        const moduleNumber =
          moduleIndex +
          1;


        const moduleKey =
          slugifyCourseEngineValue(
            moduleTitle
          ) ||
          `module-${moduleNumber}`;


        const count =
          counts[
            moduleIndex
          ] ??
          0;


        const lessons:
          CourseEngineLesson[] =
          Array.from(
            {
              length:
                count,
            },
            (
              _,
              lessonIndex
            ) => {

              const lessonNumber =
                lessonIndex +
                1;


              return {
                key:
                  buildCourseLessonKey(
                    moduleNumber,
                    lessonNumber,
                    moduleKey
                  ),

                title:
                  `${moduleTitle} — Lesson ${lessonNumber}`,

                contentKey:
                  buildCourseLessonKey(
                    moduleNumber,
                    lessonNumber,
                    moduleKey
                  ),
              };
            }
          );


        return {
          key:
            moduleKey,

          title:
            moduleTitle,

          lessons,
        };
      }
    );


  return {
    slug:
      course.slug,

    version:
      1,

    title:
      course.title,

    subject:
      course.subject,

    level:
      course.level,

    /*
     * Catalogue courses remain compatible with the existing lesson
     * infrastructure, but they do not suddenly gain formal assessment
     * or certificate requirements simply because they exist in data.ts.
     */
    status:
      "catalogue",

    modules,

    completion: {
      requireAllLessons:
        true,

      requireAllCheckpoints:
        false,

      requireFinalAssessment:
        false,

      certificateEnabled:
        false,
    },
  };
}
__MAT_STAGE6_EOF__

mkdir -p "lib/course-engine/courses"
cat > 'lib/course-engine/courses/statistics-foundations.ts' <<'__MAT_STAGE6_EOF__'
import type {
  CourseEngineDefinition,
} from "@/lib/course-engine/types";

import {
  buildCourseLessonKey,
} from "@/lib/course-engine/legacy-adapter";


function lesson(
  moduleNumber: number,
  lessonNumber: number,
  moduleKey: string,
  title: string,
  estimatedMinutes = 18
) {
  const key =
    buildCourseLessonKey(
      moduleNumber,
      lessonNumber,
      moduleKey
    );


  return {
    key,
    title,
    contentKey:
      key,
    estimatedMinutes,
  };
}


export const statisticsFoundationsCourse:
  CourseEngineDefinition = {

  slug:
    "statistics-foundations",

  version:
    1,

  title:
    "Statistics Foundations",

  subject:
    "statistics",

  level:
    "high-school",

  status:
    "published",

  modules: [

    {
      key:
        "thinking-with-data",

      title:
        "Thinking with data",

      checkpointKey:
        "module-01-checkpoint",

      lessons: [
        lesson(
          1,
          1,
          "thinking-with-data",
          "What does it mean to think with data?"
        ),

        lesson(
          1,
          2,
          "thinking-with-data",
          "Types of data and variables"
        ),

        lesson(
          1,
          3,
          "thinking-with-data",
          "Populations, samples and studies"
        ),

        lesson(
          1,
          4,
          "thinking-with-data",
          "From questions to evidence"
        ),
      ],
    },


    {
      key:
        "describing-distributions",

      title:
        "Describing distributions",

      checkpointKey:
        "module-02-checkpoint",

      lessons: [
        lesson(
          2,
          1,
          "describing-distributions",
          "Seeing a distribution"
        ),

        lesson(
          2,
          2,
          "describing-distributions",
          "Measuring the centre"
        ),

        lesson(
          2,
          3,
          "describing-distributions",
          "Measuring variability"
        ),

        lesson(
          2,
          4,
          "describing-distributions",
          "Shape, outliers and comparing distributions"
        ),
      ],
    },


    {
      key:
        "probability-essentials",

      title:
        "Probability essentials",

      checkpointKey:
        "module-03-checkpoint",

      lessons: [
        lesson(
          3,
          1,
          "probability-essentials",
          "Probability, outcomes and events"
        ),

        lesson(
          3,
          2,
          "probability-essentials",
          "Rules of probability"
        ),

        lesson(
          3,
          3,
          "probability-essentials",
          "Conditional probability and independence"
        ),

        lesson(
          3,
          4,
          "probability-essentials",
          "Probability through trees and simulation"
        ),
      ],
    },


    {
      key:
        "random-variables",

      title:
        "Random variables",

      checkpointKey:
        "module-04-checkpoint",

      lessons: [
        lesson(
          4,
          1,
          "random-variables",
          "Random variables and probability distributions"
        ),

        lesson(
          4,
          2,
          "random-variables",
          "Expected value and variability"
        ),

        lesson(
          4,
          3,
          "random-variables",
          "The binomial distribution"
        ),

        lesson(
          4,
          4,
          "random-variables",
          "The normal distribution"
        ),
      ],
    },


    {
      key:
        "sampling-and-uncertainty",

      title:
        "Sampling and uncertainty",

      checkpointKey:
        "module-05-checkpoint",

      lessons: [
        lesson(
          5,
          1,
          "sampling-and-uncertainty",
          "Why samples give different answers"
        ),

        lesson(
          5,
          2,
          "sampling-and-uncertainty",
          "Sampling methods and bias"
        ),

        lesson(
          5,
          3,
          "sampling-and-uncertainty",
          "Sampling distributions"
        ),

        lesson(
          5,
          4,
          "sampling-and-uncertainty",
          "Sample size and the Central Limit idea"
        ),
      ],
    },


    {
      key:
        "confidence-intervals",

      title:
        "Confidence intervals",

      checkpointKey:
        "module-06-checkpoint",

      lessons: [
        lesson(
          6,
          1,
          "confidence-intervals",
          "From an estimate to an interval"
        ),

        lesson(
          6,
          2,
          "confidence-intervals",
          "Building confidence intervals"
        ),

        lesson(
          6,
          3,
          "confidence-intervals",
          "Interpreting confidence intervals correctly"
        ),
      ],
    },


    {
      key:
        "hypothesis-testing",

      title:
        "Hypothesis testing",

      checkpointKey:
        "module-07-checkpoint",

      lessons: [
        lesson(
          7,
          1,
          "hypothesis-testing",
          "Claims, hypotheses and the null model"
        ),

        lesson(
          7,
          2,
          "hypothesis-testing",
          "p-values and statistical significance"
        ),

        lesson(
          7,
          3,
          "hypothesis-testing",
          "From data to a responsible conclusion"
        ),
      ],
    },
  ],

  completion: {
    requireAllLessons:
      true,

    requireAllCheckpoints:
      true,

    requireFinalAssessment:
      true,

    finalAssessmentKey:
      "final-assessment",

    certificateEnabled:
      true,
  },
};
__MAT_STAGE6_EOF__

mkdir -p "lib/course-engine/courses"
cat > 'lib/course-engine/courses/index.ts' <<'__MAT_STAGE6_EOF__'
import {
  statisticsFoundationsCourse,
} from "@/lib/course-engine/courses/statistics-foundations";

import type {
  CourseEngineDefinition,
} from "@/lib/course-engine/types";


export const registeredCourseDefinitions:
  CourseEngineDefinition[] = [

  statisticsFoundationsCourse,
];
__MAT_STAGE6_EOF__

mkdir -p "lib/course-engine"
cat > 'lib/course-engine/registry.ts' <<'__MAT_STAGE6_EOF__'
import {
  getCourse,
} from "@/lib/data";

import {
  legacyCourseToEngineDefinition,
} from "@/lib/course-engine/legacy-adapter";

import {
  registeredCourseDefinitions,
} from "@/lib/course-engine/courses";

import type {
  CourseEngineDefinition,
  CourseEngineValidationResult,
} from "@/lib/course-engine/types";


const registeredMap =
  new Map(
    registeredCourseDefinitions
      .map(
        (
          definition
        ) => [
          definition.slug,
          definition,
        ] as const
      )
  );


export function validateCourseDefinition(
  definition:
    CourseEngineDefinition
): CourseEngineValidationResult {

  const errors:
    string[] =
    [];


  if (
    !definition.slug
  ) {
    errors.push(
      "Course slug is required."
    );
  }


  if (
    definition.modules.length ===
    0
  ) {
    errors.push(
      `${definition.slug}: at least one module is required.`
    );
  }


  const moduleKeys =
    new Set<string>();


  const lessonKeys =
    new Set<string>();


  const checkpointKeys =
    new Set<string>();


  for (
    const [
      moduleIndex,
      module,
    ]
    of definition
      .modules
      .entries()
  ) {

    if (
      moduleKeys.has(
        module.key
      )
    ) {
      errors.push(
        `${definition.slug}: duplicate module key "${module.key}".`
      );
    }


    moduleKeys.add(
      module.key
    );


    if (
      module.lessons.length ===
      0
    ) {
      errors.push(
        `${definition.slug}: module ${moduleIndex + 1} has no lessons.`
      );
    }


    if (
      module.checkpointKey
    ) {

      if (
        checkpointKeys.has(
          module.checkpointKey
        )
      ) {
        errors.push(
          `${definition.slug}: duplicate checkpoint key "${module.checkpointKey}".`
        );
      }


      checkpointKeys.add(
        module.checkpointKey
      );
    }


    for (
      const lesson
      of module.lessons
    ) {

      if (
        lessonKeys.has(
          lesson.key
        )
      ) {
        errors.push(
          `${definition.slug}: duplicate lesson key "${lesson.key}".`
        );
      }


      lessonKeys.add(
        lesson.key
      );
    }
  }


  if (
    definition
      .completion
      .requireAllCheckpoints &&
    checkpointKeys.size !==
      definition.modules.length
  ) {
    errors.push(
      `${definition.slug}: completion requires every checkpoint, but one or more modules has no checkpointKey.`
    );
  }


  if (
    definition
      .completion
      .requireFinalAssessment &&
    !definition
      .completion
      .finalAssessmentKey
  ) {
    errors.push(
      `${definition.slug}: final assessment is required but finalAssessmentKey is missing.`
    );
  }


  if (
    definition
      .completion
      .certificateEnabled &&
    !(
      definition
        .completion
        .requireAllLessons ||
      definition
        .completion
        .requireAllCheckpoints ||
      definition
        .completion
        .requireFinalAssessment
    )
  ) {
    errors.push(
      `${definition.slug}: certificate is enabled without a completion requirement.`
    );
  }


  return {
    valid:
      errors.length ===
      0,

    errors,
  };
}


export function getRegisteredCourseDefinition(
  courseSlug:
    string
) {
  return registeredMap.get(
    courseSlug
  );
}


export function hasRegisteredCourseDefinition(
  courseSlug:
    string
) {
  return registeredMap.has(
    courseSlug
  );
}


export function getCourseDefinition(
  courseSlug:
    string
):
  CourseEngineDefinition |
  undefined {

  const registered =
    getRegisteredCourseDefinition(
      courseSlug
    );


  if (registered) {
    return registered;
  }


  const legacy =
    getCourse(
      courseSlug
    );


  if (!legacy) {
    return undefined;
  }


  return legacyCourseToEngineDefinition(
    legacy
  );
}


export function getCourseDefinitionLessonCount(
  courseSlug:
    string
) {
  const definition =
    getCourseDefinition(
      courseSlug
    );


  if (!definition) {
    return 0;
  }


  return definition
    .modules
    .reduce(
      (
        total,
        module
      ) =>
        total +
        module.lessons.length,
      0
    );
}


export function getCourseCheckpointKeys(
  courseSlug:
    string
) {
  const definition =
    getCourseDefinition(
      courseSlug
    );


  if (!definition) {
    return [];
  }


  return definition
    .modules
    .flatMap(
      (
        module
      ) =>
        module.checkpointKey
          ? [
              module.checkpointKey,
            ]
          : []
    );
}
__MAT_STAGE6_EOF__

mkdir -p "lib/course-engine"
cat > 'lib/course-engine/index.ts' <<'__MAT_STAGE6_EOF__'
export * from "@/lib/course-engine/types";

export {
  buildCourseLessonKey,
  legacyCourseToEngineDefinition,
  slugifyCourseEngineValue,
} from "@/lib/course-engine/legacy-adapter";

export {
  getCourseCheckpointKeys,
  getCourseDefinition,
  getCourseDefinitionLessonCount,
  getRegisteredCourseDefinition,
  hasRegisteredCourseDefinition,
  validateCourseDefinition,
} from "@/lib/course-engine/registry";
__MAT_STAGE6_EOF__

mkdir -p "lib"
cat > 'lib/course-lessons.ts' <<'__MAT_STAGE6_EOF__'
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
__MAT_STAGE6_EOF__

mkdir -p "lib"
cat > 'lib/course-progress.ts' <<'__MAT_STAGE6_EOF__'
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
__MAT_STAGE6_EOF__

mkdir -p "scripts"
cat > 'scripts/create-course-engine.mjs' <<'__MAT_STAGE6_EOF__'
import fs from "node:fs";
import path from "node:path";


const courseSlug =
  process.argv[2];


if (!courseSlug) {
  console.error(
    `
Usage:
  node scripts/create-course-engine.mjs <course-slug>

Example:
  node scripts/create-course-engine.mjs calculus-foundations

The script reads that course from lib/data.ts, creates a course-engine
definition, and registers it automatically. Review the generated TODO
lesson titles before publishing.
`
  );

  process.exit(
    1
  );
}


const cwd =
  process.cwd();


const dataPath =
  path.join(
    cwd,
    "lib",
    "data.ts"
  );


const registryPath =
  path.join(
    cwd,
    "lib",
    "course-engine",
    "courses",
    "index.ts"
  );


if (
  !fs.existsSync(
    dataPath
  )
) {
  throw new Error(
    "lib/data.ts was not found."
  );
}


const source =
  fs.readFileSync(
    dataPath,
    "utf8"
  );


const slugNeedle =
  `slug: "${courseSlug}"`;


const slugPosition =
  source.indexOf(
    slugNeedle
  );


if (
  slugPosition <
  0
) {
  throw new Error(
    `Course "${courseSlug}" was not found in lib/data.ts.`
  );
}


const objectStart =
  source.lastIndexOf(
    "\n  {",
    slugPosition
  );


const nextObject =
  source.indexOf(
    "\n  {",
    slugPosition +
      slugNeedle.length
  );


const coursesEnd =
  source.indexOf(
    "\n];",
    slugPosition
  );


let objectEnd =
  nextObject;


if (
  objectEnd <
  0 ||
  (
    coursesEnd >
      0 &&
    coursesEnd <
      objectEnd
  )
) {
  objectEnd =
    coursesEnd;
}


if (
  objectStart <
    0 ||
  objectEnd <
    0
) {
  throw new Error(
    "Could not safely isolate the course object in lib/data.ts."
  );
}


const block =
  source.slice(
    objectStart,
    objectEnd
  );


function stringField(
  field
) {
  const match =
    new RegExp(
      `${field}:\\s*"([^"]+)"`
    )
      .exec(
        block
      );


  return match
    ?.[
      1
    ];
}


function numberField(
  field
) {
  const match =
    new RegExp(
      `${field}:\\s*(\\d+)`
    )
      .exec(
        block
      );


  return match
    ? Number(
        match[1]
      )
    : undefined;
}


function stringArrayField(
  field
) {
  const match =
    new RegExp(
      `${field}:\\s*\\[([\\s\\S]*?)\\]`,
      "m"
    )
      .exec(
        block
      );


  if (!match) {
    return [];
  }


  return Array.from(
    match[1]
      .matchAll(
        /"([^"]+)"/g
      )
  )
    .map(
      (
        item
      ) =>
        item[1]
    );
}


const title =
  stringField(
    "title"
  );


const subject =
  stringField(
    "subject"
  );


const level =
  stringField(
    "level"
  );


const totalLessons =
  numberField(
    "lessons"
  );


const modules =
  stringArrayField(
    "modules"
  );


if (
  !title ||
  !subject ||
  !level ||
  !totalLessons ||
  modules.length ===
    0
) {
  throw new Error(
    "The course object could not be parsed completely. No files were changed."
  );
}


function slugify(
  value
) {
  return value
    .toLowerCase()
    .replace(
      /&/g,
      " and "
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


const counts =
  Array.from(
    {
      length:
        modules.length,
    },
    () =>
      Math.floor(
        totalLessons /
        modules.length
      )
  );


for (
  let i =
    0;
  i <
    totalLessons %
      modules.length;
  i +=
    1
) {
  counts[i] +=
    1;
}


const exportName =
  courseSlug
    .split(
      "-"
    )
    .map(
      (
        part,
        index
      ) =>
        index ===
        0
          ? part
          : part
              .slice(
                0,
                1
              )
              .toUpperCase() +
            part.slice(
              1
            )
    )
    .join(
      ""
    ) +
  "Course";


const moduleSource =
  modules
    .map(
      (
        moduleTitle,
        moduleIndex
      ) => {

        const moduleNumber =
          moduleIndex +
          1;


        const moduleKey =
          slugify(
            moduleTitle
          );


        const lessonLines =
          Array.from(
            {
              length:
                counts[
                  moduleIndex
                ],
            },
            (
              _,
              lessonIndex
            ) => {

              const lessonNumber =
                lessonIndex +
                1;


              return `        lesson(${moduleNumber}, ${lessonNumber}, ${JSON.stringify(moduleKey)}, ${JSON.stringify(`TODO: ${moduleTitle} lesson ${lessonNumber}`)}),`;
            }
          )
          .join(
            "\n"
          );


        return `    {
      key: ${JSON.stringify(moduleKey)},
      title: ${JSON.stringify(moduleTitle)},
      lessons: [
${lessonLines}
      ],
    },`;
      }
    )
    .join(
      "\n\n"
    );


const generated =
`import type {
  CourseEngineDefinition,
} from "@/lib/course-engine/types";

import {
  buildCourseLessonKey,
} from "@/lib/course-engine/legacy-adapter";


function lesson(
  moduleNumber: number,
  lessonNumber: number,
  moduleKey: string,
  title: string
) {
  const key =
    buildCourseLessonKey(
      moduleNumber,
      lessonNumber,
      moduleKey
    );

  return {
    key,
    title,
    contentKey: key,
  };
}


export const ${exportName}:
  CourseEngineDefinition = {

  slug: ${JSON.stringify(courseSlug)},
  version: 1,

  title: ${JSON.stringify(title)},
  subject: ${JSON.stringify(subject)},
  level: ${JSON.stringify(level)},

  status: "draft",

  modules: [

${moduleSource}
  ],

  completion: {
    requireAllLessons: true,

    /*
     * Turn these on only after the assessment content exists.
     */
    requireAllCheckpoints: false,
    requireFinalAssessment: false,
    certificateEnabled: false,
  },
};
`;


const outputPath =
  path.join(
    cwd,
    "lib",
    "course-engine",
    "courses",
    `${courseSlug}.ts`
  );


if (
  fs.existsSync(
    outputPath
  )
) {
  throw new Error(
    `${outputPath} already exists. Nothing was overwritten.`
  );
}


fs.writeFileSync(
  outputPath,
  generated
);


let registry =
  fs.readFileSync(
    registryPath,
    "utf8"
  );


const importStatement =
`import {
  ${exportName},
} from "@/lib/course-engine/courses/${courseSlug}";

`;


if (
  !registry.includes(
    `courses/${courseSlug}`
  )
) {
  registry =
    importStatement +
    registry;
}


const arrayNeedle =
  "export const registeredCourseDefinitions:";


const arrayStart =
  registry.indexOf(
    arrayNeedle
  );


const closing =
  registry.indexOf(
    "\n];",
    arrayStart
  );


if (
  arrayStart <
    0 ||
  closing <
    0
) {
  throw new Error(
    "Could not update course engine registry."
  );
}


if (
  !registry
    .slice(
      arrayStart,
      closing
    )
    .includes(
      exportName
    )
) {
  registry =
    registry.slice(
      0,
      closing
    ) +
    `\n\n  ${exportName},` +
    registry.slice(
      closing
    );
}


fs.writeFileSync(
  registryPath,
  registry
);


console.log(
  `✓ Created ${path.relative(cwd, outputPath)}`
);

console.log(
  `✓ Registered ${exportName}`
);

console.log(
  ""
);

console.log(
  "Next:"
);

console.log(
  "1. Replace every TODO lesson title with the real curriculum."
);

console.log(
  "2. Add checkpointKey values only when checkpoint content exists."
);

console.log(
  "3. Enable final assessment/certificate only after assessments exist."
);

console.log(
  "4. Run node scripts/audit-course-engine.mjs && npm run build."
);
__MAT_STAGE6_EOF__

mkdir -p "scripts"
cat > 'scripts/audit-course-engine.mjs' <<'__MAT_STAGE6_EOF__'
import fs from "node:fs";
import path from "node:path";


const requiredFiles = [
  "lib/course-engine/types.ts",
  "lib/course-engine/legacy-adapter.ts",
  "lib/course-engine/registry.ts",
  "lib/course-engine/index.ts",
  "lib/course-engine/courses/index.ts",
  "lib/course-engine/courses/statistics-foundations.ts",
  "lib/course-lessons.ts",
  "lib/course-progress.ts",
  "scripts/create-course-engine.mjs",
];


let failed =
  false;


for (
  const relative
  of requiredFiles
) {

  const full =
    path.join(
      process.cwd(),
      relative
    );


  if (
    fs.existsSync(
      full
    )
  ) {
    console.log(
      `✓ ${relative}`
    );
  } else {
    console.error(
      `✗ Missing ${relative}`
    );

    failed =
      true;
  }
}


const statsPath =
  path.join(
    process.cwd(),
    "lib",
    "course-engine",
    "courses",
    "statistics-foundations.ts"
  );


if (
  fs.existsSync(
    statsPath
  )
) {

  const stats =
    fs.readFileSync(
      statsPath,
      "utf8"
    );


  const lessonCalls =
    Array.from(
      stats.matchAll(
        /\blesson\(\s*\d+\s*,\s*\d+\s*,/g
      )
    )
      .length;


  const checkpoints =
    Array.from(
      stats.matchAll(
        /checkpointKey:\s*"module-\d\d-checkpoint"/g
      )
    )
      .length;


  const checks = [
    [
      lessonCalls ===
        26,
      `Statistics Foundations has 26 engine lessons (found ${lessonCalls})`,
    ],

    [
      checkpoints ===
        7,
      `Statistics Foundations has 7 checkpoint keys (found ${checkpoints})`,
    ],

    [
      stats.includes(
        '"m1-l1-thinking-with-data"'
      ) ||
      stats.includes(
        'buildCourseLessonKey'
      ),
      "Stable lesson-key builder is in use",
    ],

    [
      stats.includes(
        'finalAssessmentKey:\n      "final-assessment"'
      ),
      "Final assessment is engine-defined",
    ],

    [
      stats.includes(
        "certificateEnabled:\n      true"
      ),
      "Certificate eligibility is engine-defined",
    ],
  ];


  for (
    const [
      ok,
      message,
    ]
    of checks
  ) {

    if (ok) {
      console.log(
        `✓ ${message}`
      );
    } else {
      console.error(
        `✗ ${message}`
      );

      failed =
        true;
    }
  }
}


const progressPath =
  path.join(
    process.cwd(),
    "lib",
    "course-progress.ts"
  );


if (
  fs.existsSync(
    progressPath
  )
) {

  const progress =
    fs.readFileSync(
      progressPath,
      "utf8"
    );


  for (
    const token
    of [
      "getCourseDefinition",
      "getModuleLessonKeys",
      "buildCourseProgress",
      "nextActionLabel",
      "certificateEligible",
    ]
  ) {

    if (
      progress.includes(
        token
      )
    ) {
      console.log(
        `✓ progress compatibility: ${token}`
      );
    } else {
      console.error(
        `✗ progress compatibility missing: ${token}`
      );

      failed =
        true;
    }
  }
}


if (
  failed
) {
  console.error(
    "\nCourse engine audit failed."
  );

  process.exit(
    1
  );
}


console.log(
  "\nCourse engine source audit passed."
);
__MAT_STAGE6_EOF__

cat > 'COURSE_ENGINE_GUIDE.md' <<'__MAT_STAGE6_EOF__'
# My Academic Tutor — Course Engine

Stage 6 moves course progression into a central engine without changing the
database schema.

## What is now centralised

Each fully authored course can define:

- course slug / title / subject / level
- modules
- stable lesson keys
- lesson titles
- optional lab identifiers
- module checkpoint keys
- final assessment key
- completion rules
- certificate eligibility

The learner runtime then derives:

- lesson navigation
- module navigation
- completed lesson counts
- checkpoint counts
- final-assessment lock/ready/passed state
- next required learning action
- course completion
- certificate eligibility

## Existing catalogue courses

Courses that exist in `lib/data.ts` but do not yet have a registered engine
definition use a compatibility adapter. They do **not** automatically gain
formal checkpoint, final-assessment, or certificate requirements.

## Statistics Foundations

Statistics Foundations is the first fully registered course. Its 26 stable
lesson keys remain based on module slugs, preserving progress rows already
stored in Supabase.

Progression remains:

Module lessons
→ module checkpoint
→ next module
→ final assessment
→ completion
→ certificate

## Creating Course 2

Example:

```bash
node scripts/create-course-engine.mjs calculus-foundations
```

The command:

1. reads the course metadata already present in `lib/data.ts`
2. creates `lib/course-engine/courses/calculus-foundations.ts`
3. registers it in `lib/course-engine/courses/index.ts`
4. distributes the catalogue lesson count across its modules
5. gives every lesson a stable key
6. deliberately leaves lesson titles as `TODO`

Then author the actual lesson titles/content before changing `status` to
`published`.

Do **not** enable checkpoint/final/certificate requirements until their
assessment content exists.

## Important invariant

Once learners have started a course, do not casually change:

- course slug
- module key
- lesson key
- assessment key

Those values are persistence identifiers in Supabase.

Titles and explanatory content can change; identifiers should remain stable.
__MAT_STAGE6_EOF__


echo ""
echo "Stage 6 installed."
echo ""
echo "Run:"
echo "  node scripts/audit-course-engine.mjs"
echo "  npm run build"
echo ""
echo "If build passes:"
echo "  npm run dev"
echo ""
echo "Regression test Statistics Foundations:"
echo "  - open the course"
echo "  - continue to an existing completed lesson"
echo "  - confirm Module 1 checkpoint state is preserved"
echo "  - confirm dashboard progress is unchanged"
echo "  - confirm final assessment remains locked/unlocked correctly"
echo "  - confirm certificate/completion behaviour is unchanged"
echo ""
echo "To scaffold the next course later:"
echo "  node scripts/create-course-engine.mjs calculus-foundations"
