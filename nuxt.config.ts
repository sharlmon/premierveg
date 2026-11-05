export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  future: { compatibilityVersion: 4 },
  modules: ['@nuxtjs/tailwindcss', '@nuxt/fonts'],
  css: ['~/assets/css/main.css'],
  ssr: true,
  runtimeConfig: {
    public: {
      // Absolute site URL (used for canonical links, sitemap, social images). Change when the custom domain goes live.
      siteUrl: process.env.NUXT_PUBLIC_SITE_URL || 'https://sharlmon.github.io/premierveg',
      // Free key from web3forms.com tied to the client's inbox. Empty = form falls back to opening the visitor's email app.
      web3formsKey: process.env.NUXT_PUBLIC_WEB3FORMS_KEY || '',
      // WhatsApp number, digits only with country code. TODO: confirm with the client.
      whatsapp: process.env.NUXT_PUBLIC_WHATSAPP || '393512151931'
    }
  },
  nitro: { preset: 'github_pages', prerender: { routes: ['/', '/about', '/products', '/packages', '/team', '/contact', '/card/brenda', '/sitemap.xml', '/robots.txt'], crawlLinks: true } },
  hooks: {
    // don't quietly download lazy chunks (e.g. the 380 KB PDF library) in the background; fetch them only when used
    'build:manifest': (manifest) => { for (const k in manifest) { manifest[k].prefetch = false } }
  },
  app: {
    baseURL: process.env.NUXT_APP_BASE_URL || '/',
    head: {
      htmlAttrs: { lang: 'en' },
      title: 'Premier Veg — Fresh fruit, vegetables & herbs from Kenya',
      meta: [
        { name: 'description', content: 'Premier Veg Mondo Limited exports year-round fresh fruit, vegetables and herbs from Kenya to France, the Netherlands and Switzerland. Category 1 grading, full traceability, cold-chain handling.' },
        { name: 'theme-color', content: '#0E2A1C' }
      ],
      link: [
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: (process.env.NUXT_APP_BASE_URL || '/') + 'img/favicon-32.png' },
        { rel: 'icon', type: 'image/png', sizes: '64x64', href: (process.env.NUXT_APP_BASE_URL || '/') + 'img/favicon-64.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: (process.env.NUXT_APP_BASE_URL || '/') + 'img/favicon-180.png' }
      ]
    }
  },
  fonts: { families: [{ name: 'Fraunces', provider: 'google' }, { name: 'Inter Tight', provider: 'google' }, { name: 'Atkinson Hyperlegible', provider: 'google' }] }
})
