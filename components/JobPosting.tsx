"use client";

import Link from "next/link";
import { useEffect, useRef, useState, useCallback } from "react";
import { useInView } from "@/hooks/useInView";
import { jobs, type Job } from "@/lib/jobs";

const SECTION_GRADIENT =
  "linear-gradient(180deg, #11294E 0%, #0E223B 20%, #0C1D2E 40%, #080305 75%, #040000 100%)";

const GAP = 20;
const BASE_SPEED = 0.7;
const FAST_SPEED = 2.8;

function FadeIn({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const { ref, inView } = useInView(0.1);
  return (
    <div ref={ref} style={{ opacity: inView ? 1 : 0, transform: inView ? "translateY(0)" : "translateY(24px)", transition: `opacity 0.9s cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 0.9s cubic-bezier(0.22,1,0.36,1) ${delay}ms` }}>
      {children}
    </div>
  );
}

function SectionBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-12">
      <p style={{ fontSize: "14px", fontWeight: 500, letterSpacing: "3px", textTransform: "uppercase", color: "#000000", marginBottom: "12px" }}>{title}</p>
      <div style={{ width: "48px", height: "2px", background: "#000000", marginBottom: "24px" }} />
      {children}
    </div>
  );
}

function BulletList({ items, color = "rgba(0,0,0,0.7)" }: { items: string[]; color?: string }) {
  return (
    <ul className="space-y-3">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3">
          <span style={{ flexShrink: 0, width: "6px", height: "6px", background: "#000000", marginTop: "8px" }} />
          <span style={{ fontSize: "16px", lineHeight: "1.75", color }}>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function CheckList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3">
          <span style={{ flexShrink: 0, fontSize: "16px", fontWeight: 700, color: "#000000", lineHeight: "1.75" }}>✓</span>
          <span style={{ fontSize: "16px", lineHeight: "1.75", color: "rgba(0,0,0,0.7)" }}>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function CrossList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3">
          <span style={{ flexShrink: 0, fontSize: "16px", fontWeight: 700, color: "#E7000B", lineHeight: "1.75" }}>×</span>
          <span style={{ fontSize: "16px", lineHeight: "1.75", color: "rgba(0,0,0,0.7)" }}>{item}</span>
        </li>
      ))}
    </ul>
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
      style={{ width: "48px", height: "48px", border: "1px solid rgba(255,255,255,0.2)", background: "rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "background 0.2s ease", flexShrink: 0 }}
      onMouseDown={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.18)"; }}
      onMouseUp={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.12)"; }}
    >
      <svg width="16" height="16" fill="none" stroke="rgba(255,255,255,0.85)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" style={{ transform: dir === "right" ? "rotate(180deg)" : "none" }}>
        <path d="M15 19l-7-7 7-7" />
      </svg>
    </button>
  );
}

/* ── INFINITE JOB CAROUSEL ───────────────────────────────────────────── */
function JobCarousel({ currentSlug }: { currentSlug: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef    = useRef<HTMLDivElement>(null);
  const offsetRef   = useRef(0);
  const speedRef    = useRef(BASE_SPEED);
  const dirRef      = useRef(1);   // +1 = right, -1 = left
  const cardWRef    = useRef(360);
  const rafRef      = useRef<number | null>(null);
  const [cardWidth, setCardWidth] = useState(360);

  useEffect(() => {
    const measure = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.offsetWidth;
      const cw = Math.min(Math.floor(w * 0.76), 410);
      cardWRef.current = cw;
      setCardWidth(cw);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  useEffect(() => {
    const tick = () => {
      const ssw = jobs.length * (cardWRef.current + GAP);
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
    const ssw  = jobs.length * step;
    offsetRef.current = ((Math.floor(offsetRef.current / step) + 1) * step) % ssw;
  }, []);

  const stepLeft = useCallback(() => {
    const step = cardWRef.current + GAP;
    const ssw  = jobs.length * step;
    let next   = (Math.ceil(offsetRef.current / step) - 1) * step;
    if (next < 0) next += ssw;
    offsetRef.current = next % ssw;
  }, []);

  const looped = [...jobs, ...jobs, ...jobs];

  return (
    <div>
      <div ref={containerRef} style={{ overflow: "hidden" }}>
        <div ref={trackRef} style={{ display: "flex", gap: `${GAP}px`, willChange: "transform" }}>
          {looped.map((job, i) => (
            <Link
              key={`${job.slug}-${i}`}
              href={`/jobs/${job.slug}`}
              style={{
                flexShrink: 0,
                width: `${cardWidth}px`,
                display: "block",
                background: job.slug === currentSlug ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.08)",
                padding: "clamp(20px,3vw,32px)",
                textDecoration: "none",
                transition: "background 0.25s ease, border-color 0.25s ease",
                opacity: job.slug === currentSlug ? 0.5 : 1,
              }}
              onMouseEnter={(e) => {
                speedRef.current = 0; // pause on card hover
                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.1)";
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.18)";
              }}
              onMouseLeave={(e) => {
                speedRef.current = dirRef.current * BASE_SPEED; // resume in last direction
                (e.currentTarget as HTMLElement).style.background = job.slug === currentSlug ? "rgba(255,255,255,0.03)" : "rgba(255,255,255,0.05)";
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)";
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span style={{ fontSize: "10px", fontWeight: 600, letterSpacing: "2.5px", textTransform: "uppercase", color: "rgba(255,255,255,0.4)" }}>{job.dept}</span>
                <span style={{ color: "rgba(255,255,255,0.2)", fontSize: "10px" }}>·</span>
                <span style={{ fontSize: "10px", letterSpacing: "2px", color: "rgba(255,255,255,0.35)", border: "1px solid rgba(255,255,255,0.15)", padding: "1px 6px" }}>{job.type}</span>
              </div>
              <div style={{ width: "40px", height: "2px", background: "rgba(255,255,255,0.25)", marginBottom: "18px" }} />
              <p style={{ fontSize: "clamp(15px,1.8vw,19px)", fontWeight: 700, lineHeight: 1.35, color: "#ffffff", marginBottom: "10px" }}>{job.title}</p>
              <p style={{ fontSize: "11px", letterSpacing: "1px", color: "rgba(255,255,255,0.35)", marginBottom: "20px" }}>{job.location}</p>
              <span style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "2px", textTransform: "uppercase", color: "rgba(255,255,255,0.4)" }}>
                {job.slug === currentSlug ? "Current role" : "View Role →"}
              </span>
            </Link>
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

/* ── MAIN COMPONENT ────────────────────────────────────────────────────── */
export default function JobPosting({ job }: { job: Job }) {
  const applyHref = "#apply-form";

  return (
    <>
      {/* ── HERO ── */}
      <section className="relative flex flex-col overflow-hidden" style={{ minHeight: "100vh", background: "linear-gradient(135deg, #11294E 0%, #102749 7.14%, #0F2645 14.29%, #0F2440 21.43%, #0E223B 28.57%, #0D2037 35.71%, #0D1F32 42.86%, #0C1D2E 50%, #0C1725 57.14%, #0C121C 64.29%, #0B0C14 71.43%, #0A070C 78.57%, #080305 85.71%, #060101 92.86%, #040000 100%)" }}>
        <div className="relative flex-1 flex flex-col justify-end max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-14 xl:px-24 pb-16 sm:pb-20 lg:pb-24" style={{ paddingTop: "calc(50vh - 60px)" }}>
          <div className="mb-8">
            <Link href="/join#open-roles" className="inline-flex items-center gap-2 transition-opacity duration-200 hover:opacity-60" style={{ fontSize: "13px", fontWeight: 500, letterSpacing: "2px", textTransform: "uppercase", color: "rgba(255,255,255,0.5)" }}>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              Careers
            </Link>
          </div>

          <div className="flex flex-wrap items-center gap-3 mb-6">
            <span style={{ fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", fontWeight: 500, color: "rgba(255,255,255,0.5)" }}>{job.dept}</span>
            <span style={{ color: "rgba(255,255,255,0.25)", fontSize: "12px" }}>·</span>
            <span style={{ fontSize: "11px", letterSpacing: "2px", fontWeight: 400, color: "rgba(255,255,255,0.7)", border: "1px solid rgba(255,255,255,0.3)", padding: "2px 8px" }}>{job.type}</span>
            <span style={{ color: "rgba(255,255,255,0.25)", fontSize: "12px" }}>·</span>
            <span style={{ fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase", fontWeight: 400, color: "rgba(255,255,255,0.5)" }}>{job.location}</span>
          </div>

          <h1 className="font-bold text-white mb-10" style={{ fontSize: "clamp(36px,5vw,72px)", lineHeight: "1.05", letterSpacing: "0px", maxWidth: "820px" }}>
            {job.title}
          </h1>

          <div>
            <a href={applyHref} className="inline-flex items-center gap-2 bg-white text-black px-8 py-3.5 text-xs font-semibold tracking-widest uppercase transition-opacity duration-200 hover:opacity-80">
              Apply Now
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </a>
          </div>
        </div>
      </section>

      {/* ── CONTENT ── */}
      <section className="bg-white py-16 sm:py-24">
        <div className="max-w-[860px] mx-auto px-5 sm:px-8 relative">
          <div className="lg:float-right lg:ml-12 lg:mb-8 mb-12" style={{ width: "100%", maxWidth: "100%" }}>
            <div className="lg:w-64" style={{ background: "#f5f5f5", padding: "24px" }}>
              <div className="space-y-4 mb-6">
                <div>
                  <p style={{ fontSize: "10px", letterSpacing: "2.5px", textTransform: "uppercase", color: "rgba(0,0,0,0.4)", marginBottom: "4px" }}>Department</p>
                  <p style={{ fontSize: "14px", fontWeight: 600, color: "#000000" }}>{job.dept}</p>
                </div>
                <div>
                  <p style={{ fontSize: "10px", letterSpacing: "2.5px", textTransform: "uppercase", color: "rgba(0,0,0,0.4)", marginBottom: "4px" }}>Type</p>
                  <p style={{ fontSize: "14px", fontWeight: 600, color: "#000000" }}>{job.type}</p>
                </div>
                <div>
                  <p style={{ fontSize: "10px", letterSpacing: "2.5px", textTransform: "uppercase", color: "rgba(0,0,0,0.4)", marginBottom: "4px" }}>Location</p>
                  <p style={{ fontSize: "14px", fontWeight: 600, color: "#000000" }}>{job.location}</p>
                </div>
              </div>
              <a href={applyHref} className="flex items-center justify-center bg-black text-white w-full py-3 text-xs font-semibold tracking-widest uppercase transition-opacity duration-200 hover:opacity-70">
                Apply Now
              </a>
            </div>
          </div>

          <div style={{ width: "48px", height: "2px", background: "#000000", marginBottom: "32px" }} />
          <p className="mb-14" style={{ fontSize: "20px", lineHeight: "1.8", color: "rgba(0,0,0,0.8)" }}>{job.overview}</p>
          <div style={{ clear: "both" }} />

          <FadeIn><SectionBlock title="Responsibilities"><BulletList items={job.responsibilities} /></SectionBlock></FadeIn>
          <FadeIn delay={60}><SectionBlock title="Requirements"><BulletList items={job.requirements} /></SectionBlock></FadeIn>
          <FadeIn delay={120}><SectionBlock title="Nice to Have"><BulletList items={job.niceToHave} color="rgba(0,0,0,0.5)" /></SectionBlock></FadeIn>
          {job.forYouIf.length > 0 && <FadeIn delay={180}><SectionBlock title="This role is for you if"><CheckList items={job.forYouIf} /></SectionBlock></FadeIn>}
          {job.notForYouIf.length > 0 && <FadeIn delay={240}><SectionBlock title="This is NOT for you if"><CrossList items={job.notForYouIf} /></SectionBlock></FadeIn>}
        </div>
      </section>

      {/* ── APPLY CTA ── */}
      <section id="apply-form" className="bg-black py-20">
        <FadeIn>
          <div className="max-w-[860px] mx-auto px-5 sm:px-8 text-center">
            <h2 className="font-bold text-white mb-5" style={{ fontSize: "clamp(28px,4vw,40px)", lineHeight: "1.2" }}>Ready to build what matters?</h2>
            <p className="mb-10 mx-auto" style={{ fontSize: "18px", lineHeight: "1.65", color: "rgba(255,255,255,0.6)", maxWidth: "520px" }}>
              Send your resume and a brief introduction to apply for this role.
            </p>
            <a
              href="mailto:lloydmatias.arbiol@gmail.com"
              className="inline-flex items-center gap-2 bg-white text-black px-8 py-3.5 text-xs font-semibold tracking-widest uppercase transition-opacity duration-200 hover:opacity-80"
            >
              Apply via Email
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </a>
            <div className="mt-10">
              <Link href="/join#open-roles" className="inline-flex items-center gap-2 text-sm tracking-widest uppercase transition-opacity duration-200 hover:opacity-60" style={{ color: "rgba(255,255,255,0.5)" }}>
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                View all open roles
              </Link>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ── MORE ROLES ── */}
      <section style={{ background: SECTION_GRADIENT }} className="py-20 sm:py-24 lg:py-32">
        <div className="max-w-[1400px] mx-auto px-5 sm:px-8 lg:px-16 xl:px-24">
          <FadeIn>
            <p style={{ fontSize: "14px", fontWeight: 500, letterSpacing: "2.8px", textTransform: "uppercase", color: "rgba(255,255,255,0.5)", marginBottom: "16px" }}>More Roles</p>
            <div style={{ width: "64px", height: "2px", background: "#fff", marginBottom: "48px" }} />
          </FadeIn>

          <JobCarousel currentSlug={job.slug} />

          <div className="mt-16">
            <Link href="/join#open-roles" className="inline-flex items-center gap-2 transition-colors duration-200 hover:text-white" style={{ fontSize: "13px", fontWeight: 500, letterSpacing: "2px", textTransform: "uppercase", color: "rgba(255,255,255,0.4)" }}>
              <span>←</span><span>Back to Careers</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
