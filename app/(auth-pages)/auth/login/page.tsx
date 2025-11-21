import type { Metadata } from "next";
import Login from "@/components/forms/login";

const ogImage =
  "https://a.storyblok.com/f/288302830974942/1200x630/f1eb2b2497/bunker-digital-office_og.png";
const title = "Login | BunkerDigital";
const description = "Login to your BunkerDigital account";

export const metadata: Metadata = {
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

export default function LoginPage() {
  return (
    <section className="bg-white py-20 xl:py-28 min-h-[90vh] flex items-center justify-center">
      <div className="container mx-auto px-6 xl:px-12">
        <div className="max-w-lg mx-auto">
          <h1 className="text-3xl lg:text-4xl font-bold text-charcoal mb-8 text-center">
            Login
          </h1>
          <Login />
        </div>
      </div>
    </section>
  );
}
