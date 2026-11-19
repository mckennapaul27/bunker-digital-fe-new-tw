"use client";

import dynamic from "next/dynamic";

const StoryblokPreview = dynamic(
  () => import("./storyblok-preview").then((mod) => mod.StoryblokPreview),
  { ssr: false },
);

export function StoryblokPreviewWrapper() {
  return <StoryblokPreview />;
}
