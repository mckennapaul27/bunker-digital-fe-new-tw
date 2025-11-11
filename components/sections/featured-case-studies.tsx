import { getFeaturedCaseStudies } from "@/lib/storyblok";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import type {
  CaseStudy,
  CompanyDetailsComponent,
  ProjectDetailsComponent,
} from "@/lib/storyblok-types";

// Helper function to extract company details from case study
function getCompanyDetails(study: CaseStudy): CompanyDetailsComponent | null {
  const companyDetails = study.content?.body?.find(
    (item): item is CompanyDetailsComponent =>
      item.component === "company_details"
  );
  return companyDetails || null;
}

// Helper function to extract services from project_details skills array
function getServices(study: CaseStudy): string[] {
  const projectDetails = study.content?.body?.find(
    (item): item is ProjectDetailsComponent =>
      item.component === "project_details"
  );
  return projectDetails?.skills || [];
}

export default async function FeaturedCaseStudies() {
  const caseStudies = await getFeaturedCaseStudies();
  console.log("caseStudies.length", caseStudies.length);
  if (caseStudies.length === 0) {
    return null;
  }

  return (
    <section className="bg-beige py-20 xl:py-28 relative z-50">
      <div className="container mx-auto px-6 xl:px-12">
        {/* Heading Section */}
        <div className="mb-12 lg:mb-20">
          <p className="text-charcoal/90 text-sm mb-4 font-heading font-semibold uppercase tracking-widest">
            Case Studies
          </p>
          <h2 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-charcoal leading-tight max-w-4xl xl:max-w-5xl">
            Real results from real businesses. See how we've helped companies
            like yours grow.
          </h2>
        </div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-10 mb-12">
          {caseStudies.map((study: CaseStudy) => {
            const companyDetails = getCompanyDetails(study);
            const services = getServices(study);
            const coverImage = study.content?.cover_image_sm?.filename;
            const title = study.content?.title || study.name;
            const logo = companyDetails?.logo;
            // Extract dimensions from Storyblok URL
            // Storyblok URLs format: /f/{space_id}/{width}x{height}/{hash}/{filename}
            const urlMatch = logo?.filename.match(/\/(\d+)x(\d+)\//);
            const width = urlMatch ? parseInt(urlMatch[1]) : undefined;
            const height = urlMatch ? parseInt(urlMatch[2]) : undefined;

            return (
              <Link
                key={study.uuid}
                href={`/case-studies/${study.slug}`}
                className="group relative block"
              >
                {/* Card Container */}
                <div className="relative h-full rounded-lg overflow-hidden bg-[#2a2a2a]">
                  {/* Background Image with Blur */}
                  {coverImage && (
                    <div className="absolute inset-0 z-0">
                      <Image
                        src={coverImage}
                        alt={title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                      />
                    </div>
                  )}

                  {/* Dark Overlay */}
                  <div className="absolute inset-0 z-10 bg-[#2a2a2a]/90" />

                  {/* Content */}
                  <div className="relative z-20 h-full flex flex-col p-6 lg:p-8">
                    {/* Title */}
                    <div className="text-xl lg:text-2xl font-bold text-white mb-6 leading-tight font-heading ">
                      {title}
                    </div>

                    {/* Logo and Company Name */}
                    {companyDetails && (
                      <div className="">
                        {companyDetails.logo?.filename && (
                          <Image
                            src={companyDetails.logo.filename}
                            alt={companyDetails.name || ""}
                            width={width}
                            height={height}
                            className="max-h-16 w-auto mb-6"
                          />
                        )}
                        <div className="text-lg font-bold text-white font-heading">
                          {companyDetails.name}
                        </div>
                      </div>
                    )}

                    {/* Services/Tags */}
                    {services.length > 0 && (
                      <div className="text-white/90 text-base mb-6 font-body">
                        {services.join(", ")}
                      </div>
                    )}

                    {/* Spacer to push button to bottom */}
                    <div className="flex-grow" />

                    {/* CTA Button */}
                    <div className="mt-4">
                      <Button size="default" className="">
                        READ CASE STUDY
                        <ArrowRight className="" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* View All Button */}
        <div className="text-center">
          <Button asChild size="default" variant="charcoal-outline">
            <Link href="/case-studies">
              View All Case Studies
              <ArrowRight className="" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
