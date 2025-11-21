import { getCaseStudies } from "@/lib/storyblok";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import type {
  CaseStudy,
  CompanyDetailsComponent,
  ProjectDetailsComponent,
} from "@/lib/storyblok-types";
import NavbarDesktop from "@/components/layout/navbar-desktop";
import NavbarTouchWrapper from "@/components/layout/navbar-touch/wrapper";

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

export default async function CaseStudiesPage() {
  const caseStudies = await getCaseStudies();

  return (
    <>
      <div className="hidden xl:block">
        <NavbarDesktop />
      </div>
      <div className="xl:hidden">
        <NavbarTouchWrapper />
      </div>
      <div className="bg-beige min-h-screen py-16 xl:py-28 relative">
        {/* Background Pattern */}
        <div
          className="absolute inset-0 z-0 opacity-100"
          style={{
            backgroundImage: "url('/logo-svg-pattern.svg')",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        />
        <div className="container mx-auto px-6 xl:px-12 relative z-10">
          {/* Heading Section */}
          <div className="mb-12">
            <p className="text-charcoal/90 text-sm mb-2 font-heading font-semibold uppercase tracking-widest">
              Case Studies
            </p>
            <h1 className="text-3xl lg:text-3xl xl:text-4xl font-bold text-[var(--color-charcoal)] leading-tight max-w-4xl xl:max-w-5xl">
              Learn how we've helped businesses like yours grow their online
              presence and attract more customers.
            </h1>
          </div>

          {/* Case Studies Grid */}
          {caseStudies.length === 0 ? (
            <p className="text-gray-600">No case studies found.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-10">
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
          )}
        </div>
      </div>
    </>
  );
}
