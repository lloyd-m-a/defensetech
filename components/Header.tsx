"use client";

import { useState, useEffect } from "react";
import { content } from "@/lib/content";

export default function Header() {
  const t = content.en.nav;
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 1024) setMenuOpen(false); };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const navLinks = [
    { label: "Home",    href: "/"        },
    { label: t.mission, href: "/mission" },
    { label: t.vessel,  href: "/vessel"  },
    { label: t.about,   href: "/about"   },
  ];

  const navLinkClass =
    "relative text-base font-medium leading-6 tracking-[0.8px] uppercase text-white " +
    "after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-white " +
    "after:transition-all after:duration-500 after:ease-out hover:after:w-full";

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-colors duration-500"
        style={{
          backgroundColor: scrolled || menuOpen ? "rgba(0,0,0,0.95)" : "transparent",
          backdropFilter:   scrolled || menuOpen ? "blur(8px)" : "none",
        }}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8 h-[84px] flex items-center justify-between">

          {/* Logo */}
          <a href="/" className="flex items-center flex-shrink-0">
            <img src="/logo.svg" alt="Bulwark Dynamics" className="h-6 w-auto" />
          </a>

          {/* Desktop nav */}
          <div className="hidden lg:flex items-center gap-12 ml-auto">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className={navLinkClass}>
                {link.label}
              </a>
            ))}
            <a
              href="/join"
              className="h-[45px] px-8 flex items-center justify-center uppercase tracking-[0.8px] text-base font-medium border border-white bg-transparent text-white hover:bg-white hover:text-black transition-colors duration-300"
            >
              {t.cta}
            </a>

          </div>

          {/* Burger button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden flex items-center justify-center w-10 h-10 text-white"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              }
            </svg>
          </button>
        </div>

        {/* Mobile drawer */}
        <div
          className="lg:hidden overflow-hidden transition-all duration-300 ease-in-out"
          style={{ maxHeight: menuOpen ? "400px" : "0px", backgroundColor: "rgba(0,0,0,0.95)", backdropFilter: "blur(8px)" }}
        >
          <div className="border-t border-white/10 px-6 py-6 flex flex-col gap-6">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} onClick={() => setMenuOpen(false)} className={navLinkClass}>
                {link.label}
              </a>
            ))}
            <a
              href="/join"
              onClick={() => setMenuOpen(false)}
              className="self-start h-[45px] px-8 flex items-center justify-center uppercase tracking-[0.8px] text-base font-medium border border-white bg-transparent text-white hover:bg-white hover:text-black transition-colors duration-300"
            >
              {t.cta}
            </a>

          </div>
        </div>
      </header>
    </>
  );
}
