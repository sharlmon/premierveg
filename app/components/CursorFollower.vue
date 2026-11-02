<template>
  <div ref="el" class="pointer-events-none fixed left-0 top-0 z-[95] hidden md:block" aria-hidden="true">
    <div ref="chip" class="-translate-x-1/2 -translate-y-1/2 scale-0 whitespace-nowrap rounded-full bg-lime px-4 py-2 text-xs font-bold uppercase tracking-wider text-forest shadow-xl">{{ label }}</div>
  </div>
</template>
<script setup lang="ts">
import gsap from 'gsap'
const el = ref<HTMLElement>(); const chip = ref<HTMLElement>(); const label = ref('View')
onMounted(() => {
  if (!window.matchMedia('(pointer: fine)').matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  const x = gsap.quickTo(el.value!, 'x', { duration: 0.35, ease: 'power3' }), y = gsap.quickTo(el.value!, 'y', { duration: 0.35, ease: 'power3' })
  let on = false
  window.addEventListener('pointermove', (e) => {
    x(e.clientX); y(e.clientY)
    const t = (e.target as HTMLElement | null)?.closest?.('[data-cursor]') as HTMLElement | null
    if (t && !on) { on = true; label.value = t.dataset.cursor || 'View'; gsap.to(chip.value!, { scale: 1, duration: 0.35, ease: 'back.out(2)' }) }
    else if (t && on) label.value = t.dataset.cursor || 'View'
    else if (!t && on) { on = false; gsap.to(chip.value!, { scale: 0, duration: 0.25, ease: 'power2.in' }) }
  }, { passive: true })
})
</script>
