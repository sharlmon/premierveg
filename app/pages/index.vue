<template>
  <div>
    <HeroSection />
    <StatementSection />
    <MarqueeStrip />
    <ShowcaseSection />
    <GlobeMap />
    <CertificationsSection />
    <LazyCategoriesStrip hydrate-on-visible />
    <LazyGallerySection hydrate-on-visible />
    <LazyExportSection hydrate-on-visible />
    <LazyCtaBand hydrate-on-visible />
  </div>
</template>
<script setup lang="ts">
usePageSeo({ title: 'Premier Veg — Fresh fruit, vegetables & herbs from Kenya', description: 'Premier Veg exports year-round fresh vegetables, fruit and herbs from Kenya to France, the Netherlands and Switzerland. Category 1 grading and full traceability.', path: '/' })
onMounted(async () => { await nextTick(); usePageMotion() })
</script>
