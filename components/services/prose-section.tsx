import type { ProseSectionComponent } from "@/lib/storyblok-types";
import { renderStoryblokRichText } from "@/lib/storyblok-richtext";

interface ProseSectionProps {
  data: ProseSectionComponent;
}

export default function ProseSection({ data }: ProseSectionProps) {
  if (!data.heading && !data.content) {
    return null;
  }

  return (
    <section
      className={`${data.bg_color ? data.bg_color : "bg-white"} py-16 xl:py-20 relative z-50`}
    >
      <div className="container mx-auto px-6 xl:px-12">
        <div className="max-w-3xl">
          {data.overline && (
            <p className="text-charcoal/90 text-sm mb-4 font-heading font-semibold uppercase tracking-widest">
              {data.overline}
            </p>
          )}
          {data.heading && (
            <h2 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-charcoal leading-tight mb-6">
              {data.heading}
            </h2>
          )}
          {data.content &&
            renderStoryblokRichText({
              content: data.content,
              className:
                "prose-headings:text-charcoal prose-p:text-charcoal/80 prose-strong:text-charcoal",
            })}
        </div>
      </div>
    </section>
  );
}
