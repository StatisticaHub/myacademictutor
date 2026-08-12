"use client";
import { useMemo, useState } from "react";
import Link from "next/link";
import { subjects, levels } from "@/lib/data";
import Icon from "./Icon";

const goals=["Understand a subject","Pass an exam","Improve my grades","Learn a new skill","Complete a project","Research or dissertation"];
export default function PathFinder(){
 const [subject,setSubject]=useState("statistics"); const [level,setLevel]=useState("undergraduate"); const [goal,setGoal]=useState(goals[0]);
 const selected=useMemo(()=>subjects.find(s=>s.slug===subject),[subject]);
 return <div className="pathfinder-card">
  <div className="pathfinder-head"><div><span className="eyebrow light">Personalised learning</span><h2>Find your best starting point.</h2></div><span className="pathfinder-badge"><Icon name="spark" size={17}/> 30 seconds</span></div>
  <div className="pathfinder-grid">
   <label><span>01 · Subject</span><select value={subject} onChange={e=>setSubject(e.target.value)}>{subjects.map(s=><option value={s.slug} key={s.slug}>{s.name}</option>)}</select></label>
   <label><span>02 · Level</span><select value={level} onChange={e=>setLevel(e.target.value)}>{levels.map(l=><option value={l.slug} key={l.slug}>{l.name}</option>)}</select></label>
   <label><span>03 · Goal</span><select value={goal} onChange={e=>setGoal(e.target.value)}>{goals.map(g=><option key={g}>{g}</option>)}</select></label>
   <Link className="button button-white pathfinder-button" href={`/subjects/${subject}/${level}`}>Build my path <Icon name="arrow" size={18}/></Link>
  </div>
  <div className="pathfinder-result"><span className={`mini-symbol ${selected?.accent}`}>{selected?.symbol}</span><p><b>Recommended:</b> start with the {selected?.name} pathway for {levels.find(l=>l.slug===level)?.name.toLowerCase()}, then adapt around your goal: <em>{goal.toLowerCase()}</em>.</p></div>
 </div>
}
