<template>
  <footer class="bg-[#DCE5DA] p-2.5 sm:p-3">
    <div class="relative overflow-hidden rounded-[1.75rem] bg-forest text-cream sm:rounded-[2.25rem]">
      <div class="pointer-events-none absolute -right-32 -top-32 h-[26rem] w-[26rem] rounded-full bg-leaf/40 blur-3xl" />
      <div class="relative mx-auto max-w-7xl px-6 pt-16 md:px-12 md:pt-20">
        <div class="grid gap-12 lg:grid-cols-12">
          <div class="lg:col-span-5">
            <div class="flex items-center gap-3"><img :src="asset('img/logo.jpg')" alt="" class="h-12 w-12 rounded-full ring-2 ring-white/70" /><span class="display text-2xl">Premier Veg Mondo Fresh</span></div>
            <p class="mt-5 max-w-sm text-cream/65">Trusted exporter of fresh fruits, vegetables and herbs. Whatever we grow, you receive it fresh.</p>
            <div class="mt-7 flex flex-wrap gap-3">
              <button class="btn btn-lime" data-magnetic @click="open({ type: 'quote' })">Request a quote <span aria-hidden="true">→</span></button>
              <button class="btn btn-ghost" @click="copy">{{ done ? 'Copied ✓' : 'Copy email' }}</button>
            </div>
          </div>
          <nav class="lg:col-span-3 lg:col-start-7" aria-label="Footer"><p class="eyebrow mb-5 text-cream/45">Explore</p>
            <ul class="space-y-2.5"><li v-for="l in links" :key="l.to"><NuxtLink :to="l.to" class="foot-link display text-2xl">{{ l.label }}</NuxtLink></li></ul>
          </nav>
          <div class="text-sm lg:col-span-3"><p class="eyebrow mb-5 text-cream/45">Contact</p>
            <p><a href="mailto:info@premierveg.com" class="hover:text-lime">info@premierveg.com</a></p>
            <p class="mt-2"><a href="tel:+393512151931" class="hover:text-lime">+39 351 215 1931</a></p>
            <p class="mt-4 leading-relaxed text-cream/60">Premier Veg Mondo Fresh<br />P. O. Box 3468-00200, Kileleshwa Birchwoods<br />Nairobi, Kenya</p>
          </div>
        </div>

        <p class="wordmark display select-none whitespace-nowrap text-center text-[12.4vw] leading-[.85] md:mt-6" aria-hidden="true">Premier Veg</p>
      </div>
      <div class="relative border-t border-white/10">
        <div class="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-5 text-xs text-cream/50 sm:flex-row md:px-12">
          <p>© {{ new Date().getFullYear() }} Premier Veg Mondo Fresh. Nairobi, Kenya · Italy.</p>
          <button class="flex cursor-pointer items-center gap-2 font-semibold text-lime transition hover:gap-3" @click="top">Back to top <span class="grid h-8 w-8 place-items-center rounded-full bg-lime text-forest" aria-hidden="true">↑</span></button>
        </div>
      </div>
    </div>
  </footer>
</template>
<script setup lang="ts">
const asset = useAsset(); const { open } = useModal()
const links = [{ to: '/', label: 'Home' }, { to: '/products', label: 'Products' }, { to: '/packages', label: 'Packages' }, { to: '/about', label: 'About' }, { to: '/team', label: 'Team' }, { to: '/contact', label: 'Contact' }]
const done = ref(false); let t: ReturnType<typeof setTimeout>
const copy = async () => { try { await navigator.clipboard.writeText('info@premierveg.com') } catch { window.location.href = 'mailto:info@premierveg.com'; return } done.value = true; clearTimeout(t); t = setTimeout(() => (done.value = false), 1800) }
const top = () => window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })
</script>
<style>
.foot-link { display: inline-block; transition: transform .3s, color .3s; }
.foot-link:hover { transform: translateX(8px); color: #C6F04A; }
.wordmark { background: linear-gradient(180deg, rgba(198,240,74,.9), rgba(198,240,74,.08) 85%); -webkit-background-clip: text; background-clip: text; color: transparent; transition: filter .4s; }
.wordmark:hover { filter: brightness(1.25); }
</style>
