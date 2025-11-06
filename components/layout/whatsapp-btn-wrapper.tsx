"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

const WhatsAppBtn = dynamic(() => import("@/components/layout/whatsapp-btn"), {
  ssr: false,
});

export default function WhatsAppBtnWrapper() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  if (!isVisible) return null;

  return <WhatsAppBtn />;
}
