import { SectionLabel } from "@/components/ui/SectionLabel";
import { Rule } from "@/components/ui/Rule";
import { Button } from "@/components/ui/Button";
import { buildMetadata } from "@/lib/seo";

const services = [
  "Work Permits",
  "Study Permits",
  "Visitor & Super Visa",
  "Permanent Residence",
  "Refugee & Asylum",
  "TRP & Inadmissibility",
  "PR Card & Citizenship",
  "Complex & Refused",
];

export const metadata = buildMetadata({
  title: "Book a free consultation",
  description:
    "Tell us about your immigration goals and we'll give you an honest read on your options. Book a free consultation with a Regulated Canadian Immigration Consultant.",
  path: "/contact",
});

const fieldClass =
  "min-h-[44px] w-full rounded-[4px] border border-line bg-card px-4 py-3 text-sm text-ink placeholder:text-ink-muted/70 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30";

export default function ContactPage() {
  return (
    <article className="container-page py-16 md:py-24">
      <SectionLabel>Contact</SectionLabel>
      <h1 className="mt-6 max-w-[20ch] display-hero break-words">
        Tell us about your Canadian plans.
      </h1>
      <p className="mt-7 max-w-[58ch] lede text-ink-muted">
        Book a free consultation and we&apos;ll give you an honest read on your options, with no obligation and no false promises.
      </p>

      <div className="mt-12 md:mt-16">
        <Rule />
      </div>

      <div className="grid gap-12 pt-12 md:grid-cols-[1.2fr_1fr] md:gap-16 md:pt-16">
        <form className="space-y-6" action="/api/lead" method="post">
          <Field id="name" label="Your name" placeholder="Jane Doe" />
          <Field id="email" label="Email" placeholder="jane@example.com" type="email" />
          <Field id="phone" label="Phone (optional)" placeholder="+1 555 123 4567" type="tel" />
          <div className="space-y-2">
            <label htmlFor="service" className="eyebrow block">
              Which service?
            </label>
            <select
              id="service"
              name="service"
              defaultValue=""
              className={fieldClass}
            >
              <option value="" disabled>
                Select a service…
              </option>
              {services.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <label htmlFor="message" className="eyebrow block">
              Tell us about your situation
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              placeholder="Your goals, current status in Canada, timelines, or any refusals so far…"
              className={fieldClass}
            />
          </div>
          <Button size="lg" variant="primary" className="w-full">
            Book a free consultation
          </Button>
          <p className="text-xs text-ink-muted">
            We&apos;ll get back within one business day. This form is the first step, not formal representation, which begins only under a signed retainer.
          </p>
        </form>

        <aside className="flex flex-col gap-10">
          <div className="bg-surface-dark p-8 text-bg" data-nav-theme="dark">
            <h2 className="font-display text-xl font-bold tracking-tight text-bg">Not sure where to start?</h2>
            <p className="mt-3 text-sm text-bg/70">
              Take our free eligibility assessment first. It gives you an instant, illustrative estimate of your options before we speak.
            </p>
            <Button href="/eligibility" variant="primary" className="mt-6">
              Free eligibility assessment
            </Button>
          </div>
          <div>
            <Rule label="Office hours" />
            <p className="mt-5 text-base text-ink">Mon–Fri · 9am–6pm ET</p>
            <p className="mt-2 text-base text-ink-muted">
              Regulated by the CICC. Your information is kept strictly confidential.
            </p>
          </div>
        </aside>
      </div>
    </article>
  );
}

function Field({
  id,
  label,
  placeholder,
  type = "text",
}: {
  id: string;
  label: string;
  placeholder: string;
  type?: string;
}) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="eyebrow block">{label}</label>
      <input
        id={id}
        name={id}
        type={type}
        placeholder={placeholder}
        className="min-h-[44px] w-full rounded-[4px] border border-line bg-card px-4 py-3 text-sm text-ink placeholder:text-ink-muted/70 focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
      />
    </div>
  );
}
