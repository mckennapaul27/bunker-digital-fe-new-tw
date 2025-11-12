"use client";

import { useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
// import Autoplay from "embla-carousel-autoplay";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import type {
  CaseStudy,
  CompanyDetailsComponent,
  ProjectDetailsComponent,
} from "@/lib/storyblok-types";

interface FeaturedCaseStudiesCarouselProps {
  caseStudies: CaseStudy[];
}

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

export default function CaseStudiesCarousel({
  caseStudies,
}: FeaturedCaseStudiesCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      align: "start",
      loop: true,
      breakpoints: {
        "(min-width: 768px)": { slidesToScroll: 2 },
        "(min-width: 1280px)": { slidesToScroll: 3 },
      },
    }
    // [Autoplay({ delay: 8000, stopOnInteraction: false })]
  );

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

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

        {/* Carousel Container */}
        <div className="relative mb-12">
          {/* Embla Carousel */}
          <div className="overflow-hidden mb-6" ref={emblaRef}>
            <div className="flex">
              {caseStudies.map((study: CaseStudy) => {
                const companyDetails = getCompanyDetails(study);
                const services = getServices(study);
                const coverImage = study.content?.cover_image_sm?.filename;
                const title = study.content?.title || study.name;
                const logo = companyDetails?.logo;
                // Extract dimensions from Storyblok URL
                const urlMatch = logo?.filename.match(/\/(\d+)x(\d+)\//);
                const width = urlMatch ? parseInt(urlMatch[1]) : undefined;
                const height = urlMatch ? parseInt(urlMatch[2]) : undefined;

                return (
                  <div
                    key={study.uuid}
                    className="flex-[0_0_100%] md:flex-[0_0_calc(50%-1rem)] xl:flex-[0_0_calc(33.333%-1.33rem)] min-w-0 px-2"
                  >
                    <Link
                      href={`/case-studies/${study.slug}`}
                      className="group relative block h-full"
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
                          <div className="text-xl lg:text-2xl font-bold text-white mb-6 leading-tight font-heading">
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
                  </div>
                );
              })}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-center gap-2">
            <button
              onClick={scrollPrev}
              className="p-2 rounded-full bg-charcoal hover:bg-charcoal/90 border border-charcoal/20 transition-colors cursor-pointer"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>
            <button
              onClick={scrollNext}
              className="p-2 rounded-full bg-charcoal hover:bg-charcoal/90 border border-charcoal/20 transition-colors cursor-pointer"
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5 text-white" />
            </button>
          </div>
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
