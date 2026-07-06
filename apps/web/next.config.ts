import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@sfs/shared', 'three'],
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001/api/v1',
  },
};

export default nextConfig;
