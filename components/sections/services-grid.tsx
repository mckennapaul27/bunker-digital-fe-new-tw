import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { HomeServicesGridComponent } from "@/lib/storyblok-types";
import { getIcon } from "@/lib/icon-mapping";
import { isValidHref, warnInvalidHref } from "@/lib/utils";

interface ServicesGridProps {
  data: HomeServicesGridComponent;
}

export default function ServicesGrid({ data }: ServicesGridProps) {
  const services =
    data.items?.filter((item) => item.title || item.bullets?.length) || [];

  if (!data.eyebrow && !data.heading && services.length === 0) return null;

  return (
    <section className="bg-beige py-20 xl:py-28 relative z-50">
      <div className="container mx-auto px-6 xl:px-12">
        <div className="mb-12 lg:mb-20">
          {data.eyebrow && (
            <p className="text-charcoal/90 text-sm mb-4 font-heading font-semibold uppercase tracking-widest">
              {data.eyebrow}
            </p>
          )}
          {data.heading && (
            <h2 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-charcoal leading-tight max-w-4xl xl:max-w-5xl">
              {data.heading}
            </h2>
          )}
        </div>

        {services.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 xl:gap-6">
            {services.map((service) => {
              const Icon = getIcon(service.icon_code);
              const bullets =
                service.bullets
                  ?.map((bullet) => bullet.text)
                  .filter((text): text is string => Boolean(text)) || [];

              warnInvalidHref({
                href: service.href,
                context: "components/sections/services-grid.tsx service.href",
                extra: { uid: service._uid, title: service.title },
              });

              const content = (
                <>
                  {Icon && (
                    <div className="mb-4">
                      <Icon className="w-8 h-8 text-charcoal group-hover:text-[var(--color-primary)] transition-colors" />
                    </div>
                  )}

                  {service.title && (
                    <div className="text-xl lg:text-2xl font-bold text-charcoal mb-4 font-heading">
                      {service.title}
                    </div>
                  )}

                  {bullets.length > 0 && (
                    <ul className="flex flex-col gap-3 mb-6 flex-grow">
                      {bullets.map((bullet, index) => (
                        <li
                          key={`${service._uid}-${index}`}
                          className="text-charcoal/80 text-base font-body flex items-start gap-2"
                        >
                          <span className="text-[var(--color-charcoal)] mt-0.5 flex-shrink-0">
                            •
                          </span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  <div className="text-charcoal font-body font-semibold group-hover:underline group-hover:text-[var(--color-primary)] inline-flex items-center gap-2 mt-auto">
                    {service.cta_text || "Learn More"}
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform text-[var(--color-primary)]" />
                  </div>
                </>
              );

              if (!isValidHref(service.href)) {
                return (
                  <div
                    key={service._uid}
                    className="group flex flex-col bg-white rounded-lg p-6 lg:p-8 border border-charcoal/10"
                  >
                    {content}
                  </div>
                );
              }

              return (
                <Link
                  key={service._uid}
                  href={service.href}
                  className="group flex flex-col bg-white rounded-lg p-6 lg:p-8 hover:shadow-lg transition-shadow border border-charcoal/10"
                  aria-label={`Learn more about ${service.title}`}
                >
                  {content}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
