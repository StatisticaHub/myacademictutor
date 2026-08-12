import type { MetadataRoute } from "next";

import {
  countries,
  courses,
  levels,
  pathways,
  subjects,
} from "@/lib/data";


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
   HELPERS
   ========================================================================== */

function url(
  path: string
) {
  return `${siteUrl}${path}`;
}


/* ==========================================================================
   SITEMAP
   ========================================================================== */

export default function sitemap(): MetadataRoute.Sitemap {
  /* ------------------------------------------------------------------------
     Main public pages
     ------------------------------------------------------------------------ */

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: url("/"),
      changeFrequency: "weekly",
      priority: 1,
    },

    {
      url: url("/subjects"),
      changeFrequency: "weekly",
      priority: 0.95,
    },

    {
      url: url("/courses"),
      changeFrequency: "weekly",
      priority: 0.95,
    },

    {
      url: url("/learning"),
      changeFrequency: "weekly",
      priority: 0.9,
    },

    {
      url: url("/pathways"),
      changeFrequency: "weekly",
      priority: 0.9,
    },

    {
      url: url("/labs"),
      changeFrequency: "weekly",
      priority: 0.85,
    },

    {
      url: url("/tutoring"),
      changeFrequency: "weekly",
      priority: 0.9,
    },

    {
      url: url("/resources"),
      changeFrequency: "weekly",
      priority: 0.85,
    },

    {
      url: url("/countries"),
      changeFrequency: "monthly",
      priority: 0.8,
    },

    {
      url: url("/pricing"),
      changeFrequency: "monthly",
      priority: 0.8,
    },

    {
      url: url("/about"),
      changeFrequency: "monthly",
      priority: 0.7,
    },

    {
      url: url("/contact"),
      changeFrequency: "monthly",
      priority: 0.65,
    },

    {
      url: url("/academic-integrity"),
      changeFrequency: "monthly",
      priority: 0.55,
    },

    {
      url: url("/certificate-policy"),
      changeFrequency: "monthly",
      priority: 0.5,
    },

    {
      url: url("/privacy"),
      changeFrequency: "yearly",
      priority: 0.35,
    },

    {
      url: url("/terms"),
      changeFrequency: "yearly",
      priority: 0.35,
    },

    {
      url: url("/cookies"),
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];


  /* ------------------------------------------------------------------------
     Subject pages
     ------------------------------------------------------------------------ */

  const subjectPages: MetadataRoute.Sitemap =
    subjects.map(
      (subject) => ({
        url: url(
          `/subjects/${subject.slug}`
        ),

        changeFrequency:
          "weekly",

        priority: 0.9,
      })
    );


  /* ------------------------------------------------------------------------
     Subject × level pages
     ------------------------------------------------------------------------ */

  const subjectLevelPages: MetadataRoute.Sitemap =
    subjects.flatMap(
      (subject) =>
        levels.map(
          (level) => ({
            url: url(
              `/subjects/${subject.slug}/${level.slug}`
            ),

            changeFrequency:
              "weekly",

            priority: 0.82,
          })
        )
    );


  /* ------------------------------------------------------------------------
     Course pages
     ------------------------------------------------------------------------ */

  const coursePages: MetadataRoute.Sitemap =
    courses.map(
      (course) => ({
        url: url(
          `/courses/${course.slug}`
        ),

        changeFrequency:
          "weekly",

        priority:
          course.featured
            ? 0.9
            : 0.8,
      })
    );


  /* ------------------------------------------------------------------------
     Pathway pages
     ------------------------------------------------------------------------ */

  const pathwayPages: MetadataRoute.Sitemap =
    pathways.map(
      (pathway) => ({
        url: url(
          `/pathways/${pathway.slug}`
        ),

        changeFrequency:
          "weekly",

        priority: 0.82,
      })
    );


  /* ------------------------------------------------------------------------
     Country pages
     ------------------------------------------------------------------------ */

  const countryPages: MetadataRoute.Sitemap =
    countries.map(
      (country) => ({
        url: url(
          `/countries/${country.slug}`
        ),

        changeFrequency:
          "monthly",

        priority: 0.72,
      })
    );


  /* ------------------------------------------------------------------------
     Final sitemap
     ------------------------------------------------------------------------ */

  return [
    ...staticPages,
    ...subjectPages,
    ...subjectLevelPages,
    ...coursePages,
    ...pathwayPages,
    ...countryPages,
  ];
}