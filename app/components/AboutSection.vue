<template>
  <section id="about" class="mx-auto max-w-7xl px-5 py-28 md:px-10 md:py-40">
    <div class="grid gap-16 lg:grid-cols-12">
      <div class="lg:col-span-6">
        <p class="eyebrow mb-6 text-leaf" data-reveal>About Premier Veg Mondo</p>
        <h2 class="display text-5xl md:text-7xl" data-lines>
          <span class="line-mask"><span class="line-inner">Connecting Kenyan</span></span>
          <span class="line-mask"><span class="line-inner">growers with</span></span>
          <span class="line-mask"><span class="line-inner italic text-leaf">international markets.</span></span>
        </h2>
        <p class="mt-10 max-w-xl text-lg text-ink/75" data-reveal>Established in 2022 and based in Nairobi, with operations in Italy, we work closely with farms in tropical climates that provide ideal growing conditions all year. The result: reliable, high-quality produce, consistently.</p>
        <div class="mt-12 grid max-w-xl grid-cols-2 gap-6" data-stagger>
          <div v-for="f in facts" :key="f" class="reveal flex items-start gap-3 border-t border-forest/15 pt-4"><span class="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-lime text-[10px] text-forest">✓</span><span class="text-sm font-medium">{{ f }}</span></div>
        </div>
      </div>
      <div class="relative lg:col-span-6">
        <div class="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] bg-forest" data-clip>
          <img :src="asset('img/passion-framed-narrow.png')" alt="Passion fruit, one of Premier Veg's export lines" class="h-full w-full object-cover" />
        </div>
        <figure class="absolute -bottom-10 -left-4 max-w-xs rounded-3xl bg-forest p-7 text-cream shadow-2xl md:-left-12" data-reveal>
          <blockquote class="display text-2xl leading-tight">“I trust ingredients from Premier Veg in my dishes.”</blockquote>
          <figcaption class="eyebrow mt-4 text-lime">Chef Karmani</figcaption>
        </figure>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
const asset = useAsset()
const facts = ['Category 1 export grading', 'Temperature-controlled cold rooms', 'Hygienic, trained pack-house team', 'Full farm-to-market traceability']
</script>
