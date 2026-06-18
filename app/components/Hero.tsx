"use client";

import { motion } from "framer-motion";
import { useLanguage } from "../context/LanguageContext";
import { ArrowDown } from "lucide-react";

interface PathConfig {
  id: number;
  d: string;
  color: string;
  width: number;
}

function FloatingPaths({ position }: { position: number }) {
  const paths = Array.from({ length: 36 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
      380 - i * 5 * position
    } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
      152 - i * 5 * position
    } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
      684 - i * 5 * position
    } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
    color: `rgba(15,23,42,${0.1 + i * 0.03})`,
    width: 0.5 + i * 0.03,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none">
      <svg
        className="w-full h-full text-[var(--foreground)] opacity-[0.18] dark:opacity-[0.12]"
        viewBox="0 0 696 316"
        fill="none"
      >
        <title>Background Paths</title>
        {paths.map((path: PathConfig) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke="currentColor"
            strokeWidth={path.width}
            strokeOpacity={0.08 + path.id * 0.018}
            initial={{ pathLength: 0.3, opacity: 0.6 }}
            animate={{
              pathLength: 1,
              opacity: [0.3, 0.6, 0.3],
              pathOffset: [0, 1, 0],
            }}
            transition={{
              duration: 20 + Math.random() * 10,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        ))}
      </svg>
    </div>
  );
}

export default function Hero() {
  const { t } = useLanguage();

  const nameWords = t.hero.name.split(" ");

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[var(--background)]"
    >
      {/* Background Animated Paths */}
      <div className="absolute inset-0 z-0">
        <FloatingPaths position={1} />
        <FloatingPaths position={-1} />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-5xl w-full">
        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-xs md:text-sm tracking-[0.25em] uppercase mb-3 font-semibold text-[var(--muted-foreground)]"
        >
          {t.hero.tagline}
        </motion.p>

        {/* Interactive Animating Name */}
        <h1 className="text-7xl sm:text-8xl md:text-9xl lg:text-[11rem] xl:text-[12rem] font-black tracking-tighter leading-none select-none mb-3">
          {nameWords.map((word: string, wordIndex: number) => (
            <span key={wordIndex} className="inline-block mr-4 last:mr-0 whitespace-nowrap">
              {word.split("").map((letter: string, letterIndex: number) => (
                <motion.span
                  key={`${wordIndex}-${letterIndex}`}
                  initial={{ y: 80, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    delay: 0.2 + wordIndex * 0.1 + letterIndex * 0.03,
                    type: "spring",
                    stiffness: 120,
                    damping: 20,
                  }}
                  className="inline-block text-transparent bg-clip-text bg-gradient-to-b from-[var(--foreground)] to-[var(--muted-foreground)]/80 select-none"
                >
                  {letter}
                </motion.span>
              ))}
            </span>
          ))}
        </h1>

        {/* Role */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="text-xs md:text-sm tracking-[0.2em] uppercase font-semibold text-[var(--foreground)] mt-2"
        >
          {t.hero.role}
        </motion.p>

        {/* Divider line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="h-px w-20 mt-5 origin-center bg-[var(--border-color)]"
        />

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="text-xs md:text-sm max-w-md mt-5 leading-relaxed text-[var(--muted-foreground)] font-semibold"
        >
          {t.hero.description}
        </motion.p>

        {/* Premium CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.1 }}
          className="mt-8"
        >
          <div className="inline-block group relative bg-gradient-to-b from-black/5 to-white/5 dark:from-white/10 dark:to-black/10 p-px rounded-2xl backdrop-blur-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
            <a
              href="#projects"
              className="inline-flex items-center justify-center rounded-[1.15rem] px-8 py-3.5 text-xs font-bold backdrop-blur-md bg-[var(--background)]/90 hover:bg-[var(--background)] text-[var(--foreground)] transition-all duration-300 group-hover:-translate-y-0.5 border border-[var(--border-color)] hover:shadow-sm cursor-pointer"
            >
              <span className="opacity-90 group-hover:opacity-100 transition-opacity uppercase tracking-wider">
                {t.hero.cta}
              </span>
              <span className="ml-2.5 opacity-70 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
                →
              </span>
            </a>
          </div>
        </motion.div>
      </div>

      {/* Location Tag */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.2 }}
        className="absolute right-8 bottom-32 text-[10px] tracking-[0.15em] uppercase font-bold text-[var(--muted-foreground)] hidden sm:block"
      >
        {t.hero.location}
      </motion.p>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{
          opacity: { delay: 1.3, duration: 0.6 },
          y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
        }}
        className="absolute bottom-20 z-10"
      >
        <ArrowDown size={16} className="text-[var(--muted-foreground)]" />
      </motion.div>

      {/* Marquee */}
      <div
        className="absolute bottom-0 left-0 right-0 backdrop-blur-sm py-3 overflow-hidden z-10 border-t border-[var(--border-color)] bg-[var(--background)]/80"
      >
        <div className="animate-marquee flex whitespace-nowrap">
          {[...Array(6)].map((_, i) => (
            <span
              key={i}
              className="text-[10px] tracking-[0.25em] uppercase mx-0 font-bold opacity-50 text-[var(--muted-foreground)]"
            >
              {t.hero.marquee}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
