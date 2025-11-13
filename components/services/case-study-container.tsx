import type { CaseStudyContainerComponent } from "@/lib/storyblok-types";
import type { CaseStudy } from "@/lib/storyblok-types";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface CaseStudyContainerProps {
  data: CaseStudyContainerComponent;
}

// Helper to check if case study is resolved
function isResolvedCaseStudy(item: string | CaseStudy): item is CaseStudy {
  return typeof item === "object" && "slug" in item;
}

export default function CaseStudyContainer({ data }: CaseStudyContainerProps) {
  const caseStudies = data.case_studies?.filter(isResolvedCaseStudy) || [];

  return (
    <section className="bg-beige py-20 xl:py-28 relative z-50">
      <div className="container mx-auto px-6 xl:px-12">
        {/* Heading Section */}
        <div className="mb-12 lg:mb-20">
          {data.overline && (
            <p className="text-charcoal/90 text-sm mb-4 font-heading font-semibold uppercase tracking-widest">
              {data.overline}
            </p>
          )}
          {data.headline && (
            <h2 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-charcoal leading-tight max-w-4xl xl:max-w-5xl">
              {data.headline}
            </h2>
          )}
          {data.subheadline && (
            <p className="text-lg lg:text-xl text-charcoal/80 mt-4 max-w-4xl xl:max-w-5xl">
              {data.subheadline}
            </p>
          )}
        </div>
        {caseStudies.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {caseStudies.map((study) => {
              const coverImage = study.content?.cover_image_sm?.filename;
              const title = study.content?.title || study.name;

              return (
                <Link
                  key={study.uuid}
                  href={`/case-studies/${study.slug}`}
                  className="group relative block"
                >
                  <div className="relative h-full rounded-lg overflow-hidden bg-[#2a2a2a]">
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
                    <div className="absolute inset-0 z-10 bg-[#2a2a2a]/90" />
                    <div className="relative z-20 h-full flex flex-col p-6 lg:p-8">
                      <div className="text-xl lg:text-2xl font-bold text-white mb-6 leading-tight">
                        {title}
                      </div>
                      <div className="flex-grow" />
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
    </section>
  );
}
