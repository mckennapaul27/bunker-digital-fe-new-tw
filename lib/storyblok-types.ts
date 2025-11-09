// Minimal TypeScript types for Storyblok case studies
// These types are based on the actual Storyblok response structure

export interface StoryblokAsset {
  id: number;
  alt: string;
  name: string;
  focus: string;
  title: string;
  source: string;
  filename: string;
  copyright: string;
  fieldtype: string;
  meta_data: Record<string, unknown>;
  is_external_url: boolean;
}

export interface StoryblokComponent {
  _uid: string;
  component: string;
  _editable?: string;
  [key: string]: unknown;
}

export interface CompanyDetailsComponent extends StoryblokComponent {
  component: "company_details";
  logo?: StoryblokAsset;
  name: string;
  website_url?: string;
  company_type?: string;
}

export interface ProjectDetailsComponent extends StoryblokComponent {
  component: "project_details";
  testimonial?: string;
  testimonial_name?: string;
  desktop_mockup?: StoryblokAsset;
  skills?: string[];
}

export interface ProjectBrandingComponent extends StoryblokComponent {
  component: "project_branding";
  branding_description?: string;
  primary_font?: string;
  primary_color?: string;
  secondary_font?: string;
  secondary_color?: string;
  accent_font?: string;
  accent_color?: string;
  color_theme?: string[];
}

export interface MetaDataComponent extends StoryblokComponent {
  component: "meta_data";
  title?: string;
  description?: string;
  og_image?: StoryblokAsset;
}

export interface CaseStudyContent {
  _uid: string;
  component: string;
  title: string;
  takeaways?: StoryblokComponent[];
  content?: StoryblokComponent[];
  cover_image_sm?: StoryblokAsset;
  cover_image_lg?: StoryblokAsset;
  body?: StoryblokComponent[];
  [key: string]: unknown;
}

export interface CaseStudy {
  name: string;
  slug: string;
  uuid: string;
  content: CaseStudyContent;
  [key: string]: unknown;
}
