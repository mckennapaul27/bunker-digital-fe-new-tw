"use client";

import { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";
import type { TestimonialComponent } from "@/lib/storyblok-types";

interface TestimonialsCarouselProps {
  testimonials: TestimonialComponent[];
}

export default function TestimonialsDynamic({
  testimonials,
}: TestimonialsCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      align: "start",
      loop: true,
    },
    [Autoplay({ delay: 6000, stopOnInteraction: false })]
  );

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  if (testimonials.length === 0) {
    return null;
  }

  return (
    <div className="relative mb-12">
      {/* Embla Carousel */}
      <div className="overflow-hidden mb-6 pb-4" ref={emblaRef}>
        <div className="flex">
          {testimonials.map((testimonial: TestimonialComponent) => {
            const platform = testimonial.platform?.[0] || "";
            const isBark = platform.toLowerCase() === "bark";
            const logoPath = isBark ? "/bark-logo.svg" : "/google-logo.svg";

            return (
              <div
                key={testimonial._uid}
                className="flex-[0_0_100%] md:flex-[0_0_calc(50%-1rem)] xl:flex-[0_0_calc(33.333%-1.33rem)] min-w-0 px-2"
              >
                {/* Card Container */}
                <div className="relative h-full rounded-lg bg-white p-6 lg:p-8 shadow-sm border border-charcoal/10 flex flex-col cursor-pointer">
                  {/* Platform Logo */}
                  {platform && (
                    <div className="mb-4">
                      <Image
                        src={logoPath}
                        alt={platform}
                        width={isBark ? 56 : 67}
                        height={isBark ? 24 : 22}
                        className="h-auto"
                      />
                    </div>
                  )}
                  {testimonial.snippet && (
                    <div className="text-base lg:text-lg font-bold text-charcoal font-body mb-2">
                      &quot;{testimonial.snippet}&quot;
                    </div>
                  )}

                  {/* Testimonial Text */}
                  {testimonial.testimonial && (
                    <div className="text-sm lg:text-base text-charcoal mb-6 font-body flex-grow">
                      "{testimonial.testimonial}"
                    </div>
                  )}

                  {/* Name and Company */}
                  <div className="mt-auto">
                    {testimonial.name && (
                      <div className="text-base lg:text-lg font-bold text-charcoal font-heading">
                        {testimonial.name}
                      </div>
                    )}
                    {testimonial.company && (
                      <div className="text-sm lg:text-base text-charcoal/70 font-body">
                        {testimonial.company}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
