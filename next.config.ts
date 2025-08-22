import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true, // helps catch potential issues
  poweredByHeader: false, // remove "X-Powered-By: Next.js" header (info leak)

  images: {
    domains: ['drive.google.com'], // only allow trusted domains
  },

  async headers() {
    return [
      {
        source: "/(.*)", // apply to all routes
        headers: [
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
            value: "strict-origin-when-cross-origin", // controls referrer info
          },
          {
            key: "Content-Security-Policy",
            value: "default-src 'self'; img-src 'self' https://drive.google.com data:; script-src 'self'; style-src 'self' 'unsafe-inline';", 
            // Adjust based on your needs
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload", 
            // Enforces HTTPS
          },
        ],
      },
    ];
  },
};

export default nextConfig;
