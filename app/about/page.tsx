import { getAboutPage } from "@/lib/storyblok";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type {
  Service,
  ServiceMetaDataComponent,
  SchemaBlockComponent,
  FAQContainerComponent,
} from "@/lib/storyblok-types";
import SectionRenderer from "@/components/services/section-renderer";

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

// Generate metadata for the page
export async function generateMetadata(): Promise<Metadata> {
  const aboutPage = await getAboutPage();

  if (!aboutPage) {
    return {
      title: "About Us",
    };
  }

  const metaData = getMetaData(aboutPage);

  const title = metaData?.title || aboutPage.name || "About Us";
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

export default async function AboutPage() {
  const aboutPage = await getAboutPage();

  if (!aboutPage) {
    notFound();
  }

  const allBlocks = aboutPage.content?.blocks || [];
  const schemaBlock = getSchemaBlock(aboutPage);
  const faqContainer = getFAQContainer(aboutPage);

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
      // Replace < with \u003c to prevent XSS (as per Next.js recommendation)
      jsonLdContent = JSON.stringify(parsed).replace(/</g, "\\u003c");
    } catch (error) {
      console.error("Invalid JSON-LD in schema_block:", error);
      // If parsing fails, use the original string as fallback (with XSS protection)
      jsonLdContent = schemaBlock.json_ld.replace(/</g, "\\u003c");
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
      <SectionRenderer sections={sections} />
    </>
  );
}
