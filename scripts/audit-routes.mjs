/* ==========================================================================
   MY ACADEMIC TUTOR — ROUTE AUDIT

   Usage:

   1. Build:
      npm run build

   2. Start production server:
      npm start

   3. In another terminal:
      node scripts/audit-routes.mjs
   ========================================================================== */


const BASE_URL =
  process.env.AUDIT_BASE_URL ||
  "http://localhost:3000";


const CONCURRENCY = 10;


/* ==========================================================================
   COLOURS
   ========================================================================== */

const green = "\x1b[32m";
const red = "\x1b[31m";
const yellow = "\x1b[33m";
const dim = "\x1b[2m";
const reset = "\x1b[0m";


/* ==========================================================================
   HELPERS
   ========================================================================== */

function extractSitemapLocations(xml) {
  const matches = [
    ...xml.matchAll(
      /<loc>(.*?)<\/loc>/g
    ),
  ];

  return matches.map(
    (match) =>
      match[1]
        .replaceAll("&amp;", "&")
        .trim()
  );
}


function localiseUrl(url) {
  const parsed =
    new URL(url);

  return new URL(
    `${parsed.pathname}${parsed.search}`,
    BASE_URL
  ).toString();
}


async function checkRoute(target) {
  const start =
    performance.now();

  try {
    const response =
      await fetch(target, {
        method: "GET",

        redirect: "follow",

        headers: {
          "User-Agent":
            "MyAcademicTutor-LocalAudit/1.0",
        },
      });

    const duration =
      Math.round(
        performance.now() -
          start
      );

    return {
      target,
      status:
        response.status,

      ok:
        response.status >= 200 &&
        response.status < 400,

      duration,
    };
  } catch (error) {
    return {
      target,
      status: 0,
      ok: false,
      duration: 0,

      error:
        error instanceof Error
          ? error.message
          : String(error),
    };
  }
}


/* ==========================================================================
   CONCURRENT WORKER
   ========================================================================== */

async function runWithConcurrency(
  items,
  worker,
  limit
) {
  const results =
    new Array(items.length);

  let nextIndex = 0;


  async function runWorker() {
    while (true) {
      const index =
        nextIndex++;

      if (
        index >=
        items.length
      ) {
        return;
      }

      results[index] =
        await worker(
          items[index]
        );
    }
  }


  const workers =
    Array.from(
      {
        length:
          Math.min(
            limit,
            items.length
          ),
      },
      () => runWorker()
    );


  await Promise.all(
    workers
  );


  return results;
}


/* ==========================================================================
   MAIN AUDIT
   ========================================================================== */

async function main() {
  console.log(
    "\n=============================================="
  );

  console.log(
    " MY ACADEMIC TUTOR — ROUTE AUDIT"
  );

  console.log(
    "=============================================="
  );

  console.log(
    `Base URL: ${BASE_URL}\n`
  );


  /* ------------------------------------------------------------------------
     Server health
     ------------------------------------------------------------------------ */

  console.log(
    "Checking production server..."
  );


  let homeResponse;


  try {
    homeResponse =
      await fetch(BASE_URL);
  } catch {
    console.error(
      `${red}✗ Cannot reach ${BASE_URL}${reset}`
    );

    console.error(
      "\nStart the production server first:"
    );

    console.error(
      "npm start\n"
    );

    process.exit(1);
  }


  if (!homeResponse.ok) {
    console.error(
      `${red}✗ Homepage returned ${homeResponse.status}${reset}`
    );

    process.exit(1);
  }


  console.log(
    `${green}✓ Production server reachable${reset}\n`
  );


  /* ------------------------------------------------------------------------
     Sitemap
     ------------------------------------------------------------------------ */

  const sitemapUrl =
    new URL(
      "/sitemap.xml",
      BASE_URL
    ).toString();


  console.log(
    "Reading sitemap..."
  );


  const sitemapResponse =
    await fetch(
      sitemapUrl
    );


  if (
    !sitemapResponse.ok
  ) {
    console.error(
      `${red}✗ sitemap.xml returned ${sitemapResponse.status}${reset}`
    );

    process.exit(1);
  }


  const sitemapXml =
    await sitemapResponse.text();


  const sitemapLocations =
    extractSitemapLocations(
      sitemapXml
    );


  if (
    sitemapLocations.length ===
    0
  ) {
    console.error(
      `${red}✗ No URLs found in sitemap.xml${reset}`
    );

    process.exit(1);
  }


  console.log(
    `${green}✓ Found ${sitemapLocations.length} sitemap URLs${reset}\n`
  );


  /* ------------------------------------------------------------------------
     Convert production URLs to localhost
     ------------------------------------------------------------------------ */

  const sitemapRoutes =
    sitemapLocations.map(
      localiseUrl
    );


  /* ------------------------------------------------------------------------
     Additional routes not intentionally indexed
     ------------------------------------------------------------------------ */

  const utilityRoutes = [
    new URL(
      "/search",
      BASE_URL
    ).toString(),

    new URL(
      "/search?q=regression",
      BASE_URL
    ).toString(),

    new URL(
      "/search?q=python&type=courses",
      BASE_URL
    ).toString(),

    new URL(
      "/dashboard",
      BASE_URL
    ).toString(),

    new URL(
      "/learning?level=high-school",
      BASE_URL
    ).toString(),

    new URL(
      "/learning?level=undergraduate",
      BASE_URL
    ).toString(),

    new URL(
      "/learning?level=postgraduate",
      BASE_URL
    ).toString(),

    new URL(
      "/learning?level=casual",
      BASE_URL
    ).toString(),

    new URL(
      "/robots.txt",
      BASE_URL
    ).toString(),

    new URL(
      "/manifest.webmanifest",
      BASE_URL
    ).toString(),
  ];


  const routes = [
    ...new Set([
      ...sitemapRoutes,
      ...utilityRoutes,
    ]),
  ];


  console.log(
    `Testing ${routes.length} routes...\n`
  );


  /* ------------------------------------------------------------------------
     Execute checks
     ------------------------------------------------------------------------ */

  const results =
    await runWithConcurrency(
      routes,
      checkRoute,
      CONCURRENCY
    );


  /* ------------------------------------------------------------------------
     Output
     ------------------------------------------------------------------------ */

  let passed = 0;
  let failed = 0;


  for (
    const result of results
  ) {
    const parsed =
      new URL(
        result.target
      );

    const displayPath =
      `${parsed.pathname}${parsed.search}`;


    if (result.ok) {
      passed++;

      console.log(
        `${green}✓${reset} ${String(
          result.status
        ).padEnd(3)}  ${displayPath} ${dim}${result.duration}ms${reset}`
      );
    } else {
      failed++;

      console.log(
        `${red}✗ ${String(
          result.status ||
            "ERR"
        ).padEnd(3)}  ${displayPath}${reset}`
      );

      if (result.error) {
        console.log(
          `      ${red}${result.error}${reset}`
        );
      }
    }
  }


  /* ------------------------------------------------------------------------
     Intentional 404
     ------------------------------------------------------------------------ */

  console.log(
    "\nChecking custom 404..."
  );


  const missingUrl =
    new URL(
      "/route-that-should-never-exist-404-test",
      BASE_URL
    ).toString();


  const missingResponse =
    await fetch(
      missingUrl
    );


  if (
    missingResponse.status ===
    404
  ) {
    console.log(
      `${green}✓ Custom missing route correctly returns 404${reset}`
    );
  } else {
    failed++;

    console.log(
      `${red}✗ Expected 404, received ${missingResponse.status}${reset}`
    );
  }


  /* ------------------------------------------------------------------------
     Robots checks
     ------------------------------------------------------------------------ */

  console.log(
    "\nChecking robots.txt..."
  );


  const robotsResponse =
    await fetch(
      new URL(
        "/robots.txt",
        BASE_URL
      )
    );


  const robots =
    await robotsResponse.text();


  const requiredRobotsRules = [
    "Disallow: /api/",
    "Disallow: /dashboard",
    "Disallow: /search",
    "Sitemap:",
  ];


  let robotsPassed =
    true;


  for (
    const rule of
    requiredRobotsRules
  ) {
    if (
      !robots.includes(
        rule
      )
    ) {
      robotsPassed =
        false;

      console.log(
        `${red}✗ Missing robots rule: ${rule}${reset}`
      );
    }
  }


  if (robotsPassed) {
    console.log(
      `${green}✓ robots.txt contains expected rules${reset}`
    );
  } else {
    failed++;
  }


  /* ------------------------------------------------------------------------
     Summary
     ------------------------------------------------------------------------ */

  console.log(
    "\n=============================================="
  );

  console.log(
    " AUDIT SUMMARY"
  );

  console.log(
    "=============================================="
  );

  console.log(
    `${green}Passed: ${passed}${reset}`
  );

  console.log(
    `${failed > 0 ? red : green}Failed: ${failed}${reset}`
  );

  console.log(
    `Total sitemap URLs: ${sitemapLocations.length}`
  );


  if (failed > 0) {
    console.log(
      `\n${red}Route audit failed.${reset}`
    );

    process.exitCode =
      1;
  } else {
    console.log(
      `\n${green}✓ Route audit passed.${reset}`
    );

    console.log(
      `${green}All public sitemap routes are responding successfully.${reset}\n`
    );
  }
}


/* ==========================================================================
   RUN
   ========================================================================== */

main().catch(
  (error) => {
    console.error(
      "\nUnexpected audit error:",
      error
    );

    process.exit(1);
  }
);