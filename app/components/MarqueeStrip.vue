<template>
  <div class="overflow-hidden bg-lime py-5 text-forest" aria-hidden="true">
    <div ref="inner" class="will-change-transform">
      <div class="marquee">
        <div v-for="n in 2" :key="n" class="flex shrink-0 items-center">
          <span v-for="p in items" :key="p + n" class="display flex items-center text-3xl md:text-5xl"><span class="px-8">{{ p }}</span><span class="text-xl">✺</span></span>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import gsap from 'gsap'
import { products } from '~/data'
const items = products.map((p) => p.name)
const inner = ref<HTMLElement>()
let tick: gsap.TickerCallback | undefined
onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  let skew = 0
  tick = () => {
    const v = (window as any).__lenis?.velocity || 0
    skew += (gsap.utils.clamp(-9, 9, v * -0.35) - skew) * 0.12
    if (inner.value) inner.value.style.transform = `skewX(${skew.toFixed(2)}deg)`
  }
  gsap.ticker.add(tick)
})
onBeforeUnmount(() => tick && gsap.ticker.remove(tick))
</script>
