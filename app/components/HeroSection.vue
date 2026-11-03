<template>
  <section id="top" class="bg-[#DCE5DA] p-2.5 sm:p-3">
    <div class="relative isolate h-[calc(100svh-1.25rem)] min-h-[40rem] overflow-hidden rounded-[1.75rem] bg-forest text-cream sm:h-[calc(100svh-1.5rem)] sm:rounded-[2.25rem]">
      <!-- photo -->
      <div class="absolute inset-0 -z-10 overflow-hidden" aria-hidden="true">
        <img v-for="(sl, i) in slides" :key="sl.src" :src="asset(sl.src)" :srcset="sl.small ? asset(sl.small) + ' 900w, ' + asset(sl.src) + ' 2000w' : undefined" sizes="100vw" :alt="''" class="hero-bg hero-slide absolute inset-0 h-full w-full object-cover" :class="[sl.pos, i === cur ? 'is-on' : '']" :fetchpriority="i === 0 ? 'high' : 'auto'" />
        <div class="absolute inset-0 bg-gradient-to-br from-forest/30 via-transparent to-forest/20" />
        <div class="absolute inset-0 bg-gradient-to-t from-forest/70 via-transparent to-forest/45" />
        <div class="absolute inset-0 bg-gradient-to-l from-forest/80 via-forest/30 to-transparent" />
      </div>

      <!-- interactive hexagons -->
      <div class="hero-fade absolute left-[3%] top-1/2 hidden w-[min(33rem,46vw)] -translate-y-[42%] md:block"><HexCluster /></div>

      <!-- headline (top right) -->
      <div class="absolute inset-x-5 top-28 md:inset-x-auto md:right-10 md:top-32 md:max-w-[min(46rem,56%)] md:text-right lg:top-36">
        <p class="hero-fade eyebrow mb-5 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-lime backdrop-blur"><span class="h-1.5 w-1.5 rounded-full bg-lime" /> Nairobi · Italy · Worldwide</p>
        <h1 class="display text-[clamp(2.7rem,5.6vw,5.4rem)]">
          <span class="line-mask"><span class="line-inner hero-line">As fresh</span></span>
          <span class="line-mask"><span class="line-inner hero-line">as it <em class="text-lime">gets.</em></span></span>
        </h1>
        <p class="hero-fade mt-6 max-w-md text-base text-cream md:ml-auto md:text-lg [text-shadow:0_1px_12px_rgba(7,24,15,.8)]">Trusted exporter of fresh fruits, vegetables and herbs. Whatever we grow, you receive it fresh.</p>
        <div class="hero-fade mt-7 flex flex-wrap gap-3 md:justify-end">
          <button class="btn btn-lime" data-magnetic @click="open({ type: 'quote' })">Request a quote <span aria-hidden="true">→</span></button>
        </div>
      </div>

      <!-- bottom-left stats -->
      <dl class="hero-fade absolute bottom-5 left-5 hidden gap-6 sm:flex rounded-2xl bg-forest/55 px-5 py-4 backdrop-blur-md md:bottom-8 md:left-8">
        <div><dt class="eyebrow text-cream/70">Since</dt><dd class="display text-2xl">2022</dd></div>
        <div><dt class="eyebrow text-cream/70">Products</dt><dd class="display text-2xl">10+</dd></div>
        <div class="hidden sm:block"><dt class="eyebrow text-cream/70">Supply</dt><dd class="display text-2xl">Year-round</dd></div>
      </dl>

      <!-- slide dots -->
      <div class="hero-fade absolute bottom-6 left-1/2 hidden -translate-x-1/2 items-center gap-2 sm:flex" role="group" aria-label="Hero photo">
        <button v-for="(sl, i) in slides" :key="sl.src" class="hit h-2 cursor-pointer rounded-full transition-all duration-500" :class="i === cur ? 'w-8 bg-lime' : 'w-2 bg-white/50 hover:bg-white'" :aria-label="'Show photo ' + (i + 1)" :aria-current="i === cur" @click="show(i)" />
      </div>

      <!-- bottom-right notched tab -->
      <NuxtLink to="/products" class="hero-fade tab-cta group absolute bottom-0 right-0 flex items-center gap-3 bg-forest py-4 pl-12 pr-6 text-sm font-semibold text-cream transition-colors hover:bg-leaf" data-cursor="Explore">
        <svg class="h-4 w-4 text-lime transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4 19 12 5l8 14H4z" transform="rotate(90 12 12)"/></svg>
        Explore our products
      </NuxtLink>
    </div>
  </section>
</template>
<script setup lang="ts">
const asset = useAsset(); const { open } = useModal()
const slides = [
  { src: 'img/hero-workers.webp', small: 'img/hero-workers-900.webp', pos: 'object-[50%_70%]' },
  { src: 'img/hero-workers-2.webp', pos: 'object-[50%_60%]' }
]
const cur = ref(0)
let timer: ReturnType<typeof setInterval> | undefined
const start = () => { stop(); if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return; timer = setInterval(() => { if (!document.documentElement.classList.contains('a11y-still')) cur.value = (cur.value + 1) % slides.length }, 7000) }
const stop = () => timer && clearInterval(timer)
const show = (i: number) => { cur.value = i; start() }
onMounted(start)
onBeforeUnmount(stop)
</script>
<style>
.hero-slide { opacity: 0; transition: opacity 1.4s ease; }
.hero-slide.is-on { opacity: 1; }
@media (prefers-reduced-motion: reduce) { .hero-slide { transition: none; } }
.tab-cta { clip-path: polygon(28px 0, 100% 0, 100% 100%, 0 100%); border-top-left-radius: 0; }
</style>
