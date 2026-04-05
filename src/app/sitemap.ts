import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

const BASE = 'https://ismycardealgood.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: BASE,                        lastModified: now, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${BASE}/loan`,              lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/lease`,             lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/compare`,           lastModified: now, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE}/affordability`,     lastModified: now, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/negotiate`,         lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/blog`,              lastModified: now, changeFrequency: 'weekly',  priority: 0.7 },
    { url: `${BASE}/about`,             lastModified: now, changeFrequency: 'yearly',  priority: 0.4 },
    { url: `${BASE}/contact`,           lastModified: now, changeFrequency: 'yearly',  priority: 0.4 },
    { url: `${BASE}/privacy`,           lastModified: now, changeFrequency: 'yearly',  priority: 0.2 },
    { url: `${BASE}/terms`,             lastModified: now, changeFrequency: 'yearly',  priority: 0.2 },
  ];
}
