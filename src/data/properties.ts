export type Property = {
  slug: string;
  status: "For Sale" | "Pending" | "Sold" | "Commercial";
  category: "residential" | "commercial";
  address: string;
  city: string;
  state: string;
  zip: string;
  price: number;
  beds?: number;
  baths?: number;
  sqft: number;
  type: string;
  description: string;
  features: string[];
  image: string;
  gallery: string[];
  featured?: boolean;
  agentSlug: "renee-reed" | "anita-boyd";
};

export const properties: Property[] = [
  {
    slug: "100-huntswood-court",
    status: "For Sale",
    category: "residential",
    address: "100 Huntswood Court",
    city: "Longwood",
    state: "FL",
    zip: "32750-2709",
    price: 499500,
    beds: 5,
    baths: 3,
    sqft: 2054,
    type: "Single Family",
    description:
      "Set on a quiet court in Longwood, this thoughtfully maintained residence offers generous living space, a flexible floor plan, and an easy connection to Central Florida’s everyday conveniences. Bright living areas open toward outdoor space designed for Florida living, while the primary suite and secondary bedrooms provide room for family, guests, and work-from-home needs.",
    features: [
      "Quiet cul-de-sac setting",
      "Open living and dining areas",
      "Updated kitchen finishes",
      "Primary suite with ensuite bath",
      "Covered outdoor living",
      "Nearby parks and daily conveniences",
    ],
    image: "/images/properties/100-huntswood-court.jpg",
    gallery: [
      "/images/properties/100-huntswood-court.jpg",
      "/images/properties/huntswood.jpg",
      "/images/properties/huntswood-gallery-2.jpg",
      "/images/properties/huntswood-gallery-3.jpg",
    ],
    featured: true,
    agentSlug: "anita-boyd",
  },
];

export function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(price);
}

export function getPropertyBySlug(slug: string) {
  return properties.find((property) => property.slug === slug);
}

export function getFeaturedProperty() {
  return properties.find((property) => property.featured) ?? properties[0];
}
