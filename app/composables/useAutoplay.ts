// Calls `advance` every `ms` while the section is on screen. Pauses while a mouse hovers it or focus is inside it,
// when the tab is hidden, and when motion is reduced / "Pause animations" is on. Call the returned `arm()` after any
// manual change to restart the countdown.
export const useAutoplay = (el: Ref<HTMLElement | undefined>, advance: () => void, ms = 5500) => {
  let t: ReturnType<typeof setTimeout> | undefined, visible = false, hold = false
  const stopped = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches || document.documentElement.classList.contains('a11y-still')
  const arm = () => {
    clearTimeout(t)
    if (!visible || hold || document.hidden) return
    t = setTimeout(() => { if (!stopped() && !hold) advance(); arm() }, ms)
  }
  let io: IntersectionObserver | undefined
  const on = (v: boolean) => (e?: Event) => { if (e && (e as PointerEvent).pointerType && (e as PointerEvent).pointerType !== 'mouse') return; hold = v; arm() }
  const enter = on(true), leave = on(false), focusIn = () => { hold = true; arm() }, focusOut = () => { hold = false; arm() }
  onMounted(() => {
    const n = el.value; if (!n) return
    io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; arm() }, { threshold: 0.35 }); io.observe(n)
    n.addEventListener('pointerenter', enter); n.addEventListener('pointerleave', leave)
    n.addEventListener('focusin', focusIn); n.addEventListener('focusout', focusOut)
    document.addEventListener('visibilitychange', arm)
  })
  onBeforeUnmount(() => { clearTimeout(t); io?.disconnect(); document.removeEventListener('visibilitychange', arm) })
  return { arm }
}
