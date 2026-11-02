<template>
  <div>
    <SiteNav />
    <main><NuxtPage :transition="transition" /></main>
    <SiteFooter />
    <ModalHost />
    <CursorFollower />
    <PromoToast />
  </div>
</template>
<script setup lang="ts">
const transition = {
  name: 'page', mode: 'out-in' as const,
  onAfterLeave() { window.scrollTo(0, 0) }
}
onMounted(async () => {
  await nextTick()
  const m = useMotionGlobal()
  if (!m.reduce) m.intro()
})
</script>
