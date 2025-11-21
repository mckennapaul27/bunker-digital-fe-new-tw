import { getBlogPostBySlug, getBlogPosts } from "@/lib/storyblok";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { renderStoryblokRichText } from "@/lib/storyblok-richtext";
import type {
  BlogPost,
  MetaDataComponent,
  CTAComponent,
} from "@/lib/storyblok-types";
import CTA from "@/components/sections/cta";
import NavbarDesktop from "@/components/layout/navbar-desktop";
import NavbarTouchWrapper from "@/components/layout/navbar-touch/wrapper";
import Script from "next/script";
import Image from "next/image";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

// Helper function to extract meta data from blog post
function getMetaData(post: BlogPost): MetaDataComponent | null {
  const metaData = post.content?.blocks?.find(
    (item): item is MetaDataComponent => item.component === "meta_data"
  );
  return metaData || null;
}

// Helper function to extract CTA from blog post
function getCTA(post: BlogPost): CTAComponent | null {
  const cta = post.content?.blocks?.find(
    (item): item is CTAComponent => item.component === "cta"
  );
  return cta || null;
}

// Helper function to format date for JSON-LD
function formatDateForSchema(dateString?: string): string {
  if (!dateString) return "";
  try {
    const date = new Date(dateString);
    return date.toISOString();
  } catch {
    return "";
  }
}

// Build BlogPosting JSON-LD schema
function buildBlogPostingSchema({
  slug,
  title,
  description,
  featuredImage,
  publishedAt,
  updatedAt,
  tags = [],
}: {
  slug: string;
  title: string;
  description?: string;
  featuredImage?: string;
  publishedAt?: string;
  updatedAt?: string;
  tags?: string[];
}) {
  const baseUrl = "https://www.bunkerdigital.co.uk";
  const url = `${baseUrl}${slug.startsWith("/") ? slug : `/${slug}`}`;

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    headline: title,
    description: description,
    image: featuredImage ? [featuredImage] : [],
    datePublished: publishedAt,
    dateModified: updatedAt || publishedAt,
    author: {
      "@type": "Person",
      name: "Paul McKenna",
    },
    publisher: {
      "@type": "Organization",
      "@id": "https://www.bunkerdigital.co.uk/#bunker-digital",
    },
    articleSection: "Insights",
    keywords: tags,
  };
}

// Generate static params for all blog posts at build time
export async function generateStaticParams() {
  // Skip static generation in development
  if (process.env.NODE_ENV === "development") {
    return [];
  }
  const blogPosts = await getBlogPosts();
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

// Generate metadata for the page
export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const blogPost = await getBlogPostBySlug(slug);

  if (!blogPost) {
    return {
      title: "Blog Post Not Found",
    };
  }

  const metaData = getMetaData(blogPost);
  const title = metaData?.title || blogPost.content?.title || blogPost.name;
  const description =
    metaData?.description || blogPost.content?.description || "";
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
      type: "article",
      publishedTime: blogPost.first_published_at || blogPost.published_at,
      modifiedTime: blogPost.published_at || blogPost.first_published_at,
      authors: ["Paul McKenna"],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImage ? [ogImage] : [],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const blogPost = await getBlogPostBySlug(slug);

  if (!blogPost) {
    notFound();
  }

  const metaData = getMetaData(blogPost);
  const cta = getCTA(blogPost);
  const title = blogPost.content?.title || blogPost.name;
  const description = blogPost.content?.description || "";
  const ogImage = metaData?.og_image?.filename;
  const publishedAt = blogPost.first_published_at || blogPost.published_at;
  const updatedAt = blogPost.published_at || blogPost.first_published_at;

  // Build JSON-LD schema
  const jsonLd = buildBlogPostingSchema({
    slug: `/insights/${slug}`,
    title,
    description,
    featuredImage: ogImage,
    publishedAt: formatDateForSchema(publishedAt),
    updatedAt: formatDateForSchema(updatedAt),
  });

  return (
    <>
      {/* JSON-LD Schema */}
      <Script
        id="blog-posting-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="hidden xl:block">
        <NavbarDesktop />
      </div>
      <div className="xl:hidden">
        <NavbarTouchWrapper />
      </div>

      {/* Hero Section */}
      <section className="bg-charcoal py-16 xl:py-24 relative">
        <div className="container mx-auto px-6 xl:px-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              {title}
            </h1>
            {description && (
              <p className="text-white/80 text-lg lg:text-xl mb-6">
                {description}
              </p>
            )}
            <div className="flex items-center gap-4 text-white/70 text-sm">
              <span>By Paul McKenna</span>
              {publishedAt && (
                <>
                  <span>•</span>
                  <span>
                    {new Date(publishedAt).toLocaleDateString("en-GB", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Image */}
      {ogImage && (
        <section className="relative w-full h-64 md:h-96 lg:h-[500px]">
          <Image
            src={ogImage}
            alt={title}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </section>
      )}

      {/* Intro Section */}
      {blogPost.content?.intro && (
        <section className="bg-white py-12 xl:py-16">
          <div className="container mx-auto px-6 xl:px-12">
            <div className="max-w-4xl mx-auto">
              {renderStoryblokRichText({
                content: blogPost.content.intro,
                className:
                  "prose-headings:text-[var(--color-charcoal)] prose-p:text-gray-700 prose-strong:text-[var(--color-charcoal)] prose-ul:text-gray-700 prose-lg",
              })}
            </div>
          </div>
        </section>
      )}

      {/* Takeaways Section */}
      {blogPost.content?.takeaways && (
        <section className="bg-beige py-12 xl:py-16">
          <div className="container mx-auto px-6 xl:px-12">
            <div className="max-w-4xl mx-auto">
              {renderStoryblokRichText({
                content: blogPost.content.takeaways,
                className:
                  "prose-headings:text-[var(--color-charcoal)] prose-p:text-gray-700 prose-strong:text-[var(--color-charcoal)] prose-ul:text-gray-700 prose-lg",
              })}
            </div>
          </div>
        </section>
      )}

      {/* Body Content Section */}
      {blogPost.content?.body && (
        <section className="bg-white py-12 xl:py-16">
          <div className="container mx-auto px-6 xl:px-12">
            <div className="max-w-4xl mx-auto">
              {renderStoryblokRichText({
                content: blogPost.content.body,
                className:
                  "prose-headings:text-[var(--color-charcoal)] prose-p:text-gray-700 prose-strong:text-[var(--color-charcoal)] prose-ul:text-gray-700 prose-lg",
              })}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <CTA
        title={cta?.title || "Let's discuss your project"}
        description={
          cta?.description ||
          "We'd love to hear about your project and see how we can help you."
        }
        primaryLinkText={cta?.link_text || "Discuss your project"}
        primaryHref={cta?.href || "/discuss-project"}
      />
    </>
  );
}
