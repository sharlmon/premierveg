<template>
  <section :class="lead ? 'pt-40 md:pt-48' : 'pt-28 md:pt-40'" id="process" class="bg-forest pb-28 text-cream md:pb-40">
    <div class="mx-auto grid max-w-7xl gap-16 px-5 md:px-10 lg:grid-cols-12">
      <div class="lg:sticky lg:top-28 lg:col-span-5 lg:self-start">
        <p class="eyebrow mb-6 text-lime" data-reveal>Farm to final market</p>
        <component :is="lead ? 'h1' : 'h2'" class="display text-4xl md:text-5xl lg:text-6xl" data-lines><span class="line-mask"><span class="line-inner">Freshness is</span></span><span class="line-mask"><span class="line-inner italic text-lime">a process.</span></span></component>
        <div class="mt-10 hidden aspect-[4/3] overflow-hidden rounded-3xl lg:block" data-clip><img :src="asset('img/sugar-closeup.jpg')" alt="Close-up of freshly packed sugar snap peas" loading="lazy" class="h-full w-full object-cover" /></div>
      </div>
      <ol class="relative lg:col-span-7 lg:pl-16">
        <div class="absolute bottom-0 left-4 top-0 hidden w-px bg-white/15 lg:block"><div id="process-line" class="h-full w-full origin-top bg-lime" /></div>
        <li v-for="s in steps" :key="s.n" class="reveal relative border-b border-white/15 py-10 first:pt-0" data-reveal>
          <span class="absolute -left-[3.05rem] top-2 hidden h-3 w-3 rounded-full bg-lime ring-8 ring-forest lg:block" />
          <span class="display text-5xl text-lime">{{ s.n }}</span>
          <h3 class="display mt-3 text-3xl md:text-4xl">{{ s.t }}</h3>
          <p class="mt-3 max-w-lg text-cream/70">{{ s.d }}</p>
        </li>
      </ol>
    </div>
  </section>
</template>
<script setup lang="ts">
defineProps<{ lead?: boolean }>()
import { steps } from '~/data'
const asset = useAsset()</script>
