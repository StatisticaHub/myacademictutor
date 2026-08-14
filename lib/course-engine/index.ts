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
