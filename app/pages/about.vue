<template>
  <div>
    <section class="mx-auto max-w-7xl px-5 pb-28 pt-40 md:px-10 md:pb-36 md:pt-48">
      <div class="grid items-center gap-14 lg:grid-cols-12">
        <div class="lg:col-span-6">
          <p class="eyebrow mb-6 text-leaf" data-reveal>About Premier Veg Mondo</p>
          <h1 class="display text-4xl md:text-5xl lg:text-6xl" data-lines><span class="line-mask"><span class="line-inner">Connecting Kenyan</span></span><span class="line-mask"><span class="line-inner">growers with</span></span><span class="line-mask"><span class="line-inner italic text-leaf">international markets.</span></span></h1>
          <p class="mt-8 max-w-xl text-lg text-ink/75" data-reveal>Established in 2022 and based in Nairobi, with operations in Italy, Premier Veg Mondo Fresh works closely with farms in tropical climates that provide ideal growing conditions all year, giving our clients a reliable, year-round supply of fresh, high-quality produce.</p>
          <p class="mt-5 max-w-xl text-ink/70" data-reveal>We are committed to connecting Kenyan growers with international markets while maintaining the highest standards of freshness, quality and consistency.</p>
        </div>
        <div class="lg:col-span-6">
          <div class="aspect-[4/5] overflow-hidden rounded-[2rem] bg-forest" data-clip><img :src="asset('img/beans-tray.jpg')" alt="Tray of graded fine green beans" class="h-full w-full object-cover" /></div>
        </div>
      </div>
    </section>
    <section class="bg-cream pb-28 md:pb-36">
      <div class="mx-auto max-w-7xl px-5 md:px-10">
        <p class="eyebrow mb-6 text-leaf" data-reveal>The pack-house</p>
        <div class="grid gap-10 lg:grid-cols-12">
          <h2 class="display text-3xl md:text-4xl lg:col-span-5" data-lines><span class="line-mask"><span class="line-inner">Strict standards at</span></span><span class="line-mask"><span class="line-inner italic text-leaf">every stage.</span></span></h2>
          <div class="lg:col-span-7">
            <p class="text-lg text-ink/75" data-reveal>Our produce is handled and prepared at a fully equipped pack-house where quality and hygiene standards are maintained from arrival to dispatch.</p>
            <ul class="mt-8 grid gap-4 sm:grid-cols-2" data-stagger>
              <li v-for="f in facts" :key="f" class="reveal flex items-start gap-3 border-t border-forest/15 pt-4"><span class="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-lime text-[10px] text-forest">✓</span><span class="text-sm font-medium">{{ f }}</span></li>
            </ul>
          </div>
        </div>
        <figure class="mt-16 rounded-3xl bg-forest p-8 text-cream md:p-12" data-reveal>
          <blockquote class="display text-2xl md:text-4xl">“I trust ingredients from Premier Veg in my dishes.”</blockquote>
          <figcaption class="eyebrow mt-5 text-lime">Chef Karmani</figcaption>
        </figure>
      </div>
    </section>
    <ProcessSection />
    <CtaBand />
  </div>
</template>
<script setup lang="ts">
const asset = useAsset()
useHead({ title: 'About — Premier Veg', meta: [{ name: 'description', content: 'Premier Veg Mondo Fresh: Kenyan growers connected to international markets since 2022.' }] })
const facts = ['Careful sorting and grading to Category 1 export standard', 'Quality checks for freshness, size uniformity and appearance', 'Hygienic handling by trained staff following food-safety protocols', 'Temperature-controlled cold rooms and full traceability, farm to market']
onMounted(async () => { await nextTick(); usePageMotion() })
</script>
