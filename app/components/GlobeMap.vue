<template>
  <section id="routes" ref="root" class="relative overflow-hidden bg-forest py-28 text-cream md:py-36">
    <div class="pointer-events-none absolute -left-40 top-10 h-[30rem] w-[30rem] rounded-full bg-leaf/30 blur-3xl" aria-hidden="true" />
    <div class="relative mx-auto grid max-w-7xl items-center gap-10 px-5 md:px-10 lg:grid-cols-12 lg:gap-12">
      <div class="lg:col-span-5">
        <p class="eyebrow mb-6 text-lime" data-reveal>From Nairobi to your market</p>
        <h2 class="display text-4xl md:text-5xl lg:text-6xl" data-lines><span class="line-mask"><span class="line-inner">Nairobi to Paris,</span></span><span class="line-mask"><span class="line-inner italic text-lime">Amsterdam and Zurich.</span></span></h2>
        <p class="mt-6 max-w-md text-cream/75" data-reveal>Based in Nairobi, with operations in Italy, we supply buyers in France, the Netherlands and Switzerland. Pick a market to follow the route, or drag the globe.</p>

        <div class="mt-8 flex flex-wrap gap-2" role="group" aria-label="Choose a market" data-reveal>
          <button v-for="d in dests" :key="d" class="cursor-pointer rounded-full border px-4 py-3 text-sm font-semibold transition" :class="active === d ? 'border-lime bg-lime text-forest' : 'border-cream/30 hover:border-lime'" :aria-pressed="active === d" @click="select(d)">{{ d }}</button>
        </div>

        <div class="mt-8 rounded-3xl bg-white/10 p-6 ring-1 ring-white/15 backdrop-blur" aria-live="polite" data-reveal>
          <p class="eyebrow text-lime">Nairobi → {{ active }}</p>
          <p class="display mt-2 text-4xl"><CountUp :to="km" group /> <span class="text-xl text-cream/70">km</span></p>
          <p class="mt-2 text-sm text-cream/75">{{ country[active] }}, one of our core markets. Straight-line distance from our Nairobi base.</p>
        </div>
      </div>

      <div class="lg:col-span-7">
        <div ref="wrap" class="globe-wrap relative mx-auto aspect-square w-full max-w-[40rem] select-none">
          <canvas ref="canvas" class="absolute inset-0 h-full w-full" role="img" aria-label="Rotating globe showing air freight routes from Nairobi to Paris, Amsterdam and Zurich" />
        </div>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import gsap from 'gsap'
import land from '~/assets/globe-dots.json'

const dests = ['Paris', 'Amsterdam', 'Zurich']
const country: Record<string, string> = { Paris: 'France', Amsterdam: 'Netherlands', Zurich: 'Switzerland' }
const C: Record<string, { lat: number; lon: number }> = { Nairobi: { lat: -1.286, lon: 36.82 }, Paris: { lat: 48.86, lon: 2.35 }, Amsterdam: { lat: 52.37, lon: 4.9 }, Zurich: { lat: 47.38, lon: 8.54 } }
const active = ref('Paris')
const root = ref<HTMLElement>(); const wrap = ref<HTMLElement>(); const canvas = ref<HTMLCanvasElement>()
const RAD = Math.PI / 180
type V = [number, number, number]
const vec = (lat: number, lon: number): V => [Math.cos(lat * RAD) * Math.sin(lon * RAD), Math.sin(lat * RAD), Math.cos(lat * RAD) * Math.cos(lon * RAD)]
const dot = (a: V, b: V) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2]
const hubV = vec(C.Nairobi.lat, C.Nairobi.lon)
const destV = Object.fromEntries(dests.map((d) => [d, vec(C[d].lat, C[d].lon)])) as Record<string, V>
const km = computed(() => Math.round((6371 * Math.acos(Math.min(1, dot(hubV, destV[active.value])))) / 10) * 10)
const select = (d: string) => { active.value = d; idleAt = 0; if (reduce) draw(performance.now()) }

// view: lon0/lat0 is the point facing the viewer
const view = { lon: 20, lat: 18, spin: 0 }
const landV = (land as number[][]).map(([la, lo]) => vec(la, lo))
const focusOf = (d: string) => { const m: V = [hubV[0] + destV[d][0], hubV[1] + destV[d][1], hubV[2] + destV[d][2]]; return { lon: Math.atan2(m[0], m[2]) / RAD, lat: Math.asin(m[1] / Math.hypot(...m)) / RAD + 4 } }
const proj = (p: V, lon: number, lat: number): V => {
  const l = lon * RAD, f = lat * RAD
  const x1 = p[0] * Math.cos(l) - p[2] * Math.sin(l), z1 = p[0] * Math.sin(l) + p[2] * Math.cos(l)
  return [x1, p[1] * Math.cos(f) - z1 * Math.sin(f), p[1] * Math.sin(f) + z1 * Math.cos(f)]
}
const slerp = (a: V, b: V, t: number, lift: number): V => {
  const w = Math.acos(Math.min(1, dot(a, b))), s = Math.sin(w), k = 1 + lift * Math.sin(Math.PI * t)
  const A = Math.sin((1 - t) * w) / s, B = Math.sin(t * w) / s
  return [(A * a[0] + B * b[0]) * k, (A * a[1] + B * b[1]) * k, (A * a[2] + B * b[2]) * k]
}

let raf = 0, visible = false, reduce = false, dragging = false, idleAt = 0
let PLANE: Path2D
const pins: { name: string; x: number; y: number }[] = []
const draw = (time: number) => {
  PLANE ||= new Path2D('M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z')
  const cv = canvas.value!, ctx = cv.getContext('2d')!, S = cv.width, R = S * 0.42, c = S / 2, t = time / 1000, u = S / 640
  // ease the view toward the active route unless the visitor is dragging
  if (!dragging && !reduce) {
    if (!idleAt || time - idleAt > 3500) {
      const f = focusOf(active.value), sway = Math.sin(t * 0.25) * 5
      let dl = f.lon + sway - view.lon; dl = ((dl + 540) % 360) - 180
      view.lon += dl * 0.045; view.lat += (f.lat - view.lat) * 0.045
    }
  }
  ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.clearRect(0, 0, S, S)
  const lon = view.lon + view.spin, lat = view.lat
  // atmosphere + body
  const g = ctx.createRadialGradient(c, c, R * 0.92, c, c, R * 1.22); g.addColorStop(0, 'rgba(198,240,74,.22)'); g.addColorStop(1, 'rgba(198,240,74,0)')
  ctx.fillStyle = g; ctx.beginPath(); ctx.arc(c, c, R * 1.22, 0, 6.2832); ctx.fill()
  const b = ctx.createRadialGradient(c - R * 0.35, c - R * 0.4, R * 0.1, c, c, R); b.addColorStop(0, '#1d5236'); b.addColorStop(1, '#0a2216')
  ctx.fillStyle = b; ctx.beginPath(); ctx.arc(c, c, R, 0, 6.2832); ctx.fill()
  ctx.strokeStyle = 'rgba(198,240,74,.35)'; ctx.lineWidth = 1.5 * u; ctx.stroke()
  // graticule
  ctx.strokeStyle = 'rgba(245,241,230,.07)'; ctx.lineWidth = u
  const line = (f: (i: number) => V, n: number) => { ctx.beginPath(); let pen = false; for (let i = 0; i <= n; i++) { const q = proj(f(i), lon, lat); if (q[2] > 0) { const x = c + q[0] * R, y = c - q[1] * R; pen ? ctx.lineTo(x, y) : ctx.moveTo(x, y); pen = true } else pen = false } ctx.stroke() }
  for (let m = -180; m < 180; m += 30) line((i) => vec(-90 + (i * 180) / 60, m), 60)
  for (let p = -60; p <= 60; p += 30) line((i) => vec(p, (i * 360) / 90), 90)
  // land dots; a soft ripple travels out from Nairobi
  const ripple = (t * 0.28) % 1.6
  for (const p of landV) {
    const q = proj(p, lon, lat); if (q[2] <= 0.02) continue
    const d = Math.acos(Math.min(1, dot(p, hubV))), ring = Math.max(0, 1 - Math.abs(d - ripple) * 5) * (reduce ? 0 : 1) * Math.min(1, q[2] * 1.6)
    const a = (0.12 + 0.75 * q[2] * q[2]) + ring * 0.4
    ctx.fillStyle = ring > 0.05 ? `rgba(198,240,74,${Math.min(1, a)})` : `rgba(160,214,178,${Math.min(0.95, a)})`
    ctx.beginPath(); ctx.arc(c + q[0] * R, c - q[1] * R, (0.6 + q[2] * 1.9 + ring * 0.9) * u, 0, 6.2832); ctx.fill()
  }
  // routes
  for (const d of dests) {
    const on = d === active.value, w = Math.acos(dot(hubV, destV[d])), lift = 0.1 + w * 0.12
    const pts: (V | null)[] = []
    for (let i = 0; i <= 64; i++) { const q = proj(slerp(hubV, destV[d], i / 64, lift), lon, lat); pts.push(q[2] > 0.03 ? q : null) }
    ctx.lineCap = 'round'; ctx.strokeStyle = on ? '#C6F04A' : 'rgba(198,240,74,.35)'; ctx.lineWidth = (on ? 2.6 : 1.4) * u
    ctx.setLineDash([3 * u, 7 * u]); ctx.lineDashOffset = -t * 18 * u
    ctx.beginPath(); let pen = false
    pts.forEach((q, i) => { if (!q) { pen = false; return } const x = c + q[0] * R, y = c - q[1] * R; pen ? ctx.lineTo(x, y) : ctx.moveTo(x, y); pen = true })
    ctx.stroke(); ctx.setLineDash([])
    for (let j = 0; j < (on ? 2 : 1); j++) {
      const tt = (t * (on ? 0.13 : 0.08) + j * 0.5 + dests.indexOf(d) * 0.2) % 1
      const q = proj(slerp(hubV, destV[d], tt, lift), lon, lat), q2 = proj(slerp(hubV, destV[d], Math.min(1, tt + 0.01), lift), lon, lat)
      if (q[2] <= 0.05) continue
      const x = c + q[0] * R, y = c - q[1] * R, ang = Math.atan2(-(q2[1] - q[1]), q2[0] - q[0]) + Math.PI / 2, sc = (on ? 1.25 : 0.95) * u * 0.9
      ctx.save(); ctx.translate(x, y); ctx.rotate(ang); ctx.scale(sc, sc); ctx.translate(-12, -12)
      ctx.fillStyle = '#C6F04A'; ctx.strokeStyle = '#0E2A1C'; ctx.lineWidth = 1.6; ctx.lineJoin = 'round'; ctx.stroke(PLANE); ctx.fill(PLANE); ctx.restore()
    }
  }
  // pins + labels
  pins.length = 0
  const pin = (name: string, hub: boolean) => {
    const p = hub ? hubV : destV[name], q = proj(p, lon, lat); if (q[2] <= 0.05) return
    const x = c + q[0] * R, y = c - q[1] * R
    if (hub && !reduce) for (let i = 0; i < 3; i++) { const k = (t * 0.5 + i / 3) % 1; ctx.strokeStyle = `rgba(198,240,74,${(1 - k) * 0.9})`; ctx.lineWidth = 2 * u; ctx.beginPath(); ctx.arc(x, y, (8 + k * 30) * u, 0, 6.2832); ctx.stroke() }
    const on = hub || name === active.value
    ctx.fillStyle = hub ? '#C6F04A' : on ? '#C6F04A' : '#fff'; ctx.strokeStyle = '#0E2A1C'; ctx.lineWidth = 2 * u
    ctx.beginPath(); ctx.arc(x, y, (hub ? 7.5 : 6) * u, 0, 6.2832); ctx.fill(); ctx.stroke()
    if (on || hub) {
      ctx.font = `700 ${11.5 * u}px "Inter Tight", system-ui, sans-serif`; (ctx as any).letterSpacing = `${2 * u}px`
      const label = name.toUpperCase(), tw = ctx.measureText(label).width, pw = tw + 20 * u, ph = 22 * u, py = y + 14 * u
      ctx.fillStyle = hub ? '#C6F04A' : '#F5F1E6'; ctx.beginPath(); ctx.roundRect(x - pw / 2, py, pw, ph, ph / 2); ctx.fill()
      ctx.fillStyle = '#0E2A1C'; ctx.textBaseline = 'middle'; ctx.fillText(label, x - tw / 2 + 1 * u, py + ph / 2 + 0.5 * u)
    }
    if (!hub) pins.push({ name, x: x / u, y: y / u })
  }
  pin('Nairobi', true); dests.forEach((d) => pin(d, false))
}

const loop = (time: number) => { if (visible) draw(time); raf = requestAnimationFrame(loop) }
const resize = () => { const cv = canvas.value!, r = wrap.value!.getBoundingClientRect(), dpr = Math.min(2, window.devicePixelRatio || 1); cv.width = Math.round(r.width * dpr); cv.height = Math.round(r.height * dpr); if (!visible || reduce) draw(performance.now()) }
// drag to spin; a tap on a city pin selects it
let last = { x: 0, y: 0 }, moved = 0
const down = (e: PointerEvent) => { dragging = true; moved = 0; last = { x: e.clientX, y: e.clientY }; (e.target as Element).setPointerCapture?.(e.pointerId) }
const move = (e: PointerEvent) => {
  const cv = canvas.value!, r = cv.getBoundingClientRect(), k = cv.width / r.width, u = cv.width / 640
  if (!dragging) { const mx = (e.clientX - r.left) * k / u, my = (e.clientY - r.top) * k / u; cv.style.cursor = pins.some((p) => Math.hypot(p.x - mx, p.y - my) < 22) ? 'pointer' : 'grab'; return }
  const dx = e.clientX - last.x, dy = e.clientY - last.y; last = { x: e.clientX, y: e.clientY }; moved += Math.abs(dx) + Math.abs(dy)
  view.lon -= (dx / (r.width * 0.42)) / RAD; if (e.pointerType === 'mouse') view.lat = Math.max(-50, Math.min(70, view.lat + (dy / (r.width * 0.42)) / RAD))
  idleAt = performance.now(); if (reduce) draw(idleAt)
}
const up = (e: PointerEvent) => {
  dragging = false
  if (moved < 6) { const cv = canvas.value!, r = cv.getBoundingClientRect(), u = cv.width / 640, k = cv.width / r.width, mx = (e.clientX - r.left) * k / u, my = (e.clientY - r.top) * k / u; const hit = pins.find((p) => Math.hypot(p.x - mx, p.y - my) < 22); if (hit) select(hit.name) }
}
let ro: ResizeObserver, io: IntersectionObserver
onMounted(() => {
  reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches || document.documentElement.classList.contains('a11y-still')
  const f = focusOf(active.value); view.lon = f.lon; view.lat = f.lat; view.spin = reduce ? 0 : -140
  resize(); ro = new ResizeObserver(resize); ro.observe(wrap.value!)
  const cv = canvas.value!; cv.addEventListener('pointerdown', down); cv.addEventListener('pointermove', move); cv.addEventListener('pointerup', up); cv.addEventListener('pointercancel', () => (dragging = false))
  io = new IntersectionObserver(([e]) => { const was = visible; visible = e.isIntersecting; if (visible && !was && !reduce && view.spin !== 0 && !gsap.isTweening(view)) gsap.to(view, { spin: 0, duration: 2.6, ease: 'power3.out' }) }, { threshold: 0.2 })
  io.observe(root.value!)
  if (reduce) draw(0); else raf = requestAnimationFrame(loop)
})
onBeforeUnmount(() => { cancelAnimationFrame(raf); ro?.disconnect(); io?.disconnect(); gsap.killTweensOf(view) })
</script>
<style>.globe-wrap canvas { cursor: grab; touch-action: pan-y; }
.globe-wrap canvas:active { cursor: grabbing; }</style>
