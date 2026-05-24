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
      "We are looking for a Naval Architect to join our engineering team and take ownership of vessel design and development. You will work across hull form design, structural engineering, and stability analysis for next-generation maritime platforms operating in demanding environments. This is a hands-on role with direct impact on hardware from concept through field testing.",
    responsibilities: [
      "Own the hull form, structural layout, and naval architecture for prototype vessels across multiple size classes.",
      "Perform resistance and powering calculations, stability analysis, and seakeeping assessments for autonomous maritime operations.",
      "Develop detailed manufacturing designs using industry-standard naval architecture software and iterate based on testing results.",
      "Oversee prototype manufacturing processes including composite fabrication and marine-grade metalwork.",
      "Support systems integration and participate in open-water testing and sea trials.",
    ],
    requirements: [
      "Must be a US Citizen or Permanent Resident due to program compliance requirements.",
      "BS in Naval Architecture, Ocean Engineering, or equivalent with 3+ years of experience designing marine vessels or specialized watercraft.",
      "Proficiency in naval architecture software (Rhino, Maxsurf, NAPA or equivalent) and SolidWorks.",
      "Practical knowledge of marine structural analysis, FRP composites, and weight control.",
      "Ability to manage multiple deadlines independently and deliver hardware from early design to deployment.",
    ],
    niceToHave: [
      "Experience designing high-speed planing hulls or autonomous surface vehicles.",
      "Background in early-stage marine hardware prototype development.",
      "Familiarity with FRP composites, marine aluminum fabrication, or high-speed craft.",
      "Operational experience with deployed vessels or sea trials.",
      "Knowledge of maritime regulations (USCG, ABS) applied to novel or uncrewed vessels.",
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
