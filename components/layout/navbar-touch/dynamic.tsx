"use client";

import { useState } from "react";
import Hamburger from "hamburger-react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, ChevronRight } from "lucide-react";
import { navServices } from "@/lib/nav-services";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/case-studies", label: "Case studies" },
  { href: "/work", label: "Recent work" },
  { href: "/about", label: "About" },
  { href: "/discuss-project", label: "Discuss your project" },
  { href: "/contact", label: "Contact" },
];

export default function NavbarTouchDynamic() {
  const [isOpen, setIsOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);

  const handleLinkClick = () => {
    setIsOpen(false);
    setIsServicesOpen(false);
  };

  return (
    <div className="relative z-[100] top-0 left-0 w-full">
      <nav className="bg-black">
        <div className="container mx-auto px-6 xl:px-12">
          <div className="flex items-center justify-between py-4">
            {/* Logo Section */}
            <Link href="/" className="flex items-center">
              <Image
                src="/bunker-digital-logo-1.svg"
                alt="Bunker Digital"
                width={247}
                height={38}
                className="h-7 sm:h-8 w-auto"
                priority
              />
            </Link>

            {/* Hamburger Menu Button */}
            <button
              aria-label="Toggle menu"
              className="text-white"
              onClick={() => setIsOpen(!isOpen)}
            >
              <Hamburger toggled={isOpen} size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* Slide-in Menu Overlay */}
      {/* {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )} */}

      {/* Slide-in Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-[80%] sm:w-[80%] lg:w-[60%] bg-black z-[100] transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Menu Header */}
          <div className="flex items-center justify-between p-6 ">
            <Link
              href="/"
              onClick={handleLinkClick}
              className="hidden sm:block"
            >
              <Image
                src="/bunker-digital-logo-1.svg"
                alt="Bunker Digital"
                width={247}
                height={38}
                className="h-6 w-auto"
                priority
              />
            </Link>
            <div className="navbar-menu-icon">
              <button
                aria-label="Close menu"
                className="text-white"
                onClick={() => setIsOpen(false)}
              >
                <Hamburger toggled={isOpen} size={24} />
              </button>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col flex-1 pt-8 overflow-y-auto">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={handleLinkClick}
                className="text-white text-lg font-body px-6 py-4 hover:bg-gray-900 transition-colors"
              >
                {item.label}
              </Link>
            ))}
            {/* What we do dropdown */}
            <div>
              <button
                onClick={() => setIsServicesOpen(!isServicesOpen)}
                className="w-full text-left text-white text-lg font-body px-6 py-4 hover:bg-gray-900 transition-colors flex items-center justify-between"
              >
                <span>What we do</span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    isServicesOpen ? "rotate-180" : ""
                  }`}
                />
              </button>
              {isServicesOpen && (
                <div className="bg-charcoal/80">
                  {navServices.map((service) => (
                    <Link
                      key={service.href}
                      href={service.href}
                      onClick={handleLinkClick}
                      className="block text-white text-base font-body px-10 py-3 hover:bg-gray-800 transition-colors flex items-center gap-2"
                    >
                      <ChevronRight className="w-3 h-3" />
                      {service.title}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>
        </div>
      </div>
    </div>
  );
}
