export type BlogCategory = "Policy & News" | "Pathways" | "Tips" | "Family";

export type BlogSection = { heading: string; body: string[] };

export type BlogPost = {
  slug: string;
  title: string;
  /** Card + meta description. */
  excerpt: string;
  category: BlogCategory;
  /** ISO date, e.g. "2026-05-28". Drives sort order and display. */
  date: string;
  /** Whole minutes, displayed as "6 min read". */
  readingMinutes: number;
  author: string;
  /** Hero/card image path under /public (e.g. "/images/toronto-skyline.jpg"). */
  image: string;
  /** Short alt text for the image. */
  imageAlt: string;
  /** One-line standfirst shown under the title on the detail page. */
  standfirst: string;
  /** Body, rendered as sections of heading + paragraphs. */
  sections: BlogSection[];
  status: "live" | "draft";
};

/** Newest first. Keep `date` accurate — it sorts the index and feeds the sitemap. */
export const posts: BlogPost[] = [
  {
    slug: "category-based-express-entry-2026",
    title: "Category-based Express Entry draws: what they change for you",
    excerpt:
      "IRCC keeps running category-based rounds alongside general draws. Here is what that actually means for your odds, in plain English.",
    category: "Policy & News",
    date: "2026-05-28",
    readingMinutes: 6,
    author: "CanPlus Immigration",
    image: "/images/toronto-skyline.jpg",
    imageAlt: "Toronto skyline at sunset, with the CN Tower above Lake Ontario.",
    standfirst:
      "Category-based selection lets IRCC invite candidates by occupation or language rather than score alone. Understanding which categories exist — and whether you fall in one — can matter more than a few CRS points.",
    sections: [
      {
        heading: "General draws versus category-based draws",
        body: [
          "In a general Express Entry round, IRCC invites the highest-ranked profiles in the pool regardless of occupation. In a category-based round, it invites candidates who meet a published category — for example strong French-language ability, or experience in a targeted occupation group — often at a lower cut-off score than the general draw.",
          "That second mechanism is the one most applicants overlook. A profile that would wait a long time for a general invitation can be reachable in a category round, provided it genuinely fits the category being drawn.",
        ],
      },
      {
        heading: "How to tell whether a category applies to you",
        body: [
          "Categories are defined by IRCC and can change between years, so the only reliable source is the current official list at the time you enter the pool. The common threads are language (notably French) and work experience in specified National Occupational Classification groups such as healthcare, trades, or STEM.",
          "Fit has to be real and documented. Claiming a category your experience does not support is not a shortcut; it is a refusal risk. The honest question is whether your verifiable history places you inside a drawn category — not whether you can be made to look like it does.",
        ],
      },
      {
        heading: "What we are not telling you",
        body: [
          "No one can tell you a category round will reach your score, or that a given category will run again. Draw patterns shift with policy and labour-market priorities. What an RCIC review can do is confirm which categories your profile honestly qualifies for, and make sure your language results and work-experience documentation are strong enough to be invited when a relevant round comes.",
        ],
      },
    ],
    status: "live",
  },
  {
    slug: "study-permit-documents-people-forget",
    title: "Five documents people forget in a study permit application",
    excerpt:
      "Most study permit refusals come down to evidence, not eligibility. These are the five items applicants most often leave thin.",
    category: "Tips",
    date: "2026-05-12",
    readingMinutes: 5,
    author: "CanPlus Immigration",
    image: "/images/documents-desk.jpg",
    imageAlt: "A hand completing an application form at a desk beside a passport.",
    standfirst:
      "A study permit officer is assessing whether you are a genuine student who will respect the terms of your stay. These five evidence gaps are the ones we see sink otherwise-eligible applications.",
    sections: [
      {
        heading: "1. A clear, specific proof-of-funds trail",
        body: [
          "Showing a large balance is not the same as showing where it came from. Officers look for funds that are genuinely available and reasonably explained — tuition plus living costs, with a source that makes sense for your circumstances. A sudden unexplained deposit can do more harm than a smaller, well-documented amount.",
        ],
      },
      {
        heading: "2. A statement of purpose that connects the dots",
        body: [
          "Your study plan should explain why this program, why Canada, and how it fits your path — including your ties and intentions. A generic letter that could belong to anyone is a missed chance to answer the officer's real question about genuineness.",
        ],
      },
      {
        heading: "3. Evidence of ties beyond a single sentence",
        body: [
          "Family, employment prospects, or other commitments that give context to your plans are worth documenting rather than asserting. The aim is a coherent picture, not a thick file.",
        ],
      },
      {
        heading: "4. A complete, consistent academic record",
        body: [
          "Gaps in study or work, or a program that seems a step backward, are not automatically fatal — but unexplained, they invite doubt. Address them directly and consistently across your documents.",
        ],
      },
      {
        heading: "5. Proof your letter of acceptance is current and valid",
        body: [
          "Acceptance from a designated learning institution must be genuine and current, and program details should match everything else you submit. Mismatched dates or programs across documents are an avoidable red flag.",
        ],
      },
    ],
    status: "live",
  },
  {
    slug: "pnp-versus-express-entry",
    title: "When a Provincial Nominee Program beats Express Entry",
    excerpt:
      "A provincial nomination can add 600 CRS points — but a PNP is not always the right move. Here is how to think about the trade-off.",
    category: "Pathways",
    date: "2026-04-22",
    readingMinutes: 7,
    author: "CanPlus Immigration",
    image: "/images/canada-landscape.jpg",
    imageAlt: "Moraine Lake in Banff National Park, with snow-capped Rocky Mountains.",
    standfirst:
      "Provincial Nominee Programs let a province nominate you for permanent residence based on its own labour needs. For some applicants they are the difference-maker; for others they add cost and tie you to a province. The right call depends on your profile.",
    sections: [
      {
        heading: "What a nomination actually does",
        body: [
          "An enhanced provincial nomination tied to Express Entry adds 600 points to your CRS score, which in practice means a near-certain invitation in a subsequent draw. A base (non-Express-Entry) nomination runs on the province's own timeline instead.",
          "That 600-point boost is why a nomination is so powerful for candidates whose standalone score is unlikely to be invited in a general round.",
        ],
      },
      {
        heading: "The trade-offs people underestimate",
        body: [
          "A PNP usually requires a genuine connection to, and intention to settle in, the nominating province — sometimes a job offer, sometimes prior study or work there. It can add an application stage, fees, and processing time. And it commits you to a province, which matters if your life plans are flexible.",
          "For a candidate with a high CRS score and no geographic preference, going straight through Express Entry can be simpler. For a candidate with a moderate score and a real tie to one province, a PNP can be the only realistic route.",
        ],
      },
      {
        heading: "How we'd frame the decision",
        body: [
          "We start from your honest standalone CRS score and your real ties. If your score is competitive in recent draws, a PNP may be unnecessary complexity. If it is not, we look at which provincial streams your profile genuinely fits, and whether the settlement commitment is one you can make in good faith. We will not steer you into a province you have no intention of living in.",
        ],
      },
    ],
    status: "live",
  },
  {
    slug: "genuine-relationship-spousal-sponsorship",
    title: "What a “genuine relationship” really means in spousal sponsorship",
    excerpt:
      "Almost every spousal refusal turns on one question. Here is what officers are actually looking for — and what they are not.",
    category: "Family",
    date: "2026-04-03",
    readingMinutes: 6,
    author: "CanPlus Immigration",
    image: "/images/diverse-people.jpg",
    imageAlt: "A diverse group of friends smiling together outdoors.",
    standfirst:
      "Spousal sponsorship rests on whether your relationship is genuine and not entered into primarily for immigration. The legal test is simple to state and surprisingly easy to under-evidence.",
    sections: [
      {
        heading: "Coherence beats volume",
        body: [
          "Officers look for a consistent story across the life of your relationship: how you met, how it developed, and how you share a life now. A coherent file where photos, finances, communication, and statements all point the same way is stronger than a thick binder of unconnected documents.",
        ],
      },
      {
        heading: "The gaps that read as doubt",
        body: [
          "Long unexplained periods apart, finances that never mingle, or timelines that do not line up across documents are the things that invite questions. None is automatically fatal — but each needs to be explained honestly rather than hidden.",
        ],
      },
      {
        heading: "What we will and won't claim",
        body: [
          "We cannot manufacture a relationship, and we would not try. What we do is help genuine couples present their relationship accurately and completely, choose between inland and outland for the right reasons, and anticipate the officer's questions so a real relationship is not refused over avoidable documentation gaps.",
        ],
      },
    ],
    status: "live",
  },
];

/** Stable, dependency-free ISO-date formatter for display, e.g. "28 May 2026". */
export function formatPostDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  return `${d} ${months[m - 1]} ${y}`;
}

/** Newest-first list of live posts. */
export function livePosts(): BlogPost[] {
  return posts
    .filter((p) => p.status === "live")
    .slice()
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
}
