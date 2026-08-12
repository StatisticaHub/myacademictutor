export default function SectionHeading({eyebrow,title,copy,center=false}:{eyebrow?:string;title:string;copy?:string;center?:boolean}){
 return <div className={`section-heading ${center?"center":""}`}>{eyebrow && <span className="eyebrow">{eyebrow}</span>}<h2>{title}</h2>{copy && <p>{copy}</p>}</div>
}
