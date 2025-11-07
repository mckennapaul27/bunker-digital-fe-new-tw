"use client";

import { useEffect } from "react";

export default function StoryblokInit() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") {
      // Load Storyblok only in preview mode
      const { initStoryblok } = require("@/lib/storyblok");
      initStoryblok();
    }
  }, []);

  return null;
}
