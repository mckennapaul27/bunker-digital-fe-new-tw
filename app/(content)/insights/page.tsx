import { getBlogPosts } from "@/lib/storyblok";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar } from "lucide-react";
import type { BlogPost, MetaDataComponent } from "@/lib/storyblok-types";
import NavbarDesktop from "@/components/layout/navbar-desktop";
import NavbarTouchWrapper from "@/components/layout/navbar-touch/wrapper";

// Helper function to extract meta data from blog post
function getMetaData(post: BlogPost): MetaDataComponent | null {
  const metaData = post.content?.blocks?.find(
    (item): item is MetaDataComponent => item.component === "meta_data"
  );
  return metaData || null;
}

// Helper function to format date
function formatDate(dateString?: string): string {
  if (!dateString) return "";
  try {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return "";
  }
}

export default async function InsightsPage() {
  const blogPosts = await getBlogPosts();

  return (
    <>
      <div className="hidden xl:block">
        <NavbarDesktop />
      </div>
      <div className="xl:hidden">
        <NavbarTouchWrapper />
      </div>
      <div className="bg-beige min-h-screen py-16 xl:py-28 relative">
        {/* Background Pattern */}
        <div
          className="absolute inset-0 z-0 opacity-100"
          style={{
            backgroundImage: "url('/logo-svg-pattern.svg')",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        />
        <div className="container mx-auto px-6 xl:px-12 relative z-10">
          {/* Heading Section */}
          <div className="mb-12">
            <p className="text-charcoal/90 text-sm mb-2 font-heading font-semibold uppercase tracking-widest">
              Insights
            </p>
            <h1 className="text-3xl lg:text-3xl xl:text-4xl font-bold text-[var(--color-charcoal)] leading-tight max-w-4xl xl:max-w-5xl">
              Latest insights, tips, and strategies to help your business grow
              online.
            </h1>
          </div>

          {/* Blog Posts Grid */}
          {blogPosts.length === 0 ? (
            <p className="text-gray-600">No blog posts found.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-10">
              {blogPosts.map((post: BlogPost) => {
                const metaData = getMetaData(post);
                const title = post.content?.title || post.name;
                const description = post.content?.description || "";
                const publishedDate =
                  post.first_published_at || post.published_at;
                const ogImage = metaData?.og_image?.filename;

                return (
                  <Link
                    key={post.uuid}
                    href={`/insights/${post.slug}`}
                    className="group relative block"
                  >
                    {/* Card Container */}
                    <div className="relative h-full rounded-lg overflow-hidden bg-white shadow-md hover:shadow-xl transition-shadow duration-300">
                      {/* Featured Image */}
                      {ogImage && (
                        <div className="relative w-full h-48 overflow-hidden">
                          <Image
                            src={ogImage}
                            alt={title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                          />
                        </div>
                      )}

                      {/* Content */}
                      <div className="p-6 lg:p-8 flex flex-col h-full">
                        {/* Date */}
                        {publishedDate && (
                          <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                            <Calendar className="w-4 h-4" />
                            <span>{formatDate(publishedDate)}</span>
                          </div>
                        )}

                        {/* Title */}
                        <div className="text-xl lg:text-2xl font-bold text-charcoal mb-4 leading-tight font-heading group-hover:text-[var(--color-primary)] transition-colors font-heading">
                          {title}
                        </div>

                        {/* Description */}
                        {description && (
                          <div className="text-gray-700 text-base mb-6 line-clamp-3 flex-grow">
                            {description}
                          </div>
                        )}

                        {/* CTA Button */}
                        <div className="mt-auto">
                          <Button
                            size="default"
                            variant="outline"
                            className="w-full"
                          >
                            Read Article
                            <ArrowRight className="ml-2 w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
