<template>
  <div>
    <a href="#main" class="sr-only z-[100] rounded-full bg-lime px-5 py-3 text-sm font-bold text-forest focus:not-sr-only focus:fixed focus:left-4 focus:top-24">Skip to main content</a>
    <SiteNav />
    <main id="main" tabindex="-1" class="outline-none"><NuxtPage :transition="transition" /></main>
    <SiteFooter />
    <ModalHost />
    <PromoToast />
    <WhatsAppButton />
    <QuotePill />
    <AccessibilityMenu />
  </div>
</template>
<script setup lang="ts">
const transition = {
  name: 'page', mode: 'out-in' as const,
  onAfterLeave() { window.scrollTo(0, 0) }
}
const { items, load, save } = useQuote()
const { siteUrl } = useSite()
useHead({ script: [{ type: 'application/ld+json', innerHTML: JSON.stringify({
  '@context': 'https://schema.org', '@type': 'Organization', name: 'Premier Veg Mondo Fresh', alternateName: 'Premier Veg', url: siteUrl + '/', logo: siteUrl + '/img/logo.jpg', image: siteUrl + '/og.jpg',
  description: 'Exporter of fresh fruits, vegetables and herbs from Kenya.', foundingDate: '2022', email: 'info@premierveg.com', telephone: '+393512151931',
  address: { '@type': 'PostalAddress', streetAddress: 'Trystar Go Down, Airport North Road', postOfficeBoxNumber: '3468-00200', addressLocality: 'Nairobi', postalCode: '00200', addressCountry: 'KE' },
  areaServed: ['France', 'Netherlands', 'Switzerland']
}) }] })
onMounted(async () => {
  load(); watch(items, save, { deep: true })
  await nextTick()
  const m = useMotionGlobal()
  if (!m.reduce) m.intro()
})
</script>
