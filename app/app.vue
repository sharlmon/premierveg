<template>
  <div>
    <div id="progress" class="fixed left-0 top-0 z-[70] h-[3px] w-full origin-left scale-x-0 bg-lime" />
    <div id="loader" class="fixed inset-0 z-[80] flex flex-col items-center justify-center gap-6 bg-forest" aria-hidden="true">
      <img id="loader-logo" :src="asset('img/logo.jpg')" alt="" class="h-20 w-20 rounded-full" />
      <div class="h-[2px] w-48 overflow-hidden bg-white/15"><div id="loader-bar" class="h-full origin-left scale-x-0 bg-lime" /></div>
    </div>
    <SiteNav />
    <main><NuxtPage :transition="transition" /></main>
    <SiteFooter />
  </div>
</template>
<script setup lang="ts">
import { ScrollTrigger } from 'gsap/ScrollTrigger'
const asset = useAsset()
const transition = {
  name: 'page', mode: 'out-in' as const,
  onBeforeLeave() { ScrollTrigger.getAll().forEach((t) => t.kill(true)) },
  onAfterLeave() { window.scrollTo(0, 0); (window as any).__lenis?.scrollTo(0, { immediate: true, force: true }) }
}
onMounted(async () => {
  await nextTick()
  const m = useMotionGlobal()
  if (m.reduce) document.getElementById('loader')?.remove()
  else m.intro()
})
</script>
