<template>
  <div>
    <div id="progress" class="fixed left-0 top-0 z-[70] h-[3px] w-full origin-left scale-x-0 bg-lime" />
    <div id="loader" class="fixed inset-0 z-[80] flex flex-col items-center justify-center gap-6 bg-forest" aria-hidden="true">
      <img id="loader-logo" :src="asset('img/logo.png')" alt="" class="h-20 w-20 rounded-full" />
      <div class="h-[2px] w-48 overflow-hidden bg-white/15"><div id="loader-bar" class="h-full origin-left scale-x-0 bg-lime" /></div>
    </div>
    <SiteNav />
    <main>
      <HeroSection />
      <MarqueeStrip />
      <AboutSection />
      <ProductsSection />
      <ProcessSection />
      <PackagesSection />
      <TeamSection />
      <ContactSection />
    </main>
    <SiteFooter />
  </div>
</template>
<script setup lang="ts">
const asset = useAsset()
onMounted(async () => {
  await nextTick()
  const m = useMotion()
  if (m.reduce) document.getElementById('loader')?.remove()
  if (!m.reduce) m.intro()
})
</script>
