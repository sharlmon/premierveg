<template>
  <footer class="bg-[#DCE5DA] p-2.5 sm:p-3">
    <div class="relative overflow-hidden rounded-[1.75rem] bg-forest text-cream sm:rounded-[2.25rem]">
      <div class="pointer-events-none absolute -right-32 -top-32 h-[26rem] w-[26rem] rounded-full bg-leaf/40 blur-3xl" />
      <div class="relative mx-auto max-w-7xl px-6 pt-12 md:px-12 md:pt-14">
        <div class="grid gap-9 lg:grid-cols-12 lg:gap-12">
          <div class="lg:col-span-5">
            <div class="flex items-center gap-3"><img :src="asset('img/logo.jpg')" alt="" class="h-12 w-12 rounded-full ring-2 ring-white/70" /><span class="display text-xl sm:text-2xl">Premier Veg Mondo Fresh</span></div>
            <p class="mt-5 max-w-sm text-cream/70">Trusted exporter of fresh fruits, vegetables and herbs. Whatever we grow, you receive it fresh.</p>
            <div class="mt-6 flex flex-wrap gap-3">
              <button class="btn btn-lime" data-magnetic @click="open({ type: 'quote' })">Request a quote <span aria-hidden="true">→</span></button>
              <button class="btn btn-ghost" @click="copy">{{ done ? 'Copied ✓' : 'Copy email' }}</button>
            </div>
          </div>
          <nav class="border-t border-white/10 pt-7 lg:col-span-4 lg:col-start-6 lg:border-0 lg:pt-0" aria-label="Footer"><p class="eyebrow mb-3 text-cream/70 lg:mb-5">Explore</p>
            <ul class="grid grid-cols-2 gap-x-6"><li v-for="l in links" :key="l.to"><NuxtLink :to="l.to" class="foot-link display py-1.5 text-[1.35rem]">{{ l.label }}</NuxtLink></li></ul>
          </nav>
          <div class="border-t border-white/10 pt-7 text-sm lg:col-span-3 lg:col-start-10 lg:border-0 lg:pt-0"><p class="eyebrow mb-4 text-cream/70 lg:mb-5">Contact</p>
            <p><a href="mailto:info@premierveg.com" class="tap hover:text-lime">info@premierveg.com</a></p>
            <p class="mt-2"><a href="tel:+393512151931" class="tap hover:text-lime">+39 351 215 1931</a></p>
            <p class="mt-2"><a :href="wa('Hello Premier Veg, I would like to enquire about your fresh produce.')" target="_blank" rel="noopener" class="hover:text-lime">WhatsApp ↗</a></p>
            <p class="mt-5 leading-relaxed text-cream/70">Premier Veg Mondo Fresh<br />Trystar Go Down, Airport North Road<br />P. O. Box 3468-00200, Nairobi, Kenya</p>
          </div>
        </div>

        <p class="wordmark display select-none whitespace-nowrap text-center mt-10 text-[12.4vw] leading-[.85] md:mt-4 lg:text-[8.5vw]" aria-hidden="true">Premier Veg</p>
      </div>
      <div class="relative border-t border-white/10">
        <div class="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 py-5 text-xs text-cream/70 sm:flex-row md:px-12">
          <p>© {{ new Date().getFullYear() }} Premier Veg Mondo Fresh. Nairobi, Kenya · Italy.</p>
          <button class="flex cursor-pointer items-center gap-2 font-semibold text-lime transition hover:gap-3" @click="top">Back to top <span class="grid h-8 w-8 place-items-center rounded-full bg-lime text-forest" aria-hidden="true">↑</span></button>
        </div>
      </div>
    </div>
  </footer>
</template>
<script setup lang="ts">
const asset = useAsset(); const { open } = useModal(); const { wa } = useSite()
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
