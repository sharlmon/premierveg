<template>
  <section :class="lead ? 'pt-40 md:pt-48' : 'pt-28 md:pt-40'" id="contact" class="grain relative overflow-hidden bg-forest pb-28 text-cream md:pb-40">
    <div class="pointer-events-none absolute -bottom-40 -left-40 h-[36rem] w-[36rem] rounded-full bg-leaf/50 blur-3xl" />
    <div class="relative mx-auto grid max-w-7xl gap-16 px-5 md:px-10 lg:grid-cols-12">
      <div class="lg:col-span-6">
        <p class="eyebrow mb-6 text-lime" data-reveal>Contact</p>
        <component :is="lead ? 'h1' : 'h2'" class="display text-4xl md:text-6xl lg:text-7xl" data-lines><span class="line-mask"><span class="line-inner">We're ready</span></span><span class="line-mask"><span class="line-inner italic text-lime">for orders.</span></span></component>
        <p class="mt-8 max-w-md text-lg text-cream/75" data-reveal>Enquiries, requests, orders and comments — tell us what you need and we'll ship it as fast as it's processed.</p>
        <dl class="mt-12 space-y-6" data-reveal>
          <div><dt class="eyebrow text-cream/50">Email</dt><dd class="display text-xl"><a href="mailto:info@premierveg.com" class="hover:text-lime">info@premierveg.com</a></dd></div>
          <div><dt class="eyebrow text-cream/50">Phone</dt><dd class="display text-xl"><a href="tel:+393512151931" class="hover:text-lime">+39 351 215 1931</a></dd></div>
          <div><dt class="eyebrow text-cream/50">Location</dt><dd class="text-cream/85">Premier Veg Mondo Fresh<br />P. O. Box 3468-00200, Kileleshwa Birchwoods<br />Nairobi, Kenya</dd></div>
        </dl>
      </div>
      <form class="rounded-[2rem] bg-cream p-8 text-ink md:p-10 lg:col-span-6" @submit.prevent="send" data-reveal>
        <h3 class="display text-3xl">Request a quote</h3>
        <div class="mt-6 grid gap-5 sm:grid-cols-2">
          <label class="block text-sm font-semibold">Name<input v-model="f.name" required autocomplete="name" class="mt-2 w-full rounded-xl border border-forest/20 bg-white px-4 py-3 font-normal" /></label>
          <label class="block text-sm font-semibold">Company<input v-model="f.company" autocomplete="organization" class="mt-2 w-full rounded-xl border border-forest/20 bg-white px-4 py-3 font-normal" /></label>
          <label class="block text-sm font-semibold sm:col-span-2">Email<input v-model="f.email" type="email" required autocomplete="email" class="mt-2 w-full rounded-xl border border-forest/20 bg-white px-4 py-3 font-normal" /></label>
          <label class="block text-sm font-semibold sm:col-span-2">Product of interest
            <select v-model="f.product" class="mt-2 w-full rounded-xl border border-forest/20 bg-white px-4 py-3 font-normal"><option value="">Select…</option><option v-for="p in products" :key="p.code">{{ p.name }}</option></select>
          </label>
          <label class="block text-sm font-semibold sm:col-span-2">Message<textarea v-model="f.msg" rows="4" required class="mt-2 w-full rounded-xl border border-forest/20 bg-white px-4 py-3 font-normal" /></label>
        </div>
        <button class="btn btn-dark mt-6 w-full justify-center" type="submit" data-magnetic>Send enquiry <span aria-hidden="true">→</span></button>
        <p class="mt-3 text-xs text-ink/50">Opens your email app with the enquiry pre-filled. (Prototype — a hosted form service replaces this at launch.)</p>
      </form>
    </div>
  </section>
</template>
<script setup lang="ts">
defineProps<{ lead?: boolean }>()
import { products } from '~/data'
const f = reactive({ name: '', company: '', email: '', product: '', msg: '' })
const enquiry = useState<string>('enquiry', () => '')
watch(enquiry, (v) => { if (v) f.product = v }, { immediate: true })
const send = () => {
  const body = `Name: ${f.name}\nCompany: ${f.company}\nEmail: ${f.email}\nProduct: ${f.product}\n\n${f.msg}`
  window.location.href = `mailto:info@premierveg.com?subject=${encodeURIComponent('Quote request — ' + (f.product || 'General'))}&body=${encodeURIComponent(body)}`
}
</script>
