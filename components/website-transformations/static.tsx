import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { StoryblokAsset } from "@/lib/storyblok-types";

interface ImageCarouselProps {
  images: StoryblokAsset[];
  alt: string;
}

export default function ImageCarouselStatic({
  images,
  alt,
}: ImageCarouselProps) {
  if (images.length === 0) {
    return null;
  }

  return (
    <div className="relative mt-6">
      <div className="overflow-hidden">
        <div className="flex">
          {images.map((image, index) => (
            <div
              key={image.id || index}
              className="flex-[0_0_100%] min-w-0 relative aspect-[280/179] rounded-lg overflow-hidden cursor-pointer "
            >
              <Image
                src={image.filename}
                alt={image.alt || alt || `Image ${index + 1}`}
                fill
                className="object-cover shadow-lg rounded-lg cursor-pointer"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          ))}
        </div>
      </div>
      <p className="text-sm text-white italic font-body text-center mt-4">
        Use the arrows to see the transformation
      </p>
      {/* Navigation Buttons */}
      {images.length > 1 && (
        <div className="flex justify-center gap-2 mt-4">
          <button
            className="p-2 rounded-full bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/80 border border-charcoal/20 transition-colors cursor-pointer"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>
          <button
            className="p-2 rounded-full bg-[var(--color-primary)] hover:bg-[var(--color-primary)]/80 border border-charcoal/20 transition-colors cursor-pointer"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5 text-white" />
          </button>
        </div>
      )}
    </div>
  );
}
