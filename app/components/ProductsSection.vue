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
        <svg class="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-forest/50" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.500-3.500"/></svg>
        <input :value="q" type="search" placeholder="Search e.g. beans, mango…" class="w-full rounded-full border border-forest/20 bg-white py-3 pl-11 pr-4 text-sm outline-none transition focus:border-forest" @input="setQ(($event.target as HTMLInputElement).value)" />
      </label>
    </div>
    <p class="mt-4 text-sm text-ink/50" aria-live="polite">{{ count }} {{ count === 1 ? 'product' : 'products' }}</p>

    <ul ref="list" class="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" data-stagger>
      <li v-for="p in products" :key="p.code" class="reveal" :class="match(p) ? '' : 'hidden'">
        <button v-tilt="8" class="tilt group relative flex h-full min-h-[22rem] w-full cursor-pointer flex-col overflow-hidden rounded-3xl p-6 text-left text-white shadow-[0_18px_40px_-22px_rgba(14,42,28,.55)]" :style="{ background: p.color }" :aria-label="'View ' + p.name" data-cursor="View" @click="open({ type: 'product', item: p })">
          <span class="glare" />
          <div class="pointer-events-none absolute -right-14 -top-14 h-56 w-56 rounded-full bg-white/10 transition-transform duration-700 group-hover:scale-[2.2]" />
          <div class="relative flex items-center justify-between"><span class="eyebrow rounded-full bg-black/25 px-3 py-1.5">{{ p.cat }}</span><span class="font-mono text-xs opacity-70">{{ p.code }}</span></div>
          <div class="relative my-4 grid flex-1 place-items-center"><img :src="asset(p.img)" :alt="p.name" loading="lazy" class="depth max-h-44 w-full object-contain drop-shadow-2xl" /></div>
          <div class="relative flex items-end justify-between gap-3"><h3 class="display text-3xl">{{ p.name }}</h3><span class="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/20 transition group-hover:bg-lime group-hover:text-forest" aria-hidden="true">+</span></div>
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
