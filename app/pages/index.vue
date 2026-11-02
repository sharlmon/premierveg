<template>
  <div>
    <HeroSection />
    <StatementSection />
    <MarqueeStrip />
    <ShowcaseSection />
    <RouteMap />
    <CategoriesStrip />
    <GallerySection />
    <CtaBand />
  </div>
</template>
<script setup lang="ts">
usePageSeo({ title: 'Premier Veg — Fresh fruit, vegetables & herbs from Kenya', description: 'Premier Veg Mondo Fresh exports year-round fresh fruit, vegetables and herbs from Kenya to Europe and beyond. Category 1 grading, full traceability, cold-chain handling.', path: '/' })
onMounted(async () => { await nextTick(); usePageMotion() })
</script>
