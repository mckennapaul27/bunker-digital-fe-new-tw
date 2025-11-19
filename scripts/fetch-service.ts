import StoryblokClient from "storyblok-js-client";
import * as fs from "fs";
import * as path from "path";

// Read token from environment variable
// Make sure NEXT_PUBLIC_STORYBLOK_TOKEN is set in your environment
const storyblokToken = process.env.NEXT_PUBLIC_STORYBLOK_TOKEN || "token here";

if (!storyblokToken) {
  console.error(
    "❌ NEXT_PUBLIC_STORYBLOK_TOKEN not found in environment variables"
  );
  console.error(
    "💡 Make sure to set it: export NEXT_PUBLIC_STORYBLOK_TOKEN=your_token"
  );
  process.exit(1);
}

const storyblokClient = new StoryblokClient({
  accessToken: storyblokToken,
  cache: {
    clear: "auto",
    type: "none",
  },
});

async function fetchService() {
  const slug = "google-ads-agency-for-small-business";

  try {
    console.log(`Fetching service: ${slug}...`);

    const { data } = await storyblokClient.get(`cdn/stories/services/${slug}`, {
      version: process.env.NODE_ENV === "development" ? "draft" : "published",
      resolve_relations: "case_study_container.case_studies",
    });

    const outputPath = path.join(process.cwd(), `${slug}-data.json`);
    fs.writeFileSync(outputPath, JSON.stringify(data.story, null, 2));

    console.log(`✅ Service data written to: ${outputPath}`);
    console.log(`📄 File size: ${fs.statSync(outputPath).size} bytes`);
  } catch (error) {
    console.error("❌ Error fetching service:", error);
    process.exit(1);
  }
}

fetchService();
