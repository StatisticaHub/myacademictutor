export type AssessmentType =
  | "module-checkpoint"
  | "final-assessment";


export type AssessmentQuestion = {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
};


export type PublicAssessmentQuestion = {
  id: string;
  question: string;
  options: string[];
};


export type CourseAssessment = {
  key: string;

  courseSlug: string;

  type: AssessmentType;

  moduleNumber?: number;

  title: string;

  description: string;

  passingPercentage: number;

  questions: AssessmentQuestion[];
};


export type AssessmentReviewItem = {
  questionId: string;

  selectedIndex: number;

  correctIndex: number;

  correct: boolean;

  explanation: string;
};


export type AssessmentResult = {
  success: boolean;

  message?: string;

  score?: number;

  maxScore?: number;

  percentage?: number;

  passed?: boolean;

  review?: AssessmentReviewItem[];
};