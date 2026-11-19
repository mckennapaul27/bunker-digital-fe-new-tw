"use client";

import Script from "next/script";
import { initStoryblokBridge } from "@/lib/storyblok-bridge";

/** Visual Editor bridge. Mounted only while draft mode is enabled. */
export function StoryblokPreview() {
  return (
    <Script
      src="https://app.storyblok.com/f/storyblok-v2-latest.js"
      strategy="afterInteractive"
      onLoad={() => {
        initStoryblokBridge();
      }}
    />
  );
}
