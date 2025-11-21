import Link from "next/link";
import { Phone, Mail, MessageSquare } from "lucide-react";

export default function Footer() {
  const services = [
    {
      name: "Affordable Web Design for Small Business",
      href: "/services/affordable-web-design-for-small-business",
    },
    {
      name: "Website Management and Maintenance",
      href: "/services/website-management-and-maintenance",
    },
    {
      name: "Google Ads Agency for Small Business",
      href: "/services/google-ads-agency-for-small-business",
    },
    {
      name: "SEO for Small Business",
      href: "/services/seo-for-small-business",
    },
    {
      name: "Custom Software for Small Business",
      href: "/services/custom-software-for-small-business",
    },
    {
      name: "Managed IT Services for Small Business",
      href: "/services/managed-it-services-for-small-business",
    },
  ];

  return (
    <footer className="bg-charcoal text-white py-12 xl:py-16 relative z-50">
      <div className="container mx-auto px-6 xl:px-12">
        <div className="flex flex-col lg:flex-row lg:justify-between gap-12 lg:gap-16 xl:gap-32">
          {/* About Section */}
          <div className="flex-[1.2]">
            <h3 className="text-xl font-bold mb-4">About Bunker Digital</h3>
            <p className="text-white/80 text-sm leading-relaxed mb-6">
              BunkerDigital.co.uk is an independent web design and digital
              marketing agency, based in Stockport and proudly serving small and
              local businesses across the UK.
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-white/80 mt-0.5 flex-shrink-0" />
                <a
                  href="tel:01613838568"
                  className="text-white/80 hover:text-white transition-colors text-sm"
                >
                  0161 383 8568
                </a>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-white/80 mt-0.5 flex-shrink-0" />
                <a
                  href="mailto:info@bunkerdigital.co.uk"
                  className="text-white/80 hover:text-white transition-colors text-sm"
                >
                  info@bunkerdigital.co.uk
                </a>
              </div>
              <div className="flex items-start gap-3">
                <MessageSquare className="w-5 h-5 text-white/80 mt-0.5 flex-shrink-0" />
                <Link
                  href="https://wa.me/447935157365"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-white transition-colors text-sm"
                >
                  +44 7935 157365
                </Link>
              </div>
            </div>
          </div>

          {/* Services Section */}
          <div className="flex-[1.2]">
            <h3 className="text-xl font-bold mb-4">Services</h3>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service.href}>
                  <Link
                    href={service.href}
                    className="text-white/80 hover:text-white transition-colors text-sm"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Site Links Section */}
          <div className="flex-[0.8]">
            <h3 className="text-xl font-bold mb-4">Site Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/discuss-project"
                  className="text-white/80 hover:text-white transition-colors text-sm"
                >
                  Discuss Project
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-white/80 hover:text-white transition-colors text-sm"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  href="/case-studies"
                  className="text-white/80 hover:text-white transition-colors text-sm"
                >
                  Case Studies
                </Link>
              </li>
              <li>
                <Link
                  href="/insights"
                  className="text-white/80 hover:text-white transition-colors text-sm"
                >
                  Insights
                </Link>
              </li>
            </ul>
          </div>

          {/* Information Section */}
          <div className="flex-[0.8]">
            <h3 className="text-xl font-bold mb-4">Information</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/work"
                  className="text-white/80 hover:text-white transition-colors text-sm"
                >
                  Portfolio of work
                </Link>
              </li>
              <li>
                <Link
                  href="/testimonials"
                  className="text-white/80 hover:text-white transition-colors text-sm"
                >
                  Testimonials
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-white/80 hover:text-white transition-colors text-sm"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/legal/privacy-policy"
                  className="text-white/80 hover:text-white transition-colors text-sm"
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-12 pt-8 border-t border-white/20">
          <p className="text-white/60 text-sm text-center">
            © {new Date().getFullYear()} Bunker Digital. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
