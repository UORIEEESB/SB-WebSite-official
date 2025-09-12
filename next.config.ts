import type { NextConfig } from "next";

const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.google.com https://www.gstatic.com;
  style-src 'self' 'unsafe-inline';
  img-src 'self' https://drive.google.com data: https://www.google.com;
  frame-src https://www.google.com;
  connect-src 'self';
  object-src 'none';
  base-uri 'self';
  form-action 'self';
`;

const securityHeaders = [
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Content-Security-Policy", value: ContentSecurityPolicy.replace(/\s{2,}/g, " ").trim() },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
];

// List of branches you want accessible via subpaths
const branches = ["ras", "comsoc", "cs", "pes", "ias"];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  images: {
    domains: ["drive.google.com"],
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },

  async rewrites() {
    const branchRewrites = branches.map(branch => ({
      source: `/${branch}/:path*`,
      destination: `https://${branch}-ieee-main-new-bry3.vercel.app/:path*`,
    }));

    return branchRewrites;
  },
};

export default nextConfig;
