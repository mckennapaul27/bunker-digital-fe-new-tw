import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface CTAProps {
  title: string;
  description?: string;
  primaryLinkText: string;
  primaryHref: string;
  secondaryLinkText?: string;
  secondaryHref?: string;
  className?: string;
}

export default function CTA({
  title,
  description,
  primaryLinkText,
  primaryHref,
  secondaryLinkText,
  secondaryHref,
  className = "",
}: CTAProps) {
  return (
    <section
      className={`bg-[var(--color-primary)] py-16 ${className} relative z-50`}
    >
      <div className="container mx-auto px-6 xl:px-12">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-bold leading-tight text-charcoal mb-4 lg:mb-6">
            {title}
          </h2>
          {description && (
            <p className="text-lg lg:text-xl text-charcoal mb-8 lg:mb-10">
              {description}
            </p>
          )}
          <div className="flex flex-col items-center gap-4">
            <Button asChild size="lg" variant="charcoal-outline" className="">
              <Link href={primaryHref}>{primaryLinkText}</Link>
            </Button>
            {secondaryLinkText && secondaryHref && (
              <Link
                href={secondaryHref}
                className="text-charcoal font-body font-semibold hover:underline inline-flex items-center gap-2"
              >
                {secondaryLinkText}
                <ArrowRight className="w-4 h-4" />
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
