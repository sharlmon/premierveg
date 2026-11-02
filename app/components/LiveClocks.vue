<template>
  <div class="grid grid-cols-2 gap-4" aria-label="Local times">
    <figure v-for="c in clocks" :key="c.city" class="rounded-3xl border border-white/15 bg-white/5 p-5 backdrop-blur">
      <svg viewBox="-50 -50 100 100" class="mx-auto h-24 w-24 sm:h-28 sm:w-28" aria-hidden="true">
        <circle r="46" fill="none" stroke="rgba(245,241,230,.25)" stroke-width="2" />
        <g v-for="i in 12" :key="i"><line x1="0" y1="-41" x2="0" :y2="i % 3 === 0 ? -34 : -37" stroke="rgba(245,241,230,.55)" stroke-width="2" :transform="`rotate(${i * 30})`" /></g>
        <line x1="0" y1="2" x2="0" y2="-24" stroke="#F5F1E6" stroke-width="4" stroke-linecap="round" :transform="`rotate(${c.h})`" />
        <line x1="0" y1="3" x2="0" y2="-34" stroke="#F5F1E6" stroke-width="2.500" stroke-linecap="round" :transform="`rotate(${c.m})`" />
        <line x1="0" y1="8" x2="0" y2="-38" stroke="#C6F04A" stroke-width="1.500" stroke-linecap="round" :transform="`rotate(${c.s})`" />
        <circle r="3" fill="#C6F04A" />
      </svg>
      <figcaption class="mt-3 text-center"><p class="eyebrow text-cream/55">{{ c.city }}</p><p class="display text-2xl tabular-nums">{{ c.text }}</p></figcaption>
    </figure>
  </div>
</template>
<script setup lang="ts">
const zones = [{ city: 'Nairobi', tz: 'Africa/Nairobi' }, { city: 'Italy', tz: 'Europe/Rome' }]
const now = ref<Date | null>(null)
const clocks = computed(() => zones.map((z) => {
  const d = now.value; if (!d) return { city: z.city, text: '--:--', h: 0, m: 0, s: 0 }
  const parts = new Intl.DateTimeFormat('en-GB', { timeZone: z.tz, hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }).formatToParts(d)
  const g = (t: string) => Number(parts.find((p) => p.type === t)!.value) % 24
  const h = g('hour'), m = g('minute'), s = g('second')
  return { city: z.city, text: `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`, h: (h % 12) * 30 + m * 0.5, m: m * 6 + s * 0.1, s: s * 6 }
}))
let t: ReturnType<typeof setInterval>
onMounted(() => { now.value = new Date(); t = setInterval(() => (now.value = new Date()), 1000) })
onBeforeUnmount(() => clearInterval(t))
</script>
