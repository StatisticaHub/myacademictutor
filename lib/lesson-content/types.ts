/* ==========================================================================
   MY ACADEMIC TUTOR
   Lesson Content Types
   ========================================================================== */


/* ==========================================================================
   CONTENT BLOCKS
   ========================================================================== */

export type LessonParagraph = {
  type: "paragraph";
  text: string;
};


export type LessonHeading = {
  type: "heading";
  text: string;
};


export type LessonCallout = {
  type: "callout";
  title: string;
  text: string;
};


export type LessonBulletList = {
  type: "bullets";
  items: string[];
};


export type LessonDistributionExplorer = {
  type: "distribution-explorer";
  title: string;
  description: string;
};

export type LessonProbabilitySimulator = {
  type: "probability-simulator";
  title: string;
  description: string;
};

export type LessonDistributionModelExplorer = {
  type: "distribution-model-explorer";
  title: string;
  description: string;
};

export type LessonSamplingSimulator = {
  type: "sampling-simulator";
  title: string;
  description: string;
};

export type LessonConfidenceIntervalSimulator = {
  type: "confidence-interval-simulator";
  title: string;
  description: string;
};

export type LessonHypothesisTestSimulator = {
  type: "hypothesis-test-simulator";
  title: string;
  description: string;
};

export type LessonSecantSlopeExplorer = {
  type: "secant-slope-explorer";
  title: string;
  description: string;
};

export type LessonLimitExplorer = {
  type: "limit-explorer";
  title: string;
  description: string;
};

export type LessonTangentLineExplorer = {
  type: "tangent-line-explorer";
  title: string;
  description: string;
};

export type LessonChainRuleBuilder = {
  type: "chain-rule-builder";
  title: string;
  description: string;
};

export type LessonCurveBehaviourExplorer = {
  type: "curve-behaviour-explorer";
  title: string;
  description: string;
};

export type LessonRiemannSumExplorer = {
  type: "riemann-sum-explorer";
  title: string;
  description: string;
};

export type LessonFTCConnectionExplorer = {
  type: "ftc-connection-explorer";
  title: string;
  description: string;
};

export type LessonBlock =
  | LessonParagraph
  | LessonHeading
  | LessonCallout
  | LessonBulletList
  | LessonDistributionExplorer
  | LessonProbabilitySimulator
  | LessonProbabilitySimulator
  | LessonDistributionModelExplorer
  | LessonSamplingSimulator
  | LessonConfidenceIntervalSimulator
  | LessonHypothesisTestSimulator
  | LessonSecantSlopeExplorer
  | LessonLimitExplorer
  | LessonTangentLineExplorer
  | LessonChainRuleBuilder
  | LessonCurveBehaviourExplorer
  | LessonRiemannSumExplorer
  | LessonFTCConnectionExplorer;


/* ==========================================================================
   WORKED EXAMPLES
   ========================================================================== */

export type WorkedExample = {
  title: string;
  question: string;
  steps: string[];
  answer: string;
};


/* ==========================================================================
   EXERCISES
   ========================================================================== */

export type Exercise = {
  question: string;
  hint?: string;
  answer: string;
};


/* ==========================================================================
   QUIZ
   ========================================================================== */

export type QuizQuestion = {
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
};


/* ==========================================================================
   COMPLETE LESSON
   ========================================================================== */

export type LessonContent = {
  courseSlug: string;
  lessonKey: string;
  title: string;
  subtitle: string;
  estimatedMinutes: number;
  objectives: string[];
  content: LessonBlock[];
  workedExamples?: WorkedExample[];
  exercises?: Exercise[];
  quiz?: QuizQuestion[];
  summary: string[];
  nextStep?: string;
};