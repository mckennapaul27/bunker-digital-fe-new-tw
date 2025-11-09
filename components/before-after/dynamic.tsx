"use client";

import { ImgComparisonSlider } from "@img-comparison-slider/react";

interface ImageProps {
  imageUrl: string;
  alt: string;
}

interface BeforeAfterProps {
  beforeImage: ImageProps;
  afterImage: ImageProps;
  caption?: string;
  className?: string;
}

export default function BeforeAfterSliderDynamic({
  beforeImage,
  afterImage,
  caption,
}: BeforeAfterProps) {
  return (
    <div className="inline-block w-full">
      <div className="relative pt-2 pb-1 lg:pt-3 lg:pb-1.5 rounded-2xl overflow-hidden">
        <ImgComparisonSlider className="slider-with-animated-handle rounded-2xl max-h-[800px]">
          <figure slot="first" className="!m-0 relative h-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={beforeImage.imageUrl}
              alt={beforeImage.alt}
              className="w-full h-full max-h-[800px] object-contain"
            />
            <figcaption className="absolute top-4 left-4 bg-white border border-[#c0c0c0] rounded-xl py-2 px-4 text-[#2e3452] opacity-90 text-sm font-medium shadow-sm">
              Before
            </figcaption>
          </figure>
          <figure slot="second" className="!m-0 relative h-full">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={afterImage.imageUrl}
              alt={afterImage.alt}
              className="w-full h-full max-h-[800px] object-contain"
            />
            <figcaption className="absolute top-4 right-4 bg-white border border-[#c0c0c0] rounded-xl py-2 px-4 text-[#2e3452] opacity-90 text-sm font-medium shadow-sm">
              After
            </figcaption>
          </figure>
          <svg
            {...({ slot: "handle" } as any)}
            className="custom-animated-handle"
            xmlns="http://www.w3.org/2000/svg"
            width="100"
            viewBox="-8 -3 16 6"
          >
            <path
              stroke="#fa7d54"
              d="M -5 -2 L -7 0 L -5 2 M -5 -2 L -5 2 M 5 -2 L 7 0 L 5 2 M 5 -2 L 5 2"
              strokeWidth="1.5"
              fill="#fa7d54"
              vectorEffect="non-scaling-stroke"
            />
          </svg>
        </ImgComparisonSlider>
      </div>
      {caption && (
        <figcaption className="text-sm text-gray-600 mt-3 text-left">
          {caption}
        </figcaption>
      )}
    </div>
  );
}
