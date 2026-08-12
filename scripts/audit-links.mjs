/* ==========================================================================
   MY ACADEMIC TUTOR — INTERNAL LINK AUDIT

   Run while production server is active:

   npm start

   Then in another terminal:

   node scripts/audit-links.mjs
   ========================================================================== */


const BASE_URL =
  process.env.AUDIT_BASE_URL ||
  "http://localhost:3000";


const CONCURRENCY = 10;


/* ==========================================================================
   TERMINAL COLOURS
   ========================================================================== */

const green = "\x1b[32m";
const red = "\x1b[31m";
const yellow = "\x1b[33m";
const cyan = "\x1b[36m";
const dim = "\x1b[2m";
const reset = "\x1b[0m";


/* ==========================================================================
   HELPERS
   ========================================================================== */

function decodeHtml(value) {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">");
}


function extractSitemapLocations(xml) {
  return [
    ...xml.matchAll(
      /<loc>(.*?)<\/loc>/g
    ),
  ].map(
    (match) =>
      decodeHtml(
        match[1]
      ).trim()
  );
}


function extractLinks(html) {
  const links = [];

  const regex =
    /<a\b[^>]*\bhref\s*=\s*(["'])(.*?)\1/gi;


  for (
    const match of
    html.matchAll(regex)
  ) {
    const href =
      decodeHtml(
        match[2]
      ).trim();

    if (href) {
      links.push(href);
    }
  }


  return links;
}


function extractIds(html) {
  const ids =
    new Set();

  const regex =
    /\bid\s*=\s*(["'])(.*?)\1/gi;


  for (
    const match of
    html.matchAll(regex)
  ) {
    if (match[2]) {
      ids.add(
        decodeHtml(
          match[2]
        )
      );
    }
  }


  return ids;
}


function toLocalUrl(
  target
) {
  const parsed =
    new URL(target);

  return new URL(
    `${parsed.pathname}${parsed.search}${parsed.hash}`,
    BASE_URL
  ).toString();
}


function displayUrl(value) {
  const parsed =
    new URL(value);

  return (
    parsed.pathname +
    parsed.search +
    parsed.hash
  );
}


function stripHash(value) {
  const parsed =
    new URL(value);

  parsed.hash = "";

  return parsed.toString();
}


function shouldIgnoreHref(
  href
) {
  const lower =
    href.toLowerCase();


  return (
    lower.startsWith(
      "mailto:"
    ) ||
    lower.startsWith(
      "tel:"
    ) ||
    lower.startsWith(
      "sms:"
    ) ||
    lower.startsWith(
      "data:"
    ) ||
    lower.startsWith(
      "blob:"
    )
  );
}


function isPlaceholderHref(
  href
) {
  const normalised =
    href.trim().toLowerCase();


  return (
    normalised === "#" ||
    normalised === "" ||
    normalised.startsWith(
      "javascript:"
    )
  );
}


function isNextAsset(
  pathname
) {
  return (
    pathname.startsWith(
      "/_next/"
    ) ||
    pathname ===
      "/favicon.ico"
  );
}


/* ==========================================================================
   CONCURRENCY
   ========================================================================== */

async function runWithConcurrency(
  items,
  worker,
  limit
) {
  const results =
    new Array(
      items.length
    );

  let nextIndex = 0;


  async function runner() {
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


  await Promise.all(
    Array.from(
      {
        length:
          Math.min(
            limit,
            items.length
          ),
      },
      () => runner()
    )
  );


  return results;
}


/* ==========================================================================
   FETCH PAGE
   ========================================================================== */

async function fetchPage(
  target
) {
  const start =
    performance.now();


  try {
    const response =
      await fetch(
        target,
        {
          redirect: "follow",

          headers: {
            "User-Agent":
              "MyAcademicTutor-LinkAudit/1.0",
          },
        }
      );


    const contentType =
      response.headers.get(
        "content-type"
      ) || "";


    const html =
      contentType.includes(
        "text/html"
      )
        ? await response.text()
        : "";


    return {
      target,

      ok:
        response.status >=
          200 &&
        response.status <
          400,

      status:
        response.status,

      duration:
        Math.round(
          performance.now() -
            start
        ),

      html,
    };
  } catch (error) {
    return {
      target,
      ok: false,
      status: 0,
      duration: 0,
      html: "",

      error:
        error instanceof Error
          ? error.message
          : String(error),
    };
  }
}


/* ==========================================================================
   MAIN
   ========================================================================== */

async function main() {
  console.log(
    "\n=============================================="
  );

  console.log(
    " MY ACADEMIC TUTOR — INTERNAL LINK AUDIT"
  );

  console.log(
    "=============================================="
  );

  console.log(
    `Base URL: ${BASE_URL}\n`
  );


  /* ------------------------------------------------------------------------
     1. Confirm server
     ------------------------------------------------------------------------ */

  try {
    const response =
      await fetch(
        BASE_URL
      );


    if (!response.ok) {
      throw new Error(
        `Homepage returned ${response.status}`
      );
    }
  } catch {
    console.error(
      `${red}✗ Production server is not reachable.${reset}`
    );

    console.error(
      "\nRun this first:"
    );

    console.error(
      "npm start\n"
    );

    process.exit(1);
  }


  console.log(
    `${green}✓ Production server reachable${reset}`
  );


  /* ------------------------------------------------------------------------
     2. Read sitemap
     ------------------------------------------------------------------------ */

  const sitemapResponse =
    await fetch(
      new URL(
        "/sitemap.xml",
        BASE_URL
      )
    );


  if (
    !sitemapResponse.ok
  ) {
    console.error(
      `${red}✗ Could not read sitemap.xml${reset}`
    );

    process.exit(1);
  }


  const sitemapXml =
    await sitemapResponse.text();


  const sitemapLocations =
    extractSitemapLocations(
      sitemapXml
    );


  const sitemapPages =
    sitemapLocations.map(
      toLocalUrl
    );


  /*
   * These pages are intentionally
   * absent from the sitemap but
   * still contain links that should
   * be audited.
   */

  const additionalPages = [
    new URL(
      "/search",
      BASE_URL
    ).toString(),

    new URL(
      "/search?q=regression",
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
  ];


  const pagesToScan = [
    ...new Set([
      ...sitemapPages,
      ...additionalPages,
    ]),
  ];


  console.log(
    `${green}✓ ${pagesToScan.length} pages queued for link scanning${reset}\n`
  );


  /* ------------------------------------------------------------------------
     3. Fetch pages
     ------------------------------------------------------------------------ */

  console.log(
    "Scanning rendered HTML..."
  );


  const pageResults =
    await runWithConcurrency(
      pagesToScan,
      fetchPage,
      CONCURRENCY
    );


  const failedPages =
    pageResults.filter(
      (result) =>
        !result.ok
    );


  if (
    failedPages.length >
    0
  ) {
    console.log(
      `${yellow}⚠ Some source pages could not be scanned:${reset}`
    );


    for (
      const result of
      failedPages
    ) {
      console.log(
        `${red}✗ ${result.status || "ERR"} ${displayUrl(result.target)}${reset}`
      );
    }
  }


  /* ------------------------------------------------------------------------
     4. Collect links
     ------------------------------------------------------------------------ */

  const internalLinks =
    new Map();

  const externalLinks =
    new Set();

  const placeholders = [];

  const pageHtml =
    new Map();


  for (
    const page of
    pageResults
  ) {
    if (
      !page.ok ||
      !page.html
    ) {
      continue;
    }


    pageHtml.set(
      stripHash(page.target),
      page.html
    );


    const links =
      extractLinks(
        page.html
      );


    for (
      const href of
      links
    ) {
      if (
        isPlaceholderHref(
          href
        )
      ) {
        placeholders.push({
          page:
            page.target,

          href,
        });

        continue;
      }


      if (
        shouldIgnoreHref(
          href
        )
      ) {
        continue;
      }


      let resolved;


      try {
        resolved =
          new URL(
            href,
            page.target
          );
      } catch {
        placeholders.push({
          page:
            page.target,

          href,
        });

        continue;
      }


      if (
        resolved.origin ===
        new URL(
          BASE_URL
        ).origin
      ) {
        if (
          isNextAsset(
            resolved.pathname
          )
        ) {
          continue;
        }


        const key =
          resolved.toString();


        if (
          !internalLinks.has(
            key
          )
        ) {
          internalLinks.set(
            key,
            new Set()
          );
        }


        internalLinks
          .get(key)
          .add(
            page.target
          );
      } else {
        externalLinks.add(
          resolved.toString()
        );
      }
    }
  }


  console.log(
    `${green}✓ Found ${internalLinks.size} unique internal links${reset}`
  );

  console.log(
    `${dim}  Found ${externalLinks.size} unique external links${reset}\n`
  );


  /* ------------------------------------------------------------------------
     5. Check placeholders
     ------------------------------------------------------------------------ */

  console.log(
    "Checking placeholder links..."
  );


  if (
    placeholders.length ===
    0
  ) {
    console.log(
      `${green}✓ No placeholder hrefs found${reset}\n`
    );
  } else {
    console.log(
      `${red}✗ Found ${placeholders.length} placeholder links${reset}`
    );


    for (
      const item of
      placeholders
    ) {
      console.log(
        `  ${displayUrl(
          item.page
        )} → ${item.href}`
      );
    }


    console.log("");
  }


  /* ------------------------------------------------------------------------
     6. Check unique internal destinations
     ------------------------------------------------------------------------ */

  console.log(
    "Checking internal destinations..."
  );


  const destinationUrls =
    [
      ...new Set(
        [...internalLinks.keys()].map(
          stripHash
        )
      ),
    ];


  const destinationResults =
    await runWithConcurrency(
      destinationUrls,
      fetchPage,
      CONCURRENCY
    );


  const destinationMap =
    new Map(
      destinationResults.map(
        (result) => [
          stripHash(
            result.target
          ),

          result,
        ]
      )
    );


  const brokenLinks = [];


  for (
    const [
      link,
      sourcePages,
    ] of internalLinks
  ) {
    const destination =
      destinationMap.get(
        stripHash(link)
      );


    if (
      !destination ||
      !destination.ok
    ) {
      brokenLinks.push({
        link,
        status:
          destination?.status ||
          0,

        sourcePages: [
          ...sourcePages,
        ],
      });
    }
  }


  if (
    brokenLinks.length ===
    0
  ) {
    console.log(
      `${green}✓ All internal destinations return successful responses${reset}\n`
    );
  } else {
    console.log(
      `${red}✗ Found ${brokenLinks.length} broken internal destinations${reset}\n`
    );


    for (
      const item of
      brokenLinks
    ) {
      console.log(
        `${red}${item.status || "ERR"} ${displayUrl(item.link)}${reset}`
      );


      for (
        const source of
        item.sourcePages.slice(
          0,
          5
        )
      ) {
        console.log(
          `   linked from ${displayUrl(source)}`
        );
      }


      if (
        item.sourcePages.length >
        5
      ) {
        console.log(
          `   +${item.sourcePages.length - 5} more pages`
        );
      }
    }


    console.log("");
  }


  /* ------------------------------------------------------------------------
     7. Check fragment anchors
     ------------------------------------------------------------------------ */

  console.log(
    "Checking page anchors..."
  );


  const missingAnchors = [];


  for (
    const [
      link,
      sourcePages,
    ] of internalLinks
  ) {
    const parsed =
      new URL(link);


    if (!parsed.hash) {
      continue;
    }


    const fragment =
      decodeURIComponent(
        parsed.hash.slice(1)
      );


    if (!fragment) {
      continue;
    }


    const destinationKey =
      stripHash(link);


    let html =
      pageHtml.get(
        destinationKey
      );


    if (!html) {
      const fetched =
        destinationMap.get(
          destinationKey
        );

      html =
        fetched?.html || "";
    }


    if (!html) {
      continue;
    }


    const ids =
      extractIds(
        html
      );


    if (
      !ids.has(fragment)
    ) {
      missingAnchors.push({
        link,

        sourcePages: [
          ...sourcePages,
        ],
      });
    }
  }


  if (
    missingAnchors.length ===
    0
  ) {
    console.log(
      `${green}✓ All internal fragment links have matching targets${reset}\n`
    );
  } else {
    console.log(
      `${red}✗ Found ${missingAnchors.length} missing anchor targets${reset}\n`
    );


    for (
      const item of
      missingAnchors
    ) {
      console.log(
        `${red}${displayUrl(item.link)}${reset}`
      );

      console.log(
        `   linked from ${displayUrl(item.sourcePages[0])}`
      );
    }


    console.log("");
  }


  /* ------------------------------------------------------------------------
     8. HTTP status summary
     ------------------------------------------------------------------------ */

  const statusCounts =
    new Map();


  for (
    const result of
    destinationResults
  ) {
    const status =
      result.status ||
      "ERR";

    statusCounts.set(
      status,
      (
        statusCounts.get(
          status
        ) || 0
      ) + 1
    );
  }


  /* ------------------------------------------------------------------------
     9. Final summary
     ------------------------------------------------------------------------ */

  const failureCount =
    failedPages.length +
    placeholders.length +
    brokenLinks.length +
    missingAnchors.length;


  console.log(
    "=============================================="
  );

  console.log(
    " LINK AUDIT SUMMARY"
  );

  console.log(
    "=============================================="
  );

  console.log(
    `Pages scanned:             ${pagesToScan.length}`
  );

  console.log(
    `Unique internal links:     ${internalLinks.size}`
  );

  console.log(
    `Unique external links:     ${externalLinks.size}`
  );

  console.log(
    `Placeholder links:         ${placeholders.length}`
  );

  console.log(
    `Broken internal links:     ${brokenLinks.length}`
  );

  console.log(
    `Missing anchor targets:    ${missingAnchors.length}`
  );


  console.log(
    "\nDestination statuses:"
  );


  for (
    const [
      status,
      count,
    ] of [
      ...statusCounts.entries()
    ].sort(
      (a, b) =>
        String(
          a[0]
        ).localeCompare(
          String(
            b[0]
          )
        )
    )
  ) {
    console.log(
      `  ${status}: ${count}`
    );
  }


  if (
    failureCount ===
    0
  ) {
    console.log(
      `\n${green}✓ Internal link audit passed.${reset}`
    );

    console.log(
      `${green}No broken routes, placeholder hrefs or missing anchors were found.${reset}\n`
    );
  } else {
    console.log(
      `\n${red}✗ Link audit found ${failureCount} issue(s).${reset}\n`
    );

    process.exitCode =
      1;
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