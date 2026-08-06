export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/team", label: "Team" },
  { href: "/services", label: "Services" },
  { href: "/properties", label: "Properties" },
  { href: "/blog", label: "Blog" },
  { href: "/home-search", label: "Home Search" },
  { href: "/contact", label: "Contact Us" },
] as const;

export const serviceLinks = [
  { href: "/services#buy", label: "Buy a Home" },
  { href: "/services#sell", label: "Sell a Home" },
  { href: "/services#commercial", label: "Commercial Real Estate" },
] as const;

export const contactInfo = {
  phones: [
    { label: "Anita Boyd", value: "1 (407) 468-9827", href: "tel:+14074689827" },
    { label: "Renee Reed", value: "1 (407) 453-8983", href: "tel:+14074538983" },
  ],
  emails: [
    { label: "Anita Boyd", value: "commonwealthagent@gmail.com", href: "mailto:commonwealthagent@gmail.com" },
    { label: "Renee Reed", value: "fryarrenee@gmail.com", href: "mailto:fryarrenee@gmail.com" },
  ],
  location: "Central Florida",
  address: "6249 Edgewater Dr Ste V1-2, Orlando, FL 32810",
  addressLines: ["6249 Edgewater Dr Ste V1-2", "Orlando, FL 32810"],
} as const;
