import { getCaseStudyBySlug, getCaseStudies } from "@/lib/storyblok";
import { notFound } from "next/navigation";
import Image from "next/image";
import type { Metadata } from "next";
import { renderStoryblokRichText } from "@/lib/storyblok-richtext";
import type {
  CaseStudy,
  CompanyDetailsComponent,
  ProjectDetailsComponent,
  ProjectBrandingComponent,
  MetaDataComponent,
  CTAComponent,
} from "@/lib/storyblok-types";
import CTA from "@/components/sections/cta";
import NavbarDesktop from "@/components/layout/navbar-desktop";
import NavbarTouchWrapper from "@/components/layout/navbar-touch/wrapper";

interface CaseStudyPageProps {
  params: Promise<{ slug: string }>;
}

// Helper function to extract company details from case study
function getCompanyDetails(study: CaseStudy): CompanyDetailsComponent | null {
  const companyDetails = study.content?.body?.find(
    (item): item is CompanyDetailsComponent =>
      item.component === "company_details"
  );
  return companyDetails || null;
}

// Helper function to extract project details from case study
function getProjectDetails(study: CaseStudy): ProjectDetailsComponent | null {
  const projectDetails = study.content?.body?.find(
    (item): item is ProjectDetailsComponent =>
      item.component === "project_details"
  );
  return projectDetails || null;
}

// Helper function to extract project branding from case study
function getProjectBranding(study: CaseStudy): ProjectBrandingComponent | null {
  const projectBranding = study.content?.body?.find(
    (item): item is ProjectBrandingComponent =>
      item.component === "project_branding"
  );
  return projectBranding || null;
}

// Helper function to extract meta data from case study
function getMetaData(study: CaseStudy): MetaDataComponent | null {
  const metaData = study.content?.body?.find(
    (item): item is MetaDataComponent => item.component === "meta_data"
  );
  return metaData || null;
}

// Helper function to extract CTA from case study
function getCTA(study: CaseStudy): CTAComponent | null {
  const cta = study.content?.body?.find(
    (item): item is CTAComponent => item.component === "cta"
  );
  return cta || null;
}

// Generate static params for all case studies at build time
export async function generateStaticParams() {
  // Skip static generation in development
  if (process.env.NODE_ENV === "development") {
    return [];
  }
  const caseStudies = await getCaseStudies();
  return caseStudies.map((study) => ({
    slug: study.slug,
  }));
}

// Generate metadata for the page
export async function generateMetadata({
  params,
}: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = await getCaseStudyBySlug(slug);

  if (!caseStudy) {
    return {
      title: "Case Study Not Found",
    };
  }

  const metaData = getMetaData(caseStudy);
  const title = metaData?.title || caseStudy.content?.title || caseStudy.name;
  const description = metaData?.description || "";
  const ogImage = metaData?.og_image?.filename;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: ogImage
        ? [
            {
              url: ogImage,
              width: 1200,
              height: 630,
              alt: title,
            },
          ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImage ? [ogImage] : [],
    },
  };
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const caseStudy = await getCaseStudyBySlug(slug);

  if (!caseStudy) {
    notFound();
  }

  const companyDetails = getCompanyDetails(caseStudy);
  const projectDetails = getProjectDetails(caseStudy);
  const projectBranding = getProjectBranding(caseStudy);
  const cta = getCTA(caseStudy);
  const title = caseStudy.content?.title || caseStudy.name;
  const testimonial = projectDetails?.testimonial;
  const testimonialName = projectDetails?.testimonial_name;
  const brandingDescription = projectBranding?.branding_description;
  const logo = companyDetails?.logo;
  // Extract dimensions from Storyblok URL
  // Storyblok URLs format: /f/{space_id}/{width}x{height}/{hash}/{filename}
  const urlMatch = logo?.filename.match(/\/(\d+)x(\d+)\//);
  const width = urlMatch ? parseInt(urlMatch[1]) : undefined;
  const height = urlMatch ? parseInt(urlMatch[2]) : undefined;
  const coverImageSm = caseStudy.content?.cover_image_sm?.filename;
  const coverImageLg = caseStudy.content?.cover_image_lg?.filename;

  return (
    <div>
      <div className="hidden xl:block">
        <NavbarDesktop />
      </div>
      <div className="xl:hidden">
        <NavbarTouchWrapper />
      </div>
      {/* Hero Section */}
      <section className="relative flex items-center ">
        {/* Background Image - Small (default) */}
        {coverImageSm && (
          <div className="fixed inset-0 z-0 lg:hidden">
            <Image
              src={coverImageSm}
              alt={title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Background Image - Large (lg and above) */}
        {coverImageLg && (
          <div className="fixed inset-0 z-0 hidden lg:block">
            <Image
              src={coverImageLg}
              alt={title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Gradient Overlay */}
        <div
          className="fixed inset-0 z-10 hidden lg:block"
          style={{ background: "var(--gradient-charcoal)" }}
        />
        <div
          className="fixed inset-0 z-10 block lg:hidden"
          style={{ background: "var(--gradient-charcoal-simple)" }}
        />

        {/* Content */}
        <div className="relative z-20 w-full py-20 xl:py-32">
          <div className="container mx-auto px-6 xl:px-12">
            <div>
              {/* Company Logo */}
              {logo?.filename && (
                <div className="mb-8">
                  <Image
                    src={logo.filename}
                    width={width}
                    height={height}
                    alt={companyDetails?.name || ""}
                    className="max-h-16 w-auto"
                    priority
                  />
                </div>
              )}

              {/* Main Heading */}
              <h1 className="text-[33px] md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight max-w-3xl xl:max-w-5xl">
                {title}
              </h1>

              {/* Testimonial */}
              {testimonial && (
                <div className="mb-4 max-w-3xl xl:max-w-5xl">
                  <p className="text-white/80 text-base lg:text-lg xl:text-xl italic leading-relaxed mb-2">
                    &quot;{testimonial}&quot;
                  </p>
                  {testimonialName && (
                    <p className="text-white text-base lg:text-lg  font-semibold mt-4">
                      <span className="text-[var(--color-primary)]">—</span>{" "}
                      {testimonialName}
                    </p>
                  )}
                </div>
              )}
              <div className="">
                <Image
                  src="/5-stars.svg"
                  alt="5 stars"
                  width={88}
                  height={15}
                  className="h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Design & Branding Section */}
      <section className="bg-charcoal py-20 xl:py-28 relative z-50">
        <div className="container mx-auto px-6 xl:px-12">
          {/* Heading Section */}
          <div className="mb-12 lg:mb-20">
            <p className="text-gray-300 text-sm mb-4 font-heading font-semibold uppercase tracking-widest">
              Design & Branding
            </p>
            <h2 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-white leading-tight max-w-4xl xl:max-w-5xl">
              {brandingDescription ||
                "The visual identity and design elements that bring this project to life."}
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12">
            {/* Left Column - Branding Details */}
            <div className="space-y-8">
              {/* Fonts */}
              {(projectBranding?.primary_font ||
                projectBranding?.secondary_font ||
                projectBranding?.accent_font) && (
                <div>
                  <h3 className="text-lg lg:text-xl font-bold text-white mb-4 font-heading">
                    Fonts
                  </h3>
                  <div className="space-y-2">
                    {projectBranding.primary_font && (
                      <div className="flex items-center gap-3">
                        <span className="text-gray-300 text-sm font-body">
                          Primary:
                        </span>
                        <span
                          className="text-white font-semibold font-body"
                          // style={{
                          //   fontFamily: projectBranding.primary_font,
                          // }}
                        >
                          {projectBranding.primary_font}
                        </span>
                      </div>
                    )}
                    {projectBranding.secondary_font && (
                      <div className="flex items-center gap-3">
                        <span className="text-gray-300 text-sm font-body">
                          Secondary:
                        </span>
                        <span
                          className="text-white font-semibold font-body"
                          // style={{
                          //   fontFamily: projectBranding.secondary_font,
                          // }}
                        >
                          {projectBranding.secondary_font}
                        </span>
                      </div>
                    )}
                    {projectBranding.accent_font && (
                      <div className="flex items-center gap-3">
                        <span className="text-gray-300 text-sm font-body">
                          Accent:
                        </span>
                        <span
                          className="text-white font-semibold font-body"
                          // style={{
                          //   fontFamily: projectBranding.accent_font,
                          // }}
                        >
                          {projectBranding.accent_font}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Colors */}
              {(projectBranding?.primary_color ||
                projectBranding?.secondary_color ||
                projectBranding?.accent_color ||
                (projectBranding?.color_theme &&
                  projectBranding.color_theme.length > 0)) && (
                <div>
                  <h3 className="text-lg lg:text-xl font-bold text-white mb-4 font-heading">
                    Colors
                  </h3>
                  <div className="space-y-3">
                    {projectBranding.primary_color && (
                      <div className="flex items-center gap-3">
                        <div
                          className="w-12 h-12 rounded border border-gray-600"
                          style={{
                            backgroundColor: projectBranding.primary_color,
                          }}
                        />
                        <div>
                          <span className="text-gray-300 text-sm font-body block">
                            Primary
                          </span>
                          <span className="text-white font-semibold text-sm">
                            {projectBranding.primary_color}
                          </span>
                        </div>
                      </div>
                    )}
                    {projectBranding.secondary_color && (
                      <div className="flex items-center gap-3">
                        <div
                          className="w-12 h-12 rounded border border-gray-600"
                          style={{
                            backgroundColor: projectBranding.secondary_color,
                          }}
                        />
                        <div>
                          <span className="text-gray-300 text-sm font-body block">
                            Secondary
                          </span>
                          <span className="text-white font-semibold text-sm">
                            {projectBranding.secondary_color}
                          </span>
                        </div>
                      </div>
                    )}
                    {projectBranding.accent_color && (
                      <div className="flex items-center gap-3">
                        <div
                          className="w-12 h-12 rounded border border-gray-600"
                          style={{
                            backgroundColor: projectBranding.accent_color,
                          }}
                        />
                        <div>
                          <span className="text-gray-300 text-sm font-body block">
                            Accent
                          </span>
                          <span className="text-white font-semibold text-sm">
                            {projectBranding.accent_color}
                          </span>
                        </div>
                      </div>
                    )}
                    {projectBranding.color_theme &&
                      projectBranding.color_theme.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-4">
                          {projectBranding.color_theme.map((color, index) => (
                            <div
                              key={index}
                              className="w-10 h-10 rounded border border-gray-600"
                              style={{ backgroundColor: color }}
                              title={color}
                            />
                          ))}
                        </div>
                      )}
                  </div>
                </div>
              )}

              {/* Skills */}
              {projectDetails?.skills && projectDetails.skills.length > 0 && (
                <div>
                  <h3 className="text-lg lg:text-xl font-bold text-white mb-4 font-heading">
                    Skills & Services
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {projectDetails.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-white/10 text-white text-sm font-body rounded border border-white/20"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column - Desktop Mockup */}
            {projectDetails?.desktop_mockup?.filename && (
              <div>
                <h3 className="text-lg lg:text-xl font-bold text-white mb-4 font-heading">
                  Desktop Preview
                </h3>
                <div className="relative w-full aspect-5/3 rounded-lg overflow-hidden border border-gray-700">
                  <Image
                    src={projectDetails.desktop_mockup.filename}
                    alt="Desktop mockup"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Takeaways Section */}
      {caseStudy.content?.takeaways ? (
        <section className="bg-beige py-20 xl:py-28 relative z-50">
          <div className="container mx-auto px-6 xl:px-12">
            <div className="max-w-4xl">
              {renderStoryblokRichText({
                content: caseStudy.content.takeaways,
                className:
                  "prose-headings:text-[var(--color-charcoal)] prose-p:text-gray-700 prose-strong:text-[var(--color-charcoal)] prose-ul:text-gray-700",
              })}
            </div>
          </div>
        </section>
      ) : null}

      {/*Content Section */}
      {caseStudy.content?.content ? (
        <section className="bg-white py-20 xl:py-28 relative z-50">
          <div className="container mx-auto px-6 xl:px-12">
            <div className="max-w-4xl">
              {renderStoryblokRichText({
                content: caseStudy.content.content,
                className:
                  "prose-headings:text-[var(--color-charcoal)] prose-p:text-gray-700 prose-strong:text-[var(--color-charcoal)] prose-ul:text-gray-700",
              })}
            </div>
          </div>
        </section>
      ) : null}

      {/* CTA Section */}
      <CTA
        title={cta?.title || "Let's discuss your project"}
        description={
          cta?.description ||
          "We'd love to hear about your project and see how we can help you."
        }
        primaryLinkText={cta?.link_text || "Discuss your project"}
        primaryHref={cta?.href || "/discuss-project"}
      />
    </div>
  );
}
