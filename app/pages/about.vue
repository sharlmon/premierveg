<template>
  <div>
    <section class="mx-auto max-w-7xl px-5 pb-28 pt-40 md:px-10 md:pb-36 md:pt-48">
      <div class="grid items-center gap-14 lg:grid-cols-12">
        <div class="lg:col-span-7">
          <p class="eyebrow mb-6 text-leaf" data-reveal>About us · Premier Veg Mondo</p>
          <h1 class="display text-4xl md:text-5xl lg:text-6xl" data-lines><span class="line-mask"><span class="line-inner">Connecting Kenyan</span></span><span class="line-mask"><span class="line-inner">growers with</span></span><span class="line-mask"><span class="line-inner italic text-leaf">international markets.</span></span></h1>
          <p class="mt-8 max-w-xl text-lg text-ink/75" data-reveal>Established in 2022, Premier Veg Mondo Fresh is based in Nairobi, Kenya, with operations also in Italy. We work closely with farms located in tropical climatic regions, which provide ideal growing conditions throughout the year. This enables us to offer our clients a reliable, year-round supply of fresh, high-quality produce.</p>
          <p class="mt-5 max-w-xl text-ink/70" data-reveal>At Premier Veg, we are committed to connecting Kenyan growers with international markets while maintaining the highest standards of freshness, quality, and consistency.</p>
        </div>
        <div class="lg:col-span-5">
          <button class="group block w-full cursor-zoom-in overflow-hidden rounded-[2rem] bg-forest" data-cursor="Zoom" data-clip aria-label="View the pack-house photo larger" @click="open({ type: 'lightbox', index: 0, items: gallery })"><img :src="asset('img/about/packhouse.jpg')" alt="The Premier Veg pack-house team at work" class="aspect-[4/5] w-full object-cover transition-transform duration-700 group-hover:scale-105" /></button>
        </div>
      </div>
    </section>
    <section class="pb-28 md:pb-36">
      <div class="mx-auto max-w-7xl px-5 md:px-10">
        <p class="eyebrow mb-6 text-leaf" data-reveal>Packhouse</p>
        <div class="grid gap-10 lg:grid-cols-12">
          <h2 class="display text-3xl md:text-4xl lg:col-span-5" data-lines><span class="line-mask"><span class="line-inner">Strict quality and</span></span><span class="line-mask"><span class="line-inner italic text-leaf">hygiene standards.</span></span></h2>
          <div class="lg:col-span-7">
            <p class="text-lg text-ink/75" data-reveal>We have a pack-house team who packs the day-to-day orders. Our produce is handled and prepared at a fully equipped pack-house where strict quality and hygiene standards are maintained at every stage.</p>
            <p class="mt-6 font-semibold" data-reveal>From arrival to dispatch, all vegetables go through a controlled process that includes:</p>
            <ul class="mt-4 grid gap-4" data-stagger>
              <li v-for="f in facts" :key="f" class="reveal flex items-start gap-3 border-t border-forest/15 pt-4"><span class="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-lime text-xs text-forest">✓</span><span class="text-sm font-medium">{{ f }}</span></li>
            </ul>
            <p class="mt-8 text-ink/75" data-reveal>The pack-house is designed to preserve freshness, reduce handling damage, and ensure full traceability from farm to final market. Temperature control cold rooms, proper ventilation, and efficient workflow allow produce to retain its quality and temperatures during storage and transport.</p>
            <p class="mt-4 text-ink/75" data-reveal>By combining experienced personnel, standardized procedures, and consistent quality control, we ensure our customers receive produce that meets both local and international market requirements.</p>
          </div>
        </div>
      </div>
    </section>
    <section class="bg-cream pb-28 md:pb-36">
      <div class="mx-auto max-w-7xl px-5 md:px-10">
        <p class="eyebrow mb-6 text-leaf" data-reveal>What our clients say</p>
        <figure class="grid items-center gap-8 overflow-hidden rounded-[2rem] bg-forest text-cream md:grid-cols-5" data-reveal>
          <img :src="asset('img/about/chef-karmani.jpg')" alt="Chef Karmani" loading="lazy" class="h-full max-h-96 w-full object-cover md:col-span-2" />
          <div class="p-8 md:col-span-3 md:p-12">
            <blockquote class="display text-2xl md:text-4xl">“I trust ingredients from Premier Veg in my dishes.”</blockquote>
            <figcaption class="eyebrow mt-5 text-lime">Chef Karmani</figcaption>
          </div>
        </figure>
      </div>
    </section>
    <CertificationsSection />
    <JourneyPath />
    <GallerySection />
    <CtaBand />
  </div>
</template>
<script setup lang="ts">
import { gallery } from '~/data'
const asset = useAsset(); const { open } = useModal()
usePageSeo({ title: 'About — Premier Veg Mondo Fresh', description: 'Established in 2022 in Nairobi with operations in Italy, Premier Veg Mondo Fresh connects Kenyan growers with international markets. Category 1 grading and full traceability.', path: '/about/' })
const facts = ['Careful sorting and grading to meet Category 1 export standards;', 'Quality checks to ensure freshness, size uniformity, and appearance;', 'Hygienic handling by trained staff following food safety protocols.']
onMounted(async () => { await nextTick(); usePageMotion() })
</script>
