import Link from "next/link";

const services = [
  {
    title: "Custom websites",
    description: "Built for enquiries, not just decoration",
    href: "/services/affordable-web-design-for-small-business",
  },
  {
    title: "Website Maintenance",
    description: "Fast hosting + support local businesses trust",
    href: "/services/website-management-and-maintenance/",
  },
  {
    title: "Paid Ads",
    description: "Ads campaigns built for local services",
    href: "/services/google-ads-agency-for-small-business",
  },
  {
    title: "Local Growth Tools",
    description: "SEO, automations, performance insights",
    href: "/services/seo-for-small-business",
  },
];

export default function HowWeHelp() {
  return (
    <section className="bg-[var(--color-charcoal)] py-20 xl:py-28 relative z-50">
      <div className="container mx-auto px-6 xl:px-12">
        {/* Heading Section */}
        <div className="mb-12 lg:mb-20">
          <p className="text-gray-300 text-sm mb-4 font-heading font-semibold uppercase tracking-widest">
            How we can help
          </p>
          <h2 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-white leading-tight max-w-4xl xl:max-w-5xl">
            Our approach is simple: design, ads, and SEO that work together to
            generate real enquiries and growth. Clear goals, transparent
            results, and lasting impact.
          </h2>
        </div>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10 lg:gap-8">
          {services.map((service) => (
            <Link
              key={service.href}
              href={service.href}
              className="group flex flex-col hover:opacity-90 transition-opacity"
              aria-label={`Learn more about ${service.title}`}
            >
              <h3 className="text-lg lg:text-xl font-bold text-white mb-3  group-hover:text-[var(--color-primary)] transition-colors">
                {service.title}
              </h3>
              <p className="text-gray-300 text-base md:text-lg lg:text-lg mb-4 font-body max-w-[192px]">
                {service.description}
              </p>
              <span className="text-[var(--color-primary)] font-body font-semibold group-hover:underline inline-block">
                Learn more
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
