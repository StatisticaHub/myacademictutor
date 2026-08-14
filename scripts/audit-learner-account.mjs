import fs from "node:fs";
import path from "node:path";


const required = [
  "components/Header.tsx",
  "app/account/page.tsx",
  "app/account/actions.ts",
  "app/dashboard/page.tsx",
];


let failed =
  false;


for (
  const relative
  of required
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
    failed =
      true;

    console.error(
      `✗ Missing ${relative}`
    );
  }
}


const globals =
  path.join(
    process.cwd(),
    "app",
    "globals.css"
  );


if (
  fs.existsSync(
    globals
  )
) {

  const css =
    fs.readFileSync(
      globals,
      "utf8"
    );


  if (
    css.includes(
      "STAGE 5 — LEARNER ACCOUNT"
    )
  ) {
    console.log(
      "✓ Stage 5 CSS"
    );
  } else {
    failed =
      true;

    console.error(
      "✗ Stage 5 CSS not found"
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
  "\nLearner account source audit passed."
);
