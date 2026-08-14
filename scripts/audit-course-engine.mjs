import fs from "node:fs";
import path from "node:path";


const requiredFiles = [
  "lib/course-engine/types.ts",
  "lib/course-engine/legacy-adapter.ts",
  "lib/course-engine/registry.ts",
  "lib/course-engine/index.ts",
  "lib/course-engine/courses/index.ts",
  "lib/course-engine/courses/statistics-foundations.ts",
  "lib/course-lessons.ts",
  "lib/course-progress.ts",
  "scripts/create-course-engine.mjs",
];


let failed =
  false;


for (
  const relative
  of requiredFiles
) {

  const full =
    path.join(
      process.cwd(),
      relative
    );


  if (
    fs.existsSync(
      full
    )
  ) {
    console.log(
      `✓ ${relative}`
    );
  } else {
    console.error(
      `✗ Missing ${relative}`
    );

    failed =
      true;
  }
}


const statsPath =
  path.join(
    process.cwd(),
    "lib",
    "course-engine",
    "courses",
    "statistics-foundations.ts"
  );


if (
  fs.existsSync(
    statsPath
  )
) {

  const stats =
    fs.readFileSync(
      statsPath,
      "utf8"
    );


  const lessonCalls =
    Array.from(
      stats.matchAll(
        /\blesson\(\s*\d+\s*,\s*\d+\s*,/g
      )
    )
      .length;


  const checkpoints =
    Array.from(
      stats.matchAll(
        /checkpointKey:\s*"module-\d\d-checkpoint"/g
      )
    )
      .length;


  const checks = [
    [
      lessonCalls ===
        26,
      `Statistics Foundations has 26 engine lessons (found ${lessonCalls})`,
    ],

    [
      checkpoints ===
        7,
      `Statistics Foundations has 7 checkpoint keys (found ${checkpoints})`,
    ],

    [
      stats.includes(
        '"m1-l1-thinking-with-data"'
      ) ||
      stats.includes(
        'buildCourseLessonKey'
      ),
      "Stable lesson-key builder is in use",
    ],

    [
      stats.includes(
        'finalAssessmentKey:\n      "final-assessment"'
      ),
      "Final assessment is engine-defined",
    ],

    [
      stats.includes(
        "certificateEnabled:\n      true"
      ),
      "Certificate eligibility is engine-defined",
    ],
  ];


  for (
    const [
      ok,
      message,
    ]
    of checks
  ) {

    if (ok) {
      console.log(
        `✓ ${message}`
      );
    } else {
      console.error(
        `✗ ${message}`
      );

      failed =
        true;
    }
  }
}


const progressPath =
  path.join(
    process.cwd(),
    "lib",
    "course-progress.ts"
  );


if (
  fs.existsSync(
    progressPath
  )
) {

  const progress =
    fs.readFileSync(
      progressPath,
      "utf8"
    );


  for (
    const token
    of [
      "getCourseDefinition",
      "getModuleLessonKeys",
      "buildCourseProgress",
      "nextActionLabel",
      "certificateEligible",
    ]
  ) {

    if (
      progress.includes(
        token
      )
    ) {
      console.log(
        `✓ progress compatibility: ${token}`
      );
    } else {
      console.error(
        `✗ progress compatibility missing: ${token}`
      );

      failed =
        true;
    }
  }
}


if (
  failed
) {
  console.error(
    "\nCourse engine audit failed."
  );

  process.exit(
    1
  );
}


console.log(
  "\nCourse engine source audit passed."
);
