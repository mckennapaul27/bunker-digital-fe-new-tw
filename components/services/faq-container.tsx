import type { FAQContainerComponent } from "@/lib/storyblok-types";
import FAQ from "@/components/sections/faq";

interface FAQContainerProps {
  data: FAQContainerComponent;
}

export default function FAQContainer({ data }: FAQContainerProps) {
  const faqs =
    data.questions?.map((item) => ({
      question: item.question || "",
      answer: item.answer || "",
    })) || [];

  return (
    <FAQ faqs={faqs} heading={data.heading} subheading={data.subheading} />
  );
}
