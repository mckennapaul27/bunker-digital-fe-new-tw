import Image from "next/image";

interface ImageProps {
  imageUrl: string;
  alt: string;
}

interface BeforeAfterStaticProps {
  beforeImage: ImageProps;
  afterImage: ImageProps;
  caption?: string;
  className?: string;
}

export default function BeforeAfterStatic({
  afterImage,
  caption,
}: BeforeAfterStaticProps) {
  // Extract dimensions from Storyblok URL if available
  // Storyblok URLs often have format: /f/{space_id}/{width}x{height}/{hash}/{filename}
  const urlMatch = afterImage.imageUrl.match(/\/(\d+)x(\d+)\//);
  const width = urlMatch ? parseInt(urlMatch[1]) : 800;
  const height = urlMatch ? parseInt(urlMatch[2]) : 600;

  return (
    <div className="inline-block w-full">
      <div className="relative pt-2 pb-1 lg:pt-3 lg:pb-1.5 rounded-2xl overflow-hidden">
        <figure className="!m-0 relative h-full">
          <Image
            src={afterImage.imageUrl}
            alt={afterImage.alt}
            width={width}
            height={height}
            className="w-full h-full max-h-[800px] object-contain rounded-2xl"
            unoptimized={afterImage.imageUrl.includes("a.storyblok.com")}
          />
        </figure>
      </div>
      {caption && (
        <figcaption className="text-sm text-gray-600 mt-3 text-left">
          {caption}
        </figcaption>
      )}
    </div>
  );
}
