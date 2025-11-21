import type { TextImageSectionComponent } from "@/lib/storyblok-types";
import { renderStoryblokRichText } from "@/lib/storyblok-richtext";
import Image from "next/image";

interface TextImageSectionProps {
  data: TextImageSectionComponent;
}

export default function TextImageSectionAlt({ data }: TextImageSectionProps) {
  if (!data.title && !data.text && !data.image) {
    return null;
  }
  // return null;

  const imagePosition = data.image_position?.[0] || "right";
  const isImageRight = imagePosition?.toLowerCase?.() === "right";

  return (
    <section className="bg-white py-20 xl:py-28 relative z-50">
      <div className="container mx-auto px-6 xl:px-12">
        <div
          className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-24  ${
            !isImageRight ? "lg:flex-row-reverse" : ""
          }`}
        >
          {/* Text Content */}
          <div className={isImageRight ? "lg:order-1" : "lg:order-2"}>
            {data.title && (
              <h2 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-charcoal leading-tight mb-6">
                {data.title}
              </h2>
            )}
            {data.text && (
              <div>
                {renderStoryblokRichText({
                  content: data.text,
                  className:
                    "prose-headings:text-charcoal prose-p:text-charcoal/80 prose-strong:text-charcoal prose-ul:text-charcoal/80",
                })}
              </div>
            )}
          </div>

          {/* Image */}
          {data.image?.filename && (
            <div className={`${isImageRight ? "lg:order-2" : "lg:order-1"}`}>
              <div className="relative w-full aspect-1/1 rounded-lg overflow-hidden max-w-md">
                <Image
                  src={data.image.filename}
                  alt={data.image.alt || data.title || "Image"}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
