<template>
  <Transition name="toast">
    <aside v-if="show" ref="box" class="promo fixed bottom-24 left-4 z-[60] sm:left-6" :style="{ transform: `translate(${pos.x}px, ${pos.y}px)` }" role="complementary" aria-label="Quote offer">
      <!-- minimised: a small round chip -->
      <div v-if="min" class="relative">
        <button class="promo-chip grid h-12 w-12 cursor-grab place-items-center rounded-full bg-forest p-1.5 shadow-xl ring-2 ring-lime/70 touch-none active:cursor-grabbing" aria-label="Open quote offer (drag to move)" @pointerdown="down" @pointermove="move" @pointerup="up" @pointercancel="up">
          <img :src="asset('img/packages/pcm001.webp')" alt="" class="pointer-events-none h-full w-full rounded-full bg-white object-contain p-0.5" draggable="false" />
        </button>
        <button class="absolute -right-1.5 -top-1.5 grid h-5 w-5 cursor-pointer place-items-center rounded-full bg-cream text-[10px] font-bold text-forest shadow" aria-label="Dismiss quote offer" @click="dismiss">✕</button>
      </div>

      <!-- expanded: a compact card -->
      <div v-else class="w-[min(15.5rem,calc(100vw-2rem))] overflow-hidden rounded-2xl bg-forest text-cream shadow-2xl ring-1 ring-white/10">
        <div class="flex cursor-grab items-center justify-between bg-white/5 py-1 pl-3 pr-1 touch-none active:cursor-grabbing" @pointerdown="down" @pointermove="move" @pointerup="up" @pointercancel="up">
          <span class="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[.18em] text-cream/70" aria-hidden="true"><svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor"><circle cx="2" cy="2" r="1"/><circle cx="5" cy="2" r="1"/><circle cx="8" cy="2" r="1"/><circle cx="2" cy="5" r="1"/><circle cx="5" cy="5" r="1"/><circle cx="8" cy="5" r="1"/><circle cx="2" cy="8" r="1"/><circle cx="5" cy="8" r="1"/><circle cx="8" cy="8" r="1"/></svg>Drag</span>
          <span class="flex">
            <button class="grid h-8 w-8 cursor-pointer place-items-center rounded-full text-cream/80 transition hover:bg-white/15" aria-label="Minimise" @pointerdown.stop @click="min = true">
              <svg width="12" height="12" viewBox="0 0 12 12" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M2 6h8"/></svg>
            </button>
            <button class="grid h-8 w-8 cursor-pointer place-items-center rounded-full text-cream/80 transition hover:bg-white/15" aria-label="Dismiss" @pointerdown.stop @click="dismiss">
              <svg width="12" height="12" viewBox="0 0 12 12" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M2 2l8 8M10 2l-8 8"/></svg>
            </button>
          </span>
        </div>
        <div class="flex items-center gap-3 p-3">
          <img :src="asset('img/packages/pcm001.webp')" alt="" class="h-12 w-12 shrink-0 rounded-xl bg-white object-contain p-1" />
          <div class="min-w-0">
            <p class="text-sm font-semibold leading-tight">Need year-round supply?</p>
            <button class="mt-1.5 cursor-pointer text-xs font-semibold text-lime underline-offset-4 hover:underline" @click="go">Request a quote →</button>
          </div>
        </div>
      </div>
    </aside>
  </Transition>
</template>
<script setup lang="ts">
const asset = useAsset(); const { open, state } = useModal(); const route = useRoute()
const show = ref(false); const min = ref(false)
const pos = reactive({ x: 0, y: 0 })
const box = ref<HTMLElement>()
// dismissed = stays gone for a week (not just this tab), so it doesn't keep coming back
const KEY = 'pv-promo-dismissed'
const seen = () => { try { const t = Number(localStorage.getItem(KEY) || 0); return !!t && Date.now() - t < 7 * 864e5 } catch { return false } }
const dismiss = () => { show.value = false; try { localStorage.setItem(KEY, String(Date.now())) } catch {} }
const go = () => { dismiss(); open({ type: 'quote' }) }

// drag with mouse, pen or finger; a press that barely moves counts as a click (used to re-open the minimised chip)
let drag: { sx: number; sy: number; ox: number; oy: number; moved: boolean } | null = null
const down = (e: PointerEvent) => { drag = { sx: e.clientX, sy: e.clientY, ox: pos.x, oy: pos.y, moved: false }; (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId) }
const move = (e: PointerEvent) => {
  if (!drag) return
  const dx = e.clientX - drag.sx, dy = e.clientY - drag.sy
  if (!drag.moved && Math.hypot(dx, dy) < 5) return
  drag.moved = true
  const r = box.value!.getBoundingClientRect() // keep it fully on screen
  const nx = drag.ox + dx, ny = drag.oy + dy, cx = nx - pos.x, cy = ny - pos.y
  pos.x = nx - Math.min(0, r.left + cx) - Math.max(0, r.right + cx - innerWidth)
  pos.y = ny - Math.min(0, r.top + cy) - Math.max(0, r.bottom + cy - innerHeight)
}
const up = () => { if (drag && !drag.moved && min.value) min.value = false; drag = null }

onMounted(() => { if (seen()) return; setTimeout(() => { if (!seen() && !state.value && route.path !== '/contact') show.value = true }, 14000) })
watch(() => route.path, (p) => { if (p === '/contact') show.value = false })
watch(state, (v) => { if (v) show.value = false })
</script>
<style>
.toast-enter-active { transition: transform .6s cubic-bezier(.2,.9,.2,1), opacity .4s; }
.toast-leave-active { transition: opacity .25s; }
.toast-enter-from, .toast-leave-to { opacity: 0; }
</style>
