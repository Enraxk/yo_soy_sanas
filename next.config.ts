import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
