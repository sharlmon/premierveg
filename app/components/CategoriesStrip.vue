<template>
  <section class="mx-auto max-w-7xl px-5 py-28 md:px-10 md:py-36">
    <div class="flex flex-col justify-between gap-6 md:flex-row md:items-end">
      <h2 class="display text-4xl md:text-5xl lg:text-6xl" data-lines><span class="line-mask"><span class="line-inner">Vegetables, fruit</span></span><span class="line-mask"><span class="line-inner italic text-leaf">&amp; herbs.</span></span></h2>
      <NuxtLink to="/products" class="btn btn-dark" data-magnetic>View all products <span aria-hidden="true">→</span></NuxtLink>
    </div>
    <ul class="mt-14 grid gap-5 md:grid-cols-3" data-stagger>
      <li v-for="c in cats" :key="c.name" class="reveal">
        <NuxtLink to="/products" class="card-lift group relative flex min-h-[18rem] flex-col justify-between overflow-hidden rounded-3xl p-7 text-white" :style="{ background: c.color }">
          <div class="pointer-events-none absolute -right-12 -top-12 h-52 w-52 rounded-full bg-white/10 transition-transform duration-700 group-hover:scale-[2.4]" />
          <span class="eyebrow relative">{{ c.count }} lines</span>
          <div class="relative"><h3 class="display text-4xl">{{ c.name }}</h3><p class="mt-2 max-w-xs text-sm text-white/80">{{ c.items }}</p></div>
        </NuxtLink>
      </li>
    </ul>
  </section>
</template>
<script setup lang="ts">
const cats = [
  { name: 'Vegetables', count: 4, items: 'Haricot verts, mangetouts, sugar snaps, carrots', color: '#1F5B3A' },
  { name: 'Fruits', count: 3, items: 'Avocados, mangoes, passion fruits', color: '#C2410C' },
  { name: 'Herbs', count: 3, items: 'Chillies, rosemary, chives', color: '#7C2D3A' }
]
</script>
