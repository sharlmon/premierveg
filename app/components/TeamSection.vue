<template>
  <div>
    <!-- header -->
    <section class="bg-[#DCE5DA] pb-16 pt-36 md:pb-24 md:pt-44">
      <div class="mx-auto max-w-7xl px-5 md:px-10">
        <p class="mb-8 inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-xs font-semibold" data-reveal><span class="h-1.5 w-1.5 rounded-full bg-forest" /> Team at Premier Veg</p>
        <div class="grid items-end gap-10 lg:grid-cols-12">
          <component :is="lead ? 'h1' : 'h2'" class="display text-4xl md:text-6xl lg:col-span-8 lg:text-7xl" data-lines><span class="line-mask"><span class="line-inner">The people behind</span></span><span class="line-mask"><span class="line-inner italic text-leaf">your produce.</span></span></component>
          <p class="max-w-sm text-ink/70 lg:col-span-4 lg:justify-self-end" data-reveal>A team with a strong commitment to exceptional customer service, so every client is professionally supported and well served.</p>
        </div>
        <dl class="mt-14 grid grid-cols-3 gap-4 border-t border-forest/20 pt-8 md:max-w-2xl" data-stagger>
          <div class="reveal"><dd class="display text-4xl text-forest md:text-5xl"><span data-count="6">6</span></dd><dt class="mt-1 text-xs text-ink/70 md:text-sm">Team members</dt></div>
          <div class="reveal"><dd class="display text-4xl text-forest md:text-5xl"><span data-count="17">17</span><span class="text-leaf">+</span></dd><dt class="mt-1 text-xs text-ink/70 md:text-sm">Years of produce experience (our director)</dt></div>
          <div class="reveal"><dd class="display text-4xl text-forest md:text-5xl">2</dd><dt class="mt-1 text-xs text-ink/70 md:text-sm">Countries: Kenya &amp; Italy</dt></div>
        </dl>
      </div>
    </section>

    <!-- roster -->
    <section class="bg-white py-20 md:py-28">
      <div class="mx-auto grid max-w-7xl gap-12 px-5 md:px-10 lg:grid-cols-12">
        <ul class="lg:col-span-7" role="list" data-stagger>
          <li v-for="(m, i) in team" :key="m.name" class="reveal border-t border-forest/15 last:border-b">
            <button class="row group relative flex w-full cursor-pointer items-center gap-4 py-5 text-left md:gap-6 md:py-7" :aria-label="'Read about ' + m.name" data-cursor="Read bio" @mouseenter="sel = i" @focus="sel = i" @click="open({ type: 'team', item: m })">
              <span class="font-mono text-xs text-forest/70">0{{ i + 1 }}</span>
              <span class="avatar h-14 w-14 shrink-0 overflow-hidden rounded-full lg:hidden" :class="['bg-forest', 'bg-leaf', 'bg-tomato'][i % 3]">
                <img v-if="m.photo" :src="asset(m.photo)" :alt="''" loading="lazy" class="h-full w-full object-cover object-top" />
                <span v-else class="display grid h-full w-full place-items-center text-xl text-cream">{{ initials(m.name) }}</span>
              </span>
              <span class="min-w-0 flex-1">
                <span class="display block text-2xl transition-all duration-300 group-hover:translate-x-2 md:text-4xl" :class="sel === i ? 'text-forest' : 'text-forest/70'">{{ m.name }}</span>
                <span class="eyebrow mt-1 block text-leaf">{{ m.role }}</span>
              </span>
              <span class="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-forest/20 transition-all duration-300 group-hover:rotate-[-45deg] group-hover:border-forest group-hover:bg-forest group-hover:text-lime" aria-hidden="true">→</span>
            </button>
          </li>
        </ul>

        <!-- preview card -->
        <aside class="hidden lg:col-span-5 lg:block" aria-live="polite">
          <div class="sticky top-28">
            <div class="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-forest shadow-2xl">
              <div v-for="(m, i) in team" :key="m.name" class="pv absolute inset-0" :class="sel === i ? 'is-on' : ''" :style="!m.photo ? { background: ['#0E2A1C', '#1F5B3A', '#FF5A36'][i % 3] } : {}">
                <img v-if="m.photo" :src="asset(m.photo)" :alt="m.name" class="h-full w-full object-cover object-top" loading="lazy" />
                <span v-else class="display grid h-full w-full place-items-center text-[9rem] text-cream/90">{{ initials(m.name) }}</span>
              </div>
              <div class="pointer-events-none absolute inset-0 bg-gradient-to-t from-forest via-forest/20 to-transparent" />
              <div class="absolute inset-x-0 bottom-0 p-7 text-cream">
                <p class="eyebrow text-lime">{{ cur.role }}</p>
                <p class="display mt-2 text-3xl">{{ cur.name }}</p>
                <p v-if="cur.quote" class="display mt-3 text-lg italic text-cream/85">“{{ cur.quote }}”</p>
                <div class="mt-5 flex flex-wrap gap-2">
                  <button class="btn btn-lime !px-5 !py-3.5 text-xs" @click="open({ type: 'team', item: cur })">Read bio →</button>
                  <button class="btn btn-ghost !px-5 !py-3.5 text-xs" @click="copy(cur.email)">{{ copied === cur.email ? 'Copied ✓' : 'Copy email' }}</button>
                </div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </section>

    <!-- contact strip -->
    <section class="bg-forest py-20 text-cream md:py-24">
      <div class="mx-auto max-w-7xl px-5 md:px-10">
        <div class="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <h2 class="display text-3xl md:text-5xl" data-lines><span class="line-mask"><span class="line-inner">Talk to the right</span></span><span class="line-mask"><span class="line-inner italic text-lime">person, directly.</span></span></h2>
          <p class="max-w-xs text-sm text-cream/70" data-reveal>Click a card to copy an email address.</p>
        </div>
        <ul class="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3" data-stagger>
          <li v-for="m in team" :key="m.email" class="reveal">
            <button v-spot class="spot group flex w-full cursor-pointer items-center justify-between gap-4 rounded-2xl border border-white/15 bg-white/5 p-5 text-left transition hover:border-lime/60" :aria-label="'Copy email for ' + m.name" data-cursor="Copy" @click="copy(m.email)">
              <span class="min-w-0"><span class="eyebrow block text-cream/70">{{ m.role }}</span><span class="display mt-1 block text-xl">{{ m.name }}</span><span class="mt-1 block truncate text-sm text-lime">{{ m.email }}</span><span v-if="m.phone" class="block text-xs text-cream/70">{{ m.phone }}</span></span>
              <span class="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/10 text-xs font-bold transition group-hover:bg-lime group-hover:text-forest">{{ copied === m.email ? '✓' : '⧉' }}</span>
            </button>
          </li>
        </ul>
      </div>
    </section>
  </div>
</template>
<script setup lang="ts">
defineProps<{ lead?: boolean }>()
import { team } from '~/data'
const asset = useAsset(); const { open } = useModal()
const sel = ref(0); const cur = computed(() => team[sel.value])
const initials = (n: string) => n.split(' ').map((w) => w[0]).join('')
const copied = ref(''); let t: ReturnType<typeof setTimeout>
const copy = async (v: string) => { try { await navigator.clipboard.writeText(v) } catch { window.location.href = 'mailto:' + v } copied.value = v; clearTimeout(t); t = setTimeout(() => (copied.value = ''), 1800) }
</script>
<style>
.pv { opacity: 0; transform: scale(1.06); transition: opacity .6s ease, transform 1.1s cubic-bezier(.2,.8,.2,1); }
.pv.is-on { opacity: 1; transform: scale(1); }
@media (prefers-reduced-motion: reduce) { .pv { transition: none; } }
</style>
