import { SectionLabel } from "@/components/ui/SectionLabel";
import { Rule } from "@/components/ui/Rule";
import { Prose } from "@/components/content/Prose";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({ title: "Terms", path: "/legal/terms" });

export default function TermsPage() {
  return (
    <article className="container-page max-w-3xl py-16 md:py-24">
      <SectionLabel>Legal</SectionLabel>
      <h1 className="mt-6 font-display text-[40px] font-extrabold leading-[0.98] tracking-tight md:text-[60px]">
        Terms of Service
      </h1>
      <p className="mt-4 text-sm text-ink-muted">Last updated: {new Date().getFullYear()}</p>
      <div className="mt-8">
        <Rule />
      </div>
      <Prose className="mt-10">
        <p>
          These terms govern your use of the CanPlus Immigration website. By using this site, you
          agree to them. Final copy is to be reviewed by counsel before launch.
        </p>

        <h2>Information only, not advice</h2>
        <p>
          The content on this website is provided for general information only and does not
          constitute legal or immigration advice. Using this site or contacting us does not create a
          consultant-client relationship. Formal representation is provided only under a signed
          retainer agreement with a Regulated Canadian Immigration Consultant (RCIC) regulated by
          the College of Immigration and Citizenship Consultants (CICC). Please see our{" "}
          <a href="/legal/disclaimer">Disclaimer</a> for important limitations.
        </p>

        <h2>No guaranteed outcomes</h2>
        <p>
          Immigration outcomes vary and cannot be guaranteed. All final decisions on applications are
          made by Immigration, Refugees and Citizenship Canada (IRCC) and other government
          authorities, which may change rules, requirements, and processing times at any time.
        </p>

        <h2>Eligibility tools</h2>
        <p>
          Any eligibility or score estimators on this site provide illustrative estimates only, based
          on the information you enter and general program criteria. They are not an assessment of
          your file and do not guarantee that you qualify for any program.
        </p>

        <h2>Use of the site</h2>
        <p>
          You agree to use this website lawfully and not to misuse or disrupt it. The site and its
          content are provided on an &ldquo;as is&rdquo; basis without warranties of any kind. We may
          update these terms from time to time; continued use of the site indicates acceptance of any
          changes.
        </p>
      </Prose>
    </article>
  );
}
