import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import type { HomeHeroComponent } from "@/lib/storyblok-types";
import { isValidHref, warnInvalidHref } from "@/lib/utils";

interface HeroProps {
  data: HomeHeroComponent;
}

function storyblokImageSrc(filename?: string) {
  if (!filename) return "/home_hero.png";
  if (filename.startsWith("//")) return `https:${filename}`;
  return filename;
}

export default function Hero({ data }: HeroProps) {
  const heading = data.heading || "";
  const coloredPeriod = heading.endsWith(".");
  const headingText = coloredPeriod ? heading.slice(0, -1) : heading;
  const backgroundImage = storyblokImageSrc(data.background_image?.filename);

  warnInvalidHref({
    href: data.cta_link,
    context: "components/sections/hero.tsx data.cta_link",
    extra: { uid: data._uid, cta_text: data.cta_text },
  });

  const hasCta = Boolean(data.cta_text) && isValidHref(data.cta_link);

  return (
    <section className="relative flex items-center md:min-h-screen">
      {/* Background Image */}
      <div className="fixed inset-0 z-0">
        <Image
          src={backgroundImage}
          alt={data.background_image?.alt || "Hero background"}
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
            {data.eyebrow && (
              <p className="text-gray-300 text-sm mb-4 font-heading font-semibold uppercase tracking-widest">
                {data.eyebrow}
              </p>
            )}

            {heading && (
              <h1 className="text-[33px] md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6 leading-tight  max-w-3xl xl:max-w-5xl">
                {headingText}
                {coloredPeriod && (
                  <span className="text-[var(--color-primary)]">.</span>
                )}
              </h1>
            )}

            {data.body && (
              <p className="text-white text-lg lg:text-xl leading-relaxed xl:text-2xl mb-8 max-w-3xl xl:max-w-5xl ">
                {data.body}
              </p>
            )}

            {hasCta && (
              <div className="mb-10 lg:mb-12">
                <Button size="lg" className="" asChild>
                  <Link href={data.cta_link as string}>{data.cta_text}</Link>
                </Button>
              </div>
            )}

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
                  30+ verified Bark hires
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
