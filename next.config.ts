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
    ];
  },
};

export default nextConfig;
