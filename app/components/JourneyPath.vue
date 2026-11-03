<template>
  <section ref="root" class="bg-white py-24 md:py-32">
    <div class="mx-auto max-w-7xl px-5 md:px-10">
      <div class="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <p class="mb-6 inline-flex items-center gap-2 rounded-full bg-[#DCE5DA] px-4 py-2 text-xs font-semibold" data-reveal><span class="h-1.5 w-1.5 rounded-full bg-forest" /> The journey</p>
          <h2 class="display text-4xl md:text-5xl lg:text-6xl" data-lines><span class="line-mask"><span class="line-inner">From the farm</span></span><span class="line-mask"><span class="line-inner italic text-leaf">to final market.</span></span></h2>
        </div>
        <div class="flex gap-2">
          <button class="jn-btn" aria-label="Previous stage" @click="go(sel - 1)">←</button>
          <button class="jn-btn" aria-label="Next stage" @click="go(sel + 1)">→</button>
        </div>
      </div>

      <!-- stepper -->
      <ol class="relative mt-14 grid grid-cols-4 gap-2" role="tablist" aria-label="Journey stages">
        <span class="absolute left-[12.5%] right-[12.5%] top-[1.65rem] h-[3px] rounded-full bg-forest/10" aria-hidden="true" />
        <span class="absolute left-[12.5%] top-[1.65rem] h-[3px] rounded-full bg-leaf transition-[width] duration-700 ease-out" :style="{ width: (sel / (steps.length - 1)) * 75 + '%' }" aria-hidden="true" />
        <li v-for="(s, i) in steps" :key="s.n" class="relative flex flex-col items-center text-center">
          <button role="tab" :aria-selected="sel === i" :aria-label="'Stage ' + s.n + ': ' + s.t" class="relative z-10 grid h-14 w-14 cursor-pointer place-items-center rounded-full border-[3px] text-sm font-bold transition-all duration-500 hover:scale-110" :class="i <= sel ? 'border-forest bg-lime text-forest' : 'border-forest/20 bg-white text-forest/70'" :style="sel === i ? 'box-shadow:0 0 0 8px rgba(198,240,74,.35)' : ''" @click="go(i)">{{ s.n }}</button>
          <span class="mt-3 hidden max-w-[10rem] text-sm font-semibold transition-colors md:block" :class="sel === i ? 'text-forest' : 'text-forest/70'">{{ s.t }}</span>
        </li>
      </ol>

      <!-- stage panel -->
      <div class="mt-10 grid overflow-hidden rounded-[2rem] bg-forest text-cream shadow-2xl lg:grid-cols-2" role="tabpanel" aria-live="polite">
        <div class="relative min-h-[16rem] sm:min-h-[22rem]" :class="stages[sel].contain ? 'bg-white' : 'bg-leaf'">
          <img v-for="(st, i) in stages" :key="st.img" :src="asset(st.img)" :alt="st.alt" loading="lazy" class="jn-img absolute inset-0 h-full w-full" :class="[i === sel ? 'is-on' : '', st.contain ? 'object-contain p-8' : 'object-cover']" />
          <span class="eyebrow absolute left-5 top-5 rounded-full bg-forest/85 px-3 py-1.5 text-lime backdrop-blur">Stage {{ steps[sel].n }} / 0{{ steps.length }}</span>
        </div>
        <div class="flex flex-col justify-center p-8 md:p-12">
          <span class="display text-7xl text-lime/90">{{ steps[sel].n }}</span>
          <h3 :key="sel" class="display jn-text mt-3 text-3xl md:text-4xl">{{ steps[sel].t }}</h3>
          <p :key="'p' + sel" class="jn-text mt-4 max-w-md text-cream/75">{{ steps[sel].d }}</p>
          <div class="mt-8 flex items-center gap-3">
            <button v-if="sel < steps.length - 1" class="btn btn-lime" @click="go(sel + 1)">Next stage <span aria-hidden="true">→</span></button>
            <button v-else class="btn btn-lime" @click="open({ type: 'quote' })">Request a quote <span aria-hidden="true">→</span></button>
            <button v-if="sel > 0" class="btn btn-ghost" @click="go(0)">Start over</button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import { steps } from '~/data'
const asset = useAsset(); const { open } = useModal()
const stages = [
  { img: 'img/beans-bunch.webp', alt: 'Freshly harvested haricot verts' },
  { img: 'img/beans-tray.webp', alt: 'Graded fine green beans in a tray' },
  { img: 'img/about/packhouse.jpg', alt: 'The Premier Veg pack-house team' },
  { img: 'img/packages/cxf001-carton.png', alt: 'Export carton, 12 × 250 g', contain: true }
]
const sel = ref(0)
const root = ref<HTMLElement>()
const { arm } = useAutoplay(root, () => go(sel.value + 1), 5500)
watch(sel, arm)
const go = (i: number) => { sel.value = (i + steps.length) % steps.length }
</script>
<style>
.jn-btn { display: grid; height: 3rem; width: 3rem; cursor: pointer; place-items: center; border-radius: 9999px; border: 1px solid rgba(14,42,28,.25); transition: background .2s, color .2s, transform .2s; }
.jn-btn:hover { background: #0E2A1C; color: #C6F04A; transform: scale(1.08); }
.jn-img { opacity: 0; transform: scale(1.06); transition: opacity .6s, transform 1s cubic-bezier(.2,.8,.2,1); }
.jn-img.is-on { opacity: 1; transform: scale(1); }
.jn-text { animation: jnin .55s cubic-bezier(.2,.9,.2,1); }
@keyframes jnin { from { opacity: 0; transform: translateY(14px); } }
@media (prefers-reduced-motion: reduce) { .jn-img, .jn-text { transition: none; animation: none; } }
</style>
