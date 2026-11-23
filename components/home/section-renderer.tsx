import type { StoryblokComponent } from "@/lib/storyblok-types";
import type {
  HomeHeroComponent,
  HowWeHelpComponent,
  HomeServicesGridComponent,
  TestimonialContainerComponent,
  ServiceCTAComponent,
  FAQContainerComponent,
} from "@/lib/storyblok-types";
import Hero from "@/components/sections/hero";
import HowWeHelp from "@/components/sections/how-we-help";
import ServicesGrid from "@/components/sections/services-grid";
import FeaturedCaseStudiesSection from "@/components/featured-case-studies/section";
import WebsiteTransformations from "@/components/website-transformations/website-transformations";
import TestimonialContainer from "@/components/services/testimonial-container";
import ServiceCTA from "@/components/services/service-cta";
import FAQContainer from "@/components/services/faq-container";

interface HomeSectionRendererProps {
  blocks: StoryblokComponent[];
}

export default async function HomeSectionRenderer({
  blocks,
}: HomeSectionRendererProps) {
  return (
    <>
      {blocks.map((block) => {
        switch (block.component) {
          case "home_hero":
            return <Hero key={block._uid} data={block as HomeHeroComponent} />;
          case "how_we_help":
            return (
              <HowWeHelp key={block._uid} data={block as HowWeHelpComponent} />
            );
          case "featured_case_studies":
            return <FeaturedCaseStudiesSection key={block._uid} />;
          case "before_after_container":
            return <WebsiteTransformations key={block._uid} />;
          case "home_services_grid":
            return (
              <ServicesGrid
                key={block._uid}
                data={block as HomeServicesGridComponent}
              />
            );
          case "testimonial_container":
            return (
              <TestimonialContainer
                key={block._uid}
                data={block as TestimonialContainerComponent}
              />
            );
          case "cta":
            return (
              <ServiceCTA key={block._uid} data={block as ServiceCTAComponent} />
            );
          case "faq_container":
            return (
              <FAQContainer
                key={block._uid}
                data={block as FAQContainerComponent}
              />
            );
          default:
            if (process.env.NODE_ENV === "development") {
              console.warn(`Unknown home block: ${block.component}`);
            }
            return null;
        }
      })}
    </>
  );
}
