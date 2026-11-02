<template>
  <section class="bg-forest py-28 text-cream md:py-36">
    <div class="mx-auto max-w-7xl px-5 md:px-10">
      <div class="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <p class="eyebrow mb-6 text-lime" data-reveal>Gallery</p>
          <h2 class="display text-4xl md:text-5xl lg:text-6xl" data-lines><span class="line-mask"><span class="line-inner">From the field</span></span><span class="line-mask"><span class="line-inner italic text-lime">to the pack-house.</span></span></h2>
        </div>
        <p class="max-w-xs text-sm text-cream/60" data-reveal>Tap any photo to view it larger.</p>
      </div>
      <ul class="mt-12 grid auto-rows-[10rem] grid-cols-2 gap-3 sm:auto-rows-[12rem] md:grid-cols-4" data-stagger>
        <li v-for="(g, i) in gallery" :key="g.src" class="reveal" :class="spans[i]">
          <button class="group relative h-full w-full cursor-zoom-in overflow-hidden rounded-2xl" :class="g.contain ? 'bg-white' : 'bg-leaf'" :aria-label="'View: ' + g.cap" @click="open({ type: 'lightbox', index: i, items: gallery })">
            <img :src="asset(g.src)" :alt="g.alt" loading="lazy" class="h-full w-full transition-transform duration-700 group-hover:scale-110" :class="g.contain ? 'object-contain p-3' : 'object-cover'" />
            <span class="absolute inset-0 bg-gradient-to-t from-forest/70 via-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            <span class="eyebrow absolute bottom-3 left-3 translate-y-2 text-[10px] opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">View ↗</span>
          </button>
        </li>
      </ul>
    </div>
  </section>
</template>
<script setup lang="ts">
import { gallery } from '~/data'
const asset = useAsset(); const { open } = useModal()
const spans = ['row-span-2 md:col-span-2', '', 'row-span-2', '', '', 'md:col-span-2', '', 'row-span-2 md:row-span-1']
</script>
