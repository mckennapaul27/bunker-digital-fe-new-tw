import { getFeaturedCaseStudies } from "@/lib/storyblok";
import CaseStudiesWrapper from "./wrapper";

export default async function FeaturedCaseStudiesSection() {
  const caseStudies = await getFeaturedCaseStudies();
  return <CaseStudiesWrapper caseStudies={caseStudies} />;
}
