"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import LanguageToggle from "./LanguageToggle";
import { useLanguage } from "../context/LanguageContext";

const navLinks = [
  { href: "#home", key: "home" },
  { href: "#about", key: "about" },
  { href: "#projects", key: "projects" },
  { href: "#future", key: "future" },
  { href: "#contact", key: "contact" },
] as const;

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [cursorPos, setCursorPos] = useState({ left: 0, width: 0, opacity: 0 });
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const { t } = useLanguage();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleMobileClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileOpen(false);

    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);
    if (element) {
      setTimeout(() => {
        element.scrollIntoView({ behavior: "smooth" });
      }, 150);
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? "backdrop-blur-2xl border-b" : ""
      }`}
      style={{
        backgroundColor: isScrolled ? "var(--nav-bg-scrolled)" : "var(--background)",
        borderColor: "var(--border-color)",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo - Left */}
        <motion.a
          href="#home"
          whileHover={{ scale: 1.05 }}
          className="text-xl font-bold tracking-tight"
          style={{ color: "var(--foreground)" }}
        >
          FIRDAUS
        </motion.a>

        {/* Desktop Navigation - Center (Sliding Cursor) */}
        <ul
          className="hidden md:relative md:flex items-center"
          onMouseLeave={() => {
            setCursorPos((pv) => ({ ...pv, opacity: 0 }));
            setHoveredIdx(null);
          }}
        >
          {navLinks.map((link, i) => (
            <NavTab
              key={link.key}
              href={link.href}
              label={t.nav[link.key]}
              isHovered={hoveredIdx === i}
              onHover={(left, width) => {
                setCursorPos({ left, width, opacity: 1 });
                setHoveredIdx(i);
              }}
            />
          ))}
          <Cursor position={cursorPos} />
        </ul>

        {/* Controls - Right */}
        <div className="flex items-center gap-3">
          {/* Open to Work Badge */}
          <span className="hidden md:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-500 text-xs font-medium border border-emerald-500/20">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            {t.hero.openToWork}
          </span>
          <LanguageToggle />
          <ThemeToggle />
          <button
            className="md:hidden p-2"
            style={{ color: "var(--foreground)" }}
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            aria-label="Toggle menu"
          >
            {isMobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="md:hidden backdrop-blur-2xl border-b overflow-hidden"
            style={{
              backgroundColor: "var(--nav-bg-mobile)",
              borderColor: "var(--border-color)",
            }}
          >
            <div className="px-6 py-6 flex flex-col gap-5">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.key}
                  href={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  className="text-lg text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
                  onClick={(e) => handleMobileClick(e, link.href)}
                >
                  {t.nav[link.key]}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

/* ===== NavTab with ref tracking for cursor ===== */
function NavTab({
  href,
  label,
  isHovered,
  onHover,
}: {
  href: string;
  label: string;
  isHovered: boolean;
  onHover: (left: number, width: number) => void;
}) {
  const ref = useRef<HTMLLIElement>(null);

  return (
    <li
      ref={ref}
      onMouseEnter={() => {
        if (!ref.current) return;
        const { width } = ref.current.getBoundingClientRect();
        onHover(ref.current.offsetLeft, width);
      }}
      className="relative z-10 block cursor-pointer select-none px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors duration-150 md:px-5 md:py-2 md:text-sm"
      style={{
        color: isHovered ? "var(--background)" : "var(--muted-foreground)",
      }}
    >
      <a href={href} className="block">
        {label}
      </a>
    </li>
  );
}

/* ===== Animated sliding cursor pill ===== */
function Cursor({ position }: { position: { left: number; width: number; opacity: number } }) {
  return (
    <motion.li
      animate={{
        left: position.left,
        width: position.width,
        opacity: position.opacity,
      }}
      transition={{ type: "spring", stiffness: 350, damping: 30 }}
      className="absolute top-1/2 -translate-y-1/2 z-0 h-7 rounded-full md:h-9 pointer-events-none"
      style={{
        backgroundColor: "var(--foreground)",
      }}
    />
  );
}