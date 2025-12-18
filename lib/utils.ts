import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Returns true when `href` looks like a real navigation target.
 * We treat empty strings, "#" and javascript: URLs as invalid.
 */
export function isValidHref(href: unknown): href is string {
  if (typeof href !== "string") return false;
  const v = href.trim();
  if (!v) return false;
  if (v === "#") return false;
  if (v.toLowerCase().startsWith("javascript:")) return false;
  return true;
}

/**
 * Dev-only warning to find CMS/back-end link issues fast.
 */
export function warnInvalidHref(params: {
  href: unknown;
  context: string;
  extra?: Record<string, unknown>;
}) {
  if (process.env.NODE_ENV === "production") return;
  if (isValidHref(params.href)) return;
  // eslint-disable-next-line no-console
  console.warn(`[link-debug] Invalid href`, {
    href: params.href,
    context: params.context,
    ...(params.extra || {}),
  });
}
