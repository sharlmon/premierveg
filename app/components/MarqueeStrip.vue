<template>
  <div class="overflow-hidden bg-lime py-5 text-forest" aria-hidden="true">
    <div class="marquee">
      <div v-for="n in 2" :key="n" class="flex shrink-0 items-center">
        <span v-for="p in items" :key="p + n" class="display flex items-center text-3xl md:text-5xl"><span class="px-8">{{ p }}</span><span class="text-xl">✺</span></span>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">import { products } from '~/data'; const items = products.map((p) => p.name)</script>
