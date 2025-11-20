import type { StoryblokComponent } from "@/lib/storyblok-types";
import type {
  PaymentHeaderComponent,
  PaymentBlockComponent,
} from "@/lib/storyblok-types";
import Header from "@/components/services/header";
import PaymentBlock from "./payment-block";

interface PaymentSectionRendererProps {
  sections: StoryblokComponent[];
}

export default function PaymentSectionRenderer({
  sections,
}: PaymentSectionRendererProps) {
  return (
    <>
      {sections.map((section) => {
        switch (section.component) {
          case "header":
            // Map payment header to hero service format for the existing component
            // Always use default background image for payment pages
            const headerData = section as PaymentHeaderComponent;
            const defaultBackgroundImage =
              "https://a.storyblok.com/f/288302830974942/1536x1024/6f473bf171/bunker-digital-office.png";
            return (
              <Header
                key={section._uid}
                data={
                  {
                    ...headerData,
                    component: "hero_service",
                    headline: headerData.title || "",
                    background_image: {
                      filename: defaultBackgroundImage,
                      alt: "Hero background",
                      id: 0,
                      name: "",
                      focus: "",
                      title: "",
                      source: "",
                      copyright: "",
                      fieldtype: "asset",
                      meta_data: {},
                      is_external_url: false,
                    },
                  } as any
                }
              />
            );
          case "payment_block":
            return (
              <PaymentBlock
                key={section._uid}
                data={section as PaymentBlockComponent}
              />
            );
          default:
            console.warn(
              `Unknown payment section component: ${section.component}`
            );
            return null;
        }
      })}
    </>
  );
}
