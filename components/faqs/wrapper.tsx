"use client";

import { useEffect, useState } from "react";
import FAQStatic from "./static";
import dynamic from "next/dynamic";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  faqs: FAQItem[];
  heading?: string;
  subheading?: string;
  className?: string;
}

export default function FAQWrapper(props: FAQProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const FAQDynamic = dynamic(() => import("./dynamic"), {
    loading: () => <FAQStatic {...props} />,
    ssr: false,
  });

  return (
    <div>{isClient ? <FAQDynamic {...props} /> : <FAQStatic {...props} />}</div>
  );
}
