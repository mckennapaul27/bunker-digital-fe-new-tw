import type { OverviewIntroComponent } from "@/lib/storyblok-types";
import { renderStoryblokRichText } from "@/lib/storyblok-richtext";
import { getIcon } from "@/lib/icon-mapping";

interface OverviewIntroProps {
  data: OverviewIntroComponent;
}

export default function OverviewIntro({ data }: OverviewIntroProps) {
  return (
    <section
      className={`${data.bg_color ? data.bg_color : "bg-white"} py-20 xl:py-28 relative z-50`}
    >
      <div className="container mx-auto px-6 xl:px-12">
        {/* Heading Section */}
        <div className="mb-12 lg:mb-16">
          {data.overline && (
            <p className="text-charcoal/90 text-sm mb-4 font-heading font-semibold uppercase tracking-widest">
              {data.overline}
            </p>
          )}
          {data.heading && (
            <h2 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-charcoal leading-tight max-w-3xl">
              {data.heading}
            </h2>
          )}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-16">
          {data.content && (
            <div className="">
              {renderStoryblokRichText({
                content: data.content,
                className:
                  "prose-headings:text-charcoal prose-p:text-charcoal/80 prose-strong:text-charcoal",
              })}
            </div>
          )}
          {data.icon_grid && data.icon_grid.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 self-start">
              {data.icon_grid.map((item) => {
                const Icon = item.icon_code ? getIcon(item.icon_code) : null;
                return (
                  <div
                    key={item._uid}
                    className="p-6 border border-charcoal/10 rounded shadow-sm"
                  >
                    {Icon && (
                      <div className="mb-4">
                        <Icon className="w-6 lg:w-8 h-6 lg:h-8 text-charcoal" />
                      </div>
                    )}
                    {item.text && (
                      <h3 className="text-base lg:text-lg font-bold text-charcoal mb-2">
                        {item.text}
                      </h3>
                    )}
                    {item.description && (
                      <p className="text-charcoal/80">{item.description}</p>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
