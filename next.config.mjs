/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';

const nextConfig = {
  output: isProd ? 'export' : undefined,
  images: {
    unoptimized: true,
  },
  async rewrites() {
    if (isProd) return [];
    return [
      {
        source: '/api/:path*.php',
        destination: 'http://localhost:8000/api/:path*.php',
      },
      {
        source: '/uploads/:path*',
        destination: 'http://localhost:8000/uploads/:path*',
      },
    ];
  },
};

export default nextConfig;