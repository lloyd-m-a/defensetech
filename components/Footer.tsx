"use client";

import { useState } from "react";
import { content } from "@/lib/content";

const MIDNIGHT_NAVY_OVERLAY = "linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0) 15%, rgba(17,41,78,0.9) 50%, rgba(17,41,78,0.9) 100%)";

const linkClass =
  "relative inline-block text-sm text-white transition-all duration-300 " +
  "after:absolute after:bottom-[-2px] after:left-0 after:h-px after:w-0 after:bg-white " +
  "after:transition-all after:duration-300 after:ease-out hover:after:w-full hover:translate-x-1";

const headingClass = "text-xs font-semibold tracking-[0.8px] uppercase text-white/40 mb-4";

export default function Footer() {
  const tf = content.en.footer;
  const tn = tf.nav;
  const [hovered, setHovered] = useState(false);

  return (
    <footer className="relative flex flex-col bg-black overflow-hidden">

      {/* Midnight Navy gradient overlay on logo hover */}
      <div
        className={`absolute inset-0 pointer-events-none transition-all duration-700 ease-in-out ${hovered ? "opacity-100" : "opacity-0"}`}
        style={{ background: MIDNIGHT_NAVY_OVERLAY }}
      />

      {/* Top border */}
      <div
        className="relative w-full h-px flex-shrink-0"
        style={{ background: "linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(255,255,255,0.2) 50%, rgba(0,0,0,0) 100%)" }}
      />

      <div className="relative max-w-[1400px] mx-auto w-full px-5 sm:px-8 lg:px-24 pt-10 lg:pt-20 flex flex-col">

        {/* ── COLUMNS ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 pb-8 lg:pb-10">

          {/* Company */}
          <div>
            <p className={headingClass}>{tn.company}</p>
            <ul className="flex flex-wrap gap-x-4 gap-y-1 sm:flex-col sm:flex-nowrap sm:gap-0 sm:space-y-[6px]">
              <li><a href="/" className={linkClass}>Home</a></li>
              <li><a href="/mission" className={linkClass}>{tn.mission}</a></li>
              <li><a href="/vessel"  className={linkClass}>{tn.vessel}</a></li>
              <li><a href="/about"   className={linkClass}>{tn.about}</a></li>
            </ul>
          </div>

          {/* Work with us */}
          <div>
            <p className={headingClass}>{tn.workWith}</p>
            <ul className="flex flex-wrap gap-x-4 gap-y-1 sm:flex-col sm:flex-nowrap sm:gap-0 sm:space-y-[6px]">
              <li><a href="/join" className={linkClass}>{tn.careers}</a></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <p className={headingClass}>{tn.social}</p>
            <ul className="flex flex-wrap gap-x-4 gap-y-1 sm:flex-col sm:flex-nowrap sm:gap-0 sm:space-y-[6px]">
              <li>
                <a
                  href="https://www.linkedin.com/company/bulwark-dynamics"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass + " inline-flex items-center gap-1.5"}
                >
                  {tn.linkedin}
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className={headingClass}>{tn.contact}</p>
            <ul className="flex flex-wrap gap-x-4 gap-y-1 sm:flex-col sm:flex-nowrap sm:gap-0 sm:space-y-[6px]">
              <li>
                <a href="mailto:contact@bulwarkdynamics.com" className={linkClass + " break-all"}>
                  contact@bulwarkdynamics.com
                </a>
              </li>
            </ul>
          </div>



        </div>

        {/* ── LOGO ── */}
        <a
          href="/"
          className="relative flex flex-col group mt-2"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <img src="/logo.svg" alt="Bulwark Dynamics" className="w-full h-auto object-left" />
          <div className="h-4 lg:h-8" />
          <span className="block w-full h-px bg-white origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out" />
        </a>

        {/* Divider */}
        <div className="mt-4 lg:mt-6 mb-3 lg:mb-4">
          <div className="w-full h-px" style={{ background: "linear-gradient(90deg, rgba(0,0,0,0) 0%, rgba(255,255,255,0.1) 50%, rgba(0,0,0,0) 100%)" }} />
        </div>

        {/* ── COPYRIGHT ── */}
        <div className="pb-6 lg:pb-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-2">
          <p className="text-sm text-white/40">
            © {new Date().getFullYear()} Bulwark Dynamics. {tf.allRights}
          </p>
          <p className="text-sm text-white/40">
            {tf.location}
          </p>
        </div>

      </div>
    </footer>
  );
}
