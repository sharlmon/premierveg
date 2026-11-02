// v-tilt : 3D tilt + glare following the pointer.  v-spot : cursor-following spotlight (sets --mx/--my).
const fine = () => import.meta.client && window.matchMedia('(pointer: fine)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches

export default defineNuxtPlugin((nuxt) => {
  nuxt.vueApp.directive('tilt', {
    getSSRProps: () => ({}),
    mounted(el: HTMLElement, b) {
      if (!fine()) return
      const max = Number(b.value ?? 9)
      let raf = 0
      const move = (e: PointerEvent) => {
        const r = el.getBoundingClientRect(); const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height
        cancelAnimationFrame(raf)
        raf = requestAnimationFrame(() => {
          el.style.transform = `perspective(900px) rotateX(${(0.5 - py) * max}deg) rotateY(${(px - 0.5) * max}deg) translateZ(0)`
          el.style.setProperty('--gx', px * 100 + '%'); el.style.setProperty('--gy', py * 100 + '%'); el.style.setProperty('--px', String(px - 0.5)); el.style.setProperty('--py', String(py - 0.5))
        })
      }
      const enter = () => { el.style.transition = 'transform .12s ease-out' }
      const leave = () => { cancelAnimationFrame(raf); el.style.transition = 'transform .6s cubic-bezier(.2,.8,.2,1)'; el.style.transform = ''; el.style.setProperty('--px', '0'); el.style.setProperty('--py', '0') }
      el.addEventListener('pointerenter', enter); el.addEventListener('pointermove', move); el.addEventListener('pointerleave', leave)
    }
  })
  nuxt.vueApp.directive('spot', {
    getSSRProps: () => ({}),
    mounted(el: HTMLElement) {
      if (!fine()) return
      el.addEventListener('pointermove', (e: PointerEvent) => { const r = el.getBoundingClientRect(); el.style.setProperty('--mx', e.clientX - r.left + 'px'); el.style.setProperty('--my', e.clientY - r.top + 'px') })
    }
  })
})
