<template>
  <section :class="lead ? 'pt-40 md:pt-48' : 'pt-28 md:pt-40'" id="range" class="mx-auto max-w-7xl px-5 pb-28 md:px-10 md:pb-40">
    <div class="flex flex-col justify-between gap-8 md:flex-row md:items-end">
      <div>
        <p class="eyebrow mb-6 text-leaf" data-reveal>The full range</p>
        <component :is="lead ? 'h1' : 'h2'" class="display text-4xl md:text-5xl lg:text-6xl" data-lines><span class="line-mask"><span class="line-inner">Ten lines,</span></span><span class="line-mask"><span class="line-inner italic text-leaf">one standard.</span></span></component>
      </div>
      <div class="flex flex-wrap gap-2" role="group" aria-label="Filter products">
        <button v-for="c in cats" :key="c" class="cursor-pointer rounded-full border px-5 py-2.5 text-sm font-semibold transition" :class="active === c ? 'border-forest bg-forest text-cream' : 'border-forest/25 hover:border-forest'" :aria-pressed="active === c" @click="setCat(c)">{{ c }}</button>
      </div>
    </div>
    <ul ref="list" class="mt-14 border-t border-forest/20" data-stagger>
      <li v-for="(p, i) in shown" :key="p.code" class="reveal">
        <NuxtLink to="/contact" class="row group grid grid-cols-[2.5rem_1fr_auto] items-center gap-x-4 gap-y-1 border-b border-forest/20 px-2 py-6 md:grid-cols-[4rem_1.2fr_1.6fr_7rem_3rem] md:px-6 md:py-8" :style="{ '--c': p.color }" @click="pick(p.name)">
          <span class="font-mono text-xs opacity-50">{{ String(i + 1).padStart(2, '0') }}</span>
          <span class="display text-2xl md:text-4xl">{{ p.name }}</span>
          <span class="col-span-2 col-start-2 row-start-2 text-sm opacity-70 md:col-span-1 md:col-start-auto md:row-start-auto md:max-w-sm md:opacity-0 md:transition-opacity md:duration-300 md:group-hover:opacity-80">{{ p.blurb }}</span>
          <span class="eyebrow hidden opacity-70 md:block">{{ p.cat }}</span>
          <span class="justify-self-end text-2xl transition-transform duration-300 group-hover:translate-x-1 group-hover:-rotate-45" aria-hidden="true">→</span>
        </NuxtLink>
      </li>
    </ul>
  </section>
</template>
<script setup lang="ts">
defineProps<{ lead?: boolean }>()
import gsap from 'gsap'
import { products } from '~/data'
const cats = ['All', 'Vegetables', 'Fruits', 'Herbs']
const active = ref('All'); const list = ref<HTMLElement>()
const shown = computed(() => (active.value === 'All' ? products : products.filter((p) => p.cat === active.value)))
const setCat = async (c: string) => {
  active.value = c; await nextTick()
  list.value?.querySelectorAll('.reveal').forEach((el) => { (el as HTMLElement).style.opacity = '1'; (el as HTMLElement).style.transform = 'none' })
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) gsap.from(list.value!.children, { opacity: 0, y: 24, duration: 0.5, stagger: 0.05, ease: 'power3.out' })
}
const pick = (n: string) => { useState('enquiry').value = n }
</script>
<style>
.row { transition: background-color .35s, color .35s, padding .35s; }
.row:hover, .row:focus-visible { background: var(--c); color: #fff; }
</style>
