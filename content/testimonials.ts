export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  initials: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "They walked me through my CRS score honestly, no inflated promises, just a clear plan. Knowing exactly which levers mattered took the panic out of every draw.",
    name: "Adeola Bello",
    role: "Express Entry PR, Lagos to Toronto",
    initials: "AB",
  },
  {
    quote:
      "Our first visitor application for my mother was refused. With the income letter and insurance done right, the Super Visa came through and she spent the winter with her grandchildren.",
    name: "Harpreet Singh",
    role: "Super Visa host, Brampton",
    initials: "HS",
  },
  {
    quote:
      "We almost under-documented our marriage because it felt obvious to us. Being shown what an officer actually needs to see changed how we built the whole application.",
    name: "Daniel and Aisha Okonkwo",
    role: "Spousal sponsorship, Toronto",
    initials: "DO",
  },
];
