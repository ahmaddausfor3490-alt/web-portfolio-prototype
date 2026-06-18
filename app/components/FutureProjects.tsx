"use client";

import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "../context/LanguageContext";
import { Brain, Cpu, GraduationCap, GitMerge, Clock } from "lucide-react";
import Image from "next/image";

interface FutureProjectItem {
  year: string;
  title: string;
  desc: string;
  status: string;
  duration: string;
  tech: string[];
  category: string;
}

export default function FutureProjects() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll position of the entire timeline section to grow the active line
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end end"],
  });

  return (
    <section id="future" ref={containerRef} className="py-24 md:py-32 px-6 relative overflow-hidden">
      {/* Subtle background decorative ambient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-neutral-200/10 dark:bg-neutral-900/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative">
        {/* Title */}
        <div className="text-center mb-20 md:mb-28">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-[10px] tracking-[0.3em] uppercase mb-3 font-extrabold text-[var(--muted-foreground)]"
          >
            Roadmap
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-black text-[var(--foreground)] tracking-tighter uppercase mb-4"
          >
            {t.futureProjects.title}
          </motion.h2>
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="h-px w-20 bg-[var(--border-color)] mx-auto mb-6"
          />
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-xs md:text-sm max-w-lg mx-auto text-[var(--muted-foreground)] font-semibold leading-relaxed uppercase tracking-wider"
          >
            {t.futureProjects.subtitle}
          </motion.p>
        </div>

        {/* Timeline Layout */}
        <div className="relative mt-12 md:mt-20">
          
          {/* Base Timeline Line (Inactive Grey) */}
          <div className="absolute top-0 bottom-0 left-4 md:left-8 lg:left-1/2 lg:-translate-x-1/2 w-0.5 bg-[var(--border-color)]/60" />
          
          {/* Active Timeline Line (Filled on Scroll) */}
          <motion.div
            style={{ scaleY: scrollYProgress }}
            className="absolute top-0 bottom-0 left-4 md:left-8 lg:left-1/2 lg:-translate-x-1/2 w-0.5 bg-[var(--foreground)] origin-top z-0"
          />

          {/* Timeline Items List */}
          <div className="space-y-20 lg:space-y-32">
            {t.futureProjects.items.map((item: FutureProjectItem, index: number) => (
              <TimelineItem key={item.year} item={item} index={index} t={t} />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

interface TimelineItemProps {
  item: FutureProjectItem;
  index: number;
  t: any;
}

function TimelineItem({ item, index, t }: TimelineItemProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  // Triggers fade-in / node activate when 20% of item enters viewport
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  // Parallax scroll calculation for background year
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const yParallax = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  const icons = {
    ai: <Brain className="w-5 h-5 text-neutral-800 dark:text-neutral-200" />,
    agents: <GitMerge className="w-5 h-5 text-neutral-800 dark:text-neutral-200" />,
    learning: <GraduationCap className="w-5 h-5 text-neutral-800 dark:text-neutral-200" />,
    os: <Cpu className="w-5 h-5 text-neutral-800 dark:text-neutral-200" />,
  };

  const isEven = index % 2 === 0;

  return (
    <div
      ref={ref}
      className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-24 items-center min-h-[280px]"
    >
      {/* Timeline Bullet Node */}
      <div className="absolute left-4 md:left-8 lg:left-1/2 lg:-translate-x-1/2 z-10 flex items-center justify-center">
        <motion.div
          animate={isInView ? {
            scale: 1,
            backgroundColor: "var(--foreground)",
            borderColor: "var(--foreground)",
            boxShadow: "0 0 15px var(--foreground)",
          } : {
            scale: 0.8,
            backgroundColor: "var(--background)",
            borderColor: "var(--border-color)",
            boxShadow: "none",
          }}
          transition={{ duration: 0.4 }}
          className="w-4 h-4 rounded-full border-2 bg-[var(--background)]"
        />
      </div>

      {/* Left Column (Card on Even, Year/Icon on Odd) */}
      <div className={`
        pl-12 md:pl-20 lg:pl-0
        ${isEven ? "lg:text-right order-2 lg:order-1" : "order-1 lg:order-1 lg:flex lg:justify-end"}
      `}>
        {isEven ? (
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:ml-auto max-w-xl text-left"
          >
            <ProjectCard item={item} t={t} />
          </motion.div>
        ) : (
          <motion.div
            style={{ y: yParallax }}
            className="flex flex-row-reverse lg:flex-row items-center gap-4 lg:gap-6 justify-end pointer-events-none"
          >
            <div className="text-right">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-[var(--muted-foreground)]">
                {t.futureProjects.duration}
              </span>
              <p className="text-xs md:text-sm font-bold text-[var(--foreground)] uppercase mt-0.5">
                {item.duration}
              </p>
            </div>
            <div className="relative flex items-center justify-center">
              <span className="text-7xl md:text-8xl font-black text-transparent [-webkit-text-stroke:1px_var(--border-color)] dark:[-webkit-text-stroke:1px_rgba(255,255,255,0.15)] leading-none select-none">
                {item.year}
              </span>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-2xl bg-[var(--muted)]/80 border border-[var(--border-color)] flex items-center justify-center shadow-sm">
                {icons[item.category as keyof typeof icons] || <Brain className="w-5 h-5" />}
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Right Column (Year/Icon on Even, Card on Odd) */}
      <div className={`
        pl-12 md:pl-20 lg:pl-0
        ${isEven ? "order-1 lg:order-2 lg:flex lg:justify-start" : "order-2 lg:order-2"}
      `}>
        {isEven ? (
          <motion.div
            style={{ y: yParallax }}
            className="flex items-center gap-4 lg:gap-6 justify-start pointer-events-none"
          >
            <div className="relative flex items-center justify-center">
              <span className="text-7xl md:text-8xl font-black text-transparent [-webkit-text-stroke:1px_var(--border-color)] dark:[-webkit-text-stroke:1px_rgba(255,255,255,0.15)] leading-none select-none">
                {item.year}
              </span>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-2xl bg-[var(--muted)]/80 border border-[var(--border-color)] flex items-center justify-center shadow-sm">
                {icons[item.category as keyof typeof icons] || <Brain className="w-5 h-5" />}
              </div>
            </div>
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-[var(--muted-foreground)]">
                {t.futureProjects.duration}
              </span>
              <p className="text-xs md:text-sm font-bold text-[var(--foreground)] uppercase mt-0.5">
                {item.duration}
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-xl text-left"
          >
            <ProjectCard item={item} t={t} />
          </motion.div>
        )}
      </div>
    </div>
  );
}

function ProjectCard({ item, t }: { item: FutureProjectItem; t: any }) {
  const statusColors: Record<string, string> = {
    idea: "bg-neutral-400",
    planning: "bg-amber-400",
    research: "bg-sky-400",
    development: "bg-emerald-400",
    launch: "bg-indigo-400",
  };

  const statusKey = item.status;
  const statusLabel = t.futureProjects.statuses[statusKey] || item.status;

  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.015 }}
      className="p-6 md:p-8 rounded-[1.8rem] bg-[var(--muted)]/20 hover:bg-[var(--muted)]/40 border border-[var(--border-color)] hover:border-[var(--foreground)]/20 shadow-sm hover:shadow-[0_20px_50px_rgba(0,0,0,0.04)] dark:hover:shadow-[0_20px_50px_rgba(255,255,255,0.01)] transition-all duration-500 relative overflow-hidden group"
    >
      {/* Top Meta info row */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--foreground)]/5 text-[var(--foreground)] text-[10px] font-extrabold uppercase tracking-wider border border-[var(--border-color)]">
          <span className={`w-1.5 h-1.5 rounded-full ${statusColors[statusKey] || "bg-neutral-400"}`} />
          {statusLabel}
        </span>
        
        <span className="text-[10px] font-extrabold text-[var(--muted-foreground)] uppercase tracking-wider flex items-center gap-1">
          <Clock size={12} />
          {item.duration}
        </span>
      </div>

      {/* Project Title */}
      <h3 className="text-xl md:text-2xl font-black mb-3 text-[var(--foreground)] tracking-tight uppercase transition-colors duration-300">
        {item.title}
      </h3>

      {/* Description */}
      <p className="text-xs md:text-sm text-[var(--muted-foreground)] leading-relaxed mb-6 font-semibold">
        {item.desc}
      </p>

      {/* Subtle border line inside card */}
      <div className="h-px bg-[var(--border-color)] w-full mb-5" />

      {/* Technologies stack */}
      <div>
        <p className="text-[9px] font-bold text-[var(--muted-foreground)] uppercase tracking-widest mb-3">
          {t.futureProjects.techLabel}
        </p>
        <div className="flex flex-wrap gap-2">
          {item.tech.map((tech) => (
            <span
              key={tech}
              className="text-[10px] font-bold border border-[var(--border-color)] rounded-md px-2.5 py-1 text-[var(--muted-foreground)] bg-[var(--background)] shadow-sm group-hover:border-[var(--border-color)]/80 transition-colors"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
