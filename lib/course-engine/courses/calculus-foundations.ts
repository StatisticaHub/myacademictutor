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
  estimatedMinutes = 20,
  labKey?: string
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
    labKey,
  };
}


export const calculusFoundationsCourse:
  CourseEngineDefinition = {

  slug:
    "calculus-foundations",

  version:
    1,

  title:
    "Calculus Foundations",

  subject:
    "mathematics",

  level:
    "high-school",

  status:
    "draft",

  modules: [

    {
      key:
        "functions-and-change",

      title:
        "Functions and change",

      checkpointKey:
        "module-01-checkpoint",

      lessons: [

        lesson(
          1,
          1,
          "functions-and-change",
          "Functions as relationships",
          18
        ),

        lesson(
          1,
          2,
          "functions-and-change",
          "Reading and interpreting graphs",
          20
        ),

        lesson(
          1,
          3,
          "functions-and-change",
          "Average rate of change",
          22,
          "secant-slope-explorer"
        ),

        lesson(
          1,
          4,
          "functions-and-change",
          "From average change to instantaneous change",
          22
        ),
      ],
    },


    {
      key:
        "limits",

      title:
        "Limits",

      lessons: [

        lesson(
          2,
          1,
          "limits",
          "Approaching a value",
          20,
          "limit-explorer"
        ),

        lesson(
          2,
          2,
          "limits",
          "Estimating limits from graphs and tables",
          22
        ),

        lesson(
          2,
          3,
          "limits",
          "Limit laws and algebraic techniques",
          24
        ),

        lesson(
          2,
          4,
          "limits",
          "Continuity and discontinuities",
          22
        ),
      ],
    },


    {
      key:
        "derivatives",

      title:
        "Derivatives",

      lessons: [

        lesson(
          3,
          1,
          "derivatives",
          "The derivative as a rate of change",
          22
        ),

        lesson(
          3,
          2,
          "derivatives",
          "The derivative as the slope of a tangent",
          22,
          "tangent-line-explorer"
        ),

        lesson(
          3,
          3,
          "derivatives",
          "Derivative notation and interpretation",
          20
        ),

        lesson(
          3,
          4,
          "derivatives",
          "Estimating derivatives from data and graphs",
          24
        ),
      ],
    },


    {
      key:
        "rules-of-differentiation",

      title:
        "Rules of differentiation",

      lessons: [

        lesson(
          4,
          1,
          "rules-of-differentiation",
          "Power, constant and sum rules",
          24
        ),

        lesson(
          4,
          2,
          "rules-of-differentiation",
          "Product and quotient rules",
          26
        ),

        lesson(
          4,
          3,
          "rules-of-differentiation",
          "The chain rule",
          26,
          "chain-rule-builder"
        ),

        lesson(
          4,
          4,
          "rules-of-differentiation",
          "Differentiating exponential and trigonometric functions",
          26
        ),
      ],
    },


    {
      key:
        "derivative-applications",

      title:
        "Derivative applications",

      lessons: [

        lesson(
          5,
          1,
          "derivative-applications",
          "Increasing, decreasing and stationary points",
          24
        ),

        lesson(
          5,
          2,
          "derivative-applications",
          "Maxima, minima and curve shape",
          26,
          "curve-behaviour-explorer"
        ),

        lesson(
          5,
          3,
          "derivative-applications",
          "Optimisation problems",
          28
        ),

        lesson(
          5,
          4,
          "derivative-applications",
          "Motion, velocity and acceleration",
          26
        ),
      ],
    },


    {
      key:
        "integrals",

      title:
        "Integrals",

      lessons: [

        lesson(
          6,
          1,
          "integrals",
          "Accumulation and area",
          22,
          "riemann-sum-explorer"
        ),

        lesson(
          6,
          2,
          "integrals",
          "Antiderivatives and indefinite integrals",
          24
        ),

        lesson(
          6,
          3,
          "integrals",
          "Definite integrals",
          24
        ),

        lesson(
          6,
          4,
          "integrals",
          "Basic techniques and interpreting signed area",
          26
        ),
      ],
    },


    {
      key:
        "fundamental-theorem-of-calculus",

      title:
        "The fundamental theorem of calculus",

      lessons: [

        lesson(
          7,
          1,
          "fundamental-theorem-of-calculus",
          "Connecting derivatives and integrals",
          24
        ),

        lesson(
          7,
          2,
          "fundamental-theorem-of-calculus",
          "The Fundamental Theorem of Calculus",
          26,
          "ftc-connection-explorer"
        ),

        lesson(
          7,
          3,
          "fundamental-theorem-of-calculus",
          "Using accumulation functions",
          26
        ),

        lesson(
          7,
          4,
          "fundamental-theorem-of-calculus",
          "A complete calculus problem-solving workflow",
          30
        ),
      ],
    },
  ],

  /*
   * Assessment requirements remain disabled while the course is in draft.
   * We will add checkpoint keys only after their question banks exist,
   * otherwise the progression engine would route learners to missing
   * assessments.
   */
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
