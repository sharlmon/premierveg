<template>
  <section :class="lead ? 'pt-40 md:pt-48' : 'pt-28 md:pt-40'" class="bg-lime pb-28 text-forest md:pb-40">
    <div class="mx-auto max-w-7xl px-5 md:px-10">
      <p class="eyebrow mb-6" data-reveal>Our packages</p>
      <component :is="lead ? 'h1' : 'h2'" class="display max-w-3xl text-4xl md:text-5xl lg:text-6xl" data-lines><span class="line-mask"><span class="line-inner">Cartons &amp; punnets,</span></span><span class="line-mask"><span class="line-inner italic">ready for shelf.</span></span></component>
      <ul class="mt-14 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4" data-stagger>
        <li v-for="p in packages" :key="p.id" class="reveal">
          <button class="card-lift group flex h-full w-full cursor-pointer flex-col overflow-hidden rounded-3xl bg-white text-left" :aria-label="'View ' + p.name + ' ' + p.kind" @click="open({ type: 'package', item: p })">
            <div class="relative grid aspect-[4/3] place-items-center overflow-hidden bg-[#f5f5f5]"><img :src="asset(p.img)" :alt="p.name + ' ' + p.kind.toLowerCase()" loading="lazy" class="h-full w-full object-contain transition-transform duration-500 group-hover:scale-110" /><span class="eyebrow absolute left-3 top-3 rounded-full bg-forest px-2.5 py-1 text-[10px] text-lime">{{ p.kind }}</span></div>
            <div class="flex flex-1 flex-col border-t border-forest/10 p-4 sm:p-5"><p class="font-mono text-[11px] text-forest/50">{{ p.code }}</p><h3 class="display mt-1 text-lg leading-tight sm:text-xl">{{ p.name }}</h3><p class="mt-1 text-xs text-forest/65">{{ p.note }}</p></div>
          </button>
        </li>
      </ul>
    </div>
  </section>
</template>
<script setup lang="ts">
defineProps<{ lead?: boolean }>()
import { packages } from '~/data'
const asset = useAsset(); const { open } = useModal()
</script>
