import type { Metadata } from "next";
import type { HeroServiceComponent } from "@/lib/storyblok-types";
import HeroService from "@/components/services/hero-service";
import NavbarDesktop from "@/components/layout/navbar-desktop";
import NavbarTouchWrapper from "@/components/layout/navbar-touch/wrapper";
import ContactForm from "@/components/forms/contact";
import { Phone, Mail, MessageSquare } from "lucide-react";
import Link from "next/link";

const OG_IMAGE_URL =
  "https://a.storyblok.com/f/288302830974942/1200x630/f1eb2b2497/bunker-digital-office_og.png";

// Generate metadata for the page
export async function generateMetadata(): Promise<Metadata> {
  const title = "Contact Us | Bunker Digital";
  const description =
    "Get in touch with Bunker Digital. Send us a message and we'll respond as soon as possible.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: [
        {
          url: OG_IMAGE_URL,
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
      images: [OG_IMAGE_URL],
    },
  };
}

export default function ContactPage() {
  // Manually create hero data
  const heroData: HeroServiceComponent = {
    _uid: "contact-hero",
    component: "hero_service",
    headline: "Get in Touch",
    subheadline:
      "We'd love to hear from you. Send us a message and we'll respond as soon as possible.",
    background_image: {
      filename: OG_IMAGE_URL,
    } as any,
  };

  return (
    <>
      <div className="hidden xl:block">
        <NavbarDesktop />
      </div>
      <div className="xl:hidden">
        <NavbarTouchWrapper />
      </div>
      <HeroService data={heroData} showCtaButtons={true} />

      {/* Contact Form and Info Section */}
      <section className="bg-white py-20 xl:py-28">
        <div className="container mx-auto px-6 xl:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 xl:gap-32">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-charcoal mb-6">
                Send us a message
              </h2>
              <ContactForm />
            </div>

            {/* Contact Info */}
            <div>
              <h2 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-charcoal mb-6">
                Contact Information
              </h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <Phone className="w-6 h-6 text-charcoal mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-charcoal mb-1">Phone</p>
                    <a
                      href="tel:01613838568"
                      className="text-charcoal/80 hover:text-charcoal transition-colors"
                    >
                      0161 383 8568
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Mail className="w-6 h-6 text-charcoal mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-charcoal mb-1">Email</p>
                    <a
                      href="mailto:info@bunkerdigital.co.uk"
                      className="text-charcoal/80 hover:text-charcoal transition-colors"
                    >
                      info@bunkerdigital.co.uk
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <MessageSquare className="w-6 h-6 text-charcoal mt-1 flex-shrink-0" />
                  <div>
                    <p className="font-semibold text-charcoal mb-1">WhatsApp</p>
                    <Link
                      href="https://wa.me/447935157365"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-charcoal/80 hover:text-charcoal transition-colors"
                    >
                      +44 7935 157365
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
