import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/login', '/register', '/schedule', '/forbidden'],
    },
    sitemap: 'https://grace.moscow',
  }
}
