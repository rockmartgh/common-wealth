import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FinalCta } from "@/components/FinalCta";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { blogPosts } from "@/data/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Market updates, first-time buyer guidance, selling advice, and Central Florida neighborhood insights from Commonwealth Realty.",
};

const categories = [
  "All",
  "Market Updates",
  "First-Time Buyers",
  "Selling Advice",
  "Commercial Insights",
  "Neighborhood Guides",
];

export default function BlogPage() {
  const featured = blogPosts.find((post) => post.featured) ?? blogPosts[0];
  const supporting = blogPosts.filter((post) => post.slug !== featured.slug);

  return (
    <>
      <PageHero
        eyebrow="Insights"
        title="Perspective on Central Florida Real Estate"
        description="Practical guidance on buying, selling, neighborhoods, and commercial decisions—written with clarity."
        image="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1800&q=80"
        imageAlt="Editorial interior detail suggesting calm residential living"
      />

      <section className="section bg-cream">
        <div className="site-container">
          <Reveal>
            <div className="flex flex-wrap gap-3 border-b border-stone pb-6">
              {categories.map((category, index) => (
                <span
                  key={category}
                  className={`px-3 py-1.5 text-[0.7rem] font-semibold uppercase tracking-[0.14em] ${
                    index === 0
                      ? "bg-burgundy text-cream"
                      : "border border-stone text-olive"
                  }`}
                >
                  {category}
                </span>
              ))}
            </div>
          </Reveal>

          <Reveal delay={60}>
            <article className="mt-12 grid overflow-hidden border border-stone bg-ivory lg:grid-cols-[1.25fr_1fr]">
              <div className="img-zoom relative min-h-[300px] lg:min-h-[480px]">
                <Image
                  src={featured.image}
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col justify-center p-8 md:p-12">
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-gold">
                  Featured · {featured.category}
                </p>
                <h2 className="display mt-4 text-3xl md:text-4xl">
                  {featured.title}
                </h2>
                <p className="mt-5 leading-relaxed text-olive">
                  {featured.excerpt}
                </p>
                <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2 text-sm text-olive">
                  <span>{featured.author}</span>
                  <span>{featured.date}</span>
                  <span>{featured.readTime}</span>
                </div>
                <Link
                  href={`/blog/${featured.slug}`}
                  className="focus-ring group mt-8 inline-flex items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-charcoal"
                >
                  Read Article
                  <span className="transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </div>
            </article>
          </Reveal>

          <div className="mt-16 grid gap-10 lg:grid-cols-12">
            {supporting.map((post, index) => (
              <Reveal
                key={post.slug}
                delay={index * 50}
                className={index === 0 ? "lg:col-span-7" : "lg:col-span-5"}
              >
                <article
                  className={`group h-full border border-stone bg-cream ${
                    index === 0 ? "" : ""
                  }`}
                >
                  <Link href={`/blog/${post.slug}`} className="focus-ring block h-full">
                    <div
                      className={`img-zoom relative ${
                        index === 0 ? "aspect-[16/10]" : "aspect-[5/3]"
                      }`}
                    >
                      <Image
                        src={post.image}
                        alt=""
                        fill
                        sizes="(max-width: 1024px) 100vw, 40vw"
                        className="object-cover"
                      />
                    </div>
                    <div className="p-6 md:p-8">
                      <p className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-gold">
                        {post.category}
                      </p>
                      <h3 className="display mt-3 text-2xl md:text-3xl group-hover:text-burgundy transition-colors">
                        {post.title}
                      </h3>
                      <p className="mt-4 text-sm leading-relaxed text-olive">
                        {post.excerpt}
                      </p>
                      <div className="mt-5 flex flex-wrap gap-x-4 gap-y-1 text-xs uppercase tracking-[0.12em] text-olive">
                        <span>{post.author}</span>
                        <span>{post.date}</span>
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </Link>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <FinalCta
        headline="Have a Question About the Market?"
        copy="Reach out for perspective tailored to your timing and goals."
      />
    </>
  );
}
