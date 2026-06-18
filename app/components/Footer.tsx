"use client";

import { useLanguage } from "../context/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="py-8 px-6 border-t border-[var(--border-color)]">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-xs text-[var(--muted-foreground)] tracking-wide">
          &copy; {new Date().getFullYear()} Firdaus. {t.footer.rights}
        </p>
        <p className="text-xs text-[var(--muted-foreground)]/50 tracking-wide">
          Built with Next.js &amp; Framer Motion
        </p>
      </div>
    </footer>
  );
}
