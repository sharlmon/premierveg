<template><span class="tabular-nums" ref="el">{{ shown }}</span></template>
<script setup lang="ts">
// Counts up to `to`, and replays every 3 seconds while on screen. Server output and reduced-motion users get the final number.
const props = withDefaults(defineProps<{ to: number; from?: number; group?: boolean }>(), { from: 0, group: false })
const el = ref<HTMLElement>()
const cur = ref(props.to)
const fmt = (n: number) => (props.group ? Math.round(n).toLocaleString('en') : String(Math.round(n)))
const shown = computed(() => fmt(cur.value))
let raf = 0, timer: ReturnType<typeof setTimeout> | undefined, io: IntersectionObserver | undefined, vis = false
const still = () => matchMedia('(prefers-reduced-motion: reduce)').matches || document.documentElement.classList.contains('a11y-still')
const run = () => {
  cancelAnimationFrame(raf); clearTimeout(timer)
  if (!vis) return
  if (still() || document.hidden) { cur.value = props.to; timer = setTimeout(run, 3000); return }
  const t0 = performance.now(), dur = 1500
  const tick = (t: number) => {
    const k = Math.min(1, (t - t0) / dur)
    cur.value = props.from + (props.to - props.from) * (1 - Math.pow(1 - k, 3))
    if (k < 1) raf = requestAnimationFrame(tick); else cur.value = props.to
  }
  raf = requestAnimationFrame(tick)
  timer = setTimeout(run, 3000) // a fresh count every 3 seconds
}
onMounted(() => {
  io = new IntersectionObserver(([e]) => { const v = e.isIntersecting; if (v === vis) return; vis = v; if (v) run(); else { cancelAnimationFrame(raf); clearTimeout(timer); cur.value = props.to } }, { threshold: 0.2 })
  io.observe(el.value!)
})
watch(() => props.to, () => { if (vis) run(); else cur.value = props.to })
onBeforeUnmount(() => { io?.disconnect(); cancelAnimationFrame(raf); clearTimeout(timer) })
</script>
