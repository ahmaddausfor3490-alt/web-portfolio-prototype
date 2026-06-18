"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "../context/LanguageContext";
import { projects } from "../data/projects";
import { ExternalLink, Code } from "lucide-react";

export default function Projects() {
  const { t, language } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="projects" ref={ref} className="py-24 md:py-32 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--foreground)] tracking-tight">
            {t.projects.title}
          </h2>
          <p className="text-[var(--muted-foreground)] mt-4 text-base">
            {t.projects.subtitle}
          </p>
          <div className="w-16 h-[2px] bg-[var(--foreground)] mt-6 mx-auto" />
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-5">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: i * 0.12,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
              className="group relative p-7 rounded-2xl border border-[var(--border-color)] bg-[var(--background)] hover:border-[var(--muted-foreground)]/30 transition-all duration-500"
            >
              {/* Project Number */}
              <span className="text-7xl font-bold text-[var(--foreground)]/[0.03] absolute top-4 right-6 select-none group-hover:text-[var(--foreground)]/[0.06] transition-all duration-500">
                {String(i + 1).padStart(2, "0")}
              </span>

              {/* Content */}
              <div className="relative z-10">
                {/* Title */}
                <h3 className="text-xl font-semibold text-[var(--foreground)] mb-3 tracking-tight">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-[var(--muted-foreground)] leading-relaxed mb-5">
                  {project.description[language]}
                </p>

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-[11px] rounded-full border border-[var(--border-color)] text-[var(--muted-foreground)] font-medium tracking-wide uppercase"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action Links */}
                <div className="flex items-center gap-3">
                  <motion.a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--foreground)] text-[var(--background)] text-xs font-semibold hover:opacity-90 transition-opacity tracking-wide uppercase"
                  >
                    <ExternalLink size={13} />
                    {t.projects.viewProject}
                  </motion.a>
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-2.5 rounded-full border border-[var(--border-color)] text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:border-[var(--foreground)] transition-all duration-200"
                    aria-label={`GitHub - ${project.title}`}
                  >
                    <Code size={15} />
                  </motion.a>
                </div>
              </div>

              {/* Hover gradient */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-[var(--card-hover)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
