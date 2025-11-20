import type { PaymentBlockComponent } from "@/lib/storyblok-types";
import { renderStoryblokRichText } from "@/lib/storyblok-richtext";
import SignUpSubscribe from "@/components/forms/sign-up-subscribe";

interface PaymentBlockProps {
  data: PaymentBlockComponent;
}

export default function PaymentBlock({ data }: PaymentBlockProps) {
  const amount = data.amount || "0.00";
  const currency = data.currency || "GBP";
  const currencySymbol =
    currency === "GBP" ? "£" : currency === "USD" ? "$" : "";

  console.log(data.items);

  return (
    <section className="bg-white py-20 xl:py-28">
      <div className="container mx-auto px-6 xl:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 xl:gap-16">
          {/* Left Column: What's Included */}
          <div className="bg-charcoal text-white p-8 lg:p-10 rounded-lg">
            {data.title && (
              <h2 className="text-2xl lg:text-3xl font-bold mb-4">
                {data.title}
              </h2>
            )}
            {data.description && (
              <p className="text-white/80 mb-6">{data.description}</p>
            )}
            {data.items && (
              <div className="mb-8 text-white">
                <div className="[&_ul]:!text-white [&_li]:!text-white [&_ul>li::marker]:!text-green-500 [&_ul]:list-disc [&_ul]:pl-6 [&_li]:my-2 [&_p]:!my-2">
                  {renderStoryblokRichText({
                    content: data.items,
                    className:
                      "prose-invert prose-ul:text-white prose-li:text-white prose-li:marker:text-white prose-ul:list-disc prose-ul:pl-6 prose-li:my-2",
                  }) || (
                    <div className="text-white">
                      <p>Unable to render items</p>
                    </div>
                  )}
                </div>
              </div>
            )}
            <div className="mt-8 pt-8 border-t border-white/20">
              <div className="flex items-baseline gap-2">
                <span className="text-2xl lg:text-3xl font-bold">
                  {currencySymbol}
                  {amount}
                </span>
                <span className="text-white/80">/per month</span>
              </div>
            </div>
          </div>

          {/* Right Column: Sign-up Form */}
          <div className="bg-white ">
            <h2 className="text-2xl lg:text-3xl font-bold text-charcoal mb-6">
              Create Your Account
            </h2>
            <SignUpSubscribe />
          </div>
        </div>
      </div>
    </section>
  );
}
