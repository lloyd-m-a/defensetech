"use client";

import { useEffect, useRef, useState } from "react";
import { content } from "@/lib/content";
import { useInView } from "@/hooks/useInView";
import ScrollIndicator from "@/components/ScrollIndicator";
import CountUp from "@/components/CountUp";

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, inView } = useInView(0.15);
  return (
    <div ref={ref} style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(28px)", transition: `opacity 0.9s cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 0.9s cubic-bezier(0.22,1,0.36,1) ${delay}ms` }}>
      {children}
    </div>
  );
}

// Slides in from left — for numbers and bars
function SlideFromLeft({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, inView } = useInView(0.15);
  return (
    <div ref={ref} style={{ opacity: inView ? 1 : 0, transform: inView ? "translateX(0)" : "translateX(-56px)", transition: `opacity 1.3s cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 1.3s cubic-bezier(0.22,1,0.36,1) ${delay}ms` }}>
      {children}
    </div>
  );
}

// Slides up from bottom — for left-column titles
function SlideFromBottom({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, inView } = useInView(0.15);
  return (
    <div ref={ref} style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(40px)", transition: `opacity 1.3s cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 1.3s cubic-bezier(0.22,1,0.36,1) ${delay}ms` }}>
      {children}
    </div>
  );
}

// Slides in from right — for body paragraphs
function SlideFromRight({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, inView } = useInView(0.15);
  return (
    <div ref={ref} style={{ opacity: inView ? 1 : 0, transform: inView ? "translateX(0)" : "translateX(56px)", transition: `opacity 1.3s cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 1.3s cubic-bezier(0.22,1,0.36,1) ${delay}ms` }}>
      {children}
    </div>
  );
}

export default function Mission() {
  const t = content.en.mission;
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollOpacity, setScrollOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const section = sectionRef.current;
      if (!section) return;
      const height = section.offsetHeight;
      const scrolled = window.scrollY;
      setScrollOpacity(Math.max(0, 1 - scrolled / (height * 0.55)));
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────── */}
      <section
        ref={sectionRef}
        id="mission"
        className="relative min-h-screen flex flex-col overflow-hidden"
        style={{ background: "linear-gradient(135deg, #11294E 0%, #102749 7.14%, #0F2645 14.29%, #0F2440 21.43%, #0E223B 28.57%, #0D2037 35.71%, #0D1F32 42.86%, #0C1D2E 50%, #0C1725 57.14%, #0C121C 64.29%, #0B0C14 71.43%, #0A070C 78.57%, #080305 85.71%, #060101 92.86%, #040000 100%)" }}
      >
        <ScrollIndicator />
        <div
          className="relative max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-8 w-full flex-1 flex flex-col justify-center pt-[55vh] pb-16 md:pb-20"
          style={{
            opacity: scrollOpacity,
            transition: "opacity 0.1s linear",
          }}
        >
          <div className="pl-5 sm:pl-8 md:pl-16">
            <p className="animate-fade-in-up animate-delay-100 text-[14px] font-medium leading-[21px] tracking-[4.2px] uppercase text-white/50 mb-6">
              {t.label}
            </p>
            <h2 className="mb-8">
              <span className="animate-fade-in-up animate-delay-250 block text-[42px] sm:text-[60px] lg:text-[82px] font-bold leading-[1.05] tracking-[0px] text-white hero-headline">{t.headline}</span>
            </h2>
            <p className="animate-fade-in-up animate-delay-450 text-[18px] sm:text-[20px] lg:text-[24px] font-normal leading-[1.625] tracking-[0px] text-white/75 max-w-[674px]">
              {t.body1}
            </p>
          </div>
        </div>
      </section>

      {/* ── NUMBERED DOCTRINE SECTIONS ── */}
      <section className="bg-white py-16 sm:py-24 md:py-32">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-24 xl:px-48">
          <div className="flex flex-col divide-y divide-black/10">
            {t.doctrine.sections.map((item, i) => (
              <div key={item.num} className="grid md:grid-cols-[280px_1fr] gap-8 md:gap-16 py-12 md:py-16">
                {/* Left — number animates from left, bar + title animate from bottom */}
                <div>
                  <SlideFromLeft delay={i * 30}>
                    <p
                      className="font-bold mb-5"
                      style={{ fontSize: "clamp(48px, 8vw, 80px)", lineHeight: "1", letterSpacing: "0px", color: "rgba(0,0,0,0.1)" }}
                    >
                      {item.num}
                    </p>
                  </SlideFromLeft>
                  <SlideFromLeft delay={i * 30 + 100}>
                    <div className="w-24 mb-5" style={{ height: "2px", background: "#000000" }} />
                  </SlideFromLeft>
                  <SlideFromBottom delay={i * 30 + 180}>
                    <p
                      className="font-bold text-black whitespace-pre-line"
                      style={{ fontSize: "clamp(20px, 3vw, 28px)", lineHeight: "1.25", letterSpacing: "0px" }}
                    >
                      {item.title}
                    </p>
                  </SlideFromBottom>
                </div>
                {/* Right — lead + body animate from right */}
                <SlideFromRight delay={i * 30 + 150}>
                  <div className="flex flex-col gap-5 pt-2">
                    {(item as { lead?: string }).lead && (
                      <p style={{ fontSize: "clamp(20px, 2.5vw, 28px)", lineHeight: "1.625", letterSpacing: "0px", fontWeight: 500, color: "#000000" }}>
                        {(item as { lead?: string }).lead}
                      </p>
                    )}
                    <p
                      className="whitespace-pre-line"
                      style={{ fontSize: "clamp(16px, 2vw, 20px)", lineHeight: "1.625", letterSpacing: "0px", color: "rgba(0,0,0,0.7)" }}
                    >
                      {item.body}
                    </p>
                  </div>
                </SlideFromRight>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BY THE NUMBERS ── */}
      <section className="bg-black py-16 sm:py-24 lg:py-32">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-20">
          <FadeIn>
            <p
              className="uppercase mb-4"
              style={{ fontSize: "14px", fontWeight: 500, letterSpacing: "2.8px", color: "rgba(255,255,255,0.5)" }}
            >
              {t.numbers.eyebrow}
            </p>
            <div style={{ width: "64px", height: "2px", background: "#FFFFFF", marginBottom: "32px" }} />
            <h3
              className="text-white mb-12 md:mb-16"
              style={{ fontSize: "clamp(32px, 5vw, 56px)", lineHeight: "1.25", fontWeight: 700 }}
            >
              {t.numbers.heading}
            </h3>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 md:gap-2">
            {t.numbers.stats.map((stat, i) => (
              <FadeIn key={stat.label} delay={i * 80}>
                <div style={{ paddingTop: "26px" }}>
                  <div style={{ width: "270px", maxWidth: "100%", height: "2px", background: "rgba(255,255,255,0.2)", marginBottom: "24px" }} />
                  <CountUp
                    value={stat.value}
                    className="block"
                    style={{ fontSize: "clamp(40px, 6vw, 64px)", lineHeight: "1", fontWeight: 700, color: "#FFFFFF", marginBottom: "12px" }}
                  />
                  <p style={{ fontSize: "16px", lineHeight: "24px", fontWeight: 400, color: "rgba(255,255,255,0.7)" }}>
                    {stat.label}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROBLEM vs SOLUTION ── */}
      <section className="bg-[#F8F8F8] flex items-center" style={{ minHeight: "100vh" }}>
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-16 xl:px-24 w-full py-16 sm:py-20">
          <div className="grid md:grid-cols-2 items-stretch gap-8 md:gap-[80px]" style={{ minHeight: "clamp(500px, 70vh, 800px)" }}>
            <FadeIn>
              <div className="bg-white h-full flex flex-col justify-between" style={{ padding: "clamp(32px, 5vw, 64px)" }}>
                <div>
                  <p className="text-xs font-semibold tracking-[3px] uppercase text-slate-400 mb-4">{t.problem.eyebrow}</p>
                  <div style={{ width: "48px", height: "2px", background: "#E7000B", marginBottom: "32px" }} />
                  <h4 className="mb-10" style={{ fontSize: "clamp(28px, 3.5vw, 42px)", fontWeight: 700, lineHeight: "1.2", color: "#000000" }}>
                    {t.problem.heading}
                  </h4>
                  <ul className="space-y-5">
                    {t.problem.items.map((item) => (
                      <li key={item} className="flex items-start gap-4" style={{ fontSize: "clamp(15px, 1.5vw, 17px)", color: "rgba(0,0,0,0.6)", lineHeight: "1.6" }}>
                        <span className="mt-2 w-2 h-2 rounded-full flex-shrink-0" style={{ background: "#E7000B" }} />
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
                  <p className="text-xs font-semibold tracking-[3px] uppercase text-slate-500 mb-4">{t.solution.eyebrow}</p>
                  <div style={{ width: "48px", height: "2px", background: "#FFFFFF", marginBottom: "32px" }} />
                  <h4 className="mb-10" style={{ fontSize: "clamp(28px, 3.5vw, 42px)", fontWeight: 700, lineHeight: "1.2", color: "#FFFFFF" }}>
                    {t.solution.heading}
                  </h4>
                  <ul className="space-y-5 mb-12">
                    {t.solution.items.map((item) => (
                      <li key={item} className="flex items-start gap-4" style={{ fontSize: "clamp(15px, 1.5vw, 17px)", color: "rgba(255,255,255,0.7)", lineHeight: "1.6" }}>
                        <span className="mt-2 w-2 h-2 rounded-full bg-white flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <a href="/vessel" className="self-start inline-flex items-center gap-2 border border-white px-6 py-3 text-xs font-semibold tracking-widest uppercase text-white hover:bg-white hover:text-black transition-colors duration-300">
                  {t.solution.cta} &rsaquo;
                </a>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── TWO IMAGE CARDS ── */}
      <section className="bg-black py-16 sm:py-24 lg:py-32 px-5 sm:px-8 lg:px-16 xl:px-24">
        <div className="flex flex-col sm:flex-row w-full gap-2 sm:gap-0" style={{ minHeight: "clamp(320px, 50vw, 600px)" }}>
          {[
            { ...t.cards[0], href: "/vessel", image: "/Image (Our Vessel).svg"   },
            { ...t.cards[1], href: "/join#why-join", image: "/Image (Work With Us).svg" },
          ].map((card) => (
            <a
              key={card.label}
              href={card.href}
              className="group relative block overflow-hidden flex-1"
              style={{ minHeight: "280px" }}
            >
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
