"use client";

import React from "react";
import LogoLoop from "./LogoLoop";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiPhp,
  SiLaravel,
  SiJavascript,
  SiHtml5,
  SiCss,
  SiPostgresql,
  SiMongodb,
  SiGithub,
  SiFigma,
} from "react-icons/si";

export default function TechMarquee() {
  const techLogos = [
    { node: <SiReact />, title: "React", href: "https://react.dev" },
    { node: <SiNextdotjs />, title: "Next.js", href: "https://nextjs.org" },
    {
      node: <SiTypescript />,
      title: "TypeScript",
      href: "https://www.typescriptlang.org",
    },
    {
      node: <SiTailwindcss />,
      title: "Tailwind CSS",
      href: "https://tailwindcss.com",
    },
    { node: <SiPhp />, title: "PHP", href: "https://www.php.net" },
    { node: <SiLaravel />, title: "Laravel", href: "https://laravel.com" },
    {
      node: <SiJavascript />,
      title: "JavaScript",
      href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
    },
    {
      node: <SiHtml5 />,
      title: "HTML5",
      href: "https://developer.mozilla.org/en-US/docs/Glossary/HTML5",
    },
    {
      node: <SiCss />,
      title: "CSS3",
      href: "https://developer.mozilla.org/en-US/docs/Web/CSS",
    },
    {
      node: <SiPostgresql />,
      title: "PostgreSQL",
      href: "https://www.postgresql.org",
    },
    { node: <SiMongodb />, title: "MongoDB", href: "https://www.mongodb.com" },
    { node: <SiGithub />, title: "GitHub", href: "https://github.com" },
    { node: <SiFigma />, title: "Figma", href: "https://www.figma.com" },
  ];

  return (
    <div className="w-full py-8 border-y border-[var(--border-color)] bg-[var(--muted)]/10 overflow-hidden backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-6 mb-4 flex justify-between items-center text-[10px] font-extrabold uppercase tracking-[0.25em] text-[var(--muted-foreground)]">
        <span>Technologies I Work With</span>
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
      </div>
      <LogoLoop
        logos={techLogos}
        speed={25}
        direction="left"
        logoHeight={32}
        gap={64}
        hoverSpeed={0}
        scaleOnHover={true}
        fadeOut={true}
        fadeOutColor="var(--background)"
        ariaLabel="Technology partners loop"
      />
    </div>
  );
}
