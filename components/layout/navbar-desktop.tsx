import Image from "next/image";
import Link from "next/link";

export default function NavbarDesktop() {
  return (
    <nav className="block bg-black">
      <div className="container mx-auto px-6 xl:px-12">
        <div className="flex items-center justify-between py-5">
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
              className="text-white text-lg y hover:text-gray-300 transition-colors"
            >
              Home
            </Link>
            <Link
              href="/case-studies"
              className="text-white text-lg y hover:text-gray-300 transition-colors"
            >
              Case studies
            </Link>
            <Link
              href="/recent-work"
              className="text-white text-lg y hover:text-gray-300 transition-colors"
            >
              Recent work
            </Link>
            <Link
              href="/about"
              className="text-white text-lg y hover:text-gray-300 transition-colors"
            >
              About
            </Link>
            <Link
              href="/what-we-do"
              className="text-white text-lg y hover:text-gray-300 transition-colors"
            >
              What we do
            </Link>
            <Link
              href="/request-proposal"
              className="text-white text-lg y hover:text-gray-300 transition-colors"
            >
              Request a proposal
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
