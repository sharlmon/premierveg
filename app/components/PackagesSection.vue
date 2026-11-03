<template>
  <section :class="lead ? 'pt-40 md:pt-48' : 'pt-28 md:pt-40'" class="bg-lime pb-28 text-forest md:pb-40">
    <div class="mx-auto max-w-7xl px-5 md:px-10">
      <p class="eyebrow mb-6" data-reveal>Our packages</p>
      <component :is="lead ? 'h1' : 'h2'" class="display max-w-3xl text-4xl md:text-5xl lg:text-6xl" data-lines><span class="line-mask"><span class="line-inner">Cartons &amp; punnets,</span></span><span class="line-mask"><span class="line-inner italic">ready for shelf.</span></span></component>
      <div class="mt-10 flex flex-wrap gap-2" role="group" aria-label="Filter packages" data-reveal>
        <button v-for="k in kinds" :key="k" class="cursor-pointer rounded-full border px-5 py-2.5 text-sm font-semibold transition" :class="kind === k ? 'border-forest bg-forest text-lime' : 'border-forest/30 hover:border-forest'" :aria-pressed="kind === k" @click="setKind(k)">{{ k }} <span class="opacity-60">{{ k === 'All' ? packages.length : packages.filter((p) => p.kind === k).length }}</span></button>
      </div>
      <h2 class="sr-only">Package list</h2>
      <ul ref="list" class="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4" data-stagger>
        <li v-for="p in packages" :key="p.id" class="reveal" :class="kind === 'All' || p.kind === kind ? '' : 'hidden'">
          <button v-tilt="7" class="tilt group relative flex h-full w-full cursor-pointer flex-col overflow-hidden rounded-3xl bg-white text-left shadow-[0_18px_40px_-26px_rgba(14,42,28,.6)]" :aria-label="'View ' + p.name + ' ' + p.kind" @click="open({ type: 'package', item: p })">
            <span class="glare" />
            <div class="relative grid aspect-[4/3] place-items-center overflow-hidden bg-white"><img :src="asset(p.img)" :alt="p.name + ' ' + p.kind.toLowerCase()" loading="lazy" class="depth h-full w-full object-contain" /><span class="eyebrow absolute left-3 top-3 rounded-full bg-forest px-2.5 py-1 text-xs text-lime">{{ p.kind }}</span></div>
            <div class="flex flex-1 flex-col border-t border-forest/10 p-4 sm:p-5"><p class="font-mono text-xs text-forest/70">{{ p.code }}</p><h3 class="display mt-1 text-lg leading-tight sm:text-xl">{{ p.name }}</h3><p class="mt-1 text-xs text-forest/70">{{ p.note }}</p></div>
          </button>
        </li>
      </ul>
    </div>
  </section>
</template>
<script setup lang="ts">
defineProps<{ lead?: boolean }>()
import gsap from 'gsap'
import { Flip } from 'gsap/Flip'
import { packages } from '~/data'
const asset = useAsset(); const { open } = useModal()
const kinds = ['All', 'Carton', 'Top cover', 'Punnet']
const kind = ref('All'); const list = ref<HTMLElement>()
const setKind = (k: string) => {
  const items = list.value ? Array.from(list.value.children) : []
  if (!items.length || window.matchMedia('(prefers-reduced-motion: reduce)').matches) { kind.value = k; return }
  gsap.registerPlugin(Flip); items.forEach((el) => ((el as HTMLElement).style.opacity = '1'))
  const state = Flip.getState(items); kind.value = k
  nextTick(() => Flip.from(state, { duration: 0.7, ease: 'power3.inOut', stagger: 0.03, absolute: true, onEnter: (els) => gsap.fromTo(els, { opacity: 0, scale: 0.85 }, { opacity: 1, scale: 1, duration: 0.5 }), onLeave: (els) => gsap.to(els, { opacity: 0, scale: 0.85, duration: 0.4 }) }))
}
</script>
