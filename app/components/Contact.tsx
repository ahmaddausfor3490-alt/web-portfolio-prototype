"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { Send, Mail } from "lucide-react";

const GithubIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.03c3.15-.38 6.5-1.4 6.5-7.17A5.05 5.05 0 0 0 19 5.25a4.9 4.9 0 0 0-.5-3.05s-1.1-.35-3.5 1.3A11.75 11.75 0 0 0 12 3c-1.3.02-2.6.24-3.8.65C5.8 1.85 4.7 2.2 4.7 2.2a4.9 4.9 0 0 0-.5 3.05A5.05 5.05 0 0 0 2.5 7.8c0 5.76 3.35 6.79 6.5 7.17A4.8 4.8 0 0 0 8 18v4"></path>
  </svg>
);

const InstagramIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
  </svg>
);

const LinkedinIcon = ({ size = 24, className = "" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect width="4" height="12" x="2" y="9"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

const socials = [
  { icon: GithubIcon, href: "https://github.com/ahmaddausfor3490-alt", label: "GitHub" },
  { icon: LinkedinIcon, href: "https://www.linkedin.com/in/ahmad-firdaus-60a8bb390/", label: "LinkedIn" },
  { icon: InstagramIcon, href: "https://instagram.com/firdauskiee7", label: "Instagram" },
  { icon: Mail, href: "ahmaddausfor3490@gmail.com", label: "Email" },
];

export default function Contact() {
  const { t } = useLanguage();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert(t.contact.success);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" ref={ref} className="py-24 md:py-32 px-6">
      <div className="max-w-3xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--foreground)] tracking-tight">
            {t.contact.title}
          </h2>
          <p className="text-[var(--muted-foreground)] mt-4 text-base">
            {t.contact.subtitle}
          </p>
          <div className="w-16 h-[2px] bg-[var(--foreground)] mt-6 mx-auto" />
        </motion.div>

        {/* Contact Form */}
        <motion.form
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          onSubmit={handleSubmit}
          className="space-y-5"
        >
          <div className="grid md:grid-cols-2 gap-5">
            <input
              type="text"
              placeholder={t.contact.name}
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              required
              className="w-full px-5 py-4 rounded-xl bg-[var(--muted)] border border-[var(--border-color)] text-[var(--foreground)] text-sm placeholder:text-[var(--muted-foreground)]/50 focus:outline-none focus:border-[var(--foreground)] transition-colors duration-300"
            />
            <input
              type="email"
              placeholder={t.contact.email}
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
              required
              className="w-full px-5 py-4 rounded-xl bg-[var(--muted)] border border-[var(--border-color)] text-[var(--foreground)] text-sm placeholder:text-[var(--muted-foreground)]/50 focus:outline-none focus:border-[var(--foreground)] transition-colors duration-300"
            />
          </div>

          <textarea
            placeholder={t.contact.message}
            value={formData.message}
            onChange={(e) =>
              setFormData({ ...formData, message: e.target.value })
            }
            required
            rows={6}
            className="w-full px-5 py-4 rounded-xl bg-[var(--muted)] border border-[var(--border-color)] text-[var(--foreground)] text-sm placeholder:text-[var(--muted-foreground)]/50 focus:outline-none focus:border-[var(--foreground)] transition-colors duration-300 resize-none"
          />

          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full md:w-auto px-10 py-4 rounded-full bg-[var(--foreground)] text-[var(--background)] text-sm font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity duration-200 tracking-wide"
          >
            <Send size={15} />
            {t.contact.send}
          </motion.button>
        </motion.form>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex items-center justify-center gap-4 mt-16"
        >
          {socials.map((social) => (
            <motion.a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.1, y: -3 }}
              whileTap={{ scale: 0.9 }}
              className="p-3 rounded-full border border-[var(--border-color)] text-[var(--muted-foreground)] hover:text-[var(--foreground)] hover:border-[var(--foreground)] transition-all duration-200"
              aria-label={social.label}
            >
              <social.icon size={18} />
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
