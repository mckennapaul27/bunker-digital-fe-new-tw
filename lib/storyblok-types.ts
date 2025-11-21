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
  logo_height?: number;
  logo_width?: number;
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

export interface CTAComponent extends StoryblokComponent {
  component: "cta";
  title?: string;
  description?: string;
  link_text?: string;
  href?: string;
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

export interface ProjectCardComponent extends StoryblokComponent {
  component: "project_card";
  name: string;
  url?: string;
  primary_font?: string;
  secondary_font?: string;
  accent_font?: string;
  primary_color?: string;
  secondary_color?: string;
  accent_color?: string;
  mockup?: StoryblokAsset;
  case_study?: (string | CaseStudy)[]; // References to case studies (UUIDs or resolved CaseStudy objects)
  skills?: string[];
  type?: string[];
}

export interface ProjectsPageContent {
  _uid: string;
  component: string;
  body?: StoryblokComponent[];
  [key: string]: unknown;
}

export interface ProjectsPage {
  name: string;
  slug: string;
  uuid: string;
  content: ProjectsPageContent;
  [key: string]: unknown;
}

export interface BeforeAfterPairComponent extends StoryblokComponent {
  component: "before_after_pair";
  title?: string;
  subtitle?: string;
  highlights?: string;
  images?: StoryblokAsset[];
}

export interface BeforeAfterGridContent {
  _uid: string;
  component: string;
  blocks?: BeforeAfterPairComponent[];
  [key: string]: unknown;
}

export interface BeforeAfterGrid {
  name: string;
  slug: string;
  uuid: string;
  content: BeforeAfterGridContent;
  [key: string]: unknown;
}

export interface TestimonialComponent extends StoryblokComponent {
  component: "testimonial";
  name?: string;
  company?: string;
  snippet?: string;
  testimonial?: string;
  platform?: string[]; // Array containing "Bark" or "Google"
}

export interface TestimonialsContent {
  _uid: string;
  component: string;
  blocks?: TestimonialComponent[];
  [key: string]: unknown;
}

export interface Testimonials {
  name: string;
  slug: string;
  uuid: string;
  content: TestimonialsContent;
  [key: string]: unknown;
}

// Service page types
export interface ServiceMetaDataComponent extends StoryblokComponent {
  component: "meta_data";
  title?: string;
  description?: string;
  og_image?: StoryblokAsset;
}

export interface HeroTestimonialComponent extends StoryblokComponent {
  component: "testimonial";
  name?: string;
  company?: string;
  testimonial?: string;
}

export interface HeroServiceComponent extends StoryblokComponent {
  component: "hero_service";
  headline?: string;
  subheadline?: string;
  cta_text?: string;
  cta_link?: string;
  secondary_cta_text?: string;
  secondary_cta_link?: string;
  background_image?: StoryblokAsset;
  trust_bar_below?: boolean;
  blocks?: StoryblokComponent[]; // Can contain testimonial components
}

export interface FeatureItemComponent extends StoryblokComponent {
  component: "feature_item";
  icon_code?: string;
  title?: string;
  description?: string;
}

export interface FeatureGridComponent extends StoryblokComponent {
  component: "feature_grid";
  overline?: string;
  heading?: string;
  subheading?: string;
  columns?: FeatureItemComponent[];
}

export interface ProcessItemComponent extends StoryblokComponent {
  component: "process_item";
  icon_code?: string;
  title?: string;
  description?: string;
}

export interface ProcessGridComponent extends StoryblokComponent {
  component: "process_grid";
  overline?: string;
  headline?: string;
  subheadline?: string;
  columns?: ProcessItemComponent[];
}

export interface CaseStudyContainerComponent extends StoryblokComponent {
  component: "case_study_container";
  overline?: string;
  headline?: string;
  subheadline?: string;
  case_studies?: (string | CaseStudy)[]; // References to case studies
}

export interface ServiceCTAComponent extends StoryblokComponent {
  component: "cta";
  title?: string;
  description?: string;
  link_text?: string;
  href?: string;
  secondary_link_text?: string;
  secondary_href?: string;
}

export interface FAQItemComponent extends StoryblokComponent {
  component: "faq_item";
  question?: string;
  answer?: string;
}

export interface FAQContainerComponent extends StoryblokComponent {
  component: "faq_container";
  heading?: string;
  subheading?: string;
  questions?: FAQItemComponent[];
}

export interface IconGridItemComponent extends StoryblokComponent {
  component: "icon_grid_item";
  icon_code?: string;
  text?: string;
  description?: string;
}

export interface OverviewIntroComponent extends StoryblokComponent {
  component: "overview_intro";
  overline?: string;
  heading?: string;
  content?: any; // Rich text field (Storyblok rich text object)
  bg_color?: string;
  icon_grid?: IconGridItemComponent[];
}

export interface UseCaseItemComponent extends StoryblokComponent {
  component: "use_case_item";
  icon_code?: string;
  title?: string;
  description?: string;
  outcome?: string;
}

export interface UseCaseGridComponent extends StoryblokComponent {
  component: "use_case_grid";
  overline?: string;
  heading?: string;
  items?: UseCaseItemComponent[];
}

export interface ServiceListItemComponent extends StoryblokComponent {
  component: "service_list_item";
  icon_code?: string;
  title?: string;
  description?: string;
}

export interface ServicesListComponent extends StoryblokComponent {
  component: "services_list";
  overline?: string;
  heading?: string;
  subheading?: string;
  items?: ServiceListItemComponent[];
}

export interface TextImageSectionComponent extends StoryblokComponent {
  component: "text_image_section";
  title?: string;
  text?: any; // Rich text field (Storyblok rich text object)
  image?: StoryblokAsset;
  image_position?: string[]; // "left" or "right"
}

export interface SchemaBlockComponent extends StoryblokComponent {
  component: "schema_block";
  json_ld?: string; // JSON-LD structured data as text (textarea field)
}

export interface TestimonialContainerComponent extends StoryblokComponent {
  component: "testimonial_container";
  heading?: string;
  subheading?: string;
}

export interface ServiceContent {
  _uid: string;
  component: string;
  blocks?: StoryblokComponent[];
  [key: string]: unknown;
}

export interface Service {
  name: string;
  slug: string;
  uuid: string;
  content: ServiceContent;
  [key: string]: unknown;
}

// Payment Setup Page types
export interface PaymentMetaDataComponent extends StoryblokComponent {
  component: "meta_data";
  title?: string;
  description?: string;
  og_image?: StoryblokAsset;
}

export interface PaymentHeaderComponent extends StoryblokComponent {
  component: "header";
  title?: string;
  background_image?: StoryblokAsset;
}

export interface PaymentBlockComponent extends StoryblokComponent {
  component: "payment_block";
  title?: string;
  product_id?: string;
  amount?: string;
  currency?: string;
  description?: string;
  url_params?: string;
  items?: any; // Rich text field (Storyblok rich text object)
}

export interface PaymentSetupPageContent {
  _uid: string;
  component: string;
  blocks?: StoryblokComponent[];
  [key: string]: unknown;
}

export interface PaymentSetupPage {
  name: string;
  slug: string;
  uuid: string;
  content: PaymentSetupPageContent;
  [key: string]: unknown;
}

// Blog/Insights page types
export interface BlogPostContent {
  _uid: string;
  component: string;
  title: string;
  description?: string;
  intro?: any; // Rich text field (Storyblok rich text object)
  takeaways?: any; // Rich text field (Storyblok rich text object)
  body?: any; // Rich text field (Storyblok rich text object)
  blocks?: StoryblokComponent[]; // Can contain meta_data and cta components
  first_published_at?: string;
  published_at?: string;
  [key: string]: unknown;
}

export interface BlogPost {
  name: string;
  slug: string;
  uuid: string;
  content: BlogPostContent;
  first_published_at?: string;
  published_at?: string;
  [key: string]: unknown;
}

// Legal page types
export interface LegalPageContent {
  _uid: string;
  component: string;
  title: string;
  body?: any; // Rich text field (Storyblok rich text object)
  blocks?: StoryblokComponent[]; // Can contain meta_data components
  [key: string]: unknown;
}

export interface LegalPage {
  name: string;
  slug: string;
  uuid: string;
  content: LegalPageContent;
  [key: string]: unknown;
}
