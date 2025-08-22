import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

// Base CSP
const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' ${isDev ? "'unsafe-inline' 'unsafe-eval'" : ""} https://www.google.com https://www.gstatic.com;
  style-src 'self' 'unsafe-inline';
  img-src 'self' https://drive.google.com data: https://www.google.com;
  frame-src https://www.google.com;
  connect-src 'self';
  object-src 'none';
  base-uri 'self';
  form-action 'self';
`;

// Security headers
const securityHeaders = [
  {
    key: "X-Frame-Options",
    value: "DENY", // prevents clickjacking
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff", // prevents MIME-type sniffing
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin", // safer referrer policy
  },
  {
    key: "Content-Security-Policy",
    value: ContentSecurityPolicy.replace(/\s{2,}/g, " ").trim(),
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload", // enforce HTTPS
  },
];

const nextConfig: NextConfig = {
  reactStrictMode: true, // helps catch potential issues
  poweredByHeader: false, // remove "X-Powered-By: Next.js" header

  images: {
    domains: ["drive.google.com"], // only allow trusted domains
  },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;