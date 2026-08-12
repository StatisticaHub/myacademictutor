"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Icon from "./Icon";
import { subjects, levels } from "@/lib/data";

export default function Header(){
  const [menu,setMenu]=useState(false);
  const [subjectsOpen,setSubjectsOpen]=useState(false);
  return <>
    <header className="site-header">
      <div className="shell header-inner">
        <Link href="/" className="brand" aria-label="My Academic Tutor home">
          <Image src="/logo.png" alt="My Academic Tutor" width={52} height={52} priority className="brand-logo" />
          <span className="brand-wordmark"><b>My Academic</b><span>Tutor</span></span>
        </Link>
        <nav className="desktop-nav" aria-label="Main navigation">
          <div className="nav-drop" onMouseEnter={()=>setSubjectsOpen(true)} onMouseLeave={()=>setSubjectsOpen(false)}>
            <button onClick={()=>setSubjectsOpen(!subjectsOpen)}>Subjects <span>⌄</span></button>
            {subjectsOpen && <div className="mega-menu">
              <div className="mega-intro"><span className="eyebrow">Explore by subject</span><h3>Five disciplines.<br/>One learning ecosystem.</h3><p>Build foundations, master university modules or develop practical career skills.</p><Link href="/subjects" className="text-link">View all subjects <Icon name="arrow" size={16}/></Link></div>
              <div className="mega-subjects">
                {subjects.map(s=><Link href={`/subjects/${s.slug}`} key={s.slug} className={`mega-subject ${s.accent}`}><span className="subject-symbol">{s.symbol}</span><span><b>{s.name}</b><small>{s.short}</small></span><Icon name="chevron" size={17}/></Link>)}
              </div>
            </div>}
          </div>
          <Link href="/learning">Learning Paths</Link>
          <Link href="/courses">Courses</Link>
          <Link href="/labs">Interactive Labs</Link>
          <Link href="/tutoring">Tutoring</Link>
          <Link href="/resources">Resources</Link>
        </nav>
        <div className="header-actions">
          <Link href="/search" className="icon-button" aria-label="Search"><Icon name="search"/></Link>
          <Link href="/dashboard" className="signin-link">Sign in</Link>
          <Link href="/learning" className="button button-small">Start learning</Link>
          <button className="mobile-menu-button" aria-label="Open menu" onClick={()=>setMenu(!menu)}><Icon name={menu?"close":"menu"}/></button>
        </div>
      </div>
    </header>
    {menu && <div className="mobile-panel">
      <div className="shell mobile-panel-inner">
        <div className="mobile-panel-group"><span>Subjects</span>{subjects.map(s=><Link onClick={()=>setMenu(false)} href={`/subjects/${s.slug}`} key={s.slug}>{s.name}</Link>)}</div>
        <div className="mobile-panel-group"><span>Learning</span>{levels.map(l=><Link onClick={()=>setMenu(false)} href={`/learning?level=${l.slug}`} key={l.slug}>{l.name}</Link>)}<Link href="/courses">All courses</Link><Link href="/pathways">Career pathways</Link></div>
        <div className="mobile-panel-group"><span>More</span><Link href="/labs">Interactive Labs</Link><Link href="/tutoring">Tutoring</Link><Link href="/resources">Resources</Link><Link href="/about">About</Link></div>
      </div>
    </div>}
  </>
}
