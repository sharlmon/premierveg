<template>
  <div>
    <!-- header -->
    <section class="team-hero relative overflow-hidden bg-forest text-cream pb-16 pt-36 md:pb-24 md:pt-44">
      <img :src="asset('img/hero-workers.webp')" alt="Premier Veg packhouse team sorting and packing haricot verts" width="1500" height="2000" fetchpriority="low" decoding="async" class="team-hero-img pointer-events-none absolute inset-0 h-full w-full object-cover" />
      <div class="pointer-events-none absolute inset-0 bg-gradient-to-r from-forest/85 via-forest/55 to-forest/25 max-lg:to-forest/55" aria-hidden="true" />
      <div class="relative mx-auto max-w-7xl px-5 md:px-10">
        <p class="mb-8 inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-2 text-xs font-semibold text-cream backdrop-blur" data-reveal><span class="h-1.5 w-1.5 rounded-full bg-lime" /> Team at Premier Veg</p>
        <div class="grid items-end gap-10 lg:grid-cols-12">
          <component :is="lead ? 'h1' : 'h2'" class="display text-4xl md:text-6xl lg:col-span-8 lg:text-7xl" data-lines><span class="line-mask"><span class="line-inner">The people behind</span></span><span class="line-mask"><span class="line-inner italic text-lime">your produce.</span></span></component>
          <div class="max-w-xl space-y-4 text-cream/90 lg:col-span-12 lg:-mt-3" data-reveal>
            <p>Our dedicated farm and quality assurance teams work together to ensure a seamless journey from production in the fields to delivery to our global customers.</p>
            <p>At farm level, our team works closely with growers to promote good agricultural practices, monitor field activities and ensure compliance with food safety, environmental and traceability requirements.</p>
            <p>Through our commitment to responsible crop production and quality management, we ensure our fresh produce meets the required standards and customer specifications.</p>
          </div>
        </div>
        <dl class="mt-14 grid grid-cols-3 gap-4 border-t border-white/25 pt-8 md:max-w-2xl" data-stagger>
          <div class="reveal"><dd class="display text-4xl text-cream md:text-5xl"><CountUp :to="5" /></dd><dt class="mt-1 text-xs text-cream/80 md:text-sm">Team members</dt></div>
          <div class="reveal"><dd class="display text-4xl text-cream md:text-5xl"><CountUp :to="17" /><span class="text-lime">+</span></dd><dt class="mt-1 text-xs text-cream/80 md:text-sm">Years of produce experience (our director)</dt></div>
          <div class="reveal"><dd class="display text-4xl text-cream md:text-5xl"><CountUp :to="2" /></dd><dt class="mt-1 text-xs text-cream/80 md:text-sm">Countries: Kenya &amp; Italy</dt></div>
        </dl>
        <div class="mt-8 max-w-2xl space-y-3 rounded-2xl bg-forest/60 px-5 py-5 text-sm leading-relaxed text-cream backdrop-blur md:px-6" data-reveal>
          <p class="eyebrow text-lime">Our pack-house team</p>
          <p>Our experienced packhouse team manages the critical post-harvest processes, including produce reception, inspection, sorting, grading, weighing, packing, labelling and cold-chain management.</p>
          <p>Strict quality controls and handling procedures are maintained throughout these operations to preserve product freshness, integrity and shelf life.</p>
          <p>Working collaboratively, our team ensures every consignment is carefully handled, accurately labelled, fully traceable and packed in accordance with customer specifications and applicable international standards.</p>
          <p>Our commitment is to deliver safe, high-quality and fresh produce that consistently meets the expectations of our customers and international markets.</p>
        </div>
      </div>
    </section>

    <!-- roster -->
    <section class="bg-white py-20 md:py-28">
      <div class="mx-auto grid max-w-7xl gap-12 px-5 md:px-10 lg:grid-cols-12">
        <ul class="lg:col-span-7" role="list" data-stagger>
          <li v-for="(m, i) in team" :key="m.name" class="reveal border-t border-forest/15 last:border-b">
            <button class="row group relative flex w-full cursor-pointer items-center gap-4 py-5 text-left md:gap-6 md:py-7" :aria-label="'Read about ' + m.name" @mouseenter="sel = i" @focus="sel = i" @click="open({ type: 'team', item: m })">
              <span class="font-mono text-xs text-forest/70">0{{ i + 1 }}</span>
              <span class="avatar h-14 w-14 shrink-0 overflow-hidden rounded-full lg:hidden" :class="['bg-forest', 'bg-leaf', 'bg-tomato'][i % 3]">
                <img v-if="m.photo" :src="asset(m.photo)" :alt="''" loading="lazy" decoding="async" class="h-full w-full object-cover object-top" />
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
                <img v-if="m.photo" :src="asset(m.photo)" :alt="m.name" class="h-full w-full object-cover object-top" loading="lazy" decoding="async" />
                <span v-else class="display grid h-full w-full place-items-center text-[9rem] text-cream/90">{{ initials(m.name) }}</span>
              </div>
              <div class="pointer-events-none absolute inset-0 bg-gradient-to-t from-forest via-forest/20 to-transparent" />
              <div class="absolute inset-x-0 bottom-0 p-7 text-cream">
                <p class="eyebrow text-lime">{{ cur.role }}</p>
                <p class="display mt-2 text-3xl">{{ cur.name }}</p>
                <p v-if="cur.quote" class="display mt-3 text-lg italic text-cream/85">“{{ cur.quote }}”</p>
                <div class="mt-5 flex flex-wrap gap-2">
                  <button class="btn btn-lime !px-5 !py-3.5 text-xs" @click="open({ type: 'team', item: cur })">Read bio →</button>
                  <button class="btn btn-ghost !px-5 !py-3.5 text-xs" @click="copy(cur.email || cur.phone)">{{ copied === (cur.email || cur.phone) ? 'Copied ✓' : cur.email ? 'Copy email' : 'Copy number' }}</button>
                  <NuxtLink v-if="cur.card" :to="cur.card" class="btn btn-ghost !px-5 !py-3.5 text-xs">Digital card →</NuxtLink>
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
          <p class="max-w-xs text-sm text-cream/70" data-reveal>Click a card to copy an email address or phone number.</p>
        </div>
        <ul class="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3" data-stagger>
          <li v-for="m in team" :key="m.name" class="reveal">
            <button v-spot class="spot group flex w-full cursor-pointer items-center justify-between gap-4 rounded-2xl border border-white/15 bg-white/5 p-5 text-left transition hover:border-lime/60" :aria-label="(m.email ? 'Copy email for ' : 'Copy phone number for ') + m.name" @click="copy(m.email || m.phone)">
              <span class="min-w-0"><span class="eyebrow block text-cream/70">{{ m.role }}</span><span class="display mt-1 block text-xl">{{ m.name }}</span><span v-if="m.email" class="mt-1 block truncate text-sm text-lime">{{ m.email }}</span><span v-if="m.phone" class="block text-xs" :class="m.email ? 'text-cream/70' : 'mt-1 text-sm text-lime'">{{ m.phone }}</span></span>
              <span class="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/10 text-xs font-bold transition group-hover:bg-lime group-hover:text-forest">{{ copied === (m.email || m.phone) ? '✓' : '⧉' }}</span>
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
const copy = async (v: string) => { try { await navigator.clipboard.writeText(v) } catch { if (v.includes('@')) window.location.href = 'mailto:' + v } copied.value = v; clearTimeout(t); t = setTimeout(() => (copied.value = ''), 1800) }
</script>
<style>
.team-hero-img { object-position: 50% 62%; }
.pv { opacity: 0; transform: scale(1.06); transition: opacity .5s var(--ease), transform .9s var(--ease); }
.pv.is-on { opacity: 1; transform: scale(1); }
@media (prefers-reduced-motion: reduce) { .pv { transition: none; } }
</style>
