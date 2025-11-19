import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type {
  Service,
  ServiceMetaDataComponent,
  SchemaBlockComponent,
} from "@/lib/storyblok-types";
import SectionRenderer from "@/components/services/section-renderer";

interface LocationPageProps {
  params: Promise<{ slug: string[] }>;
}

// API base URL - use environment variable or fallback to production
const API_BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5001"
    : process.env.API_BASE_URL;

// Helper function to fetch location page data
async function getLocationPageBySlug(
  location: string,
  pageType: string
): Promise<Service | null> {
  try {
    const url = `${API_BASE_URL}/api/api-location-pages/by-slug/${location}/${pageType}`;
    console.log(url);
    const headers: HeadersInit = {};

    // Add authorization header if API key is provided
    if (process.env.CMS_API_KEY) {
      headers["Authorization"] = process.env.CMS_API_KEY;
    }

    const response = await fetch(url, {
      headers,
      // Cache for 1 hour in production, no cache in development
      next: {
        revalidate: process.env.NODE_ENV === "production" ? 3600 : 0,
      },
    });

    if (!response.ok) {
      console.error(
        `Failed to fetch location page: ${response.status} ${response.statusText}`
      );
      return null;
    }

    const pageData = await response.json();

    // The API returns { data: StoryblokLocationPage, meta: LocationPageMeta }
    // We need to transform it to match the Service type structure
    if (pageData.data) {
      return pageData.data as Service;
    }

    return null;
  } catch (error) {
    console.error("Error fetching location page:", error);
    return null;
  }
}

// Helper function to fetch all location pages for static generation
async function getAllLocationPages(): Promise<
  Array<{ location: string; pageType: string }>
> {
  try {
    const url = `${API_BASE_URL}/api-location-pages/all?pageSize=1000`;
    console.log(url);
    const headers: HeadersInit = {};

    if (process.env.CMS_API_KEY) {
      headers["Authorization"] = process.env.CMS_API_KEY;
    }

    const response = await fetch(url, {
      headers,
      next: {
        revalidate: process.env.NODE_ENV === "production" ? 3600 : 0,
      },
    });

    if (!response.ok) {
      console.error(
        `Failed to fetch all location pages: ${response.status} ${response.statusText}`
      );
      return [];
    }

    const { data: locationPages } = await response.json();

    // Extract location and pageType from slug
    return locationPages.map((page: any) => {
      const slugParts = page.slug.split("/").filter(Boolean);
      return {
        location: slugParts[0],
        pageType: slugParts[1],
      };
    });
  } catch (error) {
    console.error("Error fetching all location pages:", error);
    return [];
  }
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

// Generate static params for all location pages at build time
export async function generateStaticParams() {
  // Skip static generation in development
  // if (process.env.NODE_ENV === "development") {
  //   return [];
  // }

  const locationPages = await getAllLocationPages();

  return locationPages.map((page) => ({
    slug: [page.location, page.pageType],
  }));
}

// Generate metadata for the page
export async function generateMetadata({
  params,
}: LocationPageProps): Promise<Metadata> {
  const { slug } = await params;

  if (!slug || slug.length !== 2) {
    return {
      title: "Page Not Found",
    };
  }

  const [location, pageType] = slug;
  const service = await getLocationPageBySlug(location, pageType);

  if (!service) {
    return {
      title: "Page Not Found",
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

export default async function LocationPage({ params }: LocationPageProps) {
  const { slug } = await params;
  console.log(slug);

  if (!slug || slug.length !== 2) {
    notFound();
  }

  const [location, pageType] = slug;
  console.log(location, pageType);
  const service = await getLocationPageBySlug(location, pageType);

  if (!service) {
    notFound();
  }

  const allBlocks = service.content?.blocks || [];
  const schemaBlock = getSchemaBlock(service);

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
      <SectionRenderer sections={sections} />
    </>
  );
}
