import { HeroBento } from "@/components/sections/HeroBento";
import { LoopDiagram } from "@/components/sections/LoopDiagram";
import { EligibilityEstimator } from "@/components/sections/EligibilityEstimator";
import { ServicesFeaturesScene } from "@/components/sections/ServicesFeaturesScene";
import { Playbooks } from "@/components/sections/Playbooks";
import { Testimonials } from "@/components/sections/Testimonials";
import { CanadaBand } from "@/components/sections/CanadaBand";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { SmoothScroll } from "@/components/motion/SmoothScroll";
import { SITE_NAME, SITE_URL, buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata({
  description:
    "Licensed Canadian immigration consultants for work permits, study permits, permanent residence, citizenship, and complex or refused cases. Book a free eligibility assessment.",
});

export default function HomePage() {
  return (
    <>
      <SmoothScroll />
      <HeroBento />
      <ServicesFeaturesScene />
      <Playbooks />
      <LoopDiagram />
      <EligibilityEstimator />
      <Testimonials />
      <CanadaBand />
      <FinalCTA />

      {/* Structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ProfessionalService",
            name: SITE_NAME,
            url: SITE_URL,
            areaServed: "CA",
            serviceType: "Immigration consultancy",
            description:
              "Licensed Canadian immigration consultants (RCIC) for work and study permits, permanent residence, citizenship, and complex or refused cases.",
          }),
        }}
      />
    </>
  );
}
