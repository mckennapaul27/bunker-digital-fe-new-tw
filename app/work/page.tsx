// "use client";
import { getProjectsPage } from "@/lib/storyblok";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import type { ProjectCardComponent, CaseStudy } from "@/lib/storyblok-types";

// Helper function to extract project cards from projects page
function getProjectCards(body: any[]): ProjectCardComponent[] {
  return (
    body?.filter(
      (item): item is ProjectCardComponent => item.component === "project_card"
    ) || []
  );
}

export default async function WorkPage() {
  const projectsPage = await getProjectsPage();
  const projectCards = projectsPage
    ? getProjectCards(projectsPage.content?.body || [])
    : [];

  console.log("there are", projectCards.length, "project cardsss");

  return (
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
            Our Work
          </p>
          <h1 className="text-3xl lg:text-3xl xl:text-4xl font-bold text-[var(--color-charcoal)] leading-tight max-w-4xl xl:max-w-5xl">
            Explore our portfolio of successful projects and see the results
            we've delivered for our clients.
          </h1>
        </div>

        {/* Project Cards Grid */}
        {projectCards.length === 0 ? (
          <p className="text-gray-600">No projects found.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-10">
            {projectCards.map((card: ProjectCardComponent) => {
              const mockupImage = card.mockup?.filename;
              const projectName = card.name;
              const projectUrl = card.url;
              const caseStudyRefs = card.case_study || [];
              const skills = card.skills || [];
              const types = card.type || [];
              const primaryColor = card.primary_color;
              const secondaryColor = card.secondary_color;
              const accentColor = card.accent_color;

              // Get the first case study slug if available
              // With resolve_relations, the case study should be resolved as an object
              const firstCaseStudySlug =
                caseStudyRefs.length > 0 &&
                typeof caseStudyRefs[0] === "object" &&
                "slug" in caseStudyRefs[0]
                  ? (caseStudyRefs[0] as CaseStudy).slug
                  : null;

              console.log("firstCaseStudySlug", firstCaseStudySlug);

              // Determine wrapper based on available links
              const cardContent = (
                <>
                  {/* Card Container */}
                  <div className="relative rounded-lg h-full overflow-hidden bg-[#2a2a2a] flex flex-col shadow-lg">
                    {/* Mockup Image */}
                    {mockupImage && (
                      <div className="relative w-full aspect-[5/3] bg-gray-800 flex-shrink-0">
                        <Image
                          src={mockupImage}
                          alt={projectName}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                        />
                      </div>
                    )}

                    {/* Content */}
                    <div className="p-6 lg:p-8 flex flex-col flex-grow">
                      {/* Title */}
                      <div className="text-xl lg:text-2xl font-bold text-white leading-tight font-heading">
                        {projectName}
                      </div>

                      {/* Type/Category */}
                      {types.length > 0 && (
                        <div className="text-white/80 text-sm tracking-widest mb-6 mt-2 font-heading uppercase tracking-wider">
                          {types.join(", ")}
                        </div>
                      )}

                      {/* Color Palette */}
                      {(primaryColor || secondaryColor || accentColor) && (
                        <div className="mb-4 flex gap-2 flex-wrap">
                          {primaryColor && (
                            <div className="flex items-center gap-2">
                              <div
                                className="w-6 h-6 rounded border border-white/20"
                                style={{ backgroundColor: primaryColor }}
                              />
                              <span className="text-sm text-white/70">
                                {primaryColor}
                              </span>
                            </div>
                          )}
                          {secondaryColor && (
                            <div className="flex items-center gap-2">
                              <div
                                className="w-6 h-6 rounded border border-white/20"
                                style={{ backgroundColor: secondaryColor }}
                              />
                              <span className="text-sm text-white/70">
                                {secondaryColor}
                              </span>
                            </div>
                          )}
                          {accentColor && (
                            <div className="flex items-center gap-2">
                              <div
                                className="w-6 h-6 rounded border border-white/20"
                                style={{ backgroundColor: accentColor }}
                              />
                              <span className="text-sm text-white/70">
                                {accentColor}
                              </span>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Typography */}
                      {(card.primary_font || card.secondary_font) && (
                        <div className="mb-4 text-sm text-white/70">
                          {card.primary_font && (
                            <p className="mb-1">
                              <span className="font-semibold text-white/90">
                                Primary:
                              </span>{" "}
                              {card.primary_font}
                            </p>
                          )}
                          {card.secondary_font && (
                            <p>
                              <span className="font-semibold text-white/90">
                                Secondary:
                              </span>{" "}
                              {card.secondary_font}
                            </p>
                          )}
                        </div>
                      )}

                      {/* Skills/Tags */}
                      {skills.length > 0 && (
                        <div className="text-white/90 text-sm mb-6 font-body">
                          {skills.join(", ")}
                        </div>
                      )}

                      {/* Spacer to push button to bottom */}
                      <div className="flex-grow" />

                      {/* CTA Button */}
                      {firstCaseStudySlug && (
                        <div className="mt-4">
                          <Button size="sm" className="" asChild>
                            <Link href={`/case-studies/${firstCaseStudySlug}`}>
                              READ CASE STUDY
                              <ArrowRight className="" />
                            </Link>
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </>
              );

              return (
                <div key={card._uid} className="group relative bloc  h-full">
                  {cardContent}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
