import type {
  Course,
} from "@/lib/data";

import {
  getCourseDefinition,
} from "@/lib/course-engine/registry";

import type {
  CoursePublicationStatus,
} from "@/lib/course-engine/types";


export type CoursePublicationState = {
  status:
    CoursePublicationStatus |
    "unknown";

  visibleInCatalogue:
    boolean;

  learningAccessible:
    boolean;

  enrollable:
    boolean;

  indexable:
    boolean;

  previewMode:
    boolean;

  label:
    string;
};


/*
 * Draft courses are automatically available while running `next dev`.
 *
 * A production-like preview deployment can opt in by setting the
 * SERVER-ONLY environment variable:
 *
 *   COURSE_PREVIEW_MODE=true
 *
 * Do not set that variable on the public production deployment.
 */
export function isCoursePreviewMode() {
  return (
    process.env.NODE_ENV !==
      "production" ||
    process.env.COURSE_PREVIEW_MODE ===
      "true"
  );
}


export function getCoursePublicationState(
  courseSlug:
    string
):
  CoursePublicationState {

  const definition =
    getCourseDefinition(
      courseSlug
    );


  if (!definition) {
    return {
      status:
        "unknown",

      visibleInCatalogue:
        false,

      learningAccessible:
        false,

      enrollable:
        false,

      indexable:
        false,

      previewMode:
        isCoursePreviewMode(),

      label:
        "Unavailable",
    };
  }


  const previewMode =
    isCoursePreviewMode();


  if (
    definition.status ===
    "published"
  ) {
    return {
      status:
        "published",

      visibleInCatalogue:
        true,

      learningAccessible:
        true,

      enrollable:
        true,

      indexable:
        true,

      previewMode,

      label:
        "Available",
    };
  }


  if (
    definition.status ===
    "draft"
  ) {
    return {
      status:
        "draft",

      visibleInCatalogue:
        previewMode,

      learningAccessible:
        previewMode,

      enrollable:
        previewMode,

      /*
       * Drafts are never indexable, even when preview mode is enabled.
       */
      indexable:
        false,

      previewMode,

      label:
        "Draft preview",
    };
  }


  /*
   * Legacy/unbuilt courses remain useful as catalogue pages, but they are
   * intentionally not part of the learner runtime until a published engine
   * definition exists.
   */
  return {
    status:
      "catalogue",

    visibleInCatalogue:
      true,

    learningAccessible:
      false,

    enrollable:
      false,

    indexable:
      true,

    previewMode,

    label:
      "Coming soon",
  };
}


export function isCourseVisibleInCatalogue(
  courseSlug:
    string
) {
  return getCoursePublicationState(
    courseSlug
  ).visibleInCatalogue;
}


export function isCourseLearningAccessible(
  courseSlug:
    string
) {
  return getCoursePublicationState(
    courseSlug
  ).learningAccessible;
}


export function isCourseEnrollable(
  courseSlug:
    string
) {
  return getCoursePublicationState(
    courseSlug
  ).enrollable;
}


export function isCourseIndexable(
  courseSlug:
    string
) {
  return getCoursePublicationState(
    courseSlug
  ).indexable;
}


export function filterVisibleCourses<
  T extends Pick<
    Course,
    "slug"
  >
>(
  courseList:
    T[]
) {
  return courseList.filter(
    (
      course
    ) =>
      isCourseVisibleInCatalogue(
        course.slug
      )
  );
}
