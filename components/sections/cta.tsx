import Link from "next/link";
import { Button } from "@/components/ui/button";

interface CTAProps {
  title: string;
  description?: string;
  linkText: string;
  href: string;
  className?: string;
}

export default function CTA({
  title,
  description,
  linkText,
  href,
  className = "",
}: CTAProps) {
  return (
    <section
      className={`bg-[var(--color-primary)] py-16 ${className} relative z-50`}
    >
      <div className="container mx-auto px-6 xl:px-12">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight text-charcoal mb-4 lg:mb-6">
            {title}
          </h2>
          {description && (
            <p className="text-lg lg:text-xl text-charcoal mb-8 lg:mb-10">
              {description}
            </p>
          )}
          <Button
            asChild
            size="lg"
            className="border-charcoal border-2 hover:bg-charcoal hover:text-white"
          >
            <Link href={href}>{linkText}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
