<template>
  <section id="team" class="mx-auto max-w-7xl px-5 py-28 md:px-10 md:py-40">
    <p class="eyebrow mb-6 text-leaf" data-reveal>The people</p>
    <h2 class="display max-w-3xl text-5xl md:text-7xl" data-lines><span class="line-mask"><span class="line-inner">Service is our</span></span><span class="line-mask"><span class="line-inner italic text-leaf">core principle.</span></span></h2>
    <ul class="mt-16 grid gap-6 md:grid-cols-3" data-stagger>
      <li v-for="(m, i) in team" :key="m.name" class="reveal card-lift flex flex-col rounded-3xl border border-forest/15 bg-white p-8">
        <div class="display grid h-20 w-20 place-items-center rounded-full text-3xl text-cream" :class="['bg-forest', 'bg-leaf', 'bg-tomato'][i]">{{ m.name.split(' ').map((w) => w[0]).join('') }}</div>
        <h3 class="display mt-8 text-3xl">{{ m.name }}</h3>
        <p class="eyebrow mt-2 text-leaf">{{ m.role }}</p>
        <p class="mt-5 flex-1 text-sm text-ink/70">{{ m.bio }}</p>
        <p class="display mt-6 text-lg italic text-forest">“{{ m.quote }}”</p>
        <a :href="'mailto:' + m.email" class="mt-5 text-sm font-semibold underline-offset-4 hover:underline">{{ m.email }}</a>
      </li>
    </ul>
  </section>
</template>
<script setup lang="ts">import { team } from '~/data'</script>
