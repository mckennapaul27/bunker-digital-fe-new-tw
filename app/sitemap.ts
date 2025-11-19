import { MetadataRoute } from "next";
import { getCaseStudies, getServices } from "@/lib/storyblok";

// API base URL - use environment variable or fallback to production
const API_BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5001"
    : process.env.API_BASE_URL;

// Helper function to fetch all location pages
async function getAllLocationPages(): Promise<
  Array<{ location: string; pageType: string }>
> {
  try {
    const url = `${API_BASE_URL}/api/api-location-pages/all?pageSize=1000`;
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

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.bunkerdigital.co.uk";

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/testimonials`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/work`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/case-studies`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  // Fetch dynamic pages from Storyblok
  const [caseStudies, services] = await Promise.all([
    getCaseStudies(),
    getServices(),
  ]);

  // Case study pages
  const caseStudyPages: MetadataRoute.Sitemap = caseStudies.map((study) => {
    let lastModified = new Date();
    if (study.published_at) {
      const publishedAt =
        typeof study.published_at === "string"
          ? study.published_at
          : typeof study.published_at === "number"
            ? study.published_at
            : null;
      if (publishedAt) {
        lastModified = new Date(publishedAt);
      }
    }
    return {
      url: `${baseUrl}/case-studies/${study.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    };
  });

  // Service pages
  const servicePages: MetadataRoute.Sitemap = services.map((service) => {
    let lastModified = new Date();
    if (service.published_at) {
      const publishedAt =
        typeof service.published_at === "string"
          ? service.published_at
          : typeof service.published_at === "number"
            ? service.published_at
            : null;
      if (publishedAt) {
        lastModified = new Date(publishedAt);
      }
    }
    return {
      url: `${baseUrl}/services/${service.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    };
  });

  // Fetch location pages
  const locationPagesData = await getAllLocationPages();
  const locationPages: MetadataRoute.Sitemap = locationPagesData.map(
    (page) => ({
      url: `${baseUrl}/${page.location}/${page.pageType}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })
  );

  // Combine all pages
  return [...staticPages, ...caseStudyPages, ...servicePages, ...locationPages];
}
