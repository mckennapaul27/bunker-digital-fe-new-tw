import type { FAQContainerComponent } from "@/lib/storyblok-types";
import FAQWrapper from "../faqs/wrapper";

interface FAQContainerProps {
  data: FAQContainerComponent;
  embedded?: boolean;
}

export default function FAQContainer({
  data,
  embedded = false,
}: FAQContainerProps) {
  const faqs =
    data.questions
      ?.filter((item) => item.question && item.answer)
      .map((item) => ({
        question: item.question as string,
        answer: item.answer as string,
      })) || [];

  if (!embedded && faqs.length === 0) return null;
  if (embedded && faqs.length === 0 && !data.heading && !data.subheading) {
    return null;
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <>
      {faqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
      )}
      <FAQWrapper
        faqs={faqs}
        heading={data.heading}
        subheading={data.subheading}
        embedded={embedded}
      />
    </>
  );
}
