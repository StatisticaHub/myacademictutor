import fs from "node:fs";

let failed = false;

function check(condition, message) {
  if (condition) {
    console.log(`✓ ${message}`);
  } else {
    failed = true;
    console.error(`✗ ${message}`);
  }
}

function read(file) {
  check(fs.existsSync(file), file);
  return fs.existsSync(file)
    ? fs.readFileSync(file, "utf8")
    : "";
}

const worker = read("public/workers/python-course-worker.mjs");
check(worker.includes("evaluateTests"), "Check-answer tests are evaluated one by one");
check(worker.includes("compactError"), "Python errors are reduced to learner-readable messages");
check(worker.includes('"Agg"'), "Matplotlib uses the headless Agg backend");
check(worker.includes("plt.close("), "Previous figures are cleared before a new run");
check(worker.includes("n_sales = 240"), "Visualisation dataset contains 240 records");
check(worker.includes("dirty_orders.csv"), "Dedicated dirty cleaning data exists");
check(worker.includes("daily.csv"), "Dedicated time-series data exists");

const types = read("lib/python-runtime/types.ts");
check(types.includes("PythonCheckTest"), "Expression-based test type exists");
check(!types.includes("tests?: string"), "Old multiline hidden-test API is removed");

const client = read("lib/python-runtime/client.ts");
check(client.includes("/workers/python-course-worker.mjs"), "Browser uses the clean worker");
check(client.includes("30000"), "Runaway execution timeout exists");

const practice = read("lib/python-practice/python-for-data-analysis.ts");
const challengeCount = (practice.match(/lessonKey:\s*"m\d-l\d-[^"]+"/g) ?? []).length;
check(challengeCount === 32, `32 coding challenges exist (found ${challengeCount})`);
check(!practice.includes("__mat_tests_json__"), "Legacy JSON-in-Python checker is removed");
check(!practice.includes("tests: \""), "No challenge uses multiline Python test strings");

const component = read("components/python/RunnablePythonExample.tsx");
check(component.includes("Check answer"), "Challenge UI exposes Check answer");
check(component.includes("item.message"), "Failed individual checks show concise messages");
check(component.includes("Python could not run this code."), "Runtime failures are presented as friendly errors");

let examples = 0;
for (let i = 1; i <= 8; i += 1) {
  const nn = String(i).padStart(2, "0");
  const source = read(`lib/lesson-content/python-for-data-analysis/module-${nn}.ts`);
  examples += (source.match(/type:\s*"code-example"/g) ?? []).length;
}
check(examples === 56, `56 runnable examples remain (found ${examples})`);

const m6 = read("lib/lesson-content/python-for-data-analysis/module-06.ts");
check(m6.includes('data/sales.csv'), "Visualisation examples load the larger sales dataset");
check(m6.includes("bins=20"), "Histogram uses sensible binning");

const page = read("app/courses/[slug]/learn/[lessonKey]/page.tsx");
check(page.includes("RunnablePythonExample"), "Lesson renderer uses the clean live-Python component");

const engine = read("lib/course-engine/courses/python-for-data-analysis.ts");
check(/status:\s*(?:\n\s*)?"published"/.test(engine), "Course is published after browser QA");

if (failed) {
  console.error("\nClean Python-course audit failed.");
  process.exit(1);
}

console.log("\nClean Python-course audit passed.");
