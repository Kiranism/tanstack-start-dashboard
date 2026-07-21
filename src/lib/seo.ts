import { siteConfig } from '@/config/site';

export interface SeoArgs {
  /** Page title. Falls back to the site name. */
  title?: string;
  /** Meta description. Falls back to the site description. */
  description?: string;
  /** Comma-separated keywords. Falls back to the site keywords. */
  keywords?: string;
  /** Share image — an absolute URL or a path relative to the site root. */
  image?: string;
  /** Path of the current page (e.g. `/about`) — used for og:url. */
  path?: string;
  /** Emit `noindex, nofollow` for private/app pages (e.g. the dashboard). */
  noindex?: boolean;
}

/** Resolve a path or URL to an absolute URL against the configured site origin. */
function absoluteUrl(pathOrUrl: string) {
  if (!pathOrUrl) return siteConfig.url;
  if (pathOrUrl.startsWith('http')) return pathOrUrl;
  return `${siteConfig.url}${pathOrUrl.startsWith('/') ? '' : '/'}${pathOrUrl}`;
}

/**
 * Build a meta-tag array for TanStack Router's `head` option, covering the
 * standard SEO + Open Graph + Twitter Card tags.
 *
 * Usage in a route:
 *   head: () => ({ meta: seo({ title: 'Products', path: '/dashboard/product' }) })
 */
export function seo({ title, description, keywords, image, path, noindex }: SeoArgs = {}) {
  const metaTitle = title ?? siteConfig.name;
  const metaDescription = description ?? siteConfig.description;
  const metaKeywords = keywords ?? siteConfig.keywords.join(', ');
  const metaImage = absoluteUrl(image ?? siteConfig.ogImage);
  const metaUrl = absoluteUrl(path ?? '/');

  return [
    { title: metaTitle },
    { name: 'description', content: metaDescription },
    { name: 'keywords', content: metaKeywords },

    // Open Graph
    { property: 'og:type', content: 'website' },
    { property: 'og:site_name', content: siteConfig.name },
    { property: 'og:title', content: metaTitle },
    { property: 'og:description', content: metaDescription },
    { property: 'og:image', content: metaImage },
    { property: 'og:url', content: metaUrl },

    // Twitter
    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:title', content: metaTitle },
    { name: 'twitter:description', content: metaDescription },
    { name: 'twitter:image', content: metaImage },

    // Only emit robots when hiding a page — absence means indexable.
    ...(noindex ? [{ name: 'robots', content: 'noindex, nofollow' }] : [])
  ];
}
