<template>
  <header class="pointer-events-none fixed inset-x-0 top-3 z-[65] px-3 md:top-5 md:px-6">
    <!-- one pod: brand + menu together -->
    <div class="pod pointer-events-auto relative mx-auto flex w-full items-center gap-1 rounded-full p-1.5 pr-1.5 text-cream lg:w-fit lg:gap-2 lg:pr-2">
      <span class="pod-seam" aria-hidden="true" />
      <NuxtLink to="/" class="flex shrink-0 items-center gap-3 rounded-full py-0.5 pl-0.5 pr-3 transition hover:bg-white/5" aria-label="Premier Veg home">
        <img :src="asset('img/logo.jpg')" alt="" width="40" height="40" class="h-10 w-10 rounded-full ring-2 ring-white/70" />
        <span class="display text-lg leading-none">Premier Veg</span>
      </NuxtLink>

      <span class="mx-1 hidden h-6 w-px bg-white/15 lg:block" aria-hidden="true" />

      <nav class="hidden lg:block" aria-label="Main">
        <ul class="flex items-center gap-0.5 text-[13px] font-medium">
          <li v-for="l in links" :key="l.to">
            <NuxtLink :to="l.to" class="pea-link relative flex items-center gap-2 rounded-full px-4 py-2.5 transition" :class="isActive(l.to) ? 'is-on' : 'hover:text-lime'" :aria-current="isActive(l.to) ? 'page' : undefined">
              <span class="pea" aria-hidden="true" />{{ l.label }}
            </NuxtLink>
          </li>
        </ul>
      </nav>

      <button class="btn btn-lime ml-1 hidden !px-5 !py-2.5 text-[13px] lg:inline-flex" @click="quote">Get a quote</button>

      <div class="relative ml-auto lg:ml-0">
        <button ref="btn" class="group grid h-11 w-11 cursor-pointer place-items-center rounded-full bg-white/10 text-cream ring-1 ring-white/10 transition hover:bg-leaf" :aria-expanded="open" aria-controls="quick-menu" aria-label="Menu" @click="open = !open">
          <svg v-if="!open" class="h-5 w-5 transition-transform duration-300 group-hover:rotate-90" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="4" width="6.500" height="6.500" rx="1.500"/><rect x="13.500" y="4" width="6.500" height="6.500" rx="1.500"/><rect x="4" y="13.500" width="6.500" height="6.500" rx="1.500"/><rect x="13.500" y="13.500" width="6.500" height="6.500" rx="1.500"/></svg>
          <svg v-else class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M5 5l14 14M19 5 5 19"/></svg>
        </button>
        <Transition name="panel">
          <div v-if="open" id="quick-menu" ref="panel" class="absolute right-0 top-14 w-[19rem] origin-top-right rounded-[1.75rem] bg-forest p-3 text-cream shadow-2xl ring-1 ring-white/10" role="menu">
            <NuxtLink v-for="l in links" :key="l.to" :to="l.to" class="group flex items-center justify-between rounded-2xl px-4 py-3 transition hover:bg-white/10" :class="isActive(l.to) ? 'bg-white/10 text-lime' : ''" role="menuitem">
              <span class="display text-2xl">{{ l.label }}</span>
              <span class="text-cream/70 transition group-hover:translate-x-1 group-hover:text-lime" aria-hidden="true">→</span>
            </NuxtLink>
            <button class="btn btn-lime mt-2 w-full justify-center" @click="quote">Request a quote <span aria-hidden="true">→</span></button>
            <div class="mt-3 space-y-1 px-2 pb-1 text-xs text-cream/70"><a href="mailto:info@premierveg.com" class="block hover:text-lime">info@premierveg.com</a><a href="tel:+393512151931" class="block hover:text-lime">+39 351 215 1931</a></div>
          </div>
        </Transition>
      </div>
    </div>
  </header>
</template>
<script setup lang="ts">
const asset = useAsset()
const route = useRoute()
const { open: openModal } = useModal()
const open = ref(false); const btn = ref<HTMLElement>(); const panel = ref<HTMLElement>()
const links = [{ to: '/', label: 'Home' }, { to: '/products', label: 'Products' }, { to: '/packages', label: 'Packages' }, { to: '/about', label: 'About' }, { to: '/team', label: 'Team' }, { to: '/contact', label: 'Contact' }]
const isActive = (to: string) => (to === '/' ? route.path === '/' : route.path.startsWith(to))
const quote = () => { open.value = false; openModal({ type: 'quote' }) }
watch(() => route.path, () => (open.value = false))
const outside = (e: PointerEvent) => { if (open.value && !panel.value?.contains(e.target as Node) && !btn.value?.contains(e.target as Node)) open.value = false }
const esc = (e: KeyboardEvent) => { if (e.key === 'Escape') open.value = false }
onMounted(() => { document.addEventListener('pointerdown', outside); window.addEventListener('keydown', esc) })
onBeforeUnmount(() => { document.removeEventListener('pointerdown', outside); window.removeEventListener('keydown', esc) })
</script>
<style>
/* sugar-snap pod: a rounded green capsule with a pale seam along the top, and a pea for the page you are on */
.pod { background: linear-gradient(180deg, rgba(22, 66, 43, .92), rgba(14, 42, 28, .92)); backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px); box-shadow: 0 14px 30px -12px rgba(0,0,0,.45), inset 0 0 0 1px rgba(198,240,74,.18); }
.pod-seam { position: absolute; left: 22px; right: 22px; top: 3px; height: 2px; border-radius: 2px; background: linear-gradient(90deg, transparent, rgba(198,240,74,.55) 18%, rgba(198,240,74,.55) 82%, transparent); pointer-events: none; }
.pea { width: 8px; height: 8px; border-radius: 9999px; background: radial-gradient(circle at 32% 30%, #E6FF9A, #8CC63F 60%, #4E9A2F); transform: scale(0); width: 0; margin-right: -8px; transition: transform .35s cubic-bezier(.3,1.5,.5,1), width .3s, margin .3s; box-shadow: 0 0 0 1px rgba(14,42,28,.4); }
.pea-link.is-on { color: #C6F04A; background: rgba(255,255,255,.08); }
.pea-link.is-on .pea { transform: scale(1); width: 8px; margin-right: 0; }
.pea-link:not(.is-on):hover .pea { transform: scale(.75); width: 8px; margin-right: 0; opacity: .7; }
.panel-enter-active { transition: opacity .25s, transform .35s cubic-bezier(.2,.9,.2,1); }
.panel-leave-active { transition: opacity .15s, transform .15s; }
.panel-enter-from, .panel-leave-to { opacity: 0; transform: translateY(-8px) scale(.96); }
</style>
