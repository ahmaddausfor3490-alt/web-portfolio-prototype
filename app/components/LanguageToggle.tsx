"use client";

import { useLanguage } from "../context/LanguageContext";
import { motion } from "framer-motion";

export default function LanguageToggle() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={toggleLanguage}
      className="px-3 py-1.5 rounded-full border border-[var(--border-color)] text-xs font-semibold tracking-wider text-[var(--foreground)] hover:bg-[var(--muted)] transition-colors duration-200 uppercase"
    >
      {language === "en" ? "ID" : "EN"}
    </motion.button>
  );
}