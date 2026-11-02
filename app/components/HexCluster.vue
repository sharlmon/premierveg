<template>
  <div ref="root" class="relative select-none" :style="{ width: W + 'px', maxWidth: '100%', aspectRatio: W + ' / ' + H }" @pointermove="move" @pointerleave="leave">
    <svg :viewBox="`0 0 ${W} ${H}`" class="absolute inset-0 h-full w-full overflow-visible" aria-hidden="true">
      <g v-for="(h, i) in hexes" :key="i" :style="{ transformOrigin: h.x + 'px ' + h.y + 'px', animationDelay: 0.9 + h.d * 0.06 + 's' }" class="hex-in">
        <polygon :ref="(el) => (polys[i] = el as SVGPolygonElement)" :points="pts(h.x, h.y)" :fill="h.f ? 'rgba(255,255,255,.14)' : '#C6F04A'" :fill-opacity="h.f ? 1 : 0.18" :stroke="h.f ? 'rgba(255,255,255,.85)' : 'rgba(198,240,74,.55)'" stroke-width="1.5" style="transition: fill .3s, fill-opacity .12s" />
      </g>
    </svg>
    <button v-for="f in features" :key="f.label" class="hex-btn absolute grid -translate-x-1/2 -translate-y-1/2 cursor-pointer place-items-center rounded-full" :style="{ left: (f.x / W) * 100 + '%', top: (f.y / H) * 100 + '%', width: R * 1.5 + 'px', height: R * 1.5 + 'px' }" :aria-label="f.label" @mouseenter="act = f.label" @focus="act = f.label" @mouseleave="act = ''" @blur="act = ''" @click="act = act === f.label ? '' : f.label">
      <svg class="h-[46%] w-[46%] transition-transform duration-300" :class="act === f.label ? 'scale-125 text-forest' : 'text-white'" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" v-html="icons[f.icon]" />
      <span class="pointer-events-none absolute left-1/2 top-full z-10 mt-1 -translate-x-1/2 whitespace-nowrap rounded-full bg-lime px-3 py-1.5 text-[11px] font-bold text-forest shadow-xl transition-all duration-200" :class="act === f.label ? 'translate-y-0 opacity-100' : '-translate-y-1 opacity-0'">{{ f.label }}</span>
    </button>
  </div>
</template>
<script setup lang="ts">
const R = 36, SQ = Math.sqrt(3)
const rows = [[2, 3], [1, 5], [0, 6], [0, 7], [0, 6], [1, 5], [2, 3]] // [start col, count] — odd-r layout
const feat: Record<string, [string, string]> = { '1,3': ['Year-round supply', 'leaf'], '2,1': ['Category 1 grading', 'star'], '2,4': ['Quality checks', 'check'], '3,2': ['Hygienic handling', 'drop'], '4,4': ['Cold rooms', 'snow'], '5,2': ['Full traceability', 'route'] }
const hexes: { x: number; y: number; f: boolean; d: number }[] = []
const features: { x: number; y: number; label: string; icon: string }[] = []
const pad = R
rows.forEach(([s, n], r) => { for (let c = s; c < s + n; c++) {
  const x = pad + SQ * R * (c + (r % 2) * 0.5) + SQ * R / 2, y = pad + 1.5 * R * r
  const k = feat[`${r},${c}`]
  hexes.push({ x, y, f: !!k, d: Math.hypot(r - 3, c - 3) * 2 }); if (k) features.push({ x, y, label: k[0], icon: k[1] })
} })
const W = Math.ceil(Math.max(...hexes.map((h) => h.x)) + pad + 2), H = Math.ceil(Math.max(...hexes.map((h) => h.y)) + pad + 2)
const pts = (cx: number, cy: number) => Array.from({ length: 6 }, (_, i) => { const a = (Math.PI / 180) * (60 * i - 30); return `${(cx + (R - 2.5) * Math.cos(a)).toFixed(1)},${(cy + (R - 2.5) * Math.sin(a)).toFixed(1)}` }).join(' ')
const icons: Record<string, string> = {
  leaf: '<path d="M5 19c0-9 5-14 14-14 0 9-5 14-14 14z"/><path d="M5 19l8-8"/>',
  star: '<path d="M12 3l2.600 5.600 6 .8-4.400 4.200 1.100 6L12 16.700 6.700 19.600l1.100-6L3.400 9.400l6-.8L12 3z"/>',
  check: '<circle cx="12" cy="12" r="9"/><path d="M8 12.500l3 3 5-6"/>',
  drop: '<path d="M12 3s6 6.500 6 11a6 6 0 01-12 0c0-4.500 6-11 6-11z"/>',
  snow: '<path d="M12 2v20M3.300 7l17.400 10M3.300 17L20.700 7M9 4l3 2 3-2M9 20l3-2 3 2"/>',
  route: '<circle cx="6" cy="18" r="2.500"/><circle cx="18" cy="6" r="2.500"/><path d="M8.500 18H15a3 3 0 000-6H9a3 3 0 010-6h6.500"/>'
}
const act = ref(''); const root = ref<HTMLElement>(); const polys: SVGPolygonElement[] = []
let raf = 0, mx = -999, my = -999
const paint = () => {
  const r = root.value!.getBoundingClientRect(), k = r.width / W
  polys.forEach((p, i) => {
    if (!p) return; const h = hexes[i]; const d = Math.hypot(mx - h.x * k, my - h.y * k) / k
    const near = Math.max(0, 1 - d / 150)
    if (h.f) p.setAttribute('fill', near > 0.55 ? 'rgba(198,240,74,.9)' : `rgba(255,255,255,${0.14 + near * 0.3})`)
    else p.setAttribute('fill-opacity', String(0.18 + near * 0.7))
  })
}
const move = (e: PointerEvent) => { const r = root.value!.getBoundingClientRect(); mx = e.clientX - r.left; my = e.clientY - r.top; cancelAnimationFrame(raf); raf = requestAnimationFrame(paint) }
const leave = () => { mx = my = -999; cancelAnimationFrame(raf); raf = requestAnimationFrame(paint) }
</script>
<style>
.hex-in { opacity: 0; transform: scale(.4); animation: hexin .7s cubic-bezier(.2,.9,.2,1) forwards; }
@keyframes hexin { to { opacity: 1; transform: scale(1); } }
.hex-btn:focus-visible { outline: 3px solid #FFB627; outline-offset: 2px; }
@media (prefers-reduced-motion: reduce) { .hex-in { animation: none; opacity: 1; transform: none; } }
</style>
