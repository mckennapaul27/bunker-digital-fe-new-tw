import type { TestimonialContainerComponent } from "@/lib/storyblok-types";
import Testimonials from "@/components/testimonials/testimonials";

interface TestimonialContainerProps {
  data: TestimonialContainerComponent;
}

export default function TestimonialContainer({
  data,
}: TestimonialContainerProps) {
  return <Testimonials heading={data.heading} subheading={data.subheading} />;
}
