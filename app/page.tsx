import Hero from "@/components/sections/hero";
import HowWeHelp from "@/components/sections/how-we-help";
import { getFeaturedCaseStudies } from "@/lib/storyblok";
import CaseStudiesWrapper from "@/components/featured-case-studies/wrapper";
import WebsiteTransformations from "@/components/website-transformations/website-transformations";
import ServicesGrid from "@/components/sections/services-grid";
import { getTestimonials } from "@/lib/storyblok";
import type {
  TestimonialComponent,
  StoryblokComponent,
} from "@/lib/storyblok-types";
import Image from "next/image";
import Testimonials from "@/components/testimonials/testimonials";

export default async function Home() {
  const caseStudies = await getFeaturedCaseStudies();
  const testimonialsData = await getTestimonials();

  const testimonials = testimonialsData?.content?.blocks
    ?.filter(
      (item: StoryblokComponent): item is TestimonialComponent =>
        item.component === "testimonial"
    )
    .slice(0, 5);

  return (
    <div>
      <Hero />
      <HowWeHelp />

      <CaseStudiesWrapper caseStudies={caseStudies} />
      <WebsiteTransformations />
      <ServicesGrid />
      {testimonials && <Testimonials testimonials={testimonials} />}
    </div>
  );
}
