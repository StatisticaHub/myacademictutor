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
