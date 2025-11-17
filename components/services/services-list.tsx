import type { ServicesListComponent } from "@/lib/storyblok-types";
import { getIcon } from "@/lib/icon-mapping";

interface ServicesListProps {
  data: ServicesListComponent;
}

export default function ServicesList({ data }: ServicesListProps) {
  return (
    <section className="bg-white py-20 xl:py-28 relative z-50">
      <div className="container mx-auto px-6 xl:px-12">
        {/* Heading Section */}
        <div className="mb-12 lg:mb-20">
          {data.overline && (
            <p className="text-charcoal/90 text-sm mb-4 font-heading font-semibold uppercase tracking-widest">
              {data.overline}
            </p>
          )}
          {data.heading && (
            <h2 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-charcoal leading-tight max-w-4xl xl:max-w-5xl">
              {data.heading}
            </h2>
          )}
          {data.subheading && (
            <p className="text-lg lg:text-xl text-charcoal/80 mt-4 max-w-4xl xl:max-w-5xl">
              {data.subheading}
            </p>
          )}
        </div>

        {/* Services List Items */}
        {data.items && data.items.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.items.map((item) => {
              const Icon = item.icon_code ? getIcon(item.icon_code) : null;
              return (
                <div
                  key={item._uid}
                  className="p-6 border border-charcoal/10 rounded"
                >
                  {Icon && (
                    <div className="mb-4">
                      <Icon className="w-8 h-8 text-charcoal" />
                    </div>
                  )}
                  {item.title && (
                    <h3 className="text-base lg:text-lg font-bold text-charcoal mb-2 font-heading">
                      {item.title}
                    </h3>
                  )}
                  {item.description && (
                    <p className="text-charcoal/80 font-body">
                      {item.description}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
