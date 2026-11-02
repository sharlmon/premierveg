<template>
  <section id="about" class="bg-[#DCE5DA]">
    <div class="mx-auto max-w-7xl px-5 py-24 md:px-10 md:py-32">
      <!-- statement -->
      <div class="grid gap-8 lg:grid-cols-12">
        <div class="lg:col-span-3">
          <p class="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-xs font-semibold" data-reveal><span class="h-1.5 w-1.5 rounded-full bg-forest" /> About us</p>
        </div>
        <p class="display text-[clamp(1.7rem,3.3vw,3rem)] !leading-[1.12] tracking-tight lg:col-span-9" :aria-label="text">
          <span v-for="(w, i) in words" :key="i" class="word inline-block" aria-hidden="true">{{ w }}&nbsp;</span>
        </p>
      </div>

      <!-- details -->
      <div class="mt-16 grid items-start gap-10 md:mt-24 lg:grid-cols-12">
        <!-- stats -->
        <dl class="grid grid-cols-2 gap-6 lg:col-span-3 lg:grid-cols-1 lg:gap-10" data-stagger>
          <div class="reveal border-t border-forest/20 pt-5">
            <dd class="display text-5xl text-forest md:text-6xl">2022</dd>
            <dt class="mt-2 text-sm text-ink/60">Established in Nairobi, with operations also in Italy</dt>
          </div>
          <div class="reveal border-t border-forest/20 pt-5">
            <dd class="display text-5xl text-forest md:text-6xl"><span data-count="10">10</span><span class="text-leaf">+</span></dd>
            <dt class="mt-2 text-sm text-ink/60">Product lines of vegetables, fruits and herbs</dt>
          </div>
        </dl>

        <!-- photo -->
        <figure class="relative lg:col-span-4">
          <div class="aspect-[4/5] overflow-hidden rounded-[1.75rem] bg-forest" data-clip data-cursor="Zoom" @click="open({ type: 'lightbox', index: 0, items: gallery })">
            <img :src="asset('img/about/packhouse.jpg')" alt="The Premier Veg pack-house team at work" loading="lazy" class="h-full w-full cursor-zoom-in object-cover" />
          </div>
          <figcaption class="absolute bottom-4 left-4 rounded-full bg-forest/85 px-4 py-2 text-xs font-semibold text-cream backdrop-blur">The pack-house · Nairobi</figcaption>
        </figure>

        <!-- copy + accordion -->
        <div class="lg:col-span-5 lg:pl-6">
          <p class="text-lg text-ink/75" data-reveal>We work closely with farms located in tropical climatic regions, which provide ideal growing conditions throughout the year. This enables us to offer our clients a reliable, year-round supply of fresh, high-quality produce.</p>
          <ul class="mt-8 divide-y divide-forest/20 border-y border-forest/20" data-reveal>
            <li v-for="(f, i) in features" :key="f.t">
              <h3>
                <button class="flex w-full cursor-pointer items-center justify-between gap-4 py-4 text-left" :aria-expanded="openIdx === i" :aria-controls="'feat-' + i" @click="openIdx = openIdx === i ? -1 : i">
                  <span class="display text-xl md:text-2xl">{{ f.t }}</span>
                  <span class="grid h-9 w-9 shrink-0 place-items-center rounded-full transition-all duration-300" :class="openIdx === i ? 'rotate-45 bg-forest text-lime' : 'bg-white text-forest'" aria-hidden="true">+</span>
                </button>
              </h3>
              <div :id="'feat-' + i" class="grid transition-[grid-template-rows] duration-500 ease-out" :class="openIdx === i ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'">
                <p class="overflow-hidden text-sm leading-relaxed text-ink/70"><span class="block pb-5 pr-12">{{ f.d }}</span></p>
              </div>
            </li>
          </ul>
          <NuxtLink to="/about" class="btn btn-dark mt-8" data-magnetic>More about us <span aria-hidden="true">→</span></NuxtLink>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import { gallery } from '~/data'
const asset = useAsset(); const { open } = useModal()
const text = 'We connect Kenyan growers with international markets, with the highest standards of freshness, quality and consistency.'
const words = text.split(' ')
const features = [
  { t: 'Category 1 grading', d: 'Careful sorting and grading to meet Category 1 export standards, with quality checks to ensure freshness, size uniformity and appearance.' },
  { t: 'Temperature-controlled cold rooms', d: 'Temperature control cold rooms, proper ventilation and an efficient workflow allow produce to retain its quality and temperature during storage and transport.' },
  { t: 'Full traceability', d: 'The pack-house is designed to preserve freshness, reduce handling damage and ensure full traceability from farm to final market.' }
]
const openIdx = ref(0)
</script>
