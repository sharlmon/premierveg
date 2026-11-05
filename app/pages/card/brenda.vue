<template>
  <div class="card-page">
    <div class="orb orb-a" aria-hidden="true" /><div class="orb orb-b" aria-hidden="true" />
    <div class="mx-auto w-full max-w-md px-4 pb-10 pt-6">
      <!-- the card: tap to flip -->
      <div class="stage">
        <button class="flip" :class="{ 'is-flipped': flipped }" type="button" :aria-label="flipped ? 'Show the front of the card' : 'Flip the card to see the QR code'" @click="flipped = !flipped">
          <span class="face front">
            <span class="fl">
              <img :src="asset('img/field-team.webp')" alt="" class="fl-bg" width="400" height="500" />
              <img :src="asset('img/logo.jpg')" alt="Premier Veg Mondo Fresh" class="fl-logo" width="96" height="96" />
            </span>
            <span class="fr">
              <span class="display block text-[1.45rem] font-semibold leading-tight text-forest">{{ p.name }}</span>
              <span class="mt-1 block text-[13px] font-semibold text-leaf">{{ p.role }}</span>
              <span class="block text-[12px] text-ink/60">Premier Veg Mondo Fresh</span>
              <span class="bar" />
              <span class="block text-[11.5px] font-semibold leading-relaxed text-ink">{{ p.phone }}<br />{{ p.email }}</span>
            </span>
            <i class="shine" aria-hidden="true" />
          </span>
          <span class="face back">
            <span class="qrbox"><span class="qrimg" v-html="flipTab === 'save' ? qrSave : qrShare" /></span>
            <span class="mt-3 block text-sm font-semibold text-cream">{{ flipTab === 'save' ? 'Scan to save contact' : 'Scan to open this card' }}</span>
            <span class="block text-[11.5px] text-cream/70">Point your phone camera at the code</span>
            <span class="mt-1 block text-[11px] font-semibold tracking-wide text-lime">premierveg.com</span>
          </span>
        </button>
      </div>
      <p class="mt-4 text-center text-xs tracking-wide text-ink/55">Tap the card to flip it</p>

      <div class="seg mx-auto mt-3" role="tablist" aria-label="QR code">
        <button role="tab" :aria-selected="flipTab === 'save'" :class="{ on: flipTab === 'save' }" @click="flipTab = 'save'; flipped = true">Save contact</button>
        <button role="tab" :aria-selected="flipTab === 'share'" :class="{ on: flipTab === 'share' }" @click="flipTab = 'share'; flipped = true">Share card</button>
      </div>

      <!-- actions -->
      <section class="sheet mt-7">
        <div class="flex items-center gap-3">
          <img :src="asset('img/team/brenda.jpg')" alt="" class="h-14 w-14 rounded-full object-cover object-top ring-2 ring-leaf/30" width="56" height="56" />
          <div class="min-w-0">
            <p class="display text-xl leading-tight text-forest">{{ p.name }}</p>
            <p class="text-sm text-ink/60">{{ p.role }} · Premier Veg</p>
          </div>
        </div>

        <a :href="asset('card/brenda/Brenda-Ogollah.vcf')" download class="act-main mt-5" @click="saved = true"><svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M12 5v14M5 12h14" /></svg>Save Contact</a>
        <NuxtLink to="/" class="act-alt mt-3"><svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18" /></svg>Visit Our Website</NuxtLink>

        <div class="mt-3 grid grid-cols-3 gap-3">
          <a :href="'tel:' + p.tel" class="act-sq"><svg viewBox="0 0 24 24" class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 4h4l2 5-2.500 1.500a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" /></svg>Call</a>
          <a :href="wa('Hello Brenda, I found your Premier Veg card and would like to enquire about your fresh produce.')" target="_blank" rel="noopener" class="act-sq"><svg viewBox="0 0 24 24" class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 12a9 9 0 0 1-13.400 7.800L3 21l1.300-4.500A9 9 0 1 1 21 12z" /></svg>WhatsApp</a>
          <a :href="'mailto:' + p.email" class="act-sq"><svg viewBox="0 0 24 24" class="h-6 w-6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2.500" /><path d="m3.500 7 8.500 6 8.500-6" /></svg>Email</a>
        </div>

        <h2 class="display mt-9 text-xl text-forest">Fresh from our farms</h2>
        <ul class="strip -mx-5 mt-3 flex snap-x gap-3 overflow-x-auto px-5 pb-1">
          <li v-for="v in veg" :key="v.n" class="w-[9.5rem] shrink-0 snap-start overflow-hidden rounded-2xl bg-cream">
            <img :src="asset(v.img)" :alt="v.n" class="h-24 w-full object-cover" loading="lazy" width="152" height="96" />
            <div class="px-3 py-2.5"><p class="text-sm font-semibold text-forest">{{ v.n }}</p><p class="text-xs text-ink/55">{{ v.s }}</p></div>
          </li>
        </ul>
        <NuxtLink to="/products" class="mt-3 block text-right text-sm font-semibold text-leaf">View all products →</NuxtLink>

        <h2 class="display mt-8 text-xl text-forest">Why Premier Veg</h2>
        <ul class="mt-3 grid grid-cols-2 gap-3">
          <li v-for="w in why" :key="w.t" class="rounded-2xl bg-cream p-4">
            <span class="grid h-9 w-9 place-items-center rounded-full bg-leaf text-lime" v-html="w.i" />
            <p class="mt-3 text-sm font-semibold text-forest">{{ w.t }}</p>
            <p class="mt-0.5 text-xs leading-snug text-ink/60">{{ w.d }}</p>
          </li>
        </ul>

        <dl class="mt-8 divide-y divide-ink/10 text-sm">
          <div class="flex justify-between gap-4 py-3"><dt class="text-ink/50">Phone</dt><dd class="font-semibold text-ink"><a :href="'tel:' + p.tel">{{ p.phone }}</a></dd></div>
          <div class="flex justify-between gap-4 py-3"><dt class="text-ink/50">Email</dt><dd class="break-all text-right font-semibold text-ink"><a :href="'mailto:' + p.email">{{ p.email }}</a></dd></div>
          <div class="flex justify-between gap-4 py-3"><dt class="text-ink/50">Website</dt><dd class="font-semibold text-ink"><NuxtLink to="/">premierveg.com</NuxtLink></dd></div>
          <div class="flex justify-between gap-4 py-3"><dt class="text-ink/50">Address</dt><dd class="text-right font-semibold text-ink">Trystar Go Down, Airport North Road<br />P.O. Box 3468-00200, Nairobi, Kenya</dd></div>
        </dl>
        <button class="mt-2 w-full cursor-pointer rounded-full border border-forest/20 py-3 text-sm font-semibold text-forest transition hover:bg-forest hover:text-cream" @click="share">{{ shared || 'Share this card' }}</button>
        <p class="foot -mx-5 -mb-5 mt-6 rounded-b-[1.75rem] py-4 text-center text-[11px] font-semibold uppercase tracking-[.28em] text-cream/85">Fresh · Reliable · Premier</p>
      </section>
    </div>
  </div>
</template>
<script setup lang="ts">
import { renderSVG } from 'uqr'
definePageMeta({ bare: true })
const asset = useAsset(); const { siteUrl, wa } = useSite()
const p = { name: 'Brenda Ogollah', role: 'Owner & Director', phone: '+39 351 215 1931', tel: '+393512151931', email: 'brenda@premierveg.com' }
const cardUrl = siteUrl + '/card/brenda/'
const vcard = ['BEGIN:VCARD', 'VERSION:3.0', 'N:Ogollah;Brenda;;;', 'FN:Brenda Ogollah', 'ORG:Premier Veg Mondo Fresh', 'TITLE:Owner & Director', 'TEL;TYPE=CELL:+393512151931', 'EMAIL:brenda@premierveg.com', 'URL:' + siteUrl + '/', 'END:VCARD'].join('\n')
const qrOpts = { ecc: 'M' as const, border: 1, blackColor: '#0E2A1C', whiteColor: '#FFFFFF' }
const qrSave = renderSVG(vcard, qrOpts), qrShare = renderSVG(cardUrl, qrOpts)
const flipped = ref(false), flipTab = ref<'save' | 'share'>('save'), saved = ref(false), shared = ref('')
const veg = [
  { n: 'Haricot Verts', s: 'Extra fine & fine', img: 'img/beans-tray.webp' },
  { n: 'Mangetouts', s: 'Snow peas', img: 'img/snow-peas.webp' },
  { n: 'Sugar Snaps', s: 'Crisp & sweet', img: 'img/sugar-closeup.webp' },
  { n: 'Baby Corn', s: 'Fresh punnets', img: 'img/products/baby-corn.jpg' }
]
const ic = (d: string) => `<svg viewBox="0 0 24 24" class="h-[18px] w-[18px]" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`
const why = [
  { t: 'Year-round supply', d: 'Steady availability, every month', i: ic('<path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.600 5.600l2.100 2.100M16.300 16.300l2.100 2.100M5.600 18.400l2.100-2.100M16.300 7.700l2.100-2.100"/><circle cx="12" cy="12" r="3"/>') },
  { t: 'Audited standards', d: 'GlobalG.A.P. and SMETA', i: ic('<path d="M12 3l8 3v6c0 5-3.500 8-8 9-4.500-1-8-4-8-9V6z"/><path d="m8.500 12 2.500 2.500 4.500-5"/>') },
  { t: 'Full traceability', d: 'From the farm to the final market', i: ic('<path d="M4 6h16M4 12h10M4 18h6"/>') },
  { t: 'Direct from Nairobi', d: 'France, the Netherlands and Switzerland', i: ic('<path d="M3 12l18-8-7 17-3-7z"/>') }
]
const share = async () => {
  try { if (navigator.share) { await navigator.share({ title: 'Brenda Ogollah · Premier Veg', url: cardUrl }); return } } catch { return }
  try { await navigator.clipboard.writeText(cardUrl); shared.value = 'Link copied ✓'; setTimeout(() => (shared.value = ''), 2000) } catch { shared.value = cardUrl }
}
usePageSeo({ title: 'Brenda Ogollah · Premier Veg Mondo Fresh', description: 'Digital business card for Brenda Ogollah, Owner & Director of Premier Veg Mondo Fresh. Save the contact, call, WhatsApp or email.', path: '/card/brenda/' })
useHead({ meta: [{ name: 'robots', content: 'noindex' }] })
</script>
<style>
.card-page { min-height: 100svh; position: relative; overflow: hidden; background: linear-gradient(180deg, #F5F1E6, #DCE5DA); }
.card-page .orb { position: absolute; border-radius: 9999px; filter: blur(60px); pointer-events: none; }
.card-page .orb-a { width: 18rem; height: 18rem; right: -6rem; top: -4rem; background: rgba(31,91,58,.18); }
.card-page .orb-b { width: 16rem; height: 16rem; left: -6rem; bottom: 10rem; background: rgba(198,240,74,.22); }
.card-page .stage { perspective: 1200px; position: relative; filter: drop-shadow(0 18px 26px rgba(14,42,28,.28)); }
.card-page .flip { position: relative; display: block; width: 100%; aspect-ratio: 1.75 / 1; cursor: pointer; transform-style: preserve-3d; transition: transform .8s cubic-bezier(.2,.8,.2,1); border-radius: 1.4rem; animation: cardin .9s cubic-bezier(.2,.8,.2,1) backwards; }
.card-page .flip.is-flipped { transform: rotateY(180deg); }
.card-page .face { position: absolute; inset: 0; display: flex; border-radius: 1.4rem; overflow: hidden; backface-visibility: hidden; -webkit-backface-visibility: hidden; text-align: left; }
.card-page .front { background: #fff; }
.card-page .fl { position: relative; flex: 0 0 38%; display: grid; place-items: center; background: #1F5B3A; }
.card-page .fl-bg { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; opacity: .55; mix-blend-mode: luminosity; }
.card-page .fl::after { content: ''; position: absolute; inset: 0; background: linear-gradient(160deg, rgba(31,91,58,.75), rgba(14,42,28,.9)); }
.card-page .fl-logo { position: relative; z-index: 1; width: 5.4rem; height: 5.4rem; border-radius: 9999px; object-fit: cover; background: #fff; box-shadow: 0 0 0 3px rgba(255,255,255,.85); }
.card-page .fr { flex: 1; display: flex; flex-direction: column; justify-content: center; padding: 1rem 1rem 1rem 1.1rem; min-width: 0; }
.card-page .bar { display: block; width: 2.4rem; height: 3px; border-radius: 3px; background: #C6F04A; margin: .65rem 0; }
.card-page .shine { position: absolute; inset: 0; pointer-events: none; background: linear-gradient(115deg, transparent 35%, rgba(255,255,255,.55) 50%, transparent 65%); transform: translateX(-120%); animation: shine 4.5s 1.2s ease-in-out infinite; }
.card-page .back { transform: rotateY(180deg); flex-direction: column; align-items: center; justify-content: center; background: linear-gradient(160deg, #1F5B3A, #0E2A1C); padding: 1rem; text-align: center; }
.card-page .qrbox { display: block; padding: .5rem; border-radius: .9rem; background: #fff; }
.card-page .qrimg { display: block; width: 6.6rem; height: 6.6rem; }
.card-page .qrimg svg { width: 100%; height: 100%; display: block; }
.card-page .seg { display: flex; width: fit-content; padding: .3rem; border-radius: 9999px; background: rgba(255,255,255,.8); box-shadow: 0 0 0 1px rgba(14,42,28,.06); }
.card-page .seg button { cursor: pointer; border-radius: 9999px; padding: .65rem 1.3rem; font-size: .85rem; font-weight: 600; color: #0E2A1C; transition: background .25s, color .25s; }
.card-page .seg button.on { background: #1F5B3A; color: #F5F1E6; }
.card-page .sheet { position: relative; padding: 1.25rem; border-radius: 1.75rem; background: #fff; box-shadow: 0 18px 40px -18px rgba(14,42,28,.3); overflow: hidden; }
.card-page .foot { background: #1F5B3A; }
.card-page .act-main, .card-page .act-alt { display: flex; align-items: center; justify-content: center; gap: .6rem; width: 100%; padding: 1rem; border-radius: 1rem; font-weight: 700; transition: transform .2s, box-shadow .2s; }
.card-page .act-main { background: linear-gradient(180deg, #1F5B3A, #0E2A1C); color: #F5F1E6; box-shadow: 0 10px 20px -10px rgba(14,42,28,.6); }
.card-page .act-alt { border: 2px solid #C6F04A; color: #0E2A1C; background: #fff; }
.card-page .act-main:active, .card-page .act-alt:active, .card-page .act-sq:active { transform: scale(.97); }
.card-page .act-sq { display: flex; flex-direction: column; align-items: center; gap: .35rem; padding: .9rem .5rem; border-radius: 1rem; background: #F5F1E6; color: #0E2A1C; font-size: .85rem; font-weight: 700; transition: transform .2s, background .2s; }
.card-page .act-sq:hover { background: #E9E3D0; }
.card-page .strip { scrollbar-width: none; scroll-snap-type: x proximity; }
.card-page .strip::-webkit-scrollbar { display: none; }
@keyframes cardin { from { opacity: 0; transform: translateY(18px) rotateX(12deg); } to { opacity: 1; transform: none; } }
@keyframes shine { 0%, 60% { transform: translateX(-120%); } 100% { transform: translateX(120%); } }
@media (prefers-reduced-motion: reduce) { .card-page .flip { animation: none; transition-duration: .01s; } .card-page .shine { display: none; } }
html.a11y-still .card-page .shine { display: none; }
</style>
