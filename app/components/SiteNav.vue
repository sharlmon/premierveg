<template>
  <header class="pointer-events-none fixed inset-x-0 top-0 z-[65]">
    <!-- logo -->
    <NuxtLink to="/" class="pointer-events-auto absolute left-4 top-4 flex items-center gap-3 rounded-full bg-forest/85 py-1 pl-1 pr-1 text-cream shadow-lg backdrop-blur-md sm:pr-4 md:left-7 md:top-6" aria-label="Premier Veg home">
      <img :src="asset('img/logo.jpg')" alt="" class="h-10 w-10 rounded-full ring-2 ring-white/70" />
      <span class="display hidden text-lg sm:inline">Premier Veg</span>
    </NuxtLink>

    <!-- tab ribbon (desktop) -->
    <nav class="tab pointer-events-auto absolute left-1/2 top-0 hidden -translate-x-1/2 lg:block" aria-label="Main">
      <ul class="flex items-center gap-1 px-16 pb-4 pt-3.5 text-[13px] font-medium text-cream">
        <li v-for="l in links" :key="l.to">
          <NuxtLink :to="l.to" class="relative block rounded-full px-4 py-1.5 transition hover:text-lime" :class="isActive(l.to) ? 'text-lime' : ''" :aria-current="isActive(l.to) ? 'page' : undefined">
            {{ l.label }}
            <span class="absolute -bottom-0.5 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-lime transition-all duration-300" :class="isActive(l.to) ? 'scale-100 opacity-100' : 'scale-0 opacity-0'" />
          </NuxtLink>
        </li>
      </ul>
    </nav>

    <!-- round menu button + panel -->
    <div class="pointer-events-auto absolute right-4 top-4 md:right-7 md:top-6">
      <button ref="btn" class="group grid h-12 w-12 cursor-pointer place-items-center rounded-full bg-forest text-cream shadow-lg ring-1 ring-white/10 transition hover:bg-leaf" :aria-expanded="open" aria-controls="quick-menu" aria-label="Menu" @click="open = !open">
        <svg v-if="!open" class="h-5 w-5 transition-transform duration-300 group-hover:rotate-90" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="4" width="6.500" height="6.500" rx="1.500"/><rect x="13.500" y="4" width="6.500" height="6.500" rx="1.500"/><rect x="4" y="13.500" width="6.500" height="6.500" rx="1.500"/><rect x="13.500" y="13.500" width="6.500" height="6.500" rx="1.500"/></svg>
        <svg v-else class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M5 5l14 14M19 5 5 19"/></svg>
      </button>
      <Transition name="panel">
        <div v-if="open" id="quick-menu" ref="panel" class="absolute right-0 top-16 w-[19rem] origin-top-right rounded-[1.75rem] bg-forest p-3 text-cream shadow-2xl ring-1 ring-white/10" role="menu">
          <NuxtLink v-for="l in links" :key="l.to" :to="l.to" class="group flex items-center justify-between rounded-2xl px-4 py-3 transition hover:bg-white/10" :class="isActive(l.to) ? 'bg-white/10 text-lime' : ''" role="menuitem">
            <span class="display text-2xl">{{ l.label }}</span>
            <span class="text-cream/40 transition group-hover:translate-x-1 group-hover:text-lime" aria-hidden="true">→</span>
          </NuxtLink>
          <button class="btn btn-lime mt-2 w-full justify-center" @click="quote">Request a quote <span aria-hidden="true">→</span></button>
          <div class="mt-3 space-y-1 px-2 pb-1 text-xs text-cream/55"><a href="mailto:info@premierveg.com" class="block hover:text-lime">info@premierveg.com</a><a href="tel:+393512151931" class="block hover:text-lime">+39 351 215 1931</a></div>
        </div>
      </Transition>
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
.tab { background: rgba(14, 42, 28, .82); backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px); clip-path: polygon(0 0, 100% 0, calc(100% - 30px) 100%, 30px 100%); filter: drop-shadow(0 10px 20px rgba(0,0,0,.25)); }
.panel-enter-active { transition: opacity .25s, transform .35s cubic-bezier(.2,.9,.2,1); }
.panel-leave-active { transition: opacity .15s, transform .15s; }
.panel-enter-from, .panel-leave-to { opacity: 0; transform: translateY(-8px) scale(.96); }
</style>
