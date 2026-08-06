import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/Button";
import { Reveal } from "@/components/Reveal";
import { blogPosts } from "@/data/blog";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);
  if (!post) return { title: "Article" };
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = blogPosts.find((item) => item.slug === slug);
  if (!post) notFound();

  const related = blogPosts.filter((item) => item.slug !== post.slug).slice(0, 2);

  return (
    <>
      <section className="relative min-h-[62vh] overflow-hidden bg-warm-black text-cream">
        <Image
          src={post.image}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="media-overlay page-hero-overlay" />
        <div className="site-container relative flex min-h-[62vh] flex-col justify-end pb-16 pt-40">
          <Link
            href="/blog"
            className="focus-ring mb-8 inline-flex w-fit items-center gap-2 text-[0.72rem] font-semibold uppercase tracking-[0.14em] text-ivory hover:text-gold-soft"
          >
            ← Back to Blog
          </Link>
          <p className="eyebrow !text-gold-soft">{post.category}</p>
          <h1 className="display text-on-dark mt-5 max-w-3xl text-4xl md:text-6xl">
            {post.title}
          </h1>
          <div className="text-on-dark-muted mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm">
            <span>{post.author}</span>
            <span>{post.date}</span>
            <span>{post.readTime}</span>
          </div>
        </div>
      </section>

      <section className="section bg-cream">
        <div className="site-container grid gap-12 lg:grid-cols-[minmax(0,42rem)_1fr] lg:gap-20">
          <Reveal>
            <article className="space-y-6 text-[1.05rem] leading-relaxed text-olive">
              <p className="font-serif text-2xl leading-relaxed text-charcoal">
                {post.excerpt}
              </p>
              <p>
                Central Florida’s market rewards preparation and clear
                priorities. Whether you are buying for the first time, preparing
                a home for sale, or evaluating a commercial opportunity, the
                strongest outcomes usually begin with a grounded understanding
                of timing, neighborhood context, and the tradeoffs that matter
                most to you.
              </p>
              <p>
                At Commonwealth Realty, we help clients translate broad goals
                into practical next steps—narrowing options, clarifying
                budgets, and approaching negotiations with discipline. The aim
                is not more activity; it is better decisions.
              </p>
              <p>
                If you would like perspective on your specific situation, we
                welcome a conversation. Share what you are considering, and we
                will help you identify a clear path forward.
              </p>
              <div className="border-l border-gold pl-6 py-2">
                <p className="font-serif text-xl italic text-charcoal">
                  “Clarity is the most valuable asset in any real estate
                  decision.”
                </p>
              </div>
              <div className="pt-4">
                <Button href="/contact">Schedule a Consultation</Button>
              </div>
            </article>
          </Reveal>

          <Reveal delay={80}>
            <aside className="space-y-8 lg:sticky lg:top-36 lg:self-start">
              <div className="border border-stone bg-ivory p-6">
                <p className="eyebrow">Continue Reading</p>
                <div className="mt-6 space-y-6">
                  {related.map((item) => (
                    <Link
                      key={item.slug}
                      href={`/blog/${item.slug}`}
                      className="focus-ring group block border-b border-stone pb-5 last:border-0 last:pb-0"
                    >
                      <p className="text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-gold">
                        {item.category}
                      </p>
                      <h2 className="mt-2 font-serif text-xl leading-snug group-hover:text-burgundy">
                        {item.title}
                      </h2>
                    </Link>
                  ))}
                </div>
              </div>
            </aside>
          </Reveal>
        </div>
      </section>
    </>
  );
}
