import { getTestimonials } from "@/lib/storyblok";
import type {
  TestimonialComponent,
  StoryblokComponent,
} from "@/lib/storyblok-types";
import Image from "next/image";

export default async function TestimonialsPage() {
  const testimonialsData = await getTestimonials();

  if (!testimonialsData || !testimonialsData.content?.blocks) {
    return (
      <div className="min-h-screen bg-beige py-20">
        <div className="container mx-auto px-6 xl:px-12">
          <p className="text-charcoal">No testimonials found.</p>
        </div>
      </div>
    );
  }

  const testimonials = testimonialsData.content.blocks.filter(
    (item: StoryblokComponent): item is TestimonialComponent =>
      item.component === "testimonial"
  );

  return (
    <div className="min-h-screen bg-beige py-20 xl:py-28">
      <div className="container mx-auto px-6 xl:px-12">
        {/* Heading Section */}
        <div className="mb-6 lg:mb-12">
          <p className="text-charcoal/90 text-sm mb-4 font-heading font-semibold uppercase tracking-widest">
            Client Testimonials
          </p>
          <h1 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-charcoal leading-tight max-w-4xl xl:max-w-5xl">
            We have a 5 star reputation on Bark and Google with over 20+
            verified hires on Bark
          </h1>
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

        {/* Testimonials Grid */}
        {testimonials.length === 0 ? (
          <p className="text-charcoal">No testimonials found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
            {testimonials.map((testimonial: TestimonialComponent) => {
              const platform = testimonial.platform?.[0] || "";
              const isBark = platform.toLowerCase() === "bark";
              const logoPath = isBark ? "/bark-logo.svg" : "/google-logo.svg";

              return (
                <div
                  key={testimonial._uid}
                  className="relative h-full rounded-sm overflow-hidden bg-white p-6 lg:p-8 shadow-sm border border-charcoal/10 flex flex-col"
                >
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
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
