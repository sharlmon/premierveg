<template>
  <section class="bg-[#DCE5DA] p-2.5 sm:p-3">
    <div ref="box" class="grain relative overflow-hidden rounded-[1.75rem] bg-lime px-6 py-16 text-forest sm:rounded-[2.25rem] md:px-14 md:py-24" @pointermove="move" @pointerleave="leave">
      <!-- floating product tiles -->
      <div class="pointer-events-none absolute inset-0 hidden md:block" aria-hidden="true">
        <div v-for="(t, i) in tiles" :key="t.img" :ref="(el) => (els[i] = el as HTMLElement)" class="absolute grid place-items-center rounded-3xl bg-white p-3 shadow-2xl" :style="{ left: t.x, top: t.y, width: t.w + 'rem', height: t.w + 'rem', transform: `rotate(${t.r}deg)` }">
          <img :src="asset(t.img)" alt="" loading="lazy" class="h-full w-full object-contain" />
        </div>
      </div>
      <div class="relative mx-auto max-w-3xl text-center">
        <p class="mb-6 inline-flex items-center gap-2 rounded-full bg-forest px-4 py-2 text-xs font-semibold text-lime" data-reveal><span class="h-1.5 w-1.5 animate-pulse rounded-full bg-lime" /> Orders open · shipped as fast as processed</p>
        <h2 class="display text-5xl md:text-7xl" data-lines><span class="line-mask"><span class="line-inner">We are ready</span></span><span class="line-mask"><span class="line-inner italic">for orders!</span></span></h2>
        <p class="mx-auto mt-6 max-w-md text-forest/75" data-reveal>For all your inquiries, requests, orders and comments, Premier Veg is ready to converse with you today.</p>
        <div class="mt-9 flex flex-wrap justify-center gap-3" data-reveal>
          <button class="btn btn-dark" data-magnetic @click="open({ type: 'quote' })">Request a quote <span aria-hidden="true">→</span></button>
          <button class="btn !border !border-forest/40 hover:!bg-white/50" data-magnetic @click="copy">{{ done ? 'Email copied ✓' : 'Copy info@premierveg.com' }}</button>
        </div>
        <p class="mt-6 text-xs text-forest/70" data-reveal>or call <a href="tel:+393512151931" class="tap font-semibold underline underline-offset-4">+39 351 215 1931</a> · <NuxtLink to="/contact" class="tap font-semibold underline underline-offset-4">all contact details</NuxtLink></p>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import gsap from 'gsap'
const asset = useAsset(); const { open } = useModal()
const tiles = [
  { img: 'img/products/mangoes.webp', x: '4%', y: '14%', w: 8, r: -8, d: 22 },
  { img: 'img/packages/pcm001.webp', x: '14%', y: '58%', w: 9.5, r: 6, d: 34 },
  { img: 'img/products/avocados.webp', x: '84%', y: '12%', w: 8.5, r: 7, d: 28 },
  { img: 'img/products/haricot-verts.webp', x: '80%', y: '55%', w: 9, r: -6, d: 40 }
]
const els: HTMLElement[] = []; const box = ref<HTMLElement>()
const done = ref(false); let to: ReturnType<typeof setTimeout>
const ok = () => window.matchMedia('(pointer: fine)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches
const move = (e: PointerEvent) => {
  if (!ok()) return; const r = box.value!.getBoundingClientRect(); const nx = (e.clientX - r.left) / r.width - 0.5, ny = (e.clientY - r.top) / r.height - 0.5
  els.forEach((el, i) => el && gsap.to(el, { x: nx * -tiles[i].d * 2, y: ny * -tiles[i].d * 2, duration: 0.8, ease: 'power3.out', overwrite: 'auto' }))
}
const leave = () => els.forEach((el) => el && gsap.to(el, { x: 0, y: 0, duration: 1, ease: 'elastic.out(1,.5)', overwrite: 'auto' }))
const copy = async () => { try { await navigator.clipboard.writeText('info@premierveg.com') } catch { window.location.href = 'mailto:info@premierveg.com'; return } done.value = true; clearTimeout(to); to = setTimeout(() => (done.value = false), 1800) }
</script>
