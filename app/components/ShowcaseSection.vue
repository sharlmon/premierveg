<template>
  <section id="showcase" class="relative overflow-hidden bg-forest py-24 text-cream md:py-32" @mouseenter="hold = true" @mouseleave="hold = false" @focusin="hold = true" @focusout="hold = false">
    <div class="pointer-events-none absolute -right-40 top-10 h-[34rem] w-[34rem] rounded-full bg-leaf/40 blur-3xl" />
    <div class="relative mx-auto max-w-7xl px-5 md:px-10">
      <div class="flex flex-col justify-between gap-6 md:flex-row md:items-end">
        <div>
          <p class="mb-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-semibold" data-reveal><span class="h-1.5 w-1.5 rounded-full bg-lime" /> Signature lines</p>
          <h2 class="display text-4xl md:text-5xl lg:text-6xl" data-lines><span class="line-mask"><span class="line-inner">Picked, graded,</span></span><span class="line-mask"><span class="line-inner italic text-lime">packed to perfection.</span></span></h2>
        </div>
        <div class="flex items-center gap-3" data-reveal>
          <span class="display mr-2 text-3xl tabular-nums"><span class="text-lime">0{{ idx + 1 }}</span><span class="text-cream/60"> / 0{{ panels.length }}</span></span>
          <button class="sw-btn" aria-label="Previous product" @click="go(idx - 1)">←</button>
          <button class="sw-btn" aria-label="Next product" @click="go(idx + 1)">→</button>
        </div>
      </div>

      <div class="mt-12 grid items-stretch gap-8 lg:grid-cols-12 lg:gap-12">
        <!-- stage -->
        <div class="order-1 lg:order-2 lg:col-span-7">
          <div v-tilt="5" class="tilt relative aspect-[4/3] overflow-hidden rounded-[2rem] bg-leaf shadow-2xl sm:aspect-[5/4]" data-cursor="Details" @click="open({ type: 'product', item: cur.product })">
            <span class="glare" />
            <img v-for="(p, i) in panels" :key="p.code" :src="asset(p.img)" :alt="p.alt" class="stage-img absolute inset-0 h-full w-full object-cover" :class="i === idx ? 'is-on' : ''" :loading="i === 0 ? 'eager' : 'lazy'" />
            <div class="absolute inset-0 bg-gradient-to-t from-forest/70 via-transparent to-transparent" />
            <span class="eyebrow absolute left-5 top-5 rounded-full bg-forest/80 px-3 py-1.5 text-lime backdrop-blur">{{ cur.product.cat }} · {{ cur.code }}</span>
            <!-- floating cut-out -->
            <div class="depth pointer-events-none absolute bottom-4 right-4 w-[36%] rounded-2xl bg-white p-3 shadow-2xl sm:bottom-6 sm:right-6">
              <div class="relative aspect-[4/3]"><img v-for="(p, i) in panels" :key="p.code + 'c'" :src="asset(p.product.img)" alt="" class="cut absolute inset-0 h-full w-full object-contain" :class="i === idx ? 'is-on' : ''" /></div>
            </div>
          </div>
        </div>

        <!-- list -->
        <ol class="order-2 flex flex-col justify-center lg:order-1 lg:col-span-5" role="tablist" aria-label="Signature lines">
          <li v-for="(p, i) in panels" :key="p.code" class="border-t border-white/15 last:border-b">
            <button role="tab" :aria-selected="i === idx" class="group relative block w-full cursor-pointer py-6 text-left" @click="go(i)">
              <span class="flex items-baseline gap-4">
                <span class="display text-2xl transition-colors" :class="i === idx ? 'text-lime' : 'text-cream/70'">0{{ i + 1 }}</span>
                <span class="display text-3xl transition-all duration-300 md:text-4xl" :class="i === idx ? 'translate-x-1 text-cream' : 'text-cream/70 group-hover:text-cream/80'">{{ p.product.name }}</span>
              </span>
              <span class="grid transition-[grid-template-rows] duration-500 ease-out" :class="i === idx ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'">
                <span class="overflow-hidden">
                  <span class="mt-3 block max-w-md pl-12 text-sm text-cream/70">{{ p.product.blurb }}</span>
                  <span class="mt-5 block pl-12"><span class="btn btn-lime !py-2.5 text-xs" role="presentation" @click.stop="open({ type: 'product', item: p.product })">View details +</span></span>
                </span>
              </span>
              <span v-if="i === idx" class="absolute bottom-0 left-0 h-[3px] w-full origin-left bg-lime" :key="tick" :style="{ animation: auto ? 'bar 6s linear forwards' : 'none', animationPlayState: hold ? 'paused' : 'running', transform: auto ? '' : 'scaleX(1)' }" @animationend="go(idx + 1)" />
            </button>
          </li>
          <li class="pt-8"><NuxtLink to="/products" class="btn btn-ghost" data-magnetic>See all ten products <span aria-hidden="true">→</span></NuxtLink></li>
        </ol>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import { products } from '~/data'
const asset = useAsset(); const { open } = useModal()
const panels = [
  { code: 'PVHV100', img: 'img/beans-tray.webp', alt: 'Tray of fine green beans' },
  { code: 'PVMT100', img: 'img/snow-peas.webp', alt: 'Tray of snow peas' },
  { code: 'PVSS100', img: 'img/sugar-snaps.webp', alt: 'Tray of sugar snap peas' }
].map((p) => ({ ...p, product: products.find((x) => x.code === p.code)! }))
const idx = ref(0); const tick = ref(0); const hold = ref(false); const auto = ref(true)
const cur = computed(() => panels[idx.value])
const go = (i: number) => { idx.value = (i + panels.length) % panels.length; tick.value++ }
onMounted(() => { if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) auto.value = false })
</script>
<style>
.sw-btn { display: grid; height: 3rem; width: 3rem; cursor: pointer; place-items: center; border-radius: 9999px; border: 1px solid rgba(255,255,255,.25); transition: background .2s, color .2s, transform .2s; }
.sw-btn:hover { background: #C6F04A; color: #0E2A1C; transform: scale(1.08); }
.stage-img { opacity: 0; transform: scale(1.1); transition: opacity .8s ease, transform 1.4s cubic-bezier(.2,.8,.2,1); }
.stage-img.is-on { opacity: 1; transform: scale(1); }
.cut { opacity: 0; transform: translateY(30px) scale(.9) rotate(4deg); transition: opacity .6s .15s, transform .9s .15s cubic-bezier(.2,.9,.2,1); }
.cut.is-on { opacity: 1; transform: none; }
@keyframes bar { from { transform: scaleX(0); } to { transform: scaleX(1); } }
@media (prefers-reduced-motion: reduce) { .stage-img, .cut { transition: none; } }
</style>
