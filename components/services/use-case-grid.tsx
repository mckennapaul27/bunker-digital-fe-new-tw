import type { UseCaseGridComponent } from "@/lib/storyblok-types";
import { getIcon } from "@/lib/icon-mapping";
import { Check } from "lucide-react";

interface UseCaseGridProps {
  data: UseCaseGridComponent;
}

// Fixed Bento grid layout for 5 items
// Layout:
// Row 1: [Item 1 (2 cols)] [Item 2 (1 col)]
// Row 2: [Item 3 (1 col, 2 rows tall)] [Item 4 (1 col)]
// Row 3: [Item 3 continues] [Item 5 (1 col)]
function getBentoSize(index: number): string {
  const sizes = [
    "md:col-span-2 lg:col-span-2 md:row-span-1 lg:row-span-1", // Item 1: Wide
    "md:col-span-1 lg:col-span-1 md:row-span-1 lg:row-span-1", // Item 2: Standard
    "md:col-span-1 lg:col-span-1 md:row-span-1 lg:row-span-1", // Item 3: Tall
    "md:col-span-1 lg:col-span-1 md:row-span-1 lg:row-span-1", // Item 4: Standard
    "md:col-span-1 lg:col-span-1 md:row-span-1 lg:row-span-1", // Item 5: Standard
  ];
  return (
    sizes[index] || "md:col-span-1 lg:col-span-1 md:row-span-1 lg:row-span-1"
  );
}

export default function UseCaseGrid({ data }: UseCaseGridProps) {
  return (
    <section className="bg-charcoal py-20 xl:py-28 relative z-50">
      <div className="container mx-auto px-6 xl:px-12">
        {/* Heading Section */}
        <div className="mb-12 lg:mb-20">
          {data.overline && (
            <p className="text-white/90 text-sm mb-4 font-heading font-semibold uppercase tracking-widest">
              {data.overline}
            </p>
          )}
          {data.heading && (
            <h2 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-white leading-tight max-w-4xl xl:max-w-5xl">
              {data.heading}
            </h2>
          )}
        </div>

        {/* Bento Grid - Fixed layout for 5 items */}
        {data.items && data.items.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 auto-rows-fr gap-8 ">
            {data.items.slice(0, 5).map((item, index) => {
              const Icon = item.icon_code ? getIcon(item.icon_code) : null;
              const bentoSize = getBentoSize(index);

              return (
                <div
                  key={item._uid}
                  className={`group relative p-4 lg:p-6 border border-[var(--color-primary)]/50 rounded-xl flex flex-col ${bentoSize}`}
                >
                  {/* Icon */}
                  {Icon && (
                    <div className="mb-2">
                      <div className="w-12 h-12 lg:w-14 lg:h-14 ">
                        <Icon className="w-6 h-6 lg:w-7 lg:h-7 text-white" />
                      </div>
                    </div>
                  )}

                  {/* Title */}
                  {item.title && (
                    <h3 className="text-base lg:text-lg font-bold text-white mb-3 lg:mb-4 font-heading leading-tight">
                      {item.title}
                    </h3>
                  )}

                  {/* Description */}
                  {item.description && (
                    <p className="text-white/80 mb-4 lg:mb-6 font-body text-sm lg:text-base leading-relaxed flex-grow">
                      {item.description}
                    </p>
                  )}

                  {/* Outcome Badge/Callout */}
                  {item.outcome && (
                    <div className="mt-auto pt-4 ">
                      <div className="inline-flex items-center gap-2 ">
                        <span className="text-white text-sm font-body inline-flex items-center gap-2">
                          <Check className="w-4 h-4 text-[var(--color-primary)] hidden sm:block" />
                          <span className="italic">{item.outcome}</span>
                        </span>
                      </div>
                    </div>
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
