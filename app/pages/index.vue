<template>
  <div>
    <HeroSection />
    <MarqueeStrip />
    <StatementSection />
    <ShowcaseSection />
    <RouteMap />
    <CategoriesStrip />
    <GallerySection />
    <CtaBand />
  </div>
</template>
<script setup lang="ts">
useHead({ title: 'Premier Veg — Fresh fruit, vegetables & herbs from Kenya' })
onMounted(async () => { await nextTick(); usePageMotion() })
</script>
