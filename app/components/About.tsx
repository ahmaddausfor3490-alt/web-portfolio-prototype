"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "../context/LanguageContext";
import { Download, GraduationCap, Building, Terminal, Code, Box, Layers, Settings, FileCode, Wrench } from "lucide-react";
import PhotoCarousel from "./PhotoCarousel";

export default function About() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const techIcons: Record<string, React.ReactNode> = {
    HTML5: <FileCode size={12} />,
    CSS3: <FileCode size={12} />,
    PHP: <Code size={12} />,
    Java: <Code size={12} />,
    JavaScript: <Code size={12} />,
    SQL: <Code size={12} />,
    "Next.js": <Layers size={12} />,
    React: <Box size={12} />,
    Laravel: <Layers size={12} />,
    Tailwind: <Box size={12} />,
    Bootstrap: <Box size={12} />,
    Vite: <Settings size={12} />,
    Notion: <Wrench size={12} />,
    GitHub: <Code size={12} />,
    Figma: <Wrench size={12} />,
    Postman: <Settings size={12} />,
  };

  const categories = [
    {
      title: t.about.techStack.core,
      items: ["HTML5", "CSS3", "PHP", "JavaScript", "SQL"],
    },
    {
      title: t.about.techStack.frameworks,
      items: ["Next.js", "React", "Laravel", "Tailwind"],
    },
    {
      title: t.about.techStack.tools,
      items: ["Vite", "GitHub", "Figma", "Postman"],
    },
  ];

  return (
    <section id="about" ref={ref} className="py-24 md:py-32 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-[var(--foreground)] tracking-tighter uppercase mb-10"
        >
          {t.about.title}
        </motion.h2>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* 1. Top Left Card: Bio */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="md:col-span-2 rounded-[2rem] bg-[var(--muted)]/30 border border-[var(--border-color)] p-8 md:p-12 shadow-sm"
          >
            <div className="w-12 h-12 rounded-full bg-black text-white flex items-center justify-center text-2xl mb-8">
              👋
            </div>
            <h3 className="text-2xl md:text-3xl font-bold mb-6 text-[var(--foreground)] tracking-tight uppercase">
              {t.about.greeting}
            </h3>
            <p className="text-[var(--muted-foreground)] leading-relaxed mb-6 font-medium text-sm md:text-base">
              {t.about.description}
            </p>
            <p className="text-[var(--muted-foreground)] leading-relaxed mb-10 font-medium text-sm md:text-base">
              {t.about.description2}
            </p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-2 hover:opacity-90 transition-opacity w-fit"
              style={{ backgroundColor: "var(--foreground)", color: "var(--background)" }}
            >
              <Download size={14} />
              {t.about.downloadCV}
            </motion.button>
          </motion.div>

          {/* 2. Top Right Card: Photo Carousel */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:col-span-1 rounded-[2rem] bg-[var(--muted)]/50 border border-[var(--border-color)] overflow-hidden relative shadow-sm group min-h-[400px]"
          >
            <div className="absolute inset-0 p-3 md:p-4">
              <PhotoCarousel
                photos={[
                  {
                    src: "/gweh.jpg.jpeg",
                    alt: "Firdaus portrait 1",
                    filter: "none",
                  },
                  {
                    src: "/gweh.jpg.jpeg",
                    alt: "Firdaus portrait 2",
                    filter: "sepia(0.4) hue-rotate(-10deg) contrast(1.1)",
                    overlay:
                      "linear-gradient(135deg, rgba(255,200,100,0.15), transparent 50%)",
                  },
                  {
                    src: "/gweh.jpg.jpeg",
                    alt: "Firdaus portrait 3",
                    filter: "saturate(1.3) contrast(1.2) brightness(0.95)",
                    overlay:
                      "linear-gradient(180deg, rgba(100,180,255,0.12), transparent 50%)",
                  },
                ]}
              />
            </div>
          </motion.div>

          {/* 3. Bottom Left Card: Education */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="md:col-span-1 rounded-[2rem] bg-[var(--muted)]/30 border border-[var(--border-color)] p-8 shadow-sm flex flex-col"
          >
            <div className="flex justify-between items-start mb-10">
              <div className="w-12 h-12 rounded-full border border-[var(--border-color)] flex items-center justify-center" style={{ backgroundColor: "var(--background)" }}>
                <GraduationCap size={20} className="text-[var(--foreground)]" />
              </div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider px-3 py-1.5 rounded-full" style={{ backgroundColor: "var(--foreground)", color: "var(--background)" }}>
                {t.about.education.status}
              </span>
            </div>
            
            <p className="text-[10px] font-bold text-[var(--muted-foreground)] uppercase tracking-wider mb-1 flex items-center gap-1.5">
              <Building size={12} /> {t.about.education.university}
            </p>
            <h4 className="text-xl font-bold mb-6 text-[var(--foreground)] uppercase tracking-tight">
              {t.about.education.major}
            </h4>
            
            <p className="text-[9px] font-bold text-[var(--muted-foreground)] uppercase tracking-widest mb-3">
              {t.about.education.courseworkTitle}
            </p>
            <div className="flex flex-wrap gap-2 mb-10">
              {t.about.education.coursework.map(c => (
                <span key={c} className="text-[10px] font-semibold border border-[var(--border-color)] rounded-md px-2 py-1 text-[var(--muted-foreground)] shadow-sm" style={{ backgroundColor: "var(--background)" }}>
                  {c}
                </span>
              ))}
            </div>

            <div className="flex items-end gap-1.5 border-t border-[var(--border-color)] pt-6 mt-auto">
              <span className="text-4xl md:text-5xl font-black tracking-tighter leading-none">
                {t.about.education.gpa}
              </span>
              <span className="text-xs font-bold text-[var(--muted-foreground)] mb-1 uppercase tracking-wide">
                {t.about.education.gpaMax}
              </span>
            </div>
          </motion.div>

          {/* 4. Bottom Right Card: Tech Stack */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="md:col-span-2 rounded-[2rem] bg-[var(--muted)]/30 border border-[var(--border-color)] p-8 shadow-sm"
          >
            <div className="flex items-center gap-4 mb-8 border-b border-[var(--border-color)] pb-6">
              <div className="w-10 h-10 rounded-2xl flex items-center justify-center" style={{ backgroundColor: "var(--foreground)", color: "var(--background)" }}>
                <Terminal size={18} />
              </div>
              <h3 className="text-xl font-bold uppercase tracking-tight">
                {t.about.techStack.title}
              </h3>
            </div>
            
            <div className="space-y-8">
              {categories.map((category, idx) => (
                <div key={idx}>
                  <p className="text-[10px] font-bold text-[var(--muted-foreground)] uppercase tracking-widest mb-3">
                    {category.title}
                  </p>
                  <div className="flex flex-wrap gap-2.5">
                    {category.items.map(tech => (
                      <div
                        key={tech}
                        className="px-3 py-1.5 text-xs font-bold rounded-lg bg-[var(--border-color)]/30 border border-[var(--border-color)] text-[var(--foreground)] flex items-center gap-2 shadow-sm"
                      >
                        <span className="text-[var(--muted-foreground)]">
                          {techIcons[tech] || <Code size={12} />}
                        </span>
                        {tech}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
