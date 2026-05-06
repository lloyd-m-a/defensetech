"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "@/hooks/useInView";
import ScrollIndicator from "@/components/ScrollIndicator";
import CountUp from "@/components/CountUp";

/* ── ANIMATION HELPERS ─────────────────────────────────────────────────── */
function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, inView } = useInView(0.15);
  return (
    <div ref={ref} style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(28px)", transition: `opacity 0.9s cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 0.9s cubic-bezier(0.22,1,0.36,1) ${delay}ms` }}>
      {children}
    </div>
  );
}

function SlideFromLeft({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, inView } = useInView(0.15);
  return (
    <div ref={ref} style={{ opacity: inView ? 1 : 0, transform: inView ? "translateX(0)" : "translateX(-56px)", transition: `opacity 1.3s cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 1.3s cubic-bezier(0.22,1,0.36,1) ${delay}ms` }}>
      {children}
    </div>
  );
}

function SlideFromBottom({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, inView } = useInView(0.15);
  return (
    <div ref={ref} style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(40px)", transition: `opacity 1.3s cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 1.3s cubic-bezier(0.22,1,0.36,1) ${delay}ms` }}>
      {children}
    </div>
  );
}

function SlideFromRight({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, inView } = useInView(0.15);
  return (
    <div ref={ref} style={{ opacity: inView ? 1 : 0, transform: inView ? "translateX(0)" : "translateX(56px)", transition: `opacity 1.3s cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 1.3s cubic-bezier(0.22,1,0.36,1) ${delay}ms` }}>
      {children}
    </div>
  );
}

/* ── COUNT DOWN (1000 → 0) ─────────────────────────────────────────────── */
function CountDown({
  from = 1000,
  duration = 2400,
  className,
  style,
}: {
  from?: number;
  duration?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [displayed, setDisplayed] = useState(from);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return;
        started.current = true;
        observer.disconnect();
        const startTime = performance.now();
        const tick = (now: number) => {
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // ease-out cubic — fast drop then slow landing on 0
          const eased = 1 - Math.pow(1 - progress, 3);
          setDisplayed(Math.round(from * (1 - eased)));
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [from, duration]);

  return (
    <span ref={ref} className={className} style={style}>
      {displayed}
    </span>
  );
}

/* ── CONTENT ───────────────────────────────────────────────────────────── */
const INDOPACIFIC_FACTS = [
  "Ports and fixed infrastructure will be targeted first.",
  "Large ships operating in contested waters face existential risk.",
  "The supply system is part of the target set — not behind the fight.",
];

const EABO_NEEDS = [
  "Forces spread across dozens of dispersed positions — each with different access constraints",
  "Austere shorelines with rocky shores, coral crests, and reef shelves that block any vessel with meaningful draft",
  "All-domain threats targeting the supply system — logistics is part of the target set, not behind the fight",
  "Legacy connectors were not designed for survivability in stand-in environments",
];

const DOCTRINE = [
  {
    num: "01",
    title: "The Gap:\nNo Vessel Built\nfor the Fight",
    lead: "A 1:230 shipbuilding gap with China — and no industrial strategy to close it.",
    body: "Current U.S. shipyards cannot produce the quantity or type of vessels required. Autonomy-only startups cannot scale production. Traditional primes are optimized for billion-dollar ships, not attritable, shallow-draft logistics craft.",
  },
  {
    num: "02",
    title: "Bulwark's\nInsight",
    lead: "The U.S. has solved this problem before.",
    body: "During the Korean and Vietnam Wars, the U.S. relied on allied industrial bases — especially Japan — to build wartime logistics platforms at speed and scale.\n\nHistory is repeating itself.",
  },
  {
    num: "03",
    title: "Our\nMission",
    lead: "Build the world's first vertically integrated autonomous maritime logistics company.",
    body: "With production based in the U.S. and Japan, and designed for the IndoPacific fight.\n\nWe are not a software company. We are not a traditional shipyard. We are the next-generation shipyard — built for wartime scale.",
  },
  {
    num: "04",
    title: "Why\nJapan",
    lead: "Japan is the only allied nation with the industrial base to match the threat.",
    body: "Established FRP shipbuilding capability. Massive industrial throughput. China-free supply chains through our partners. Proximity to the First Island Chain.\n\nThrough our partnership with Japanese shipyards, we can produce hundreds of vessels per year — a scale no U.S. startup can match.\n\nProduction capacity is our primary KPI.",
  },
  {
    num: "05",
    title: "Vertical\nIntegration\nWins",
    lead: "The future will not be won by software-only autonomy companies.",
    body: "It will be won by companies that control the entire stack: autonomy, C2, hull production, payload integration, expeditionary manufacturing, and in-theater sustainment.\n\nThis is the same playbook that created every modern prime — and we are executing it from day one.",
  },
];

const ABLV_CAPABILITIES = [
  { label: "Ultra-shallow draft", sub: "Beach landing without a pier" },
  { label: "GPS-denied", sub: "Navigates in contested environments" },
  { label: "Autonomous offload", sub: "No crew exposure on the beach" },
  { label: "Rapid replenishment", sub: "Continuous logistics at operational tempo" },
  { label: "Contested littorals", sub: "Designed for the worst-case environment" },
  { label: "Mass production", sub: "Hundreds of units per year at scale" },
];

/* ── COMPONENT ─────────────────────────────────────────────────────────── */
export default function MissionNew() {
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollOpacity, setScrollOpacity] = useState(1);

  // Vimeo background video — mission: 1185630821
  const [videoReady, setVideoReady] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVideoReady(true), 1500);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;
      setScrollOpacity(Math.max(0, 1 - window.scrollY / (section.offsetHeight * 0.55)));
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const HERO_GRADIENT = "linear-gradient(135deg, #11294E 0%, #102749 7.14%, #0F2645 14.29%, #0F2440 21.43%, #0E223B 28.57%, #0D2037 35.71%, #0D1F32 42.86%, #0C1D2E 50%, #0C1725 57.14%, #0C121C 64.29%, #0B0C14 71.43%, #0A070C 78.57%, #080305 85.71%, #060101 92.86%, #040000 100%)";

  return (
    <>
      {/* ── HERO ──────────────────────────────────────────────────────── */}
      <section
        ref={sectionRef}
        id="mission"
        className="relative min-h-screen flex flex-col overflow-hidden"
        style={{ background: HERO_GRADIENT }}
      >
        <ScrollIndicator />
        <div
          className="relative max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-8 w-full flex-1 flex flex-col justify-center py-20 sm:py-28 md:py-36"
          style={{ opacity: scrollOpacity, transition: "opacity 0.1s linear" }}
        >
          <div className="pl-5 sm:pl-8 md:pl-16">
            <p className="animate-fade-in-up animate-delay-100 text-[14px] font-medium leading-[21px] tracking-[4.2px] uppercase text-white/50 mb-6">
              Mission
            </p>
            <h1 className="mb-8">
              <span className="animate-fade-in-up animate-delay-250 block text-[44px] sm:text-[58px] lg:text-[72px] font-bold leading-[1.05] tracking-[0px] text-white hero-headline">
                Scale the Fleet.
              </span>
              <span className="animate-fade-in-up animate-delay-250 block text-[44px] sm:text-[58px] lg:text-[72px] font-bold leading-[1.05] tracking-[0px] text-white hero-headline">
                Reach the Shores.
              </span>
            </h1>
            <p className="animate-fade-in-up animate-delay-450 text-[18px] sm:text-[20px] lg:text-[24px] font-normal leading-[1.625] text-white/75 max-w-[700px]">
              Building the world's first vertically integrated autonomous maritime logistics company — manufacturing hundreds of vessels, designed for the contested shores of the Western Pacific.
            </p>
          </div>
        </div>
      </section>

      {/* ── THE INDOPACIFIC REALITY ────────────────────────────────────── */}
      <section className="bg-black py-20 sm:py-28 lg:py-36">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-16 xl:px-24">
          <FadeIn>
            <p className="uppercase mb-4" style={{ fontSize: "14px", fontWeight: 500, letterSpacing: "2.8px", color: "rgba(255,255,255,0.4)" }}>
              The IndoPacific Reality
            </p>
            <div style={{ width: "64px", height: "2px", background: "#ffffff", marginBottom: "48px" }} />
          </FadeIn>

          {/* Fact cards — text top, underbar bottom */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-[80px] mb-20 items-stretch">
            {INDOPACIFIC_FACTS.map((fact, i) => (
              <FadeIn key={i} delay={i * 80}>
                <div className="flex flex-col justify-between h-full text-center">
                  <p className="mb-4" style={{ fontSize: "clamp(20px, 2.5vw, 28px)", fontWeight: 700, lineHeight: "1.5", letterSpacing: "0px", color: "#FFFFFF" }}>
                    {fact}
                  </p>
                  <div style={{ width: "48px", height: "2px", background: "#FFFFFF", margin: "16px auto 0" }} />
                </div>
              </FadeIn>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-12 lg:gap-24 items-start">
            <FadeIn delay={100}>
              <p style={{ fontSize: "clamp(18px, 2.5vw, 24px)", fontWeight: 600, lineHeight: 1.5, color: "rgba(255,255,255,0.9)" }}>
                Distributed operations across the Western Pacific — including Expeditionary Advanced Base Operations (EABO) — demand a logistics model that has never existed. Effective sustainment in contested environments is not a support function. It is the fight.
              </p>
            </FadeIn>
            <FadeIn delay={200}>
              <ul className="space-y-4">
                {EABO_NEEDS.map((need, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <span style={{ flexShrink: 0, width: "6px", height: "6px", background: "rgba(255,255,255,0.4)", marginTop: "10px" }} />
                    <span style={{ fontSize: "clamp(15px, 1.5vw, 17px)", lineHeight: 1.7, color: "rgba(255,255,255,0.65)" }}>{need}</span>
                  </li>
                ))}
              </ul>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── BY THE NUMBERS ────────────────────────────────────────────── */}
      <section className="bg-black min-h-screen flex items-center py-10 sm:py-14 lg:py-16">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-20 w-full">
          <FadeIn>
            <p className="uppercase mb-2" style={{ fontSize: "14px", fontWeight: 500, letterSpacing: "2.8px", color: "rgba(255,255,255,0.5)" }}>
              By The Numbers
            </p>
            <div style={{ width: "64px", height: "2px", background: "#FFFFFF", marginBottom: "16px" }} />
            <h3 className="text-white mb-8" style={{ fontSize: "clamp(20px, 3vw, 36px)", lineHeight: 1.25, fontWeight: 700 }}>
              The scale of the problem demands an industrial answer.
            </h3>
          </FadeIn>

          {/* ── Row 1: Industrial Base Problem ── */}
          <FadeIn delay={60}>
            <p className="uppercase mb-2" style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "3px", color: "rgba(255,255,255,0.35)" }}>
              Industrial Base Problem
            </p>
            <div style={{ width: "100%", height: "1px", background: "rgba(255,255,255,0.08)", marginBottom: "16px" }} />
          </FadeIn>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 mb-10">
            {[
              { value: "230×",  label: "China's shipbuilding capacity advantage over the U.S." },
              { value: "$32M+", label: "Per legacy connector vessel acquisition cost (LCU-1700, LCAC)" },
              { value: "30+",   label: "Years old — average age of U.S. legacy connectors" },
              { value: "64",    label: "Vessels cut from U.S. Army watercraft fleet since 2018" },
            ].map((stat, i) => (
              <FadeIn key={stat.label} delay={i * 50}>
                <div style={{ paddingTop: "14px" }}>
                  <CountUp
                    value={stat.value}
                    className="block"
                    style={{ fontSize: "clamp(28px, 4vw, 44px)", lineHeight: 1, fontWeight: 700, color: "#FFFFFF", marginBottom: "8px" }}
                  />
                  <p style={{ fontSize: "13px", lineHeight: "20px", color: "rgba(255,255,255,0.6)" }}>{stat.label}</p>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* ── Row 2: Contested Logistics Problem ── */}
          <FadeIn delay={60}>
            <p className="uppercase mb-2" style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "3px", color: "rgba(255,255,255,0.35)" }}>
              Contested Logistics Problem
            </p>
            <div style={{ width: "100%", height: "1px", background: "rgba(255,255,255,0.08)", marginBottom: "16px" }} />
          </FadeIn>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
            {[
              { value: "842t",  label: "Daily tonnage required to sustain EABO across 20 distributed bases" },
              { value: "33.7%", label: "Of LCACs and LCUs fully mission capable" },
              { value: "+80%",  label: "U.S. dependency on commercial sealift assets" },
            ].map((stat, i) => (
              <FadeIn key={stat.label} delay={i * 50}>
                <div style={{ paddingTop: "14px" }}>
                  <CountUp
                    value={stat.value}
                    className="block"
                    style={{ fontSize: "clamp(28px, 4vw, 44px)", lineHeight: 1, fontWeight: 700, color: "#FFFFFF", marginBottom: "8px" }}
                  />
                  <p style={{ fontSize: "13px", lineHeight: "20px", color: "rgba(255,255,255,0.6)" }}>{stat.label}</p>
                </div>
              </FadeIn>
            ))}
            <FadeIn delay={150}>
              <div style={{ paddingTop: "14px" }}>
                <CountDown
                  from={1000}
                  duration={2400}
                  className="block"
                  style={{ fontSize: "clamp(28px, 4vw, 44px)", lineHeight: 1, fontWeight: 700, color: "#FFFFFF", marginBottom: "8px" }}
                />
                <p style={{ fontSize: "13px", lineHeight: "20px", color: "rgba(255,255,255,0.6)" }}>Proven autonomous vessels for contested maritime logistics</p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── NUMBERED DOCTRINE SECTIONS ────────────────────────────────── */}
      <section className="bg-white py-16 sm:py-24 md:py-32">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-24 xl:px-48">
          <div className="flex flex-col divide-y divide-black/10">
            {DOCTRINE.map((item, i) => (
              <div key={item.num} className="grid md:grid-cols-[280px_1fr] gap-8 md:gap-16 py-12 md:py-16">
                <div>
                  <SlideFromLeft delay={i * 30}>
                    <p className="font-bold mb-5" style={{ fontSize: "clamp(48px, 8vw, 80px)", lineHeight: "1", color: "rgba(0,0,0,0.08)" }}>{item.num}</p>
                  </SlideFromLeft>
                  <SlideFromLeft delay={i * 30 + 100}>
                    <div className="w-24 mb-5" style={{ height: "2px", background: "#000000" }} />
                  </SlideFromLeft>
                  <SlideFromBottom delay={i * 30 + 180}>
                    <p className="font-bold text-black whitespace-pre-line" style={{ fontSize: "clamp(20px, 3vw, 28px)", lineHeight: "1.25" }}>{item.title}</p>
                  </SlideFromBottom>
                </div>
                <SlideFromRight delay={i * 30 + 150}>
                  <div className="flex flex-col gap-5 pt-2">
                    {item.lead && (
                      <p style={{ fontSize: "clamp(20px, 2.5vw, 26px)", lineHeight: 1.625, fontWeight: 500, color: "#0F2440" }}>{item.lead}</p>
                    )}
                    <p className="whitespace-pre-line" style={{ fontSize: "clamp(16px, 2vw, 20px)", lineHeight: 1.7, color: "rgba(0,0,0,0.65)" }}>{item.body}</p>
                  </div>
                </SlideFromRight>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── THE ABLV PLATFORM ─────────────────────────────────────────── */}
      <section className="relative py-20 sm:py-28 lg:py-36 overflow-hidden" style={{ background: "linear-gradient(180deg, #0C1D2E 0%, #080305 60%, #040000 100%)" }}>

        {/* ── VIDEO BACKGROUND — Vimeo ── */}
        <div className="absolute inset-0 z-0">
          <div className="absolute overflow-hidden pointer-events-none" style={{ top: 0, left: 0, right: 0, bottom: "-150px" }} aria-hidden="true">
            <img
              src="/poster-mission.webp"
              alt=""
              loading="lazy"
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "max(100%, calc(100vh * 16 / 9))",
                height: "max(100%, calc(100vw * 9 / 16))",
                objectFit: "cover",
              }}
            />
            <iframe
              src="https://player.vimeo.com/video/1185630821?badge=0&autopause=0&autoplay=1&muted=1&loop=1&background=1&app_id=58479"
              loading="lazy"
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                width: "max(100%, calc(100vh * 16 / 9))",
                height: "max(100%, calc(100vw * 9 / 16))",
                border: "none",
                pointerEvents: "none",
                opacity: videoReady ? 1 : 0,
                transition: "opacity 1.5s ease",
              }}
              allow="autoplay; fullscreen; picture-in-picture"
              title="Mission background video"
            />
          </div>
          <div className="absolute inset-0" style={{ background: "rgba(0,0,0,0.55)" }} />
        </div>

        <div className="relative z-10 max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-16 xl:px-24">
          <FadeIn>
            <p className="uppercase mb-4" style={{ fontSize: "14px", fontWeight: 500, letterSpacing: "2.8px", color: "rgba(255,255,255,0.4)" }}>
              A New Maritime Category
            </p>
            <div style={{ width: "64px", height: "2px", background: "#ffffff", marginBottom: "32px" }} />
            <h3 className="text-white mb-6" style={{ fontSize: "clamp(28px, 4.5vw, 52px)", fontWeight: 700, lineHeight: 1.15, maxWidth: "780px" }}>
              The Autonomous Landing Craft
            </h3>
            <div className="flex flex-wrap items-end justify-between gap-6 mb-16">
              <p style={{ fontSize: "clamp(16px, 2vw, 20px)", lineHeight: 1.7, color: "rgba(255,255,255,0.6)", maxWidth: "480px" }}>
                Purpose-built for the IndoPacific fight. Not a boat — a logistics system.
              </p>
              <a
                href="/vessel"
                className="flex-shrink-0 inline-flex items-center gap-3 px-6 py-3 text-xs font-semibold tracking-widest uppercase transition-colors duration-300"
                style={{ border: "1px solid rgba(255,255,255,0.5)", color: "#FFFFFF", background: "transparent" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#FFFFFF"; (e.currentTarget as HTMLElement).style.color = "#000000"; (e.currentTarget as HTMLElement).style.borderColor = "#FFFFFF"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = "#FFFFFF"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.5)"; }}
              >
                See the Vessel &rarr;
              </a>
            </div>
          </FadeIn>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: "rgba(255,255,255,0.08)" }}>
            {ABLV_CAPABILITIES.map((cap, i) => (
              <FadeIn key={cap.label} delay={i * 70}>
                <div className="flex flex-col gap-3 p-8 lg:p-10" style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)" }}>
                  <div style={{ width: "32px", height: "2px", background: "#FFFFFF" }} />
                  <p style={{ fontSize: "clamp(18px, 2vw, 22px)", fontWeight: 700, color: "#ffffff", lineHeight: 1.3 }}>{cap.label}</p>
                  <p style={{ fontSize: "14px", lineHeight: 1.65, color: "rgba(255,255,255,0.5)" }}>{cap.sub}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROBLEM vs SOLUTION ───────────────────────────────────────── */}
      <section className="bg-[#F8F8F8] flex items-center" style={{ minHeight: "100vh" }}>
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-16 xl:px-24 w-full py-16 sm:py-20">
          <div className="grid md:grid-cols-2 items-stretch gap-8 md:gap-[80px]" style={{ minHeight: "clamp(500px, 70vh, 800px)" }}>
            <FadeIn>
              <div className="bg-white h-full flex flex-col justify-between" style={{ padding: "clamp(32px, 5vw, 64px)" }}>
                <div>
                  <p className="text-xs font-semibold tracking-[3px] uppercase text-slate-400 mb-4">The Problem</p>
                  <div style={{ width: "48px", height: "2px", background: "#0F2440", marginBottom: "32px" }} />
                  <h4 className="mb-10" style={{ fontSize: "clamp(28px, 3.5vw, 42px)", fontWeight: 700, lineHeight: 1.2, color: "#0F2440" }}>
                    The logistics infrastructure doesn't exist.
                  </h4>
                  <ul className="space-y-5">
                    {[
                      "No shallow-draft autonomous vessel in production",
                      "U.S. shipbuilding capacity 230× behind China",
                      "Legacy connectors cannot operate from austere beaches",
                      "Autonomy startups lack manufacturing scale",
                      "Traditional primes optimized for billion-dollar platforms",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-4" style={{ fontSize: "clamp(15px, 1.5vw, 17px)", color: "rgba(0,0,0,0.6)", lineHeight: 1.6 }}>
                        <span className="mt-2 w-2 h-2 rounded-full flex-shrink-0" style={{ background: "#0F2440" }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={150}>
              <div className="bg-black h-full flex flex-col justify-between" style={{ padding: "clamp(32px, 5vw, 64px)" }}>
                <div>
                  <p className="text-xs font-semibold tracking-[3px] uppercase text-slate-500 mb-4">The Bulwark Answer</p>
                  <div style={{ width: "48px", height: "2px", background: "#FFFFFF", marginBottom: "32px" }} />
                  <h4 className="mb-10" style={{ fontSize: "clamp(28px, 3.5vw, 42px)", fontWeight: 700, lineHeight: 1.2, color: "#FFFFFF" }}>
                    Vertically integrated. Industrially scaled. Allied-built.
                  </h4>
                  <ul className="space-y-5 mb-12">
                    {[
                      "Autonomous landing craft purpose-built for contested logistics",
                      "Production based in the U.S. and Japan — hundreds of units per year",
                      "GPS-denied autonomous navigation",
                      "American capital, allied manufacturing, Indo-Pacific ready",
                      "Full stack ownership: autonomy through sustainment",
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-4" style={{ fontSize: "clamp(15px, 1.5vw, 17px)", color: "rgba(255,255,255,0.7)", lineHeight: 1.6 }}>
                        <span className="mt-2 w-2 h-2 rounded-full bg-white flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <a href="/vessel" className="self-start inline-flex items-center gap-2 border border-white px-6 py-3 text-xs font-semibold tracking-widest uppercase text-white hover:bg-white hover:text-black transition-colors duration-300">
                  See the Vessel &rsaquo;
                </a>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── OUR VISION — styled like the hero ─────────────────────────── */}
      <section
        className="relative min-h-screen flex flex-col justify-center overflow-hidden"
        style={{ background: HERO_GRADIENT }}
      >
        <div className="relative max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-16 xl:px-24 w-full pt-48 pb-16 sm:pt-64 sm:pb-20">
          {/* Eyebrow */}
          <FadeIn>
            <p style={{ fontSize: "14px", fontWeight: 500, letterSpacing: "4.2px", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: "24px" }}>
              Vision
            </p>
            <div style={{ width: "64px", height: "2px", background: "rgba(255,255,255,0.3)", marginBottom: "40px" }} />
          </FadeIn>

          {/* Headline — smaller than hero but still impactful */}
          <FadeIn delay={100}>
            <h2
              className="text-white mb-6"
              style={{ fontSize: "clamp(36px, 5.5vw, 72px)", fontWeight: 700, lineHeight: 1.1, letterSpacing: "0px", maxWidth: "900px" }}
            >
              To become the next-generation shipyard, powered by autonomy.
            </h2>
          </FadeIn>

          {/* Body text — reduced */}
          <FadeIn delay={200}>
            <p
              className="mb-5"
              style={{ fontSize: "clamp(14px, 1.5vw, 17px)", lineHeight: 1.75, color: "rgba(255,255,255,0.7)", maxWidth: "600px" }}
            >
              A vertically integrated maritime platform company built on wartime demand, industrial scale, and relentless manufacturing excellence.
            </p>
          </FadeIn>
          <FadeIn delay={280}>
            <p
              className="mb-12"
              style={{ fontSize: "clamp(13px, 1.3vw, 15px)", lineHeight: 1.75, color: "rgba(255,255,255,0.45)", maxWidth: "600px" }}
            >
              Defense is the catalyst. Commercial is the multiplier. Beyond the conflict, autonomous maritime logistics will define the next century of offshore energy, island-nation supply chains, disaster relief, and coastal transport.
            </p>
          </FadeIn>

          {/* Statement cards — same format as Vessel engineered.stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-[80px]">
            {[
              { label: "Build",  body: "where the fight is." },
              { label: "Scale",  body: "faster than competitors." },
              { label: "Define", body: "the future of maritime logistics." },
            ].map((col, i) => (
              <FadeIn key={col.label} delay={360 + i * 80}>
                <div>
                  <div style={{ width: "48px", height: "2px", background: "#FFFFFF", marginBottom: "20px" }} />
                  <p className="mb-3" style={{ fontSize: "clamp(20px, 2.5vw, 28px)", fontWeight: 700, lineHeight: "1.5", letterSpacing: "0px", color: "#FFFFFF" }}>
                    {col.label}
                  </p>
                  <p style={{ fontSize: "clamp(15px, 1.8vw, 18px)", fontWeight: 400, lineHeight: "1.625", letterSpacing: "0px", color: "rgba(255,255,255,0.6)" }}>
                    {col.body}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── TWO IMAGE CARDS ───────────────────────────────────────────── */}
      <section className="bg-black py-16 sm:py-24 lg:py-32 px-5 sm:px-8 lg:px-16 xl:px-24">
        <div className="flex flex-col sm:flex-row w-full gap-2 sm:gap-0" style={{ minHeight: "clamp(320px, 50vw, 600px)" }}>
          {[
            { label: "Our Vessel", sub: "Carabao — autonomous beach-landing logistics platform", href: "/vessel", image: "/Image (Our Vessel).svg" },
            { label: "Work With Us", sub: "Join the team building the future of maritime logistics", href: "/join#why-join", image: "/Image (Work With Us).svg" },
          ].map((card) => (
            <a key={card.label} href={card.href} className="group relative block overflow-hidden flex-1" style={{ minHeight: "280px" }}>
              <img src={card.image} alt={card.label} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.03]" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10">
                <p className="text-white font-bold text-xl md:text-2xl mb-1">{card.label}</p>
                <p className="text-white/60 text-xs tracking-wide">{card.sub}</p>
              </div>
            </a>
          ))}
        </div>
      </section>
    </>
  );
}
