import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', // Generate static HTML in 'out' folder
  trailingSlash: true, // Generate index.html for each route (fixes 404 on refresh)
  images: {
    unoptimized: true, // Required for static export to work with images
  },
};

export default nextConfig;
