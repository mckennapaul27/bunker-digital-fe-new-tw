/**
 * Creates the home page Storyblok components and seeds the existing Home story.
 *
 * Re-running creates missing components only. It does not overwrite a Home
 * story that is already home_page_structure, so later editor changes stay put.
 *
 * Usage: node scripts/storyblok-setup-home.mjs
 */
import { readFileSync } from "node:fs";
import { randomUUID } from "node:crypto";

const SPACE_ID = "288302830974942";
const HOME_STORY_ID = "109248764886493";
const API = `https://mapi.storyblok.com/v1/spaces/${SPACE_ID}`;

function loadEnv(path) {
  const env = {};
  for (const line of readFileSync(path, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#") || !trimmed.includes("=")) continue;
    const index = trimmed.indexOf("=");
    env[trimmed.slice(0, index)] = trimmed.slice(index + 1);
  }
  return env;
}

const env = loadEnv(".env.local");
const token = env.STORYBLOK_PERSONAL_TOKEN;
if (!token) {
  console.error("STORYBLOK_PERSONAL_TOKEN is missing from .env.local");
  process.exit(1);
}

const headers = {
  Authorization: token,
  "Content-Type": "application/json",
};

function uid() {
  return randomUUID();
}

function blok(component, fields = {}) {
  return { _uid: uid(), component, ...fields };
}

function text(pos) {
  return { type: "text", pos };
}

function textarea(pos) {
  return { type: "textarea", pos };
}

function asset(pos, extra = {}) {
  return { type: "asset", pos, filetypes: ["images"], ...extra };
}

function bloks(pos, whitelist, extra = {}) {
  return {
    type: "bloks",
    pos,
    restrict_type: "",
    restrict_components: true,
    component_whitelist: whitelist,
    ...extra,
  };
}

const components = [
  {
    name: "how_we_help_item",
    display_name: "How we help item",
    is_root: false,
    is_nestable: true,
    schema: {
      title: text(0),
      description: textarea(1),
      href: text(2),
    },
  },
  {
    name: "how_we_help",
    display_name: "How we help",
    is_root: false,
    is_nestable: true,
    schema: {
      eyebrow: text(0),
      heading: textarea(1),
      items: bloks(2, ["how_we_help_item"]),
    },
  },
  {
    name: "home_service_bullet",
    display_name: "Home service bullet",
    is_root: false,
    is_nestable: true,
    schema: {
      text: textarea(0),
    },
  },
  {
    name: "home_service_card",
    display_name: "Home service card",
    is_root: false,
    is_nestable: true,
    schema: {
      title: text(0),
      icon_code: text(1),
      href: text(2),
      cta_text: text(3),
      bullets: bloks(4, ["home_service_bullet"]),
    },
  },
  {
    name: "home_services_grid",
    display_name: "Home services grid",
    is_root: false,
    is_nestable: true,
    schema: {
      eyebrow: text(0),
      heading: textarea(1),
      items: bloks(2, ["home_service_card"]),
    },
  },
  {
    name: "home_hero",
    display_name: "Home hero",
    is_root: false,
    is_nestable: true,
    schema: {
      eyebrow: text(0),
      heading: textarea(1),
      body: textarea(2),
      cta_text: text(3),
      cta_link: text(4),
      background_image: asset(5),
    },
  },
  {
    name: "featured_case_studies",
    display_name: "Featured case studies",
    is_root: false,
    is_nestable: true,
    schema: {},
  },
  {
    name: "home_page_structure",
    display_name: "Home page structure",
    is_root: true,
    is_nestable: false,
    schema: {
      meta_data: bloks(0, ["meta_data"], { maximum: 1 }),
      blocks: bloks(1, [
        "home_hero",
        "how_we_help",
        "featured_case_studies",
        "before_after_container",
        "home_services_grid",
        "testimonial_container",
        "cta",
        "faq_container",
      ]),
    },
  },
];

async function api(path, options = {}) {
  const response = await fetch(`${API}${path}`, {
    ...options,
    headers: { ...headers, ...(options.headers || {}) },
  });
  const bodyText = await response.text();
  let body = {};
  if (bodyText) {
    try {
      body = JSON.parse(bodyText);
    } catch {
      body = { raw: bodyText.slice(0, 500) };
    }
  }
  if (!response.ok) {
    const error = new Error(`${options.method || "GET"} ${path} failed (${response.status})`);
    error.details = body;
    throw error;
  }
  return body;
}

function bullets(lines) {
  return lines.map((line) => blok("home_service_bullet", { text: line }));
}

function serviceCard({ title, icon_code, href, cta_text, lines }) {
  return blok("home_service_card", {
    title,
    icon_code,
    href,
    cta_text,
    bullets: bullets(lines),
  });
}

function assetField(asset, alt) {
  const filename = asset.filename?.startsWith("http")
    ? asset.filename
    : asset.pretty_url || asset.filename;
  return {
    id: asset.id,
    alt: alt || asset.alt || "",
    name: asset.short_filename || asset.name || "",
    focus: asset.focus || "",
    title: asset.title || "",
    source: "",
    filename,
    copyright: "",
    fieldtype: "asset",
    meta_data: {},
    is_external_url: false,
  };
}

async function existingComponentNames() {
  const data = await api("/components/?per_page=100");
  return new Set((data.components || []).map((component) => component.name));
}

async function findAsset(search) {
  const data = await api(
    `/assets/?search=${encodeURIComponent(search)}&per_page=25`
  );
  const assets = data.assets || [];
  return (
    assets.find((asset) =>
      `${asset.short_filename || ""} ${asset.filename || ""}`
        .toLowerCase()
        .includes(search.toLowerCase())
    ) ||
    assets[0] ||
    null
  );
}

async function uploadHero() {
  const existing = await findAsset("home_hero.png");
  if (existing?.id) {
    console.log("Reusing hero asset", existing.id);
    return existing;
  }

  const file = readFileSync("public/home_hero.png");
  const init = await api("/assets/", {
    method: "POST",
    body: JSON.stringify({
      filename: "home_hero.png",
      size: file.length,
    }),
  });

  const form = new FormData();
  for (const [key, value] of Object.entries(init.fields || {})) {
    form.append(key, value);
  }
  form.append("file", new Blob([file], { type: "image/png" }), "home_hero.png");

  const upload = await fetch(init.post_url, { method: "POST", body: form });
  if (!upload.ok) {
    const text = await upload.text();
    throw new Error(`Hero upload failed (${upload.status}): ${text.slice(0, 300)}`);
  }

  const confirmed = await api(`/assets/${init.id}`);
  const asset = confirmed.asset || confirmed;
  if (init.pretty_url && !String(asset.filename || "").startsWith("http")) {
    asset.pretty_url = init.pretty_url;
  }
  console.log("Uploaded hero asset", asset.id);
  return asset;
}

function homeContent(heroAsset, ogAsset) {
  return {
    _uid: uid(),
    component: "home_page_structure",
    meta_data: [
      blok("meta_data", {
        title:
          "Bunker Digital - Modern Websites & Digital Marketing for Small Businesses",
        description:
          "Whether you need a complete website redesign, better Google Ads results, or ongoing digital management, Bunker Digital helps you turn clicks into customers.",
        ...(ogAsset
          ? {
              og_image: assetField(
                ogAsset,
                "Bunker Digital - Modern Websites & Digital Marketing for Small Businesses"
              ),
            }
          : {}),
      }),
    ],
    blocks: [
      blok("home_hero", {
        eyebrow: "Transform Your Business",
        heading:
          "We build high quality custom websites that turn clicks into customers.",
        body: "From website design to Google Ads and SEO, we help small and service-based companies attract more customers and look more professional online.",
        cta_text: "BOOK A STRATEGY CALL",
        cta_link: "/contact",
        ...(heroAsset
          ? { background_image: assetField(heroAsset, "Hero background") }
          : {}),
      }),
      blok("how_we_help", {
        eyebrow: "How we can help",
        heading:
          "Our approach is simple: design, ads, and SEO that work together to generate real enquiries and growth. Clear goals, transparent results, and lasting impact.",
        items: [
          blok("how_we_help_item", {
            title: "Custom websites",
            description: "Built for enquiries, not just decoration",
            href: "/services/affordable-web-design-for-small-business",
          }),
          blok("how_we_help_item", {
            title: "Website Maintenance",
            description: "Fast hosting + support local businesses trust",
            href: "/services/website-management-and-maintenance/",
          }),
          blok("how_we_help_item", {
            title: "Paid Ads",
            description: "Ads campaigns built for local services",
            href: "/services/google-ads-agency-for-small-business",
          }),
          blok("how_we_help_item", {
            title: "Local Growth Tools",
            description: "SEO, automations, performance insights",
            href: "/services/seo-for-small-business",
          }),
        ],
      }),
      blok("featured_case_studies"),
      blok("before_after_container"),
      blok("home_services_grid", {
        eyebrow: "Our services",
        heading:
          "Complete digital services designed to help local businesses & organisations succeed and thrive",
        items: [
          serviceCard({
            title: "Custom Websites",
            icon_code: "Globe",
            href: "/services/affordable-web-design-for-small-business",
            cta_text: "Learn More",
            lines: [
              "Transform your outdated or uninspiring website into something you're proud to share.",
              "Bespoke sites for new businesses and startups.",
              "Fast, secure, and built for performance, guaranteed 90+ PageSpeed scores.",
              "Powered by modern, reliable technology for complete peace of mind.",
            ],
          }),
          serviceCard({
            title: "Website Management",
            icon_code: "Settings",
            href: "/services/website-management-and-maintenance",
            cta_text: "Learn More",
            lines: [
              "Continuous monitoring for updates, security, and performance.",
              "Stress-free hosting, plugin updates, and maintenance.",
              "On-demand support for website content and structural changes.",
              "Keep your site running smoothly with an expert always on hand.",
            ],
          }),
          serviceCard({
            title: "Paid Ads",
            icon_code: "TrendingUp",
            href: "/services/google-ads-agency-for-small-business",
            cta_text: "Learn More",
            lines: [
              "Expert setup and management of Google and Microsoft Ads.",
              "Campaigns optimised for conversions, not clicks.",
              "Transparent performance reporting and data-driven improvements.",
              "Proven success across a range of industries.",
            ],
          }),
          serviceCard({
            title: "Local Growth Tools",
            icon_code: "Target",
            href: "/services/seo-for-small-business",
            cta_text: "Learn More",
            lines: [
              "Local SEO strategies tailored for small businesses.",
              "Google Business Profile & Bing Places setup and optimisation.",
              "Citation building and local directory optimisation.",
              "Smart automations to boost efficiency and save time.",
              "Google Analytics and Tag Manager configuration for accurate tracking.",
            ],
          }),
          serviceCard({
            title: "Custom Software",
            icon_code: "Code",
            href: "/services/custom-software-for-small-business",
            cta_text: "Learn More",
            lines: [
              "Custom software development to streamline your business processes.",
              "Bespoke tools to simplify daily operations and reduce admin.",
              "Automate repetitive tasks and streamline your business processes.",
              "Save time and money with systems built around your workflow.",
            ],
          }),
          serviceCard({
            title: "Managed IT Services",
            icon_code: "Server",
            href: "/services/managed-it-services-for-small-business",
            cta_text: "Learn More",
            lines: [
              "Microsoft 365 and Google Workspace setup and management.",
              "Professional domain and email configuration.",
              "Ongoing IT support and management for small teams.",
              "Secure, reliable systems that keep your business running smoothly.",
            ],
          }),
        ],
      }),
      blok("testimonial_container", {
        heading: "Client Testimonials",
        subheading:
          "We have a 5 star reputation on Bark and Google with over 30+ verified hires on Bark",
      }),
      blok("cta", {
        title: "Your website should work harder. Let's make it happen.",
        description:
          "Whether you need a complete website redesign, better Google Ads results, or ongoing digital management, Bunker Digital helps you turn clicks into customers. Book a free strategy call and let's plan your next step.",
        link_text: "Book a Strategy Call",
        href: "/contact",
        secondary_link_text: "View Recent Projects",
        secondary_href: "/work",
      }),
      blok("faq_container", {
        heading: "Common questions about our services",
        subheading: "If you have any questions, please don't hesitate to contact us.",
        questions: [
          [
            "What types of businesses do you work with?",
            "We work primarily with small and service-based businesses, including trades, clinics, and professional services, helping them grow through modern websites and digital marketing.",
          ],
          [
            "Can you update or redesign our existing website?",
            "Yes. We can refresh your current website or rebuild it entirely to improve performance, SEO, and user experience.",
          ],
          [
            "Do you manage everything after launch?",
            "Yes. We offer full website management, hosting, and ongoing support so you can focus on running your business while we handle maintenance and updates.",
          ],
          [
            "Can you improve our existing Google Ads performance?",
            "Absolutely. We regularly take over underperforming accounts, restructure campaigns, and optimise targeting and tracking to deliver better results.",
          ],
          [
            "What makes Bunker Digital different from other agencies?",
            "We focus on clarity, performance, and measurable outcomes. Every website and campaign we create is designed to generate real enquiries, not vanity metrics.",
          ],
          [
            "How soon can we get started?",
            "Most projects begin within one to two weeks of confirmation. You'll receive a clear timeline and progress updates throughout the process.",
          ],
        ].map(([question, answer]) => blok("faq_item", { question, answer })),
      }),
    ],
  };
}

async function main() {
  const names = await existingComponentNames();
  for (const component of components) {
    if (names.has(component.name)) {
      console.log("Exists", component.name);
      continue;
    }
    await new Promise((resolve) => setTimeout(resolve, 400));
    await api("/components/", {
      method: "POST",
      body: JSON.stringify({ component }),
    });
    console.log("Created", component.name);
  }

  const storyResponse = await api(`/stories/${HOME_STORY_ID}`);
  const story = storyResponse.story;
  console.log("Home story", story.full_slug, story.content?.component);

  if (story.content?.component === "home_page_structure") {
    console.log("Home story already uses home_page_structure. Left content unchanged.");
    return;
  }

  const heroAsset = await uploadHero();
  const ogAsset = await findAsset("webdesign-og");
  console.log("OG asset", ogAsset?.id || "not found");

  const heroField = heroAsset ? assetField(heroAsset, "Hero background") : null;
  const ogField = ogAsset ? assetField(ogAsset, "") : null;
  if (heroField && !String(heroField.filename || "").startsWith("http") && !String(heroField.filename || "").startsWith("//")) {
    throw new Error(`Hero asset filename is not a URL: ${heroField.filename}`);
  }
  if (ogField && !String(ogField.filename || "").startsWith("http") && !String(ogField.filename || "").startsWith("//")) {
    console.log("OG asset has no CDN filename. Metadata will use the existing fallback image.");
    ogAsset.filename = "";
  }

  const content = homeContent(
    heroField?.filename ? heroAsset : null,
    ogField?.filename ? ogAsset : null
  );

  await api(`/stories/${HOME_STORY_ID}`, {
    method: "PUT",
    body: JSON.stringify({
      story: {
        name: story.name,
        slug: story.slug,
        content,
      },
      publish: 1,
    }),
  });
  console.log("Updated and published Home story", content.blocks.map((block) => block.component).join(" → "));
}

main().catch((error) => {
  console.error(error.message);
  if (error.details) console.error(JSON.stringify(error.details, null, 2).slice(0, 2000));
  process.exit(1);
});
