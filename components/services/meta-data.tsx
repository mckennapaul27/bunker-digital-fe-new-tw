import type { ServiceMetaDataComponent } from "@/lib/storyblok-types";

interface MetaDataProps {
  data: ServiceMetaDataComponent;
}

export default function MetaData({ data }: MetaDataProps) {
  // This is just a placeholder - metadata is handled in generateMetadata
  return null;
}
