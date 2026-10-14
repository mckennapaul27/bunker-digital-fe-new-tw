import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Health & Healing Festivals | Design options",
  description: "Design directions for the Health & Healing Festivals website.",
  robots: {
    index: false,
    follow: false,
  },
};

const designs = [
  {
    version: "V1",
    title: "Full-page gradient, like the current site",
    thumbnail: "/client-designs/healthhealingfestivals/thumbs/v1.jpg",
    width: 1116,
    height: 4200,
    file: "V1 - Full-page gradient, like the current site.pdf",
  },
  {
    version: "V2",
    title: "Refined current site",
    thumbnail: "/client-designs/healthhealingfestivals/thumbs/v2.jpg",
    width: 968,
    height: 4200,
    file: "V2 - Refined current site.pdf",
  },
  {
    version: "V3",
    title: "Events-first",
    thumbnail: "/client-designs/healthhealingfestivals/thumbs/v3.jpg",
    width: 1238,
    height: 4200,
    file: "v3 - Events-first.pdf",
  },
  {
    version: "V4",
    title: "Immersive",
    thumbnail: "/client-designs/healthhealingfestivals/thumbs/v4.jpg",
    width: 1037,
    height: 4200,
    file: "v4 - Immersive.pdf",
  },
] as const;

export default function HealthHealingFestivalsDesignsPage() {
  return (
    <div className="bg-beige">
      <div className="mx-auto max-w-7xl px-6 py-16 xl:px-12 xl:py-24">
        <header className="max-w-2xl">
          <p className="font-heading text-sm font-semibold uppercase tracking-[0.18em] text-primary">
            Design options
          </p>
          <h1 className="font-heading mt-3 text-4xl font-semibold tracking-tight text-charcoal xl:text-5xl">
            Health & Healing Festivals
          </h1>
          <p className="font-body mt-4 text-lg text-charcoal/80">
            Choose a direction to open the full design.
          </p>
        </header>

        <ul className="mt-12 grid list-none grid-cols-1 gap-x-10 gap-y-16 p-0 lg:grid-cols-2">
          {designs.map((design) => {
            const href = encodeURI(
              `/client-designs/healthhealingfestivals/${design.file}`,
            );

            return (
              <li key={design.version}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block"
                >
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <p className="font-heading text-sm font-semibold uppercase tracking-[0.16em] text-primary">
                        {design.version}
                      </p>
                      <h2 className="font-heading mt-1 text-2xl font-semibold text-charcoal">
                        {design.title}
                      </h2>
                    </div>
                    <span className="font-heading shrink-0 text-sm font-medium text-charcoal/70 transition-colors group-hover:text-primary">
                      Open PDF
                    </span>
                  </div>
                  <div className="mt-4 overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-black/5 transition-transform duration-300 group-hover:-translate-y-1">
                    <Image
                      src={design.thumbnail}
                      alt=""
                      width={design.width}
                      height={design.height}
                      className="h-auto w-full"
                      sizes="(min-width: 1024px) 42vw, 100vw"
                    />
                  </div>
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
