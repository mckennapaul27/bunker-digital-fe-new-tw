import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

/**
 * Enable Next.js draft mode for the Storyblok Visual Editor.
 * Preview URL:
 *   https://localhost:3010/api/preview?secret=YOUR_SECRET&slug=
 * Storyblok appends the story slug. The home story redirects to /.
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  const expected = process.env.STORYBLOK_PREVIEW_SECRET;

  if (!expected || secret !== expected) {
    return new Response("Invalid token", { status: 401 });
  }

  const draft = await draftMode();
  draft.enable();

  const slug = searchParams.get("slug")?.split("?")[0] ?? "";
  const path = slug.replace(/^\/+|\/+$/g, "");

  if (!path || path === "home") {
    redirect("/");
  }

  redirect(`/${path}`);
}
