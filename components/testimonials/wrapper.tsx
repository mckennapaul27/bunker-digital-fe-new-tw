"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import TestimonialsStatic from "./static";
import type { TestimonialComponent } from "@/lib/storyblok-types";

interface TestimonialsCarouselProps {
  testimonials: TestimonialComponent[];
}

export default function TestimonialsWrapper({
  testimonials,
}: TestimonialsCarouselProps) {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  const TestimonialsDynamic = dynamic(() => import("./dynamic"), {
    loading: () => <TestimonialsStatic testimonials={testimonials} />,
    ssr: false,
  });

  return (
    <div>
      {isClient ? (
        <TestimonialsDynamic testimonials={testimonials} />
      ) : (
        <TestimonialsStatic testimonials={testimonials} />
      )}
    </div>
  );
}
