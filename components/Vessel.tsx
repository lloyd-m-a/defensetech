"use client";

import { useState, useRef, useEffect } from "react";
import { content } from "@/lib/content";
import { useInView } from "@/hooks/useInView";
import ScrollIndicator from "@/components/ScrollIndicator";

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, inView } = useInView(0.15);
  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.9s cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 0.9s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

// Slide-up + fade for the CARAVEL technical drawing
function SlideInTechnical({ children }: { children: React.ReactNode }) {
  const { ref, inView } = useInView(0.1);
  return (
    <div
      ref={ref}
      style={{
        opacity: inView ? 1 : 0,
        transform: inView ? "translateY(0px)" : "translateY(50px)",
        transition: "opacity 1.6s cubic-bezier(0.16,1,0.3,1) 150ms, transform 1.6s cubic-bezier(0.16,1,0.3,1) 150ms",
      }}
    >
      {children}
    </div>
  );
}

const FEATURE_IMAGES = [
  "/Image (Shore to shore delivery).webp",
  "/Image (Support versatile environments).webp",
  "/Image (ISO containers supported).svg",
  "/Image (GPS denied operability).svg",
  "/Image (Port-independent cargo handling).svg",
];

// Rolodex starts at 12% scroll — "Features" bg shows briefly then cards begin.
// 5 feature cards share scroll 12%→100%, each gets ~17.6%.
const CARD_SEGMENTS = [
  { start: 0.12, end: 0.30 },
  { start: 0.30, end: 0.48 },
  { start: 0.48, end: 0.66 },
  { start: 0.66, end: 0.83 },
  { start: 0.83, end: 1.00 },
];

function getCardTransform(index: number, progress: number) {
  const { start, end } = CARD_SEGMENTS[index];

  if (progress <= start) {
    return { rotateX: 65, opacity: 0, zIndex: 0, textProgress: 0 };
  }
  if (progress >= end) {
    return { rotateX: -65, opacity: 0, zIndex: 0, textProgress: 0 };
  }

  const local = (progress - start) / (end - start); // 0→1 within this card's window

  // flip-in 15%, flat 50%, flip-out 35%
  const flipIn  = 0.15;
  const flatEnd = 0.65;

  let rotateX = 0;
  if (local < flipIn) {
    rotateX = 65 * (1 - local / flipIn);
  } else if (local < flatEnd) {
    rotateX = 0;
  } else {
    rotateX = -65 * ((local - flatEnd) / (1 - flatEnd));
  }

  // Text animates in after card lands, out before card leaves
  let textProgress = 0;
  if (local >= flipIn && local <= flatEnd - 0.10) {
    textProgress = Math.min(1, (local - flipIn) / 0.15);
  } else if (local > flatEnd - 0.10 && local < flatEnd) {
    textProgress = Math.max(0, 1 - (local - (flatEnd - 0.10)) / 0.10);
  }

  return { rotateX, opacity: 1, zIndex: 10, textProgress };
}

export default function Vessel() {
  const t = content.en.vessel;
  const sectionRef = useRef<HTMLElement>(null);
  const featuresContainerRef = useRef<HTMLDivElement>(null);
  const [scrollOpacity, setScrollOpacity] = useState(1);
  const [featuresProgress, setFeaturesProgress] = useState(0);

  // 5 feature image cards only — "Features" bg text shows naturally before/after
  const numCards = t.features.length; // 5
  // activeIndex: which card is currently in its window (-1 = none = Features bg showing)
  const activeIndex = CARD_SEGMENTS.findIndex(
    (seg, i) => featuresProgress >= seg.start && (i === CARD_SEGMENTS.length - 1 || featuresProgress < CARD_SEGMENTS[i + 1].start)
  );

  useEffect(() => {
    const handleScroll = () => {
      // Hero fade-out
      const section = sectionRef.current;
      if (section) {
        const height = section.offsetHeight;
        const scrolled = window.scrollY;
        setScrollOpacity(Math.max(0, 1 - scrolled / (height * 0.55)));
      }

      // Features rolodex progress
      const container = featuresContainerRef.current;
      if (container) {
        const rect = container.getBoundingClientRect();
        const totalScroll = container.offsetHeight - window.innerHeight;
        const scrolled = Math.max(0, -rect.top);
        setFeaturesProgress(Math.min(1, scrolled / totalScroll));
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section
        ref={sectionRef}
        id="vessel"
        className="relative min-h-screen flex flex-col overflow-hidden bg-slate-950"
      >
        <img
          src="/vessel_page.svg"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <ScrollIndicator />
        <div
          className="relative max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-14 xl:px-24 w-full flex-1 flex flex-col justify-end"
          style={{
            paddingBottom: "calc(15vh + 20px)",
            opacity: scrollOpacity,
            transition: "opacity 0.1s linear",
          }}
        >
          <p
            className="animate-fade-in-up animate-delay-100 uppercase mb-6"
            style={{ fontSize: "14px", fontWeight: 500, lineHeight: "21px", letterSpacing: "2.8px", color: "rgba(255,255,255,0.7)" }}
          >
            {t.label}
          </p>
          <div className="animate-fade-in-up animate-delay-250 mt-4 mb-8">
            <span className="block text-4xl sm:text-5xl lg:text-6xl font-bold tracking-[6px] uppercase text-white">Carabao</span>
          </div>
          <p
            className="animate-fade-in-up animate-delay-450"
            style={{ fontSize: "clamp(18px, 2.5vw, 24px)", fontWeight: 400, lineHeight: "1.625", letterSpacing: "0px", color: "rgba(255,255,255,0.8)" }}
          >
            {t.body}
          </p>
        </div>
      </section>

      {/* ── OVERVIEW ── */}
      <section className="bg-white flex items-center py-16 sm:py-20 lg:py-28">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-14 xl:px-24 w-full">
          <div className="grid md:grid-cols-[200px_1fr] gap-10 md:gap-20 items-start">
            <FadeIn>
              <p
                className="uppercase mb-0"
                style={{ fontSize: "14px", fontWeight: 500, lineHeight: "21px", letterSpacing: "2.8px", color: "rgba(0,0,0,0.5)" }}
              >
                {t.overview.eyebrow}
              </p>
              <div style={{ width: "64px", height: "2px", background: "#000000", marginTop: "16px" }} />
            </FadeIn>
            <FadeIn delay={150}>
              <h3
                className="mb-6 whitespace-pre-line"
                style={{ fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 700, lineHeight: "1.25", letterSpacing: "0px", color: "#0F2440" }}
              >
                {t.overview.heading}
              </h3>
              <p className="mb-4" style={{ fontSize: "clamp(16px, 2vw, 20px)", fontWeight: 400, lineHeight: "1.625", letterSpacing: "0px", color: "rgba(0,0,0,0.7)" }}>
                {t.overview.body1}
              </p>
              <p style={{ fontSize: "clamp(15px, 1.8vw, 18px)", fontWeight: 400, lineHeight: "1.625", letterSpacing: "0px", color: "rgba(0,0,0,0.6)" }}>
                {t.overview.body2}
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── FEATURES ROLODEX ── */}
      {/* Outer div is tall enough to scroll through all cards */}
      <div
        ref={featuresContainerRef}
        style={{ height: `${(numCards + 1) * 100}vh` }}
        className="relative"
      >
        {/* Sticky viewport — stays fixed while outer div scrolls */}
        <div className="sticky top-0 h-screen overflow-hidden bg-black flex items-center justify-center">

          {/* Background: "Capabilities" + "Features" heading */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none select-none">
            <p
              className="uppercase mb-4"
              style={{ fontSize: "14px", fontWeight: 500, lineHeight: "21px", letterSpacing: "4.2px", color: "rgba(255,255,255,0.5)" }}
            >
              {t.featuresIntro.eyebrow}
            </p>
            <h2
              style={{ fontSize: "clamp(52px, 14vw, 140px)", fontWeight: 700, lineHeight: "1.1", letterSpacing: "0px", color: "#FFFFFF", textAlign: "center" }}
            >
              {t.featuresIntro.heading}
            </h2>
          </div>

          {/* Dot navigation — 5 dots, only visible once rolodex starts */}
          <div
            className="absolute right-10 top-1/2 -translate-y-1/2 flex flex-col gap-[11px] z-30 transition-opacity duration-500"
            style={{ opacity: featuresProgress >= 0.22 ? 1 : 0 }}
          >
            {t.features.map((_, i) => (
              <div
                key={i}
                className="rounded-full transition-all duration-300"
                style={{
                  width:      activeIndex === i ? "10px" : "8px",
                  height:     activeIndex === i ? "10px" : "8px",
                  background: activeIndex === i ? "#ffffff" : "rgba(255,255,255,0.3)",
                }}
              />
            ))}
          </div>

          {/* Card stack with 3D perspective */}
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ perspective: "1400px", perspectiveOrigin: "50% 50%" }}
          >
            {t.features.map((feat, i) => {
              const { rotateX, opacity, zIndex, textProgress } = getCardTransform(i, featuresProgress);
              return (
                <div
                  key={i}
                  className="absolute overflow-hidden"
                  style={{
                    width: "90%",
                    height: "82vh",
                    transform: `rotateX(${rotateX}deg)`,
                    transformOrigin: "center center",
                    opacity,
                    zIndex,
                    backfaceVisibility: "hidden",
                    boxShadow: "0 32px 80px rgba(0,0,0,0.7)",
                  }}
                >
                  <img
                    src={FEATURE_IMAGES[i]}
                    alt={feat.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />
                  <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 sm:px-12">
                    <h3
                      style={{
                        fontSize: "clamp(20px, 5vw, 60px)", fontWeight: 700, lineHeight: "1.2", color: "#FFFFFF",
                        marginBottom: "16px",
                        opacity: textProgress,
                        transform: `translateY(${(1 - textProgress) * 24}px)`,
                        transition: "none",
                      }}
                    >
                      {feat.title}
                    </h3>
                    <p
                      style={{
                        fontSize: "clamp(13px, 3vw, 20px)", fontWeight: 400, lineHeight: "1.625",
                        color: "rgba(255,255,255,0.9)", maxWidth: "680px",
                        opacity: textProgress,
                        transform: `translateY(${(1 - textProgress) * 16}px)`,
                        transition: "none",
                      }}
                    >
                      {feat.body}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Carabao specs image layout ── */}
      <section id="carabao" className="bg-[#EBEBEB] overflow-hidden flex items-center" style={{ minHeight: "100vh" }}>
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-14 xl:px-24 w-full py-16 sm:py-20" style={{ marginTop: "-40px" }}>

          {/* Top specs — right aligned */}
          <FadeIn>
            <div className="flex justify-end mb-4">
              <p style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "3px", lineHeight: "22px", color: "#4a4a4a", textAlign: "right", textTransform: "uppercase", marginTop: "30px" }}>
                {t.caravelSpecs.payload}<br />
                {t.caravelSpecs.range}<br />
                {t.caravelSpecs.operation}
              </p>
            </div>
          </FadeIn>

          {/* Carabao logo + technical image + shore to shore labels all overlapping */}
          <SlideInTechnical>
            <div className="relative w-full mb-6" style={{ aspectRatio: "1230 / 642.578125" }}>
              {/* Carabao text watermark */}
              <span
                aria-hidden="true"
                className="absolute left-0 w-full text-center font-bold tracking-[8px] uppercase select-none pointer-events-none"
                style={{
                  top: `max(2%, calc(${(130.97 / 642.578125) * 100}% - 14%))`,
                  fontSize: `${(105.27627563476562 / 642.578125) * 100}%`,
                  color: "rgba(0,0,0,0.08)",
                  letterSpacing: "0.3em",
                }}
              >Carabao</span>
              {/* Technical drawing — shifted 30px right */}
              <img
                src="/Image (CARAVEL Technical).svg"
                alt="Carabao vessel"
                className="absolute z-10"
                style={{
                  width: "82.5%",
                  left: "calc(8.75% + 30px)",
                  top: "-10px",
                  height: "100%",
                  objectFit: "contain",
                  filter: "drop-shadow(0 20px 40px rgba(0,0,0,0.25)) drop-shadow(0 4px 12px rgba(0,0,0,0.15))",
                }}
              />
              {/* Shore to shore labels — overlapping, desktop only */}
              <div
                className="absolute left-0 z-20 hidden lg:block"
                style={{
                  top: `calc(max(2%, calc(${(130.97 / 642.578125) * 100}% - 14%)) + ${(105.27627563476562 / 642.578125) * 100}% + 30px)`,
                }}
              >
                <p style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "3px", color: "#4a4a4a", textTransform: "uppercase" }}>{t.caravelSpecs.label1}</p>
                <p style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "3px", color: "#4a4a4a", textTransform: "uppercase" }}>{t.caravelSpecs.label2}</p>
              </div>
            </div>
          </SlideInTechnical>


          {/* Shore to shore labels — normal flow on mobile/tablet only */}
          <div className="block lg:hidden mt-4 mb-5">
            <p style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "3px", color: "#4a4a4a", textTransform: "uppercase" }}>{t.caravelSpecs.label1}</p>
            <p style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "3px", color: "#4a4a4a", textTransform: "uppercase" }}>{t.caravelSpecs.label2}</p>
          </div>

          {/* Three spec columns */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-[60px] mt-6 lg:mt-[-35px]">
            {t.specsColumns.map((col, i) => (
              <FadeIn key={col.title} delay={i * 80}>
                <div>
                  <div style={{ width: "48px", height: "2px", background: "#000000", marginBottom: "12px" }} />
                  <p style={{ fontSize: "18px", fontWeight: 700, lineHeight: "26px", color: "#000000", marginBottom: "8px" }}>
                    {col.title}
                  </p>
                  <p style={{ fontSize: "13px", fontWeight: 400, lineHeight: "20px", color: "rgba(0,0,0,0.6)" }}>
                    {col.body}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── ENGINEERED FOR MISSION-CRITICAL ── */}
      <section className="bg-black py-16 sm:py-24 lg:py-32">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-14 xl:px-24">
          <FadeIn>
            <h3
              className="mb-12 md:mb-16"
              style={{ fontSize: "clamp(36px, 6vw, 72px)", fontWeight: 700, lineHeight: "1.25", letterSpacing: "0px", color: "#FFFFFF" }}
            >
              {t.engineered.heading}
            </h3>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-[80px]">
            {t.engineered.stats.map((stat, i) => (
              <FadeIn key={stat.label} delay={i * 80}>
                <div>
                  <div style={{ width: "48px", height: "2px", background: "#FFFFFF", marginBottom: "20px" }} />
                  <p className="mb-3" style={{ fontSize: "clamp(20px, 2.5vw, 28px)", fontWeight: 700, lineHeight: "1.5", letterSpacing: "0px", color: "#FFFFFF" }}>
                    {stat.label}
                  </p>
                  <p style={{ fontSize: "clamp(15px, 1.8vw, 18px)", fontWeight: 400, lineHeight: "1.625", letterSpacing: "0px", color: "rgba(255,255,255,0.6)" }}>
                    {stat.body}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
