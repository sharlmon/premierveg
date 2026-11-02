<template>
  <footer class="bg-ink text-cream">
    <div class="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-10 text-sm md:flex-row md:items-center md:justify-between md:px-10">
      <div class="flex items-center gap-3"><img :src="asset('img/logo.jpg')" alt="" class="h-9 w-9 rounded-full" /><span class="display text-xl">Premier Veg Mondo Fresh</span></div>
      <p class="text-cream/55">© {{ new Date().getFullYear() }} Premier Veg. Nairobi, Kenya · Italy.</p>
      <a href="#top" class="font-semibold text-lime hover:underline">Back to top ↑</a>
    </div>
  </footer>
</template>
<script setup lang="ts">const asset = useAsset()</script>
