// eslint-disable-next-line @typescript-eslint/no-var-requires
const nextTranslate = require('next-translate');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'storage.googleapis.com',
        pathname: '/qwacker-api-prod-data/**',
      },
    ],
  },
};

module.exports = nextTranslate({ ...nextConfig });
