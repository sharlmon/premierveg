<template>
  <section id="packages" class="bg-lime py-28 text-forest md:py-40">
    <div class="mx-auto max-w-7xl px-5 md:px-10">
      <p class="eyebrow mb-6" data-reveal>Packaging</p>
      <h2 class="display max-w-3xl text-5xl md:text-7xl" data-lines><span class="line-mask"><span class="line-inner">Cartons &amp; punnets,</span></span><span class="line-mask"><span class="line-inner italic">ready for retail.</span></span></h2>
      <ul class="mt-16 grid gap-px overflow-hidden rounded-3xl bg-forest/20 grid-cols-2 lg:grid-cols-5" data-stagger>
        <li v-for="p in packages" :key="p.code" class="reveal group bg-lime p-4 transition-colors sm:p-6 hover:bg-forest hover:text-cream">
          <div class="flex items-center justify-between"><span class="eyebrow">{{ p.kind }}</span><span class="font-mono text-[11px] opacity-60">{{ p.code }}</span></div>
          <svg v-if="p.kind === 'Carton'" class="my-5 h-11 w-11 sm:my-8 sm:h-14 sm:w-14 transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M6 14 24 6l18 8v20L24 42 6 34z"/><path d="m6 14 18 8 18-8M24 22v20"/></svg>
          <svg v-else class="my-5 h-11 w-11 sm:my-8 sm:h-14 sm:w-14 transition-transform duration-500 group-hover:-rotate-6 group-hover:scale-110" viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M8 18h32l-4 22H12z"/><path d="M6 18h36M14 18c0-6 4-10 10-10s10 4 10 10"/></svg>
          <h3 class="display text-xl leading-none sm:text-2xl">{{ p.name }}</h3>
          <p class="mt-2 text-sm opacity-75">{{ p.note }}</p>
        </li>
      </ul>
    </div>
  </section>
</template>
<script setup lang="ts">import { packages } from '~/data'</script>
