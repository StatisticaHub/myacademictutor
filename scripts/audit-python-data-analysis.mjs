import fs from "node:fs";
import path from "node:path";


let failed = false;


function check(
  condition,
  message
) {
  if (condition) {
    console.log(
      `✓ ${message}`
    );
  } else {
    failed = true;

    console.error(
      `✗ ${message}`
    );
  }
}


function read(relative) {
  const full =
    path.join(
      process.cwd(),
      relative
    );

  check(
    fs.existsSync(full),
    relative
  );

  return fs.existsSync(full)
    ? fs.readFileSync(
        full,
        "utf8"
      )
    : "";
}


let totalLessons = 0;


for (
  const moduleNumber
  of [
    1, 2, 3, 4,
    5, 6, 7, 8,
  ]
) {
  const nn =
    String(
      moduleNumber
    ).padStart(
      2,
      "0"
    );

  const source =
    read(
      `lib/lesson-content/python-for-data-analysis/module-${nn}.ts`
    );

  const count =
    (
      source.match(
        /courseSlug:\s*(?:\n\s*)?"python-for-data-analysis"/g
      ) ??
      []
    ).length;

  totalLessons +=
    count;

  check(
    count === 4,
    `Module ${moduleNumber} has 4 authored lessons`
  );
}


check(
  totalLessons === 32,
  `Course has 32 authored lessons (found ${totalLessons})`
);


const engine =
  read(
    "lib/course-engine/courses/python-for-data-analysis.ts"
  );


check(
  /version:\s*(?:\n\s*)?1,/.test(
    engine
  ),
  "Course-engine version uses numeric type"
);


const engineLessonKeys =
  [
    ...engine.matchAll(
      /key:\s*"((?:m\d-l\d)-[^"]+)"/g
    ),
  ].map(
    (
      match
    ) =>
      match[1]
  );


check(
  engineLessonKeys.length === 32,
  `Course engine defines 32 lesson keys (found ${engineLessonKeys.length})`
);


for (
  const moduleNumber
  of [
    1, 2, 3, 4,
    5, 6, 7, 8,
  ]
) {
  const nn =
    String(
      moduleNumber
    ).padStart(
      2,
      "0"
    );

  const source =
    read(
      `lib/lesson-content/python-for-data-analysis/module-${nn}.ts`
    );

  const lessonKeys =
    [
      ...source.matchAll(
        /lessonKey:\s*"([^"]+)"/g
      ),
    ].map(
      (
        match
      ) =>
        match[1]
    );


  for (
    const lessonKey
    of lessonKeys
  ) {
    check(
      engineLessonKeys.includes(
        lessonKey
      ),
      `${lessonKey} is aligned with the course engine`
    );
  }
}


const assessmentSource =
  read(
    "lib/assessments/python-for-data-analysis.ts"
  );


for (
  const moduleNumber
  of [
    1, 2, 3, 4,
    5, 6, 7, 8,
  ]
) {
  const key =
    `module-${String(moduleNumber).padStart(2, "0")}-checkpoint`;

  check(
    assessmentSource.includes(
      key
    ),
    `Checkpoint ${moduleNumber} exists`
  );
}


check(
  assessmentSource.includes(
    '"final-assessment"'
  ),
  "Final assessment exists"
);


const formalQuestionCount =
  (
    assessmentSource.match(
      /id:\s*"py-(?:m\d-l\d-q\d|final-m\d-l\d)"/g
    ) ??
    []
  ).length;


check(
  formalQuestionCount === 96,
  `Formal assessment bank contains 96 questions (found ${formalQuestionCount})`
);


const assessmentRegistry =
  read(
    "lib/assessments/index.ts"
  );


check(
  assessmentRegistry.includes(
    "pythonForDataAnalysisAssessments"
  ),
  "Assessment bank is registered"
);


const checkpointCount =
  (
    engine.match(
      /checkpointKey:\s*(?:\n\s*)?"module-\d\d-checkpoint"/g
    ) ??
    []
  ).length;


check(
  checkpointCount === 8,
  `Course engine has 8 checkpoint keys (found ${checkpointCount})`
);


check(
  /requireAllLessons:\s*(?:\n\s*)?true/.test(
    engine
  ),
  "All lessons required"
);


check(
  /requireAllCheckpoints:\s*(?:\n\s*)?true/.test(
    engine
  ),
  "All checkpoints required"
);


check(
  /requireFinalAssessment:\s*(?:\n\s*)?true/.test(
    engine
  ),
  "Final assessment required"
);


check(
  /certificateEnabled:\s*(?:\n\s*)?true/.test(
    engine
  ),
  "Certificate eligibility enabled"
);


check(
  /status:\s*(?:\n\s*)?"draft"/.test(
    engine
  ),
  "Course remains draft pending QA"
);


const courseRegistry =
  read(
    "lib/course-engine/courses/index.ts"
  );


check(
  courseRegistry.includes(
    "pythonForDataAnalysisCourse"
  ),
  "Course engine is registered"
);


const types =
  read(
    "lib/lesson-content/types.ts"
  );


check(
  types.includes(
    'type: "code-example"'
  ) &&
  types.includes(
    "output?: string"
  ) &&
  types.includes(
    "note?: string"
  ),
  "Code-example type supports code, output and notes"
);


check(
  types.includes(
    'type: "python-data-lab"'
  ),
  "Reusable Python lab block exists"
);


const page =
  read(
    "app/courses/[slug]/learn/[lessonKey]/page.tsx"
  );


check(
  page.includes(
    'case "code-example"'
  ) &&
  page.includes(
    "block.output"
  ) &&
  page.includes(
    "block.note"
  ),
  "Code-example renderer supports output and notes"
);


check(
  page.includes(
    'case "python-data-lab"'
  ),
  "Python lab renderer exists"
);


const lab =
  read(
    "components/labs/PythonDataLab.tsx"
  );


for (
  const labKey
  of [
    "workflow",
    "numpy",
    "dataframe",
    "missing",
    "quality",
    "groupby",
    "merge",
    "eda",
    "eda-workflow",
    "time",
    "capstone",
    "capstone-report",
  ]
) {
  check(
    lab.includes(
      `"${labKey}"`
    ),
    `${labKey} interactive mode is supported`
  );
}


const catalogue =
  read(
    "lib/data.ts"
  );


check(
  catalogue.includes(
    '"Python for Data Analysis"'
  ),
  "Catalogue contains Python for Data Analysis"
);


if (
  failed
) {
  console.error(
    "\nPython for Data Analysis audit failed."
  );

  process.exit(
    1
  );
}


console.log(
  "\nPython for Data Analysis complete-course audit passed."
);
