import {
  calculusFoundationsCourse,
} from "@/lib/course-engine/courses/calculus-foundations";

import {
  statisticsFoundationsCourse,
} from "@/lib/course-engine/courses/statistics-foundations";

import type {
  CourseEngineDefinition,
} from "@/lib/course-engine/types";


export const registeredCourseDefinitions:
  CourseEngineDefinition[] = [

  statisticsFoundationsCourse,

  calculusFoundationsCourse,
];
