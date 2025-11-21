import { getLegalPageBySlug, getLegalPages } from "@/lib/storyblok";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { renderStoryblokRichText } from "@/lib/storyblok-richtext";
import type { LegalPage, MetaDataComponent } from "@/lib/storyblok-types";
import NavbarDesktop from "@/components/layout/navbar-desktop";
import NavbarTouchWrapper from "@/components/layout/navbar-touch/wrapper";
import Header from "@/components/services/header";
import type { HeroServiceComponent } from "@/lib/storyblok-types";

interface LegalPageProps {
  params: Promise<{ slug: string }>;
}

// Helper function to extract meta data from legal page
function getMetaData(page: LegalPage): MetaDataComponent | null {
  const metaData = page.content?.blocks?.find(
    (item): item is MetaDataComponent => item.component === "meta_data"
  );
  return metaData || null;
}

// Generate static params for all legal pages at build time
export async function generateStaticParams() {
  // Skip static generation in development
  if (process.env.NODE_ENV === "development") {
    return [];
  }
  const legalPages = await getLegalPages();
  return legalPages.map((page) => ({
    slug: page.slug,
  }));
}

// Generate metadata for the page
export async function generateMetadata({
  params,
}: LegalPageProps): Promise<Metadata> {
  const { slug } = await params;
  const legalPage = await getLegalPageBySlug(slug);

  if (!legalPage) {
    return {
      title: "Legal Page Not Found",
    };
  }

  const metaData = getMetaData(legalPage);
  const title = metaData?.title || legalPage.content?.title || legalPage.name;
  const description = metaData?.description || "";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
    },
    twitter: {
      card: "summary",
      title,
      description,
    },
  };
}

export default async function LegalPageComponent({ params }: LegalPageProps) {
  const { slug } = await params;
  const legalPage = await getLegalPageBySlug(slug);

  if (!legalPage) {
    notFound();
  }

  const title = legalPage.content?.title || legalPage.name;
  const body = legalPage.content?.body;

  // Create a hero service component for the header
  const heroData: HeroServiceComponent = {
    _uid: "legal-hero",
    component: "hero_service",
    headline: title,
  };

  return (
    <>
      <div className="hidden xl:block">
        <NavbarDesktop />
      </div>
      <div className="xl:hidden">
        <NavbarTouchWrapper />
      </div>

      {/* Header Section */}
      <Header data={heroData} textCenter={true} />

      {/* Body Content Section */}
      {body && (
        <section className="bg-white py-12 xl:py-16">
          <div className="container mx-auto px-6 xl:px-12">
            <div className="max-w-4xl mx-auto">
              {renderStoryblokRichText({
                content: body,
                className:
                  "prose-headings:text-[var(--color-charcoal)] prose-p:text-gray-700 prose-strong:text-[var(--color-charcoal)] prose-ul:text-gray-700 prose-lg prose-a:text-[var(--color-charcoal)] prose-a:underline",
              })}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
