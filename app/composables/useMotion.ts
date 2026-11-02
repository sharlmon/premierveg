import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

const prefersReduced = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** Runs once for the whole app: smooth scroll, progress bar, intro loader. */
export function useMotionGlobal() {
  gsap.registerPlugin(ScrollTrigger)
  const reduce = prefersReduced()
  if (reduce) { document.documentElement.classList.add('reduce'); return { reduce, intro: () => {} } }

  const lenis = new Lenis({ lerp: 0.09, smoothWheel: true })
  ;(window as any).__lenis = lenis
  lenis.on('scroll', (l: any) => {
    ScrollTrigger.update()
    const bar = document.getElementById('progress')
    if (bar) bar.style.transform = `scaleX(${l.limit ? l.scroll / l.limit : 0})`
  })
  gsap.ticker.add((t) => lenis.raf(t * 1000))
  gsap.ticker.lagSmoothing(0)
  window.addEventListener('load', () => ScrollTrigger.refresh())

  const intro = () => {
    const tl = gsap.timeline()
    if (document.querySelector('.hero-bg')) tl.from('.hero-bg', { scale: 1.3, duration: 2.6, ease: 'power3.out' }, 0)
    tl.to('#loader-bar', { scaleX: 1, duration: 0.9, ease: 'power2.inOut' }, 0)
      .to('#loader-logo', { scale: 1.1, opacity: 0, duration: 0.35 }, '-=0.1')
      .to('#loader', { yPercent: -100, duration: 0.8, ease: 'power4.inOut' })
    if (document.querySelector('.hero-line')) {
      tl.from('.hero-line', { yPercent: 115, duration: 1.2, ease: 'power4.out', stagger: 0.12 }, '-=0.35')
        .from('.hero-fade', { opacity: 0, y: 24, duration: 0.9, ease: 'power3.out', stagger: 0.1 }, '-=0.8')
        
    }
    tl.set('#loader', { display: 'none' })
    return tl
  }
  return { reduce, intro }
}

/** Runs on every page after it mounts: reveals, parallax, counters, magnets. */
export function usePageMotion() {
  gsap.registerPlugin(ScrollTrigger)
  if (prefersReduced()) return
  const q = <T extends HTMLElement>(s: string) => gsap.utils.toArray<T>(s)

  q('[data-reveal]').forEach((el) => gsap.to(el, { opacity: 1, y: 0, duration: 1, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 90%' } }))
  q('[data-stagger]').forEach((g) => gsap.to(g.querySelectorAll('.reveal'), { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.08, scrollTrigger: { trigger: g, start: 'top 85%' } }))
  q('[data-lines]').forEach((h) => gsap.from(h.querySelectorAll('.line-inner'), { yPercent: 110, duration: 1.1, ease: 'power4.out', stagger: 0.1, scrollTrigger: { trigger: h, start: 'top 88%' } }))
  q('[data-clip]').forEach((el) => {
    gsap.fromTo(el, { clipPath: 'inset(100% 0 0 0)' }, { clipPath: 'inset(0% 0 0 0)', duration: 1.4, ease: 'power4.inOut', scrollTrigger: { trigger: el, start: 'top 88%' } })
    const img = el.querySelector('img')
    if (img) gsap.fromTo(img, { scale: 1.3 }, { scale: 1, duration: 1.8, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%' } })
  })
  q('[data-count]').forEach((el) => {
    const end = Number(el.dataset.count); const o = { v: 0 }
    gsap.to(o, { v: end, duration: 2, ease: 'power2.out', scrollTrigger: { trigger: el, start: 'top 92%' }, onUpdate: () => { el.textContent = String(Math.round(o.v)) } })
  })
  q('[data-magnetic]').forEach((el) => {
    const xTo = gsap.quickTo(el, 'x', { duration: 0.5, ease: 'power3' }); const yTo = gsap.quickTo(el, 'y', { duration: 0.5, ease: 'power3' })
    el.addEventListener('pointermove', (e) => { const r = el.getBoundingClientRect(); xTo((e.clientX - r.left - r.width / 2) * 0.3); yTo((e.clientY - r.top - r.height / 2) * 0.3) })
    el.addEventListener('pointerleave', () => { xTo(0); yTo(0) })
  })
  q('.float').forEach((el, i) => gsap.to(el, { y: i % 2 ? -12 : 12, rotate: i % 2 ? 2 : -2, duration: 3 + i, ease: 'sine.inOut', yoyo: true, repeat: -1 }))
  if (document.querySelector('.hero-bg'))
    gsap.to('.hero-bg', { yPercent: 10, ease: 'none', scrollTrigger: { trigger: '#top', scrub: true, start: 'top top', end: 'bottom top' } })
  ScrollTrigger.refresh()
}
