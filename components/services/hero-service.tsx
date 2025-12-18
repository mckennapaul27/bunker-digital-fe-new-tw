import type {
  HeroServiceComponent,
  HeroTestimonialComponent,
  StoryblokComponent,
} from "@/lib/storyblok-types";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import TrustBar from "../sections/trust-bar";
import { isValidHref, warnInvalidHref } from "@/lib/utils";

interface HeroServiceProps {
  data: HeroServiceComponent;
  showCtaButtons?: boolean;
}

// Helper function to extract testimonial from blocks
function getTestimonial(
  blocks?: StoryblokComponent[]
): HeroTestimonialComponent | null {
  if (!blocks) return null;
  const testimonial = blocks.find(
    (item): item is HeroTestimonialComponent => item.component === "testimonial"
  );
  return testimonial || null;
}

export default function HeroService({
  data,
  showCtaButtons = true,
}: HeroServiceProps) {
  const backgroundImage = data.background_image?.filename || "/home_hero.png";
  const testimonial = getTestimonial(data.blocks);

  warnInvalidHref({
    href: data.cta_link,
    context: "components/services/hero-service.tsx data.cta_link",
    extra: { uid: data._uid, cta_text: data.cta_text, headline: data.headline },
  });
  warnInvalidHref({
    href: data.secondary_cta_link,
    context: "components/services/hero-service.tsx data.secondary_cta_link",
    extra: {
      uid: data._uid,
      secondary_cta_text: data.secondary_cta_text,
      headline: data.headline,
    },
  });

  const hasPrimaryCta = Boolean(data.cta_text) && isValidHref(data.cta_link);
  const hasSecondaryCta =
    Boolean(data.secondary_cta_text) && isValidHref(data.secondary_cta_link);

  return (
    <>
      <section className="relative flex items-center ">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src={backgroundImage}
            alt="Hero background"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Gradient Overlay */}
        <div
          className="absolute inset-0 z-10 hidden lg:block"
          style={{ background: "var(--gradient-charcoal)" }}
        />
        <div
          className="absolute inset-0 z-10 block lg:hidden"
          style={{ background: "var(--gradient-charcoal-simple)" }}
        />

        {/* Content */}
        <div className="relative z-20 w-full py-20 lg:py-28">
          <div className="container mx-auto px-6 xl:px-12">
            <div>
              {/* Main Heading */}
              <h1 className="text-[33px] md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6 leading-tight  max-w-3xl xl:max-w-5xl">
                {data.headline}
              </h1>

              {/* Paragraph */}
              <p className="text-white text-lg lg:text-xl leading-relaxed xl:text-2xl mb-8 max-w-3xl xl:max-w-5xl ">
                {data.subheadline}
              </p>

              {/* CTA Buttons */}
              {showCtaButtons && (
                <div className="flex flex-col items-start gap-4">
                  {hasPrimaryCta ? (
                    <Button size="lg" className="" asChild>
                      <Link href={data.cta_link!}>{data.cta_text}</Link>
                    </Button>
                  ) : data.cta_text ? (
                    <Button size="lg" className="" disabled>
                      {data.cta_text}
                    </Button>
                  ) : null}

                  {hasSecondaryCta && (
                    <Link
                      href={data.secondary_cta_link!}
                      className="text-white font-body font-semibold hover:underline inline-flex items-center gap-2"
                    >
                      {data.secondary_cta_text}
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      {data.trust_bar_below && <TrustBar testimonial={testimonial} />}
    </>
  );
}
