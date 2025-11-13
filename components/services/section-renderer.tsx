import type { StoryblokComponent } from "@/lib/storyblok-types";
import type {
  HeroServiceComponent,
  FeatureGridComponent,
  ProcessGridComponent,
  CaseStudyContainerComponent,
  ServiceCTAComponent,
  FAQContainerComponent,
  OverviewIntroComponent,
} from "@/lib/storyblok-types";
import MetaData from "./meta-data";
import HeroService from "./hero-service";
import FeatureGrid from "./feature-grid";
import ProcessGrid from "./process-grid";
import CaseStudyContainer from "./case-study-container";
import ServiceCTA from "./service-cta";
import FAQContainer from "./faq-container";
import OverviewIntro from "./overview-intro";
import WebsiteTransformations from "../website-transformations/website-transformations";

interface SectionRendererProps {
  sections: StoryblokComponent[];
}

export default function SectionRenderer({ sections }: SectionRendererProps) {
  return (
    <>
      {sections.map((section) => {
        switch (section.component) {
          case "hero_service":
            return (
              <HeroService
                key={section._uid}
                data={section as HeroServiceComponent}
              />
            );
          case "feature_grid":
            return (
              <FeatureGrid
                key={section._uid}
                data={section as FeatureGridComponent}
              />
            );
          case "process_grid":
            return (
              <ProcessGrid
                key={section._uid}
                data={section as ProcessGridComponent}
              />
            );
          case "case_study_container":
            return (
              <CaseStudyContainer
                key={section._uid}
                data={section as CaseStudyContainerComponent}
              />
            );
          case "cta":
            return (
              <ServiceCTA
                key={section._uid}
                data={section as ServiceCTAComponent}
              />
            );
          case "faq_container":
            return (
              <FAQContainer
                key={section._uid}
                data={section as FAQContainerComponent}
              />
            );
          case "overview_intro":
            return (
              <OverviewIntro
                key={section._uid}
                data={section as OverviewIntroComponent}
              />
            );
          case "before_after_container":
            return <WebsiteTransformations key={section._uid} />;
          default:
            console.warn(`Unknown section component: ${section.component}`);
            return null;
        }
      })}
    </>
  );
}
