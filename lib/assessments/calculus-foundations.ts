import type {
  CourseAssessment,
} from "./types";


/* ==========================================================================
   CALCULUS FOUNDATIONS
   ASSESSMENTS
   ========================================================================== */

export const calculusFoundationsAssessments:
  CourseAssessment[] = [

  /* ========================================================================
     MODULE 01 — FUNCTIONS AND CHANGE
     ======================================================================== */

  {
    key:
      "module-01-checkpoint",

    courseSlug:
      "calculus-foundations",

    type:
      "module-checkpoint",

    moduleNumber:
      1,

    title:
      "Module 1 Checkpoint",

    description:
      "Check your understanding of functions, graph interpretation, average rate of change, secant slopes and the idea of instantaneous change.",

    passingPercentage:
      70,

    questions: [

      {
        id:
          "calc-m1-q1",

        question:
          "Which statement best describes a function?",

        options: [
          "A rule that assigns each allowed input exactly one output",
          "Any equation containing both x and y",
          "A graph that must be a straight line",
          "A rule that gives every input at least two outputs",
        ],

        correctIndex:
          0,

        explanation:
          "A function is defined by its input-output relationship: every allowed input is assigned exactly one output.",
      },


      {
        id:
          "calc-m1-q2",

        question:
          "If f(x) = 2x² - 3, what is f(2)?",

        options: [
          "1",
          "5",
          "8",
          "13",
        ],

        correctIndex:
          1,

        explanation:
          "Substitute x = 2: f(2) = 2(2²) - 3 = 8 - 3 = 5.",
      },


      {
        id:
          "calc-m1-q3",

        question:
          "A graph rises from y = -8 to y = -2 as x increases. How should the function be described over that interval?",

        options: [
          "Increasing",
          "Decreasing",
          "Constant",
          "Undefined because the y-values are negative",
        ],

        correctIndex:
          0,

        explanation:
          "Increasing means the output becomes larger as x increases. The values can remain negative and still be increasing.",
      },


      {
        id:
          "calc-m1-q4",

        question:
          "A taxi fare is modelled by C(d) = 4 + 1.5d, where d is distance in kilometres. What does the y-intercept represent?",

        options: [
          "The taxi travels 4 kilometres before charging",
          "The fare decreases by £4 per kilometre",
          "The fixed £4 charge when the journey distance is zero",
          "The maximum possible fare",
        ],

        correctIndex:
          2,

        explanation:
          "The y-intercept is C(0) = 4, so it represents the fixed starting charge before any distance-based cost is added.",
      },


      {
        id:
          "calc-m1-q5",

        question:
          "For f(x) = x², what is the average rate of change from x = 1 to x = 3?",

        options: [
          "2",
          "3",
          "4",
          "8",
        ],

        correctIndex:
          2,

        explanation:
          "The average rate is [f(3) - f(1)] / (3 - 1) = (9 - 1) / 2 = 4.",
      },


      {
        id:
          "calc-m1-q6",

        question:
          "A temperature falls from 20°C to 8°C over 4 hours. What is its average rate of change?",

        options: [
          "3°C per hour",
          "-3°C per hour",
          "7°C per hour",
          "-12°C per hour",
        ],

        correctIndex:
          1,

        explanation:
          "The temperature change is 8 - 20 = -12°C. Dividing by 4 hours gives -3°C per hour.",
      },


      {
        id:
          "calc-m1-q7",

        question:
          "What does the slope of a secant line through two points on the graph of a function represent?",

        options: [
          "The function's y-intercept",
          "The average rate of change between the two points",
          "The instantaneous rate of change at every point",
          "The maximum value of the function",
        ],

        correctIndex:
          1,

        explanation:
          "A secant line connects two points on the graph. Its slope is the change in output divided by the change in input across that interval.",
      },


      {
        id:
          "calc-m1-q8",

        question:
          "Why do we move a second point closer and closer to a fixed point when developing the idea of instantaneous rate of change?",

        options: [
          "To force the function value to become zero",
          "To make every curved graph become a straight line",
          "To study the value approached by secant slopes as the interval shrinks",
          "To avoid using function notation",
        ],

        correctIndex:
          2,

        explanation:
          "Using the same point twice would give a zero-width interval and an undefined 0/0 quotient. Calculus instead studies what the secant slopes approach as the second point moves toward the first.",
      },

    ],
  },

];
