export type TeamMember = {
  name: string;
  /** e.g. "Regulated Canadian Immigration Consultant (RCIC)". */
  title: string;
  /** Public RCIC registration number, or "" until provided. PLACEHOLDER. */
  licenseNo: string;
  /** Two short paragraphs. PLACEHOLDER copy — client to replace. */
  bio: string[];
  /** Initials for the avatar tile. */
  initials: string;
  /** Areas of focus shown as small tags. */
  focus: string[];
};

/** PLACEHOLDER team — names, numbers, and bios are illustrative; client to edit. */
export const team: TeamMember[] = [
  {
    name: "A. Consultant",
    title: "Regulated Canadian Immigration Consultant (RCIC)",
    licenseNo: "RXXXXXXX",
    initials: "AC",
    focus: ["Express Entry", "Provincial Nominee", "Work permits"],
    bio: [
      "Lead consultant at CanPlus Immigration and a Regulated Canadian Immigration Consultant in good standing with the College of Immigration and Citizenship Consultants. Over a decade advising clients across economic and family streams.",
      "Known for honest, plain-English assessments and meticulously prepared files — the belief that a well-advised applicant with a complete file always stands a better chance than a strong candidate going it alone.",
    ],
  },
  {
    name: "B. Consultant",
    title: "Regulated Canadian Immigration Consultant (RCIC)",
    licenseNo: "RXXXXXXX",
    initials: "BC",
    focus: ["Spousal sponsorship", "Study permits", "Super Visa"],
    bio: [
      "Family-class and temporary-residence specialist. Works closely with couples and students to build coherent, well-evidenced applications that answer the officer's real questions.",
      "Committed to clients understanding every step of their own case, with no false promises about outcomes that rest with IRCC.",
    ],
  },
  {
    name: "C. Consultant",
    title: "Case Manager & Document Specialist",
    licenseNo: "",
    initials: "CC",
    focus: ["Document review", "Refusals", "TRP & inadmissibility"],
    bio: [
      "Manages complex and previously-refused files, with a focus on diagnosing the real reason behind a refusal before choosing the next step.",
      "Keeps every file inspection-ready: forms cross-checked for consistency and supporting documents organised the way an officer expects to read them.",
    ],
  },
];
