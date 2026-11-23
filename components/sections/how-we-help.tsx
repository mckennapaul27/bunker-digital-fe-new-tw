import Link from "next/link";
import type { HowWeHelpComponent } from "@/lib/storyblok-types";
import { isValidHref, warnInvalidHref } from "@/lib/utils";

interface HowWeHelpProps {
  data: HowWeHelpComponent;
}

export default function HowWeHelp({ data }: HowWeHelpProps) {
  const items =
    data.items?.filter((item) => item.title || item.description) || [];

  if (!data.eyebrow && !data.heading && items.length === 0) return null;

  return (
    <section className="bg-[var(--color-charcoal)] py-20 xl:py-28 relative z-50">
      <div className="container mx-auto px-6 xl:px-12">
        <div className="mb-12 lg:mb-20">
          {data.eyebrow && (
            <p className="text-gray-300 text-sm mb-4 font-heading font-semibold uppercase tracking-widest">
              {data.eyebrow}
            </p>
          )}
          {data.heading && (
            <h2 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-white leading-tight max-w-4xl xl:max-w-5xl">
              {data.heading}
            </h2>
          )}
        </div>

        {items.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10 lg:gap-8">
            {items.map((service) => {
              warnInvalidHref({
                href: service.href,
                context: "components/sections/how-we-help.tsx service.href",
                extra: { uid: service._uid, title: service.title },
              });

              const content = (
                <>
                  {service.title && (
                    <h3 className="text-lg lg:text-xl font-bold text-white mb-3  group-hover:text-[var(--color-primary)] transition-colors">
                      {service.title}
                    </h3>
                  )}
                  {service.description && (
                    <p className="text-gray-300 text-base md:text-lg lg:text-lg mb-4 font-body max-w-[192px]">
                      {service.description}
                    </p>
                  )}
                  <span className="text-[var(--color-primary)] font-body font-semibold group-hover:underline inline-block">
                    Learn more
                  </span>
                </>
              );

              if (!isValidHref(service.href)) {
                return (
                  <div key={service._uid} className="group flex flex-col">
                    {content}
                  </div>
                );
              }

              return (
                <Link
                  key={service._uid}
                  href={service.href}
                  className="group flex flex-col hover:opacity-90 transition-opacity"
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
