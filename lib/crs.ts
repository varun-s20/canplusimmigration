/**
 * Express Entry CRS / eligibility ESTIMATOR.
 *
 * IMPORTANT: This is a SIMPLIFIED ESTIMATE only. It is NOT legal advice, NOT a
 * guarantee of eligibility or outcome, and is NOT affiliated with, endorsed by,
 * or representative of IRCC (Immigration, Refugees and Citizenship Canada) or
 * the official Comprehensive Ranking System.
 *
 * The official CRS uses a far more detailed model (spouse factors, second
 * official language, skill transferability combinations, French bonuses,
 * sibling points, certificate of qualification, etc.). This function uses a
 * plausible approximation tuned to feel directionally correct for a quick
 * self-assessment. For an exact assessment, applicants should consult a
 * licensed RCIC.
 */

export type CRSInput = {
  age: number; // years
  education:
    | "highschool"
    | "diploma"
    | "bachelors"
    | "twoOrMore"
    | "masters"
    | "phd";
  language: "clb5" | "clb6" | "clb7" | "clb8" | "clb9" | "clb10"; // first official language
  canExp: number; // years of Canadian skilled work experience (0-5+)
  foreignExp: number; // years of foreign skilled work experience (0-5+)
  jobOffer?: boolean; // valid arranged employment
  provincialNomination?: boolean;
};

export type CRSResult = {
  score: number;
  maxScore: number; // 1200
  band: "limited" | "moderate" | "competitive" | "strong";
  breakdown: { label: string; points: number }[];
};

const MAX_SCORE = 1200;

/** Age points: peak through the 20s, then a steady decline toward zero by ~45+. */
function agePoints(age: number): number {
  if (age <= 17) return 0;
  if (age <= 19) return 90;
  if (age >= 20 && age <= 29) return 110; // peak band
  if (age === 30) return 105;
  if (age === 31) return 99;
  if (age === 32) return 94;
  if (age === 33) return 88;
  if (age === 34) return 83;
  if (age === 35) return 77;
  if (age === 36) return 72;
  if (age === 37) return 66;
  if (age === 38) return 61;
  if (age === 39) return 55;
  if (age === 40) return 50;
  if (age === 41) return 39;
  if (age === 42) return 28;
  if (age === 43) return 17;
  if (age === 44) return 6;
  return 0; // 45 and older
}

/** Education tiers, single applicant (no-spouse style weighting). */
function educationPoints(education: CRSInput["education"]): number {
  switch (education) {
    case "highschool":
      return 30;
    case "diploma":
      return 90; // one-year post-secondary credential
    case "bachelors":
      return 120; // 3+ year degree
    case "twoOrMore":
      return 128; // two or more credentials, one 3+ years
    case "masters":
      return 135;
    case "phd":
      return 150;
  }
}

/** First official language (CLB) tiers across the four abilities, approximated. */
function languagePoints(language: CRSInput["language"]): number {
  switch (language) {
    case "clb5":
      return 32;
    case "clb6":
      return 48;
    case "clb7":
      return 68;
    case "clb8":
      return 88;
    case "clb9":
      return 116;
    case "clb10":
      return 124;
  }
}

/** Canadian skilled work experience is worth more than foreign, and caps at 5 years. */
function canadianExpPoints(years: number): number {
  const y = Math.max(0, Math.min(5, Math.floor(years)));
  const table = [0, 40, 53, 64, 72, 80];
  return table[y];
}

/**
 * Foreign skilled work experience. On its own it earns no core points in the
 * real model, but it contributes via skill-transferability with language. We
 * approximate that transferability bonus here, capped at 3 years / 50 points.
 */
function foreignExpPoints(years: number, language: CRSInput["language"]): number {
  const y = Math.max(0, Math.min(3, Math.floor(years)));
  if (y === 0) return 0;
  // Stronger language unlocks the higher transferability tier.
  const strongLanguage =
    language === "clb9" || language === "clb10" || language === "clb8";
  const perYear = strongLanguage ? 17 : 9;
  return Math.min(50, y * perYear);
}

/**
 * Estimate an Express Entry CRS score from a simplified set of inputs.
 *
 * The result is clamped to [0, 1200]. Bands:
 *   - provincialNomination  => "strong" (a nomination adds 600 points)
 *   - score >= 470          => "strong"
 *   - score >= 400          => "competitive"
 *   - score >= 350          => "moderate"
 *   - otherwise             => "limited"
 *
 * @returns score, maxScore (1200), band, and a labelled breakdown.
 */
export function estimateCRS(input: CRSInput): CRSResult {
  const breakdown: { label: string; points: number }[] = [];

  const age = agePoints(input.age);
  breakdown.push({ label: "Age", points: age });

  const education = educationPoints(input.education);
  breakdown.push({ label: "Education", points: education });

  const language = languagePoints(input.language);
  breakdown.push({ label: "Language ability", points: language });

  const canExp = canadianExpPoints(input.canExp);
  breakdown.push({ label: "Canadian work experience", points: canExp });

  const foreignExp = foreignExpPoints(input.foreignExp, input.language);
  breakdown.push({ label: "Foreign work experience", points: foreignExp });

  const jobOffer = input.jobOffer ? 50 : 0;
  if (input.jobOffer) {
    breakdown.push({ label: "Valid job offer", points: jobOffer });
  }

  const nomination = input.provincialNomination ? 600 : 0;
  if (input.provincialNomination) {
    breakdown.push({ label: "Provincial nomination", points: nomination });
  }

  const raw =
    age + education + language + canExp + foreignExp + jobOffer + nomination;
  const score = Math.max(0, Math.min(MAX_SCORE, raw));

  let band: CRSResult["band"];
  if (input.provincialNomination) {
    band = "strong";
  } else if (score >= 470) {
    band = "strong";
  } else if (score >= 400) {
    band = "competitive";
  } else if (score >= 350) {
    band = "moderate";
  } else {
    band = "limited";
  }

  return { score, maxScore: MAX_SCORE, band, breakdown };
}
