import { MetadataRoute } from 'next';
import { siteConfig } from '@/src/config/site';
import { taxiPackages } from '@/src/data/packages';
import { outstationRoutes, popularRoutes } from '@/src/data/routes';
import { delhiRoutes } from '@/src/data/delhiRoutes';
import { cabServiceLocalities, taxiServiceLocalities } from '@/src/data/localities';
import { blogs } from '@/src/data/blogs';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;
  
  const staticPages = [
    '',
    '/about-us',
    '/contact-us',
    '/taxi',
    '/taxi-package',
    '/blogs',
    '/popular-routes',
    '/9-seater-tempo-traveller-in-delhi',
    '/12-seater-tempo-traveller-in-delhi',
    '/16-seater-tempo-traveller-in-delhi',
    '/20-seater-tempo-traveller-in-delhi',
    '/22-seater-tempo-traveller-in-delhi',
    '/26-seater-tempo-traveller-in-delhi',
    '/bus-rental-in-delhi',
    '/tempo-traveller-on-rent-in-delhi',
    '/privacy-policy',
    '/terms-conditions',
    '/delhi-jaipur-same-day-tour',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }));

  const packagePages = taxiPackages.map((pkg) => ({
    url: `${baseUrl}/taxi-package/${pkg.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  const outstationPages = outstationRoutes.map((route) => ({
    url: `${baseUrl}/taxi/${route.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  const popularRoutePages = popularRoutes.map((route) => ({
    url: `${baseUrl}/popular-routes/${route.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));
  
  const cabLocalityPages = cabServiceLocalities.map((loc) => ({
    url: `${baseUrl}/cab-service-in-${loc.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  const taxiLocalityPages = taxiServiceLocalities.map((loc) => ({
    url: `${baseUrl}/taxi-service-in-${loc.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  const blogPages = blogs.map((blog) => ({
    url: `${baseUrl}/blog/${blog.slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  const delhiRoutePages = delhiRoutes.map((route) => ({
    url: `${baseUrl}/delhi-to-${route.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [
    ...staticPages,
    ...packagePages,
    ...outstationPages,
    ...popularRoutePages,
    ...cabLocalityPages,
    ...taxiLocalityPages,
    ...blogPages,
    ...delhiRoutePages,
  ];
}