import Link from "next/link";
import { Button } from "@/components/ui/button";
import NavbarDesktop from "@/components/layout/navbar-desktop";
import NavbarTouchWrapper from "@/components/layout/navbar-touch/wrapper";
import { Home, ArrowRight, Search } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 - Page Not Found | Bunker Digital",
  description:
    "The page you're looking for doesn't exist. Return to our homepage or contact us for assistance.",
};

export default function NotFound() {
  return (
    <>
      <div className="hidden xl:block">
        <NavbarDesktop />
      </div>
      <div className="xl:hidden">
        <NavbarTouchWrapper />
      </div>
      <div className="bg-beige min-h-screen py-16 xl:py-28 relative">
        {/* Background Pattern */}
        <div
          className="absolute inset-0 z-0 opacity-100"
          style={{
            backgroundImage: "url('/logo-svg-pattern.svg')",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
          }}
        />
        <div className="container mx-auto px-6 xl:px-12 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* 404 Number */}
            <div className="mb-8 xl:mb-12">
              <h1 className="text-8xl md:text-9xl xl:text-[12rem] font-bold text-[var(--color-charcoal)] leading-none font-heading">
                404
              </h1>
            </div>

            {/* Heading */}
            <div className="mb-6 xl:mb-8">
              <h2 className="text-3xl md:text-4xl xl:text-5xl font-bold text-[var(--color-charcoal)] leading-tight mb-4 font-heading">
                Page Not Found
              </h2>
              <p className="text-lg md:text-xl xl:text-2xl text-gray-700 leading-relaxed max-w-2xl mx-auto">
                Sorry, we couldn't find the page you're looking for. It may have
                been moved, deleted, or the URL might be incorrect.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 xl:mb-16">
              <Button asChild size="lg" variant="default">
                <Link href="/">
                  <Home className="w-5 h-5" />
                  Go to Homepage
                </Link>
              </Button>
              <Button asChild size="lg" variant="charcoal-outline">
                <Link href="/contact">
                  <Search className="w-5 h-5" />
                  Contact Us
                </Link>
              </Button>
            </div>

            {/* Helpful Links */}
            <div className="border-t border-gray-300 pt-8 xl:pt-12">
              <p className="text-sm text-gray-600 mb-6 font-semibold uppercase tracking-widest">
                Popular Pages
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6">
                <Link
                  href="/services"
                  className="text-[var(--color-charcoal)] hover:text-[var(--color-primary)] transition-colors font-semibold inline-flex items-center gap-2"
                >
                  Services
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/case-studies"
                  className="text-[var(--color-charcoal)] hover:text-[var(--color-primary)] transition-colors font-semibold inline-flex items-center gap-2"
                >
                  Case Studies
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/insights"
                  className="text-[var(--color-charcoal)] hover:text-[var(--color-primary)] transition-colors font-semibold inline-flex items-center gap-2"
                >
                  Insights
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/about"
                  className="text-[var(--color-charcoal)] hover:text-[var(--color-primary)] transition-colors font-semibold inline-flex items-center gap-2"
                >
                  About Us
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/work"
                  className="text-[var(--color-charcoal)] hover:text-[var(--color-primary)] transition-colors font-semibold inline-flex items-center gap-2"
                >
                  Our Work
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
