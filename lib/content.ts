export const content = {
  en: {
    nav: {
      mission: "Mission",
      vessel: "Vessel",
      about: "About Us",
      careers: "Careers",
      cta: "Join the Team",
    },

    // ── HOME ────────────────────────────────────────────────────
    hero: {
      label: "",
      headlineA: "Bridge the last mile.",
      headlineB: "Sustain the fight.",
      sub: "Building real capabilities to protect warfighters in contested environments.",
      cta1: "View Capabilities",
      cta2: "Request Briefing",
      capabilities: {
        eyebrow: "Mission",
        heading: "Real capabilities, not prototypes",
        body1: "Bulwark Dynamics is a DefenseTech company committed to building and delivering real capabilities to truly help and protect warfighters.",
        body2: "Logistics win wars. Yet logistics are often overlooked. The United States and its allies are facing challenges of maintaining resilient supply lines across the vast Pacific, into contested and denied areas.",
        body3: "We must have the capabilities to sustain those who fight, to deter those who threaten, to defend freedom, and to secure our future. That's what we do.",
        cta: "Learn More",
      },
      statsBar: [
        { value: "1000+", subtitle: "Nautical Miles", label: "Range"              },
        { value: "50%",   subtitle: "Cost Reduction", label: "VS Traditional"     },
        { value: "24/7",  subtitle: "Operations",     label: "Autonomous"         },
        { value: "2025",  subtitle: "Founded",        label: "Defense Innovation" },
      ],
      platform: {
        eyebrow: "Vessel",
        heading: "Autonomous Landing\nResupply Vessel",
        body: "Revolutionary maritime logistics platform designed to operate in contested environments. Fully autonomous, weather-resistant, and mission-ready.",
        cta: "Explore Vessel",
      },
      distributed: {
        eyebrow: "Distributed Maritime",
        heading: "Beyond National Security",
        body: "Supporting multi-national fleet operations with resilient, autonomous supply chains.",
      },
      useCases: {
        eyebrow: "Applications",
        heading: "Critical Missions",
        slides: [
          { title: "Expeditionary Operations", sub: "Sustaining distributed forces in contested maritime environments with autonomous resupply." },
          { title: "Disaster Response",        sub: "Rapid humanitarian aid delivery to remote or disaster-affected coastal regions." },
          { title: "Energy Infrastructure",    sub: "Supporting offshore renewable energy installations and remote facilities." },
        ],
      },
      newsroom: {
        eyebrow: "Latest Updates",
        heading: "Newsroom",
        articles: [
          { date: "January 2026",   tag: "Company",     title: "Bulwark Dynamics opens prototype production facility", excerpt: "New facility in Menlo Park enables rapid iteration and testing of autonomous systems."                       },
          { date: "December 2025",  tag: "Partnership", title: "Strategic MOU with Japanese shipbuilder",              excerpt: "Partnership with top-tier shipbuilder to explore co-production of autonomous maritime systems."             },
          { date: "September 2025", tag: "Funding",     title: "Pre-seed round closed",                                excerpt: "Funding secured to accelerate initial prototype development and field testing."                           },
        ],
        readMore: "Read More",
      },
      bottomCta: {
        eyebrow: "Careers",
        heading: "Build systems that\nshape the future",
        body: "Join a team of operators solving the hardest problems in autonomous maritime systems. Real impact. Challenging work. Rapid iteration from concept to deployment.",
        btn1: "View Open Roles",
        btn2: "Meet the Team",
        roles: [
          { cat: "Engineering", roles: "Autonomy • Systems • Manufacturing"   },
          { cat: "Operations",  roles: "Field Testing • Mission Planning"     },
          { cat: "Business",    roles: "Strategy • Partnerships • Growth"     },
        ],
        view: "View",
      },
    },

    // ── MISSION ─────────────────────────────────────────────────
    mission: {
      number: "01",
      label: "Mission",
      headline: "Logistics win wars",
      body1: "We are building the future of contested logistics—resilient, autonomous, and ready for what is next.",
      principle: "Reliability is not a specification. It is a precondition.",
      body2: "Our team includes former operators, engineers, and intelligence professionals who have served at the highest levels. That background shapes every decision we make — from architecture to deployment.",
      doctrine: {
        sections: [
          {
            num: "01",
            title: "The logistics\nimperative",
            lead: "Throughout history, wars have been decided by logistics.",
            body: "Napoleon learned it in 1812. The Battle of the Atlantic proved it. The Pacific and North Africa proved it again.\n\nTechnology changes, tactics evolve — but victory still depends on whether you can move critical assets to the front, reliably and at scale.",
          },
          {
            num: "02",
            title: "The shift to\ndistributed\noperations",
            body: "In World War II, massing forces and operating from large, concentrated platforms was often viable. Today, long-range precision strike and pervasive sensing make that model increasingly fragile.\n\nYou cannot assume you will be able to park high-value platforms where you want, for as long as you want. The distances are unforgiving, and the risk of concentration is real — so operations shift toward distributed, mobile, hard-to-target postures.",
          },
          {
            num: "03",
            title: "EABO: The\nnew doctrine",
            body: "The U.S. Marine Corps has articulated this shift with EABO (Expeditionary Advanced Base Operations): establishing temporary expeditionary bases across contested maritime regions to support joint and naval operations and complicate adversary A2/AD (Anti-Access/Area Denial).\n\nForces disperse, keep moving, and minimize signature — while still delivering effects and sustaining the fight.",
          },
          {
            num: "04",
            title: "The logistics\ngap",
            body: "But distributed operations create a hard logistics problem. At scale, EABO can demand 800 tons/day of sustainment. And our current connectors were not built for it.\n\nWe do not rely on connectors like Landing Craft Utility (LCU), Landing Craft Air Cushion (LCAC), Landing Ship Medium (LSM), and aircraft such as CH-53K and MV-22.",
          },
          {
            num: "05",
            title: "Our solution",
            body: "So we decided to build a new logistics platform — made for contested waters, low signature, and manufacturable in large numbers — so supply chains do not break on first contact.\n\nBecause peace is no longer guaranteed. We intend to help secure it by moving what matters, when it matters, even under pressure.",
          },
          {
            num: "06",
            title: "Our\ncommitment",
            lead: "Speed and obsession are our operating system.",
            body: "Our mission is to deter aggression by building resilient forces and supply chains that protect our way of life.",
          },
        ],
      },
      numbers: {
        eyebrow: "By the numbers",
        heading: "The challenge we are solving",
        stats: [
          { value: "928",   label: "Tons/day sustainment required for EABO" },
          { value: "1500",  label: "Nautical miles range needed"             },
          { value: "10000", label: "LBS payload per mission"                 },
          { value: "100%",  label: "Autonomous operation"                    },
        ],
      },
      problem: {
        eyebrow: "The Problem",
        heading: "Current systems\ncannot meet demand",
        items: [
          "Insufficient inventory and throughput",
          "Vulnerable to adversary threats",
          "Requires port infrastructure",
          "High personnel risk in contested areas",
        ],
      },
      solution: {
        eyebrow: "The Solution",
        heading: "CARAVEL: Built for\ncontested waters",
        items: [
          "Autonomous shore-to-shore delivery",
          "Low signature, hard to target",
          "GPS-denied operability",
          "Scalable manufacturing",
        ],
        cta: "Learn More",
      },
      cards: [
        { label: "Our Vessel",   sub: "Explore CARAVEL →" },
        { label: "Work With Us", sub: "View Openings →"   },
      ],
    },

    // ── VESSEL ──────────────────────────────────────────────────
    vessel: {
      number: "02",
      label: "Autonomous Vessel",
      headline: "CARAVEL",
      body: "Autonomous Beach-Landing Resupply Vessel",
      overview: {
        eyebrow: "Overview",
        heading: "Built for the most\nchallenging environments",
        body1: "CARAVEL is an autonomous resupply vessel engineered for contested maritime operations. Capable of independent beach-landing delivery, it sustains forward-deployed forces without exposing personnel to front-line risk.",
        body2: "We are an ambitious team of experienced engineers and manufacturers dedicated to developing advanced technology that will revolutionize what's possible in naval logistics and contested environment operations.",
      },
      featuresIntro: {
        eyebrow: "Capabilities",
        heading: "Features",
        body: "Four core capabilities engineered to sustain operations in the most contested maritime environments — autonomously, at scale, without port dependency.",
      },
      features: [
        {
          title: "Shore to shore delivery",
          body: "CARAVEL delivers cargo directly from ship to shore, bypassing port infrastructure and enabling sustained direct beach operations in any coastal environment.",
        },
        {
          title: "Support versatile\nenvironments",
          body: "Purpose-built for contested maritime environments — operates in rough seas, shallow waters, and degraded conditions without operator intervention.",
        },
        {
          title: "JMIC / ISO containers\nsupported",
          body: "Native compatibility with JMIC and ISO container standards. Load standard military cargo directly — no repackaging required.",
        },
        {
          title: "GPS-denied\noperability",
          body: "Full operational capability in GPS-denied and electronically contested environments using advanced sensor fusion and AI-powered navigation.",
        },
        {
          title: "Port-independent\ncargo handling",
          body: "CARAVEL beaches, discharges, and redeploys autonomously. No port infrastructure, no shore crew, no delay.",
        },
      ],
      caravelSpecs: {
        payload: "Payload: 23,000 lbs",
        range: "Range: 1,100nm",
        operation: "Unmanned Operation",
        label1: "Shore to Shore",
        label2: "Beach Landing Vessels",
      },
      specsColumns: [
        { title: "Navigation",   body: "GPS-denied autonomous navigation with advanced sensor fusion and AI-powered obstacle avoidance" },
        { title: "Cargo System", body: "JMIC/ISO container compatible with self-loading and unloading capability for port-independent operations" },
        { title: "Endurance",    body: "Extended range hybrid propulsion system enabling multi-day missions in contested environments" },
      ],
      engineered: {
        heading: "Engineered for mission-\ncritical operations",
        stats: [
          { label: "Shore to Shore",  value: "50+ nm", body: "Autonomous delivery from ship to any unimproved shoreline — no port infrastructure required." },
          { label: "GPS Denied",      value: "100%",   body: "Full operational capability in GPS-denied and electronically contested environments."         },
          { label: "Mission Payload", value: "1,000+", body: "Pounds of cargo delivered per sortie, compatible with standard military containers."          },
        ],
      },
    },

    // ── ABOUT ───────────────────────────────────────────────────
    about: {
      number: "03",
      label: "About Us",
      headlineA: "The team protecting our civilization",
      headlineB: "",
      body1: "Building the future of defense technology with proven expertise in autonomous systems and maritime logistics",
      body2: "We operate under formal vetting requirements and hold active clearances. All partnerships are subject to government compliance review and ITAR regulations.",
      badges: ["ITAR Compliant", "NIST 800-171", "CMMC Level 2", "FedRAMP Ready"],
      missionStatement: {
        eyebrow: "Mission",
        body1: "Bulwark Dynamics is a DefenseTech company committed to building and delivering real capabilities to truly help and protect warfighters.",
        body2: "We are an ambitious team of experienced engineers and manufacturers dedicated to developing advanced technology that will revolutionize what's possible in naval logistics and contested environment operations.",
      },
      founded: {
        eyebrow: "Founded",
        year: "2025",
        body: "Born from a vision to solve the most critical challenges in contested logistics and shipbuilding capacity.",
      },
      valuesSection: {
        eyebrow: "Values",
        heading: "What drives us",
        items: [
          { title: "Autonomy", body: "We empower our systems and our people to operate independently, make critical decisions, and adapt to the most challenging environments." },
          { title: "Speed",    body: "In defense, time is measured in lives. We move with urgency, iterate rapidly, and deliver capabilities when they matter most."            },
          { title: "Scale",    body: "Real impact requires production at scale. We build technology designed not just to work, but to be manufactured and deployed globally."   },
          { title: "Impact",   body: "Every decision we make is measured by its impact on warfighter safety and mission success. We build capabilities that matter."           },
        ],
      },
      team: {
        eyebrow: "Leadership",
        heading: "Our Team",
        members: [
          { name: "Nhat Lieu",      role: "Founder, Chief Executive Officer"    },
          { name: "Yuta Shiina",    role: "Co-founder, Chief Technical Officer" },
          { name: "Isaac Anderson", role: "Co-founder, Lead Engineer"            },
          { name: "Ben Galendez",   role: "Tactical Mission Programs and BD"     },
          { name: "Ezana Mesfin",   role: "Multidisciplinary Engineer"           },
        ],
      },
    },

    // ── JOIN ────────────────────────────────────────────────────
    join: {
      number: "04",
      label: "Career",
      headline: "Build systems for tomorrow's threats",
      sub: "Join a team of exceptional engineers, operators, and strategists who are redefining what's possible in defense technology.",
      cta: "View Open Positions",
      email: "careers@bulwarkdynamics.com",
      whyJoin: {
        eyebrow: "Why Join",
        heading: "Shape the future\nof defense",
        body1: "At Bulwark Dynamics, you won't just build prototypes — you'll deliver real capabilities that protect warfighters and shape the future of national security.",
        body2: "We're a team of operators, engineers, and strategists with backgrounds in defense, aerospace, and autonomous systems. We move fast, ship real products, and measure our impact in lives protected.",
        pillars: [
          { title: "Real Impact",      body: "Build technology that matters. Your work directly supports warfighter safety and mission success."          },
          { title: "Exceptional Team", body: "Work alongside veterans, ex-DoD engineers, and top talent from leading tech companies."                    },
          { title: "Fast Iteration",   body: "Ship products, not prototypes. We move at startup speed with defense-grade quality."                       },
        ],
      },
      openRoles: {
        eyebrow: "Open Roles",
        heading: "Join our team",
        apply: "Apply",
        roles: [
          { dept: "Engineering", type: "Full-Time", title: "Naval Architect", location: "Menlo Park, CA" },
        ] as { dept: string; type: string; title: string; location: string }[],
      },
      openApp: {
        heading: "Don't see a role that fits?",
        body: "We're always looking for exceptional talent. Send us your resume and we'll reach out if there's a match.",
        cta: "Send Resume →",
      },
      benefits: {
        eyebrow: "Benefits",
        heading: "We invest in our team",
        items: [] as { title: string; body: string }[],
      },
    },

    // ── FOOTER ──────────────────────────────────────────────────
    footer: {
      tagline: "Advanced defense technology for the modern threat environment.",
      allRights: "All rights reserved.",
      location: "Menlo Park, CA",
      nav: {
        company:   "Company",
        workWith:  "Work with us",
        social:    "Social",
        contact:   "Contact",
        language:  "Language",
        mission:   "Mission",
        vessel:    "Vessel",
        about:     "About Us",
        careers:   "Careers",
        linkedin:  "LinkedIn",
      },
      legal: "This site is intended for authorized government and contractor personnel only.",
    },
  },
} as const;

export type SiteContent = typeof content.en;
