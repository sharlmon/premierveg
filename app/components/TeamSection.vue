<template>
  <section :class="lead ? 'pt-40 md:pt-48' : 'pt-28 md:pt-40'" class="mx-auto max-w-7xl px-5 pb-28 md:px-10 md:pb-40">
    <p class="eyebrow mb-6 text-leaf" data-reveal>Team at Premier Veg</p>
    <component :is="lead ? 'h1' : 'h2'" class="display max-w-3xl text-4xl md:text-5xl lg:text-6xl" data-lines><span class="line-mask"><span class="line-inner">The people behind</span></span><span class="line-mask"><span class="line-inner italic text-leaf">your produce.</span></span></component>
    <ul class="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" data-stagger>
      <li v-for="(m, i) in team" :key="m.name" class="reveal">
        <button class="card-lift group flex h-full w-full cursor-pointer flex-col overflow-hidden rounded-3xl border border-forest/15 bg-white text-left" :aria-label="'Read about ' + m.name" @click="open({ type: 'team', item: m })">
          <div class="relative aspect-[4/3] overflow-hidden" :class="['bg-forest', 'bg-leaf', 'bg-tomato'][i % 3]">
            <img v-if="m.photo" :src="asset(m.photo)" :alt="m.name" loading="lazy" class="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105" />
            <span v-else class="display absolute inset-0 grid place-items-center text-7xl text-cream/90">{{ m.name.split(' ').map((w) => w[0]).join('') }}</span>
          </div>
          <div class="flex flex-1 flex-col p-6">
            <h3 class="display text-2xl">{{ m.name }}</h3>
            <p class="eyebrow mt-2 text-leaf">{{ m.role }}</p>
            <p v-if="m.quote" class="display mt-4 text-base italic text-forest/80">“{{ m.quote }}”</p>
            <span class="mt-auto pt-5 text-sm font-semibold">Read bio <span class="inline-block transition-transform group-hover:translate-x-1" aria-hidden="true">→</span></span>
          </div>
        </button>
      </li>
    </ul>
  </section>
</template>
<script setup lang="ts">
defineProps<{ lead?: boolean }>()
import { team } from '~/data'
const asset = useAsset(); const { open } = useModal()
</script>
