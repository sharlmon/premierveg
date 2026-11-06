export default defineEventHandler((event) => {
  const base = String(useRuntimeConfig(event).public.siteUrl).replace(/\/$/, '')
  const day = new Date().toISOString().slice(0, 10)
  const paths = ['/', '/products/', '/packages/', '/about/', '/team/', '/contact/']
  setHeader(event, 'content-type', 'application/xml; charset=utf-8')
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${paths.map((p) => `  <url><loc>${base}${p}</loc><lastmod>${day}</lastmod><changefreq>monthly</changefreq><priority>${p === '/' ? '1.0' : '0.7'}</priority></url>`).join('\n')}\n</urlset>\n`
})
