import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://www.myacademictutor.com"),
  title: { default: "My Academic Tutor | Learn Quantitative Subjects Better", template: "%s | My Academic Tutor" },
  description: "Premium structured learning and expert tutoring in Statistics, Mathematics, Data Science, Bioinformatics and Computer Science.",
  icons: { icon: "/logo.png" },
  openGraph: { title:"My Academic Tutor", description:"Structured learning, interactive understanding and expert academic support.", type:"website" }
};

export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body><Header/>{children}<Footer/></body></html>}
