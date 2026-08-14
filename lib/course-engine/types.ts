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
