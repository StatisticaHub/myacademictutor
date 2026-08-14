import fs from "node:fs";
import path from "node:path";


const courseSlug =
  process.argv[2];


if (!courseSlug) {
  console.error(
    `
Usage:
  node scripts/create-course-engine.mjs <course-slug>

Example:
  node scripts/create-course-engine.mjs calculus-foundations

The script reads that course from lib/data.ts, creates a course-engine
definition, and registers it automatically. Review the generated TODO
lesson titles before publishing.
`
  );

  process.exit(
    1
  );
}


const cwd =
  process.cwd();


const dataPath =
  path.join(
    cwd,
    "lib",
    "data.ts"
  );


const registryPath =
  path.join(
    cwd,
    "lib",
    "course-engine",
    "courses",
    "index.ts"
  );


if (
  !fs.existsSync(
    dataPath
  )
) {
  throw new Error(
    "lib/data.ts was not found."
  );
}


const source =
  fs.readFileSync(
    dataPath,
    "utf8"
  );


const slugNeedle =
  `slug: "${courseSlug}"`;


const slugPosition =
  source.indexOf(
    slugNeedle
  );


if (
  slugPosition <
  0
) {
  throw new Error(
    `Course "${courseSlug}" was not found in lib/data.ts.`
  );
}


const objectStart =
  source.lastIndexOf(
    "\n  {",
    slugPosition
  );


const nextObject =
  source.indexOf(
    "\n  {",
    slugPosition +
      slugNeedle.length
  );


const coursesEnd =
  source.indexOf(
    "\n];",
    slugPosition
  );


let objectEnd =
  nextObject;


if (
  objectEnd <
  0 ||
  (
    coursesEnd >
      0 &&
    coursesEnd <
      objectEnd
  )
) {
  objectEnd =
    coursesEnd;
}


if (
  objectStart <
    0 ||
  objectEnd <
    0
) {
  throw new Error(
    "Could not safely isolate the course object in lib/data.ts."
  );
}


const block =
  source.slice(
    objectStart,
    objectEnd
  );


function stringField(
  field
) {
  const match =
    new RegExp(
      `${field}:\\s*"([^"]+)"`
    )
      .exec(
        block
      );


  return match
    ?.[
      1
    ];
}


function numberField(
  field
) {
  const match =
    new RegExp(
      `${field}:\\s*(\\d+)`
    )
      .exec(
        block
      );


  return match
    ? Number(
        match[1]
      )
    : undefined;
}


function stringArrayField(
  field
) {
  const match =
    new RegExp(
      `${field}:\\s*\\[([\\s\\S]*?)\\]`,
      "m"
    )
      .exec(
        block
      );


  if (!match) {
    return [];
  }


  return Array.from(
    match[1]
      .matchAll(
        /"([^"]+)"/g
      )
  )
    .map(
      (
        item
      ) =>
        item[1]
    );
}


const title =
  stringField(
    "title"
  );


const subject =
  stringField(
    "subject"
  );


const level =
  stringField(
    "level"
  );


const totalLessons =
  numberField(
    "lessons"
  );


const modules =
  stringArrayField(
    "modules"
  );


if (
  !title ||
  !subject ||
  !level ||
  !totalLessons ||
  modules.length ===
    0
) {
  throw new Error(
    "The course object could not be parsed completely. No files were changed."
  );
}


function slugify(
  value
) {
  return value
    .toLowerCase()
    .replace(
      /&/g,
      " and "
    )
    .replace(
      /[^a-z0-9]+/g,
      "-"
    )
    .replace(
      /^-+|-+$/g,
      ""
    );
}


const counts =
  Array.from(
    {
      length:
        modules.length,
    },
    () =>
      Math.floor(
        totalLessons /
        modules.length
      )
  );


for (
  let i =
    0;
  i <
    totalLessons %
      modules.length;
  i +=
    1
) {
  counts[i] +=
    1;
}


const exportName =
  courseSlug
    .split(
      "-"
    )
    .map(
      (
        part,
        index
      ) =>
        index ===
        0
          ? part
          : part
              .slice(
                0,
                1
              )
              .toUpperCase() +
            part.slice(
              1
            )
    )
    .join(
      ""
    ) +
  "Course";


const moduleSource =
  modules
    .map(
      (
        moduleTitle,
        moduleIndex
      ) => {

        const moduleNumber =
          moduleIndex +
          1;


        const moduleKey =
          slugify(
            moduleTitle
          );


        const lessonLines =
          Array.from(
            {
              length:
                counts[
                  moduleIndex
                ],
            },
            (
              _,
              lessonIndex
            ) => {

              const lessonNumber =
                lessonIndex +
                1;


              return `        lesson(${moduleNumber}, ${lessonNumber}, ${JSON.stringify(moduleKey)}, ${JSON.stringify(`TODO: ${moduleTitle} lesson ${lessonNumber}`)}),`;
            }
          )
          .join(
            "\n"
          );


        return `    {
      key: ${JSON.stringify(moduleKey)},
      title: ${JSON.stringify(moduleTitle)},
      lessons: [
${lessonLines}
      ],
    },`;
      }
    )
    .join(
      "\n\n"
    );


const generated =
`import type {
  CourseEngineDefinition,
} from "@/lib/course-engine/types";

import {
  buildCourseLessonKey,
} from "@/lib/course-engine/legacy-adapter";


function lesson(
  moduleNumber: number,
  lessonNumber: number,
  moduleKey: string,
  title: string
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
    contentKey: key,
  };
}


export const ${exportName}:
  CourseEngineDefinition = {

  slug: ${JSON.stringify(courseSlug)},
  version: 1,

  title: ${JSON.stringify(title)},
  subject: ${JSON.stringify(subject)},
  level: ${JSON.stringify(level)},

  status: "draft",

  modules: [

${moduleSource}
  ],

  completion: {
    requireAllLessons: true,

    /*
     * Turn these on only after the assessment content exists.
     */
    requireAllCheckpoints: false,
    requireFinalAssessment: false,
    certificateEnabled: false,
  },
};
`;


const outputPath =
  path.join(
    cwd,
    "lib",
    "course-engine",
    "courses",
    `${courseSlug}.ts`
  );


if (
  fs.existsSync(
    outputPath
  )
) {
  throw new Error(
    `${outputPath} already exists. Nothing was overwritten.`
  );
}


fs.writeFileSync(
  outputPath,
  generated
);


let registry =
  fs.readFileSync(
    registryPath,
    "utf8"
  );


const importStatement =
`import {
  ${exportName},
} from "@/lib/course-engine/courses/${courseSlug}";

`;


if (
  !registry.includes(
    `courses/${courseSlug}`
  )
) {
  registry =
    importStatement +
    registry;
}


const arrayNeedle =
  "export const registeredCourseDefinitions:";


const arrayStart =
  registry.indexOf(
    arrayNeedle
  );


const closing =
  registry.indexOf(
    "\n];",
    arrayStart
  );


if (
  arrayStart <
    0 ||
  closing <
    0
) {
  throw new Error(
    "Could not update course engine registry."
  );
}


if (
  !registry
    .slice(
      arrayStart,
      closing
    )
    .includes(
      exportName
    )
) {
  registry =
    registry.slice(
      0,
      closing
    ) +
    `\n\n  ${exportName},` +
    registry.slice(
      closing
    );
}


fs.writeFileSync(
  registryPath,
  registry
);


console.log(
  `✓ Created ${path.relative(cwd, outputPath)}`
);

console.log(
  `✓ Registered ${exportName}`
);

console.log(
  ""
);

console.log(
  "Next:"
);

console.log(
  "1. Replace every TODO lesson title with the real curriculum."
);

console.log(
  "2. Add checkpointKey values only when checkpoint content exists."
);

console.log(
  "3. Enable final assessment/certificate only after assessments exist."
);

console.log(
  "4. Run node scripts/audit-course-engine.mjs && npm run build."
);
