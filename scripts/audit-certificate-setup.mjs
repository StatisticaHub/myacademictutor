import fs from "node:fs";
import path from "node:path";


const requiredFiles = [
  "lib/certificates.ts",
  "app/courses/[slug]/certificate/route.ts",
  "app/certificate/[code]/page.tsx",
  "app/courses/[slug]/complete/page.tsx",
];


let failed =
  false;


for (
  const relativePath
  of requiredFiles
) {

  const fullPath =
    path.join(
      process.cwd(),
      relativePath
    );


  if (
    fs.existsSync(
      fullPath
    )
  ) {
    console.log(
      `✓ ${relativePath}`
    );
  } else {
    failed =
      true;

    console.error(
      `✗ Missing ${relativePath}`
    );
  }
}


const packagePath =
  path.join(
    process.cwd(),
    "package.json"
  );


if (
  fs.existsSync(
    packagePath
  )
) {

  const pkg =
    JSON.parse(
      fs.readFileSync(
        packagePath,
        "utf8"
      )
    );


  const hasPdfLib =
    Boolean(
      pkg.dependencies
        ?.["pdf-lib"] ||
      pkg.devDependencies
        ?.["pdf-lib"]
    );


  if (
    hasPdfLib
  ) {
    console.log(
      "✓ pdf-lib dependency"
    );
  } else {
    failed =
      true;

    console.error(
      "✗ pdf-lib is not installed"
    );
  }
}


if (
  failed
) {
  process.exit(
    1
  );
}


console.log(
  "\nCertificate source audit passed."
);
