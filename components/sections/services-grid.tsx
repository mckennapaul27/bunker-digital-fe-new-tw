import Link from "next/link";
import {
  Globe,
  Settings,
  TrendingUp,
  Target,
  Code,
  Server,
  ArrowRight,
} from "lucide-react";

const services = [
  {
    title: "Custom Websites",
    icon: Globe,
    bullets: [
      "Transform your outdated or uninspiring website into something you're proud to share.",
      "Bespoke sites for new businesses and startups.",
      "Fast, secure, and built for performance, guaranteed 90+ PageSpeed scores.",
      "Powered by modern, reliable technology for complete peace of mind.",
    ],
    href: "/affordable-web-design-for-small-business",
    cta: "Learn More",
  },
  {
    title: "Website Management",
    icon: Settings,
    bullets: [
      "Continuous monitoring for updates, security, and performance.",
      "Stress-free hosting, plugin updates, and maintenance.",
      "On-demand support for website content and structural changes.",
      "Keep your site running smoothly with an expert always on hand.",
    ],
    href: "/website-management-and-maintenance",
    cta: "Learn More",
  },
  {
    title: "Paid Ads",
    icon: TrendingUp,
    bullets: [
      "Expert setup and management of Google and Microsoft Ads.",
      "Campaigns optimised for conversions, not clicks.",
      "Transparent performance reporting and data-driven improvements.",
      "Proven success across a range of industries.",
    ],
    href: "/google-ads-agency-for-small-business",
    cta: "Learn More",
  },
  {
    title: "Local Growth Tools",
    icon: Target,
    bullets: [
      "Local SEO strategies tailored for small businesses.",
      "Google Business Profile & Bing Places setup and optimisation.",
      "Citation building and local directory optimisation.",
      "Smart automations to boost efficiency and save time.",
      "Google Analytics and Tag Manager configuration for accurate tracking.",
    ],
    href: "/seo-for-small-business",
    cta: "Learn More",
  },
  {
    title: "Custom Software",
    icon: Code,
    bullets: [
      "Custom software development to streamline your business processes.",
      "Bespoke tools to simplify daily operations and reduce admin.",
      "Automate repetitive tasks and streamline your business processes.",
      "Save time and money with systems built around your workflow.",
    ],
    href: "/custom-software-for-small-business",
    cta: "Learn More",
  },
  {
    title: "Managed IT Services",
    icon: Server,
    bullets: [
      "Microsoft 365 and Google Workspace setup and management.",
      "Professional domain and email configuration.",
      "Ongoing IT support and management for small teams.",
      "Secure, reliable systems that keep your business running smoothly.",
    ],
    href: "/managed-it-services-for-small-business",
    cta: "Learn More",
  },
];

export default function ServicesGrid() {
  return (
    <section className="bg-beige py-20 xl:py-28 relative z-50">
      <div className="container mx-auto px-6 xl:px-12">
        {/* Heading Section */}
        <div className="mb-12 lg:mb-20">
          <p className="text-charcoal/90 text-sm mb-4 font-heading font-semibold uppercase tracking-widest">
            Our services
          </p>
          <h2 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-charcoal leading-tight max-w-4xl xl:max-w-5xl">
            Complete digital services designed to help local businesses &amp;
            organisations succeed and thrive
          </h2>
        </div>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 xl:gap-6">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <Link
                key={service.href}
                href={service.href}
                className="group flex flex-col bg-white rounded-lg p-6 lg:p-8 hover:shadow-lg transition-shadow border border-charcoal/10"
                aria-label={`Learn more about ${service.title}`}
              >
                {/* Icon */}
                <div className="mb-4">
                  <Icon className="w-8 h-8 text-charcoal group-hover:text-[var(--color-primary)] transition-colors" />
                </div>

                {/* Title */}
                <div className="text-xl lg:text-2xl font-bold text-charcoal mb-4 font-heading">
                  {service.title}
                </div>

                {/* Bullet Points */}
                <ul className="flex flex-col gap-3 mb-6 flex-grow">
                  {service.bullets.map((bullet, index) => (
                    <li
                      key={index}
                      className="text-charcoal/80 text-base font-body flex items-start gap-2"
                    >
                      <span className="text-[var(--color-charcoal)] mt-0.5 flex-shrink-0">
                        •
                      </span>
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <div className="text-charcoal font-body font-semibold group-hover:underline group-hover:text-[var(--color-primary)] inline-flex items-center gap-2 mt-auto">
                  {service.cta}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[var(--color-primary)]" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
