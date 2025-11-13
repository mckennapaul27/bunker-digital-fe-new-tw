import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function TrustBar() {
  return (
    <section className="bg-[var(--color-charcoal)] py-16">
      <div className="container mx-auto px-6 xl:px-12 md:flex md:items-start md:justify-between">
        <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-12 mb-8">
          {/* Google Rating */}
          <div className="flex flex-col gap-3">
            <div className="h-auto lg:h-8 flex items-start">
              <a
                href="https://share.google/hX5oMeXYfwTH0eK2r"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
              >
                <Image
                  src="/google-logo.svg"
                  alt="Google"
                  width={67}
                  height={24}
                  className="h-auto lg:h-8 lg:w-auto"
                />
              </a>
            </div>
            <Image
              src="/5-stars.svg"
              alt="5 stars"
              width={88}
              height={15}
              className="h-auto"
            />
            <p className="text-white text-sm lg:text-base font-bold whitespace-nowrap">
              Rated 5.0 on Google
            </p>
          </div>

          {/* Bark Rating */}
          <div className="flex flex-col gap-3">
            <div className="h-auto lg:h-8 flex items-start">
              <a
                href="https://www.bark.com/en/gb/b/bunkerdigital/Xo0AX/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block"
              >
                <Image
                  src="/bark-logo.svg"
                  alt="Bark"
                  width={56}
                  height={24}
                  className="h-auto lg:h-8 lg:w-auto"
                />
              </a>
            </div>
            <Image
              src="/5-stars.svg"
              alt="5 stars"
              width={88}
              height={15}
              className="h-auto"
            />
            <p className="text-white text-sm lg:text-base font-bold whitespace-nowrap">
              20+ verified Bark hires
            </p>
          </div>
        </div>
        <div>
          {/* Testimonial */}
          <div className="flex flex-col gap-3 max-w-md xl:max-w-2xl mb-6">
            <p className="text-white text-sm md:text-base lg:text-lg italic max-w-[400px] lg:max-w-none">
              &quot;I would definitely recommend others to use Bunker Digital
              and we will certainly be continuing to work with them in the
              future.&quot;
            </p>
            <div>
              <p className="text-white text-sm lg:text-base font-bold">
                Jordan
              </p>
              <p className="text-white/80 text-sm lg:text-base">
                Unearthed.land
              </p>
            </div>
          </div>
          <Link
            href="/testimonials"
            className="text-[var(--color-primary)] font-body font-semibold hover:underline inline-flex items-center gap-2"
          >
            Read more testimonials
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
