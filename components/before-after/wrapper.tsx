"use client";

import BeforeAfterStatic from "./static";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";

interface ImageProps {
  imageUrl: string;
  alt: string;
}

interface BeforeAfterWrapperProps {
  beforeImage: ImageProps;
  afterImage: ImageProps;
  caption?: string;
  className?: string;
}

export default function BeforeAfterWrapper(props: BeforeAfterWrapperProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const BeforeAfterSliderDynamic = dynamic(() => import("./dynamic"), {
    loading: () => <BeforeAfterStatic {...props} />,
    ssr: false,
  });

  return (
    <div>
      {isClient ? (
        <BeforeAfterSliderDynamic {...props} />
      ) : (
        <BeforeAfterStatic {...props} />
      )}
    </div>
  );
}
