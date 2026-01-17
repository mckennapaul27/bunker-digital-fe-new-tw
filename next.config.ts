import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "a.storyblok.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/affordable-web-design-for-small-business",
        destination: "/services/affordable-web-design-for-small-business",
        permanent: true,
      },
      {
        source: "/ai-agency-services",
        destination: "/services/ai-agency-services",
        permanent: true,
      },
      {
        source: "/ai-developer",
        destination: "/services/ai-agency-services",
        permanent: true,
      },
      {
        source: "/custom-software",
        destination: "/services/custom-software-for-small-business",
        permanent: true,
      },
      {
        source: "/google-ads-agency-for-small-business",
        destination: "/services/google-ads-agency-for-small-business",
        permanent: true,
      },
      {
        source: "/local-business-strategy",
        destination: "/services/seo-for-small-business",
        permanent: true,
      },
      {
        source: "/seo-for-small-business",
        destination: "/services/seo-for-small-business",
        permanent: true,
      },
      {
        source: "/web-development",
        destination: "/services/affordable-web-design-for-small-business",
        permanent: true,
      },
      {
        source: "/webdesign-and-seo-paid-ads-management",
        destination: "/services/webdesign-and-seo-paid-ads-management",
        permanent: true,
      },
      {
        source: "/hazel-grove/google-ads-agency",
        destination: "/hazel-grove/google-ads-management-agency",
        permanent: true,
      },
      {
        source: "/stockport/google-ads-agency",
        destination: "/stockport/google-ads-management-agency",
        permanent: true,
      },
      {
        source:
          "/case-studies/how-we-reduced-greenscapes-tree-service-cost-per-conversion-to-15.25-and-increased-leads-by-250-percent",
        destination:
          "/case-studies/how-we-reduced-greenscapes-tree-service-cost-per-conversion-to-15-25-and-increased-leads-by-250-percent",
        permanent: true,
      },
      {
        source: "/privacy-policy",
        destination: "/legal/privacy-policy",
        permanent: true,
      },
      {
        source: "/consultancy",
        destination: "/",
        permanent: true,
      },
      {
        source: "/seo",
        destination: "/services/seo-for-small-business",
        permanent: true,
      },
      {
        source: "/login",
        destination: "/auth/login",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
