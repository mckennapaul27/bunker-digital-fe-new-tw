"use client";

import { useState } from "react";
import Hamburger from "hamburger-react";
import Image from "next/image";
import Link from "next/link";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/case-studies", label: "Case studies" },
  { href: "/work", label: "Recent work" },
  { href: "/about", label: "About" },
  { href: "/what-we-do", label: "What we do" },
  { href: "/request-proposal", label: "Request a proposal" },
];

export default function NavbarTouch() {
  const [isOpen, setIsOpen] = useState(false);

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <div className="relative z-50 top-0 left-0 w-full z-50">
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
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Slide-in Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-[80%] bg-black z-50 transform transition-transform duration-300 ease-in-out  ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Menu Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-800">
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
          <nav className="flex flex-col flex-1 pt-8">
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
          </nav>
        </div>
      </div>
    </div>
  );
}
