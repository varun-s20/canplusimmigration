"use client";

import { useMemo, useState } from "react";
import NumberFlow from "@number-flow/react";
import { motion, useReducedMotion } from "motion/react";
import { Button } from "@/components/ui/Button";
import { estimateCRS, type CRSInput, type CRSResult } from "@/lib/crs";
import { cn } from "@/lib/cn";

type Option<T extends string | number> = { value: T; label: string };

const ageOptions: Option<number>[] = [
  { value: 22, label: "18-24" },
  { value: 27, label: "25-29" },
  { value: 32, label: "30-34" },
  { value: 37, label: "35-39" },
  { value: 42, label: "40-44" },
  { value: 47, label: "45+" },
];

const educationOptions: Option<CRSInput["education"]>[] = [
  { value: "highschool", label: "High school" },
  { value: "diploma", label: "1-year diploma" },
  { value: "bachelors", label: "Bachelor's" },
  { value: "twoOrMore", label: "Two+ credentials" },
  { value: "masters", label: "Master's" },
  { value: "phd", label: "PhD" },
];

const languageOptions: Option<CRSInput["language"]>[] = [
  { value: "clb5", label: "CLB 5" },
  { value: "clb6", label: "CLB 6" },
  { value: "clb7", label: "CLB 7" },
  { value: "clb8", label: "CLB 8" },
  { value: "clb9", label: "CLB 9" },
  { value: "clb10", label: "CLB 10+" },
];

const expOptions: Option<number>[] = [
  { value: 0, label: "None" },
  { value: 1, label: "1 yr" },
  { value: 2, label: "2 yrs" },
  { value: 3, label: "3 yrs" },
  { value: 4, label: "4 yrs" },
  { value: 5, label: "5+ yrs" },
];

const bandCopy: Record<
  CRSResult["band"],
  { label: string; blurb: string }
> = {
  limited: {
    label: "Limited",
    blurb:
      "Express Entry looks unlikely on these inputs alone. There may be other programs, or ways to strengthen your profile, that fit you better. A licensed consultant can map the realistic paths.",
  },
  moderate: {
    label: "Moderate",
    blurb:
      "You're in the conversation, but typically below recent draw cut-offs. Targeted gains, often in language or a provincial nomination, can move you into range.",
  },
  competitive: {
    label: "Competitive",
    blurb:
      "Your estimated score is in a healthy range and close to many recent draws. Sharpening one or two factors could tip you over the line.",
  },
  strong: {
    label: "Strong",
    blurb:
      "Your estimated score sits at or above many recent draw cut-offs. This is a promising starting point, an exact assessment will confirm where you truly stand.",
  },
};

const bandTone: Record<CRSResult["band"], string> = {
  limited: "text-accent-ink/60",
  moderate: "text-accent-ink/75",
  competitive: "text-accent-ink/90",
  strong: "text-accent-ink",
};

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-2.5 flex items-baseline justify-between gap-2">
        <span className="eyebrow text-ink">{label}</span>
        {hint ? <span className="text-xs text-ink-muted">{hint}</span> : null}
      </div>
      {children}
    </div>
  );
}

function Segmented<T extends string | number>({
  options,
  value,
  onChange,
  name,
}: {
  options: Option<T>[];
  value: T;
  onChange: (value: T) => void;
  name: string;
}) {
  const reduced = useReducedMotion();
  return (
    <div
      role="radiogroup"
      aria-label={name}
      className="flex flex-wrap gap-px overflow-hidden rounded-[4px] bg-line hairline"
    >
      {options.map((opt) => {
        const active = opt.value === value;
        return (
          <button
            key={String(opt.value)}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(opt.value)}
            className={cn(
              "relative flex-1 px-3.5 py-2.5 text-[13px] font-medium transition-colors duration-200",
              active
                ? "text-accent-ink"
                : "bg-card text-ink-muted hover:bg-bg hover:text-ink",
            )}
          >
            {active &&
              (reduced ? (
                <span aria-hidden className="absolute inset-0 bg-accent" />
              ) : (
                <motion.span
                  aria-hidden
                  layoutId={`seg-${name}`}
                  className="absolute inset-0 bg-accent"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                />
              ))}
            <span className="relative z-10">{opt.label}</span>
          </button>
        );
      })}
    </div>
  );
}

function Toggle({
  label,
  hint,
  checked,
  onChange,
}: {
  label: string;
  hint: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={cn(
        "flex w-full items-center justify-between gap-4 rounded-[4px] px-4 py-3.5 text-left transition-colors duration-200 hairline",
        checked ? "bg-accent text-accent-ink" : "bg-card text-ink hover:bg-bg",
      )}
    >
      <span>
        <span className="block text-[14px] font-medium">{label}</span>
        <span
          className={cn(
            "mt-0.5 block text-xs",
            checked ? "text-accent-ink/65" : "text-ink-muted",
          )}
        >
          {hint}
        </span>
      </span>
      <span
        className={cn(
          "relative h-6 w-10 shrink-0 rounded-[3px] transition-colors duration-200",
          checked ? "bg-accent-ink/30" : "bg-ink/15",
        )}
      >
        <span
          className={cn(
            "absolute top-1 h-4 w-4 rounded-[2px] transition-all duration-200",
            checked ? "left-5 bg-accent-ink" : "left-1 bg-card",
          )}
        />
      </span>
    </button>
  );
}

export function EligibilityEstimator({ className }: { className?: string }) {
  const reduced = useReducedMotion();

  const [age, setAge] = useState<number>(27);
  const [education, setEducation] =
    useState<CRSInput["education"]>("bachelors");
  const [language, setLanguage] = useState<CRSInput["language"]>("clb8");
  const [canExp, setCanExp] = useState<number>(0);
  const [foreignExp, setForeignExp] = useState<number>(2);
  const [jobOffer, setJobOffer] = useState<boolean>(false);
  const [provincialNomination, setProvincialNomination] =
    useState<boolean>(false);

  const result = useMemo<CRSResult>(
    () =>
      estimateCRS({
        age,
        education,
        language,
        canExp,
        foreignExp,
        jobOffer,
        provincialNomination,
      }),
    [age, education, language, canExp, foreignExp, jobOffer, provincialNomination],
  );

  const copy = bandCopy[result.band];

  return (
    <div className={cn("container-page", className)}>
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8">
        {/* Inputs */}
        <div className="rounded-[4px] bg-card p-6 hairline md:p-8">
          <div className="flex flex-col gap-6">
            <Field label="Age" hint="Your age today">
              <Segmented
                name="Age"
                options={ageOptions}
                value={age}
                onChange={setAge}
              />
            </Field>
            <Field label="Highest education" hint="Completed credential">
              <Segmented
                name="Education"
                options={educationOptions}
                value={education}
                onChange={setEducation}
              />
            </Field>
            <Field
              label="First official language"
              hint="English or French (CLB)"
            >
              <Segmented
                name="Language"
                options={languageOptions}
                value={language}
                onChange={setLanguage}
              />
            </Field>
            <Field label="Canadian work experience" hint="Skilled, in Canada">
              <Segmented
                name="Canadian work experience"
                options={expOptions}
                value={canExp}
                onChange={setCanExp}
              />
            </Field>
            <Field label="Foreign work experience" hint="Skilled, abroad">
              <Segmented
                name="Foreign work experience"
                options={expOptions}
                value={foreignExp}
                onChange={setForeignExp}
              />
            </Field>
            <div className="flex flex-col gap-3 pt-1">
              <Toggle
                label="Valid job offer"
                hint="Arranged employment in Canada"
                checked={jobOffer}
                onChange={setJobOffer}
              />
              <Toggle
                label="Provincial nomination"
                hint="A nomination adds 600 points"
                checked={provincialNomination}
                onChange={setProvincialNomination}
              />
            </div>
          </div>
        </div>

        {/* Result */}
        <div className="flex flex-col gap-6">
          <div className="rounded-[4px] bg-accent p-6 text-accent-ink md:p-8">
            <div className="flex items-center justify-between gap-4">
              <span className="eyebrow text-accent-ink/65">Estimated CRS</span>
              <span
                className={cn(
                  "eyebrow",
                  bandTone[result.band],
                )}
              >
                {copy.label}
              </span>
            </div>

            <div className="mt-4 flex items-end gap-2">
              <span className="font-display text-[64px] font-extrabold leading-none tracking-tight text-accent-ink md:text-[80px]">
                {reduced ? (
                  result.score
                ) : (
                  <NumberFlow value={result.score} />
                )}
              </span>
              <span className="mb-2 text-lg text-accent-ink/50">
                / {result.maxScore}
              </span>
            </div>

            {/* Track */}
            <div className="mt-5 h-2 w-full overflow-hidden rounded-[2px] bg-accent-ink/20">
              <div
                className={cn(
                  "h-full bg-accent-ink",
                  reduced ? "" : "transition-[width] duration-500 ease-out",
                )}
                style={{
                  width: `${Math.min(100, (result.score / result.maxScore) * 100)}%`,
                }}
              />
            </div>

            <p className="mt-5 text-[14px] leading-relaxed text-accent-ink/80">
              {copy.blurb}
            </p>
          </div>

          {/* Breakdown */}
          <div className="rounded-[4px] bg-card p-6 hairline md:p-8">
            <h3 className="eyebrow text-ink-muted">How it adds up</h3>
            <ul className="mt-4 flex flex-col">
              {result.breakdown.map((row) => (
                <li
                  key={row.label}
                  className="flex items-center justify-between border-b border-line py-2.5 text-[14px] last:border-0"
                >
                  <span className="text-ink-muted">{row.label}</span>
                  <span className="font-display font-bold text-ink">
                    +{row.points}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Disclaimer + CTA */}
      <div className="mt-6 flex flex-col items-start gap-5 rounded-[4px] border-l-2 border-accent bg-card p-6 hairline md:flex-row md:items-center md:justify-between md:p-8">
        <p className="max-w-[60ch] text-[14px] leading-relaxed text-ink-muted">
          <span className="font-medium text-ink">
            This is an estimate, not legal advice or a guarantee.
          </span>{" "}
          The official Comprehensive Ranking System is more detailed than this
          tool, and draw cut-offs change. Book a consultation with a licensed
          RCIC for an exact assessment.
        </p>
        <Button href="/contact" variant="primary" size="lg" className="shrink-0">
          Book a free consultation
        </Button>
      </div>
    </div>
  );
}
