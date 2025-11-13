"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

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

export default function FAQ({
  faqs,
  heading,
  subheading,
  className = "",
}: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className={`bg-white py-20 xl:py-28 relative z-50 ${className}`}>
      <div className="container mx-auto px-6 xl:px-12">
        {/* Heading Section */}
        <div className="mb-12 lg:mb-20 mx-auto text-center">
          <p className="text-charcoal/90 text-sm mb-4 font-heading font-semibold uppercase tracking-widest">
            frequently asked questions
          </p>
          {heading && (
            <h2 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-charcoal leading-tight max-w-4xl xl:max-w-5xl mx-auto">
              {heading}
            </h2>
          )}
          {subheading && (
            <p className="text-lg lg:text-xl text-charcoal/80 mt-4 max-w-4xl xl:max-w-5xl mx-auto">
              {subheading}
            </p>
          )}
        </div>

        {/* FAQ Items */}
        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-charcoal/10 rounded-lg overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full text-left p-6 flex justify-between items-center hover:bg-charcoal/5 transition-colors cursor-pointer"
                aria-expanded={openIndex === index}
              >
                <h3 className="text-base lg:text-lg font-bold text-charcoal font-heading pr-8">
                  {faq.question}
                </h3>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-charcoal flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-charcoal flex-shrink-0" />
                )}
              </button>
              {openIndex === index && (
                <div className="px-6 lg:px-8 py-6 lg:pb-8">
                  <p className="text-base lg:text-lg text-charcoal/80 font-body">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
