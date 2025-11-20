import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import TestimonialsWrapper from "./wrapper";
import Image from "next/image";
import { getTestimonials } from "@/lib/storyblok";
import type {
  TestimonialComponent,
  StoryblokComponent,
} from "@/lib/storyblok-types";

interface TestimonialsProps {
  heading?: string;
  subheading?: string;
}

export default async function Testimonials(props: TestimonialsProps = {}) {
  const { heading, subheading } = props;
  const testimonialsData = await getTestimonials();

  const testimonials = testimonialsData?.content?.blocks
    ?.filter(
      (item: StoryblokComponent): item is TestimonialComponent =>
        item.component === "testimonial"
    )
    .slice(0, 5);

  // Default values
  const defaultHeading = "Client Testimonials";
  const defaultSubheading =
    "We have a 5 star reputation on Bark and Google with over 20+ verified hires on Bark";

  return (
    <section className="bg-white py-20 xl:py-28 relative z-50">
      <div className="container mx-auto px-6 xl:px-12">
        {/* Heading Section */}
        <div className="mb-12 lg:mb-20">
          <p className="text-charcoal/90 text-sm mb-4 font-heading font-semibold uppercase tracking-widest">
            {heading || defaultHeading}
          </p>
          <h2 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-charcoal leading-tight max-w-4xl xl:max-w-5xl">
            {subheading || defaultSubheading}
          </h2>
        </div>
        {/* Social Proof Section */}
        <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-12 mb-12">
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
            <p className="text-charcoal/80 text-sm lg:text-base font-bold whitespace-nowrap">
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
            <p className="text-charcoal/80 text-sm lg:text-base font-bold whitespace-nowrap">
              20+ verified Bark hires
            </p>
          </div>
        </div>

        {testimonials && <TestimonialsWrapper testimonials={testimonials} />}

        {/* View All Button */}
        <div className="text-center">
          <Button asChild size="default" variant="charcoal-outline">
            <Link href="/testimonials">
              Read more Testimonials
              <ArrowRight className="" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
