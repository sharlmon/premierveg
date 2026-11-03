<template>
  <section id="range" :class="lead ? 'pt-40 md:pt-48' : 'pt-28 md:pt-40'" class="mx-auto max-w-7xl px-5 pb-28 md:px-10 md:pb-40">
    <p class="eyebrow mb-6 text-leaf" data-reveal>The full range</p>
    <component :is="lead ? 'h1' : 'h2'" class="display text-4xl md:text-5xl lg:text-6xl" data-lines><span class="line-mask"><span class="line-inner">Our products</span></span><span class="line-mask"><span class="line-inner italic text-leaf">grown with care.</span></span></component>

    <div class="mt-10 flex flex-col gap-4 md:flex-row md:items-center md:justify-between" data-reveal>
      <div class="flex flex-wrap gap-2" role="group" aria-label="Filter products">
        <button v-for="c in cats" :key="c" class="cursor-pointer rounded-full border px-5 py-2.5 text-sm font-semibold transition" :class="active === c ? 'border-forest bg-forest text-cream' : 'border-forest/20 hover:border-forest'" :aria-pressed="active === c" @click="setCat(c)">{{ c }}</button>
      </div>
      <label class="relative block w-full md:w-72">
        <span class="sr-only">Search products</span>
        <svg class="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-forest/70" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.500-3.500"/></svg>
        <input :value="q" type="search" placeholder="Search e.g. beans, mango…" class="w-full rounded-full border border-forest/20 bg-white py-3 pl-11 pr-4 text-sm outline-none transition focus:border-forest" @input="setQ(($event.target as HTMLInputElement).value)" />
      </label>
    </div>
    <p class="mt-4 text-sm text-ink/70" aria-live="polite">{{ count }} {{ count === 1 ? 'product' : 'products' }}</p>

    <h2 class="sr-only">Product list</h2>
    <ul ref="list" class="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" data-stagger>
      <li v-for="p in products" :key="p.code" class="reveal" :class="match(p) ? '' : 'hidden'">
        <button v-tilt="8" class="tilt group relative flex h-full w-full cursor-pointer flex-col overflow-hidden rounded-3xl bg-white text-left shadow-[0_18px_40px_-22px_rgba(14,42,28,.45)] ring-1 ring-forest/10" :aria-label="'View ' + p.name" @click="open({ type: 'product', item: p })">
          <span class="glare" />
          <div class="relative grid aspect-[4/3] place-items-center bg-white p-6">
            <span class="eyebrow absolute left-4 top-4 rounded-full px-3 py-1.5" :style="{ background: p.color, color: ink(p.color) }">{{ p.cat }}</span>
            <span class="absolute right-4 top-4 font-mono text-xs text-forest/70">{{ p.code }}</span>
            <img :src="asset(p.img)" :alt="p.name" loading="lazy" decoding="async" class="depth max-h-40 w-full object-contain" />
          </div>
          <div class="flex items-center justify-between gap-3 px-6 py-5 transition-[padding] duration-300 group-hover:py-6" :style="{ background: p.color, color: ink(p.color) }"><h3 class="display text-3xl">{{ p.name }}</h3><span class="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/25 transition group-hover:bg-white group-hover:text-forest" aria-hidden="true">+</span></div>
        </button>
      </li>
    </ul>
    <div v-if="!count" class="mt-10 rounded-3xl border border-dashed border-forest/25 p-12 text-center">
      <p class="display text-3xl">No match for “{{ q }}”.</p>
      <button class="btn btn-dark mt-6" @click="clear">Clear filters</button>
    </div>
  </section>
</template>
<script setup lang="ts">
defineProps<{ lead?: boolean }>()
import gsap from 'gsap'
import { Flip } from 'gsap/Flip'
import { products, type Product } from '~/data'
const asset = useAsset(); const { open } = useModal(); const route = useRoute()
// readable text colour for any product colour: whichever of white / dark green has the higher WCAG contrast
const lum = (h: string) => { const n = parseInt(h.slice(1), 16); return [n >> 16, (n >> 8) & 255, n & 255].map((v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4 }).reduce((a, v, i) => a + v * [0.2126, 0.7152, 0.0722][i], 0) }
const ink = (bg: string) => { const L = lum(bg); return (1.05 / (L + 0.05)) >= ((L + 0.05) / (lum('#0E2A1C') + 0.05)) ? '#fff' : '#0E2A1C' }
const cats = ['All', 'Vegetables', 'Fruits', 'Herbs']
const active = ref(cats.includes(String(route.query.cat)) ? String(route.query.cat) : 'All')
const q = ref(''); const list = ref<HTMLElement>()
const match = (p: Product) => (active.value === 'All' || p.cat === active.value) && (!q.value || (p.name + ' ' + p.cat + ' ' + p.blurb).toLowerCase().includes(q.value.toLowerCase()))
const count = computed(() => products.filter(match).length)
// animate layout changes with Flip
const run = (fn: () => void) => {
  const items = list.value ? Array.from(list.value.children) : []
  if (!items.length || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return fn()
  gsap.registerPlugin(Flip)
  items.forEach((el) => { (el as HTMLElement).style.opacity = '1' })
  const state = Flip.getState(items)
  fn()
  nextTick(() => Flip.from(state, { duration: 0.7, ease: 'power3.inOut', stagger: 0.03, absolute: true, onEnter: (els) => gsap.fromTo(els, { opacity: 0, scale: 0.85 }, { opacity: 1, scale: 1, duration: 0.5 }), onLeave: (els) => gsap.to(els, { opacity: 0, scale: 0.85, duration: 0.4 }) }))
}
const setCat = (c: string) => run(() => { active.value = c })
const setQ = (v: string) => run(() => { q.value = v })
const clear = () => run(() => { q.value = ''; active.value = 'All' })
const fromQuery = () => { const c = String(route.query.cat || ''); if (cats.includes(c) && c !== active.value) active.value = c }
onMounted(fromQuery)
watch(() => route.query.cat, fromQuery)
</script>
