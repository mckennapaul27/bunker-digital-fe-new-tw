"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// Dynamically import the sticky navbar with no SSR
const StickyNavbar = dynamic(() => import("./sticky"), {
  ssr: false,
  loading: () => null,
});

export default function NavbarStickyDesktopWrapper() {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      // Start loading the component when user scrolls down 100px
      // This gives us a buffer before the 145px trigger
      if (scrollTop > 100 && !shouldLoad) {
        setShouldLoad(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [shouldLoad]);

  // Only render the sticky navbar component when we've determined it should load
  if (!shouldLoad) return null;

  return <StickyNavbar />;
}
