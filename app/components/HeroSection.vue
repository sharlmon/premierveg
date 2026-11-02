<template>
  <section id="top" class="bg-[#DCE5DA] p-2.5 sm:p-3">
    <div class="relative isolate h-[calc(100svh-1.25rem)] min-h-[40rem] overflow-hidden rounded-[1.75rem] bg-forest text-cream sm:h-[calc(100svh-1.5rem)] sm:rounded-[2.25rem]">
      <!-- photo -->
      <div class="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <img :src="asset('img/beans-bunch.jpg')" alt="" class="hero-bg absolute inset-x-0 -top-[8%] h-[118%] w-full object-cover" fetchpriority="high" />
        <div class="absolute inset-0 bg-gradient-to-br from-leaf/55 via-forest/15 to-forest/55" />
        <div class="absolute inset-0 bg-gradient-to-t from-forest/80 via-transparent to-forest/30" />
      </div>

      <!-- interactive hexagons -->
      <div class="hero-fade absolute left-[3%] top-1/2 hidden w-[min(33rem,46vw)] -translate-y-[42%] md:block"><HexCluster /></div>

      <!-- headline (top right) -->
      <div class="absolute inset-x-5 top-28 md:inset-x-auto md:right-10 md:top-32 md:max-w-[min(46rem,56%)] md:text-right lg:top-36">
        <p class="hero-fade eyebrow mb-5 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-lime backdrop-blur"><span class="h-1.5 w-1.5 rounded-full bg-lime" /> Nairobi · Italy · Worldwide</p>
        <h1 class="display text-[clamp(2.7rem,5.6vw,5.4rem)]">
          <span class="line-mask"><span class="line-inner hero-line">As fresh</span></span>
          <span class="line-mask"><span class="line-inner hero-line">as it <em class="text-lime">gets.</em></span></span>
        </h1>
        <p class="hero-fade mt-6 max-w-md text-base text-cream/85 md:ml-auto md:text-lg">Trusted exporter of fresh fruits, vegetables and herbs. Whatever we grow, you receive it fresh.</p>
        <div class="hero-fade mt-7 flex flex-wrap gap-3 md:justify-end">
          <button class="btn btn-lime" data-magnetic @click="open({ type: 'quote' })">Request a quote <span aria-hidden="true">→</span></button>
        </div>
      </div>

      <!-- bottom-left stats -->
      <dl class="hero-fade absolute bottom-5 left-5 hidden gap-6 sm:flex rounded-2xl bg-forest/55 px-5 py-4 backdrop-blur-md md:bottom-8 md:left-8">
        <div><dt class="eyebrow text-cream/55">Since</dt><dd class="display text-2xl">2022</dd></div>
        <div><dt class="eyebrow text-cream/55">Products</dt><dd class="display text-2xl">10+</dd></div>
        <div class="hidden sm:block"><dt class="eyebrow text-cream/55">Supply</dt><dd class="display text-2xl">Year-round</dd></div>
      </dl>

      <!-- bottom-right notched tab -->
      <NuxtLink to="/products" class="hero-fade tab-cta group absolute bottom-0 right-0 flex items-center gap-3 bg-forest py-4 pl-12 pr-6 text-sm font-semibold text-cream transition-colors hover:bg-leaf" data-cursor="Explore">
        <svg class="h-4 w-4 text-lime transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4 19 12 5l8 14H4z" transform="rotate(90 12 12)"/></svg>
        Explore our products
      </NuxtLink>
    </div>
  </section>
</template>
<script setup lang="ts">const asset = useAsset(); const { open } = useModal()</script>
<style>
.tab-cta { clip-path: polygon(28px 0, 100% 0, 100% 100%, 0 100%); border-top-left-radius: 0; }
</style>
