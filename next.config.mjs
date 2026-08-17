/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**" }
    ]
  },
  typescript: {
    // Ignoruje błędy TypeScript podczas budowania na Vercel
    ignoreBuildErrors: true,
  },
  eslint: {
    // Ignoruje błędy Lintera podczas budowania
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
