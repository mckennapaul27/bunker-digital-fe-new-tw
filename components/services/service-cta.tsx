import type { ServiceCTAComponent } from "@/lib/storyblok-types";
import CTA from "@/components/sections/cta";

interface ServiceCTAProps {
  data: ServiceCTAComponent;
}

export default function ServiceCTA({ data }: ServiceCTAProps) {
  return (
    <CTA
      title={data.title || ""}
      description={data.description}
      primaryLinkText={data.link_text || ""}
      primaryHref={data.href || "#"}
      secondaryLinkText={data.secondary_link_text}
      secondaryHref={data.secondary_href}
    />
  );
}
