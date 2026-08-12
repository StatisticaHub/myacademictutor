import Image from "next/image";
import Link from "next/link";
import { subjects } from "@/lib/data";

export default function Footer(){
 return <footer className="footer">
   <div className="shell footer-main">
    <div className="footer-brand"><Image src="/logo.png" alt="My Academic Tutor" width={62} height={62}/><div><strong>My Academic Tutor</strong><p>Structured quantitative learning, interactive understanding and expert academic support.</p></div></div>
    <div className="footer-col"><h4>Subjects</h4>{subjects.map(s=><Link key={s.slug} href={`/subjects/${s.slug}`}>{s.name}</Link>)}</div>
    <div className="footer-col"><h4>Learn</h4><Link href="/learning">Learning paths</Link><Link href="/courses">Courses</Link><Link href="/labs">Interactive labs</Link><Link href="/resources">Resources</Link><Link href="/tutoring">Tutoring</Link></div>
    <div className="footer-col"><h4>Company</h4><Link href="/about">About</Link><Link href="/pricing">Pricing</Link><Link href="/contact">Contact</Link><Link href="/countries">Countries</Link><Link href="/dashboard">Learner dashboard</Link></div>
   </div>
   <div className="shell footer-bottom"><span>© {new Date().getFullYear()} My Academic Tutor. All rights reserved.</span><div><Link href="/academic-integrity">Academic integrity</Link><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link></div></div>
 </footer>
}
