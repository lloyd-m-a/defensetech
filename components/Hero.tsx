"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { content } from "@/lib/content";
import { useInView } from "@/hooks/useInView";
import ScrollIndicator from "@/components/ScrollIndicator";
import CountUp from "@/components/CountUp";
import { articles } from "@/lib/articles";



function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, inView } = useInView(0.1);
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

const SLIDE_IMAGES = [
  "/Image Applications (slide 2).jpg",
  "/Image Applications (slide 1).jpg",
  "/Image Applications (slide 3).jpg",
];

export default function Hero() {
  const t = content.en.hero;
  const sectionRef = useRef<HTMLElement>(null);
  const [scrollOpacity, setScrollOpacity] = useState(1);
  const [activeSlide, setActiveSlide] = useState(0);
  const [progressKey, setProgressKey] = useState(0);
  const slideRef = useRef(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  // Vimeo background video IDs
  // homepage: 1185630855 | cal15x: 1185630890
  const [videoReady, setVideoReady] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVideoReady(true), 1500);
    return () => clearTimeout(t);
  }, []);

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

  const slides = t.useCases.slides;

  const goToSlide = useCallback((next: number) => {
    slideRef.current = next;
    setActiveSlide(next);
    setProgressKey(k => k + 1);
  }, []);

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      const next = (slideRef.current + 1) % slides.length;
      goToSlide(next);
    }, 6000);
  }, [goToSlide, slides.length]);

  useEffect(() => {
    resetTimer();
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [resetTimer]);

  return (
    <>
      {/* ── HOMEPAGE HERO ── */}
      <section
        ref={sectionRef}
        className="relative min-h-screen flex flex-col justify-end bg-slate-950 overflow-hidden pt-16"
      >
        {/* Vimeo background — same structure as About page */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ opacity: 1 }} aria-hidden="true">
          <img
            src="/poster-home.webp"
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
          <iframe
            src="https://player.vimeo.com/video/1185630855?badge=0&autopause=0&autoplay=1&muted=1&loop=1&background=1&app_id=58479"
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
            title="Hero background video"
          />
        </div>
        <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-sky-700/50 to-transparent" />
        <ScrollIndicator />
        <div
          className="relative max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 w-full flex-1 flex flex-col justify-center py-20 sm:py-28 md:py-36"
          style={{ opacity: scrollOpacity, transition: "opacity 0.1s linear" }}
        >
          <div className="max-w-3xl">
            {t.label && (
              <p className="animate-fade-in-up animate-delay-100 text-[13px] sm:text-[14px] font-medium leading-[21px] tracking-[3px] sm:tracking-[4.2px] uppercase text-white/50 mb-5 sm:mb-6">
                {t.label}
              </p>
            )}
            <h1 className="mb-6 sm:mb-8">
              <span className="animate-fade-in-up animate-delay-250 block text-[44px] sm:text-[58px] lg:text-[72px] font-bold leading-[1.05] tracking-[0px] text-white hero-headline">
                {t.headlineA}
              </span>
              <span className="animate-fade-in-up animate-delay-250 block text-[44px] sm:text-[58px] lg:text-[72px] font-bold leading-[1.05] tracking-[0px] text-white hero-headline">
                {t.headlineB}
              </span>
            </h1>
            <p className="animate-fade-in-up animate-delay-450 text-[18px] sm:text-[20px] lg:text-[24px] font-normal leading-[1.6] tracking-[0px] text-white/75 mb-10 max-w-[674px]">
              {t.sub}
            </p>
          </div>
        </div>
      </section>

      {/* ── REAL CAPABILITIES ── */}
      <section className="bg-white py-20 sm:py-28 lg:py-32">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 w-full">
          <div className="grid md:grid-cols-[200px_1fr] gap-10 lg:gap-16 items-start">
            <FadeIn>
              <p className="uppercase mb-0" style={{ fontSize: "14px", fontWeight: 500, lineHeight: "21px", letterSpacing: "2.8px", color: "rgba(0,0,0,0.5)" }}>
                {t.capabilities.eyebrow}
              </p>
              <div style={{ width: "64px", height: "2px", background: "#000", marginTop: "16px" }} />
            </FadeIn>
            <FadeIn delay={150}>
              <h3 className="text-slate-900 font-bold mb-6 text-[32px] sm:text-[40px] lg:text-[48px] leading-[1.25]">
                {t.capabilities.heading}
              </h3>
              <p className="text-slate-900 mb-5 max-w-[740px] text-[17px] sm:text-[20px] leading-[1.65]">{t.capabilities.body1}</p>
              <p className="text-slate-500 mb-5 max-w-[740px] text-[15px] sm:text-[16px] leading-[1.7]">{t.capabilities.body2}</p>
              <p className="text-slate-500 mb-10 max-w-[740px] text-[15px] sm:text-[16px] leading-[1.7]">{t.capabilities.body3}</p>
              <a
                href="/mission#mission"
                className="group inline-flex items-center gap-3 border border-slate-900 px-5 py-3 text-xs font-semibold tracking-[2px] uppercase text-slate-900 hover:bg-black hover:text-white hover:translate-x-2 transition-all duration-300"
              >
                {t.capabilities.cta}
                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section className="bg-black py-16 sm:py-20">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
          <FadeIn>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-12 lg:gap-16">
              {t.statsBar.map((stat) => (
                <div key={stat.label} className="flex flex-col justify-center" style={{ borderTop: "2px solid rgba(255,255,255,0.2)", paddingTop: "24px" }}>
                  <CountUp
                    value={stat.value}
                    className="block font-bold text-white"
                    style={{ fontSize: "clamp(36px, 5vw, 56px)", lineHeight: "1" }}
                  />
                  <p className="text-white mt-3 text-[14px] sm:text-[16px] leading-[1.5]" style={{ opacity: 0.6 }}>{stat.subtitle}</p>
                  <p className="text-white uppercase mt-1 text-[11px] sm:text-[12px] tracking-[0.6px]" style={{ opacity: 0.4 }}>{stat.label}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── VESSEL FEATURE ── */}
      <section className="bg-white py-20 sm:py-28 lg:py-32">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 w-full">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
            <FadeIn>
              <p className="uppercase mb-0" style={{ fontSize: "14px", fontWeight: 500, lineHeight: "21px", letterSpacing: "2.8px", color: "rgba(0,0,0,0.5)" }}>
                {t.platform.eyebrow}
              </p>
              <div style={{ width: "64px", height: "2px", background: "#000000", marginTop: "16px", marginBottom: "32px" }} />
              <img src="/Image (CARAVEL Logo).svg" alt="Carabao" className="h-8 w-auto mb-6 object-left" />
              <h3 className="font-bold text-slate-900 leading-tight mb-5 whitespace-pre-line text-[26px] sm:text-[30px] lg:text-[34px]">
                {t.platform.heading}
              </h3>
              <p className="text-slate-500 leading-loose mb-8 text-[14px] sm:text-[15px]">{t.platform.body}</p>
              <a href="/vessel" className="inline-flex items-center gap-2 border border-slate-900 px-5 py-2.5 text-xs font-semibold tracking-widest uppercase text-slate-900 hover:bg-slate-900 hover:text-white transition-colors duration-300">
                {t.platform.cta} &rsaquo;
              </a>
            </FadeIn>
            <FadeIn delay={150}>
              <div className="w-full aspect-[4/3] relative overflow-hidden">
                <img src="/Image (CARAVEL 35).webp" alt="Carabao vessel" className="absolute inset-0 w-full h-full object-cover" loading="lazy" />
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── DISTRIBUTED MARITIME ── */}
      <section className="relative min-h-[60vh] sm:min-h-screen overflow-hidden bg-slate-900 flex flex-col justify-end">
        {/* Vimeo background — Cal15x */}
        <div className="absolute overflow-hidden pointer-events-none" style={{ top: 0, left: 0, right: 0, bottom: "-150px" }} aria-hidden="true">
          <img
            src="/poster-cal15x.webp"
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
            src="https://player.vimeo.com/video/1185630890?badge=0&autopause=0&autoplay=1&muted=1&loop=1&background=1&app_id=58479"
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
            title="Cal15x background video"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent" />
        <div className="relative max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 w-full pb-16 sm:pb-24">
          <FadeIn>
            <p className="text-xs font-semibold tracking-[3px] uppercase text-slate-400 mb-4">{t.distributed.eyebrow}</p>
            <div className="w-8 h-px bg-slate-600 mb-8" />
            <h3 className="font-bold text-white mb-4 max-w-2xl leading-tight text-[28px] sm:text-[38px] lg:text-[48px]">{t.distributed.heading}</h3>
            <p className="text-white/75 max-w-lg leading-relaxed text-[15px] sm:text-[16px]">{t.distributed.body}</p>
          </FadeIn>
        </div>
      </section>

      {/* ── CRITICAL MISSIONS ── */}
      <section className="bg-black pt-20 sm:pt-28 lg:pt-36 pb-16 sm:pb-20">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16">
          <FadeIn>
            <p className="text-center uppercase mb-4" style={{ fontSize: "14px", lineHeight: "21px", letterSpacing: "2.8px", fontWeight: 500, color: "rgba(255,255,255,0.5)" }}>
              {t.useCases.eyebrow}
            </p>
            <h3 className="text-center text-white mb-12 sm:mb-16 text-[32px] sm:text-[40px] lg:text-[48px] leading-[1.25] font-bold">
              {t.useCases.heading}
            </h3>
          </FadeIn>
          <FadeIn delay={100}>
            <div className="relative overflow-hidden rounded-[6px]" style={{ height: "clamp(280px, 45vw, 600px)" }}>
              <div className="absolute inset-0">
                <img src={SLIDE_IMAGES[activeSlide]} alt={slides[activeSlide].title} className="absolute inset-0 w-full h-full object-cover" />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
              <div className="absolute bottom-0 left-0 px-6 sm:px-10 pb-4 sm:pb-24 pt-6">
                <h4 className="text-white font-bold mb-2 sm:mb-3 text-[18px] sm:text-[32px] lg:text-[40px] leading-[1.2]">{slides[activeSlide].title}</h4>
                <p className="text-white/60 max-w-lg leading-relaxed text-[14px] sm:text-[16px]">{slides[activeSlide].sub}</p>
              </div>
              <button onClick={() => { goToSlide((activeSlide - 1 + slides.length) % slides.length); resetTimer(); }} className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center transition-colors duration-200 focus:outline-none z-10">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              </button>
              <button onClick={() => { goToSlide((activeSlide + 1) % slides.length); resetTimer(); }} className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center transition-colors duration-200 focus:outline-none z-10">
                <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
            <div className="relative w-full mt-5 mb-5" style={{ height: "2px", background: "rgba(255,255,255,0.15)" }}>
              <div key={progressKey} className="absolute top-0 left-0 h-full bg-white animate-slide-progress" />
            </div>
            <div className="flex justify-center gap-2 sm:gap-3 mt-2">
              {slides.map((slide, i) => (
                <button key={i} onClick={() => { goToSlide(i); resetTimer(); }} className={`relative overflow-hidden rounded transition-all duration-300 focus:outline-none ${i === activeSlide ? "ring-2 ring-white opacity-100" : "opacity-50 hover:opacity-75"}`} style={{ flex: "1 1 0", maxWidth: "100px", height: "clamp(40px, 6vw, 64px)" }} aria-label={slide.title}>
                  <img src={SLIDE_IMAGES[i]} alt={slide.title} className="absolute inset-0 w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── NEWSROOM ── */}
      <section className="bg-white pt-20 sm:pt-28 lg:pt-40 pb-16 sm:pb-20">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-24">
          <FadeIn>
            <p className="uppercase" style={{ fontSize: "14px", fontWeight: 500, lineHeight: "21px", letterSpacing: "2.8px", color: "#000000" }}>
              {t.newsroom.eyebrow}
            </p>
            <div style={{ width: "64px", height: "2px", background: "#000000", marginTop: "16px", marginBottom: "40px" }} />
            <h3 className="mb-10 sm:mb-14 font-bold text-[44px] sm:text-[56px] lg:text-[64px] leading-[1.25] text-black">
              {t.newsroom.heading}
            </h3>
          </FadeIn>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-16">
            {t.newsroom.articles.map((article, i) => (
              <FadeIn key={article.title} delay={i * 100}>
                <div
                  style={{ display: "block", color: "inherit" }}
                  className="group/card"
                >
                  <p style={{ fontSize: "12px", fontWeight: 400, lineHeight: "18px", letterSpacing: "0.6px", textTransform: "uppercase", color: "rgba(0,0,0,0.4)" }}>{article.tag}</p>
                  <p className="mt-1" style={{ fontSize: "14px", fontWeight: 400, lineHeight: "21px", color: "rgba(0,0,0,0.5)" }}>{article.date}</p>
                  <div style={{ width: "64px", height: "2px", background: "#000000", marginTop: "24px", marginBottom: "24px" }} />
                  <h4 className="group-hover/card:opacity-60 transition-opacity duration-200" style={{ fontSize: "clamp(20px,2.5vw,28px)", fontWeight: 700, lineHeight: "1.25", color: "#000000", marginBottom: "16px" }}>{article.title}</h4>
                  <p style={{ fontSize: "16px", fontWeight: 400, lineHeight: "26px", color: "rgba(0,0,0,0.7)", marginBottom: "32px" }}>{article.excerpt}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── CAREERS CTA ── */}
      <section className="bg-black pt-20 sm:pt-28 lg:pt-40 pb-16 sm:pb-20">
        <div className="max-w-[1400px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-24">
          <div className="grid lg:grid-cols-2 gap-14 lg:gap-24 items-start">
            <FadeIn>
              <p className="uppercase" style={{ fontSize: "14px", fontWeight: 500, lineHeight: "21px", letterSpacing: "2.8px", color: "rgba(255,255,255,0.5)" }}>
                {t.bottomCta.eyebrow}
              </p>
              <div style={{ width: "64px", height: "2px", background: "#FFFFFF", marginTop: "16px", marginBottom: "40px" }} />
              <h3 className="font-bold text-white whitespace-pre-line mb-8" style={{ fontSize: "clamp(38px,4.5vw,56px)", lineHeight: "1.25", maxWidth: "578px" }}>
                {t.bottomCta.heading}
              </h3>
              <p className="mb-10 text-[16px] sm:text-[18px] lg:text-[20px] leading-[1.625]" style={{ color: "rgba(255,255,255,0.7)", maxWidth: "520px" }}>
                {t.bottomCta.body}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="/join#open-roles" className="inline-flex items-center gap-3 border border-white px-6 py-3 text-xs font-semibold tracking-[2px] uppercase text-white hover:bg-white hover:text-black transition-all duration-300">
                  {t.bottomCta.btn1}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M12 5l7 7-7 7" /></svg>
                </a>
                <a href="/about#team" className="inline-flex items-center gap-3 border border-white/30 px-6 py-3 text-xs font-semibold tracking-[2px] uppercase text-white/70 hover:border-white hover:text-white transition-all duration-300">
                  {t.bottomCta.btn2}
                </a>
              </div>
            </FadeIn>
            <FadeIn delay={150}>
              <div className="flex flex-col mt-2 lg:mt-4">
                {t.bottomCta.roles.map((item) => (
                  <div key={item.cat} className="py-6 sm:py-7" style={{ borderTop: "1px solid rgba(255,255,255,0.1)" }}>
                    <p style={{ fontSize: "clamp(16px,2vw,20px)", fontWeight: 600, lineHeight: "1.4", color: "#FFFFFF", marginBottom: "8px" }}>{item.cat}</p>
                    <p style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "2px", textTransform: "uppercase", color: "rgba(255,255,255,0.3)" }}>{item.roles}</p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  );
}
