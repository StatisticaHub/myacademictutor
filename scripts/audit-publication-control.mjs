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
    fs.existsSync(
      full
    ),
    relative
  );


  if (
    !fs.existsSync(
      full
    )
  ) {
    return "";
  }


  return fs.readFileSync(
    full,
    "utf8"
  );
}


const publication =
  read(
    "lib/course-engine/publication.ts"
  );


check(
  publication.includes(
    'definition.status ===\n    "published"'
  ),
  "published courses are explicitly handled"
);


check(
  publication.includes(
    'definition.status ===\n    "draft"'
  ),
  "draft courses are explicitly handled"
);


check(
  publication.includes(
    'status:\n      "catalogue"'
  ),
  "catalogue-only courses are explicitly handled"
);


check(
  publication.includes(
    "COURSE_PREVIEW_MODE"
  ),
  "optional server-only preview mode exists"
);


const calculus =
  read(
    "lib/course-engine/courses/calculus-foundations.ts"
  );


check(
  calculus.includes(
    'status:\n    "draft"'
  ) ||
  calculus.includes(
    'status: "draft"'
  ),
  "Calculus Foundations remains draft"
);


const statistics =
  read(
    "lib/course-engine/courses/statistics-foundations.ts"
  );


check(
  statistics.includes(
    'status:\n    "published"'
  ) ||
  statistics.includes(
    'status: "published"'
  ),
  "Statistics Foundations remains published"
);


const lessons =
  read(
    "lib/course-lessons.ts"
  );


check(
  lessons.includes(
    "isCourseLearningAccessible"
  ),
  "lesson runtime is publication-gated"
);


const assessments =
  read(
    "lib/assessments/index.ts"
  );


check(
  assessments.includes(
    "isCourseLearningAccessible"
  ),
  "assessment runtime is publication-gated"
);


const actions =
  read(
    "app/courses/[slug]/actions.ts"
  );


check(
  actions.includes(
    "isCourseEnrollable"
  ),
  "server-side enrolment is publication-gated"
);


const enrol =
  read(
    "components/CourseEnrollAction.tsx"
  );


check(
  enrol.includes(
    "getCoursePublicationState"
  ),
  "course enrolment UI reads publication state"
);


const coursePage =
  read(
    "app/courses/[slug]/page.tsx"
  );


check(
  coursePage.includes(
    "getCoursePublicationState"
  ) &&
  coursePage.includes(
    "filterVisibleCourses"
  ),
  "course detail page is publication-aware"
);


const coursesPage =
  read(
    "app/courses/page.tsx"
  );


check(
  coursesPage.includes(
    "filterVisibleCourses"
  ),
  "course catalogue filters drafts"
);


const sitemap =
  read(
    "app/sitemap.ts"
  );


check(
  sitemap.includes(
    "isCourseIndexable"
  ),
  "sitemap excludes non-indexable courses"
);


const dashboard =
  read(
    "app/dashboard/page.tsx"
  );


check(
  dashboard.includes(
    "isCourseLearningAccessible"
  ),
  "dashboard hides inaccessible course enrolments"
);


if (
  failed
) {
  console.error(
    "\nPublication-control source audit failed."
  );

  process.exit(
    1
  );
}


console.log(
  "\nPublication-control source audit passed."
);
