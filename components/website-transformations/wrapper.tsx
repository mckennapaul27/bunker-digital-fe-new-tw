"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import ImageCarouselStatic from "./static";
import { StoryblokAsset } from "@/lib/storyblok-types";

interface ImageCarouselWrapperProps {
  images: StoryblokAsset[];
  alt: string;
}

export default function ImageCarouselWrapper({
  images,
  alt,
}: ImageCarouselWrapperProps) {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  const ImageCarouselDynamicDynamic = dynamic(() => import("./dynamic"), {
    loading: () => <ImageCarouselStatic images={images} alt={alt} />,
    ssr: false,
  });

  return (
    <div>
      {isClient ? (
        <ImageCarouselDynamicDynamic images={images} alt={alt} />
      ) : (
        <ImageCarouselStatic images={images} alt={alt} />
      )}
    </div>
  );
}
