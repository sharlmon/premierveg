<template>
  <header class="fixed inset-x-0 top-0 z-50 transition-all duration-500" :class="scrolled ? 'py-3' : 'py-6'">
    <nav class="mx-auto flex max-w-7xl items-center justify-between px-5 md:px-10" aria-label="Main">
      <a href="#top" class="flex items-center gap-3 rounded-full py-1 pl-1 pr-4 backdrop-blur-md" :class="scrolled ? 'bg-forest/85 text-cream' : 'bg-white/10 text-cream'">
        <img :src="asset('img/logo.png')" alt="" class="h-9 w-9 rounded-full" />
        <span class="display text-lg">Premier Veg</span>
      </a>
      <ul class="hidden items-center gap-1 rounded-full bg-forest/85 p-1.5 text-sm text-cream backdrop-blur-md md:flex">
        <li v-for="l in links" :key="l.href"><a :href="l.href" class="block rounded-full px-5 py-2.5 transition hover:bg-white/10">{{ l.label }}</a></li>
      </ul>
      <a href="#contact" class="btn btn-lime hidden md:inline-flex" data-magnetic>Request a quote <span aria-hidden="true">→</span></a>
      <button class="rounded-full bg-forest/90 px-5 py-3 text-sm font-semibold text-cream md:hidden" :aria-expanded="open" aria-controls="mobile-menu" @click="open = !open">{{ open ? 'Close' : 'Menu' }}</button>
    </nav>
    <div id="mobile-menu" v-show="open" class="mx-5 mt-3 rounded-3xl bg-forest p-6 text-cream md:hidden">
      <a v-for="l in links" :key="l.href" :href="l.href" class="display block border-b border-white/10 py-4 text-3xl" @click="open = false">{{ l.label }}</a>
      <a href="#contact" class="btn btn-lime mt-6 w-full justify-center" @click="open = false">Request a quote</a>
    </div>
  </header>
</template>
<script setup lang="ts">
const asset = useAsset()
const open = ref(false); const scrolled = ref(false)
const links = [{ href: '#about', label: 'About' }, { href: '#products', label: 'Products' }, { href: '#process', label: 'Process' }, { href: '#packages', label: 'Packages' }, { href: '#team', label: 'Team' }]
onMounted(() => { const f = () => (scrolled.value = window.scrollY > 40); f(); window.addEventListener('scroll', f, { passive: true }) })
</script>
