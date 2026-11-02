<template>
  <section class="mx-auto max-w-7xl px-5 py-28 md:px-10 md:py-36">
    <div class="flex flex-col justify-between gap-6 md:flex-row md:items-end">
      <h2 class="display text-4xl md:text-5xl lg:text-6xl" data-lines><span class="line-mask"><span class="line-inner">Vegetables, fruits</span></span><span class="line-mask"><span class="line-inner italic text-leaf">&amp; herbs.</span></span></h2>
      <NuxtLink to="/products" class="btn btn-dark" data-magnetic>View all products <span aria-hidden="true">→</span></NuxtLink>
    </div>
    <ul class="mt-14 grid gap-5 md:grid-cols-3" data-stagger>
      <li v-for="c in categories" :key="c.name" class="reveal">
        <NuxtLink :to="{ path: '/products', query: { cat: c.name } }" class="card-lift group relative flex min-h-[26rem] flex-col justify-between overflow-hidden rounded-3xl p-7 text-white" :style="{ background: c.color }">
          <div class="pointer-events-none absolute -right-12 -top-12 h-52 w-52 rounded-full bg-white/10 transition-transform duration-700 group-hover:scale-[2.4]" />
          <div class="relative h-44">
            <img :src="asset(c.imgs[0])" alt="" loading="lazy" class="absolute left-0 top-4 h-32 w-40 -rotate-6 object-contain transition-transform duration-500 group-hover:-translate-x-2 group-hover:-rotate-12" />
            <img :src="asset(c.imgs[1])" alt="" loading="lazy" class="absolute left-1/3 top-0 h-36 w-44 object-contain drop-shadow-xl transition-transform duration-500 group-hover:-translate-y-2" />
            <img :src="asset(c.imgs[2])" alt="" loading="lazy" class="absolute right-0 top-6 h-32 w-40 rotate-6 object-contain transition-transform duration-500 group-hover:translate-x-2 group-hover:rotate-12" />
          </div>
          <div class="relative"><h3 class="display text-4xl">{{ c.name }}</h3><p class="mt-2 max-w-xs text-sm text-white/85">{{ c.blurb }}</p><span class="eyebrow mt-5 inline-block">Explore →</span></div>
        </NuxtLink>
      </li>
    </ul>
  </section>
</template>
<script setup lang="ts">import { categories } from '~/data'; const asset = useAsset()</script>
