<template>
  <Teleport to="body">
    <Transition name="modal" @after-leave="restore">
      <div v-if="state" class="fixed inset-0 z-[90] flex items-end justify-center p-0 sm:items-center sm:p-6" role="presentation" @keydown.esc="close">
        <div class="modal-backdrop absolute inset-0 bg-ink/70 backdrop-blur-sm" @click="close" />
        <div ref="panel" role="dialog" aria-modal="true" :aria-label="label" tabindex="-1" class="modal-panel relative max-h-[92svh] w-full overflow-y-auto overscroll-contain rounded-t-[2rem] bg-cream text-ink shadow-2xl outline-none sm:rounded-[2rem]" :class="wide ? 'sm:max-w-4xl' : 'sm:max-w-xl'" data-lenis-prevent>
          <button class="absolute right-4 top-4 z-10 grid h-11 w-11 cursor-pointer place-items-center rounded-full bg-forest text-cream transition hover:bg-leaf" aria-label="Close" @click="close"><svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M1 1l12 12M13 1 1 13"/></svg></button>

          <!-- PRODUCT -->
          <div v-if="state.type === 'product'" class="grid sm:grid-cols-2">
            <div class="relative grid min-h-[16rem] place-items-center bg-white p-8 sm:min-h-[28rem]">
              <span class="absolute inset-x-0 bottom-0 h-2" :style="{ background: state.item.color }" />
              <img :src="asset(state.item.img)" :alt="state.item.name" class="relative max-h-72 w-full object-contain" />
            </div>
            <div class="flex flex-col p-7 sm:p-9">
              <p class="eyebrow text-leaf">{{ state.item.cat }} · {{ state.item.code }}</p>
              <h3 class="display mt-3 text-4xl">{{ state.item.name }}</h3>
              <p class="mt-4 text-ink/75">{{ state.item.blurb }}</p>
              <dl class="mt-6 grid grid-cols-2 gap-x-6 gap-y-3 border-t border-forest/15 pt-5 text-sm">
                <div v-for="r in specRows" :key="r.label" :class="r.label === 'Packaging' ? 'col-span-2' : ''"><dt class="eyebrow text-ink/70">{{ r.label }}</dt><dd :class="r.known ? 'font-semibold' : 'italic text-ink/70'">{{ r.value }}</dd></div>
              </dl>
              <div v-if="related.length" class="mt-5">
                <p class="eyebrow mb-3 text-ink/70">Packaging photos</p>
                <ul class="flex flex-wrap gap-2"><li v-for="r in related" :key="r.id"><button class="flex cursor-pointer items-center gap-2 rounded-full border border-forest/20 bg-white py-1 pl-1 pr-4 text-xs font-semibold transition hover:border-forest" @click="open({ type: 'package', item: r })"><img :src="asset(r.img)" alt="" class="h-8 w-8 rounded-full bg-white object-contain" />{{ r.kind === 'Top cover' ? 'Top cover' : r.name }}</button></li></ul>
              </div>
              <div class="contents">
                <div class="act-bar mt-auto flex items-center gap-2.5 pt-7">
                  <button class="btn" :class="inList(state.item.code) ? 'btn-lime' : 'btn-dark'" :aria-pressed="inList(state.item.code)" @click="toggleProduct(state.item)">{{ inList(state.item.code) ? 'Added to quote ✓' : 'Add to quote +' }}</button>
                  <a class="btn btn-wa" :href="wa('Hello Premier Veg, I would like to enquire about ' + state.item.name + ' (' + state.item.code + ').')" target="_blank" rel="noopener">WhatsApp</a>
                </div>
                <div class="mt-4 flex flex-wrap items-center gap-3">
                  <button class="btn btn-ghost !text-forest" :disabled="pdfBusy" @click="spec(state.item)">{{ pdfBusy ? 'Preparing…' : 'Spec sheet PDF ↓' }}</button>
                  <button v-if="items.length" class="text-sm font-semibold underline underline-offset-4" @click="open({ type: 'quote' })">View quote list ({{ items.length }}) →</button>
                  <div class="ml-auto flex gap-2">
                    <button class="nav-btn" aria-label="Previous product" @click="step(-1)">←</button>
                    <button class="nav-btn" aria-label="Next product" @click="step(1)">→</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- PACKAGE -->
          <div v-else-if="state.type === 'package'" class="grid sm:grid-cols-2">
            <div class="grid min-h-[16rem] place-items-center bg-white p-6 sm:min-h-[26rem]"><img :src="asset(state.item.photo || state.item.img)" :alt="state.item.name + ' packaging'" class="max-h-72 w-full object-contain" /></div>
            <div class="flex flex-col p-7 sm:p-9">
              <p class="eyebrow text-leaf">{{ state.item.kind }} · {{ state.item.code }}</p>
              <h3 class="display mt-3 text-3xl md:text-4xl">{{ state.item.name }}</h3>
              <p class="mt-4 text-ink/75">{{ state.item.note }}</p>
              <div class="contents">
                <div class="act-bar mt-auto flex items-center gap-2.5 pt-8">
                  <button class="btn" :class="inList(state.item.id) ? 'btn-lime' : 'btn-dark'" :aria-pressed="inList(state.item.id)" @click="togglePack(state.item)">{{ inList(state.item.id) ? 'Added to quote ✓' : 'Add to quote +' }}</button>
                  <a class="btn btn-wa" :href="wa('Hello Premier Veg, I would like to enquire about the ' + state.item.name + ' ' + state.item.kind.toLowerCase() + ' (' + state.item.code + ').')" target="_blank" rel="noopener">WhatsApp</a>
                </div>
                <div class="mt-4 flex items-center gap-3">
                  <button v-if="items.length" class="text-sm font-semibold underline underline-offset-4" @click="open({ type: 'quote' })">View quote list ({{ items.length }}) →</button>
                  <div class="ml-auto flex gap-2">
                    <button class="nav-btn" aria-label="Previous package" @click="stepPack(-1)">←</button>
                    <button class="nav-btn" aria-label="Next package" @click="stepPack(1)">→</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- TEAM -->
          <div v-else-if="state.type === 'team'" class="grid sm:grid-cols-5">
            <div class="grid min-h-[14rem] place-items-center bg-forest sm:col-span-2 sm:min-h-[26rem]">
              <img v-if="state.item.photo" :src="asset(state.item.photo)" :alt="state.item.name" class="h-full w-full object-cover" />
              <span v-else class="display text-7xl text-lime">{{ initials(state.item.name) }}</span>
            </div>
            <div class="p-7 sm:col-span-3 sm:p-9">
              <p class="eyebrow text-leaf">{{ state.item.role }}</p>
              <h3 class="display mt-3 text-3xl md:text-4xl">{{ state.item.name }}</h3>
              <p v-if="state.item.quote" class="display mt-4 text-lg italic text-forest">“{{ state.item.quote }}”</p>
              <p v-for="(p, i) in state.item.bio" :key="i" class="mt-4 text-sm leading-relaxed text-ink/75">{{ p }}</p>
              <div class="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold">
                <a :href="'mailto:' + state.item.email" class="underline-offset-4 hover:underline">{{ state.item.email }}</a>
                <a :href="'tel:' + state.item.phone.replace(/\s/g, '')" class="underline-offset-4 hover:underline">{{ state.item.phone }}</a>
              </div>
            </div>
          </div>

          <!-- QUOTE -->
          <div v-else-if="state.type === 'quote'" class="p-7 pt-14 sm:p-10"><QuoteForm :product="state.product" /></div>

          <!-- LIGHTBOX -->
          <div v-else-if="state.type === 'lightbox'" class="bg-ink">
            <div class="grid min-h-[50svh] place-items-center" :class="cur.contain ? 'bg-white' : ''"><img :key="cur.src" :src="asset(cur.src)" :alt="cur.alt" class="lightbox-img max-h-[72svh] w-full" :class="cur.contain ? 'object-contain p-6' : 'object-contain'" /></div>
            <div class="flex items-center gap-4 bg-ink p-5 text-cream">
              <p class="flex-1 text-sm">{{ cur.cap }} <span class="ml-2 text-cream/70">{{ state.index + 1 }} / {{ state.items.length }}</span></p>
              <button class="nav-btn !bg-white/10 !text-cream" aria-label="Previous image" @click="light(-1)">←</button>
              <button class="nav-btn !bg-white/10 !text-cream" aria-label="Next image" @click="light(1)">→</button>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
<script setup lang="ts">
import { products, packages, type Product, type Pack } from '~/data'
const asset = useAsset()
const { wa } = useSite()
const { items, has, toggle } = useQuote()
const inList = (id: string) => has(id)
const toggleProduct = (p: Product) => toggle({ id: p.code, name: p.name, kind: 'Product', code: p.code })
const togglePack = (p: Pack) => toggle({ id: p.id, name: p.name + (p.kind === 'Top cover' ? ' (top cover)' : ' ' + p.kind.toLowerCase()), kind: 'Package', code: p.code })
const pdfBusy = ref(false)
const spec = async (p: Product) => { pdfBusy.value = true; try { await downloadSpecSheet(p, asset) } finally { pdfBusy.value = false } }
const specRows = computed(() => (state.value?.type === 'product' ? productSpecRows(state.value.item) : []))
const { state, open, close } = useModal()
const panel = ref<HTMLElement>()
let lastFocus: HTMLElement | null = null
const wide = computed(() => state.value && ['product', 'package', 'team', 'lightbox'].includes(state.value.type))
const label = computed(() => (state.value ? ({ product: 'Product details', package: 'Package details', team: 'Team member', quote: 'Request a quote', lightbox: 'Image viewer' } as any)[state.value.type] : ''))
const related = computed(() => (state.value?.type === 'product' ? state.value.item.pack.map((id) => packages.find((p) => p.id === id)!).filter(Boolean) : []))
const cur = computed(() => (state.value?.type === 'lightbox' ? state.value.items[state.value.index] : ({} as any)))
const initials = (n: string) => n.split(' ').map((w) => w[0]).join('')
const quote = (product: string) => { useState('enquiry').value = product; open({ type: 'quote', product }) }
const step = (d: number) => { if (state.value?.type !== 'product') return; const i = products.findIndex((p) => p.code === (state.value as any).item.code); open({ type: 'product', item: products[(i + d + products.length) % products.length] }) }
const stepPack = (d: number) => { if (state.value?.type !== 'package') return; const i = packages.findIndex((p) => p.id === (state.value as any).item.id); open({ type: 'package', item: packages[(i + d + packages.length) % packages.length] }) }
const light = (d: number) => { const s = state.value; if (s?.type !== 'lightbox') return; open({ ...s, index: (s.index + d + s.items.length) % s.items.length }) }

const onKey = (e: KeyboardEvent) => {
  if (!state.value) return
  if (e.key === 'Escape') close()
  if (e.key === 'ArrowRight') { state.value.type === 'lightbox' ? light(1) : state.value.type === 'product' ? step(1) : stepPack(1) }
  if (e.key === 'ArrowLeft') { state.value.type === 'lightbox' ? light(-1) : state.value.type === 'product' ? step(-1) : stepPack(-1) }
  if (e.key === 'Tab' && panel.value) { // focus trap
    const f = panel.value.querySelectorAll<HTMLElement>('a[href],button:not([disabled]),input,select,textarea')
    if (!f.length) return
    const first = f[0], last = f[f.length - 1]
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus() }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus() }
  }
}
watch(() => !!state.value, async (isOpen) => {
  if (!import.meta.client) return
  if (isOpen) {
    lastFocus = document.activeElement as HTMLElement
    ;(window as any).__lenis?.stop(); document.documentElement.style.overflow = 'hidden'
    await nextTick(); panel.value?.focus()
  }
})
const restore = () => { (window as any).__lenis?.start(); document.documentElement.style.overflow = ''; lastFocus?.focus?.() }
onMounted(() => window.addEventListener('keydown', onKey))
onBeforeUnmount(() => window.removeEventListener('keydown', onKey))
</script>
<style>
@media (max-width: 639px) { .act-bar.act-bar { position: sticky; bottom: 0; z-index: 5; margin: 0 -1.75rem; padding: .75rem 1.75rem calc(.75rem + env(safe-area-inset-bottom)); background: #F5F1E6; border-top: 1px solid rgba(31,91,58,.15); } .act-bar.act-bar .btn { flex: 1; justify-content: center; padding-inline: 1rem; } }
.btn-wa { background: #25D366; color: #06331a; }
.btn-wa:hover { background: #1fb957; }
.nav-btn { display: grid; height: 2.75rem; width: 2.75rem; cursor: pointer; place-items: center; border-radius: 9999px; background: #E8E3D3; color: #0E2A1C; transition: background .2s, transform .2s; }
.nav-btn:hover { background: #C6F04A; transform: scale(1.06); }
.modal-enter-active .modal-panel { transition: transform .5s var(--ease), opacity .35s; }
.modal-leave-active .modal-panel { transition: transform .25s ease, opacity .2s; }
.modal-enter-active .modal-backdrop, .modal-leave-active .modal-backdrop { transition: opacity .3s; }
.modal-enter-from .modal-panel { opacity: 0; transform: translateY(40px) scale(.96); }
.modal-leave-to .modal-panel { opacity: 0; transform: translateY(20px) scale(.98); }
.modal-enter-from .modal-backdrop, .modal-leave-to .modal-backdrop { opacity: 0; }
.lightbox-img { animation: fadeimg .4s ease; }
@keyframes fadeimg { from { opacity: 0; transform: scale(1.02); } }
@media (prefers-reduced-motion: reduce) { .modal-panel, .lightbox-img { transition: none !important; animation: none !important; } }
</style>
