<template>
  <div>
    <a href="#main" class="sr-only z-[100] rounded-full bg-lime px-5 py-3 text-sm font-bold text-forest focus:not-sr-only focus:fixed focus:left-4 focus:top-24">Skip to main content</a>
    <SiteNav v-if="!bare" />
    <main id="main" tabindex="-1" class="outline-none"><NuxtPage :transition="transition" /></main>
    <SiteFooter v-if="!bare" />
    <ModalHost />
    <template v-if="!bare">
      <PromoToast />
      <WhatsAppButton />
      <QuotePill />
      <AccessibilityMenu />
    </template>
  </div>
</template>
<script setup lang="ts">
const transition = {
  name: 'page', mode: 'out-in' as const,
  onAfterLeave() { window.scrollTo(0, 0) }
}
const route = useRoute()
const bare = computed(() => !!route.meta.bare) // digital business cards: no site menu, footer or floating widgets
const { items, load, save } = useQuote()
const { siteUrl } = useSite()
useHead({ script: [
  { key: 'ld-org', type: 'application/ld+json', innerHTML: JSON.stringify({
    '@context': 'https://schema.org', '@type': 'Organization', '@id': siteUrl + '/#org', name: 'Premier Veg Mondo Limited', alternateName: 'Premier Veg', url: siteUrl + '/', logo: siteUrl + '/img/logo.jpg', image: siteUrl + '/og.jpg',
    description: 'Exporter of fresh fruits, vegetables and herbs from Kenya to France, the Netherlands and Switzerland.', slogan: 'Whatever we grow, you receive it fresh.', foundingDate: '2022', email: 'info@premierveg.com', telephone: '+393512151931',
    address: { '@type': 'PostalAddress', streetAddress: 'Trystar Go Down, Airport North Road', postOfficeBoxNumber: '3468-00200', addressLocality: 'Nairobi', postalCode: '00200', addressCountry: 'KE' },
    contactPoint: [{ '@type': 'ContactPoint', contactType: 'sales', email: 'info@premierveg.com', telephone: '+393512151931', availableLanguage: ['English'], areaServed: ['FR', 'NL', 'CH'] }],
    areaServed: ['France', 'Netherlands', 'Switzerland'],
    knowsAbout: ['Fresh produce export', 'Haricot verts', 'Mangetouts', 'Sugar snaps', 'Baby corn', 'Avocados', 'Mangoes', 'Passion fruit', 'Chillies', 'Fresh herbs', 'GlobalG.A.P.', 'SMETA']
  }) },
  { key: 'ld-site', type: 'application/ld+json', innerHTML: JSON.stringify({ '@context': 'https://schema.org', '@type': 'WebSite', '@id': siteUrl + '/#site', url: siteUrl + '/', name: 'Premier Veg', inLanguage: 'en', publisher: { '@id': siteUrl + '/#org' } }) }
] })
onMounted(async () => {
  load(); watch(items, save, { deep: true })
  await nextTick()
  const m = useMotionGlobal()
  if (!m.reduce) m.intro()
})
</script>
