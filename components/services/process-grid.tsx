import type { ProcessGridComponent } from "@/lib/storyblok-types";
import { getIcon } from "@/lib/icon-mapping";
import { ArrowRight } from "lucide-react";

interface ProcessGridProps {
  data: ProcessGridComponent;
}

export default function ProcessGrid({ data }: ProcessGridProps) {
  return (
    <section className="bg-[var(--color-charcoal)] py-20 xl:py-28 relative z-50">
      <div className="container mx-auto px-6 xl:px-12">
        {/* Heading Section */}
        <div className="mb-12 lg:mb-20">
          {data.overline && (
            <p className="text-gray-300 text-sm mb-4 font-heading font-semibold uppercase tracking-widest">
              {data.overline}
            </p>
          )}
          {data.headline && (
            <h2 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-white leading-tight max-w-4xl xl:max-w-5xl">
              {data.headline}
            </h2>
          )}
          {data.subheadline && (
            <p className="text-lg lg:text-xl text-gray-300 mt-4 max-w-4xl xl:max-w-5xl">
              {data.subheadline}
            </p>
          )}
        </div>
        {data.columns && data.columns.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-8 relative">
            {data.columns.map((item, index) => {
              const Icon = item.icon_code ? getIcon(item.icon_code) : null;
              const columnsLength = data.columns?.length || 0;
              const isLastItem = index === columnsLength - 1;
              const showArrow = !isLastItem && columnsLength > 1;

              return (
                <div key={item._uid} className="relative">
                  <div className="p-6 border border-white/20 rounded shadow-sm">
                    {Icon && (
                      <div className="mb-4">
                        <Icon className="w-6 lg:w-8 h-6 lg:h-8  text-white" />
                      </div>
                    )}
                    {item.title && (
                      <h3 className="text-base lg:text-lg font-bold text-white mb-2">
                        {item.title}
                      </h3>
                    )}
                    {item.description && (
                      <p className="text-gray-300">{item.description}</p>
                    )}
                  </div>
                  {/* Progression Arrow */}
                  {showArrow && (
                    <div className="hidden lg:flex absolute top-1/2 -right-4 transform -translate-y-1/2 items-center justify-center z-10">
                      <ArrowRight className="w-6 h-6 text-white/40" />
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
