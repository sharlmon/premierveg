<template>
  <section id="process" class="mx-auto max-w-7xl px-5 py-28 md:px-10 md:py-40">
    <div class="grid gap-16 lg:grid-cols-12">
      <div class="lg:col-span-5 lg:sticky lg:top-32 lg:self-start">
        <p class="eyebrow mb-6 text-leaf" data-reveal>Farm to final market</p>
        <h2 class="display text-5xl md:text-7xl" data-lines><span class="line-mask"><span class="line-inner">Freshness is</span></span><span class="line-mask"><span class="line-inner italic text-leaf">a process.</span></span></h2>
        <p class="mt-8 max-w-md text-lg text-ink/75" data-reveal>From arrival to dispatch every vegetable goes through a controlled pack-house process designed to preserve freshness and reduce handling damage.</p>
      </div>
      <ol class="relative lg:col-span-7 lg:pl-16">
        <div class="absolute bottom-0 left-4 top-0 hidden w-px bg-forest/15 lg:block"><div id="process-line" class="h-full w-full origin-top bg-leaf" /></div>
        <li v-for="s in steps" :key="s.n" class="reveal relative border-b border-forest/15 py-10 first:pt-0" data-reveal>
          <span class="absolute -left-[3.05rem] top-2 hidden h-3 w-3 rounded-full bg-leaf ring-8 ring-cream lg:block first:top-1" />
          <span class="display text-6xl text-lime" style="-webkit-text-stroke:1.5px #1F5B3A">{{ s.n }}</span>
          <h3 class="display mt-3 text-3xl md:text-4xl">{{ s.t }}</h3>
          <p class="mt-3 max-w-lg text-ink/70">{{ s.d }}</p>
        </li>
      </ol>
    </div>
  </section>
</template>
<script setup lang="ts">import { steps } from '~/data'</script>
