export type Job = {
  slug: string
  dept: string
  type: string
  title: string
  location: string
  overview: string
  responsibilities: string[]
  requirements: string[]
  niceToHave: string[]
  forYouIf: string[]
  notForYouIf: string[]
}

export const jobs: Job[] = [
  {
    slug: "naval-architect",
    dept: "Engineering",
    type: "Full-Time",
    title: "Naval Architect",
    location: "Menlo Park, CA",
    overview:
      "Bulwark Dynamics is rebuilding America's maritime superiority by solving the DoD's most critical vulnerability in the Pacific: contested logistics. We build autonomous landing craft at an unprecedented pace — our first 15ft prototype went from sketch to successful ocean testing in just 43 days. We're hiring a Mid to Senior Level Naval Architect to take complete ownership over our vessels' naval architecture — including clean-sheet hull hydrodynamics, structural design, stability, and weight management — for our next 15-foot and 35-foot prototypes. This role begins ASAP and is structured around a critical, high-stakes build sprint running through November. You will report directly to our CTO (former NASA Chief Engineer).",
    responsibilities: [
      "End-to-End Ownership: Design, fabricate, and fully own the hull form, structural layout, and overall naval architecture for our 15-ft and 35-ft prototype vessels.",
      "Hydrodynamics & Stability: Perform resistance/powering calculations, intact/damage stability analysis, and seakeeping assessments for high-speed, autonomous operations in rough maritime environments.",
      "Rapid CAD-to-Reality: Use Rhino, Maxsurf, and/or SolidWorks for detailed manufacturing designs, structural engineering, and relentlessly iterate based on physical ocean testing.",
      "Fabrication Oversight: Oversee rapid prototype manufacturing, including FRP composite layups and marine-grade metalwork (aluminum).",
      "Field Deployment / Sea Trials: Integrate mechanical/autonomous subsystems with cross-functional teams, troubleshoot on the fly, and operate as a core maritime crew member during rugged ocean deployments and sea trials.",
    ],
    requirements: [
      "Clearance / Citizenship: Due to defense contract requirements and ITAR compliance, you must be a US Citizen or a US Permanent Resident (Green Card holder).",
      "BS in Naval Architecture, Ocean Engineering, or equivalent hands-on experience, with 3+ years designing high-performance marine vessels, USVs, or specialized watercraft.",
      "Uncompromising proficiency in naval architecture software (Rhino, Maxsurf, NAPA, etc.) and SolidWorks. Strong practical intuition for marine structural analysis, DFM, and weight control, especially for FRP structures.",
      "Strong practical knowledge of rapid prototype assembly and structural systems. R&D experience with FRP composites, marine aluminum fabrication, or high-speed craft is a massive plus.",
      "Proven ability to manage multiple rapid deadlines independently and own early-stage marine hardware from sketch to functional deployment.",
    ],
    niceToHave: [
      "3+ years work experience in ship/boat design.",
      "Direct experience designing high-speed planing hulls or autonomous surface vehicles (ASVs/USVs).",
      "Experience building early-stage marine hardware prototypes.",
      "Ownership of projects from clean-sheet start to finish.",
      "Deep knowledge of marine structural systems, with an emphasis on FRP composites and alloys.",
      "Operational experience working with deployed vessels, conducting sea trials, or maritime operations.",
      "Familiarity with maritime regulations (USCG, ABS) and applying them to novel/uncrewed vessels.",
    ],
    forYouIf: [],
    notForYouIf: [],
  },
]

export function getJobBySlug(slug: string): Job | undefined {
  return jobs.find((j) => j.slug === slug)
}

export function getRelatedJobs(slug: string): Job[] {
  const current = getJobBySlug(slug)
  if (!current) return jobs.slice(0, 2)

  const sameDept = jobs.filter((j) => j.slug !== slug && j.dept === current.dept)
  if (sameDept.length >= 2) return sameDept.slice(0, 2)

  const others = jobs.filter((j) => j.slug !== slug)
  return [...sameDept, ...others.filter((j) => j.dept !== current.dept)].slice(0, 2)
}
