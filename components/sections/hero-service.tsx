import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HeroService() {
  return (
    <section className="relative flex items-center md:min-h-screen">
      {/* Background Image */}
      <div className="fixed inset-0 z-0">
        <Image
          src="/home_hero.png"
          alt="Hero background"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Gradient Overlay */}
      <div
        className="fixed inset-0 z-10 hidden lg:block"
        style={{ background: "var(--gradient-charcoal)" }}
      />
      <div
        className="fixed inset-0 z-10 block lg:hidden"
        style={{ background: "var(--gradient-charcoal-simple)" }}
      />

      {/* Content */}
      <div className="relative z-20 w-full py-20 lg:py-28 xl:py-32">
        <div className="container mx-auto px-6 xl:px-12">
          <div>
            {/* Main Heading */}
            <h1 className="text-[33px] md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6 leading-tight  max-w-3xl xl:max-w-5xl">
              We build high quality custom websites that turn clicks into
              customers<span className="text-[var(--color-primary)]">.</span>
            </h1>

            {/* Paragraph */}
            <p className="text-white text-lg lg:text-xl leading-relaxed xl:text-2xl mb-8 max-w-3xl xl:max-w-5xl ">
              From website design to Google Ads and SEO, we help small and
              service-based companies attract more customers and look more
              professional online.
            </p>

            {/* CTA Button */}
            <div className="mb-10 lg:mb-12">
              <Button size="lg" className="" asChild>
                <Link href="/contact">BOOK A STRATEGY CALL</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
