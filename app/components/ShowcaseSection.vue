<template>
  <section id="showcase" ref="root" class="overflow-hidden bg-forest text-cream">
    <div ref="pin" class="flex min-h-screen flex-col justify-center py-24 lg:h-screen lg:py-0">
      <div class="mx-auto w-full max-w-7xl px-5 md:px-10">
        <p class="eyebrow mb-4 text-lime" data-reveal>Signature lines</p>
        <h2 class="display text-5xl md:text-7xl" data-lines><span class="line-mask"><span class="line-inner">Picked, graded,</span></span><span class="line-mask"><span class="line-inner italic text-lime">packed to perfection.</span></span></h2>
      </div>
      <div ref="track" class="mt-10 flex flex-col gap-8 px-5 md:px-10 lg:w-max lg:flex-row lg:gap-10 lg:pl-[max(2.5rem,calc((100vw-80rem)/2+2.5rem))] lg:pr-24">
        <article v-for="(p, i) in panels" :key="p.name" class="grid items-center gap-6 rounded-[2rem] bg-white/[.04] p-4 ring-1 ring-white/10 sm:grid-cols-2 lg:w-[46rem] lg:shrink-0 lg:p-5">
          <div class="aspect-[4/5] overflow-hidden rounded-3xl"><img :src="asset(p.img)" :alt="p.alt" loading="lazy" class="panel-img h-full w-full object-cover" /></div>
          <div class="p-2 sm:p-4">
            <span class="display text-6xl text-lime/90">0{{ i + 1 }}</span>
            <h3 class="display mt-3 text-4xl md:text-5xl">{{ p.name }}</h3>
            <p class="eyebrow mt-3 text-lime">{{ p.code }}</p>
            <p class="mt-5 text-cream/70">{{ p.text }}</p>
            <a href="#contact" class="btn btn-lime mt-7" @click="pick(p.name)">Enquire <span aria-hidden="true">→</span></a>
          </div>
        </article>
        <a href="#range" class="grid min-h-[16rem] place-content-center rounded-[2rem] bg-lime p-10 text-forest lg:w-[22rem] lg:shrink-0">
          <span class="display text-5xl">+ Fruits &amp; herbs</span>
          <span class="mt-4 max-w-xs text-forest/75">Avocados, mangoes, passion fruit, chillies, rosemary, chives and more.</span>
          <span class="eyebrow mt-8">See the full range →</span>
        </a>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
const asset = useAsset()
const panels = [
  { name: 'Haricot Verts', code: 'PVHV100', img: 'img/beans-tray.jpg', alt: 'Tray of fine green beans', text: 'French beans grown from seedling: slim, tender and uniform, packed straight into retail trays.' },
  { name: 'Mangetouts', code: 'PVMT100', img: 'img/snow-peas.jpg', alt: 'Tray of snow peas', text: 'Flat-podded peas with excellent fibre content and a clean, sweet snap.' },
  { name: 'Sugar Snaps', code: 'PVSS100', img: 'img/sugar-snaps.jpg', alt: 'Tray of sugar snap peas', text: 'Rounded, crisp, naturally sweet. A retail favourite available year-round.' }
]
const pick = (n: string) => { useState('enquiry').value = n }
const root = ref<HTMLElement>(); const pin = ref<HTMLElement>(); const track = ref<HTMLElement>()
let mm: gsap.MatchMedia | undefined
onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)
  mm = gsap.matchMedia()
  mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
    const dist = () => track.value!.scrollWidth - window.innerWidth
    gsap.to(track.value!, { x: () => -dist(), ease: 'none', scrollTrigger: { trigger: root.value!, pin: pin.value!, start: 'top top', end: () => '+=' + dist(), scrub: 0.6, invalidateOnRefresh: true, anticipatePin: 1 } })
    gsap.utils.toArray<HTMLElement>('.panel-img').forEach((img) => gsap.fromTo(img, { scale: 1.25 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: root.value!, start: 'top top', end: () => '+=' + dist(), scrub: true } }))
  })
})
onBeforeUnmount(() => mm?.revert())
</script>
