<template>
  <section id="top" class="relative isolate min-h-[100svh] overflow-hidden bg-forest text-cream">
    <div class="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
      <img :src="asset('img/beans-bunch.jpg')" alt="" class="hero-bg absolute inset-x-0 -top-[8%] h-[118%] w-full object-cover" fetchpriority="high" />
      <div class="absolute inset-0 bg-gradient-to-r from-forest/90 via-forest/40 to-transparent" />
      <div class="absolute inset-0 bg-gradient-to-t from-forest/90 via-transparent to-forest/30" />
    </div>
    <div class="mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-end px-5 pb-10 pt-36 md:px-10 md:pb-14">
      <p class="hero-fade eyebrow mb-8 flex items-center gap-3 text-lime"><span class="h-px w-10 bg-lime" /> Premier Veg Mondo · Nairobi &amp; Italy</p>
      <h1 class="display text-[clamp(2.7rem,6.6vw,6rem)]">
        <span class="line-mask"><span class="line-inner hero-line">As fresh</span></span>
        <span class="line-mask"><span class="line-inner hero-line">as it <em class="text-lime">gets.</em></span></span>
      </h1>
      <div class="mt-10 grid items-end gap-10 md:mt-14 lg:grid-cols-12">
        <div class="lg:col-span-6">
          <p class="hero-fade max-w-lg text-lg text-cream/80">Trusted exporter of fresh fruits, vegetables and herbs. Whatever we grow, you receive it fresh.</p>
          <div class="hero-fade mt-8 flex flex-wrap gap-4">
            <button class="btn btn-lime" data-magnetic @click="open({ type: 'quote' })">Request a quote <span aria-hidden="true">→</span></button>
            <NuxtLink to="/products" class="btn btn-ghost" data-magnetic>See our products</NuxtLink>
          </div>
        </div>
        <div class="hero-fade hidden items-end justify-end gap-5 lg:col-span-6 lg:flex">
          <figure class="hero-card float mb-14 w-36 cursor-zoom-in overflow-hidden rounded-2xl border border-white/20 shadow-2xl">
            <img :src="asset('img/sugar-snaps.jpg')" alt="Tray of sugar snap peas" class="aspect-[3/4] w-full object-cover" />
            <figcaption class="eyebrow bg-forest px-4 py-3 text-lime">Sugar snaps</figcaption>
          </figure>
          <figure class="hero-card float mb-24 w-28 overflow-hidden rounded-2xl border border-white/20 shadow-2xl">
            <img :src="asset('img/snow-peas.jpg')" alt="Tray of snow peas" class="aspect-[3/4] w-full object-cover" />
            <figcaption class="eyebrow bg-forest px-4 py-3 text-lime">Snow peas</figcaption>
          </figure>
        </div>
      </div>
      <div class="hero-fade mt-12 flex items-center gap-3 text-xs uppercase tracking-[.22em] text-cream/60"><span class="relative h-10 w-px overflow-hidden bg-white/20"><span class="absolute inset-x-0 top-0 h-1/2 animate-[drop_1.8s_ease-in-out_infinite] bg-lime" /></span> Scroll</div>
    </div>
  </section>
</template>
<script setup lang="ts">const asset = useAsset(); const { open } = useModal()</script>
<style>@keyframes drop { 0% { transform: translateY(-100%) } 100% { transform: translateY(200%) } }</style>
