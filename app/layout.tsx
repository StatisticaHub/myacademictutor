import type { Metadata } from "next";
import { Manrope, Source_Serif_4 } from "next/font/google";

import "./globals.css";

import Header from "@/components/Header";
import Footer from "@/components/Footer";

/* -------------------------------------------------------------------------- */
/*                                   Fonts                                    */
/* -------------------------------------------------------------------------- */

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

/* -------------------------------------------------------------------------- */
/*                                  Metadata                                  */
/* -------------------------------------------------------------------------- */

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ||
      "https://www.myacademictutor.com"
  ),

  title: {
    default:
      "My Academic Tutor | Statistics, Mathematics, Data Science & More",
    template: "%s | My Academic Tutor",
  },

  description:
    "Structured learning, interactive practice and expert tutoring in Statistics, Mathematics, Data Science, Bioinformatics and Computer Science.",

  keywords: [
    "Statistics",
    "Mathematics",
    "Data Science",
    "Bioinformatics",
    "Computer Science",
    "Online Learning",
    "Online Tutoring",
    "Academic Tutor",
    "University Statistics",
    "Data Science Courses",
    "Bioinformatics Courses",
    "Mathematics Courses",
  ],

  authors: [
    {
      name: "My Academic Tutor",
    },
  ],

  creator: "My Academic Tutor",

  publisher: "My Academic Tutor",

  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },

  openGraph: {
    title: "My Academic Tutor",
    description:
      "Master Statistics, Mathematics, Data Science, Bioinformatics and Computer Science through structured learning, interactive practice and expert support.",
    type: "website",
    siteName: "My Academic Tutor",
    url: "https://www.myacademictutor.com",
  },

  twitter: {
    card: "summary_large_image",
    title: "My Academic Tutor",
    description:
      "Structured learning and expert support across quantitative and computational subjects.",
  },

  robots: {
    index: true,
    follow: true,
  },
};

/* -------------------------------------------------------------------------- */
/*                                Root Layout                                 */
/* -------------------------------------------------------------------------- */

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${manrope.variable} ${sourceSerif.variable}`}
    >
      <body>
        <Header />

        <main>{children}</main>

        <Footer />
      </body>
    </html>
  );
}