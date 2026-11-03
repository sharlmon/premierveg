<template>
  <Transition name="toast">
    <aside v-if="show" class="fixed bottom-24 left-4 z-[60] sm:left-6 w-[min(22rem,calc(100vw-2rem))] overflow-hidden rounded-3xl bg-forest text-cream shadow-2xl ring-1 ring-white/10" role="status" aria-live="polite">
      <button class="absolute right-3 top-3 grid h-8 w-8 cursor-pointer place-items-center rounded-full bg-white/10 text-sm transition hover:bg-white/20" aria-label="Dismiss" @click="dismiss">✕</button>
      <div class="flex gap-4 p-5 pr-12">
        <img :src="asset('img/packages/pcm001.webp')" alt="" class="h-20 w-20 shrink-0 rounded-2xl bg-white object-contain p-1" />
        <div>
          <p class="display text-xl leading-tight">Looking for year-round supply?</p>
          <p class="mt-1 text-xs text-cream/70">Tell us what you need. We'll ship as fast as it's processed.</p>
          <button class="btn btn-lime mt-3 !px-4 !py-2 text-xs" @click="go">Request a quote →</button>
        </div>
      </div>
    </aside>
  </Transition>
</template>
<script setup lang="ts">
const asset = useAsset(); const { open, state } = useModal(); const route = useRoute()
const show = ref(false)
const KEY = 'pv-promo-dismissed'
const seen = () => { try { return sessionStorage.getItem(KEY) === '1' } catch { return false } }
const dismiss = () => { show.value = false; try { sessionStorage.setItem(KEY, '1') } catch {} }
const go = () => { dismiss(); open({ type: 'quote' }) }
onMounted(() => { if (seen()) return; setTimeout(() => { if (!seen() && !state.value && route.path !== '/contact') show.value = true }, 14000) })
watch(() => route.path, (p) => { if (p === '/contact') show.value = false })
watch(state, (v) => { if (v) show.value = false })
</script>
<style>
.toast-enter-active { transition: transform .6s cubic-bezier(.2,.9,.2,1), opacity .4s; }
.toast-leave-active { transition: transform .3s ease, opacity .25s; }
.toast-enter-from, .toast-leave-to { opacity: 0; transform: translateY(30px); }
</style>
