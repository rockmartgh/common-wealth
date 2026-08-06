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
    zip: "32750",
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
  {
    slug: "lake-view-terrace",
    status: "For Sale",
    category: "residential",
    address: "842 Lake View Terrace",
    city: "Winter Park",
    state: "FL",
    zip: "32789",
    price: 875000,
    beds: 4,
    baths: 3.5,
    sqft: 2780,
    type: "Single Family",
    description:
      "A refined Winter Park residence with classic proportions, mature landscaping, and interiors that balance warmth with architectural clarity. Ideal for those seeking an established neighborhood setting with elevated finishes.",
    features: [
      "Mature oak-lined street",
      "Formal and casual living spaces",
      "Chef-ready kitchen",
      "Private outdoor courtyard",
      "Two-car garage",
    ],
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cd00?auto=format&fit=crop&w=1600&q=80",
    ],
    agentSlug: "anita-boyd",
  },
  {
    slug: "cypress-lane-cottage",
    status: "For Sale",
    category: "residential",
    address: "215 Cypress Lane",
    city: "Altamonte Springs",
    state: "FL",
    zip: "32714",
    price: 365000,
    beds: 3,
    baths: 2,
    sqft: 1540,
    type: "Single Family",
    description:
      "An approachable Central Florida home well suited for first-time buyers. Comfortable interiors, a practical layout, and a welcoming outdoor space create an easy place to begin the next chapter.",
    features: [
      "Efficient open layout",
      "Natural light throughout",
      "Fenced backyard",
      "Updated flooring",
      "Close to shopping and dining",
    ],
    image:
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=80",
    ],
    agentSlug: "renee-reed",
  },
  {
    slug: "parkside-mediterranean",
    status: "Pending",
    category: "residential",
    address: "1190 Parkside Drive",
    city: "Maitland",
    state: "FL",
    zip: "32751",
    price: 629000,
    beds: 4,
    baths: 3,
    sqft: 2410,
    type: "Single Family",
    description:
      "Mediterranean-inspired architecture with soft stucco exteriors, arched details, and interiors designed for Florida light. A balanced home for those seeking character without excess.",
    features: [
      "Mediterranean façade",
      "High ceilings",
      "Flexible secondary suite",
      "Covered lanai",
      "Landscaped front courtyard",
    ],
    image:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1600573472592-401b489a3cdc?auto=format&fit=crop&w=1600&q=80",
    ],
    agentSlug: "anita-boyd",
  },
  {
    slug: "orlando-commerce-suite",
    status: "Commercial",
    category: "commercial",
    address: "4500 Commerce Parkway",
    city: "Orlando",
    state: "FL",
    zip: "32819",
    price: 1250000,
    sqft: 6200,
    type: "Office / Flex",
    description:
      "A well-positioned commercial suite suited for professional services or light flex use. Clear access, practical floor plate, and visibility that supports both operations and long-term investment goals.",
    features: [
      "Flexible floor plate",
      "Ample parking",
      "Professional park setting",
      "Signage opportunity",
      "Strong regional access",
    ],
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1600&q=80",
    ],
    agentSlug: "anita-boyd",
  },
  {
    slug: "sandlake-retail-bay",
    status: "Commercial",
    category: "commercial",
    address: "872 Sand Lake Road",
    city: "Orlando",
    state: "FL",
    zip: "32819",
    price: 890000,
    sqft: 2800,
    type: "Retail",
    description:
      "Street-facing retail opportunity in a high-visibility corridor. Suitable for established operators seeking a refined Central Florida presence with practical frontage and customer access.",
    features: [
      "High-visibility frontage",
      "Customer parking",
      "Open retail floor plan",
      "Nearby dining corridor",
      "Investment or owner-user potential",
    ],
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1600&q=80",
    ],
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
