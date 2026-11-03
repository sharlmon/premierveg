import { products, packages, team, gallery, categories } from '~/data'

// Once the page has loaded and the browser is idle, quietly fetch the rest of the site's images so that they are already
// in the cache when the visitor scrolls to them or opens another page. Skipped on slow or data-saver connections.
export default defineNuxtPlugin(() => {
  const conn = (navigator as any).connection
  if (conn?.saveData || /(^|-)2g$/.test(conn?.effectiveType || '')) return
  const base = useRuntimeConfig().app.baseURL.replace(/\/$/, '') + '/'
  const urls = [...new Set([
    ...products.map((p) => p.img), ...gallery.map((g) => g.src), ...categories.flatMap((c) => c.imgs),
    'img/beans-bunch.webp', 'img/beans-tray.webp', 'img/snow-peas.webp', 'img/sugar-closeup.webp', 'img/sugar-snaps.webp', 'img/about/packhouse.jpg',
    ...packages.flatMap((p) => [p.img, p.photo].filter(Boolean) as string[]), ...team.map((m) => m.photo).filter(Boolean) as string[], 'img/about/chef-karmani.jpg'
  ])].filter((u) => !/hero-workers/.test(u))
  const idle = (fn: () => void) => ('requestIdleCallback' in window ? (window as any).requestIdleCallback(fn, { timeout: 2000 }) : setTimeout(fn, 300))
  const run = () => {
    const next = () => {
      const u = urls.shift(); if (!u) return
      const img = new Image(); img.decoding = 'async'; img.onload = img.onerror = () => idle(next); img.src = base + u
    }
    next(); next() // two at a time
  }
  if (document.readyState === 'complete') idle(run); else window.addEventListener('load', () => idle(run), { once: true })
})
