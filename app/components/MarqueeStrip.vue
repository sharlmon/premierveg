<template>
  <section class="relative overflow-hidden py-10 md:py-14" style="background: linear-gradient(#DCE5DA 50%, #0E2A1C 50%)" aria-label="Our products" @mouseenter="paused = true" @mouseleave="paused = false" @focusin="paused = true" @focusout="paused = false">
    <div class="relative h-[8.5rem] md:h-[10.5rem]">
      <!-- back ribbon -->
      <div class="absolute inset-x-[-6%] top-1/2 -translate-y-1/2 rotate-[1.7deg] overflow-hidden bg-lime py-4 text-forest shadow-xl md:py-5">
        <div :ref="(el) => (tracks[0] = el as HTMLElement)" class="flex w-max will-change-transform">
          <template v-for="n in 2" :key="n"><button v-for="p in items" :key="p.code + n" class="rib" :aria-hidden="n === 2" :tabindex="n === 2 ? -1 : 0" @click="open({ type: 'product', item: p })"><span class="rib-dot" :style="{ background: '#fff', boxShadow: 'inset 0 0 0 3px ' + p.color }"><img :src="asset(p.img)" alt="" loading="lazy" class="h-full w-full object-contain" /></span><span>{{ p.name }}</span><i class="rib-sep" aria-hidden="true">✺</i></button></template>
        </div>
      </div>
      <!-- front ribbon -->
      <div class="absolute inset-x-[-6%] top-1/2 -translate-y-1/2 -rotate-[1.7deg] overflow-hidden border-y-2 border-lime bg-forest py-4 text-cream shadow-2xl md:py-5">
        <div :ref="(el) => (tracks[1] = el as HTMLElement)" class="flex w-max will-change-transform">
          <template v-for="n in 2" :key="n"><button v-for="p in front" :key="p.code + n" class="rib" :aria-hidden="n === 2" :tabindex="n === 2 ? -1 : 0" @click="open({ type: 'product', item: p })"><span class="rib-dot" :style="{ background: '#fff', boxShadow: 'inset 0 0 0 3px ' + p.color }"><img :src="asset(p.img)" alt="" loading="lazy" class="h-full w-full object-contain" /></span><span>{{ p.name }}</span><i class="rib-sep text-lime" aria-hidden="true">✦</i></button></template>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import gsap from 'gsap'
import { products } from '~/data'
const asset = useAsset(); const { open } = useModal()
const items = products
const front = [...products].reverse()
const tracks: HTMLElement[] = []
const paused = ref(false)
let tick: gsap.TickerCallback | undefined
onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  const dirs = [1, -1] // back ribbon drifts right, front ribbon left
  const pos = [0, 0]
  const half = (el: HTMLElement) => el.scrollWidth / 2
  pos[0] = -half(tracks[0])
  tick = (_t, dt) => {
    const boost = 1
    const step = paused.value ? 0 : (dt / 1000) * 60 * boost
    tracks.forEach((el, i) => {
      if (!el) return
      const h = half(el); pos[i] += dirs[i] * step
      if (dirs[i] > 0 && pos[i] >= 0) pos[i] -= h
      if (dirs[i] < 0 && pos[i] <= -h) pos[i] += h
      el.style.transform = `translate3d(${pos[i].toFixed(1)}px,0,0)`
    })
  }
  gsap.ticker.add(tick)
})
onBeforeUnmount(() => tick && gsap.ticker.remove(tick))
</script>
<style>
.rib { display: flex; flex-shrink: 0; cursor: pointer; align-items: center; gap: .85rem; padding: 0 1.1rem; font-size: .9rem; font-weight: 700; letter-spacing: .2em; text-transform: uppercase; white-space: nowrap; transition: opacity .2s, transform .3s; }
.rib:hover { transform: scale(1.06); }
.rib-dot { display: grid; height: 2.75rem; width: 2.75rem; place-items: center; overflow: hidden; border-radius: 9999px; padding: .35rem; }
.rib-sep { font-style: normal; font-size: 1rem; opacity: .7; margin-left: .6rem; }
@media (min-width: 768px) { .rib { font-size: 1.05rem; } .rib-dot { height: 3.25rem; width: 3.25rem; } }
@media (prefers-reduced-motion: reduce) { section[aria-label="Our products"] .flex.w-max { transform: none; } }
</style>
