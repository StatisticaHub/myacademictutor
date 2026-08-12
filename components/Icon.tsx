import React from "react";

type Props = { name:string; size?:number; className?:string };

export default function Icon({name,size=20,className=""}:Props){
  const common={width:size,height:size,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:1.8,strokeLinecap:"round" as const,strokeLinejoin:"round" as const,className,"aria-hidden":true};
  const paths:Record<string,React.ReactNode>={
    arrow:<><path d="M5 12h14"/><path d="m13 6 6 6-6 6"/></>,
    search:<><circle cx="11" cy="11" r="7"/><path d="m20 20-3.6-3.6"/></>,
    chevron:<path d="m9 18 6-6-6-6"/>,
    menu:<><path d="M4 7h16"/><path d="M4 12h16"/><path d="M4 17h16"/></>,
    close:<><path d="m6 6 12 12"/><path d="m18 6-12 12"/></>,
    spark:<><path d="m12 3 1.2 4.1L17 9l-3.8 1.9L12 15l-1.2-4.1L7 9l3.8-1.9L12 3Z"/><path d="m19 14 .7 2.3L22 17l-2.3.7L19 20l-.7-2.3L16 17l2.3-.7L19 14Z"/></>,
    play:<><circle cx="12" cy="12" r="9"/><path d="m10 8 6 4-6 4V8Z"/></>,
    check:<path d="m5 12 4 4L19 6"/>,
    globe:<><circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a15 15 0 0 1 0 18"/><path d="M12 3a15 15 0 0 0 0 18"/></>,
    book:<><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H11v16H6.5A2.5 2.5 0 0 0 4 21.5v-16Z"/><path d="M20 5.5A2.5 2.5 0 0 0 17.5 3H13v16h4.5a2.5 2.5 0 0 1 2.5 2.5v-16Z"/></>,
    code:<><path d="m8 9-3 3 3 3"/><path d="m16 9 3 3-3 3"/><path d="m14 6-4 12"/></>,
    users:<><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></>,
    clock:<><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
    chart:<><path d="M4 20V10"/><path d="M10 20V4"/><path d="M16 20v-7"/><path d="M22 20H2"/></>,
    target:<><circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="3"/><path d="M12 4V2"/><path d="M20 12h2"/></>,
    mail:<><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></>,
    location:<><path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2"/></>
  };
  return <svg {...common}>{paths[name] || paths.arrow}</svg>;
}
