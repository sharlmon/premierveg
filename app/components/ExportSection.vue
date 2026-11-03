<template>
  <section class="bg-cream py-24 md:py-32">
    <div class="mx-auto max-w-7xl px-5 md:px-10">
      <div class="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <p class="eyebrow mb-6 text-leaf" data-reveal>Packed for export</p>
          <h2 class="display text-4xl md:text-5xl lg:text-6xl" data-lines><span class="line-mask"><span class="line-inner">Packed, palletised and</span></span><span class="line-mask"><span class="line-inner">ready to <em class="text-leaf">fly.</em></span></span></h2>
        </div>
        <p class="max-w-sm text-ink/70" data-reveal>Every order is graded, packed in branded cartons and built into secured pallets before it leaves our export office.</p>
      </div>
      <ul class="mt-12 grid grid-cols-2 gap-3 md:grid-cols-6 md:gap-4" data-stagger>
        <li v-for="(s, i) in exportShots" :key="s.src" class="reveal" :class="i < 2 ? 'md:col-span-3' : i === 4 ? 'col-span-2 md:col-span-2' : 'md:col-span-2'">
          <button class="group relative block w-full cursor-zoom-in overflow-hidden rounded-3xl bg-forest" :class="i < 2 ? 'aspect-[4/5]' : i === 4 ? 'aspect-[16/10] md:aspect-[3/4]' : 'aspect-[3/4]'" :aria-label="s.cap + '. Open larger'" @click="open({ type: 'lightbox', index: i, items: exportShots })">
            <img :src="asset(s.src)" :alt="s.alt" :width="s.w" :height="s.h" loading="lazy" decoding="async" class="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
            <span class="absolute inset-0 bg-gradient-to-t from-forest/80 via-transparent to-transparent" />
            <span class="absolute inset-x-0 bottom-0 p-4 text-left text-cream md:p-5"><span class="eyebrow rounded-full bg-lime px-2.5 py-1 text-forest">{{ s.tag }}</span><span class="mt-2 block text-sm font-medium leading-snug md:text-base">{{ s.cap }}</span></span>
          </button>
        </li>
      </ul>
    </div>
  </section>
</template>
<script setup lang="ts">
import { exportShots } from '~/data'
const asset = useAsset(); const { open } = useModal()
</script>
