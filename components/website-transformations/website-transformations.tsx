import { getBeforeAfterGrid } from "@/lib/storyblok";
import type { BeforeAfterPairComponent } from "@/lib/storyblok-types";
import ImageCarouselWrapper from "./wrapper";

export default async function WebsiteTransformations() {
  const beforeAfterGrid = await getBeforeAfterGrid();

  if (!beforeAfterGrid || !beforeAfterGrid.content?.blocks) {
    return null;
  }

  const pairs = beforeAfterGrid.content.blocks.filter(
    (item): item is BeforeAfterPairComponent =>
      item.component === "before_after_pair"
  );

  if (pairs.length === 0) {
    return null;
  }

  return (
    <section className="bg-white py-20 xl:py-28 relative z-50">
      <div className="container mx-auto px-6 xl:px-12">
        {/* Heading Section */}
        <div className="mb-12 lg:mb-20">
          <p className="text-charcoal/90 text-sm mb-4 font-heading font-semibold uppercase tracking-widest">
            Website Transformations
          </p>
          <h2 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-charcoal leading-tight max-w-4xl xl:max-w-5xl">
            See the dramatic improvements we've made to our clients' websites
          </h2>
        </div>

        {/* Grid of Before/After Pairs */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 ">
          {pairs.map((pair: BeforeAfterPairComponent) => {
            const images = pair.images || [];

            return (
              <div
                key={pair._uid}
                className="flex flex-col space-y-4 bg-charcoal p-6 rounded-lg"
              >
                {/* Title */}
                {pair.title && (
                  <h3 className="text-xl lg:text-2xl font-bold text-white font-heading">
                    {pair.title}
                  </h3>
                )}

                {/* Subtitle */}
                {pair.subtitle && (
                  <p className="text-base lg:text-lg text-white/80 font-body">
                    {pair.subtitle}
                  </p>
                )}

                {/* Highlights */}
                {pair.highlights && (
                  <div className="text-sm lg:text-base text-charcoal/70 font-body whitespace-pre-line flex flex-wrap gap-2 mt-2">
                    {pair.highlights.split(", ").map((highlight, index) => (
                      <span
                        className="px-2 py-1 sm:px-4 sm:py-2 bg-white/10 text-white text-xs sm:text-sm font-body rounded border border-white/20"
                        key={`${highlight}-${index}`}
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                )}

                {/* Images Carousel */}
                {images.length > 0 && (
                  <div className="mt-auto">
                    <ImageCarouselWrapper
                      images={images}
                      alt={pair.title || "Website transformation"}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
