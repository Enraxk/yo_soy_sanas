import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: '/santras', destination: '/#santras', permanent: true },
      { source: '/arte-ritual', destination: '/#arte-ritual', permanent: true },
      { source: '/chakras/:path*', destination: '/#santras', permanent: true },
      { source: '/galeria', destination: '/', permanent: true },
      { source: '/maderas', destination: '/#arte-ritual', permanent: true },
    ];
  },
  // Optimize build performance
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
  },
  
  // Ensure proper image handling
  images: {
    remotePatterns: [],
    unoptimized: false,
    formats: ['image/webp', 'image/avif'],
  },
  
  // TypeScript configuration - strict checking
  typescript: {
    ignoreBuildErrors: false,
  },
  
  // ESLint configuration - strict checking
  eslint: {
    ignoreDuringBuilds: false,
  },
  
  // Compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  
  // Performance optimizations
  poweredByHeader: false,
  compress: true,
};

export default nextConfig;
