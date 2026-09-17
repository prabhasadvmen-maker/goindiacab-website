import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    qualities: [75, 90],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.goindiacab.com',
      },
    ],
  },
  onDemandEntries: {
    maxInactiveAge: 60 * 1000,
    pagesBufferLength: 5,
  },
  async rewrites() {
    return [
      { source: '/car-rental-in-:slug', destination: '/services/car-rental/:slug' },
      { source: '/:slug-taxi-service', destination: '/services/taxi-service-city/:slug' },
      { source: '/airport-taxi-in-:slug', destination: '/services/airport-taxi/:slug' },
      { source: '/tempo-traveller-in-:slug', destination: '/services/tempo-traveller/:slug' },
      { source: '/minibus-for-rent-in-:slug', destination: '/services/minibus-rent/:slug' },
      { source: '/minibus-for-hire-in-:slug', destination: '/services/minibus-hire/:slug' },
      { source: '/mini-bus-in-:slug', destination: '/services/mini-bus/:slug' },
      { source: '/cab-service-in-:slug', destination: '/services/cab-service/:slug' },
      { source: '/taxi-service-in-:slug', destination: '/services/taxi-service/:slug' },
      { source: '/delhi-to-:slug', destination: '/services/delhi-to/:slug' },
    ];
  },
};

export default nextConfig;
