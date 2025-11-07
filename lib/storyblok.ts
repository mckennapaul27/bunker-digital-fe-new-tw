import StoryblokClient from "storyblok-js-client";
import { storyblokToken } from "@/storyblok.config";
import type { CaseStudy } from "./storyblok-types";

// Initialize Storyblok client
export const storyblokClient = new StoryblokClient({
  accessToken: storyblokToken,
  cache: {
    clear: "auto",
    type: "memory",
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
      version: "draft",
    });

    return (data.stories || []) as CaseStudy[];
  } catch (error) {
    console.error("Error fetching case studies:", error);
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
        version: "draft",
      }
    );

    return (data.story || null) as CaseStudy | null;
  } catch (error) {
    console.error(`Error fetching case study with slug ${slug}:`, error);
    return null;
  }
}
