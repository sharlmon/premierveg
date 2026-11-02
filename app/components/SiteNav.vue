<template>
  <header class="fixed inset-x-0 top-0 z-50 transition-all duration-500" :class="solid ? 'py-3' : 'py-6'">
    <nav class="mx-auto flex max-w-7xl items-center justify-between px-5 md:px-10" aria-label="Main">
      <NuxtLink to="/" class="flex items-center gap-3 whitespace-nowrap rounded-full py-1 pl-1 pr-4 text-cream backdrop-blur-md" :class="solid ? 'bg-forest/90' : 'bg-white/10'">
        <img :src="asset('img/logo.jpg')" alt="" class="h-9 w-9 rounded-full" />
        <span class="display text-lg">Premier Veg</span>
      </NuxtLink>
      <ul class="hidden items-center gap-1 rounded-full bg-forest/90 p-1.5 text-sm text-cream backdrop-blur-md lg:flex">
        <li v-for="l in links" :key="l.to"><NuxtLink :to="l.to" class="block rounded-full px-5 py-2.5 transition hover:bg-white/10" active-class="!bg-lime !text-forest">{{ l.label }}</NuxtLink></li>
      </ul>
      <NuxtLink to="/contact" class="btn btn-lime hidden whitespace-nowrap shadow-[0_0_0_2px_#0E2A1C] lg:inline-flex" data-magnetic>Request a quote <span aria-hidden="true">→</span></NuxtLink>
      <button class="rounded-full bg-forest/90 px-5 py-3 text-sm font-semibold text-cream lg:hidden" :aria-expanded="open" aria-controls="mobile-menu" @click="open = !open">{{ open ? 'Close' : 'Menu' }}</button>
    </nav>
    <div id="mobile-menu" v-show="open" class="mx-5 mt-3 rounded-3xl bg-forest p-6 text-cream lg:hidden">
      <NuxtLink v-for="l in links" :key="l.to" :to="l.to" class="display block border-b border-white/10 py-4 text-3xl" active-class="text-lime" @click="open = false">{{ l.label }}</NuxtLink>
      <NuxtLink to="/contact" class="btn btn-lime mt-6 w-full justify-center" @click="open = false">Request a quote</NuxtLink>
    </div>
  </header>
</template>
<script setup lang="ts">
const asset = useAsset()
const route = useRoute()
const open = ref(false); const scrolled = ref(false)
const solid = computed(() => scrolled.value || route.path !== '/')
const links = [{ to: '/about', label: 'About' }, { to: '/products', label: 'Products' }, { to: '/packages', label: 'Packages' }, { to: '/team', label: 'Team' }]
watch(() => route.path, () => (open.value = false))
onMounted(() => { const f = () => (scrolled.value = window.scrollY > 40); f(); window.addEventListener('scroll', f, { passive: true }) })
</script>
