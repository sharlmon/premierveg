<template>
  <section id="about" class="bg-[#DCE5DA]"><div class="mx-auto max-w-7xl px-5 py-24 md:px-10 md:py-36">
    <p class="mb-8 inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-xs font-semibold" data-reveal><span class="h-1.5 w-1.5 rounded-full bg-forest" /> About us</p>
    <p ref="para" class="display text-[clamp(1.6rem,3.4vw,3.2rem)] !leading-[1.08] tracking-tight" aria-label="Premier Veg Mondo connects Kenyan growers with international markets: Category 1 produce, sorted, graded and packed in a temperature-controlled pack-house, traceable from farm to final market.">
      <span v-for="(w, i) in words" :key="i" class="word inline-block" aria-hidden="true">{{ w }}&nbsp;</span>
    </p>
    <NuxtLink to="/about" class="btn btn-dark mt-10" data-magnetic>More about us <span aria-hidden="true">→</span></NuxtLink>
    <dl class="mt-20 grid grid-cols-2 gap-x-6 gap-y-10 border-t border-forest/20 pt-10 md:grid-cols-4" data-stagger>
      <div v-for="s in stats" :key="s.l" class="reveal">
        <dd class="display text-4xl text-forest md:text-6xl"><span v-if="s.count" :data-count="s.count">{{ s.count }}</span><span v-else>{{ s.v }}</span><span class="text-leaf">{{ s.suffix }}</span></dd>
        <dt class="eyebrow mt-3 text-ink/55">{{ s.l }}</dt>
      </div>
    </dl>
  </div></section>
</template>
<script setup lang="ts">
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
const text = 'Premier Veg Mondo Fresh connects Kenyan growers with international markets, with the highest standards of freshness, quality and consistency: Category 1 grading, temperature-controlled cold rooms and full traceability from farm to final market.'
const words = text.split(' ')
const stats = [
  { count: 2022, suffix: '', l: 'Established' },
  { count: 10, suffix: '+', l: 'Product lines' },
  { count: 365, suffix: '', l: 'Days of supply' },
  { v: 'Cat. 1', suffix: '', l: 'Export grade' }
]
const para = ref<HTMLElement>()
onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !para.value) return
  gsap.registerPlugin(ScrollTrigger)
  const w = para.value.querySelectorAll('.word')
  gsap.fromTo(w, { opacity: 0.15 }, { opacity: 1, stagger: 0.1, ease: 'none', scrollTrigger: { trigger: para.value, start: 'top 82%', end: 'bottom 45%', scrub: true } })
})
</script>
