import { SectionLabel } from "@/components/ui/SectionLabel";
import { Rule } from "@/components/ui/Rule";
import { Prose } from "@/components/content/Prose";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({ title: "Disclaimer", path: "/legal/disclaimer" });

export default function DisclaimerPage() {
  return (
    <article className="container-page max-w-3xl py-16 md:py-24">
      <SectionLabel>Legal</SectionLabel>
      <h1 className="mt-6 font-display text-[40px] font-extrabold leading-[0.98] tracking-tight md:text-[60px]">
        Disclaimer
      </h1>
      <p className="mt-4 text-sm text-ink-muted">Last updated: {new Date().getFullYear()}</p>
      <div className="mt-8">
        <Rule />
      </div>
      <Prose className="mt-10">
        <p>
          The information on this website is provided by CanPlus Immigration for general
          informational purposes only. Nothing on this site constitutes legal advice, immigration
          advice, or a legal opinion on any specific matter, and it should not be relied upon as a
          substitute for professional advice tailored to your circumstances.
        </p>

        <h2>No client relationship without a retainer</h2>
        <p>
          Reading this website, using our tools, or contacting us through a form does not create a
          consultant-client relationship. Formal representation is provided only under a signed
          retainer agreement with a Regulated Canadian Immigration Consultant (RCIC) who is in good
          standing with, and regulated by, the College of Immigration and Citizenship Consultants
          (CICC).
        </p>

        <h2>Eligibility and CRS estimates</h2>
        <p>
          Any eligibility checker, Comprehensive Ranking System (CRS) score, or points estimate on
          this site is an automated estimate only. It is based on the information you provide and on
          general program criteria, which change over time. It is not an assessment of your file, a
          prediction of any result, or a promise that you qualify for any program. Your actual
          eligibility can only be determined after a detailed review of your full circumstances and
          documentation.
        </p>

        <h2>No guaranteed outcomes</h2>
        <p>
          Immigration results vary from case to case, and no outcome is or can be guaranteed. Be
          cautious of anyone who promises approval. Immigration, Refugees and Citizenship Canada
          (IRCC) and other government authorities make all final decisions on applications, and they
          may refuse an application or change program rules, processing times, and requirements at
          any time without notice.
        </p>

        <h2>External links and accuracy</h2>
        <p>
          We make reasonable efforts to keep the information on this site accurate and current, but
          we make no warranties as to its completeness or accuracy. Where we link to government or
          third-party websites, those sources are authoritative; we are not responsible for their
          content. Always confirm requirements against official IRCC sources or with us directly
          before acting.
        </p>
      </Prose>
    </article>
  );
}
