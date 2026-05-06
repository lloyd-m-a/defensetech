import { useEffect, useRef, useState } from "react";

/**
 * @param threshold  IntersectionObserver threshold (0–1)
 * @param toggle     If true, inView tracks both enter AND exit (for hero fade in/out).
 *                   If false (default), inView only ever goes true once (for section reveals).
 */
export function useInView(threshold = 0.05, toggle = false) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (toggle) {
          // Bidirectional — fade in on enter, fade out on leave
          setInView(entry.isIntersecting);
        } else {
          // One-way — reveal once, stay visible
          if (entry.isIntersecting) setInView(true);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, toggle]);

  return { ref, inView };
}
