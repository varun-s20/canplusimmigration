import { SectionLabel } from "@/components/ui/SectionLabel";
import { Rule } from "@/components/ui/Rule";
import { Prose } from "@/components/content/Prose";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({ title: "Privacy", path: "/legal/privacy" });

export default function PrivacyPage() {
  return (
    <article className="container-page max-w-3xl py-16 md:py-24">
      <SectionLabel>Legal</SectionLabel>
      <h1 className="mt-6 font-display text-[40px] font-extrabold leading-[0.98] tracking-tight md:text-[60px]">
        Privacy Policy
      </h1>
      <p className="mt-4 text-sm text-ink-muted">Last updated: {new Date().getFullYear()}</p>
      <div className="mt-8">
        <Rule />
      </div>
      <Prose className="mt-10">
        <p>
          CanPlus Immigration is committed to protecting your privacy. This policy explains how we
          collect, use, and safeguard the personal information you share with us. Final copy is to be
          reviewed by counsel before launch.
        </p>

        <h2>Information we collect</h2>
        <p>
          To assess your eligibility and prepare immigration applications, we collect personal
          information such as your name, contact details, immigration and travel history,
          identity and civil documents, education and employment records, and other information
          required by Immigration, Refugees and Citizenship Canada (IRCC). We only collect what is
          necessary to advise you and to prepare and submit your application.
        </p>

        <h2>How we use your information</h2>
        <p>
          We use your information to provide our consulting services: to assess your eligibility,
          prepare and file applications on your behalf, communicate with you and with government
          authorities, and meet our professional and legal obligations as a regulated practice.
        </p>

        <h2>Disclosure and storage</h2>
        <p>
          We disclose your information to IRCC and other relevant government authorities as required
          to advance your application, and only as needed. We do not sell your personal information.
          Your information is stored securely and retained in line with our professional obligations
          and applicable Canadian privacy law.
        </p>

        <h2>Your rights</h2>
        <p>
          You may request access to the personal information we hold about you and ask us to correct
          it. To make a request or ask a question about this policy, please contact us.
        </p>
      </Prose>
    </article>
  );
}
