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
