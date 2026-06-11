import { SectionLabel } from "@/components/ui/SectionLabel";
import { IndexRow } from "@/components/ui/IndexRow";
import { buildMetadata } from "@/lib/seo";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { Section } from "@/components/layout/Section";
import { PageHero } from "@/components/layout/PageHero";
import { guides } from "@/content/guides";

export const metadata = buildMetadata({
  title: "Guides",
  description:
    "Plain-English immigration guides on Express Entry, the Super Visa, study-to-PR, spousal sponsorship, and recovering from a refusal.",
  path: "/guides",
});

export default function GuidesPage() {
  const live = guides.filter((g) => g.status === "live");
  const draft = guides.filter((g) => g.status !== "live");

  return (
    <>
      <PageHero
        label="Guides"
        title="Clear answers to the questions that decide your case."
        lede="Pick the pathway that looks like yours. Each guide explains how the program actually works, what the decision really turns on, and the steps worth getting right before you apply, written by a regulated consultancy, with no outcome promises."
      />

      {/* Live guides as a ruled editorial index */}
      <Section space="sm">
        <Stagger step={0.06}>
          {live.map((g, i) => (
            <StaggerItem key={g.slug}>
              <IndexRow
                index={i + 1}
                title={g.outcome}
                sub={`${g.industry} · ${g.timeToShip}`}
                href={`/guides/${g.slug}`}
              />
            </StaggerItem>
          ))}
          <div className="rule" aria-hidden />
        </Stagger>
      </Section>

      {/* Coming-soon rail — subdued ruled list */}
      {draft.length > 0 && (
        <Section space="lg">
          <Reveal>
            <SectionLabel>Up next</SectionLabel>
          </Reveal>
          <Stagger className="mt-6" step={0.06}>
            {draft.map((g) => (
              <StaggerItem key={g.slug}>
                <div className="grid gap-1 border-t border-line py-6 md:grid-cols-[1fr_auto] md:items-baseline md:gap-8">
                  <div>
                    <p className="font-display text-[19px] font-bold leading-tight tracking-tight text-ink-muted md:text-[22px]">
                      {g.outcome}
                    </p>
                    <p className="mt-1 text-sm text-ink-muted/80">{g.industry}</p>
                  </div>
                  <span className="eyebrow text-ink-muted/80">{g.timeToShip} · Coming soon</span>
                </div>
              </StaggerItem>
            ))}
            <div className="rule" aria-hidden />
          </Stagger>
        </Section>
      )}
    </>
  );
}
