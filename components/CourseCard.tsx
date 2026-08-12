import Link from "next/link";
import Icon from "./Icon";
import { Course, subjects, levels } from "@/lib/data";

export default function CourseCard({course}: {course:Course}){
 const sub=subjects.find(s=>s.slug===course.subject);
 const level=levels.find(l=>l.slug===course.level)?.name || course.level;
 return <Link href={`/courses/${course.slug}`} className={`course-card accent-${sub?.accent || "blue"}`}>
   <div className="course-card-top"><span className="course-subject">{sub?.symbol} {sub?.name}</span>{course.featured && <span className="pill">Popular</span>}</div>
   <h3>{course.title}</h3><p>{course.description}</p>
   <div className="course-meta"><span><Icon name="book" size={16}/>{course.lessons} lessons</span><span><Icon name="clock" size={16}/>{course.duration}</span></div>
   <div className="course-card-bottom"><span>{level}</span><span className="circle-arrow"><Icon name="arrow" size={17}/></span></div>
 </Link>
}
