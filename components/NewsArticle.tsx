"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { useInView } from "@/hooks/useInView";
import { articles, type Article } from "@/lib/articles";

const SECTION_GRADIENT =
  "linear-gradient(180deg, #11294E 0%, #0E223B 20%, #0C1D2E 40%, #080305 75%, #040000 100%)";

const GAP = 20;
const BASE_SPEED = 0.7;
const FAST_SPEED = 2.8;

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

/* ── ARROW BUTTON ────────────────────────────────────────────────────── */
function ArrowBtn({
  dir,
  onClick,
  onMouseEnter,
  onMouseLeave,
}: {
  dir: "left" | "right";
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}) {
  return (
    <button
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{
        width: "48px",
        height: "48px",
        border: "1px solid rgba(255,255,255,0.2)",
        background: "rgba(255,255,255,0.06)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        transition: "background 0.2s ease, border-color 0.2s ease",
        flexShrink: 0,
      }}
      onMouseDown={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.18)"; }}
      onMouseUp={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.12)"; }}
    >
      <svg
        width="16" height="16"
        fill="none" stroke="rgba(255,255,255,0.85)"
        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
        viewBox="0 0 24 24"
        style={{ transform: dir === "right" ? "rotate(180deg)" : "none" }}
      >
        <path d="M15 19l-7-7 7-7" />
      </svg>
    </button>
  );
}

/* ── MEDIA SLIDESHOW ─────────────────────────────────────────────────── */
function MediaSlideshow() {
  const [active, setActive] = useState(0);
  const TOTAL = 3;
  const INTERVAL = 6000;

  useEffect(() => {
    const t = setInterval(() => setActive((p) => (p + 1) % TOTAL), INTERVAL);
    return () => clearInterval(t);
  }, []);

  return (
    <div>
      <div style={{ width: "100%", height: "clamp(280px,45vw,560px)", position: "relative", overflow: "hidden", border: "1px solid rgba(255,255,255,0.06)" }}>
        {Array.from({ length: TOTAL }).map((_, i) => (
          <div
            key={i}
            style={{
              position: "absolute", inset: 0,
              display: "flex", alignItems: "center", justifyContent: "center",
              background: i === 0 ? "#131313" : i === 1 ? "#0f0f0f" : "#151515",
              opacity: i === active ? 1 : 0,
              transition: "opacity 0.9s ease",
              pointerEvents: i === active ? "auto" : "none",
            }}
          >
            <span style={{ fontSize: "13px", fontWeight: 500, letterSpacing: "3px", textTransform: "uppercase", color: "rgba(255,255,255,0.18)" }}>
              [ IMAGE {i + 1} ]
            </span>
          </div>
        ))}
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "2px", background: "rgba(255,255,255,0.1)" }}>
          <div key={active} style={{ height: "100%", background: "rgba(255,255,255,0.6)", transformOrigin: "left", animation: `mediaProgress ${INTERVAL}ms linear` }} />
        </div>
      </div>
      <div className="flex gap-3 mt-3">
        {Array.from({ length: TOTAL }).map((_, i) => (
          <button key={i} onClick={() => setActive(i)} style={{ width: "90px", height: "58px", background: i === active ? "#222" : "#181818", border: i === active ? "1px solid rgba(255,255,255,0.4)" : "1px solid rgba(255,255,255,0.06)", flexShrink: 0, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.3s ease" }}>
            <span style={{ fontSize: "10px", letterSpacing: "1px", color: i === active ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.15)" }}>{i + 1}</span>
          </button>
        ))}
      </div>
      <style>{`@keyframes mediaProgress { from{transform:scaleX(0)} to{transform:scaleX(1)} }`}</style>
    </div>
  );
}

/* ── INFINITE ARTICLE CAROUSEL ───────────────────────────────────────── */
function ArticleCarousel({ currentSlug }: { currentSlug: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef    = useRef<HTMLDivElement>(null);
  const offsetRef   = useRef(0);
  const speedRef    = useRef(BASE_SPEED);
  const dirRef      = useRef(1);   // +1 = right, -1 = left
  const cardWRef    = useRef(380);
  const rafRef      = useRef<number | null>(null);
  const [cardWidth, setCardWidth] = useState(380);

  /* Measure */
  useEffect(() => {
    const measure = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.offsetWidth;
      const cw = Math.min(Math.floor(w * 0.76), 430);
      cardWRef.current = cw;
      setCardWidth(cw);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  /* RAF loop — runs once, reads refs */
  useEffect(() => {
    const tick = () => {
      const ssw = articles.length * (cardWRef.current + GAP);
      offsetRef.current += speedRef.current;
      if (offsetRef.current >= ssw) offsetRef.current -= ssw;
      if (offsetRef.current < 0)    offsetRef.current += ssw;
      if (trackRef.current) trackRef.current.style.transform = `translateX(-${offsetRef.current}px)`;
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current != null) cancelAnimationFrame(rafRef.current); };
  }, []);

  const stepRight = useCallback(() => {
    const step = cardWRef.current + GAP;
    const ssw  = articles.length * step;
    offsetRef.current = ((Math.floor(offsetRef.current / step) + 1) * step) % ssw;
  }, []);

  const stepLeft = useCallback(() => {
    const step = cardWRef.current + GAP;
    const ssw  = articles.length * step;
    let next   = (Math.ceil(offsetRef.current / step) - 1) * step;
    if (next < 0) next += ssw;
    offsetRef.current = next % ssw;
  }, []);

  /* Triple items for seamless loop */
  const looped = [...articles, ...articles, ...articles];

  return (
    <div>
      <div ref={containerRef} style={{ overflow: "hidden" }}>
        <div ref={trackRef} style={{ display: "flex", gap: `${GAP}px`, willChange: "transform" }}>
          {looped.map((article, i) => (
            <a
              key={`${article.slug}-${i}`}
              href={`/news/${article.slug}`}
              style={{
                flexShrink: 0,
                width: `${cardWidth}px`,
                display: "block",
                background: article.slug === currentSlug ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.08)",
                padding: "clamp(20px,3vw,32px)",
                textDecoration: "none",
                transition: "background 0.25s ease, border-color 0.25s ease",
                opacity: article.slug === currentSlug ? 0.5 : 1,
              }}
              onMouseEnter={(e) => {
                speedRef.current = 0; // pause on card hover
                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.1)";
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.18)";
              }}
              onMouseLeave={(e) => {
                speedRef.current = dirRef.current * BASE_SPEED; // resume in last direction
                (e.currentTarget as HTMLElement).style.background = article.slug === currentSlug ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.05)";
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)";
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "2.5px", textTransform: "uppercase", color: "rgba(255,255,255,0.4)" }}>{article.tag}</span>
                <span style={{ color: "rgba(255,255,255,0.2)", fontSize: "10px" }}>/</span>
                <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.35)" }}>{article.date}</span>
              </div>
              <div style={{ width: "40px", height: "2px", background: "rgba(255,255,255,0.25)", marginBottom: "18px" }} />
              <p style={{ fontSize: "clamp(16px,2vw,20px)", fontWeight: 700, lineHeight: 1.35, color: "#ffffff", marginBottom: "20px" }}>
                {article.title}
              </p>
              <span style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "2px", textTransform: "uppercase", color: "rgba(255,255,255,0.4)" }}>
                {article.slug === currentSlug ? "Current article" : "Read More →"}
              </span>
            </a>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "10px", marginTop: "28px" }}>
        <ArrowBtn
          dir="left"
          onClick={stepLeft}
          onMouseEnter={() => { dirRef.current = -1; speedRef.current = -FAST_SPEED; }}
          onMouseLeave={() => { speedRef.current = dirRef.current * BASE_SPEED; }}
        />
        <ArrowBtn
          dir="right"
          onClick={stepRight}
          onMouseEnter={() => { dirRef.current = 1; speedRef.current = FAST_SPEED; }}
          onMouseLeave={() => { speedRef.current = dirRef.current * BASE_SPEED; }}
        />
      </div>
    </div>
  );
}

/* ── MAIN COMPONENT ──────────────────────────────────────────────────── */
export default function NewsArticle({ article }: { article: Article }) {
  return (
    <main>
      {/* ── HERO ── */}
      <section className="relative min-h-screen bg-black flex flex-col justify-end overflow-hidden">
        <div className="absolute inset-0 bg-[#0d0d0d]">
          <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "linear-gradient(to right, #94a3b8 1px, transparent 1px), linear-gradient(to bottom, #94a3b8 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
          <div className="absolute inset-0 flex items-center justify-center">
            <span style={{ fontSize: "13px", fontWeight: 500, letterSpacing: "3px", textTransform: "uppercase", color: "rgba(255,255,255,0.18)" }}>[HEADLINE IMAGE]</span>
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
        </div>

        <div className="relative max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-16 xl:px-24 w-full pb-16 sm:pb-20 lg:pb-24 pt-32">
          <div className="mb-8">
            <a href="/#newsroom" style={{ fontSize: "13px", fontWeight: 500, letterSpacing: "2px", textTransform: "uppercase", color: "rgba(255,255,255,0.5)" }} className="hover:text-white transition-colors duration-200 inline-flex items-center gap-2">
              <span>←</span><span>Newsroom</span>
            </a>
          </div>
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "2.4px", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", border: "1px solid rgba(255,255,255,0.2)", padding: "4px 10px" }}>{article.tag}</span>
            <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.45)" }}>{article.date}</span>
            <span style={{ color: "rgba(255,255,255,0.2)", fontSize: "13px" }}>/</span>
            <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.45)" }}>{article.location}</span>
          </div>
          <h1 style={{ fontSize: "clamp(36px,5.5vw,64px)", fontWeight: 700, lineHeight: 1.1, color: "#ffffff", maxWidth: "800px", letterSpacing: "-0.5px" }}>
            {article.title}
          </h1>
        </div>
      </section>

      {/* ── ARTICLE BODY ── */}
      <section className="bg-white py-20 sm:py-28 lg:py-32">
        <div className="max-w-[780px] mx-auto px-5 sm:px-8 lg:px-10">
          <FadeIn>
            <div style={{ width: "48px", height: "3px", background: "#000", marginBottom: "48px" }} />
          </FadeIn>
          <div className="flex flex-col" style={{ gap: "28px" }}>
            {article.body.map((para, i) => {
              const isPullQuote = i === 1;
              return (
                <FadeIn key={i} delay={i * 60}>
                  {isPullQuote ? (
                    <p style={{ fontSize: "20px", fontStyle: "italic", lineHeight: 1.8, color: "rgba(0,0,0,0.8)", borderLeft: "3px solid #000", paddingLeft: "24px" }}>{para}</p>
                  ) : (
                    <p style={{ fontSize: "18px", lineHeight: 1.8, color: "rgba(0,0,0,0.8)" }}>{para}</p>
                  )}
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── MEDIA SLIDESHOW ── */}
      {article.hasImages && (
        <section className="bg-[#0a0a0a] py-20 sm:py-24">
          <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-16 xl:px-24">
            <FadeIn>
              <p style={{ fontSize: "14px", fontWeight: 500, letterSpacing: "2.8px", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: "16px" }}>Media</p>
              <div style={{ width: "48px", height: "2px", background: "#fff", marginBottom: "40px" }} />
              <MediaSlideshow />
            </FadeIn>
          </div>
        </section>
      )}

      {/* ── MORE UPDATES ── */}
      <section style={{ background: SECTION_GRADIENT }} className="py-20 sm:py-24 lg:py-32">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-16 xl:px-24">
          <FadeIn>
            <p style={{ fontSize: "14px", fontWeight: 500, letterSpacing: "2.8px", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: "16px" }}>More Updates</p>
            <div style={{ width: "64px", height: "2px", background: "#fff", marginBottom: "48px" }} />
          </FadeIn>

          <ArticleCarousel currentSlug={article.slug} />

          <div className="mt-16">
            <a href="/" style={{ fontSize: "13px", fontWeight: 500, letterSpacing: "2px", textTransform: "uppercase", color: "rgba(255,255,255,0.4)" }} className="hover:text-white transition-colors duration-200 inline-flex items-center gap-2">
              <span>←</span><span>Back to Home</span>
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
