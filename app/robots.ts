import type { MetadataRoute } from "next";


/* ==========================================================================
   SITE URL
   ========================================================================== */

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(
    /\/$/,
    ""
  ) ||
  "https://www.myacademictutor.com";


/* ==========================================================================
   ROBOTS
   ========================================================================== */

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",

        allow: "/",

        disallow: [
          "/api/",
          "/dashboard",
          "/search",
        ],
      },
    ],

    sitemap:
      `${siteUrl}/sitemap.xml`,

    host:
      siteUrl,
  };
}