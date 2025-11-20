import StoryblokClient from "storyblok-js-client";
import { storyblokToken } from "@/storyblok.config";
import type {
  CaseStudy,
  ProjectsPage,
  BeforeAfterGrid,
  Testimonials,
  Service,
  PaymentSetupPage,
} from "./storyblok-types";

// Initialize Storyblok client
export const storyblokClient = new StoryblokClient({
  accessToken: storyblokToken,
  cache: {
    clear: "auto",
    type: process.env.NODE_ENV === "development" ? "none" : "memory",
  },
});

// Initialize Storyblok bridge for preview mode
export function initStoryblok() {
  if (typeof window !== "undefined" && (window as any).storyblok) {
    const storyblokInstance = (window as any).storyblok;

    storyblokInstance.on(["input", "published", "change"], (payload: any) => {
      if (payload.action === "input") {
        if (payload.story.id === payload.storyId) {
          storyblokInstance.enterEditmode();
        }
      } else if (payload.action === "change") {
        window.location.reload();
      }
    });
  }
}

// Fetch all case studies
export async function getCaseStudies(): Promise<CaseStudy[]> {
  try {
    const { data } = await storyblokClient.get("cdn/stories", {
      starts_with: "case-studies/",
      version: process.env.NODE_ENV === "development" ? "draft" : "published",
    });

    return (data.stories || []) as CaseStudy[];
  } catch (error) {
    console.error("Error fetching case studies:", error);
    return [];
  }
}

// Fetch featured case studies
export async function getFeaturedCaseStudies(): Promise<CaseStudy[]> {
  try {
    // Fetch all case studies and filter client-side
    // (Storyblok filter_query can be unreliable with nested content fields)
    const { data } = await storyblokClient.get("cdn/stories", {
      starts_with: "case-studies/",
      version: process.env.NODE_ENV === "development" ? "draft" : "published",
    });

    const allCaseStudies = (data.stories || []) as CaseStudy[];

    // Filter for featured case studies
    const featured = allCaseStudies.filter(
      (study) => study.content?.is_featured === true
    );

    return featured;
  } catch (error) {
    console.error("Error fetching featured case studies:", error);
    return [];
  }
}

// Fetch a single case study by slug
export async function getCaseStudyBySlug(
  slug: string
): Promise<CaseStudy | null> {
  try {
    const { data } = await storyblokClient.get(
      `cdn/stories/case-studies/${slug}`,
      {
        version: process.env.NODE_ENV === "development" ? "draft" : "published",
      }
    );

    return (data.story || null) as CaseStudy | null;
  } catch (error) {
    console.error(`Error fetching case study with slug ${slug}:`, error);
    return null;
  }
}

// Fetch projects page
export async function getProjectsPage(): Promise<ProjectsPage | null> {
  try {
    const { data } = await storyblokClient.get("cdn/stories/work", {
      version: process.env.NODE_ENV === "development" ? "draft" : "published",
      resolve_relations: "project_card.case_study",
    });

    return (data.story || null) as ProjectsPage | null;
  } catch (error) {
    console.error("Error fetching projects page:", error);
    return null;
  }
}

// Fetch before after grid
export async function getBeforeAfterGrid(): Promise<BeforeAfterGrid | null> {
  try {
    const { data } = await storyblokClient.get(
      "cdn/stories/before-after-transformations",
      {
        version: process.env.NODE_ENV === "development" ? "draft" : "published",
      }
    );

    return (data.story || null) as BeforeAfterGrid | null;
  } catch (error) {
    console.error("Error fetching before after grid:", error);
    return null;
  }
}

// Fetch testimonials
export async function getTestimonials(): Promise<Testimonials | null> {
  try {
    const { data } = await storyblokClient.get("cdn/stories/testimonials", {
      version: process.env.NODE_ENV === "development" ? "draft" : "published",
    });

    return (data.story || null) as Testimonials | null;
  } catch (error) {
    console.error("Error fetching testimonials:", error);
    return null;
  }
}

// Fetch all services
export async function getServices(): Promise<Service[]> {
  try {
    const { data } = await storyblokClient.get("cdn/stories", {
      starts_with: "services/",
      version: process.env.NODE_ENV === "development" ? "draft" : "published",
    });

    return (data.stories || []) as Service[];
  } catch (error) {
    console.error("Error fetching services:", error);
    return [];
  }
}

// Fetch a single service by slug
export async function getServiceBySlug(slug: string): Promise<Service | null> {
  try {
    const { data } = await storyblokClient.get(`cdn/stories/services/${slug}`, {
      version: process.env.NODE_ENV === "development" ? "draft" : "published",
      resolve_relations: "case_study_container.case_studies",
    });

    return (data.story || null) as Service | null;
  } catch (error) {
    console.error(`Error fetching service with slug ${slug}:`, error);
    return null;
  }
}

// Fetch about page
export async function getAboutPage(): Promise<Service | null> {
  try {
    const { data } = await storyblokClient.get("cdn/stories/about", {
      version: process.env.NODE_ENV === "development" ? "draft" : "published",
    });

    return (data.story || null) as Service | null;
  } catch (error) {
    console.error("Error fetching about page:", error);
    return null;
  }
}

// Fetch all payment setup pages
export async function getPaymentSetupPages(): Promise<PaymentSetupPage[]> {
  try {
    const { data } = await storyblokClient.get("cdn/stories", {
      starts_with: "subscriptions/",
      version: process.env.NODE_ENV === "development" ? "draft" : "published",
    });

    return (data.stories || []) as PaymentSetupPage[];
  } catch (error) {
    console.error("Error fetching payment setup pages:", error);
    return [];
  }
}

// Fetch a single payment setup page by slug
export async function getPaymentSetupPageBySlug(
  slug: string
): Promise<PaymentSetupPage | null> {
  try {
    const { data } = await storyblokClient.get(
      `cdn/stories/subscriptions/${slug}`,
      {
        version: process.env.NODE_ENV === "development" ? "draft" : "published",
      }
    );

    return (data.story || null) as PaymentSetupPage | null;
  } catch (error) {
    console.error(
      `Error fetching payment setup page with slug ${slug}:`,
      error
    );
    return null;
  }
}
