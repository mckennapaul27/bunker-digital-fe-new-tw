"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";

import CaseStudiesStatic from "./static";
import { type CaseStudy } from "@/lib/storyblok-types";

interface CaseStudiesWrapperProps {
  caseStudies: CaseStudy[];
}

export default function CaseStudiesWrapper({
  caseStudies,
}: CaseStudiesWrapperProps) {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  const CaseStudiesStaticDynamic = dynamic(() => import("./dynamic"), {
    loading: () => <CaseStudiesStatic caseStudies={caseStudies} />,
    ssr: false,
  });

  if (isClient) {
    return <CaseStudiesStaticDynamic caseStudies={caseStudies} />;
  } else {
    return <CaseStudiesStatic caseStudies={caseStudies} />;
  }
}
