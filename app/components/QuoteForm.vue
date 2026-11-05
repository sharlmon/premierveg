<template>
  <div>
    <form v-if="!sent" @submit.prevent="send">
      <component :is="heading || 'h3'" class="display text-2xl md:text-3xl">Request a quote</component>
      <p class="mt-2 text-sm text-ink/70">Tell us what you need and we'll respond within 24 hours.</p>

      <!-- quote list -->
      <div v-if="items.length" class="mt-5 rounded-2xl border border-forest/15 bg-white p-3">
        <p class="eyebrow px-2 pb-2 text-leaf">Your quote list · {{ items.length }}</p>
        <ul class="divide-y divide-forest/10">
          <li v-for="it in items" :key="it.id" class="flex items-center gap-3 px-2 py-2.5">
            <div class="min-w-0 flex-1"><p class="truncate text-sm font-semibold">{{ it.name }}</p><p class="text-xs text-ink/70">{{ it.kind }}<span v-if="it.code"> · {{ it.code }}</span></p></div>
            <input v-model="it.qty" class="w-28 rounded-lg border border-forest/20 px-3 py-2 text-sm" :aria-label="'Quantity for ' + it.name" placeholder="e.g. 500 kg" />
            <button type="button" class="grid h-8 w-8 shrink-0 cursor-pointer place-items-center rounded-full bg-forest/10 text-xs transition hover:bg-forest hover:text-cream" :aria-label="'Remove ' + it.name" @click="remove(it.id)">✕</button>
          </li>
        </ul>
        <button type="button" class="mt-1 px-2 py-1 text-xs font-semibold text-ink/70 underline-offset-4 hover:underline" @click="clear()">Clear list</button>
      </div>

      <div class="mt-5 grid gap-4 sm:grid-cols-2">
        <label class="block text-sm font-semibold">Name<input v-model="f.name" required autocomplete="name" class="field" /></label>
        <label class="block text-sm font-semibold">Company<input v-model="f.company" autocomplete="organization" class="field" /></label>
        <label class="block text-sm font-semibold sm:col-span-2">Email<input v-model="f.email" type="email" required autocomplete="email" class="field" /></label>
        <div v-if="!items.length" ref="pick" class="relative sm:col-span-2">
          <span id="pi-label" class="block text-sm font-semibold">Products of interest <span class="font-normal text-ink/60">(choose one or more)</span></span>
          <button type="button" class="field pick-btn" :class="{ 'is-open': pickOpen }" aria-haspopup="listbox" :aria-expanded="pickOpen" aria-labelledby="pi-label" @click="pickOpen = !pickOpen" @keydown.esc="pickOpen = false">
            <span v-if="!f.sel.length" class="text-ink/45">Select products…</span>
            <span v-else class="flex flex-wrap gap-1.5"><span v-for="n in f.sel" :key="n" class="chip">{{ n }}<span class="chip-x" role="button" :aria-label="'Remove ' + n" @click.stop="toggle(n)">✕</span></span></span>
            <svg class="pick-caret" viewBox="0 0 20 20" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m5 8 5 5 5-5" /></svg>
          </button>
          <Teleport to="body" :disabled="!sheet">
          <div v-if="pickOpen && sheet" class="pick-backdrop" aria-hidden="true" @click="pickOpen = false" />
          <Transition :name="sheet ? 'picks' : 'pickp'">
            <div v-if="pickOpen" ref="panel" class="pick-panel" :class="{ 'is-sheet': sheet }" role="listbox" aria-multiselectable="true" aria-labelledby="pi-label" @keydown.esc="pickOpen = false">
              <div v-if="sheet" class="pick-grab" aria-hidden="true" /><p v-if="sheet" class="px-3 pb-1 pt-1 text-sm font-semibold">Products of interest</p>
              <template v-for="g in groups" :key="g.cat">
                <p class="pick-cat">{{ g.cat }}</p>
                <button v-for="n in g.names" :key="n" type="button" role="option" :aria-selected="f.sel.includes(n)" class="pick-opt" :class="{ on: f.sel.includes(n) }" @click="toggle(n)">
                  <span class="pick-box" aria-hidden="true"><svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="m3 8.500 3.200 3L13 4.500" /></svg></span>{{ n }}
                </button>
              </template>
              <div class="pick-foot"><button type="button" class="text-xs font-semibold text-ink/60 underline-offset-4 hover:underline" @click="f.sel = []">Clear</button><button type="button" class="pick-done" @click="pickOpen = false">Done{{ f.sel.length ? ' (' + f.sel.length + ')' : '' }}</button></div>
            </div>
          </Transition>
          </Teleport>
        </div>
        <label class="block text-sm font-semibold sm:col-span-2">Message <span v-if="items.length || f.sel.length" class="font-normal text-ink/70">(optional)</span><textarea v-model="f.msg" rows="3" :required="!items.length && !f.sel.length" class="field" placeholder="Quantities, destination, timing…" /></label>
        <!-- honeypot: hidden from people, bots fill it in -->
        <input v-model="f.botcheck" type="checkbox" tabindex="-1" autocomplete="off" class="hidden" aria-hidden="true" />
      </div>
      <p v-if="hint" class="mt-4 rounded-xl bg-tomato/10 p-3 text-sm text-tomato" role="alert">{{ hint }}</p>
      <p v-if="error" class="mt-4 rounded-xl bg-tomato/10 p-3 text-sm text-tomato" role="alert">{{ error }} You can also email <a class="font-semibold underline" :href="mailto">{{ email }}</a> or <a class="font-semibold underline" :href="wa('Hello Premier Veg, I would like a quote.')" target="_blank" rel="noopener">WhatsApp us</a>.</p>
      <button class="btn btn-dark mt-6 w-full justify-center disabled:opacity-60" type="submit" :disabled="sending">{{ sending ? 'Sending…' : 'Send enquiry' }} <span v-if="!sending" aria-hidden="true">→</span></button>
      <div class="my-3 flex items-center gap-3 text-xs text-ink/55" aria-hidden="true"><span class="h-px flex-1 bg-forest/15" />or<span class="h-px flex-1 bg-forest/15" /></div>
      <button class="wa-btn flex w-full cursor-pointer items-center justify-center gap-2.5 rounded-full border-2 border-[#1FA855] bg-white px-6 py-3.5 text-sm font-bold text-[#128C45] transition hover:bg-[#1FA855] hover:text-white" type="button" @click="sendWa">
        <svg class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12.04 2a9.9 9.9 0 0 0-8.5 14.9L2 22l5.25-1.38A9.9 9.9 0 1 0 12.04 2zm0 1.8a8.1 8.1 0 1 1-4.2 15.02l-.3-.18-3.1.82.83-3.02-.2-.31A8.1 8.1 0 0 1 12.04 3.8zm-3.1 3.9c-.17 0-.45.06-.69.32-.24.26-.9.88-.9 2.15s.92 2.5 1.05 2.67c.13.17 1.8 2.86 4.43 3.9 2.19.86 2.63.69 3.1.65.48-.04 1.54-.63 1.76-1.24.22-.6.22-1.13.15-1.24-.06-.11-.24-.17-.5-.3-.27-.13-1.54-.76-1.78-.85-.24-.09-.41-.13-.59.13-.17.26-.67.85-.82 1.02-.15.18-.3.2-.57.07-.26-.13-1.1-.4-2.1-1.3-.77-.69-1.3-1.54-1.45-1.8-.15-.26-.02-.4.11-.53.12-.12.26-.3.39-.46.13-.15.17-.26.26-.43.09-.17.04-.33-.02-.46-.07-.13-.59-1.4-.8-1.92-.22-.5-.43-.43-.59-.44h-.5z"/></svg>
        Send via WhatsApp
      </button>
      <p class="mt-3 text-xs text-ink/70">{{ formKey ? 'Your details are used only to reply to this enquiry.' : 'Send opens your email app with the enquiry pre-filled. WhatsApp opens a chat with it ready to send.' }}</p>
    </form>
    <div v-else ref="done" class="relative overflow-hidden py-10 text-center" role="status">
      <div class="mx-auto grid h-16 w-16 place-items-center rounded-full bg-lime text-2xl text-forest">✓</div>
      <h3 class="display mt-6 text-3xl">Thank you{{ f.name ? ', ' + f.name.split(' ')[0] : '' }}.</h3>
      <p class="mx-auto mt-3 max-w-sm text-ink/70">{{ via === 'wa' ? 'WhatsApp should have opened with your enquiry ready to send. Just tap Send in the chat. If it did not open, use the button below.' : formKey ? "We've received your enquiry and will respond within 24 hours." : 'Your email app should have opened with your enquiry. If not, write to ' + email + '.' }}</p>
      <div class="mt-6 flex flex-wrap justify-center gap-3">
        <a class="btn btn-dark" :href="via === 'wa' ? waUrl : wa('Hello Premier Veg, I just sent a quote request' + (f.name ? ' (' + f.name + ')' : '') + '.')" target="_blank" rel="noopener">{{ via === 'wa' ? 'Open WhatsApp again' : 'Chat on WhatsApp' }}</a>
        <button class="btn btn-ghost !text-forest" type="button" @click="sent = false">Send another</button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import gsap from 'gsap'
import { products } from '~/data'
const props = defineProps<{ product?: string; heading?: string }>()
const { formKey, email, wa } = useSite()
const { items, remove, clear } = useQuote()
const f = reactive({ name: '', company: '', email: '', sel: (props.product ? [props.product] : []) as string[], msg: '', botcheck: false })
const enquiry = useState<string>('enquiry', () => '')
watch(enquiry, (v) => { if (v) f.sel = [v] }, { immediate: true })
watch(() => props.product, (v) => { if (v) f.sel = [v] })
// themed multi-select for the products of interest
const groups = (['Vegetables', 'Fruits', 'Herbs'] as const).map((cat) => ({ cat, names: products.filter((p) => p.cat === cat).map((p) => p.name) }))
const pickOpen = ref(false); const pick = ref<HTMLElement>(); const panel = ref<HTMLElement>()
// on phones the list opens as a bottom sheet so it is never cut off by the screen edge
const sheet = ref(false)
const toggle = (n: string) => { f.sel = f.sel.includes(n) ? f.sel.filter((x) => x !== n) : [...f.sel, n] }
const outside = (e: PointerEvent) => { const t = e.target as Node; if (pickOpen.value && !sheet.value && pick.value && !pick.value.contains(t) && !panel.value?.contains(t)) pickOpen.value = false }
const mq = typeof window !== 'undefined' ? window.matchMedia('(max-width: 639px)') : null
const syncSheet = () => { sheet.value = !!mq?.matches }
onMounted(() => { syncSheet(); mq?.addEventListener('change', syncSheet); document.addEventListener('pointerdown', outside) })
onBeforeUnmount(() => { document.removeEventListener('pointerdown', outside); mq?.removeEventListener('change', syncSheet) })
const hint = ref('')
const via = ref<'mail' | 'wa'>('mail'); const waUrl = ref('')
const sent = ref(false); const sending = ref(false); const error = ref(''); const done = ref<HTMLElement>()

const compose = () => {
  const lines = [`Name: ${f.name}`, `Company: ${f.company || '-'}`, `Email: ${f.email}`]
  if (items.value.length) lines.push('', 'Quote list:', ...items.value.map((i, n) => `${n + 1}. ${i.name} (${i.kind}${i.code ? ', ' + i.code : ''}) — quantity: ${i.qty || 'to be discussed'}`))
  else if (f.sel.length) lines.push(`Products: ${f.sel.join(', ')}`)
  if (f.msg) lines.push('', f.msg)
  return lines.join('\n')
}
const subject = () => 'Quote request — ' + (items.value.length ? items.value.map((i) => i.name).slice(0, 3).join(', ') + (items.value.length > 3 ? ` +${items.value.length - 3}` : '') : (f.sel.length ? f.sel.slice(0, 3).join(', ') + (f.sel.length > 3 ? ` +${f.sel.length - 3}` : '') : 'General'))
const mailto = computed(() => `mailto:${email}?subject=${encodeURIComponent(subject())}&body=${encodeURIComponent(compose())}`)

const composeWa = () => {
  const lines = ['Hello Premier Veg, I would like to request a quote.', '', `Name: ${f.name}`]
  if (f.company) lines.push(`Company: ${f.company}`)
  if (f.email) lines.push(`Email: ${f.email}`)
  if (items.value.length) lines.push('', 'Quote list:', ...items.value.map((i, n) => `${n + 1}. ${i.name} (${i.kind}${i.code ? ', ' + i.code : ''}), quantity: ${i.qty || 'to be discussed'}`))
  else if (f.sel.length) lines.push(`Products: ${f.sel.join(', ')}`)
  if (f.msg) lines.push('', f.msg)
  return lines.join('\n')
}
// WhatsApp: opens a chat with the enquiry already typed in; the visitor just taps Send
const sendWa = () => {
  error.value = ''; hint.value = ''
  if (!f.name.trim()) { hint.value = 'Please add your name first.'; return }
  if (!items.value.length && !f.msg.trim() && !f.sel.length) { hint.value = 'Please tell us what you need: pick at least one product or write a short message.'; return }
  waUrl.value = wa(composeWa()); via.value = 'wa'
  window.open(waUrl.value, '_blank', 'noopener')
  finish()
}
const finish = () => { sent.value = true; clear(); nextTick(burst) }
const send = async () => {
  error.value = ''; hint.value = ''
  via.value = 'mail'
  if (f.botcheck) return finish() // bot: pretend success, send nothing
  if (!formKey) { window.location.href = mailto.value; return finish() }
  sending.value = true
  try {
    const res = await fetch('https://api.web3forms.com/submit', {
      method: 'POST', headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ access_key: formKey, subject: subject(), from_name: 'Premier Veg website', name: f.name, email: f.email, company: f.company, message: compose(), botcheck: '' })
    })
    const j = await res.json().catch(() => ({}))
    if (!res.ok || j.success === false) throw new Error(j.message || 'failed')
    finish()
  } catch {
    error.value = "Sorry, we couldn't send that just now."
  } finally { sending.value = false }
}
const burst = () => {
  if (!done.value || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  const colors = ['#C6F04A', '#1F5B3A', '#FFB627', '#FF5A36', '#0E2A1C']
  for (let i = 0; i < 36; i++) {
    const el = document.createElement('span'); const sz = 6 + Math.random() * 8
    el.style.cssText = `position:absolute;left:50%;top:80px;width:${sz}px;height:${sz * (Math.random() > .5 ? 1 : .45)}px;border-radius:${Math.random() > .5 ? '50%' : '2px'};background:${colors[i % 5]};pointer-events:none`
    done.value.appendChild(el)
    const a = Math.random() * Math.PI * 2, dist = 90 + Math.random() * 190
    gsap.fromTo(el, { x: 0, y: 0, scale: 0, rotate: 0 }, { x: Math.cos(a) * dist, y: Math.sin(a) * dist + 140, scale: 1, rotate: Math.random() * 540, duration: 1.4 + Math.random() * .6, ease: 'power3.out' })
    gsap.to(el, { opacity: 0, delay: 1.1, duration: .7, onComplete: () => el.remove() })
  }
}
</script>
<style>
.field { margin-top: .4rem; width: 100%; border-radius: .75rem; border: 1px solid rgba(14,42,28,.2); background: #fff; padding: .75rem 1rem; font-weight: 400; }

.pick-btn { position: relative; display: flex; align-items: center; min-height: 3.1rem; padding-right: 2.5rem; text-align: left; cursor: pointer; transition: border-color .2s, box-shadow .2s; }
.pick-btn:hover { border-color: rgba(31,91,58,.55); }
.pick-btn.is-open, .pick-btn:focus-visible { border-color: #1F5B3A; box-shadow: 0 0 0 3px rgba(198,240,74,.5); outline: none; }
.pick-caret { position: absolute; right: 1rem; top: 50%; margin-top: -8px; color: #1F5B3A; transition: transform .25s; }
.pick-btn.is-open .pick-caret { transform: rotate(180deg); }
.chip { display: inline-flex; align-items: center; gap: .4rem; border-radius: 9999px; background: #0E2A1C; color: #F5F1E6; padding: .2rem .35rem .2rem .7rem; font-size: .8rem; font-weight: 600; }
.chip-x { display: grid; place-items: center; width: 1.1rem; height: 1.1rem; border-radius: 9999px; background: rgba(255,255,255,.18); font-size: .55rem; transition: background .2s; }
.chip-x:hover { background: #C6F04A; color: #0E2A1C; }
.pick-panel { position: absolute; left: 0; right: 0; top: calc(100% + .4rem); z-index: 30; max-height: 19rem; overflow-y: auto; border-radius: 1.1rem; background: #0E2A1C; color: #F5F1E6; padding: .5rem; box-shadow: 0 24px 50px -12px rgba(14,42,28,.55); border: 1px solid rgba(255,255,255,.1); }
.pick-cat { padding: .6rem .8rem .25rem; font-size: .68rem; font-weight: 700; letter-spacing: .18em; text-transform: uppercase; color: #C6F04A; }
.pick-opt { display: flex; width: 100%; align-items: center; gap: .7rem; border-radius: .7rem; padding: .6rem .8rem; text-align: left; font-size: .92rem; cursor: pointer; transition: background .15s; }
.pick-opt:hover, .pick-opt:focus-visible { background: rgba(255,255,255,.09); outline: none; }
.pick-opt.on { background: rgba(198,240,74,.12); }
.pick-box { display: grid; place-items: center; width: 1.25rem; height: 1.25rem; flex: none; border-radius: .35rem; border: 1.5px solid rgba(245,241,230,.4); color: transparent; transition: all .15s; }
.pick-opt.on .pick-box { background: #C6F04A; border-color: #C6F04A; color: #0E2A1C; }
.pick-foot { position: sticky; bottom: -.5rem; display: flex; align-items: center; justify-content: space-between; margin-top: .4rem; padding: .6rem .6rem .1rem; background: linear-gradient(0deg, #0E2A1C 70%, transparent); }
.pick-foot .text-ink\/60 { color: rgba(245,241,230,.7); }
.pick-done { border-radius: 9999px; background: #C6F04A; color: #0E2A1C; padding: .45rem 1.1rem; font-size: .8rem; font-weight: 700; cursor: pointer; }
.pickp-enter-active { transition: opacity .18s, transform .22s cubic-bezier(.2,.9,.2,1); } .pickp-leave-active { transition: opacity .12s; }
.pickp-enter-from { opacity: 0; transform: translateY(-6px) scale(.98); } .pickp-leave-to { opacity: 0; }

.pick-backdrop { position: fixed; inset: 0; z-index: 199; background: rgba(5,18,11,.55); }
.pick-panel.is-sheet { position: fixed; left: 0; right: 0; top: auto; bottom: 0; z-index: 200; max-height: 74svh; border-radius: 1.6rem 1.6rem 0 0; padding: .4rem .75rem calc(.5rem + env(safe-area-inset-bottom)); border-bottom: 0; overscroll-behavior: contain; }
.pick-panel.is-sheet .pick-opt { padding: .85rem .8rem; font-size: 1rem; }
.pick-panel.is-sheet .pick-box { width: 1.4rem; height: 1.4rem; }
.pick-panel.is-sheet .pick-foot { bottom: -.1rem; padding-bottom: .4rem; }
.pick-panel.is-sheet .pick-done { padding: .7rem 1.6rem; font-size: .95rem; }
.pick-grab { width: 2.6rem; height: .3rem; margin: .2rem auto .6rem; border-radius: 9999px; background: rgba(245,241,230,.3); }
.picks-enter-active { transition: transform .3s cubic-bezier(.2,.9,.2,1); } .picks-leave-active { transition: transform .2s ease-in; }
.picks-enter-from, .picks-leave-to { transform: translateY(100%); }
.chip-x { width: 1.35rem; height: 1.35rem; }
</style>
