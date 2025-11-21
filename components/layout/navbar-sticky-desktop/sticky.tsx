"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { navServices } from "@/lib/nav-services";
import { ArrowRight, ChevronDown } from "lucide-react";

export default function StickyNavbar() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsVisible(scrollTop > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isMounted) return null;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 bg-charcoal shadow-lg border-b border-[var(--color-simple)] z-100 transition-all duration-300 ease-out ${
        isVisible
          ? "transform translate-y-0 opacity-100"
          : "transform -translate-y-full opacity-0"
      }`}
    >
      <div className="container mx-auto px-6 xl:px-12">
        <div className="flex items-center justify-between py-3">
          {/* Logo Section */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image
                src="/bunker-digital-logo-1.svg"
                alt="Bunker Digital"
                width={218}
                height={33}
                className="h-auto"
                priority
              />
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="flex items-center gap-8">
            <Link
              href="/"
              className="text-white text-lg y hover:text-[var(--color-primary)] transition-colors"
            >
              Home
            </Link>
            <Link
              href="/case-studies"
              className="text-white text-lg y hover:text-[var(--color-primary)] transition-colors"
            >
              Case studies
            </Link>
            <Link
              href="/work"
              className="text-white text-lg y hover:text-[var(--color-primary)] transition-colors"
            >
              Recent work
            </Link>
            <Link
              href="/about"
              className="text-white text-lg y hover:text-[var(--color-primary)] transition-colors"
            >
              About
            </Link>
            {/* What we do dropdown */}
            <div className="relative group">
              <button className="text-white text-lg y hover:text-[var(--color-primary)] transition-colors flex items-center gap-1">
                What we do
                <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
              </button>
              <div className="absolute top-full left-0 mt-2 w-64 bg-black border border-charcoal/80 rounded-lg shadow-lg py-2 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                {navServices.map((service) => (
                  <Link
                    key={service.href}
                    href={service.href}
                    className="block px-4 py-2 text-white text-base hover:bg-charcoal/80 transition-colors"
                  >
                    {service.title}
                  </Link>
                ))}
              </div>
            </div>
            <Link
              href="/discuss-project"
              className="text-white text-lg y hover:text-[var(--color-primary)] transition-colors flex items-center"
            >
              Discuss your project
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
