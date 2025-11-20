import type {
  HeroServiceComponent,
  HeroTestimonialComponent,
  StoryblokComponent,
} from "@/lib/storyblok-types";
import Image from "next/image";

interface HeroServiceProps {
  data: HeroServiceComponent;
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

export default function HeroService({ data }: HeroServiceProps) {
  const backgroundImage = data.background_image?.filename || "/home_hero.png";
  const testimonial = getTestimonial(data.blocks);

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
        <div className="relative z-20 w-full py-20">
          <div className="container mx-auto px-6 xl:px-12">
            <div>
              {/* Main Heading */}
              <h1 className="text-[33px] md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-6 leading-tight  max-w-3xl xl:max-w-5xl">
                {data.headline}
              </h1>
            </div>
          </div>
        </div>
      </section>
      {/* {data.trust_bar_below && <TrustBar testimonial={testimonial} />} */}
    </>
  );
}
