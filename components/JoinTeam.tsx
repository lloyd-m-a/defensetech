"use client";

import { useEffect, useRef, useState } from "react";
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

export default function JoinTeam() {
  const t = content.en.join;
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
        id="join"
        className="relative min-h-screen flex flex-col overflow-hidden"
        style={{ background: "linear-gradient(135deg, #11294E 0%, #102749 7.14%, #0F2645 14.29%, #0F2440 21.43%, #0E223B 28.57%, #0D2037 35.71%, #0D1F32 42.86%, #0C1D2E 50%, #0C1725 57.14%, #0C121C 64.29%, #0B0C14 71.43%, #0A070C 78.57%, #080305 85.71%, #060101 92.86%, #040000 100%)" }}
      >
        <ScrollIndicator />
        <div
          className="relative max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-14 xl:px-24 w-full flex-1 flex flex-col justify-center pb-16 md:pb-24"
          style={{ paddingTop: "calc(50vh - 60px)", opacity: scrollOpacity, transition: "opacity 0.1s linear" }}
        >
          <div>
            <p className="animate-fade-in-up animate-delay-100 text-[14px] font-medium leading-[21px] tracking-[4.2px] uppercase text-white/50 mb-6">
              {t.label}
            </p>
            <h2 className="mb-8" style={{ maxWidth: "820px" }}>
              <span className="animate-fade-in-up animate-delay-250 block text-[42px] sm:text-[60px] lg:text-[80px] font-bold leading-[1.05] tracking-[0px] text-white hero-headline">{t.headline}</span>
            </h2>
            <p className="animate-fade-in-up animate-delay-450 text-[18px] sm:text-[20px] lg:text-[24px] font-normal leading-[1.625] tracking-[0px] text-white/75 max-w-[674px]">
              {t.sub}
            </p>
          </div>
        </div>
      </section>

      {/* ── WHY JOIN ── */}
      <section id="why-join" className="bg-white py-16 sm:py-24 lg:py-32">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-14 xl:px-24">
          {/* Top: eyebrow col-1, heading+body col-2 (aligns with Exceptional Team) */}
          <div className="grid md:grid-cols-3 items-start mb-12 md:mb-20 gap-8 md:gap-[80px]">
            <FadeIn>
              <p className="uppercase mb-0" style={{ fontSize: "14px", fontWeight: 500, lineHeight: "21px", letterSpacing: "2.8px", color: "rgba(0,0,0,0.5)" }}>
                {t.whyJoin.eyebrow}
              </p>
              <div style={{ width: "64px", height: "2px", background: "#000000", marginTop: "16px" }} />
            </FadeIn>
            <div className="md:col-span-2">
              <FadeIn delay={150}>
                <h3 className="mb-8" style={{ fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 700, lineHeight: "1.25", letterSpacing: "0px", color: "#000000" }}>
                  {t.whyJoin.heading}
                </h3>
                <p className="mb-5" style={{ fontSize: "clamp(16px, 2vw, 20px)", fontWeight: 400, lineHeight: "1.625", letterSpacing: "0px", color: "rgba(0,0,0,0.7)" }}>
                  {t.whyJoin.body1}
                </p>
                <p style={{ fontSize: "clamp(15px, 1.8vw, 18px)", fontWeight: 400, lineHeight: "1.625", letterSpacing: "0px", color: "rgba(0,0,0,0.6)" }}>
                  {t.whyJoin.body2}
                </p>
              </FadeIn>
            </div>
          </div>

          {/* Bottom: 3 pillars — same grid so columns align */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-[80px]">
            {t.whyJoin.pillars.map((pillar, i) => (
              <FadeIn key={pillar.title} delay={i * 100}>
                <div>
                  <div style={{ width: "48px", height: "2px", background: "#000000", marginBottom: "20px" }} />
                  <h4 className="mb-3" style={{ fontSize: "clamp(20px, 2.5vw, 28px)", fontWeight: 700, lineHeight: "1.5", letterSpacing: "0px", color: "#000000" }}>
                    {pillar.title}
                  </h4>
                  <p style={{ fontSize: "clamp(15px, 1.8vw, 18px)", fontWeight: 400, lineHeight: "1.625", letterSpacing: "0px", color: "rgba(0,0,0,0.6)" }}>
                    {pillar.body}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT CTA ── */}
      <section className="bg-[#F8F8F8] py-16 sm:py-24 lg:py-32">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-14 xl:px-24">
          <FadeIn>
            <div className="bg-white p-8 sm:p-10" style={{ borderTop: "2px solid rgba(0,0,0,0.1)" }}>
              <p className="mb-2" style={{ fontSize: "20px", fontWeight: 700, lineHeight: "30px", color: "#000000" }}>
                {t.openApp.heading}
              </p>
              <p className="mb-8" style={{ fontSize: "16px", fontWeight: 400, lineHeight: "26px", color: "rgba(0,0,0,0.6)" }}>
                {t.openApp.body}
              </p>
              <a
                href={`mailto:${t.email}`}
                className="inline-flex items-center gap-2 bg-black text-white px-6 py-3 text-xs font-semibold tracking-widest uppercase hover:bg-slate-800 transition-colors duration-300"
              >
                {t.openApp.cta}
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

    </>
  );
}
