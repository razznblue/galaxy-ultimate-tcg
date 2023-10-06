/** @type {import('next').NextConfig} */
const production = process.env.NODE_ENV === 'production';
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Allow access to any domain
      },
    ],
  }
}

const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
  disable: production ? false : true
});

module.exports = withPWA(nextConfig);
