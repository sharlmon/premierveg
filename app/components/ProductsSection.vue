<template>
  <section id="products" class="bg-forest py-28 text-cream md:py-40">
    <div class="mx-auto max-w-7xl px-5 md:px-10">
      <div class="flex flex-col justify-between gap-8 md:flex-row md:items-end">
        <div>
          <p class="eyebrow mb-6 text-lime" data-reveal>The range</p>
          <h2 class="display text-5xl md:text-7xl" data-lines><span class="line-mask"><span class="line-inner">Ten lines, one</span></span><span class="line-mask"><span class="line-inner italic text-lime">standard.</span></span></h2>
        </div>
        <div class="flex flex-wrap gap-2" role="group" aria-label="Filter products">
          <button v-for="c in cats" :key="c" class="cursor-pointer rounded-full border px-5 py-2.5 text-sm font-semibold transition" :class="active === c ? 'border-lime bg-lime text-forest' : 'border-white/25 hover:border-white'" :aria-pressed="active === c" @click="setCat(c)">{{ c }}</button>
        </div>
      </div>
      <ul ref="grid" class="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" data-stagger>
        <li v-for="p in shown" :key="p.code" class="reveal card-lift group relative flex min-h-[19rem] flex-col justify-between overflow-hidden rounded-3xl p-7" :style="{ background: p.color }">
          <div class="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full bg-white/10 transition-transform duration-700 group-hover:scale-[2.2]" />
          <div class="relative flex items-center justify-between"><span class="eyebrow rounded-full bg-black/25 px-3 py-1.5">{{ p.cat }}</span><span class="font-mono text-xs opacity-70">{{ p.code }}</span></div>
          <div class="relative">
            <h3 class="display text-4xl">{{ p.name }}</h3>
            <p class="mt-3 max-w-xs text-sm text-white/80">{{ p.blurb }}</p>
            <a href="#contact" class="mt-5 inline-flex items-center gap-2 text-sm font-semibold underline-offset-4 hover:underline" @click="pick(p.name)">Enquire <span class="transition-transform group-hover:translate-x-1" aria-hidden="true">→</span></a>
          </div>
        </li>
      </ul>
    </div>
  </section>
</template>
<script setup lang="ts">
import gsap from 'gsap'
import { products } from '~/data'
const cats = ['All', 'Vegetables', 'Fruits', 'Herbs']
const active = ref('All'); const grid = ref<HTMLElement>()
const shown = computed(() => (active.value === 'All' ? products : products.filter((p) => p.cat === active.value)))
const setCat = async (c: string) => {
  active.value = c; await nextTick()
  grid.value?.querySelectorAll('.reveal').forEach((el) => { (el as HTMLElement).style.opacity = '1'; (el as HTMLElement).style.transform = 'none' })
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) gsap.from(grid.value!.children, { opacity: 0, y: 30, scale: 0.96, duration: 0.6, stagger: 0.05, ease: 'power3.out' })
}
const pick = (n: string) => { useState('enquiry').value = n }
</script>
