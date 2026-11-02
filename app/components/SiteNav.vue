<template>
  <div>
    <!-- top: logo + (desktop) quote, hides while scrolling down -->
    <header class="fixed inset-x-0 top-0 z-[65] transition-transform duration-500" :class="hideTop ? '-translate-y-full' : ''">
      <div class="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-10 md:py-5">
        <NuxtLink to="/" class="flex items-center gap-3 whitespace-nowrap rounded-full bg-forest/90 py-1 pl-1 pr-4 text-cream shadow-lg backdrop-blur-md" aria-label="Premier Veg home">
          <img :src="asset('img/logo.jpg')" alt="" class="h-9 w-9 rounded-full" />
          <span class="display text-lg">Premier Veg</span>
        </NuxtLink>
        <p class="hidden text-xs font-semibold uppercase tracking-[.2em] md:block" :class="onDark ? 'text-cream/60' : 'text-forest/50'">As fresh as it gets</p>
      </div>
    </header>

    <!-- dock -->
    <nav class="fixed bottom-3 left-1/2 z-[65] -translate-x-1/2 sm:bottom-5" aria-label="Main">
      <ul ref="dock" class="flex items-end gap-1 rounded-full bg-forest/90 p-1.5 shadow-[0_20px_50px_-10px_rgba(0,0,0,.5)] ring-1 ring-white/10 backdrop-blur-xl sm:gap-1.5 sm:p-2" @pointermove="magnify" @pointerleave="reset">
        <li v-for="l in links" :key="l.to" class="dock-item relative">
          <NuxtLink :to="l.to" class="dock-btn group relative flex h-11 items-center justify-center gap-2 rounded-full text-cream transition-[background,color,width,padding] duration-300 sm:h-12" :class="isActive(l.to) ? 'bg-lime px-3.5 text-forest sm:px-4' : 'w-11 hover:bg-white/10 sm:w-12'" :aria-label="l.label" :aria-current="isActive(l.to) ? 'page' : undefined">
            <svg class="h-[22px] w-[22px] shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" v-html="icons[l.icon]" />
            <span class="hidden whitespace-nowrap text-sm font-semibold" :class="isActive(l.to) ? 'sm:inline' : ''">{{ l.label }}</span>
            <span v-if="!isActive(l.to)" class="tip" aria-hidden="true">{{ l.label }}</span>
          </NuxtLink>
        </li>
        <li class="mx-0.5 h-7 w-px self-center bg-white/15" aria-hidden="true" />
        <li class="dock-item relative">
          <button class="dock-btn group relative grid h-11 w-11 cursor-pointer place-items-center rounded-full bg-white text-forest transition hover:bg-lime sm:h-12 sm:w-12" aria-label="Request a quote" @click="openModal({ type: 'quote' })">
            <svg class="h-[22px] w-[22px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" v-html="icons.quote" />
            <span class="tip" aria-hidden="true">Request a quote</span>
          </button>
        </li>
      </ul>
    </nav>
  </div>
</template>
<script setup lang="ts">
const asset = useAsset()
const route = useRoute()
const { open: openModal } = useModal()
const dock = ref<HTMLElement>()
const hideTop = ref(false); const y = ref(0)
const onDark = computed(() => (route.path === '/' && y.value < 700) || route.path.startsWith('/contact'))
const links = [
  { to: '/', label: 'Home', icon: 'home' }, { to: '/about', label: 'About', icon: 'about' }, { to: '/products', label: 'Products', icon: 'leaf' },
  { to: '/packages', label: 'Packages', icon: 'cube' }, { to: '/team', label: 'Team', icon: 'users' }, { to: '/contact', label: 'Contact', icon: 'mail' }
]
const icons: Record<string, string> = {
  home: '<path d="M3 11l9-8 9 8"/><path d="M5 10v10h5v-6h4v6h5V10"/>',
  about: '<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.5v.01"/>',
  leaf: '<path d="M5 19c0-9 5-14 14-14 0 9-5 14-14 14z"/><path d="M5 19l8-8"/>',
  cube: '<path d="M12 3l8 4.5v9L12 21l-8-4.500v-9L12 3z"/><path d="M12 12l8-4.500M12 12v9M12 12L4 7.500"/>',
  users: '<circle cx="9" cy="8" r="3.500"/><path d="M2.500 20c0-3.600 2.900-6 6.500-6s6.500 2.400 6.500 6M16 4.500a3.500 3.500 0 010 7M18 14.200c2.200.700 3.500 2.600 3.500 5.800"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
  quote: '<path d="M4 5h16v11H9l-5 4V5z"/>'
}
const isActive = (to: string) => (to === '/' ? route.path === '/' : route.path.startsWith(to))
// dock magnification
const magnify = (e: PointerEvent) => {
  if (e.pointerType !== 'mouse') return
  dock.value?.querySelectorAll<HTMLElement>('.dock-item').forEach((li) => {
    const r = li.getBoundingClientRect(); const d = Math.abs(e.clientX - (r.left + r.width / 2))
    const s = 1 + 0.5 * Math.max(0, 1 - d / 120)
    li.style.setProperty('--s', s.toFixed(3))
  })
}
const reset = () => dock.value?.querySelectorAll<HTMLElement>('.dock-item').forEach((li) => li.style.setProperty('--s', '1'))
onMounted(() => {
  let last = window.scrollY
  const f = () => {
    const sy = window.scrollY; y.value = sy
    hideTop.value = sy > 240 && sy > last + 2 ? true : sy < last - 2 ? false : hideTop.value
    last = sy
  }
  f(); window.addEventListener('scroll', f, { passive: true })
})
watch(() => route.path, () => { hideTop.value = false })
</script>
<style>
.dock-item { transform-origin: bottom center; transform: scale(var(--s, 1)) translateY(calc((var(--s, 1) - 1) * -6px)); transition: transform .15s cubic-bezier(.2,.8,.2,1); z-index: 1; }
.dock-item:hover { z-index: 2; }
.tip { position: absolute; bottom: calc(100% + 12px); left: 50%; transform: translateX(-50%) translateY(6px); white-space: nowrap; border-radius: 9999px; background: #F5F1E6; color: #0E2A1C; padding: .3rem .75rem; font-size: .75rem; font-weight: 700; opacity: 0; pointer-events: none; transition: opacity .2s, transform .2s; }
@media (hover: hover) { .dock-btn:hover > .tip, .dock-btn:focus-visible > .tip { opacity: 1; transform: translateX(-50%) translateY(0); } }
@media (prefers-reduced-motion: reduce) { .dock-item { transition: none; } }
</style>
