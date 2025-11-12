import Hero from "@/components/sections/hero";
import HowWeHelp from "@/components/sections/how-we-help";
import { getFeaturedCaseStudies } from "@/lib/storyblok";
import CaseStudiesWrapper from "@/components/featured-case-studies/wrapper";
import WebsiteTransformations from "@/components/website-transformations/website-transformations";
import ServicesGrid from "@/components/sections/services-grid";
import Testimonials from "@/components/testimonials/testimonials";
import CTA from "@/components/sections/cta";
import FAQ from "@/components/sections/faq";

export default async function Home() {
  const caseStudies = await getFeaturedCaseStudies();

  const faqs = [
    {
      question: "What types of businesses do you work with?",
      answer:
        "We work primarily with small and service-based businesses, including trades, clinics, and professional services, helping them grow through modern websites and digital marketing.",
    },
    {
      question: "Can you update or redesign our existing website?",
      answer:
        "Yes. We can refresh your current website or rebuild it entirely to improve performance, SEO, and user experience.",
    },
    {
      question: "Do you manage everything after launch?",
      answer:
        "Yes. We offer full website management, hosting, and ongoing support so you can focus on running your business while we handle maintenance and updates.",
    },
    {
      question: "Can you improve our existing Google Ads performance?",
      answer:
        "Absolutely. We regularly take over underperforming accounts, restructure campaigns, and optimise targeting and tracking to deliver better results.",
    },
    {
      question: "What makes Bunker Digital different from other agencies?",
      answer:
        "We focus on clarity, performance, and measurable outcomes. Every website and campaign we create is designed to generate real enquiries, not vanity metrics.",
    },
    {
      question: "How soon can we get started?",
      answer:
        "Most projects begin within one to two weeks of confirmation. You'll receive a clear timeline and progress updates throughout the process.",
    },
  ];

  return (
    <div>
      <Hero />
      <HowWeHelp />
      <CaseStudiesWrapper caseStudies={caseStudies} />
      <WebsiteTransformations />
      <ServicesGrid />
      <Testimonials />
      <CTA
        title="Your website should work harder. Let's make it happen."
        description="Whether you need a complete website redesign, better Google Ads results, or ongoing digital management, Bunker Digital helps you turn clicks into customers. Book a free strategy call and let's plan your next step."
        primaryLinkText="Book a Strategy Call"
        primaryHref="#contact"
        secondaryLinkText="View Recent Projects"
        secondaryHref="/work"
      />
      <FAQ faqs={faqs} />
    </div>
  );
}
