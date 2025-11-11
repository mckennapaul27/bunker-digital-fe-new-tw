import Hero from "@/components/sections/hero";
import HowWeHelp from "@/components/sections/how-we-help";
import { getFeaturedCaseStudies } from "@/lib/storyblok";
import CaseStudiesWrapper from "@/components/featured-case-studies/wrapper";
import WebsiteTransformations from "@/components/website-transformations";

export default async function Home() {
  const caseStudies = await getFeaturedCaseStudies();

  return (
    <div>
      <Hero />
      <HowWeHelp />

      <CaseStudiesWrapper caseStudies={caseStudies} />
      <WebsiteTransformations />
    </div>
  );
}
