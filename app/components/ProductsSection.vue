<template>
  <section id="range" :class="lead ? 'pt-40 md:pt-48' : 'pt-28 md:pt-40'" class="mx-auto max-w-7xl px-5 pb-28 md:px-10 md:pb-40">
    <div class="flex flex-col justify-between gap-8 md:flex-row md:items-end">
      <div>
        <p class="eyebrow mb-6 text-leaf" data-reveal>The full range</p>
        <component :is="lead ? 'h1' : 'h2'" class="display text-4xl md:text-5xl lg:text-6xl" data-lines><span class="line-mask"><span class="line-inner">Our products</span></span><span class="line-mask"><span class="line-inner italic text-leaf">grown with care.</span></span></component>
      </div>
      <div class="flex flex-wrap gap-2" role="group" aria-label="Filter products">
        <button v-for="c in cats" :key="c" class="cursor-pointer rounded-full border px-5 py-2.5 text-sm font-semibold transition" :class="active === c ? 'border-forest bg-forest text-cream' : 'border-forest/25 hover:border-forest'" :aria-pressed="active === c" @click="setCat(c)">{{ c }}</button>
      </div>
    </div>
    <ul ref="list" class="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" data-stagger>
      <li v-for="p in shown" :key="p.code" class="reveal">
        <button class="card-lift group relative flex h-full min-h-[22rem] w-full cursor-pointer flex-col overflow-hidden rounded-3xl p-6 text-left text-white" :style="{ background: p.color }" :aria-label="'View ' + p.name" @click="open({ type: 'product', item: p })">
          <div class="pointer-events-none absolute -right-14 -top-14 h-56 w-56 rounded-full bg-white/10 transition-transform duration-700 group-hover:scale-[2.2]" />
          <div class="relative flex items-center justify-between"><span class="eyebrow rounded-full bg-black/25 px-3 py-1.5">{{ p.cat }}</span><span class="font-mono text-xs opacity-70">{{ p.code }}</span></div>
          <div class="relative my-4 grid flex-1 place-items-center"><img :src="asset(p.img)" :alt="p.name" loading="lazy" class="max-h-44 w-full object-contain drop-shadow-2xl transition-transform duration-500 group-hover:-rotate-3 group-hover:scale-110" /></div>
          <div class="relative flex items-end justify-between gap-3"><h3 class="display text-3xl">{{ p.name }}</h3><span class="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/20 transition group-hover:bg-lime group-hover:text-forest" aria-hidden="true">+</span></div>
        </button>
      </li>
    </ul>
  </section>
</template>
<script setup lang="ts">
defineProps<{ lead?: boolean }>()
import gsap from 'gsap'
import { products } from '~/data'
const asset = useAsset(); const { open } = useModal(); const route = useRoute()
const cats = ['All', 'Vegetables', 'Fruits', 'Herbs']
const active = ref(cats.includes(String(route.query.cat)) ? String(route.query.cat) : 'All'); const list = ref<HTMLElement>()
const shown = computed(() => (active.value === 'All' ? products : products.filter((p) => p.cat === active.value)))
const setCat = async (c: string) => {
  active.value = c; await nextTick()
  list.value?.querySelectorAll('.reveal').forEach((el) => { (el as HTMLElement).style.opacity = '1'; (el as HTMLElement).style.transform = 'none' })
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) gsap.from(list.value!.children, { opacity: 0, y: 24, duration: 0.5, stagger: 0.05, ease: 'power3.out' })
}
const fromQuery = () => { const c = String(route.query.cat || ''); if (cats.includes(c) && c !== active.value) active.value = c }
onMounted(fromQuery)
watch(() => route.query.cat, fromQuery)
</script>
