import type { FAQItem } from "@/components/content/FAQ";
import type { KPI } from "@/components/content/KPIRow";

export type Slug =
  | "work-permits"
  | "study-permits"
  | "visitor-super-visa"
  | "permanent-residence"
  | "refugee-asylum"
  | "trp-inadmissibility"
  | "pr-card-citizenship"
  | "complex-refused";

export type FeatureBlock = {
  title: string;
  body: string;
  bullets: string[];
};

export type Service = {
  slug: Slug;
  name: string;
  tagline: string;
  blurb: string;
  /** Short capability bullets used in the homepage stack. */
  capabilities: string[];
  /** Deep feature blocks for the service detail page. */
  blocks: FeatureBlock[];
  /** Relevant programs, pathways, and document items for this service. */
  integrations: string[];
  /** Illustrative track-record figures (non-guarantee; client to replace). */
  kpis: KPI[];
  /** Service-specific FAQ for the detail page. */
  faq: FAQItem[];
  /** Three audience descriptors this service is best suited for. */
  bestFor: string[];
};

export const services: Service[] = [
  {
    slug: "work-permits",
    name: "Work Permits & Extensions",
    tagline: "Work in Canada, with your status on solid ground.",
    blurb:
      "We guide workers and employers through LMIA-based and LMIA-exempt work permits, open and closed permits, and timely extensions, so your right to work stays valid and your file stays compliant.",
    capabilities: [
      "LMIA applications and Employer Portal compliance support",
      "International Mobility Program (LMIA-exempt) work permits",
      "Open and closed (employer-specific) work permit preparation",
      "Extensions, restorations, and bridging open work permits",
    ],
    blocks: [
      {
        title: "The right pathway: LMIA or LMIA-exempt.",
        body: "Not every job needs a Labour Market Impact Assessment, and choosing the wrong route costs time and money. We assess your offer, occupation, and circumstances to determine whether you qualify under the Temporary Foreign Worker Program or the International Mobility Program. From there we build the application IRCC and ESDC expect to see.",
        bullets: [
          "Eligibility assessment against TFWP and IMP streams",
          "NOC classification and wage-floor review for the role",
          "Guidance on CUSMA, intra-company transfers, and other exemptions",
        ],
      },
      {
        title: "Employer compliance, handled properly.",
        body: "Canadian employers carry real obligations once a foreign worker is hired, from accurate job offers to inspection-ready records. We prepare LMIA applications, complete Employer Portal offers of employment, and help you keep documentation that withstands review. The goal is a hire that holds up.",
        bullets: [
          "LMIA application drafting and recruitment-evidence assembly",
          "Employer Portal offer-of-employment submissions",
          "Compliance file preparation for potential ESDC or IRCC inspections",
        ],
      },
      {
        title: "Extensions and status, before the clock runs out.",
        body: "Status problems are easier to prevent than to fix. We track your permit expiry, prepare extensions early, and where eligible secure a bridging open work permit so you can keep working while a permanent-residence application is processed. If status has already lapsed, we assess restoration options.",
        bullets: [
          "Work permit extensions filed ahead of expiry",
          "Bridging open work permit assessment for PR applicants",
          "Restoration of status guidance within the eligible window",
        ],
      },
    ],
    integrations: [
      "LMIA (TFWP)",
      "International Mobility Program",
      "CUSMA / Free-trade work permits",
      "Intra-Company Transfers",
      "Open Work Permit",
      "Employer-Specific Work Permit",
      "Bridging Open Work Permit",
      "Employer Portal",
      "IELTS / CELPIP (where required)",
    ],
    kpis: [
      { value: "150+", label: "Work permit files guided", caption: "Across all streams since 2013 — illustrative" },
      { value: "30+", label: "Employers supported", caption: "On LMIA and compliance — illustrative" },
      { value: "10+ yrs", label: "RCIC-led experience", caption: "Licensed and regulated — illustrative" },
    ],
    faq: [
      {
        q: "Do I need an LMIA to work in Canada?",
        a: "Not always. Many roles qualify under the International Mobility Program, which is LMIA-exempt, including certain trade-agreement and intra-company transfer categories. We assess your specific offer to confirm which route applies before any application is filed.",
      },
      {
        q: "Can I change employers on a closed work permit?",
        a: "An employer-specific permit ties you to one employer. To change, you typically need a new work permit tied to the new job. We can prepare that application and, where eligible, advise on continuing to work during processing.",
      },
      {
        q: "What happens if my work permit is about to expire?",
        a: "Apply for an extension before it expires. We prepare extensions early and, for those with a permanent-residence application in progress, assess eligibility for a bridging open work permit so you can keep working.",
      },
      {
        q: "Can you help my company hire a foreign worker?",
        a: "Yes. We guide employers through LMIA applications, Employer Portal offers of employment, and the recordkeeping that supports compliance, so the hire is built on a defensible foundation.",
      },
    ],
    bestFor: ["Foreign workers in Canada", "Canadian employers hiring abroad", "Permit holders nearing expiry"],
  },
  {
    slug: "study-permits",
    name: "Study Permits & Extensions",
    tagline: "Study in Canada, with a clear path beyond graduation.",
    blurb:
      "We prepare study permit applications and extensions, help you keep status while you study, and map the co-op and post-graduation routes that can lead toward permanent residence.",
    capabilities: [
      "Study permit applications, including the PAL/TAL where required",
      "Study permit extensions and change of conditions",
      "Co-op and intern work permit guidance for required placements",
      "Study-to-PR pathway planning (PGWP and beyond)",
    ],
    blocks: [
      {
        title: "A study permit application that reflects a genuine plan.",
        body: "A strong application shows that you are a genuine student with the means to study and clear intentions. We help assemble proof of acceptance, financial capacity, and ties, and prepare a study plan that addresses what IRCC looks for. Where your province and institution require a Provincial Attestation Letter, we account for it.",
        bullets: [
          "Letter of acceptance and DLI verification review",
          "Proof of funds and study-plan preparation",
          "Provincial Attestation Letter (PAL/TAL) considerations where applicable",
        ],
      },
      {
        title: "Keep your status valid while you study.",
        body: "Extending a study permit, switching institutions, or changing the conditions on your permit all need to be handled on time. We prepare extensions before expiry and advise on maintaining status if your current permit lapses while a new application is pending, so your studies are not interrupted.",
        bullets: [
          "Study permit extensions filed ahead of expiry",
          "Change of designated learning institution or program guidance",
          "Maintained-status advice while an extension is in process",
        ],
      },
      {
        title: "From classroom to career, and toward PR.",
        body: "Studying in Canada can open doors to working here, both during and after your program. We advise on co-op or intern work permits for required placements, eligibility for a Post-Graduation Work Permit, and how Canadian study and work experience can strengthen a future Express Entry or PNP profile.",
        bullets: [
          "Co-op / intern work permit eligibility for required placements",
          "Post-Graduation Work Permit (PGWP) eligibility assessment",
          "Mapping study and Canadian work experience toward PR streams",
        ],
      },
    ],
    integrations: [
      "Study Permit",
      "Study Permit Extension",
      "Provincial Attestation Letter (PAL/TAL)",
      "Designated Learning Institution",
      "Co-op / Intern Work Permit",
      "Post-Graduation Work Permit (PGWP)",
      "Proof of Funds",
      "IELTS / TOEFL / CELPIP",
      "Express Entry (CEC)",
    ],
    kpis: [
      { value: "200+", label: "Student files guided", caption: "Across institutions since 2013 — illustrative" },
      { value: "20+", label: "Partner institutions worked with", caption: "Public and private DLIs — illustrative" },
      { value: "10+ yrs", label: "RCIC-led experience", caption: "Licensed and regulated — illustrative" },
    ],
    faq: [
      {
        q: "What is a Provincial Attestation Letter and do I need one?",
        a: "For many study permit applications, IRCC now requires a Provincial Attestation Letter (PAL) or Territorial Attestation Letter (TAL) confirming you fall within a province's allocation. Requirements vary by applicant and program, so we confirm whether one applies to your file before submitting.",
      },
      {
        q: "Can I work while I study?",
        a: "Eligible students can often work on or off campus within set limits, and co-op or intern permits may be required for placements that are part of your program. We confirm your specific eligibility based on your permit and program.",
      },
      {
        q: "Will studying in Canada help me become a permanent resident?",
        a: "It can. Canadian credentials and post-graduation work experience can strengthen an Express Entry or Provincial Nominee Program profile. We help you plan your studies with those pathways in mind, while being clear that PR is never guaranteed.",
      },
      {
        q: "My study permit is expiring before I graduate. What do I do?",
        a: "Apply to extend before it expires. We prepare extensions early and advise on maintaining status if your current permit lapses while the extension is being processed.",
      },
    ],
    bestFor: ["Prospective international students", "Students extending or transferring", "Graduates eyeing PR pathways"],
  },
  {
    slug: "visitor-super-visa",
    name: "Visitor Visa & Super Visa",
    tagline: "Bring family to visit, and keep them close for longer.",
    blurb:
      "We prepare Temporary Resident Visas, Super Visa applications for parents and grandparents, and visitor extensions, building applications that address admissibility, genuine purpose, and ties.",
    capabilities: [
      "Temporary Resident Visa (TRV) applications and refusals review",
      "Super Visa applications for parents and grandparents",
      "Visitor record extensions to stay longer in Canada",
      "Invitation letters, funds, and purpose-of-visit guidance",
    ],
    blocks: [
      {
        title: "A visitor visa application that answers the real questions.",
        body: "A Temporary Resident Visa turns on whether an officer is satisfied you will visit for a genuine purpose and leave at the end of your stay. We help you present clear purpose, sufficient funds, and meaningful ties to your home country, and prepare a supporting letter that ties the evidence together.",
        bullets: [
          "Purpose-of-visit and itinerary preparation",
          "Proof of funds and home-country ties assembly",
          "Host invitation letters and supporting documentation",
        ],
      },
      {
        title: "The Super Visa: years with family, not weeks.",
        body: "The Super Visa lets eligible parents and grandparents of Canadian citizens and permanent residents visit for extended, multiple-entry stays. We confirm the host's income meets the minimum threshold, arrange the required Canadian medical insurance, and prepare the relationship and invitation evidence the program demands.",
        bullets: [
          "Host income (LICO-based) and relationship verification",
          "Qualifying Canadian medical insurance coordination",
          "Multiple-entry, extended-stay application preparation",
        ],
      },
      {
        title: "Already here and want to stay longer?",
        body: "Visitors who wish to extend their stay can apply for a visitor record before their authorized period ends. We assess eligibility, prepare the extension, and advise on maintaining status while the application is processed, so your time with family is not cut short.",
        bullets: [
          "Visitor record extension applications",
          "Maintained-status guidance while an extension is pending",
          "Advice on restoring status within the eligible window",
        ],
      },
    ],
    integrations: [
      "Temporary Resident Visa (TRV)",
      "Super Visa",
      "Visitor Record / Extension",
      "Host Income (LICO)",
      "Super Visa Medical Insurance",
      "Invitation Letter",
      "Proof of Funds",
      "Immigration Medical Exam (where required)",
      "Multiple-Entry Visa",
    ],
    kpis: [
      { value: "180+", label: "Visitor & Super Visa files guided", caption: "Since 2013 — illustrative" },
      { value: "4 of 5", label: "Clients who reapply with us", caption: "For family visits — illustrative" },
      { value: "10+ yrs", label: "RCIC-led experience", caption: "Licensed and regulated — illustrative" },
    ],
    faq: [
      {
        q: "What is the difference between a visitor visa and a Super Visa?",
        a: "A standard Temporary Resident Visa is for short visits. A Super Visa is specifically for parents and grandparents of Canadian citizens or permanent residents and allows much longer, multiple-entry stays, but it carries additional requirements such as host income and Canadian medical insurance.",
      },
      {
        q: "My visitor visa was refused before. Can I reapply?",
        a: "Often, yes. We review the refusal reasons, identify what the application needs to address, and help you present a stronger, better-documented case. We focus on improving your chances; we never guarantee an outcome.",
      },
      {
        q: "How long can my parents stay on a Super Visa?",
        a: "The Super Visa is designed for extended visits per entry, well beyond a typical visitor stay, with multiple entries over the validity period. We confirm the current terms that apply to your application during your consultation.",
      },
      {
        q: "Can I extend my stay once I am already in Canada?",
        a: "Eligible visitors can apply for a visitor record to extend their stay before their current period ends. We prepare the extension and advise on maintaining status while it is processed.",
      },
    ],
    bestFor: ["Families inviting relatives", "Parents and grandparents", "Visitors extending their stay"],
  },
  {
    slug: "permanent-residence",
    name: "Permanent Residence: Express Entry / PNP / Sponsorship",
    tagline: "Build the case for your life in Canada.",
    blurb:
      "We assess your eligibility across Express Entry, Provincial Nominee Programs, and family sponsorship, then prepare a complete, accurate application designed to put your best profile forward.",
    capabilities: [
      "Express Entry profiles and CRS optimization strategy",
      "Provincial Nominee Program (PNP) stream selection and applications",
      "Spousal, common-law, and family sponsorship",
      "Document, language, and credential-assessment preparation",
    ],
    blocks: [
      {
        title: "Express Entry, with your CRS working for you.",
        body: "Express Entry ranks candidates by a Comprehensive Ranking System score across age, education, language, and experience. We assess your profile honestly, identify where points can legitimately be improved, and prepare your Educational Credential Assessment and language results so your profile is accurate and competitive. We can never promise an invitation, but we make sure your profile reflects your real strengths.",
        bullets: [
          "CRS assessment with realistic improvement strategy",
          "Educational Credential Assessment (ECA) coordination",
          "Federal Skilled Worker, CEC, and trades eligibility review",
        ],
      },
      {
        title: "Provincial Nominee Programs, matched to you.",
        body: "Provinces nominate candidates who fit their labour-market needs, and a nomination can substantially strengthen a permanent-residence application. We match your occupation, experience, and ties to the right PNP stream, then prepare the provincial application and the federal stage that follows.",
        bullets: [
          "PNP stream selection across multiple provinces",
          "Expression of interest and nomination application preparation",
          "Coordination between provincial nomination and federal PR",
        ],
      },
      {
        title: "Family sponsorship, prepared to be believed.",
        body: "Sponsoring a spouse, partner, or family member requires a genuine relationship and a sponsor who meets the eligibility rules. We prepare relationship evidence that reflects your reality, confirm sponsor eligibility and undertakings, and assemble an application built to withstand scrutiny.",
        bullets: [
          "Spousal and common-law relationship-evidence preparation",
          "Sponsor eligibility and undertaking review",
          "Inland and outland sponsorship strategy",
        ],
      },
    ],
    integrations: [
      "Express Entry",
      "Comprehensive Ranking System (CRS)",
      "Federal Skilled Worker Program",
      "Canadian Experience Class (CEC)",
      "Provincial Nominee Program (PNP)",
      "Spousal / Common-Law Sponsorship",
      "Family Sponsorship",
      "Educational Credential Assessment (ECA)",
      "IELTS / CELPIP / TEF / TCF",
    ],
    kpis: [
      { value: "250+", label: "PR files guided", caption: "Across streams since 2013 — illustrative" },
      { value: "12+", label: "Provincial streams worked with", caption: "Across Canada — illustrative" },
      { value: "10+ yrs", label: "RCIC-led experience", caption: "Licensed and regulated — illustrative" },
    ],
    faq: [
      {
        q: "Can you guarantee I will get permanent residence?",
        a: "No reputable consultant can. Decisions rest with IRCC and the provinces. What we do is assess your eligibility honestly, prepare an accurate and complete application, and present your profile in its strongest legitimate form to improve your chances.",
      },
      {
        q: "How can I improve my CRS score?",
        a: "Common levers include language results, education credentials, additional work experience, and a provincial nomination. We review your profile and outline which improvements are realistic for your situation, with no inflated promises.",
      },
      {
        q: "Which is better, Express Entry or a PNP?",
        a: "It depends on your profile, occupation, and where you want to settle. For some candidates a provincial nomination is the stronger route; for others Express Entry alone is competitive. We assess both and recommend the path that fits you.",
      },
      {
        q: "How long does spousal sponsorship take?",
        a: "Processing times change and depend on whether you apply inland or outland and on IRCC's current workload. During your consultation we explain current timelines and help you choose the approach that suits your circumstances.",
      },
    ],
    bestFor: ["Skilled workers seeking PR", "Provincially nominated candidates", "Couples and families reuniting"],
  },
  {
    slug: "refugee-asylum",
    name: "Refugee Claims & Political Asylum",
    tagline: "When returning home is not safe, we help you be heard.",
    blurb:
      "We support in-Canada refugee claimants and asylum seekers with eligibility assessment, evidence preparation, and hearing readiness before the Immigration and Refugee Board, with care and discretion.",
    capabilities: [
      "Refugee claim eligibility assessment and intake",
      "Basis of Claim narrative and evidence preparation",
      "Hearing preparation for the Refugee Protection Division",
      "Humanitarian and compassionate considerations where relevant",
    ],
    blocks: [
      {
        title: "Understanding whether you can claim, and how.",
        body: "Refugee protection in Canada is for people who face a well-founded fear of persecution or a risk to their safety if returned. We assess your circumstances against the eligibility rules, explain the process clearly, and help you understand your rights at each stage. These are sensitive matters, and we treat them with the discretion they deserve.",
        bullets: [
          "Eligibility assessment against protection grounds",
          "Plain-language explanation of the claim process and timelines",
          "Confidential, respectful intake of your situation",
        ],
      },
      {
        title: "Your Basis of Claim, told accurately and completely.",
        body: "The Basis of Claim form is the heart of your case, where you set out who you are, what you fear, and why. We help you prepare a truthful, coherent narrative supported by country-condition evidence, identity documents, and corroborating material, so your account is presented clearly and consistently.",
        bullets: [
          "Basis of Claim (BOC) narrative preparation",
          "Country-condition and corroborating evidence gathering",
          "Identity and supporting document organization",
        ],
      },
      {
        title: "Ready for your hearing.",
        body: "A hearing before the Refugee Protection Division can be daunting. We prepare you for what to expect, review your evidence and testimony, and help you understand the questions a member may ask, so you can give your account clearly and consistently. Where appropriate, we also discuss humanitarian and compassionate considerations.",
        bullets: [
          "Refugee Protection Division hearing preparation",
          "Testimony and evidence review ahead of the hearing",
          "Guidance on humanitarian and compassionate factors where relevant",
        ],
      },
    ],
    integrations: [
      "In-Canada Refugee Claim",
      "Basis of Claim (BOC)",
      "Refugee Protection Division (IRB)",
      "Country-of-Origin Evidence",
      "Pre-Removal Risk Assessment",
      "Humanitarian & Compassionate (H&C)",
      "Work Permit for Claimants",
      "Interim Federal Health Program",
    ],
    kpis: [
      { value: "100+", label: "Protection files supported", caption: "Since 2013 — illustrative" },
      { value: "Discreet", label: "Confidential by default", caption: "Sensitive matters handled with care" },
      { value: "10+ yrs", label: "RCIC-led experience", caption: "Licensed and regulated — illustrative" },
    ],
    faq: [
      {
        q: "Who can make a refugee claim in Canada?",
        a: "Protection is intended for people who fear persecution or face risk if returned to their home country. Eligibility depends on your specific situation and how you entered Canada. We assess your circumstances confidentially before any step is taken.",
      },
      {
        q: "Can I work while my claim is being processed?",
        a: "Many claimants become eligible for a work permit during processing. We assess your eligibility and help you apply so you can support yourself while you wait.",
      },
      {
        q: "What happens at the hearing?",
        a: "A member of the Refugee Protection Division reviews your evidence and asks about your claim. We prepare you thoroughly for what to expect so you can present your account clearly and consistently. We support your case; the decision rests with the Board.",
      },
      {
        q: "Will my information be kept confidential?",
        a: "Yes. Refugee matters are sensitive, and we handle your information with discretion and care throughout the process.",
      },
    ],
    bestFor: ["In-Canada refugee claimants", "Asylum seekers preparing hearings", "Those fearing return home"],
  },
  {
    slug: "trp-inadmissibility",
    name: "TRP & Inadmissibility",
    tagline: "A past obstacle does not have to close the door.",
    blurb:
      "We help people who may be inadmissible on criminal or medical grounds, preparing Temporary Resident Permits, criminal rehabilitation, and the arguments that put your case in its proper context.",
    capabilities: [
      "Inadmissibility assessment (criminal, medical, and other grounds)",
      "Temporary Resident Permit (TRP) applications",
      "Criminal rehabilitation and deemed-rehabilitation guidance",
      "Submissions addressing the underlying admissibility concern",
    ],
    blocks: [
      {
        title: "First, understand exactly why you may be inadmissible.",
        body: "Inadmissibility can arise from a criminal record, a medical condition, misrepresentation, and other grounds, and each calls for a different response. We assess your specific situation, identify the precise basis of concern, and explain the realistic options available to you, whether that is a permit, rehabilitation, or addressing the issue head-on.",
        bullets: [
          "Review of criminal, medical, and other inadmissibility grounds",
          "Assessment of equivalency for offences outside Canada",
          "Clear explanation of available remedies and timelines",
        ],
      },
      {
        title: "A Temporary Resident Permit, when you need to travel now.",
        body: "A Temporary Resident Permit can allow entry to Canada despite inadmissibility when there is a compelling reason that outweighs the risk. We prepare a TRP application that sets out your purpose, addresses the underlying concern honestly, and gives an officer the context to weigh your need to be here.",
        bullets: [
          "TRP applications for work, study, family, or business reasons",
          "Submissions balancing your need against the inadmissibility",
          "Supporting documentation and purpose-of-entry evidence",
        ],
      },
      {
        title: "Rehabilitation: resolving inadmissibility for the long term.",
        body: "For criminal inadmissibility, rehabilitation can permanently resolve the issue rather than addressing it trip by trip. We assess whether you may be deemed rehabilitated by the passage of time or should apply for criminal rehabilitation, then prepare submissions that demonstrate the matter is genuinely behind you.",
        bullets: [
          "Criminal rehabilitation application preparation",
          "Deemed-rehabilitation eligibility assessment",
          "Evidence of rehabilitation and changed circumstances",
        ],
      },
    ],
    integrations: [
      "Temporary Resident Permit (TRP)",
      "Criminal Rehabilitation",
      "Deemed Rehabilitation",
      "Criminal Inadmissibility (A36)",
      "Medical Inadmissibility",
      "Equivalency Assessment",
      "Police Certificates",
      "Authorization to Return to Canada (ARC)",
    ],
    kpis: [
      { value: "90+", label: "Admissibility files guided", caption: "Since 2013 — illustrative" },
      { value: "Multiple", label: "Inadmissibility grounds handled", caption: "Criminal, medical, and more — illustrative" },
      { value: "10+ yrs", label: "RCIC-led experience", caption: "Licensed and regulated — illustrative" },
    ],
    faq: [
      {
        q: "I have a criminal record. Can I still enter Canada?",
        a: "Possibly. Depending on the offence and how much time has passed, you may be eligible for a Temporary Resident Permit, deemed rehabilitation, or criminal rehabilitation. We assess your specific record and equivalency under Canadian law before advising on the best route.",
      },
      {
        q: "What is the difference between a TRP and rehabilitation?",
        a: "A Temporary Resident Permit allows entry for a specific period despite inadmissibility, while rehabilitation can resolve criminal inadmissibility permanently. We help you decide which fits your timeline and circumstances.",
      },
      {
        q: "Can a medical condition make me inadmissible?",
        a: "In some cases, certain conditions can raise admissibility concerns, often related to excessive demand on health or social services. We assess whether this applies to you and prepare submissions that address the concern accurately.",
      },
      {
        q: "How long does criminal rehabilitation take?",
        a: "Processing times vary and depend on your circumstances and IRCC's current workload. Because timelines matter for travel, we recommend assessing your options well before you need to enter Canada.",
      },
    ],
    bestFor: ["Travellers with a record", "Those facing medical inadmissibility", "Anyone needing a TRP"],
  },
  {
    slug: "pr-card-citizenship",
    name: "PR Card Renewal & Citizenship",
    tagline: "Protect your status. Become a citizen.",
    blurb:
      "We help permanent residents renew PR cards and meet residency obligations, and guide eligible applicants through the citizenship application and test, so the final steps go smoothly.",
    capabilities: [
      "PR card renewal and replacement applications",
      "Residency obligation assessment and supporting evidence",
      "Citizenship application preparation and eligibility review",
      "Citizenship test and interview preparation",
    ],
    blocks: [
      {
        title: "Renew your PR card with the right evidence.",
        body: "Renewing a PR card is straightforward when your residency obligation is clearly met, and far less so when days are tight or records are incomplete. We confirm whether you satisfy the physical-presence requirement, assemble the travel history and supporting evidence, and prepare a renewal that reflects your situation accurately.",
        bullets: [
          "PR card renewal and replacement preparation",
          "Travel history and residency-day calculation",
          "Supporting evidence for time inside and outside Canada",
        ],
      },
      {
        title: "Residency obligations, assessed honestly.",
        body: "Permanent residents must meet a physical-presence requirement to keep their status, and shortfalls need careful handling. We assess your days, identify whether time abroad may still count, and where there is a genuine risk discuss humanitarian and compassionate considerations, so you understand exactly where you stand.",
        bullets: [
          "Physical-presence (residency obligation) assessment",
          "Review of time abroad that may still count toward the obligation",
          "Guidance where a residency shortfall exists",
        ],
      },
      {
        title: "From permanent resident to citizen.",
        body: "Canadian citizenship is the culmination of years of building a life here. We confirm you meet the physical-presence, tax-filing, and language requirements, prepare a complete and accurate application, and help you get ready for the citizenship test and any interview, so you walk in confident.",
        bullets: [
          "Citizenship eligibility review (presence, tax, language)",
          "Application preparation and document assembly",
          "Citizenship test and interview preparation",
        ],
      },
    ],
    integrations: [
      "PR Card Renewal",
      "PR Card Replacement",
      "Residency Obligation",
      "Physical Presence Calculation",
      "Citizenship Application",
      "Citizenship Test",
      "Language Requirement (CLB)",
      "Tax-Filing History",
      "Humanitarian & Compassionate (H&C)",
    ],
    kpis: [
      { value: "300+", label: "PR & citizenship files guided", caption: "Since 2013 — illustrative" },
      { value: "Many", label: "New citizens supported", caption: "Through application and test — illustrative" },
      { value: "10+ yrs", label: "RCIC-led experience", caption: "Licensed and regulated — illustrative" },
    ],
    faq: [
      {
        q: "How many days do I need to keep my PR status?",
        a: "Permanent residents generally must be physically present in Canada for a set portion of every five-year period, with some time abroad counting in specific situations. We calculate your days precisely and tell you exactly where you stand before you file.",
      },
      {
        q: "My PR card expired. Have I lost my status?",
        a: "An expired card does not by itself mean you have lost permanent residence. Status depends on meeting your residency obligation, not on the card's date. We assess your situation and prepare the appropriate renewal or supporting application.",
      },
      {
        q: "When can I apply for citizenship?",
        a: "Eligibility depends on meeting the physical-presence requirement, filing taxes where required, and, for many applicants, demonstrating language ability. We review your eligibility carefully so you apply at the right time.",
      },
      {
        q: "Can you help me prepare for the citizenship test?",
        a: "Yes. We help you get ready for the test and any interview so you can attend with confidence and a clear understanding of what to expect.",
      },
    ],
    bestFor: ["PRs renewing their card", "Residents nearing citizenship", "Anyone with a residency-day question"],
  },
  {
    slug: "complex-refused",
    name: "Complex & Refused Cases",
    tagline: "A refusal is a setback, not always the end of the road.",
    blurb:
      "We review refused applications, identify what went wrong, and advise on the next step, whether a stronger reapplication, an appeal, judicial review, or a procedural-fairness response.",
    capabilities: [
      "Refusal analysis and review of GCMS / officer notes",
      "Appeals to the Immigration Appeal Division where available",
      "Judicial review guidance in coordination with counsel",
      "Procedural fairness letter responses",
    ],
    blocks: [
      {
        title: "First, find out exactly why it was refused.",
        body: "A refusal letter rarely tells the whole story. We obtain and review the officer's reasoning, often through the underlying notes, to pinpoint whether the issue was evidence, eligibility, credibility, or a process error. Only once we understand the real reason can we recommend a route that actually addresses it.",
        bullets: [
          "Review of refusal letters and underlying officer notes (GCMS)",
          "Diagnosis of the true basis for the refusal",
          "Honest assessment of whether to reapply, appeal, or seek review",
        ],
      },
      {
        title: "The right remedy: reapply, appeal, or judicial review.",
        body: "Not every refusal should be appealed, and not every case should simply be resubmitted. We explain the options available for your specific decision, including appeals to the Immigration Appeal Division where the right exists and judicial review at the Federal Court, and recommend the path most likely to address the problem. For litigation, we coordinate with legal counsel.",
        bullets: [
          "Immigration Appeal Division appeals where available",
          "Judicial review guidance, in coordination with counsel",
          "Strategic reapplication when that is the stronger option",
        ],
      },
      {
        title: "Responding to procedural fairness, on time and on point.",
        body: "A procedural fairness letter is an opportunity, a chance to respond before a decision is made. We help you understand the concern raised, gather evidence that answers it directly, and prepare a clear, well-supported response within the deadline, so your side of the story is properly before the officer.",
        bullets: [
          "Procedural fairness letter (PFL) response preparation",
          "Targeted evidence to address the specific concern",
          "Submissions filed within the response deadline",
        ],
      },
    ],
    integrations: [
      "Refusal Review",
      "GCMS / Officer Notes",
      "Immigration Appeal Division (IAD)",
      "Judicial Review (Federal Court)",
      "Procedural Fairness Letter (PFL)",
      "Reapplication Strategy",
      "Residency Obligation Appeals",
      "Sponsorship Appeals",
    ],
    kpis: [
      { value: "120+", label: "Complex files reviewed", caption: "Since 2013 — illustrative" },
      { value: "Many", label: "Refusals turned around", caption: "Through reapplication or appeal — illustrative" },
      { value: "10+ yrs", label: "RCIC-led experience", caption: "Licensed and regulated — illustrative" },
    ],
    faq: [
      {
        q: "My application was refused. What should I do first?",
        a: "Before reapplying, understand why it was refused. We review the decision and, where helpful, the officer's underlying notes to find the real reason, then advise whether to reapply, appeal, or seek judicial review. Reapplying without fixing the cause often leads to a second refusal.",
      },
      {
        q: "Can every refusal be appealed?",
        a: "No. Appeal rights depend on the type of decision. Some refusals can be appealed to the Immigration Appeal Division, others are challenged by judicial review at the Federal Court, and some are best addressed by a stronger reapplication. We assess which applies to your case.",
      },
      {
        q: "Do you handle judicial review yourselves?",
        a: "Judicial review is litigation before the Federal Court. We assess your case, guide your strategy, and coordinate with legal counsel where representation in court is required, so the right professional handles each part.",
      },
      {
        q: "I received a procedural fairness letter. Is that a refusal?",
        a: "Not yet. It is your chance to respond to a concern before a decision is made. We help you answer it directly and on time, with evidence that addresses the specific issue raised. Responding well improves your chances, though no response can guarantee approval.",
      },
    ],
    bestFor: ["Applicants facing a refusal", "Those with appeal rights", "Anyone sent a fairness letter"],
  },
];
