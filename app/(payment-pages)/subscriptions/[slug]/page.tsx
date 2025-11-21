import {
  getPaymentSetupPageBySlug,
  getPaymentSetupPages,
} from "@/lib/storyblok";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import type {
  PaymentSetupPage,
  PaymentMetaDataComponent,
} from "@/lib/storyblok-types";
import PaymentSectionRenderer from "@/components/sections/payment-section-renderer";
import NavbarDesktop from "@/components/layout/navbar-desktop";
import NavbarTouchWrapper from "@/components/layout/navbar-touch/wrapper";

interface PaymentPageProps {
  params: Promise<{ slug: string }>;
}

// Helper function to extract meta data from payment page
function getMetaData(page: PaymentSetupPage): PaymentMetaDataComponent | null {
  const metaData = page.content?.blocks?.find(
    (item): item is PaymentMetaDataComponent => item.component === "meta_data"
  );
  return metaData || null;
}

// Generate static params for all payment pages at build time
export async function generateStaticParams() {
  // Skip static generation in development
  if (process.env.NODE_ENV === "development") {
    return [];
  }
  const pages = await getPaymentSetupPages();
  return pages.map((page) => ({
    slug: page.slug,
  }));
}

// Generate metadata for the page
export async function generateMetadata({
  params,
}: PaymentPageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPaymentSetupPageBySlug(slug);

  if (!page) {
    return {
      title: "Page Not Found",
    };
  }

  const metaData = getMetaData(page);

  const title = metaData?.title || page.name;
  const description = metaData?.description || "";
  // Use default OG image as specified
  const ogImage =
    "https://a.storyblok.com/f/288302830974942/1200x630/f1eb2b2497/bunker-digital-office_og.png";

  return {
    title,
    description,
    robots: {
      index: false,
      follow: false,
    },
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
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default async function PaymentPage({ params }: PaymentPageProps) {
  const { slug } = await params;
  const page = await getPaymentSetupPageBySlug(slug);

  if (!page) {
    notFound();
  }

  const allBlocks = page.content?.blocks || [];

  // Filter out meta_data from sections (it's handled separately in metadata)
  const sections = allBlocks.filter((block) => block.component !== "meta_data");

  return (
    <>
      <div className="hidden xl:block">
        <NavbarDesktop />
      </div>
      <div className="xl:hidden">
        <NavbarTouchWrapper />
      </div>
      <PaymentSectionRenderer sections={sections} />
    </>
  );
}
