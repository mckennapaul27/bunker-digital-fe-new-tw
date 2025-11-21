import Hamburger from "hamburger-react";
import Image from "next/image";
import Link from "next/link";

export default function NavbarTouchStatic() {
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
            <button aria-label="Toggle menu" className="text-white">
              <Hamburger toggled={false} size={24} />
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
}
