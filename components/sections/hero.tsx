import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Hero() {
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
            {/* Small Heading */}
            <p className="text-gray-300 text-sm mb-4 font-heading font-semibold uppercase tracking-widest">
              Transform Your Business
            </p>

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
              <Button size="lg" className="">
                BOOK A STRATEGY CALL
              </Button>
            </div>

            {/* Social Proof Section */}
            <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-12">
              {/* Google Rating */}
              <div className="flex flex-col gap-3">
                <div className="h-auto lg:h-8 flex items-start">
                  <a
                    href="https://share.google/hX5oMeXYfwTH0eK2r"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block"
                  >
                    <Image
                      src="/google-logo.svg"
                      alt="Google"
                      width={67}
                      height={24}
                      className="h-auto lg:h-8 lg:w-auto"
                    />
                  </a>
                </div>
                <Image
                  src="/5-stars.svg"
                  alt="5 stars"
                  width={88}
                  height={15}
                  className="h-auto"
                />
                <p className="text-white text-sm lg:text-base font-bold whitespace-nowrap">
                  Rated 5.0 on Google
                </p>
              </div>

              {/* Bark Rating */}
              <div className="flex flex-col gap-3">
                <div className="h-auto lg:h-8 flex items-start">
                  <a
                    href="https://www.bark.com/en/gb/b/bunkerdigital/Xo0AX/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block"
                  >
                    <Image
                      src="/bark-logo.svg"
                      alt="Bark"
                      width={56}
                      height={24}
                      className="h-auto lg:h-8 lg:w-auto"
                    />
                  </a>
                </div>
                <Image
                  src="/5-stars.svg"
                  alt="5 stars"
                  width={88}
                  height={15}
                  className="h-auto"
                />
                <p className="text-white text-sm lg:text-base font-bold whitespace-nowrap">
                  20+ verified Bark hires
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
