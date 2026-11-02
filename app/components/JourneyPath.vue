<template>
  <section ref="root" class="overflow-hidden bg-white py-24 md:py-32">
    <div class="mx-auto max-w-7xl px-5 md:px-10">
      <p class="eyebrow mb-6 text-leaf" data-reveal>The journey</p>
      <h2 class="display max-w-2xl text-4xl md:text-5xl lg:text-6xl" data-lines><span class="line-mask"><span class="line-inner">From the farm</span></span><span class="line-mask"><span class="line-inner italic text-leaf">to final market.</span></span></h2>

      <div class="relative mt-12">
        <svg viewBox="0 0 1000 230" class="h-auto w-full" role="img" aria-label="Route from farm to market with four stages">
          <path ref="track" :d="d" fill="none" stroke="#0E2A1C" stroke-opacity=".12" stroke-width="3" stroke-linecap="round" stroke-dasharray="2 9" />
          <path ref="line" :d="d" fill="none" stroke="#1F5B3A" stroke-width="4" stroke-linecap="round" />
          <g v-for="(s, i) in pts" :key="i" :style="{ opacity: ready ? 1 : 0 }">
            <circle :cx="s.x" :cy="s.y" r="22" :fill="activeIdx >= i ? '#C6F04A' : '#fff'" :stroke="activeIdx >= i ? '#0E2A1C' : '#0E2A1C33'" stroke-width="3" style="transition: fill .4s, stroke .4s" />
            <text :x="s.x" :y="s.y + 6" text-anchor="middle" font-size="16" font-weight="700" fill="#0E2A1C">{{ i + 1 }}</text>
          </g>
          <g ref="mover" :style="{ opacity: ready ? 1 : 0 }"><circle r="11" fill="#0E2A1C" /><circle r="4.500" fill="#C6F04A" /></g>
        </svg>
      </div>

      <ol class="mt-10 grid gap-4 md:grid-cols-4">
        <li v-for="(s, i) in steps" :key="s.n" class="rounded-3xl border p-6 transition-all duration-500" :class="activeIdx >= i ? 'border-forest bg-forest text-cream' : 'border-forest/15 bg-cream text-ink'" @mouseenter="hint = i">
          <span class="display text-4xl" :class="activeIdx >= i ? 'text-lime' : 'text-forest/30'">{{ s.n }}</span>
          <h3 class="display mt-3 text-xl">{{ s.t }}</h3>
          <p class="mt-2 text-sm" :class="activeIdx >= i ? 'text-cream/70' : 'text-ink/60'">{{ s.d }}</p>
        </li>
      </ol>
    </div>
  </section>
</template>
<script setup lang="ts">
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { steps } from '~/data'
const d = 'M 30 175 C 170 20, 300 20, 365 105 S 560 215, 645 125 S 850 25, 970 80'
const root = ref<HTMLElement>(); const track = ref<SVGPathElement>(); const line = ref<SVGPathElement>(); const mover = ref<SVGGElement>()
const pts = ref<{ x: number; y: number; t: number }[]>(steps.map((_, i) => ({ x: -50, y: -50, t: i / (steps.length - 1) })))
const progress = ref(0); const ready = ref(false); const hint = ref(0)
const activeIdx = computed(() => pts.value.reduce((n, s, i) => (progress.value >= s.t - 0.02 ? i : n), -1))
let st: ScrollTrigger | undefined
onMounted(() => {
  const path = track.value!; const len = path.getTotalLength()
  pts.value = pts.value.map((s) => { const p = path.getPointAtLength(len * s.t); return { ...s, x: p.x, y: p.y } })
  const set = (p: number) => { progress.value = p; line.value!.style.strokeDashoffset = String(len * (1 - p)); const q = path.getPointAtLength(len * p); mover.value!.setAttribute('transform', `translate(${q.x} ${q.y})`) }
  line.value!.style.strokeDasharray = String(len)
  ready.value = true
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return set(1)
  set(0)
  gsap.registerPlugin(ScrollTrigger)
  st = ScrollTrigger.create({ trigger: root.value!, start: 'top 65%', end: 'bottom 75%', scrub: 0.5, onUpdate: (self) => set(self.progress) })
})
onBeforeUnmount(() => st?.kill())
</script>
