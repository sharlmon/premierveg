<template>
  <section ref="root" class="bg-[#DCE5DA] py-24 md:py-32">
    <div class="mx-auto max-w-7xl px-5 md:px-10">
      <div class="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <p class="mb-6 inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-xs font-semibold" data-reveal><span class="h-1.5 w-1.5 rounded-full bg-forest" /> Gallery</p>
          <h2 class="display text-4xl md:text-5xl lg:text-6xl" data-lines><span class="line-mask"><span class="line-inner">From the field</span></span><span class="line-mask"><span class="line-inner italic text-leaf">to the pack-house.</span></span></h2>
        </div>
        <div class="flex items-center gap-3">
          <span class="display mr-1 text-3xl tabular-nums"><span class="text-forest">0{{ act + 1 }}</span><span class="text-forest/60"> / 0{{ gallery.length }}</span></span>
          <button class="gl-btn" aria-label="Previous photo" @click="act = (act - 1 + gallery.length) % gallery.length">←</button>
          <button class="gl-btn" aria-label="Next photo" @click="act = (act + 1) % gallery.length">→</button>
        </div>
      </div>

      <ul class="mt-12 flex h-[38rem] flex-col gap-2.5 md:h-[34rem] md:flex-row md:gap-3" role="list">
        <li v-for="(g, i) in gallery" :key="g.src" class="gl-panel relative min-h-0 min-w-0 overflow-hidden rounded-[1.5rem]" :class="act === i ? 'is-act' : ''">
          <button class="absolute inset-0 block h-full w-full cursor-pointer text-left" :class="g.contain ? 'bg-white' : 'bg-forest'" :aria-label="g.cap + '. Open larger'" :aria-current="act === i" @pointerenter="($event as PointerEvent).pointerType === 'mouse' && (act = i)" @focus="($event.target as HTMLElement).matches(':focus-visible') && (act = i)" @click="pick($event, i)">
            <img :src="asset(g.src)" :alt="g.alt" loading="lazy" class="gl-img absolute inset-0 h-full w-full" :class="g.contain ? 'object-contain p-6' : 'object-cover'" />
            <span class="absolute inset-0 bg-gradient-to-t from-forest/85 via-forest/10 to-transparent transition-opacity duration-500" :class="act === i ? 'opacity-100' : 'opacity-50'" />
            <!-- collapsed label -->
            <span class="gl-vert eyebrow absolute left-1/2 top-5 hidden -translate-x-1/2 whitespace-nowrap text-cream md:block" :class="act === i ? 'opacity-0' : 'opacity-90'">0{{ i + 1 }} · {{ g.tag }}</span>
            <span class="eyebrow absolute left-4 top-4 rounded-full bg-forest/80 px-3 py-1.5 text-lime backdrop-blur md:hidden" :class="act === i ? 'hidden' : ''">{{ g.tag }}</span>
            <!-- active caption -->
            <span class="gl-cap absolute inset-x-0 bottom-0 p-5 text-cream md:p-7" :class="act === i ? 'is-on' : ''">
              <span class="eyebrow rounded-full bg-lime px-3 py-1.5 text-forest">{{ g.tag }}</span>
              <span class="display mt-3 block max-w-md text-xl md:text-3xl">{{ g.cap }}</span>
              <span class="mt-3 inline-flex items-center gap-2 text-xs font-semibold text-lime">View larger <span class="grid h-7 w-7 place-items-center rounded-full bg-lime text-forest" aria-hidden="true">↗</span></span>
            </span>
          </button>
        </li>
      </ul>
    </div>
  </section>
</template>
<script setup lang="ts">
import { gallery } from '~/data'
const asset = useAsset(); const { open } = useModal()
const act = ref(0)
const root = ref<HTMLElement>()
const { arm } = useAutoplay(root, () => { act.value = (act.value + 1) % gallery.length }, 4500)
watch(act, arm)
// mouse: hover already activated the panel, so a click opens it. touch/keyboard-less taps: first tap activates, second opens.
const pick = (e: MouseEvent, i: number) => { if (act.value === i || (e as PointerEvent).pointerType === 'mouse') open({ type: 'lightbox', index: i, items: gallery }); else act.value = i }
</script>
<style>
.gl-panel { flex: 1 1 0%; transition: flex-grow .75s cubic-bezier(.2,.8,.2,1); }
.gl-panel.is-act { flex-grow: 4.6; }
.gl-img { transition: transform 1.2s cubic-bezier(.2,.8,.2,1), filter .6s; transform: scale(1.12); filter: saturate(.8); }
.is-act .gl-img { transform: scale(1); filter: none; }
.gl-vert { transition: opacity .3s; }
@media (min-width: 768px) { .gl-vert { writing-mode: vertical-rl; } }
.gl-cap { opacity: 0; transform: translateY(18px); pointer-events: none; transition: opacity .45s, transform .6s cubic-bezier(.2,.9,.2,1); }
.gl-cap.is-on { opacity: 1; transform: none; transition-delay: .2s; }
.gl-btn { display: grid; height: 3rem; width: 3rem; cursor: pointer; place-items: center; border-radius: 9999px; border: 1px solid rgba(14,42,28,.25); transition: background .2s, color .2s, transform .2s; }
.gl-btn:hover { background: #0E2A1C; color: #C6F04A; transform: scale(1.08); }
@media (prefers-reduced-motion: reduce) { .gl-panel, .gl-img, .gl-cap { transition: none; } }
</style>
