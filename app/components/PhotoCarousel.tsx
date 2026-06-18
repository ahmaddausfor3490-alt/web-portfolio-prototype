"use client";

import React, {
  useEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
} from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface PhotoSlide {
  src: string;
  alt: string;
  filter?: string; // CSS filter for visual variety
  overlay?: string; // gradient overlay for variety
}

interface PhotoCarouselProps {
  photos: PhotoSlide[];
  autoplay?: boolean;
}

function calculateGap(width: number) {
  const minWidth = 320;
  const maxWidth = 600;
  const minGap = 40;
  const maxGap = 70;
  if (width <= minWidth) return minGap;
  if (width >= maxWidth) return maxGap;
  return minGap + (maxGap - minGap) * ((width - minWidth) / (maxWidth - minWidth));
}

export default function PhotoCarousel({
  photos,
  autoplay = true,
}: PhotoCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredArrow, setHoveredArrow] = useState<"prev" | "next" | null>(null);
  const [containerWidth, setContainerWidth] = useState(500);

  const imageContainerRef = useRef<HTMLDivElement>(null);
  const autoplayRef = useRef<NodeJS.Timeout | null>(null);

  const photosLength = useMemo(() => photos.length, [photos]);
  const activePhoto = useMemo(
    () => photos[activeIndex],
    [activeIndex, photos]
  );

  // Responsive gap
  useEffect(() => {
    function handleResize() {
      if (imageContainerRef.current) {
        setContainerWidth(imageContainerRef.current.offsetWidth);
      }
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Autoplay
  useEffect(() => {
    if (autoplay) {
      autoplayRef.current = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % photosLength);
      }, 4500);
    }
    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, [autoplay, photosLength]);

  // Keyboard nav
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
    // eslint-disable-next-line
  }, [activeIndex, photosLength]);

  const goNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % photosLength);
    if (autoplayRef.current) clearInterval(autoplayRef.current);
  }, [photosLength]);

  const goPrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + photosLength) % photosLength);
    if (autoplayRef.current) clearInterval(autoplayRef.current);
  }, [photosLength]);

  function getImageStyle(index: number): React.CSSProperties {
    const gap = calculateGap(containerWidth);
    const maxStickUp = gap * 0.7;
    const isActive = index === activeIndex;
    const isLeft = (activeIndex - 1 + photosLength) % photosLength === index;
    const isRight = (activeIndex + 1) % photosLength === index;

    if (isActive) {
      return {
        zIndex: 3,
        opacity: 1,
        pointerEvents: "auto" as const,
        transform: `translateX(0px) translateY(0px) scale(1) rotateY(0deg)`,
        transition: "all 0.7s cubic-bezier(.4,2,.3,1)",
      };
    }
    if (isLeft) {
      return {
        zIndex: 2,
        opacity: 0.6,
        pointerEvents: "auto" as const,
        transform: `translateX(-${gap}px) translateY(-${maxStickUp}px) scale(0.8) rotateY(18deg)`,
        transition: "all 0.7s cubic-bezier(.4,2,.3,1)",
      };
    }
    if (isRight) {
      return {
        zIndex: 2,
        opacity: 0.6,
        pointerEvents: "auto" as const,
        transform: `translateX(${gap}px) translateY(-${maxStickUp}px) scale(0.8) rotateY(-18deg)`,
        transition: "all 0.7s cubic-bezier(.4,2,.3,1)",
      };
    }
    return {
      zIndex: 1,
      opacity: 0,
      pointerEvents: "none" as const,
      transition: "all 0.5s cubic-bezier(.4,2,.3,1)",
    };
  }

  return (
    <div className="relative flex flex-col h-full">
      {/* Images Carousel */}
      <div
        ref={imageContainerRef}
        className="relative w-full aspect-[4/5]"
        style={{ perspective: "1000px" }}
      >
        {photos.map((photo, index) => (
          <div
            key={index}
            className="absolute inset-0 rounded-[2rem] overflow-hidden"
            style={getImageStyle(index)}
          >
            <Image
              src={photo.src}
              alt={photo.alt}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover object-top"
              style={{ filter: photo.filter || "none" }}
              priority={index === activeIndex}
            />
            {/* Gradient overlay for visual variety */}
            {photo.overlay && (
              <div
                className="absolute inset-0 pointer-events-none"
                style={{ background: photo.overlay }}
              />
            )}
            {/* Noise texture */}
            <div
              className="absolute inset-0 opacity-[0.03] pointer-events-none"
              style={{
                backgroundImage:
                  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")",
              }}
            />
            {/* Index indicator */}
            <div className="absolute bottom-4 right-4 z-10">
              <span className="text-[10px] font-bold text-white/80 bg-black/30 backdrop-blur-sm px-2.5 py-1 rounded-full">
                {String(index + 1).padStart(2, "0")} / {String(photosLength).padStart(2, "0")}
              </span>
            </div>
          </div>
        ))}

        {/* Navigation arrows overlaid on image */}
        <button
          onClick={goPrev}
          onMouseEnter={() => setHoveredArrow("prev")}
          onMouseLeave={() => setHoveredArrow(null)}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full flex items-center justify-center border border-white/20 backdrop-blur-md transition-all duration-300 hover:scale-110"
          style={{
            backgroundColor:
              hoveredArrow === "prev"
                ? "rgba(255,255,255,0.25)"
                : "rgba(0,0,0,0.3)",
          }}
          aria-label="Previous photo"
        >
          <ArrowLeft size={16} className="text-white" />
        </button>
        <button
          onClick={goNext}
          onMouseEnter={() => setHoveredArrow("next")}
          onMouseLeave={() => setHoveredArrow(null)}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full flex items-center justify-center border border-white/20 backdrop-blur-md transition-all duration-300 hover:scale-110"
          style={{
            backgroundColor:
              hoveredArrow === "next"
                ? "rgba(255,255,255,0.25)"
                : "rgba(0,0,0,0.3)",
          }}
          aria-label="Next photo"
        >
          <ArrowRight size={16} className="text-white" />
        </button>
      </div>

      {/* Dots indicator */}
      <div className="flex items-center justify-center gap-2 mt-4">
        {photos.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setActiveIndex(index);
              if (autoplayRef.current) clearInterval(autoplayRef.current);
            }}
            className="transition-all duration-300 rounded-full"
            style={{
              width: index === activeIndex ? 24 : 6,
              height: 6,
              backgroundColor:
                index === activeIndex
                  ? "var(--foreground)"
                  : "var(--muted-foreground)",
              opacity: index === activeIndex ? 1 : 0.4,
            }}
            aria-label={`Go to photo ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
