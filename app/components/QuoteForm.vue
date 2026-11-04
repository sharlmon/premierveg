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
        <label v-if="!items.length" class="block text-sm font-semibold sm:col-span-2">Product of interest
          <select v-model="f.product" class="field"><option value="">Select…</option><option v-for="p in products" :key="p.code">{{ p.name }}</option></select>
        </label>
        <label class="block text-sm font-semibold sm:col-span-2">Message <span v-if="items.length" class="font-normal text-ink/70">(optional)</span><textarea v-model="f.msg" rows="3" :required="!items.length" class="field" placeholder="Quantities, destination, timing…" /></label>
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
const f = reactive({ name: '', company: '', email: '', product: props.product || '', msg: '', botcheck: false })
const enquiry = useState<string>('enquiry', () => '')
watch(enquiry, (v) => { if (v) f.product = v }, { immediate: true })
watch(() => props.product, (v) => { if (v) f.product = v })
const hint = ref('')
const via = ref<'mail' | 'wa'>('mail'); const waUrl = ref('')
const sent = ref(false); const sending = ref(false); const error = ref(''); const done = ref<HTMLElement>()

const compose = () => {
  const lines = [`Name: ${f.name}`, `Company: ${f.company || '-'}`, `Email: ${f.email}`]
  if (items.value.length) lines.push('', 'Quote list:', ...items.value.map((i, n) => `${n + 1}. ${i.name} (${i.kind}${i.code ? ', ' + i.code : ''}) — quantity: ${i.qty || 'to be discussed'}`))
  else if (f.product) lines.push(`Product: ${f.product}`)
  if (f.msg) lines.push('', f.msg)
  return lines.join('\n')
}
const subject = () => 'Quote request — ' + (items.value.length ? items.value.map((i) => i.name).slice(0, 3).join(', ') + (items.value.length > 3 ? ` +${items.value.length - 3}` : '') : f.product || 'General')
const mailto = computed(() => `mailto:${email}?subject=${encodeURIComponent(subject())}&body=${encodeURIComponent(compose())}`)

const composeWa = () => {
  const lines = ['Hello Premier Veg, I would like to request a quote.', '', `Name: ${f.name}`]
  if (f.company) lines.push(`Company: ${f.company}`)
  if (f.email) lines.push(`Email: ${f.email}`)
  if (items.value.length) lines.push('', 'Quote list:', ...items.value.map((i, n) => `${n + 1}. ${i.name} (${i.kind}${i.code ? ', ' + i.code : ''}), quantity: ${i.qty || 'to be discussed'}`))
  else if (f.product) lines.push(`Product: ${f.product}`)
  if (f.msg) lines.push('', f.msg)
  return lines.join('\n')
}
// WhatsApp: opens a chat with the enquiry already typed in; the visitor just taps Send
const sendWa = () => {
  error.value = ''; hint.value = ''
  if (!f.name.trim()) { hint.value = 'Please add your name first.'; return }
  if (!items.value.length && !f.msg.trim() && !f.product) { hint.value = 'Please tell us what you need: pick a product or write a short message.'; return }
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
</style>
