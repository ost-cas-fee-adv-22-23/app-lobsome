// eslint-disable-next-line @typescript-eslint/no-var-requires
const nextTranslate = require('next-translate');

/* eslint-disable @typescript-eslint/no-var-requires */
const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
});

const plugins = [];

plugins.push(withPWA, nextTranslate);

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

module.exports = () => plugins.reduce((acc, next) => next(acc), nextConfig);
