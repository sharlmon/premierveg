<template>
  <section class="mx-auto max-w-7xl px-5 py-28 md:px-10 md:py-36">
    <div class="flex flex-col justify-between gap-6 md:flex-row md:items-end">
      <h2 class="display text-4xl md:text-5xl lg:text-6xl" data-lines><span class="line-mask"><span class="line-inner">Vegetables, fruits</span></span><span class="line-mask"><span class="line-inner italic text-leaf">&amp; herbs.</span></span></h2>
      <NuxtLink to="/products" class="btn btn-dark" data-magnetic>View all products <span aria-hidden="true">→</span></NuxtLink>
    </div>
    <ul class="mt-14 grid gap-5 md:grid-cols-3" data-stagger>
      <li v-for="c in categories" :key="c.name" class="reveal">
        <NuxtLink :to="{ path: '/products', query: { cat: c.name } }" class="card-lift group flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-[0_18px_40px_-24px_rgba(14,42,28,.45)] ring-1 ring-forest/10">
          <div class="relative h-56 bg-white">
            <img :src="asset(c.imgs[0])" alt="" loading="lazy" class="absolute left-2 top-10 h-36 w-40 -rotate-6 object-contain transition-transform duration-500 group-hover:-translate-x-2 group-hover:-rotate-12" />
            <img :src="asset(c.imgs[1])" alt="" loading="lazy" class="absolute left-1/3 top-5 h-40 w-44 object-contain transition-transform duration-500 group-hover:-translate-y-2" />
            <img :src="asset(c.imgs[2])" alt="" loading="lazy" class="absolute right-2 top-10 h-36 w-40 rotate-6 object-contain transition-transform duration-500 group-hover:translate-x-2 group-hover:rotate-12" />
          </div>
          <div class="flex-1 p-7 text-white" :style="{ background: c.color }"><h3 class="display text-4xl">{{ c.name }}</h3><p class="mt-2 max-w-xs text-sm text-white/85">{{ c.blurb }}</p><span class="eyebrow mt-5 inline-block">Explore <span class="inline-block transition-transform group-hover:translate-x-1">→</span></span></div>
        </NuxtLink>
      </li>
    </ul>
  </section>
</template>
<script setup lang="ts">import { categories } from '~/data'; const asset = useAsset()</script>
