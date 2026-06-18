"use client";

import React from "react";

export interface LogoItem {
  node?: React.ReactNode;
  src?: string;
  alt?: string;
  title: string;
  href?: string;
}

export interface LogoLoopProps {
  logos: LogoItem[];
  speed?: number; // Duration of one full loop in seconds
  direction?: "left" | "right" | "up" | "down";
  logoHeight?: number;
  gap?: number;
  hoverSpeed?: number; // Set to 0 to pause on hover
  scaleOnHover?: boolean;
  fadeOut?: boolean;
  fadeOutColor?: string; // e.g. "var(--background)" to support dark mode automatically
  ariaLabel?: string;
  useCustomRender?: boolean;
}

export default function LogoLoop({
  logos,
  speed = 40,
  direction = "left",
  logoHeight = 40,
  gap = 48,
  hoverSpeed = 0,
  scaleOnHover = true,
  fadeOut = true,
  fadeOutColor = "var(--background)",
  ariaLabel = "Technologies marquee",
  useCustomRender = false,
}: LogoLoopProps) {
  // Triple the array to ensure seamless infinite looping
  const repeatedLogos = [...logos, ...logos, ...logos];

  const isVertical = direction === "up" || direction === "down";

  // CSS variables for inline parameters
  const containerStyle: React.CSSProperties = {
    "--loop-speed": `${speed}s`,
    "--loop-gap": `${gap}px`,
    "--logo-height": `${logoHeight}px`,
  } as React.CSSProperties;

  // Determine animation class
  let animationClass = "animate-loop-left";
  if (direction === "right") animationClass = "animate-loop-right";
  if (direction === "up") animationClass = "animate-loop-up";
  if (direction === "down") animationClass = "animate-loop-down";

  return (
    <div
      style={containerStyle}
      className={`relative w-full overflow-hidden ${
        isVertical ? "h-full flex flex-col justify-center" : "py-4 flex items-center"
      }`}
      aria-label={ariaLabel}
    >
      {/* Edge Fade Out Overlays */}
      {fadeOut && (
        <>
          {isVertical ? (
            <>
              <div
                className="absolute top-0 left-0 right-0 h-16 z-10 pointer-events-none"
                style={{
                  background: `linear-gradient(to bottom, ${fadeOutColor}, transparent)`,
                }}
              />
              <div
                className="absolute bottom-0 left-0 right-0 h-16 z-10 pointer-events-none"
                style={{
                  background: `linear-gradient(to top, ${fadeOutColor}, transparent)`,
                }}
              />
            </>
          ) : (
            <>
              <div
                className="absolute top-0 bottom-0 left-0 w-24 z-10 pointer-events-none"
                style={{
                  background: `linear-gradient(to right, ${fadeOutColor}, transparent)`,
                }}
              />
              <div
                className="absolute top-0 bottom-0 right-0 w-24 z-10 pointer-events-none"
                style={{
                  background: `linear-gradient(to left, ${fadeOutColor}, transparent)`,
                }}
              />
            </>
          )}
        </>
      )}

      {/* Loop Track */}
      <div
        className={`flex ${isVertical ? "flex-col animate-track-vertical" : "flex-row w-max animate-track-horizontal"} ${
          hoverSpeed === 0 ? "hover:[animation-play-state:paused]" : ""
        } ${animationClass}`}
        style={{
          gap: "var(--loop-gap)",
        }}
      >
        {repeatedLogos.map((logo, index) => {
          const content = (
            <div
              className={`flex items-center justify-center transition-all duration-300 ${
                scaleOnHover ? "hover:scale-110" : ""
              }`}
              style={{ height: "var(--logo-height)" }}
              title={logo.title}
            >
              {logo.node ? (
                <div className="text-3xl md:text-4xl text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors">
                  {logo.node}
                </div>
              ) : logo.src ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={logo.src}
                  alt={logo.alt || logo.title}
                  className="h-full object-contain filter grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300"
                />
              ) : (
                <span className="text-sm font-semibold tracking-wider">{logo.title}</span>
              )}
            </div>
          );

          return logo.href ? (
            <a
              key={index}
              href={logo.href}
              target="_blank"
              rel="noopener noreferrer"
              className="focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--foreground)] rounded-lg"
            >
              {content}
            </a>
          ) : (
            <div key={index}>{content}</div>
          );
        })}
      </div>

      {/* CSS Keyframes injected into layout via style tag to avoid complex tailwind setup */}
      <style jsx global>{`
        @keyframes loopLeft {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-33.333%);
          }
        }
        @keyframes loopRight {
          0% {
            transform: translateX(-33.333%);
          }
          100% {
            transform: translateX(0);
          }
        }
        @keyframes loopUp {
          0% {
            transform: translateY(0);
          }
          100% {
            transform: translateY(-33.333%);
          }
        }
        @keyframes loopDown {
          0% {
            transform: translateY(-33.333%);
          }
          100% {
            transform: translateY(0);
          }
        }

        .animate-loop-left {
          animation: loopLeft var(--loop-speed) linear infinite;
        }
        .animate-loop-right {
          animation: loopRight var(--loop-speed) linear infinite;
        }
        .animate-loop-up {
          animation: loopUp var(--loop-speed) linear infinite;
        }
        .animate-loop-down {
          animation: loopDown var(--loop-speed) linear infinite;
        }
      `}</style>
    </div>
  );
}
