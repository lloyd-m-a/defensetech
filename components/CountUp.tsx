"use client";

import React, { useEffect, useRef, useState } from "react";

// Parses a stat string into its numeric and suffix parts.
// e.g. "1,000+" → { num: 1000, suffix: "+", hasComma: true }
//      "100%"   → { num: 100,  suffix: "%", hasComma: false }
//      "24/7"   → null (non-countable, render as-is)
function parse(raw: string): { num: number; suffix: string; hasComma: boolean } | null {
  const trimmed = raw.trim();
  // Skip values that start with a letter or contain "/" — not simple integers
  if (/^[A-Za-z]/.test(trimmed) || trimmed.includes("/")) return null;
  const match = trimmed.match(/^([0-9,]+)(.*)$/);
  if (!match) return null;
  const numStr = match[1];
  const suffix = match[2];
  const hasComma = numStr.includes(",");
  const num = parseInt(numStr.replace(/,/g, ""), 10);
  if (isNaN(num) || num === 0) return null;
  return { num, suffix, hasComma };
}

interface CountUpProps {
  value: string;
  className?: string;
  style?: React.CSSProperties;
  duration?: number; // ms, default 2000
}

export default function CountUp({ value, className, style, duration = 2000 }: CountUpProps) {
  const parsed = parse(value);
  const ref = useRef<HTMLSpanElement>(null);
  const [displayed, setDisplayed] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (!parsed) return;
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || started.current) return;
        started.current = true;
        observer.disconnect();

        const target = parsed.num;
        const startTime = performance.now();

        const tick = (now: number) => {
          const elapsed = now - startTime;
          const progress = Math.min(elapsed / duration, 1);
          // Ease-out cubic
          const eased = 1 - Math.pow(1 - progress, 3);
          setDisplayed(Math.round(eased * target));
          if (progress < 1) requestAnimationFrame(tick);
        };

        requestAnimationFrame(tick);
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [parsed, duration]);

  // Non-countable — render as plain text
  if (!parsed) return <span className={className} style={style}>{value}</span>;

  const formatted = parsed.hasComma ? displayed.toLocaleString() : String(displayed);

  return (
    <span ref={ref} className={className} style={style}>
      {formatted}{parsed.suffix}
    </span>
  );
}
