import { getHomePage } from "@/lib/storyblok";
import type { ServiceMetaDataComponent } from "@/lib/storyblok-types";
import HomeSectionRenderer from "@/components/home/section-renderer";
import NavbarDesktop from "@/components/layout/navbar-desktop";
import NavbarTouchWrapper from "@/components/layout/navbar-touch/wrapper";
import type { Metadata } from "next";

const fallbackTitle =
  "Bunker Digital - Modern Websites & Digital Marketing for Small Businesses";
const fallbackDescription =
  "Whether you need a complete website redesign, better Google Ads results, or ongoing digital management, Bunker Digital helps you turn clicks into customers.";
const fallbackOgImage =
  "https://a.storyblok.com/f/288302830974942/1200x630/f5d6bf064d/webdesign-og.png";

function getMetaData(
  home: Awaited<ReturnType<typeof getHomePage>>
): ServiceMetaDataComponent | null {
  const metaData = home?.content?.meta_data?.find(
    (item): item is ServiceMetaDataComponent => item.component === "meta_data"
  );
  return metaData || null;
}

export async function generateMetadata(): Promise<Metadata> {
  const home = await getHomePage();
  const metaData = getMetaData(home);
  const title = metaData?.title || fallbackTitle;
  const description = metaData?.description || fallbackDescription;
  const ogImage = metaData?.og_image?.filename || fallbackOgImage;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function Home() {
  const home = await getHomePage();
  const blocks = home?.content?.blocks || [];

  if (!home || home.content?.component !== "home_page_structure") {
    console.error(
      "Home story is missing or is not a home_page_structure content type."
    );
  }

  return (
    <div>
      <div className="hidden xl:block">
        <NavbarDesktop />
      </div>
      <div className="xl:hidden">
        <NavbarTouchWrapper />
      </div>
      <HomeSectionRenderer blocks={blocks} />
    </div>
  );
}
