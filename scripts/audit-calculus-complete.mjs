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
  of [1, 2, 3, 4, 5, 6, 7]
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
      `lib/lesson-content/calculus-foundations/module-${nn}.ts`
    );

  const count =
    (
      source.match(
        /courseSlug:\s*(?:\n\s*)?"calculus-foundations"/g
      ) ??
      []
    ).length;

  totalLessons += count;

  check(
    count === 4,
    `Module ${moduleNumber} has 4 authored lessons`
  );
}


check(
  totalLessons === 28,
  `Calculus has 28 authored lessons (found ${totalLessons})`
);


const registry =
  read(
    "lib/lesson-content/index.ts"
  );


for (
  const moduleNumber
  of [1, 2, 3, 4, 5, 6, 7]
) {
  const symbol =
    `calculusFoundationsModule${String(moduleNumber).padStart(2, "0")}`;

  check(
    registry.includes(
      symbol
    ),
    `Module ${moduleNumber} is registered`
  );
}


const assessmentSource =
  read(
    "lib/assessments/calculus-foundations.ts"
  );


for (
  const moduleNumber
  of [1, 2, 3, 4, 5, 6, 7]
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
      /id:\s*"calc-(?:m\d|final)-q\d+"/g
    ) ??
    []
  ).length;


check(
  formalQuestionCount === 82,
  `Formal assessment bank contains 82 questions (found ${formalQuestionCount})`
);


const engine =
  read(
    "lib/course-engine/courses/calculus-foundations.ts"
  );


const checkpointCount =
  (
    engine.match(
      /checkpointKey:\s*(?:\n\s*)?"module-\d\d-checkpoint"/g
    ) ??
    []
  ).length;


check(
  checkpointCount === 7,
  `Course engine has 7 checkpoint keys (found ${checkpointCount})`
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
  engine.includes(
    '"final-assessment"'
  ),
  "Final assessment key is engine-defined"
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
  "Calculus remains draft pending QA"
);


const types =
  read(
    "lib/lesson-content/types.ts"
  );


const page =
  read(
    "app/courses/[slug]/learn/[lessonKey]/page.tsx"
  );


for (
  const blockName
  of [
    "secant-slope-explorer",
    "limit-explorer",
    "tangent-line-explorer",
    "chain-rule-builder",
    "curve-behaviour-explorer",
    "riemann-sum-explorer",
    "ftc-connection-explorer",
  ]
) {
  check(
    types.includes(
      `type: "${blockName}"`
    ),
    `${blockName} type exists`
  );

  check(
    page.includes(
      `case "${blockName}"`
    ),
    `${blockName} renderer exists`
  );
}


if (failed) {
  console.error(
    "\nComplete Calculus course audit failed."
  );

  process.exit(1);
}


console.log(
  "\nComplete Calculus Foundations source audit passed."
);
