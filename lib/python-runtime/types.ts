export type PythonCheckTest = {
  name: string;
  expression: string;
};


export type PythonRunRequest = {
  id: string;
  action:
    | "run"
    | "check";
  code: string;
  packages?: string[];
  tests?: PythonCheckTest[];
};


export type PythonTestResult = {
  name: string;
  passed: boolean;
  message?: string;
};


export type PythonRunResult = {
  id: string;
  ok: boolean;
  stdout: string;
  stderr: string;
  result?: string;
  figures: string[];
  tests?: PythonTestResult[];
  error?: string;
  durationMs: number;
};


export type PythonLessonChallenge = {
  lessonKey: string;
  anchorTitle: string;
  title: string;
  instructions: string;
  starterCode: string;
  packages?: string[];
  hint: string;
  solution: string;
  tests: PythonCheckTest[];
  successMessage: string;
};
