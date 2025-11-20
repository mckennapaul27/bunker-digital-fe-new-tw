import type { FAQContainerComponent } from "@/lib/storyblok-types";
import FAQWrapper from "../faqs/wrapper";

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
    <FAQWrapper
      faqs={faqs}
      heading={data.heading}
      subheading={data.subheading}
    />
  );
}
