<template>
  <div>
    <div id="loader" class="fixed inset-0 z-[80] flex flex-col items-center justify-center gap-6 bg-forest" aria-hidden="true">
      <img id="loader-logo" :src="asset('img/logo.jpg')" alt="" class="h-20 w-20 rounded-full" />
      <div class="h-[2px] w-48 overflow-hidden bg-white/15"><div id="loader-bar" class="h-full origin-left scale-x-0 bg-lime" /></div>
    </div>
    <SiteNav />
    <main><NuxtPage :transition="transition" /></main>
    <SiteFooter />
    <ModalHost />
    <CursorFollower />
    <PromoToast />
  </div>
</template>
<script setup lang="ts">
const asset = useAsset()
const transition = {
  name: 'page', mode: 'out-in' as const,
  onAfterLeave() { window.scrollTo(0, 0) }
}
onMounted(async () => {
  await nextTick()
  const m = useMotionGlobal()
  if (m.reduce) document.getElementById('loader')?.remove()
  else m.intro()
})
</script>
