<template>
  <div>
    <form v-if="!sent" @submit.prevent="send">
      <h3 class="display text-2xl md:text-3xl">Request a quote</h3>
      <p class="mt-2 text-sm text-ink/60">Tell us what you need and we'll respond within 24 hours.</p>

      <!-- quote list -->
      <div v-if="items.length" class="mt-5 rounded-2xl border border-forest/15 bg-white p-3">
        <p class="eyebrow px-2 pb-2 text-leaf">Your quote list · {{ items.length }}</p>
        <ul class="divide-y divide-forest/10">
          <li v-for="it in items" :key="it.id" class="flex items-center gap-3 px-2 py-2.5">
            <div class="min-w-0 flex-1"><p class="truncate text-sm font-semibold">{{ it.name }}</p><p class="text-[11px] text-ink/50">{{ it.kind }}<span v-if="it.code"> · {{ it.code }}</span></p></div>
            <input v-model="it.qty" class="w-28 rounded-lg border border-forest/20 px-3 py-2 text-sm" :aria-label="'Quantity for ' + it.name" placeholder="e.g. 500 kg" />
            <button type="button" class="grid h-8 w-8 shrink-0 cursor-pointer place-items-center rounded-full bg-forest/10 text-xs transition hover:bg-forest hover:text-cream" :aria-label="'Remove ' + it.name" @click="remove(it.id)">✕</button>
          </li>
        </ul>
        <button type="button" class="mt-1 px-2 py-1 text-xs font-semibold text-ink/50 underline-offset-4 hover:underline" @click="clear()">Clear list</button>
      </div>

      <div class="mt-5 grid gap-4 sm:grid-cols-2">
        <label class="block text-sm font-semibold">Name<input v-model="f.name" required autocomplete="name" class="field" /></label>
        <label class="block text-sm font-semibold">Company<input v-model="f.company" autocomplete="organization" class="field" /></label>
        <label class="block text-sm font-semibold sm:col-span-2">Email<input v-model="f.email" type="email" required autocomplete="email" class="field" /></label>
        <label v-if="!items.length" class="block text-sm font-semibold sm:col-span-2">Product of interest
          <select v-model="f.product" class="field"><option value="">Select…</option><option v-for="p in products" :key="p.code">{{ p.name }}</option></select>
        </label>
        <label class="block text-sm font-semibold sm:col-span-2">Message <span v-if="items.length" class="font-normal text-ink/50">(optional)</span><textarea v-model="f.msg" rows="3" :required="!items.length" class="field" placeholder="Quantities, destination, timing…" /></label>
        <!-- honeypot: hidden from people, bots fill it in -->
        <input v-model="f.botcheck" type="checkbox" tabindex="-1" autocomplete="off" class="hidden" aria-hidden="true" />
      </div>
      <p v-if="error" class="mt-4 rounded-xl bg-tomato/10 p-3 text-sm text-tomato" role="alert">{{ error }} You can also email <a class="font-semibold underline" :href="mailto">{{ email }}</a> or <a class="font-semibold underline" :href="wa('Hello Premier Veg, I would like a quote.')" target="_blank" rel="noopener">WhatsApp us</a>.</p>
      <button class="btn btn-dark mt-6 w-full justify-center disabled:opacity-60" type="submit" :disabled="sending">{{ sending ? 'Sending…' : 'Send enquiry' }} <span v-if="!sending" aria-hidden="true">→</span></button>
      <p class="mt-3 text-xs text-ink/50">{{ formKey ? 'Your details are used only to reply to this enquiry.' : 'Opens your email app with the enquiry pre-filled.' }}</p>
    </form>
    <div v-else ref="done" class="relative overflow-hidden py-10 text-center" role="status">
      <div class="mx-auto grid h-16 w-16 place-items-center rounded-full bg-lime text-2xl text-forest">✓</div>
      <h3 class="display mt-6 text-3xl">Thank you{{ f.name ? ', ' + f.name.split(' ')[0] : '' }}.</h3>
      <p class="mx-auto mt-3 max-w-sm text-ink/65">{{ formKey ? "We've received your enquiry and will respond within 24 hours." : 'Your email app should have opened with your enquiry. If not, write to ' + email + '.' }}</p>
      <div class="mt-6 flex flex-wrap justify-center gap-3">
        <a class="btn btn-dark" :href="wa('Hello Premier Veg, I just sent a quote request' + (f.name ? ' (' + f.name + ')' : '') + '.')" target="_blank" rel="noopener">Chat on WhatsApp</a>
        <button class="btn btn-ghost !text-forest" type="button" @click="sent = false">Send another</button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import gsap from 'gsap'
import { products } from '~/data'
const props = defineProps<{ product?: string }>()
const { formKey, email, wa } = useSite()
const { items, remove, clear } = useQuote()
const f = reactive({ name: '', company: '', email: '', product: props.product || '', msg: '', botcheck: false })
const enquiry = useState<string>('enquiry', () => '')
watch(enquiry, (v) => { if (v) f.product = v }, { immediate: true })
watch(() => props.product, (v) => { if (v) f.product = v })
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

const finish = () => { sent.value = true; clear(); nextTick(burst) }
const send = async () => {
  error.value = ''
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
