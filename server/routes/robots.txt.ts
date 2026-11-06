export default defineEventHandler((event) => {
  const base = String(useRuntimeConfig(event).public.siteUrl).replace(/\/$/, '')
  setHeader(event, 'content-type', 'text/plain; charset=utf-8')
  // Search and AI answer engines are welcome; the private business-card page is kept out of results.
  const bots = ['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-SearchBot', 'PerplexityBot', 'Google-Extended', 'Applebot-Extended', 'CCBot']
  return `User-agent: *\nAllow: /\nDisallow: /card/\n\n${bots.map((b) => `User-agent: ${b}\nAllow: /\nDisallow: /card/\n`).join('\n')}\nSitemap: ${base}/sitemap.xml\n`
})
