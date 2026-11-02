<template>
  <footer class="bg-ink pb-24 text-cream sm:pb-28">
    <div class="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-12 md:px-10">
      <div class="md:col-span-5">
        <div class="flex items-center gap-3"><img :src="asset('img/logo.jpg')" alt="" class="h-10 w-10 rounded-full" /><span class="display text-xl">Premier Veg Mondo Fresh</span></div>
        <p class="mt-4 max-w-xs text-sm text-cream/55">Fresh fruit, vegetables and herbs from Kenya. As fresh as it gets.</p>
      </div>
      <nav class="md:col-span-3" aria-label="Footer"><p class="eyebrow mb-4 text-cream/45">Explore</p>
        <ul class="space-y-2 text-sm"><li v-for="l in links" :key="l.to"><NuxtLink :to="l.to" class="hover:text-lime">{{ l.label }}</NuxtLink></li></ul>
      </nav>
      <div class="text-sm md:col-span-4"><p class="eyebrow mb-4 text-cream/45">Contact</p>
        <p><a href="mailto:info@premierveg.com" class="hover:text-lime">info@premierveg.com</a></p>
        <p class="mt-1"><a href="tel:+393512151931" class="hover:text-lime">+39 351 215 1931</a></p>
        <p class="mt-3 text-cream/55">P. O. Box 3468-00200, Kileleshwa Birchwoods, Nairobi, Kenya</p>
      </div>
    </div>
    <div class="border-t border-white/10"><p class="mx-auto max-w-7xl px-5 py-5 text-xs text-cream/45 md:px-10">© {{ new Date().getFullYear() }} Premier Veg. Nairobi, Kenya · Italy.</p></div>
  </footer>
</template>
<script setup lang="ts">
const asset = useAsset()
const links = [{ to: '/', label: 'Home' }, { to: '/about', label: 'About' }, { to: '/products', label: 'Products' }, { to: '/packages', label: 'Packages' }, { to: '/team', label: 'Team' }, { to: '/contact', label: 'Contact' }]
</script>
