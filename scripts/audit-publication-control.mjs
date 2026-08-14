import fs from "node:fs";
import path from "node:path";


let failed =
  false;


function check(
  condition,
  message
) {
  if (condition) {
    console.log(
      `✓ ${message}`
    );
  } else {
    failed =
      true;

    console.error(
      `✗ ${message}`
    );
  }
}


function read(
  relative
) {
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


function isPublished(
  source
) {
  return /status:\s*(?:\n\s*)?"published"/.test(
    source
  );
}


const publication =
  read(
    "lib/course-engine/publication.ts"
  );


check(
  publication.includes(
    '"published"'
  ) &&
  publication.includes(
    '"draft"'
  ) &&
  publication.includes(
    '"catalogue"'
  ),
  "publication engine supports published, draft and catalogue states"
);


check(
  publication.includes(
    "COURSE_PREVIEW_MODE"
  ),
  "server-only preview mode remains available for future draft courses"
);


const statistics =
  read(
    "lib/course-engine/courses/statistics-foundations.ts"
  );

const calculus =
  read(
    "lib/course-engine/courses/calculus-foundations.ts"
  );

const python =
  read(
    "lib/course-engine/courses/python-for-data-analysis.ts"
  );


check(
  isPublished(
    statistics
  ),
  "Statistics Foundations is published"
);


check(
  isPublished(
    calculus
  ),
  "Calculus Foundations is published"
);


check(
  isPublished(
    python
  ),
  "Python for Data Analysis is published"
);


check(
  read(
    "lib/course-lessons.ts"
  ).includes(
    "isCourseLearningAccessible"
  ),
  "lesson runtime uses publication access control"
);


check(
  read(
    "lib/assessments/index.ts"
  ).includes(
    "isCourseLearningAccessible"
  ),
  "assessment runtime uses publication access control"
);


if (failed) {
  console.error(
    "\nRelease publication audit failed."
  );

  process.exit(
    1
  );
}


console.log(
  "\nRelease publication audit passed."
);
