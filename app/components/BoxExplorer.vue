<template>
  <section class="bg-forest py-24 text-cream md:py-32">
    <div class="mx-auto grid max-w-7xl items-center gap-12 px-5 md:px-10 lg:grid-cols-12">
      <div class="lg:col-span-5">
        <p class="eyebrow mb-6 text-lime" data-reveal>Look inside</p>
        <h2 class="display text-4xl md:text-5xl" data-lines><span class="line-mask"><span class="line-inner">Open the box.</span></span></h2>
        <p class="mt-5 max-w-md text-cream/70" data-reveal>Each export carton comes with a printed top cover and a tray that holds 12 × 250 g. Slide, or drag the box, to lift the lid.</p>
        <div class="mt-8 flex gap-2" role="tablist" aria-label="Choose a carton">
          <button v-for="(c, i) in cartons" :key="c.name" role="tab" :aria-selected="sel === i" class="cursor-pointer rounded-full border px-5 py-2.5 text-sm font-semibold transition" :class="sel === i ? 'border-lime bg-lime text-forest' : 'border-white/25 hover:border-white'" @click="sel = i">{{ c.name }}</button>
        </div>
        <div class="mt-8">
          <label for="lid" class="eyebrow flex justify-between text-cream/60"><span>Closed</span><span>Open</span></label>
          <input id="lid" v-model.number="v" type="range" min="0" max="1" step="0.01" class="lid-range mt-3 w-full" aria-label="Lift the lid" />
          <p class="mt-4 text-sm text-cream/60" aria-live="polite">{{ cartons[sel].note }} <span class="font-mono text-xs text-cream/40">{{ cartons[sel].code }}</span></p>
        </div>
      </div>
      <div class="lg:col-span-7">
        <div ref="stage" class="relative mx-auto aspect-[454/385] w-full max-w-2xl cursor-grab touch-none overflow-hidden rounded-[2rem] bg-[#f5f5f5] shadow-2xl active:cursor-grabbing" @pointerdown="down" @pointermove="drag" @pointerup="up" @pointerleave="up">
          <img :src="asset(cartons[sel].tray)" :alt="cartons[sel].name + ' carton tray'" class="absolute inset-0 h-full w-full object-contain" draggable="false" />
          <img :src="asset(cartons[sel].lid)" :alt="cartons[sel].name + ' carton lid'" class="absolute inset-0 h-full w-full object-contain will-change-transform" :style="lidStyle" draggable="false" />
          <span class="eyebrow pointer-events-none absolute bottom-4 left-4 rounded-full bg-forest px-3 py-1.5 text-[10px] text-lime">{{ v < 0.5 ? 'Top cover' : 'Tray · 12 × 250 g' }}</span>
          <span class="eyebrow pointer-events-none absolute right-4 top-4 rounded-full bg-white px-3 py-1.5 text-[10px] text-forest shadow">Drag ↕</span>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
const asset = useAsset()
const cartons = [
  { name: 'Extra fine beans', code: 'CXF001', lid: 'img/packages/cxf001-top.png', tray: 'img/packages/cxf001-carton.png', note: 'Holds 12 × 250 g extra fine beans.' },
  { name: 'Mangetouts', code: 'CMT001', lid: 'img/packages/cmt001-top.png', tray: 'img/packages/cmt001-carton.png', note: 'Holds 12 × 250 g mangetouts.' }
]
const sel = ref(0); const v = ref(0)
const lidStyle = computed(() => ({ transform: `translateY(${-v.value * 46}%) rotate(${-v.value * 4}deg) scale(${1 + v.value * 0.06})`, opacity: String(Math.max(0, 1 - Math.max(0, v.value - 0.3) * 1.5)), transition: dragging ? 'none' : 'transform .2s, opacity .2s' }))
let dragging = false, startY = 0, startV = 0
const stage = ref<HTMLElement>()
const down = (e: PointerEvent) => { dragging = true; startY = e.clientY; startV = v.value; (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId) }
const drag = (e: PointerEvent) => { if (!dragging) return; const h = stage.value!.getBoundingClientRect().height; v.value = Math.min(1, Math.max(0, startV + (startY - e.clientY) / (h * 0.6))) }
const up = () => { dragging = false }
</script>
<style>
.lid-range { -webkit-appearance: none; appearance: none; height: 6px; border-radius: 9999px; background: rgba(255,255,255,.2); outline-offset: 6px; }
.lid-range::-webkit-slider-thumb { -webkit-appearance: none; height: 28px; width: 28px; border-radius: 9999px; background: #C6F04A; border: 4px solid #0E2A1C; box-shadow: 0 0 0 2px #C6F04A; cursor: grab; }
.lid-range::-moz-range-thumb { height: 22px; width: 22px; border-radius: 9999px; background: #C6F04A; border: 4px solid #0E2A1C; box-shadow: 0 0 0 2px #C6F04A; cursor: grab; }
</style>
