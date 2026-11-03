<template>
  <section id="routes" ref="root" class="relative overflow-hidden bg-cream py-28 md:py-36">
    <div class="mx-auto grid max-w-7xl items-center gap-12 px-5 md:px-10 lg:grid-cols-12">
      <div class="lg:col-span-5">
        <p class="eyebrow mb-6 text-leaf" data-reveal>From Nairobi to your market</p>
        <h2 class="display text-4xl md:text-5xl lg:text-6xl" data-lines><span class="line-mask"><span class="line-inner">Harvest, delivered</span></span><span class="line-mask"><span class="line-inner italic text-leaf">to your door.</span></span></h2>
        <p class="mt-6 max-w-md text-ink/70" data-reveal>Based in Nairobi, with operations in Italy, we supply buyers in France, the Netherlands and Switzerland. Pick a market to see the route.</p>

        <div class="mt-8 flex flex-wrap gap-2" role="group" aria-label="Choose a market" data-reveal>
          <button v-for="d in dests" :key="d" class="cursor-pointer rounded-full border px-4 py-3 text-sm font-semibold transition" :class="active === d ? 'border-forest bg-forest text-cream' : 'border-forest/25 hover:border-forest'" :aria-pressed="active === d" @click="select(d)" @mouseenter="hoverDest = d" @mouseleave="hoverDest = ''">{{ d }}</button>
        </div>

        <div class="mt-8 rounded-3xl bg-forest p-6 text-cream" aria-live="polite" data-reveal>
          <p class="eyebrow text-lime">Nairobi → {{ active }}</p>
          <p class="display mt-2 text-4xl"><CountUp :to="km" group /> <span class="text-xl text-cream/70">km</span></p>
          <p class="mt-2 text-sm text-cream/70">{{ country[active] }}, one of our core markets. Straight-line distance from our Nairobi base.</p>
        </div>
        <p class="mt-4 text-xs text-ink/70">Hover the map, tap a destination, or move your cursor to light up the dots.</p>
      </div>

      <div class="lg:col-span-7">
        <div ref="wrap" class="relative mx-auto w-full max-w-[34rem] touch-pan-y select-none" :style="{ aspectRatio: map.w + ' / ' + map.h }">
          <canvas ref="canvas" class="absolute inset-0 h-full w-full" aria-hidden="true" />
          <!-- city labels -->
          <button v-for="d in all" :key="d.name" class="map-pin absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full" :class="d.name === 'Nairobi' ? 'z-20' : 'z-10'" :style="{ left: d.px + '%', top: d.py + '%' }" :aria-label="d.name === 'Nairobi' ? 'Nairobi, our base' : 'Show route to ' + d.name" @click="d.name !== 'Nairobi' && select(d.name)" @mouseenter="d.name !== 'Nairobi' && (hoverDest = d.name)" @mouseleave="hoverDest = ''">
            <span class="grid h-8 w-8 place-items-center sm:h-9 sm:w-9 rounded-full" :class="d.name === 'Nairobi' ? 'bg-lime text-forest ring-4 ring-forest/20' : active === d.name ? 'bg-forest text-lime' : 'bg-white text-forest shadow'">
              <svg v-if="d.name === 'Nairobi'" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2c3.3 0 6 2.6 6 5.9 0 4.4-6 12.1-6 12.1S6 12.3 6 7.9C6 4.6 8.7 2 12 2Zm0 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"/></svg>
              <svg v-else width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><path d="M3 12h14M13 6l6 6-6 6"/></svg>
            </span>
            <span class="eyebrow pointer-events-none absolute left-1/2 top-full mt-1 -translate-x-1/2 whitespace-nowrap rounded-full bg-forest px-2.5 py-1 text-xs text-cream transition-opacity" :class="d.name === 'Nairobi' || active === d.name || hoverDest === d.name ? 'opacity-100' : 'opacity-0'">{{ d.name }}</span>
          </button>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import gsap from 'gsap'
import map from '~/assets/map-dots.json'

const dests = ['Paris', 'Amsterdam', 'Zurich']
const country: Record<string, string> = { Paris: 'France', Amsterdam: 'Netherlands', Zurich: 'Switzerland' }
const active = ref('Paris'); const hoverDest = ref('')
const root = ref<HTMLElement>(); const wrap = ref<HTMLElement>(); const canvas = ref<HTMLCanvasElement>()
const C = map.cities as Record<string, { xy: number[]; lat: number; lon: number }>
const all = ['Nairobi', ...dests].map((n) => ({ name: n, px: (C[n].xy[0] / map.w) * 100, py: (C[n].xy[1] / map.h) * 100 }))
const haversine = (a: { lat: number; lon: number }, b: { lat: number; lon: number }) => {
  const R = 6371, r = Math.PI / 180, dLat = (b.lat - a.lat) * r, dLon = (b.lon - a.lon) * r
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(a.lat * r) * Math.cos(b.lat * r) * Math.sin(dLon / 2) ** 2
  return Math.round((2 * R * Math.asin(Math.sqrt(h))) / 10) * 10
}
const km = computed(() => haversine(C.Nairobi, C[active.value]))
const select = (d: string) => { active.value = d }

// ---- canvas engine ----
let raf = 0, visible = false, reduce = false
const mouse = { x: -999, y: -999, on: false }
const prog = { reveal: 0 }                 // dot wave + route draw progress (0..1)
const sel = { w: {} as Record<string, number> } // per-destination highlight 0..1 (eased)
const hub = C.Nairobi.xy
const arc = (to: number[]) => { // quadratic bezier control point, bowed to the north-west
  const mx = (hub[0] + to[0]) / 2, my = (hub[1] + to[1]) / 2
  const dx = to[0] - hub[0], dy = to[1] - hub[1], len = Math.hypot(dx, dy)
  return [mx - (dy / len) * len * 0.22, my + (dx / len) * len * 0.22 * -1]
}
const bez = (p0: number[], c: number[], p1: number[], t: number) => { const u = 1 - t; return [u * u * p0[0] + 2 * u * t * c[0] + t * t * p1[0], u * u * p0[1] + 2 * u * t * c[1] + t * t * p1[1]] }
const maxD = Math.max(...map.dots.map((d) => Math.hypot(d[0] - hub[0], d[1] - hub[1])))

let PLANE: Path2D
const draw = (time: number) => {
  PLANE ||= new Path2D('M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z')
  const cv = canvas.value!, ctx = cv.getContext('2d')!
  const k = cv.width / map.w, t = time / 1000
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.clearRect(0, 0, cv.width, cv.height); ctx.scale(k, k)
  const mx = mouse.on ? mouse.x / k : -9999, my = mouse.on ? mouse.y / k : -9999
  const focus = hoverDest.value || active.value
  const rad = map.step * 0.235
  // dots
  for (const [x, y] of map.dots as number[][]) {
    const dh = Math.hypot(x - hub[0], y - hub[1]) / maxD
    const wave = reduce ? 1 : Math.min(1, Math.max(0, (prog.reveal * 1.35 - dh) * 6))
    if (wave <= 0) continue
    const dm = Math.hypot(x - mx, y - my)
    const near = dm < 85 ? 1 - dm / 85 : 0
    const pulse = reduce ? 0 : Math.max(0, 1 - Math.abs(((t * 0.18) % 1.4) - dh * 1.4) * 9) * 0.55 // slow ripple from Nairobi
    const a = (0.32 + near * 0.6 + pulse) * wave
    ctx.fillStyle = near > 0.05 ? `rgba(31,91,58,${Math.min(1, a + 0.2)})` : pulse > 0.05 ? `rgba(31,91,58,${Math.min(1, a + 0.15)})` : `rgba(96,152,118,${Math.min(1, a + 0.1)})`
    ctx.beginPath(); ctx.arc(x, y, rad * (1 + near * 1.1 + pulse * 0.5) * wave, 0, 6.2832); ctx.fill()
  }
  // routes
  for (const d of dests) {
    const to = C[d].xy, c = arc(to)
    const target = d === focus ? 1 : 0
    sel.w[d] = (sel.w[d] ?? 0) + (target - (sel.w[d] ?? 0)) * 0.12
    const w = sel.w[d]
    const p = reduce ? 1 : Math.min(1, Math.max(0, prog.reveal * 1.6 - dests.indexOf(d) * 0.08))
    if (p <= 0) continue
    ctx.lineCap = 'round'
    ctx.strokeStyle = `rgba(14,42,28,${0.28 + w * 0.65})`; ctx.lineWidth = 1.4 + w * 2.2
    ctx.setLineDash([2 + w * 2, 7]); ctx.lineDashOffset = -t * (14 + w * 26)
    ctx.beginPath(); const steps = 48
    for (let i = 0; i <= steps * p; i++) { const [px, py] = bez(hub, c, to, i / steps); i ? ctx.lineTo(px, py) : ctx.moveTo(px, py) }
    ctx.stroke(); ctx.setLineDash([])
    // travelling packets
    if (p >= 1) {
      const n = d === focus ? 3 : 1
      for (let j = 0; j < n; j++) {
        const u = ((t * (0.16 + w * 0.14) + j / n + dests.indexOf(d) * 0.17) % 1), [px, py] = bez(hub, c, to, u)
        const u2 = Math.min(1, u + 0.01), [qx, qy] = bez(hub, c, to, u2), ang = Math.atan2(qy - py, qx - px) + Math.PI / 2 // plane glyph points up
        const sc = (1.15 + w * 0.4) * (map.w / 700)
        ctx.save(); ctx.translate(px, py); ctx.rotate(ang); ctx.scale(sc, sc); ctx.translate(-12, -12)
        ctx.fillStyle = '#C6F04A'; ctx.strokeStyle = '#0E2A1C'; ctx.lineWidth = 1.6; ctx.lineJoin = 'round'
        ctx.stroke(PLANE); ctx.fill(PLANE); ctx.restore()
      }
    }
  }
  // hub pulse rings
  if (!reduce) for (let i = 0; i < 3; i++) { const q = ((t * 0.5 + i / 3) % 1); ctx.strokeStyle = `rgba(198,240,74,${(1 - q) * 0.9})`; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(hub[0], hub[1], 12 + q * 46, 0, 6.2832); ctx.stroke() }
}
const loop = (time: number) => { if (visible) draw(time); raf = requestAnimationFrame(loop) }
const resize = () => { const cv = canvas.value!, r = wrap.value!.getBoundingClientRect(), dpr = Math.min(2, window.devicePixelRatio || 1); cv.width = Math.round(r.width * dpr); cv.height = Math.round(r.height * dpr); if (!visible || reduce) draw(performance.now()) }
const move = (e: PointerEvent) => { const r = wrap.value!.getBoundingClientRect(), dpr = canvas.value!.width / r.width; mouse.x = (e.clientX - r.left) * dpr; mouse.y = (e.clientY - r.top) * dpr; mouse.on = true }
const leave = () => { mouse.on = false }

let ro: ResizeObserver, io: IntersectionObserver
onMounted(() => {
  reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  resize(); ro = new ResizeObserver(resize); ro.observe(wrap.value!)
  wrap.value!.addEventListener('pointermove', move); wrap.value!.addEventListener('pointerleave', leave)
  io = new IntersectionObserver(([e]) => {
    const was = visible; visible = e.isIntersecting
    if (visible && !was && !reduce && prog.reveal === 0) gsap.to(prog, { reveal: 1, duration: 3.2, ease: 'power2.out' })
  }, { threshold: 0.2 })
  io.observe(root.value!)
  if (reduce) { prog.reveal = 1; draw(0) } else raf = requestAnimationFrame(loop)
})
onBeforeUnmount(() => { cancelAnimationFrame(raf); ro?.disconnect(); io?.disconnect(); gsap.killTweensOf(prog) })
</script>
<style>.map-pin::after { content: ""; position: absolute; left: 50%; top: 50%; width: 44px; height: 44px; transform: translate(-50%, -50%); }
.map-pin:focus-visible { outline: 3px solid #FFB627; outline-offset: 3px; }</style>
