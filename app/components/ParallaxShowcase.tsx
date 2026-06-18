"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "@studio-freight/lenis";
import { useLanguage } from "../context/LanguageContext";

export default function ParallaxShowcase() {
  const parallaxRef = useRef<HTMLDivElement>(null);
  const { t } = useLanguage();

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const triggerElement = parallaxRef.current?.querySelector(
      "[data-parallax-layers]"
    );

    if (triggerElement) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerElement,
          start: "0% 0%",
          end: "100% 0%",
          scrub: 0,
        },
      });

      const layers = [
        { layer: "1", yPercent: 70 },
        { layer: "2", yPercent: 50 },
        { layer: "3", yPercent: 30 },
        { layer: "4", yPercent: 10 },
      ];

      layers.forEach((layerObj) => {
        tl.to(
          triggerElement.querySelectorAll(
            `[data-parallax-layer="${layerObj.layer}"]`
          ),
          { yPercent: layerObj.yPercent, ease: "none" },
          "<"
        );
      });
    }

    const lenis = new Lenis();
    lenis.on("scroll", ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
      if (triggerElement) gsap.killTweensOf(triggerElement);
      lenis.destroy();
    };
  }, []);

  return (
    <section className="relative overflow-hidden" ref={parallaxRef}>
      {/* Parallax Header — full viewport */}
      <div className="relative h-[80vh] md:h-screen w-full bg-[var(--background)]">
        {/* Black bar overflow mask */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[var(--background)] to-transparent z-20 pointer-events-none" />

        <div
          data-parallax-layers
          className="absolute inset-0 flex items-center justify-center"
        >
          {/* Layer 1 — deepest (slowest) — abstract gradient blobs */}
          <div
            data-parallax-layer="1"
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="absolute w-[600px] h-[600px] md:w-[900px] md:h-[900px] rounded-full bg-gradient-to-br from-neutral-800/20 via-neutral-600/10 to-transparent dark:from-white/5 dark:via-white/[0.02] blur-[120px] animate-pulse" />
            <div className="absolute w-[400px] h-[400px] md:w-[700px] md:h-[700px] rounded-full bg-gradient-to-tr from-amber-500/5 via-purple-500/5 to-transparent dark:from-amber-500/10 dark:via-purple-500/10 blur-[100px] -top-1/4 left-1/4" />
          </div>

          {/* Layer 2 — floating geometric shapes */}
          <div
            data-parallax-layer="2"
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="absolute top-1/4 left-[15%] w-32 h-32 md:w-48 md:h-48 border border-[var(--border-color)] rounded-3xl -rotate-12 opacity-30" />
            <div className="absolute bottom-1/4 right-[20%] w-24 h-24 md:w-36 md:h-36 border border-[var(--border-color)] rounded-full opacity-20" />
            <div className="absolute top-1/3 right-[25%] w-16 h-16 md:w-24 md:h-24 border border-[var(--border-color)] rotate-45 opacity-25" />
            <div className="absolute bottom-1/3 left-[20%] w-20 h-20 md:w-32 md:h-32 border-2 border-[var(--border-color)]/30 rounded-2xl rotate-[30deg] opacity-20" />
          </div>

          {/* Layer 3 — main title */}
          <div
            data-parallax-layer="3"
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <h2 className="text-[clamp(4rem,15vw,12rem)] font-black text-transparent [-webkit-text-stroke:2px_var(--border-color)] dark:[-webkit-text-stroke:2px_rgba(255,255,255,0.1)] leading-none select-none tracking-tighter text-center px-6">
              CREATIVE
            </h2>
          </div>

          {/* Layer 4 — foreground grid lines */}
          <div
            data-parallax-layer="4"
            className="absolute inset-0 flex items-center justify-center pointer-events-none"
          >
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage: `linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)`,
                backgroundSize: "60px 60px",
              }}
            />
          </div>
        </div>
      </div>

      {/* Content section — revealed after parallax */}
      <div className="relative min-h-[50vh] md:min-h-[60vh] flex flex-col items-center justify-center px-6 py-24 bg-[var(--background)] border-t border-[var(--border-color)]">
        <div className="max-w-3xl mx-auto text-center">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[var(--muted)] border border-[var(--border-color)] mb-8">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 160 160"
              fill="none"
              className="text-[var(--foreground)]"
            >
              <path
                d="M94.8284 53.8578C92.3086 56.3776 88 54.593 88 51.0294V0H72V59.9999C72 66.6273 66.6274 71.9999 60 71.9999H0V87.9999H51.0294C54.5931 87.9999 56.3777 92.3085 53.8579 94.8283L18.3431 130.343L29.6569 141.657L65.1717 106.142C67.684 103.63 71.9745 105.396 72 108.939V160L88.0001 160L88 99.9999C88 93.3725 93.3726 87.9999 100 87.9999H160V71.9999H108.939C105.407 71.9745 103.64 67.7091 106.12 65.1938L106.142 65.1716L141.657 29.6568L130.343 18.3432L94.8284 53.8578Z"
                fill="currentColor"
              />
            </svg>
          </div>

          <h3 className="text-4xl md:text-5xl lg:text-6xl font-black text-[var(--foreground)] tracking-tighter uppercase mb-6">
            BUILD SOMETHING
          </h3>
          <p className="text-[var(--muted-foreground)] text-sm md:text-base max-w-xl mx-auto leading-relaxed font-semibold">
            Every great digital experience starts with a single line of code.
            From concept to creation, turning ideas into reality with clean
            architecture and thoughtful design.
          </p>
        </div>
      </div>
    </section>
  );
}
