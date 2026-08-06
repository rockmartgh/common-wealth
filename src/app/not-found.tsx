import { Button } from "@/components/Button";

export default function NotFound() {
  return (
    <section className="section bg-cream pt-40">
      <div className="site-container max-w-2xl py-16 text-center">
        <p className="eyebrow !justify-center">Page Not Found</p>
        <h1 className="display mt-5 text-5xl">This page has moved on.</h1>
        <p className="mx-auto mt-5 max-w-md text-olive">
          The page you are looking for is unavailable. Return home or browse
          current properties.
        </p>
        <div className="mt-9 flex flex-wrap justify-center gap-4">
          <Button href="/">Return Home</Button>
          <Button href="/properties" variant="secondary">
            Explore Properties
          </Button>
        </div>
      </div>
    </section>
  );
}
