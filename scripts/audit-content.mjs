/* ==========================================================================
   MY ACADEMIC TUTOR — CONTENT & SEO AUDIT

   Run while the production server is running:

   npm start

   Then:

   node scripts/audit-content.mjs
   ========================================================================== */


const BASE_URL =
  process.env.AUDIT_BASE_URL ||
  "http://localhost:3000";


const CONCURRENCY = 10;


/* ==========================================================================
   TERMINAL
   ========================================================================== */

const green = "\x1b[32m";
const red = "\x1b[31m";
const yellow = "\x1b[33m";
const dim = "\x1b[2m";
const reset = "\x1b[0m";


/* ==========================================================================
   HELPERS
   ========================================================================== */

function decodeHtml(value = "") {
  return value
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">");
}


function stripTags(value = "") {
  return decodeHtml(
    value.replace(
      /<[^>]*>/g,
      " "
    )
  )
    .replace(/\s+/g, " ")
    .trim();
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


function toLocalUrl(target) {
  const parsed =
    new URL(target);

  return new URL(
    parsed.pathname +
      parsed.search,
    BASE_URL
  ).toString();
}


function displayUrl(target) {
  const parsed =
    new URL(target);

  return (
    parsed.pathname +
    parsed.search
  );
}


function getTitle(html) {
  const match =
    html.match(
      /<title[^>]*>([\s\S]*?)<\/title>/i
    );

  return match
    ? stripTags(match[1])
    : "";
}


function getMetaContent(
  html,
  name
) {
  const patterns = [
    new RegExp(
      `<meta[^>]+name=["']${name}["'][^>]+content=["']([^"']*)["'][^>]*>`,
      "i"
    ),

    new RegExp(
      `<meta[^>]+content=["']([^"']*)["'][^>]+name=["']${name}["'][^>]*>`,
      "i"
    ),
  ];


  for (
    const pattern of
    patterns
  ) {
    const match =
      html.match(
        pattern
      );

    if (match) {
      return decodeHtml(
        match[1]
      ).trim();
    }
  }


  return "";
}


function getPropertyContent(
  html,
  property
) {
  const patterns = [
    new RegExp(
      `<meta[^>]+property=["']${property}["'][^>]+content=["']([^"']*)["'][^>]*>`,
      "i"
    ),

    new RegExp(
      `<meta[^>]+content=["']([^"']*)["'][^>]+property=["']${property}["'][^>]*>`,
      "i"
    ),
  ];


  for (
    const pattern of
    patterns
  ) {
    const match =
      html.match(
        pattern
      );

    if (match) {
      return decodeHtml(
        match[1]
      ).trim();
    }
  }


  return "";
}


function getH1s(html) {
  return [
    ...html.matchAll(
      /<h1\b[^>]*>([\s\S]*?)<\/h1>/gi
    ),
  ].map(
    (match) =>
      stripTags(
        match[1]
      )
  );
}


function getImages(html) {
  return [
    ...html.matchAll(
      /<img\b[^>]*>/gi
    ),
  ].map(
    (match) =>
      match[0]
  );
}


function getHtmlLang(html) {
  const match =
    html.match(
      /<html\b[^>]*\blang=["']([^"']+)["']/i
    );

  return match
    ? match[1]
    : "";
}


function getRobotsMeta(html) {
  return getMetaContent(
    html,
    "robots"
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
      () =>
        runner()
    )
  );


  return results;
}


/* ==========================================================================
   FETCH
   ========================================================================== */

async function fetchPage(target) {
  try {
    const response =
      await fetch(
        target,
        {
          redirect: "follow",

          headers: {
            "User-Agent":
              "MyAcademicTutor-ContentAudit/1.0",
          },
        }
      );


    return {
      target,

      status:
        response.status,

      ok:
        response.status >= 200 &&
        response.status < 400,

      html:
        await response.text(),
    };
  } catch (error) {
    return {
      target,
      status: 0,
      ok: false,
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
    " MY ACADEMIC TUTOR — CONTENT & SEO AUDIT"
  );

  console.log(
    "=============================================="
  );

  console.log(
    `Base URL: ${BASE_URL}\n`
  );


  /* ------------------------------------------------------------------------
     Server
     ------------------------------------------------------------------------ */

  try {
    const response =
      await fetch(
        BASE_URL
      );

    if (!response.ok) {
      throw new Error();
    }
  } catch {
    console.error(
      `${red}✗ Production server is not reachable.${reset}`
    );

    console.error(
      "\nStart it first with:\n"
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
     Sitemap
     ------------------------------------------------------------------------ */

  const sitemapResponse =
    await fetch(
      new URL(
        "/sitemap.xml",
        BASE_URL
      )
    );


  const sitemapXml =
    await sitemapResponse.text();


  const pages =
    extractSitemapLocations(
      sitemapXml
    ).map(
      toLocalUrl
    );


  console.log(
    `${green}✓ ${pages.length} indexable pages found${reset}\n`
  );


  /* ------------------------------------------------------------------------
     Fetch
     ------------------------------------------------------------------------ */

  console.log(
    "Auditing rendered pages..."
  );


  const results =
    await runWithConcurrency(
      pages,
      fetchPage,
      CONCURRENCY
    );


  /* ------------------------------------------------------------------------
     Issue storage
     ------------------------------------------------------------------------ */

  const errors = [];
  const warnings = [];

  const titles =
    new Map();

  const descriptions =
    new Map();


  /* ------------------------------------------------------------------------
     Individual page checks
     ------------------------------------------------------------------------ */

  for (
    const page of
    results
  ) {
    const path =
      displayUrl(
        page.target
      );


    if (!page.ok) {
      errors.push(
        `${path} returned ${page.status || "ERR"}`
      );

      continue;
    }


    const html =
      page.html;

    const title =
      getTitle(html);

    const description =
      getMetaContent(
        html,
        "description"
      );

    const ogTitle =
      getPropertyContent(
        html,
        "og:title"
      );

    const ogDescription =
      getPropertyContent(
        html,
        "og:description"
      );

    const h1s =
      getH1s(html);

    const images =
      getImages(html);

    const lang =
      getHtmlLang(html);

    const robots =
      getRobotsMeta(html);


    /* --------------------------------------------------------------------
       Title
       -------------------------------------------------------------------- */

    if (!title) {
      errors.push(
        `${path} has no <title>`
      );
    } else {
      if (
        !titles.has(
          title
        )
      ) {
        titles.set(
          title,
          []
        );
      }

      titles
        .get(title)
        .push(path);


      if (
        title.length < 20
      ) {
        warnings.push(
          `${path} has a short title (${title.length} chars): "${title}"`
        );
      }

      if (
        title.length > 70
      ) {
        warnings.push(
          `${path} has a long title (${title.length} chars)`
        );
      }
    }


    /* --------------------------------------------------------------------
       Description
       -------------------------------------------------------------------- */

    if (!description) {
      errors.push(
        `${path} has no meta description`
      );
    } else {
      if (
        !descriptions.has(
          description
        )
      ) {
        descriptions.set(
          description,
          []
        );
      }

      descriptions
        .get(
          description
        )
        .push(path);


      if (
        description.length <
        70
      ) {
        warnings.push(
          `${path} has a short meta description (${description.length} chars)`
        );
      }

      if (
        description.length >
        180
      ) {
        warnings.push(
          `${path} has a long meta description (${description.length} chars)`
        );
      }
    }


    /* --------------------------------------------------------------------
       Open Graph
       -------------------------------------------------------------------- */

    if (!ogTitle) {
      warnings.push(
        `${path} has no og:title`
      );
    }

    if (!ogDescription) {
      warnings.push(
        `${path} has no og:description`
      );
    }


    /* --------------------------------------------------------------------
       H1
       -------------------------------------------------------------------- */

    if (
      h1s.length === 0
    ) {
      errors.push(
        `${path} has no H1`
      );
    }

    if (
      h1s.length > 1
    ) {
      errors.push(
        `${path} has ${h1s.length} H1 elements`
      );
    }


    /* --------------------------------------------------------------------
       HTML language
       -------------------------------------------------------------------- */

    if (!lang) {
      errors.push(
        `${path} has no html lang attribute`
      );
    }


    /* --------------------------------------------------------------------
       Images
       -------------------------------------------------------------------- */

    for (
      const image of
      images
    ) {
      const hasAlt =
        /\balt\s*=/i.test(
          image
        );

      if (!hasAlt) {
        errors.push(
          `${path} contains an image without alt`
        );
      }
    }


    /* --------------------------------------------------------------------
       Accidental noindex
       -------------------------------------------------------------------- */

    if (
      robots
        .toLowerCase()
        .includes(
          "noindex"
        )
    ) {
      errors.push(
        `${path} is in sitemap but has noindex`
      );
    }
  }


  /* ==========================================================================
     DUPLICATE METADATA
     ========================================================================== */

  for (
    const [
      title,
      pageList,
    ] of titles
  ) {
    if (
      pageList.length > 1
    ) {
      errors.push(
        `Duplicate title "${title}" used by: ${pageList.join(
          ", "
        )}`
      );
    }
  }


  for (
    const [
      description,
      pageList,
    ] of descriptions
  ) {
    if (
      pageList.length > 2
    ) {
      warnings.push(
        `Meta description reused on ${pageList.length} pages: ${pageList.join(
          ", "
        )}`
      );
    }
  }


  /* ==========================================================================
     DASHBOARD NOINDEX
     ========================================================================== */

  console.log(
    "Checking dashboard indexing..."
  );


  const dashboard =
    await fetchPage(
      new URL(
        "/dashboard",
        BASE_URL
      ).toString()
    );


  if (
    dashboard.ok
  ) {
    const dashboardRobots =
      getRobotsMeta(
        dashboard.html
      ).toLowerCase();


    if (
      dashboardRobots.includes(
        "noindex"
      )
    ) {
      console.log(
        `${green}✓ Dashboard correctly uses noindex${reset}`
      );
    } else {
      errors.push(
        "/dashboard should have noindex metadata"
      );
    }
  }


  /* ==========================================================================
     OUTPUT
     ========================================================================== */

  console.log(
    "\n=============================================="
  );

  console.log(
    " CONTENT AUDIT SUMMARY"
  );

  console.log(
    "=============================================="
  );

  console.log(
    `Pages audited:       ${pages.length}`
  );

  console.log(
    `Unique titles:       ${titles.size}`
  );

  console.log(
    `Unique descriptions:${descriptions.size}`
  );

  console.log(
    `Errors:              ${errors.length}`
  );

  console.log(
    `Warnings:            ${warnings.length}`
  );


  /* ------------------------------------------------------------------------
     Errors
     ------------------------------------------------------------------------ */

  if (
    errors.length > 0
  ) {
    console.log(
      `\n${red}ERRORS${reset}`
    );


    errors.forEach(
      (issue) => {
        console.log(
          `${red}✗${reset} ${issue}`
        );
      }
    );
  }


  /* ------------------------------------------------------------------------
     Warnings
     ------------------------------------------------------------------------ */

  if (
    warnings.length > 0
  ) {
    console.log(
      `\n${yellow}WARNINGS${reset}`
    );


    warnings.forEach(
      (issue) => {
        console.log(
          `${yellow}⚠${reset} ${issue}`
        );
      }
    );
  }


  /* ------------------------------------------------------------------------
     Final
     ------------------------------------------------------------------------ */

  if (
    errors.length === 0
  ) {
    console.log(
      `\n${green}✓ Core content/SEO audit passed.${reset}`
    );


    if (
      warnings.length === 0
    ) {
      console.log(
        `${green}No metadata or structural content issues detected.${reset}\n`
      );
    } else {
      console.log(
        `${yellow}Review the warnings before production launch.${reset}\n`
      );
    }
  } else {
    console.log(
      `\n${red}✗ Content audit found issues that should be fixed.${reset}\n`
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