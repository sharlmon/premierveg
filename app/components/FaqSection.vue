<template>
  <section class="bg-cream pb-28 md:pb-36" aria-labelledby="faq-h">
    <div class="mx-auto max-w-4xl px-5 md:px-10">
      <p class="eyebrow mb-6 text-leaf" data-reveal>Good to know</p>
      <h2 id="faq-h" class="display text-3xl md:text-5xl" data-reveal>Frequently asked questions</h2>
      <div class="mt-10 divide-y divide-forest/15 border-y border-forest/15" data-reveal>
        <details v-for="f in faqs" :key="f.q" class="group py-5">
          <summary class="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-semibold [&::-webkit-details-marker]:hidden">{{ f.q }}<span class="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-forest/10 text-forest transition group-open:rotate-45" aria-hidden="true">+</span></summary>
          <p class="mt-3 max-w-2xl text-ink/75">{{ f.a }}</p>
        </details>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import { faqs } from '~/data'
</script>
