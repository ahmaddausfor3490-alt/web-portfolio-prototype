"use client";

import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SplashScreenProps {
  onComplete: () => void;
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [progress, setProgress] = useState(0);
  const [textIndex, setTextIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  const loadingTexts = [
    "INITIALIZING",
    "LOADING COMPONENTS",
    "CRAFTING INTERFACE",
    "READY",
  ];

  // Simulating progress
  useEffect(() => {
    let cancelled = false;
    const timer = setInterval(() => {
      if (cancelled) return;
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          // Wait a brief moment at 100% before triggering exit
          setTimeout(() => {
            if (cancelled) return;
            setIsExiting(true);
            setTimeout(() => onCompleteRef.current(), 800);
          }, 400);
          return 100;
        }
        // Random progress increments for natural feel
        const increment = Math.floor(Math.random() * 12) + 5;
        return Math.min(prev + increment, 100);
      });
    }, 120);

    return () => {
      cancelled = true;
      clearInterval(timer);
    };
  }, []);

  // Cycle loading texts based on progress
  useEffect(() => {
    if (progress < 30) setTextIndex(0);
    else if (progress < 60) setTextIndex(1);
    else if (progress < 90) setTextIndex(2);
    else setTextIndex(3);
  }, [progress]);

  // Disable scroll while loading
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const logoLetters = "FIRDAUS".split("");

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            y: -50,
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
          }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0a0a0a]"
        >
          {/* Subtle Grid Background */}
          <div 
            className="absolute inset-0 opacity-[0.03] pointer-events-none"
            style={{
              backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)`,
              backgroundSize: "40px 40px",
            }}
          />

          {/* Glowing Ambient Light */}
          <motion.div 
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.15, 0.25, 0.15]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute w-[400px] h-[400px] rounded-full bg-gradient-to-br from-white/10 to-transparent blur-[100px] pointer-events-none"
          />

          {/* Logo Animation */}
          <div className="flex gap-2 mb-8 select-none">
            {logoLetters.map((letter, index) => (
              <motion.span
                key={index}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  delay: index * 0.08,
                  type: "spring",
                  stiffness: 150,
                  damping: 15,
                }}
                className="text-4xl md:text-6xl font-black tracking-wider text-transparent bg-clip-text bg-gradient-to-b from-white to-neutral-400"
              >
                {letter}
              </motion.span>
            ))}
          </div>

          {/* Progress Container */}
          <div className="w-48 md:w-64 flex flex-col items-center gap-3">
            {/* Progress Bar Track */}
            <div className="w-full h-[2px] bg-neutral-900 rounded-full overflow-hidden relative">
              {/* Progress Bar Fill */}
              <motion.div 
                className="h-full bg-white rounded-full shadow-[0_0_10px_rgba(255,255,255,0.5)]"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.1, ease: "easeOut" }}
              />
            </div>

            {/* Status & Percentage */}
            <div className="w-full flex justify-between items-center text-[10px] md:text-xs font-semibold tracking-[0.2em] text-neutral-500 uppercase">
              <motion.span 
                key={textIndex}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-neutral-400"
              >
                {loadingTexts[textIndex]}
              </motion.span>
              <span className="text-white/80">{progress}%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
