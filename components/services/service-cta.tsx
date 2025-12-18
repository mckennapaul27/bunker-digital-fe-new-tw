import type { ServiceCTAComponent } from "@/lib/storyblok-types";
import CTA from "@/components/sections/cta";
import { warnInvalidHref } from "@/lib/utils";

interface ServiceCTAProps {
  data: ServiceCTAComponent;
}

export default function ServiceCTA({ data }: ServiceCTAProps) {
  warnInvalidHref({
    href: data.href,
    context: "components/services/service-cta.tsx data.href",
    extra: { uid: data._uid, link_text: data.link_text, title: data.title },
  });
  if (data.secondary_link_text) {
    warnInvalidHref({
      href: data.secondary_href,
      context: "components/services/service-cta.tsx data.secondary_href",
      extra: {
        uid: data._uid,
        secondary_link_text: data.secondary_link_text,
        title: data.title,
      },
    });
  }

  return (
    <CTA
      title={data.title || "Contact Us"}
      description={data.description}
      primaryLinkText={data.link_text || "Contact Us"}
      primaryHref={data.href || "/contact"}
      secondaryLinkText={data.secondary_link_text}
      secondaryHref={data.secondary_href}
    />
  );
}
