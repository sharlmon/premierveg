<template>
  <header class="fixed inset-x-0 top-0 z-[65]">
    <nav class="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 md:px-10 md:py-5" aria-label="Main">
      <NuxtLink to="/" class="flex items-center gap-3 whitespace-nowrap rounded-full bg-forest/90 py-1 pl-1 pr-4 text-cream shadow-lg backdrop-blur-md" @click="open = false">
        <img :src="asset('img/logo.jpg')" alt="" class="h-9 w-9 rounded-full" />
        <span class="display text-lg">Premier Veg</span>
      </NuxtLink>
      <div class="flex items-center gap-2 md:gap-3">
        <button class="btn btn-lime hidden whitespace-nowrap shadow-[0_0_0_2px_#0E2A1C] sm:inline-flex" data-magnetic @click="quote">Request a quote <span aria-hidden="true">→</span></button>
        <button class="group flex h-12 cursor-pointer items-center gap-3 rounded-full bg-forest pl-5 pr-2 text-sm font-semibold text-cream shadow-lg transition hover:bg-leaf" :aria-expanded="open" aria-controls="menu-overlay" @click="open = !open">
          <span>{{ open ? 'Close' : 'Menu' }}</span>
          <span class="grid h-8 w-8 place-items-center rounded-full bg-lime text-forest"><span class="relative block h-3 w-4"><span class="absolute left-0 top-0 h-[2px] w-4 bg-current transition-transform duration-300" :class="open ? 'translate-y-[5px] rotate-45' : ''" /><span class="absolute bottom-0 left-0 h-[2px] w-4 bg-current transition-transform duration-300" :class="open ? '-translate-y-[5px] -rotate-45' : ''" /></span></span>
        </button>
      </div>
    </nav>

    <Transition :css="false" @enter="onEnter" @leave="onLeave">
      <div v-if="open" id="menu-overlay" class="fixed inset-0 -z-10 overflow-y-auto bg-forest text-cream" role="dialog" aria-modal="true" aria-label="Site menu" data-lenis-prevent>
        <div class="mx-auto grid min-h-full max-w-7xl gap-10 px-5 pb-10 pt-28 md:px-10 lg:grid-cols-12 lg:pt-32">
          <ul class="flex flex-col justify-center lg:col-span-7" @mouseleave="hover = 0">
            <li v-for="(l, i) in links" :key="l.to" class="menu-item overflow-hidden border-b border-white/10">
              <NuxtLink :to="l.to" class="group flex items-baseline gap-4 py-3 md:py-4" :class="route.path === l.to ? 'text-lime' : ''" @mouseenter="hover = i" @focus="hover = i" @click="open = false">
                <span class="font-mono text-xs text-cream/40">0{{ i + 1 }}</span>
                <span class="display text-4xl transition-transform duration-500 group-hover:translate-x-3 md:text-6xl">{{ l.label }}</span>
                <span class="ml-auto hidden text-sm text-cream/50 md:block">{{ l.sub }}</span>
              </NuxtLink>
            </li>
          </ul>
          <div class="hidden lg:col-span-5 lg:block">
            <div class="relative h-full min-h-[24rem] overflow-hidden rounded-[2rem] bg-leaf">
              <div v-for="(l, i) in links" :key="l.to" class="absolute inset-0 grid place-items-center transition-opacity duration-500" :class="hover === i ? 'opacity-100' : 'opacity-0'" :style="{ background: l.bg }">
                <img :src="asset(l.img)" alt="" class="max-h-full max-w-full" :class="l.cover ? 'h-full w-full object-cover' : 'w-3/4 object-contain p-8'" />
              </div>
              <p class="eyebrow absolute bottom-5 left-5 rounded-full bg-forest/80 px-4 py-2 text-lime backdrop-blur">{{ links[hover].label }}</p>
            </div>
          </div>
          <div class="menu-item grid gap-6 border-t border-white/10 pt-8 text-sm sm:grid-cols-3 lg:col-span-12">
            <div><p class="eyebrow mb-2 text-cream/45">Email</p><a href="mailto:info@premierveg.com" class="hover:text-lime">info@premierveg.com</a></div>
            <div><p class="eyebrow mb-2 text-cream/45">Phone</p><a href="tel:+393512151931" class="hover:text-lime">+39 351 215 1931</a></div>
            <div class="sm:text-right"><button class="btn btn-lime" @click="quote">Request a quote <span aria-hidden="true">→</span></button></div>
          </div>
        </div>
      </div>
    </Transition>
  </header>
</template>
<script setup lang="ts">
import gsap from 'gsap'
const asset = useAsset()
const route = useRoute()
const { open: openModal } = useModal()
const open = ref(false); const hover = ref(0)
const links = [
  { to: '/', label: 'Home', sub: 'As fresh as it gets', img: 'img/beans-bunch.jpg', cover: true, bg: '#0E2A1C' },
  { to: '/about', label: 'About', sub: 'Our story & pack-house', img: 'img/about/packhouse.jpg', cover: true, bg: '#1F5B3A' },
  { to: '/products', label: 'Products', sub: 'Vegetables, fruit & herbs', img: 'img/products/mangoes.png', bg: '#E09A00' },
  { to: '/packages', label: 'Packages', sub: 'Cartons & punnets', img: 'img/packages/cxf001-carton.png', bg: '#ffffff' },
  { to: '/team', label: 'Team', sub: 'The people behind it', img: 'img/team/brenda.jpg', cover: true, bg: '#C6F04A' },
  { to: '/contact', label: 'Contact', sub: 'Orders & enquiries', img: 'img/products/chillies.png', bg: '#C8102E' }
]
const quote = () => { open.value = false; setTimeout(() => openModal({ type: 'quote' }), 350) }
const lock = (on: boolean) => { const l = (window as any).__lenis; on ? l?.stop() : l?.start(); document.documentElement.style.overflow = on ? 'hidden' : '' }
watch(open, (v) => lock(v))
watch(() => route.path, () => (open.value = false))
const reduce = () => import.meta.client && window.matchMedia('(prefers-reduced-motion: reduce)').matches
const onEnter = (el: Element, done: () => void) => {
  if (reduce()) return done()
  gsap.fromTo(el, { clipPath: 'circle(0% at calc(100% - 3rem) 2.5rem)' }, { clipPath: 'circle(150% at calc(100% - 3rem) 2.5rem)', duration: 0.9, ease: 'power3.inOut', onComplete: done })
  gsap.from(el.querySelectorAll('.menu-item'), { y: 60, opacity: 0, duration: 0.8, stagger: 0.07, delay: 0.35, ease: 'power3.out' })
}
const onLeave = (el: Element, done: () => void) => {
  if (reduce()) return done()
  gsap.to(el, { clipPath: 'circle(0% at calc(100% - 3rem) 2.5rem)', duration: 0.6, ease: 'power3.inOut', onComplete: done })
}
onMounted(() => window.addEventListener('keydown', (e) => e.key === 'Escape' && (open.value = false)))
onBeforeUnmount(() => lock(false))
</script>
