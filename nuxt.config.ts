export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  future: { compatibilityVersion: 4 },
  modules: ['@nuxtjs/tailwindcss', '@nuxt/fonts'],
  css: ['~/assets/css/main.css'],
  ssr: true,
  nitro: { preset: 'github_pages', prerender: { routes: ['/', '/about', '/products', '/packages', '/team', '/contact'], crawlLinks: true } },
  app: {
    baseURL: process.env.NUXT_APP_BASE_URL || '/',
    head: {
      htmlAttrs: { lang: 'en' },
      title: 'Premier Veg — Fresh fruit, vegetables & herbs from Kenya',
      meta: [
        { name: 'description', content: 'Premier Veg Mondo Fresh exports year-round fresh fruit, vegetables and herbs from Kenya to Europe and beyond. Category 1 grading, full traceability, cold-chain handling.' },
        { name: 'theme-color', content: '#0E2A1C' }
      ],
      link: [
        { rel: 'icon', type: 'image/png', sizes: '32x32', href: (process.env.NUXT_APP_BASE_URL || '/') + 'img/favicon-32.png' },
        { rel: 'icon', type: 'image/png', sizes: '64x64', href: (process.env.NUXT_APP_BASE_URL || '/') + 'img/favicon-64.png' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: (process.env.NUXT_APP_BASE_URL || '/') + 'img/favicon-180.png' }
      ]
    }
  },
  fonts: { families: [{ name: 'Fraunces', provider: 'google' }, { name: 'Inter Tight', provider: 'google' }] }
})
