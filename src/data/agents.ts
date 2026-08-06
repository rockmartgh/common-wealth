export type AgentSocial = {
  facebook: string;
  instagram: string;
};

export type Agent = {
  slug: string;
  name: string;
  role: string;
  phone: string;
  phoneHref: string;
  email: string;
  emailHref: string;
  shortBio: string;
  fullBio: string;
  expertise: string[];
  image: string;
  imageAlt: string;
  cta: string;
  social: AgentSocial;
};

export const agents: Agent[] = [
  {
    slug: "renee-reed",
    name: "Renee Reed",
    role: "First-Time Buyer Expert",
    phone: "1 (407) 453-8983",
    phoneHref: "tel:+14074538983",
    email: "fryarrenee@gmail.com",
    emailHref: "mailto:fryarrenee@gmail.com",
    shortBio:
      "Renee brings warmth, professionalism, and specialized expertise to first-time homebuyers. Her attentive and client-focused approach helps make each transaction clear, comfortable, and rewarding.",
    fullBio:
      "Renee Reed specializes in guiding first-time buyers through every stage of the homebuying process. She is known for clear communication, patient education, and a calm presence when decisions feel overwhelming. From early conversations about budgets and neighborhoods to offer strategy and closing day, Renee stays closely involved so clients always know what comes next. Her approach balances practical market insight with genuine care for the people she serves.",
    expertise: [
      "First-time homebuyers",
      "Personal guidance",
      "Clear communication",
      "Transaction support",
      "Warm client service",
    ],
    image: "/images/agents/renee-reed.jpg",
    imageAlt: "Portrait of Renee Reed, First-Time Buyer Expert at Commonwealth Realty",
    cta: "Meet Renee",
    social: {
      facebook: "https://www.facebook.com/share/1F6rrtewuv/",
      instagram: "https://www.instagram.com/realtorrenee_fl/",
    },
  },
  {
    slug: "anita-boyd",
    name: "Anita Boyd",
    role: "Luxury and Commercial Expert",
    phone: "1 (407) 468-9827",
    phoneHref: "tel:+14074689827",
    email: "commonwealthagent@gmail.com",
    emailHref: "mailto:commonwealthagent@gmail.com",
    shortBio:
      "Anita brings deep market knowledge, negotiation experience, and a commitment to excellence across luxury residential and commercial real estate.",
    fullBio:
      "Anita Boyd leads Commonwealth Realty’s luxury residential and commercial practice with a steady, strategic approach. She helps clients evaluate opportunity with clarity—whether the goal is a refined family residence, a carefully positioned listing, or a commercial property aligned with long-term plans. Anita’s strength lies in combining local market fluency with disciplined negotiation, always with an eye toward outcomes that feel considered and well-supported.",
    expertise: [
      "Luxury residential properties",
      "Commercial real estate",
      "Market knowledge",
      "Negotiation",
      "Strategic guidance",
    ],
    image: "/images/agents/anita-boyd.jpg",
    imageAlt: "Portrait of Anita Boyd, Luxury and Commercial Expert at Commonwealth Realty",
    cta: "Meet Anita",
    social: {
      facebook: "https://www.facebook.com/CommonwealthRealtyCorp",
      instagram: "https://www.instagram.com/anitareal_estate/",
    },
  },
];
