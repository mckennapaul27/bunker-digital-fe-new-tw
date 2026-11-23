import StoryblokClient from "storyblok-js-client";
import { draftMode } from "next/headers";
import { storyblokToken } from "@/storyblok.config";
import type {
  CaseStudy,
  ProjectsPage,
  BeforeAfterGrid,
  Testimonials,
  Service,
  PaymentSetupPage,
  BlogPost,
  LegalPage,
  HomePage,
} from "./storyblok-types";

// Initialize Storyblok client
export const storyblokClient = new StoryblokClient({
  accessToken: storyblokToken,
  cache: {
    clear: "auto",
    type: process.env.NODE_ENV === "development" ? "none" : "memory",
  },
});

export type StoryblokVersion = "draft" | "published";

/** Draft inside Visual Editor preview. Local dev may also read drafts. */
export async function getStoryblokVersion(): Promise<StoryblokVersion> {
  try {
    const draft = await draftMode();
    if (draft.isEnabled) return "draft";
  } catch {
    // draftMode() is only available during a request.
  }

  return process.env.NODE_ENV === "development" ? "draft" : "published";
}

async function storyblokVersionParams(): Promise<{
  version: StoryblokVersion;
  cv?: number;
}> {
  const version = await getStoryblokVersion();
  let isPreview = false;
  try {
    const draft = await draftMode();
    isPreview = draft.isEnabled;
  } catch {
    isPreview = false;
  }

  // Bypass the Storyblok CDN cache while the Visual Editor is open.
  return isPreview ? { version, cv: Date.now() } : { version };
}

// Fetch all case studies
export async function getCaseStudies(): Promise<CaseStudy[]> {
  try {
    const { data } = await storyblokClient.get("cdn/stories", {
      starts_with: "case-studies/",
      ...(await storyblokVersionParams()),
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
      ...(await storyblokVersionParams()),
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
        ...(await storyblokVersionParams()),
      }
    );

    return (data.story || null) as CaseStudy | null;
  } catch (error) {
    console.error(`Error fetching case study with slug ${slug}:`, error);
    return null;
  }
}

// Fetch the home page story
export async function getHomePage(): Promise<HomePage | null> {
  try {
    const { data } = await storyblokClient.get("cdn/stories/home", {
      ...(await storyblokVersionParams()),
    });

    return (data.story || null) as HomePage | null;
  } catch (error) {
    console.error("Error fetching home page:", error);
    return null;
  }
}

// Fetch projects page
export async function getProjectsPage(): Promise<ProjectsPage | null> {
  try {
    const { data } = await storyblokClient.get("cdn/stories/work", {
      ...(await storyblokVersionParams()),
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
        ...(await storyblokVersionParams()),
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
      ...(await storyblokVersionParams()),
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
      ...(await storyblokVersionParams()),
    });

    return (data.stories || []) as Service[];
  } catch (error) {
    console.error("Error fetching services:", error);
    return [];
  }
}
//
// Fetch a single service by slug
export async function getServiceBySlug(slug: string): Promise<Service | null> {
  try {
    const { data } = await storyblokClient.get(`cdn/stories/services/${slug}`, {
      ...(await storyblokVersionParams()),
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
      ...(await storyblokVersionParams()),
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
      ...(await storyblokVersionParams()),
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
        ...(await storyblokVersionParams()),
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

// Fetch contact page
export async function getContactPage(): Promise<Service | null> {
  try {
    const { data } = await storyblokClient.get("cdn/stories/contact", {
      ...(await storyblokVersionParams()),
    });

    return (data.story || null) as Service | null;
  } catch (error) {
    console.error("Error fetching contact page:", error);
    return null;
  }
}

// Fetch discuss project page
export async function getDiscussProjectPage(): Promise<Service | null> {
  try {
    const { data } = await storyblokClient.get("cdn/stories/discuss-project", {
      ...(await storyblokVersionParams()),
    });

    return (data.story || null) as Service | null;
  } catch (error) {
    console.error("Error fetching discuss project page:", error);
    return null;
  }
}

// Fetch all blog posts (insights)
export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    const { data } = await storyblokClient.get("cdn/stories", {
      starts_with: "insights/",
      ...(await storyblokVersionParams()),
      sort_by: "first_published_at:desc",
    });

    return (data.stories || []) as BlogPost[];
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return [];
  }
}

// Fetch a single blog post by slug
export async function getBlogPostBySlug(
  slug: string
): Promise<BlogPost | null> {
  try {
    const { data } = await storyblokClient.get(`cdn/stories/insights/${slug}`, {
      ...(await storyblokVersionParams()),
    });

    return (data.story || null) as BlogPost | null;
  } catch (error) {
    console.error(`Error fetching blog post with slug ${slug}:`, error);
    return null;
  }
}

// Fetch all legal pages
export async function getLegalPages(): Promise<LegalPage[]> {
  try {
    const { data } = await storyblokClient.get("cdn/stories", {
      starts_with: "legal/",
      ...(await storyblokVersionParams()),
    });

    return (data.stories || []) as LegalPage[];
  } catch (error) {
    console.error("Error fetching legal pages:", error);
    return [];
  }
}

// Fetch a single legal page by slug
export async function getLegalPageBySlug(
  slug: string
): Promise<LegalPage | null> {
  try {
    const { data } = await storyblokClient.get(`cdn/stories/legal/${slug}`, {
      ...(await storyblokVersionParams()),
    });

    return (data.story || null) as LegalPage | null;
  } catch (error) {
    console.error(`Error fetching legal page with slug ${slug}:`, error);
    return null;
  }
}
