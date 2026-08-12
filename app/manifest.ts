import type { MetadataRoute } from "next";


/* ==========================================================================
   WEB APP MANIFEST
   ========================================================================== */

export default function manifest(): MetadataRoute.Manifest {
  return {
    name:
      "My Academic Tutor",

    short_name:
      "My Academic Tutor",

    description:
      "Premium learning in Statistics, Mathematics, Data Science, Bioinformatics and Computer Science.",

    start_url:
      "/",

    scope:
      "/",

    display:
      "standalone",

    background_color:
      "#f5f2eb",

    theme_color:
      "#111111",

    orientation:
      "portrait-primary",

    categories: [
      "education",
      "productivity",
    ],

    icons: [
      {
        src: "/logo.png",
        sizes: "any",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}