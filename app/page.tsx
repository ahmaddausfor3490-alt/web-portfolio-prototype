"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SplashScreen from "./components/SplashScreen";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import TechMarquee from "./components/TechMarquee";
import About from "./components/About";
import Projects from "./components/Projects";
import FutureProjects from "./components/FutureProjects";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && (
          <SplashScreen onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {!isLoading && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <Navbar />
          <main>
            <Hero />
            <TechMarquee />
            <About />
            <div className="section-divider" />
            <Projects />
            <div className="section-divider" />
            <FutureProjects />
            <div className="section-divider" />
            <Contact />
          </main>
          <Footer />
        </motion.div>
      )}
    </>
  );
}
