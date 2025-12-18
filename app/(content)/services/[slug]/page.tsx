import { getServiceBySlug, getServices } from "@/lib/storyblok";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type {
  Service,
  ServiceMetaDataComponent,
  SchemaBlockComponent,
  FAQContainerComponent,
} from "@/lib/storyblok-types";
import SectionRenderer from "@/components/services/section-renderer";
import NavbarDesktop from "@/components/layout/navbar-desktop";
import NavbarTouchWrapper from "@/components/layout/navbar-touch/wrapper";

interface ServicePageProps {
  params: Promise<{ slug: string }>;
}

// Helper function to extract meta data from service
function getMetaData(service: Service): ServiceMetaDataComponent | null {
  const metaData = service.content?.blocks?.find(
    (item): item is ServiceMetaDataComponent => item.component === "meta_data"
  );
  return metaData || null;
}

// Helper function to extract schema block from service
function getSchemaBlock(service: Service): SchemaBlockComponent | null {
  const schemaBlock = service.content?.blocks?.find(
    (item): item is SchemaBlockComponent => item.component === "schema_block"
  );
  return schemaBlock || null;
}

// Helper function to extract FAQ container from service
function getFAQContainer(service: Service): FAQContainerComponent | null {
  const faqContainer = service.content?.blocks?.find(
    (item): item is FAQContainerComponent => item.component === "faq_container"
  );
  return faqContainer || null;
}

// Generate static params for all services at build time
export async function generateStaticParams() {
  // Skip static generation in development
  if (process.env.NODE_ENV === "development") {
    return [];
  }
  const services = await getServices();
  if (process.env.NODE_ENV !== "production") {
    console.log("[link-debug] generateStaticParams services", {
      count: services.length,
      sample: services.slice(0, 10).map((s) => s.slug),
    });
  }
  return services.map((service) => ({
    slug: service.slug,
  }));
}

// Generate metadata for the page
export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);

  if (!service) {
    return {
      title: "Service Not Found",
    };
  }

  const metaData = getMetaData(service);

  const title = metaData?.title || service.name;
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

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  if (process.env.NODE_ENV !== "production") {
    console.log("[link-debug] ServicePage fetch", { slug });
  }
  const service = await getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const allBlocks = service.content?.blocks || [];
  const schemaBlock = getSchemaBlock(service);
  const faqContainer = getFAQContainer(service);

  // Filter out meta_data and schema_block from sections (they're handled separately)
  const sections = allBlocks.filter(
    (block) =>
      block.component !== "meta_data" && block.component !== "schema_block"
  );

  // Parse and stringify JSON-LD to ensure valid formatting
  let jsonLdContent: string | null = null;
  if (schemaBlock?.json_ld) {
    try {
      // Parse to validate JSON, then stringify to ensure clean formatting
      const parsed = JSON.parse(schemaBlock.json_ld);
      jsonLdContent = JSON.stringify(parsed);
    } catch (error) {
      console.error("Invalid JSON-LD in schema_block:", error);
      // If parsing fails, use the original string as fallback
      jsonLdContent = schemaBlock.json_ld;
    }
  }

  // Generate FAQ structured data if FAQ container exists
  let faqJsonLd: string | null = null;
  if (faqContainer?.questions && faqContainer.questions.length > 0) {
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqContainer.questions
        .filter((item) => item.question && item.answer)
        .map((item) => ({
          "@type": "Question",
          name: item.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.answer,
          },
        })),
    };
    faqJsonLd = JSON.stringify(faqSchema).replace(/</g, "\\u003c");
  }

  return (
    <>
      {/* JSON-LD Structured Data */}
      {jsonLdContent && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: jsonLdContent,
          }}
        />
      )}
      {/* FAQ Structured Data */}
      {faqJsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: faqJsonLd,
          }}
        />
      )}
      <div className="hidden xl:block">
        <NavbarDesktop />
      </div>
      <div className="xl:hidden">
        <NavbarTouchWrapper />
      </div>
      <SectionRenderer sections={sections} />
    </>
  );
}
