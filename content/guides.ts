import type { KPI } from "@/components/content/KPIRow";
import type { Step } from "@/components/content/StepList";

export type GuideSlug =
  | "express-entry"
  | "super-visa"
  | "study-to-pr"
  | "spousal-sponsorship"
  | "refusal-recovery";

export type Section = { heading: string; body: string };

export type Guide = {
  slug: GuideSlug;
  /** Topic / category label used on cards and the homepage strip. */
  industry: string;
  /** Short benefit line used on cards / homepage strip. */
  outcome: string;
  /** Hero subhead on the detail page. */
  subhead: string;
  /** Three- or four-sentence framing of who the guide is for and the problem. */
  intro: string;
  /** "What this covers" items: name = topic, role = short description. */
  stack: { name: string; role: string }[];
  /** Numbered how-to steps for the pathway. */
  steps: Step[];
  /** Illustrative stats — non-guarantee, for context only. */
  results: KPI[];
  /** A client quote. */
  testimonial: { quote: string; name: string; role: string; initials: string };
  /** Narrative body sections shown after the steps. */
  sections: Section[];
  /** Typical processing / timeline note. */
  timeToShip: string;
  /** Marker for whether this guide is fully written. */
  status: "live" | "draft";
};

export const guides: Guide[] = [
  {
    slug: "express-entry",
    industry: "Express Entry",
    outcome: "Understand your CRS score and how draws actually work.",
    subhead:
      "A plain-English walkthrough of Express Entry, the Comprehensive Ranking System, and the choices that move your score before you ever submit a profile.",
    intro:
      "Express Entry is the federal system that manages applications for three economic programs, the Federal Skilled Worker, Canadian Experience Class, and Federal Skilled Trades. It is not a first-come queue; it is a ranked pool, and your position is set by a points score called the CRS. Most applicants underestimate how much that score can shift with a higher language result or a provincial nomination. This guide explains the mechanics so you can see where you stand and which levers are realistically worth pulling.",
    stack: [
      { name: "Eligibility & programs", role: "Which of the three programs you may qualify under" },
      { name: "The CRS score", role: "How core, spouse, and skill-transferability points are awarded" },
      { name: "Profile to ITA", role: "Entering the pool and what an Invitation to Apply means" },
    ],
    steps: [
      {
        title: "Confirm you meet a program's minimum.",
        body: "Each program has its own threshold for work experience, language, and education. Meeting a minimum lets you enter the pool; it does not by itself produce an invitation.",
      },
      {
        title: "Get your language and education assessed.",
        body: "Take an approved test (IELTS, CELPIP, or TEF/TCF) and, for foreign credentials, obtain an Educational Credential Assessment. These two results drive a large share of your CRS points.",
      },
      {
        title: "Create your Express Entry profile.",
        body: "You enter the pool with a calculated CRS score. Your profile is generally valid for up to twelve months, and you can update it as your circumstances change.",
      },
      {
        title: "Improve your score while you wait.",
        body: "A stronger language result, a provincial nomination, a qualifying job offer, or a spouse's credentials can each raise your ranking. Small gains often decide whether a draw reaches you.",
      },
    ],
    results: [
      { value: "67/100", label: "FSW eligibility points", caption: "A common minimum to qualify, not to be invited" },
      { value: "600", label: "Points a nomination can add", caption: "A provincial nomination is a major CRS factor" },
      { value: "~6 mo.", label: "Typical processing target", caption: "IRCC's stated service standard, not a promise" },
    ],
    testimonial: {
      quote:
        "I thought my score was fixed. Retaking my language test and understanding the skill-transferability points changed how I read every draw that followed.",
      name: "Adeola Bello",
      role: "Express Entry PR applicant, Lagos to Toronto",
      initials: "AB",
    },
    sections: [
      {
        heading: "Why the CRS, not the calendar, decides things",
        body: "Express Entry ranks everyone in the pool against each other. IRCC holds regular draws and invites profiles at or above a cut-off score. Because the cut-off moves with each draw and with category-based rounds, two people with identical timelines can have very different outcomes based on a handful of points. Understanding which points are within your control, language, a nomination, a spouse's profile, is what turns a passive wait into a plan.",
      },
      {
        heading: "Where applicants commonly leave points behind",
        body: "The most frequent gap we see is a language result one band below what a person could realistically achieve, which can cost meaningful points across multiple categories at once. The second is incomplete documentation of work experience, which can shrink the experience claimed. Neither is about luck; both are about preparation before the profile goes in.",
      },
      {
        heading: "What this guide does not promise",
        body: "No consultant can guarantee an invitation or a particular score, and you should be cautious of anyone who does. What an RCIC-led review can do is assess your eligibility accurately, identify the levers most likely to help your case, and make sure your profile reflects your circumstances correctly so you are not ranked below where you belong.",
      },
    ],
    timeToShip: "Profiles valid ~12 months",
    status: "live",
  },
  {
    slug: "super-visa",
    industry: "Family",
    outcome: "Bring parents and grandparents for extended visits.",
    subhead:
      "How the Super Visa lets eligible parents and grandparents stay in Canada for years at a time, and what the insurance and income requirements actually involve.",
    intro:
      "The Super Visa is a multiple-entry visa for the parents and grandparents of Canadian citizens and permanent residents. Unlike a regular visitor visa, it can allow stays of up to five years per entry and remains valid for up to ten years. It is often the more realistic path for families who want time together without waiting on the Parent and Grandparent Program lottery. This guide covers who qualifies, what the sponsor must show, and the medical-insurance rule that trips up most first attempts.",
    stack: [
      { name: "Who qualifies", role: "Parents and grandparents of a citizen or PR" },
      { name: "Income & invitation", role: "Meeting the minimum income and writing the letter of invitation" },
      { name: "Medical insurance", role: "The mandatory coverage that must be in place before approval" },
    ],
    steps: [
      {
        title: "Confirm the relationship and the host's status.",
        body: "The applicant must be the parent or grandparent of a Canadian citizen or permanent resident. Dependants generally cannot be included on a Super Visa application.",
      },
      {
        title: "Meet the minimum income requirement.",
        body: "The host in Canada must show income at or above the low income cut-off for their family size, usually evidenced by a Notice of Assessment or equivalent. Family size includes the visiting parents or grandparents.",
      },
      {
        title: "Arrange qualifying medical insurance.",
        body: "Coverage from an approved insurer must meet the required minimum, cover the required period, and be valid for entry. This is a hard requirement, not a recommendation.",
      },
      {
        title: "Submit the application with a letter of invitation.",
        body: "The host writes a signed letter of invitation describing the visit, the relationship, and their commitment to support. The application is assessed like any temporary residence request.",
      },
    ],
    results: [
      { value: "Up to 5 yr", label: "Stay per entry", caption: "On a single entry, subject to the officer's decision" },
      { value: "Up to 10 yr", label: "Visa validity", caption: "Multiple entry, within passport validity" },
      { value: "$15k+", label: "Minimum insurance coverage", caption: "Illustrative; confirm the current required amount" },
    ],
    testimonial: {
      quote:
        "We had been refused on a regular visitor application. Getting the insurance and income letter right the second time made all the difference, my mother spent the whole winter with us.",
      name: "Harpreet Singh",
      role: "Super Visa host, Brampton",
      initials: "HS",
    },
    sections: [
      {
        heading: "Why the Super Visa often beats waiting on the lottery",
        body: "The Parent and Grandparent Program is intake-limited and selects sponsors through a randomised invitation round, so many families wait years without ever being invited. The Super Visa is not capped in the same way; it is assessed on its own merits whenever you apply. For families whose priority is time together rather than immediate permanent residence, it is frequently the faster and more dependable route.",
      },
      {
        heading: "The insurance rule that causes most refusals",
        body: "Applicants are often refused because their medical insurance does not meet every condition, the coverage amount, the term, the validity on entry, or the insurer's eligibility. Buying a policy that looks similar is not enough; it must satisfy the specific requirements in force at the time. We treat this as a checklist item to verify, not assume.",
      },
      {
        heading: "What an officer is really assessing",
        body: "Even with income and insurance in order, a Super Visa is still a temporary residence application, so the officer must be satisfied the applicant will respect the terms of their stay. Ties to the home country, the purpose and length of the visit, and the consistency of the documents all matter. A clear, well-evidenced application is the goal, and no honest adviser can promise the outcome.",
      },
    ],
    timeToShip: "Processing varies by visa office",
    status: "live",
  },
  {
    slug: "study-to-pr",
    industry: "Study Pathway",
    outcome: "Turn a Canadian study permit into permanent residence.",
    subhead:
      "The realistic route from a study permit, through a post-graduation work permit, to permanent residence, and the decisions in year one that shape it.",
    intro:
      "Many permanent residents began as international students, but the path is not automatic. It depends on choosing an eligible institution and program, qualifying for a post-graduation work permit, and building the Canadian work experience that economic programs reward. This guide maps the sequence so you can make year-one choices, school, program length, location, with permanent residence already in view rather than discovered late.",
    stack: [
      { name: "Study permit", role: "Eligible institution, program, and proof of funds" },
      { name: "Post-graduation work permit", role: "Open work permit tied to program length" },
      { name: "PR pathway", role: "Canadian Experience Class or a provincial stream" },
    ],
    steps: [
      {
        title: "Choose a designated institution and an eligible program.",
        body: "A post-graduation work permit is only available after studying at an eligible designated learning institution in a qualifying program. This choice at the start constrains everything downstream.",
      },
      {
        title: "Maintain status and study full-time.",
        body: "Keep your study permit valid, stay enrolled as required, and follow the conditions on your permit. Lapses can affect both graduation and later permit eligibility.",
      },
      {
        title: "Apply for the post-graduation work permit on time.",
        body: "After graduating, apply within the allowed window. The permit length is tied to the length of your program, and that duration affects how much qualifying work experience you can build.",
      },
      {
        title: "Build experience, then enter an economic stream.",
        body: "Skilled Canadian work experience can open the Canadian Experience Class through Express Entry, or a Provincial Nominee stream. Your CRS score and the right stream are assessed case by case.",
      },
    ],
    results: [
      { value: "Up to 3 yr", label: "PGWP length", caption: "Tied to program length, where eligible" },
      { value: "1 yr", label: "Experience for CEC", caption: "Qualifying skilled work, an illustrative threshold" },
      { value: "Varies", label: "PR timelines", caption: "Depends on stream and individual profile" },
    ],
    testimonial: {
      quote:
        "Nobody told me my program length would decide how long my work permit lasted. Planning that early is the reason I had enough experience when I applied.",
      name: "Maria Santos",
      role: "Study to PR, Manila to Vancouver",
      initials: "MS",
    },
    sections: [
      {
        heading: "Why year-one choices matter most",
        body: "The biggest decisions in a study-to-PR journey are made before a single class begins: the institution, the program, and its length. These determine post-graduation work permit eligibility and duration, which in turn shape how much skilled experience you can accumulate for economic programs. Students who choose with permanent residence in mind tend to face fewer dead ends than those who optimise only for tuition or location.",
      },
      {
        heading: "Where the path commonly breaks",
        body: "Two failure points recur: enrolling in a program or institution that does not lead to a post-graduation work permit, and missing the application window after graduation. Both are avoidable with planning. A short eligibility check before you accept an offer can save a year of lost runway later.",
      },
      {
        heading: "An honest word on outcomes",
        body: "Studying in Canada improves your options, but it does not guarantee permanent residence; economic programs remain competitive and rules change. What an RCIC-led plan offers is a clear-eyed sequence, the right program choice, on-time permits, and a realistic PR stream, so your effort compounds toward eligibility rather than scattering.",
      },
    ],
    timeToShip: "Typically a multi-year pathway",
    status: "draft",
  },
  {
    slug: "spousal-sponsorship",
    industry: "Family",
    outcome: "Sponsor your spouse or partner for permanent residence.",
    subhead:
      "What it takes to sponsor a spouse, common-law, or conjugal partner, and why a genuine, well-documented relationship is the heart of every approval.",
    intro:
      "Spousal sponsorship lets a Canadian citizen or permanent resident bring their spouse or partner to Canada as a permanent resident. The legal test is straightforward in principle, the relationship must be genuine and not entered into primarily for immigration, but the evidence required to demonstrate that surprises many couples. This guide explains the streams, the sponsor's obligations, and how to assemble proof that reflects a real life together.",
    stack: [
      { name: "Eligibility", role: "Who can sponsor and who can be sponsored" },
      { name: "Inland vs. outland", role: "Choosing the stream that fits your situation" },
      { name: "Relationship evidence", role: "Documenting a genuine, continuing relationship" },
    ],
    steps: [
      {
        title: "Confirm sponsor eligibility.",
        body: "The sponsor must generally be a Canadian citizen or permanent resident, at least eighteen, and able to meet the undertaking to support the sponsored person.",
      },
      {
        title: "Choose inland or outland.",
        body: "Inland applies when the couple lives together in Canada and may allow an open work permit; outland is processed through a visa office and can suit couples living apart. The right choice depends on your facts.",
      },
      {
        title: "Assemble relationship evidence.",
        body: "Joint finances, shared address history, communication records, photos over time, and statements from people who know you build a picture of a genuine relationship. Quality and consistency matter more than volume.",
      },
      {
        title: "Submit and respond to requests.",
        body: "After submission, an officer may ask for more information or an interview. Clear, prompt, consistent responses keep the application on track.",
      },
    ],
    results: [
      { value: "12 mo.", label: "Common processing target", caption: "IRCC's stated standard, not a guarantee" },
      { value: "3 yr", label: "Sponsorship undertaking", caption: "Typical length of the sponsor's commitment to a partner" },
      { value: "1 stream", label: "Inland or outland", caption: "Chosen to fit how and where you live" },
    ],
    testimonial: {
      quote:
        "We almost under-documented our relationship because it felt obvious to us. Being shown what an officer actually needs to see changed how we put our application together.",
      name: "Daniel and Aisha Okonkwo",
      role: "Outland spousal sponsorship, Toronto",
      initials: "DO",
    },
    sections: [
      {
        heading: "Genuineness is the whole case",
        body: "Almost every spousal refusal comes back to one question: is the relationship genuine? Officers are trained to look for consistency across the timeline of your relationship, how you met, how it developed, how you share a life now. The aim is not to produce a thick file but a coherent one, where the documents tell the same true story as your interview would.",
      },
      {
        heading: "Inland and outland are not interchangeable",
        body: "Choosing the wrong stream can cost months or limit your ability to work or travel during processing. Inland can offer an open work permit but may restrict travel; outland may suit couples living apart and can have different processing dynamics. The right answer depends on where you live, whether you need to work, and how often you travel.",
      },
      {
        heading: "What we will and will not claim",
        body: "We cannot promise an approval, and a genuine relationship is something you live, not something we manufacture. What we do is help you present it accurately and completely, choose the stream that fits, anticipate the officer's questions, and avoid the documentation gaps that turn strong relationships into avoidable refusals.",
      },
    ],
    timeToShip: "Often around 12 months",
    status: "draft",
  },
  {
    slug: "refusal-recovery",
    industry: "Refusals",
    outcome: "Understand a refusal and choose the right next step.",
    subhead:
      "A refusal is not always the end. This guide explains how to read the officer's reasons, when to reapply, and when reconsideration, appeal, or judicial review is the better route.",
    intro:
      "Receiving a refusal is stressful, and the instinct is often to reapply immediately with the same materials. That rarely helps. The first task is to understand exactly why the application was refused, which usually means reading the officer's notes, and then to choose the response that actually fits the reason. This guide walks through the main options so the next step addresses the real problem rather than repeating it.",
    stack: [
      { name: "Read the reasons", role: "Decoding the refusal letter and the officer's notes" },
      { name: "Choose the route", role: "Reapply, reconsideration, appeal, or judicial review" },
      { name: "Fix the cause", role: "Addressing what actually drove the decision" },
    ],
    steps: [
      {
        title: "Obtain and read the full reasons.",
        body: "The refusal letter is often brief. The detailed reasoning typically sits in the officer's notes, which can be requested. Understanding the true ground for refusal is the only sound basis for a next step.",
      },
      {
        title: "Diagnose the real cause.",
        body: "Was it insufficient funds, weak ties, a documentation gap, a credibility concern, or a legal eligibility issue? Each points to a different remedy. Reapplying without diagnosis usually repeats the result.",
      },
      {
        title: "Choose the appropriate route.",
        body: "Sometimes a stronger fresh application is best; sometimes a reconsideration request, an appeal where one exists, or judicial review at the Federal Court is more appropriate. The right choice depends on the program and the reason.",
      },
      {
        title: "Rebuild the case around the gap.",
        body: "Whatever route you choose, the new submission should directly answer the officer's concern with evidence, not volume. Address the specific reason, not a general impression of strength.",
      },
    ],
    results: [
      { value: "Step 1", label: "Read the reasons first", caption: "Notes before any new submission" },
      { value: "4 routes", label: "Reapply, reconsider, appeal, review", caption: "The route depends on the refusal ground" },
      { value: "Case by case", label: "What's realistic", caption: "Outcomes depend on facts and law" },
    ],
    testimonial: {
      quote:
        "I was about to send the exact same application again. Reading the officer's notes showed the real issue was something I'd never have guessed, and we fixed that instead.",
      name: "Wei Chen",
      role: "Study permit refusal, resolved on reapplication",
      initials: "WC",
    },
    sections: [
      {
        heading: "Why reapplying blindly usually fails",
        body: "If you resubmit without knowing why you were refused, you are likely to reproduce the same gap and the same outcome, while spending more fees and time. Officers refuse for specific reasons. A response that does not engage that specific reason gives the next officer no reason to decide differently. Diagnosis before action is the whole discipline here.",
      },
      {
        heading: "Choosing between reapplication and a legal challenge",
        body: "Not every refusal should be challenged, and not every refusal should simply be re-filed. A documentation gap may be best fixed in a fresh application; a decision that appears unreasonable in law may warrant judicial review at the Federal Court within strict deadlines. Knowing which lever fits the situation is where professional review earns its place.",
      },
      {
        heading: "An honest assessment, not false hope",
        body: "Some refusals are readily addressable; others reflect a genuine eligibility problem that no rewording will solve. A responsible adviser will tell you which one you are facing rather than sell another attempt. The goal of this guide is to help you act on the real reason, with the route most likely to be worth your effort.",
      },
    ],
    timeToShip: "Some routes have strict deadlines",
    status: "draft",
  },
];
