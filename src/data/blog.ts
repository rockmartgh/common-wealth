export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  image: string;
  featured?: boolean;
};

export const blogPosts: BlogPost[] = [
  {
    slug: "central-florida-spring-market",
    title: "What Buyers Should Know About Central Florida’s Current Market",
    excerpt:
      "A clear look at pricing patterns, inventory shifts, and how thoughtful preparation can strengthen your position as a buyer.",
    category: "Market Updates",
    author: "Anita Boyd",
    date: "March 12, 2026",
    readTime: "6 min read",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
    featured: true,
  },
  {
    slug: "first-time-buyer-checklist",
    title: "A Calm Checklist for First-Time Homebuyers",
    excerpt:
      "From early conversations to closing day, a practical sequence that keeps the process clear and manageable.",
    category: "First-Time Buyers",
    author: "Renee Reed",
    date: "February 28, 2026",
    readTime: "5 min read",
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "preparing-your-home-to-sell",
    title: "Preparing Your Home to Sell with Confidence",
    excerpt:
      "Small, intentional improvements and clear positioning can help your property present well without overcomplicating the process.",
    category: "Selling Advice",
    author: "Anita Boyd",
    date: "February 10, 2026",
    readTime: "7 min read",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "commercial-site-selection",
    title: "How to Evaluate a Commercial Location in Central Florida",
    excerpt:
      "Visibility, access, neighboring uses, and long-term flexibility—what matters when weighing a commercial opportunity.",
    category: "Commercial Insights",
    author: "Anita Boyd",
    date: "January 22, 2026",
    readTime: "8 min read",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "winter-park-neighborhood-guide",
    title: "A Quiet Guide to Living Near Winter Park",
    excerpt:
      "Tree-lined streets, walkable pockets, and residential character that continues to draw buyers seeking established communities.",
    category: "Neighborhood Guides",
    author: "Renee Reed",
    date: "January 8, 2026",
    readTime: "6 min read",
    image:
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cd00?auto=format&fit=crop&w=1200&q=80",
  },
];
