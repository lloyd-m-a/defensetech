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

export default function About() {
  const t = content.en.about;
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
        id="about"
        className="relative min-h-screen flex flex-col overflow-hidden bg-black"
      >
        {/* Generic war vessel background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ opacity: 0.65 }} aria-hidden="true">
          <img
            src="/about_us_page.webp"
            alt=""
            fetchPriority="high"
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
        </div>
        <ScrollIndicator />
        <div
          className="relative max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 w-full flex-1 flex flex-col justify-center py-20 sm:py-28 md:py-36"
          style={{
            opacity: scrollOpacity,
            transition: "opacity 0.1s linear",
          }}
        >
          <div className="max-w-3xl">
            <p className="animate-fade-in-up animate-delay-100 text-[14px] font-medium leading-[21px] tracking-[4.2px] uppercase text-white/50 mb-6">
              {t.label}
            </p>
            <h2 className="mb-8" style={{ maxWidth: "856px" }}>
              <span className="animate-fade-in-up animate-delay-250 block text-[36px] sm:text-[48px] lg:text-[64px] font-bold leading-[1.1] tracking-[0px] text-white hero-headline">{t.headlineA}</span>
            </h2>
            <p className="animate-fade-in-up animate-delay-450 text-[18px] sm:text-[20px] lg:text-[24px] font-normal leading-[1.625] tracking-[0px] max-w-[647px]" style={{ color: "rgba(255,255,255,0.8)" }}>
              {t.body1}
            </p>
          </div>
        </div>
      </section>

      {/* ── MISSION STATEMENT ── */}
      <section className="bg-white flex items-center py-16 sm:py-20 lg:py-28">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-14 xl:px-24 w-full">
          <div className="grid md:grid-cols-[200px_1fr] gap-10 md:gap-20 items-start">
            <FadeIn>
              <p
                className="uppercase mb-0"
                style={{ fontSize: "14px", fontWeight: 500, lineHeight: "21px", letterSpacing: "2.8px", color: "rgba(0,0,0,0.5)" }}
              >
                {t.missionStatement.eyebrow}
              </p>
              <div style={{ width: "64px", height: "2px", background: "#000000", marginTop: "16px" }} />
            </FadeIn>
            <FadeIn delay={150}>
              <p
                className="mb-8"
                style={{ fontSize: "clamp(22px, 3vw, 32px)", fontWeight: 400, lineHeight: "1.625", letterSpacing: "0px", color: "#000000" }}
              >
                {t.missionStatement.body1}
              </p>
              <p
                style={{ fontSize: "clamp(16px, 2vw, 20px)", fontWeight: 400, lineHeight: "1.625", letterSpacing: "0px", color: "rgba(0,0,0,0.7)" }}
              >
                {t.missionStatement.body2}
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── FOUNDED ── */}
      <section className="flex items-center py-16 sm:py-20" style={{ background: "#F8F8F8" }}>
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-14 xl:px-24 w-full">
          <div className="grid md:grid-cols-2 gap-10 md:gap-20 items-center">
            <FadeIn>
              <p
                className="uppercase mb-3"
                style={{ fontSize: "14px", fontWeight: 500, lineHeight: "21px", letterSpacing: "2.8px", color: "rgba(0,0,0,0.5)" }}
              >
                {t.founded.eyebrow}
              </p>
              <p
                className="leading-none"
                style={{ fontSize: "clamp(72px, 14vw, 160px)", fontWeight: 700, lineHeight: "1", letterSpacing: "0px", color: "#000000" }}
              >
                {t.founded.year}
              </p>
            </FadeIn>
            <FadeIn delay={150}>
              <p
                style={{ fontSize: "clamp(18px, 2.5vw, 24px)", fontWeight: 400, lineHeight: "1.625", letterSpacing: "0px", color: "rgba(0,0,0,0.7)" }}
              >
                {t.founded.body}
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── VALUES ── */}
      <section className="bg-white py-16 sm:py-24 lg:py-32">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-14 xl:px-24">
          <FadeIn>
            <p
              className="uppercase mb-0"
              style={{ fontSize: "14px", fontWeight: 500, lineHeight: "21px", letterSpacing: "2.8px", color: "rgba(0,0,0,0.5)" }}
            >
              {t.valuesSection.eyebrow}
            </p>
            <div style={{ width: "64px", height: "2px", background: "#000000", marginTop: "16px", marginBottom: "40px" }} />
            <h3
              className="mb-10 md:mb-14"
              style={{ fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 700, lineHeight: "1.25", letterSpacing: "0px", color: "#000000" }}
            >
              {t.valuesSection.heading}
            </h3>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 md:gap-[80px]">
            {t.valuesSection.items.map((val, i) => (
              <FadeIn key={val.title} delay={i * 80}>
                <div
                  className="group cursor-default"
                  style={{
                    borderTop: "2px solid #000000",
                    paddingTop: "42px",
                    display: "flex",
                    flexDirection: "column",
                    gap: "24px",
                    transition: "transform 0.4s cubic-bezier(0.22,1,0.36,1)",
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLDivElement).style.transform = "translateX(10px)"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLDivElement).style.transform = "translateX(0)"; }}
                >
                  <h4 style={{ fontSize: "clamp(26px, 3.5vw, 40px)", fontWeight: 700, lineHeight: "1.5", letterSpacing: "0px", color: "#0F2440" }}>
                    {val.title}
                  </h4>
                  <p style={{ fontSize: "clamp(15px, 1.8vw, 18px)", fontWeight: 400, lineHeight: "1.625", letterSpacing: "0px", color: "rgba(0,0,0,0.7)" }}>
                    {val.body}
                  </p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── OUR TEAM ── hidden until ready */}
      <section id="team" className="hidden">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-14 xl:px-24">
          <FadeIn>
            <p
              className="uppercase"
              style={{ fontSize: "14px", fontWeight: 500, lineHeight: "21px", letterSpacing: "2.8px", color: "rgba(255,255,255,0.5)" }}
            >
              {t.team.eyebrow}
            </p>
            <div style={{ width: "64px", height: "2px", background: "#FFFFFF", marginTop: "16px", marginBottom: "40px" }} />
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-14">{t.team.heading}</h3>
          </FadeIn>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-[80px]">
            {t.team.members.map((person, i) => {
              const images = [
                "/Image (Nhat Lieu).svg",
                "/Image (Yuta Shiina).svg",
                "/Image (Isaac Anderson).svg",
                "/Image (Ben Galendez).svg",
                "/Image (Ezana Mesfin).svg",
              ];
              return (
              <FadeIn key={person.name} delay={i * 80}>
                <div className="group">
                  {/* Photo with bottom fade on hover */}
                  <div className="w-full aspect-[3/4] bg-slate-900 overflow-hidden relative">
                    <img
                      src={images[i]}
                      alt={person.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  {/* Underbar: 48px default, grows to 100px on group-hover via Tailwind */}
                  <div className="mt-5 overflow-hidden">
                    <div className="h-[2px] bg-white w-12 group-hover:w-[100px] transition-all duration-300 ease-out" />
                  </div>
                  <div className="pt-4">
                    <p className="mb-1" style={{ fontSize: "clamp(20px, 2.5vw, 28px)", fontWeight: 700, lineHeight: "1.5", color: "#FFFFFF" }}>
                      {person.name}
                    </p>
                    <p className="mb-3" style={{ fontSize: "15px", fontWeight: 400, lineHeight: "24.38px", color: "rgba(255,255,255,0.6)" }}>
                      {person.role}
                    </p>
                    <div className="flex gap-3">
                      <a href="#" className="text-slate-700 hover:text-white transition-colors duration-200">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.258 5.63L18.244 2.25z"/></svg>
                      </a>
                      <a href="#" className="text-slate-700 hover:text-white transition-colors duration-200">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                      </a>
                    </div>
                  </div>
                </div>
              </FadeIn>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
