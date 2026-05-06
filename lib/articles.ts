export type Article = {
  slug: string;
  tag: string;
  date: string;
  location: string;
  title: string;
  excerpt: string;
  hasImages: boolean;
  body: string[];
};

export const articles: Article[] = [
  {
    slug: "bulwark-dynamics-opens-prototype-production-facility",
    tag: "Company",
    date: "January 2026",
    location: "Menlo Park, CA",
    title: "Bulwark Dynamics opens prototype production facility",
    excerpt:
      "New facility in Menlo Park enables rapid iteration and testing of autonomous systems.",
    hasImages: true,
    body: [
      "Bulwark Dynamics has opened a dedicated production facility in Menlo Park, California, marking the company's transition from design into hands-on hardware production. The facility supports hull fabrication, systems integration, and testing for the CARAVEL autonomous resupply vessel and future platform variants.",
      "The Menlo Park location provides proximity to a deep talent pool in autonomy, embedded systems, and marine engineering. The company expects to grow the facility team significantly in the first half of 2026 as production ramps ahead of scheduled field evaluations.",
      "The opening follows a period of accelerated hiring and positions Bulwark to host government partner visits and begin delivering CARAVEL units for operational evaluation later in the year.",
    ],
  },
  {
    slug: "strategic-mou-with-japanese-shipbuilder",
    tag: "Partnership",
    date: "December 2025",
    location: "",
    title: "Strategic MOU with Japanese shipbuilder",
    excerpt:
      "Partnership with top-tier shipbuilder to explore co-production of autonomous maritime systems.",
    hasImages: false,
    body: [
      "Bulwark Dynamics and a leading Japanese shipbuilding group have signed a Memorandum of Understanding to jointly explore co-production pathways for autonomous maritime logistics systems. The agreement establishes a framework for technical collaboration, supply chain integration, and the potential licensed production of Bulwark platforms for allied naval and coast guard customers across the Indo-Pacific.",
      "The partnership reflects growing urgency among U.S. allies to develop interoperable, autonomous logistics capabilities that can sustain distributed operations across contested maritime domains. Japan's shipbuilding industry brings decades of precision manufacturing expertise and an established industrial base capable of scaling production rapidly — attributes that align directly with Bulwark's emphasis on fielding real systems at operationally relevant quantities.",
      "Under the terms of the MOU, both parties will conduct joint technical working groups focused on hull production tolerances, propulsion system integration, and the adaptation of CARAVEL's autonomy stack to regional maritime regulatory requirements. A joint steering committee will convene quarterly to review progress and identify near-term co-production opportunities. The MOU does not constitute a binding production agreement but lays the foundation for a formal program of record.",
      "The partnership is expected to reduce per-unit production costs through economies of scale and regional supply chain consolidation, directly supporting the allied objective of maintaining affordable, sustainable autonomous maritime capability. Bulwark will retain full ownership of its core software and autonomy intellectual property under the terms of the agreement.",
      "Both organizations view this collaboration as a long-term strategic alignment rooted in shared security interests rather than a short-term transactional arrangement. Subsequent phases of the partnership may expand to include co-development of next-generation platform variants tailored to the specific operational requirements of allied maritime forces in the region.",
    ],
  },
  {
    slug: "pre-seed-round-closed",
    tag: "Funding",
    date: "September 2025",
    location: "Menlo Park, CA",
    title: "Pre-seed round closed",
    excerpt:
      "Funding secured to accelerate initial prototype development and field testing.",
    hasImages: false,
    body: [
      "Bulwark Dynamics has closed its pre-seed funding round, securing capital to accelerate the development and field testing of its autonomous maritime logistics platform. The round was led by investors with deep backgrounds in defense technology and national security, and includes participation from founders who have previously built and scaled hardware companies serving the U.S. Department of Defense.",
      "The funding will be deployed against three primary objectives: completing initial CARAVEL prototype builds, standing up the Menlo Park production facility, and executing the first round of open-water operational evaluations. The company will also use a portion of the capital to expand its engineering team, prioritizing autonomy engineers, systems integrators, and maritime domain specialists with prior military or government program experience.",
      "Bulwark was founded with the explicit conviction that the defense industrial base must be capable of producing autonomous maritime systems at the speed and scale demanded by the current strategic environment. The pre-seed round represents the first institutional validation of that thesis and positions the company to compete for and win contracts with U.S. government customers in the near term.",
      "The company anticipates initiating engagement with the Small Business Innovation Research program and other government contract vehicles in early 2026, using field evaluation data from prototype testing to substantiate performance claims and establish a track record of delivery. Additional fundraising is anticipated following the completion of those evaluations.",
    ],
  },
];

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export function getRelatedArticles(slug: string): Article[] {
  return articles.filter((a) => a.slug !== slug);
}
