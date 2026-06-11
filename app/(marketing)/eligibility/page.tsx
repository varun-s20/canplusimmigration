import { EligibilityEstimator } from "@/components/sections/EligibilityEstimator";
import { PageHero } from "@/components/layout/PageHero";
import { BreadcrumbLd } from "@/components/seo/JsonLd";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Free eligibility assessment",
  description:
    "Estimate your Express Entry CRS score in seconds, then book a free consultation with a licensed RCIC for an exact, personalized assessment.",
  path: "/eligibility",
});

export default function EligibilityPage() {
  return (
    <>
      <PageHero
        label="Free eligibility assessment"
        title="Estimate your Express Entry score"
        lede="Answer a few quick questions to see where you might land on the Comprehensive Ranking System. It's an instant estimate, a guide for your next step, not a final verdict. When you're ready, a licensed consultant will give you the exact picture."
      />

      <section className="pb-20 md:pb-28">
        <EligibilityEstimator />
      </section>

      <BreadcrumbLd
        crumbs={[
          { name: "Home", href: "/" },
          { name: "Eligibility", href: "/eligibility" },
        ]}
      />
    </>
  );
}
