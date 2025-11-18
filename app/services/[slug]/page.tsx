import { getServiceBySlug, getServices } from "@/lib/storyblok";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type { Service, ServiceMetaDataComponent } from "@/lib/storyblok-types";
import SectionRenderer from "@/components/services/section-renderer";

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

// Generate static params for all services at build time
export async function generateStaticParams() {
  // Skip static generation in development
  if (process.env.NODE_ENV === "development") {
    return [];
  }
  const services = await getServices();
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
  const service = await getServiceBySlug(slug);
  //   console.log(JSON.stringify(service, null, 2));

  if (!service) {
    notFound();
  }

  const sections = service.content?.blocks || [];

  return <SectionRenderer sections={sections} />;
}
