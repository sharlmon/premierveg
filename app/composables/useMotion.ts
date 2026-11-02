import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

export function useMotion() {
  gsap.registerPlugin(ScrollTrigger)
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const root = document.documentElement
  if (reduce) { root.classList.add('reduce'); return { reduce, intro: () => {} } }

  // smooth scroll
  const lenis = new Lenis({ lerp: 0.09, smoothWheel: true })
  lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.add((t) => lenis.raf(t * 1000))
  gsap.ticker.lagSmoothing(0)
  ;(window as any).__lenis = lenis

  // scroll progress bar
  gsap.to('#progress', { scaleX: 1, ease: 'none', scrollTrigger: { scrub: 0.3, start: 0, end: 'max' } })

  // generic reveals
  gsap.utils.toArray<HTMLElement>('[data-reveal]').forEach((el) => {
    gsap.to(el, { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: Number(el.dataset.delay || 0),
      scrollTrigger: { trigger: el, start: 'top 88%' } })
  })
  // staggered groups
  gsap.utils.toArray<HTMLElement>('[data-stagger]').forEach((g) => {
    gsap.to(g.querySelectorAll('.reveal'), { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.08,
      scrollTrigger: { trigger: g, start: 'top 82%' } })
  })
  // headline line masks
  gsap.utils.toArray<HTMLElement>('[data-lines]').forEach((h) => {
    gsap.from(h.querySelectorAll('.line-inner'), { yPercent: 110, duration: 1.1, ease: 'power4.out', stagger: 0.1,
      scrollTrigger: { trigger: h, start: 'top 85%' } })
  })
  // parallax
  gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((el) => {
    const s = Number(el.dataset.parallax)
    gsap.to(el, { yPercent: s, ease: 'none', scrollTrigger: { trigger: el.parentElement || el, scrub: true, start: 'top bottom', end: 'bottom top' } })
  })
  // image clip reveal
  gsap.utils.toArray<HTMLElement>('[data-clip]').forEach((el) => {
    gsap.fromTo(el, { clipPath: 'inset(100% 0 0 0)' }, { clipPath: 'inset(0% 0 0 0)', duration: 1.4, ease: 'power4.inOut',
      scrollTrigger: { trigger: el, start: 'top 85%' } })
    const img = el.querySelector('img')
    if (img) gsap.fromTo(img, { scale: 1.35 }, { scale: 1, duration: 1.8, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 85%' } })
  })
  // counters
  gsap.utils.toArray<HTMLElement>('[data-count]').forEach((el) => {
    const end = Number(el.dataset.count); const o = { v: 0 }
    gsap.to(o, { v: end, duration: 2, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 90%' }, onUpdate: () => { el.textContent = String(Math.round(o.v)) } })
  })
  // process line draw
  const line = document.querySelector('#process-line')
  if (line) gsap.fromTo(line, { scaleY: 0 }, { scaleY: 1, ease: 'none', transformOrigin: 'top', scrollTrigger: { trigger: '#process', start: 'top 60%', end: 'bottom 70%', scrub: true } })

  // magnetic buttons
  document.querySelectorAll<HTMLElement>('[data-magnetic]').forEach((el) => {
    const xTo = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3' }); const yTo = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3' })
    el.addEventListener('pointermove', (e) => { const r = el.getBoundingClientRect(); xTo((e.clientX - r.left - r.width / 2) * 0.3); yTo((e.clientY - r.top - r.height / 2) * 0.3) })
    el.addEventListener('pointerleave', () => { xTo(0); yTo(0) })
  })

  // intro sequence
  const intro = () => {
    const tl = gsap.timeline()
    tl.to('#loader-bar', { scaleX: 1, duration: 1.1, ease: 'power2.inOut' })
      .to('#loader-logo', { scale: 1.1, opacity: 0, duration: 0.4 }, '-=0.1')
      .to('#loader', { yPercent: -100, duration: 0.9, ease: 'power4.inOut' })
      .from('.hero-line', { yPercent: 115, duration: 1.2, ease: 'power4.out', stagger: 0.12 }, '-=0.35')
      .from('.hero-fade', { opacity: 0, y: 24, duration: 0.9, ease: 'power3.out', stagger: 0.1 }, '-=0.8')
      .from('.hero-card', { y: 160, opacity: 0, rotate: 6, duration: 1.3, ease: 'power4.out', stagger: 0.14 }, '-=1.1')
      .set('#loader', { display: 'none' })
    return tl
  }
  // hero float
  gsap.utils.toArray<HTMLElement>('.float').forEach((el, i) => {
    gsap.to(el, { y: i % 2 ? -14 : 14, rotate: i % 2 ? 3 : -3, duration: 3 + i, ease: 'sine.inOut', yoyo: true, repeat: -1 })
  })
  // hero scroll depth
  gsap.to('.hero-media', { yPercent: -12, ease: 'none', scrollTrigger: { trigger: '#top', scrub: true, start: 'top top', end: 'bottom top' } })
  return { reduce, intro, lenis }
}
