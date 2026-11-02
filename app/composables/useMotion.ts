import gsap from 'gsap'

const prefersReduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** Runs once: intro loader only. Scrolling is native (no smooth-scroll, no scroll-driven animation). */
export function useMotionGlobal() {
  const reduce = prefersReduced()
  if (reduce) return { reduce, intro: () => {} }
  const intro = () => {
    const tl = gsap.timeline()
    if (document.querySelector('.hero-bg')) tl.from('.hero-bg', { scale: 1.2, duration: 2, ease: 'power3.out' }, 0)
    tl.to('#loader-bar', { scaleX: 1, duration: 0.8, ease: 'power2.inOut' }, 0)
      .to('#loader-logo', { scale: 1.1, opacity: 0, duration: 0.3 }, '-=0.1')
      .to('#loader', { yPercent: -100, duration: 0.7, ease: 'power4.inOut' })
    if (document.querySelector('.hero-line')) {
      tl.from('.hero-line', { yPercent: 115, duration: 1, ease: 'power4.out', stagger: 0.12 }, '-=0.3')
        .from('.hero-fade', { opacity: 0, y: 20, duration: 0.8, ease: 'power3.out', stagger: 0.08 }, '-=0.7')
    }
    tl.set('#loader', { display: 'none' })
    return tl
  }
  return { reduce, intro }
}

/** Per page: only hover-driven effects (magnetic buttons). */
export function usePageMotion() {
  if (prefersReduced() || !window.matchMedia('(pointer: fine)').matches) return
  gsap.utils.toArray<HTMLElement>('[data-magnetic]').forEach((el) => {
    const xTo = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3' }); const yTo = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3' })
    el.addEventListener('pointermove', (e) => { const r = el.getBoundingClientRect(); xTo((e.clientX - r.left - r.width / 2) * 0.3); yTo((e.clientY - r.top - r.height / 2) * 0.3) })
    el.addEventListener('pointerleave', () => { xTo(0); yTo(0) })
  })
}
