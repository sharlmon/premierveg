<template>
  <div>
    <form v-if="!sent" @submit.prevent="send">
      <h3 class="display text-2xl md:text-3xl">Request a quote</h3>
      <p class="mt-2 text-sm text-ink/60">Tell us what you need and we'll come back to you.</p>
      <div class="mt-6 grid gap-4 sm:grid-cols-2">
        <label class="block text-sm font-semibold">Name<input v-model="f.name" required autocomplete="name" class="field" /></label>
        <label class="block text-sm font-semibold">Company<input v-model="f.company" autocomplete="organization" class="field" /></label>
        <label class="block text-sm font-semibold sm:col-span-2">Email<input v-model="f.email" type="email" required autocomplete="email" class="field" /></label>
        <label class="block text-sm font-semibold sm:col-span-2">Product of interest
          <select v-model="f.product" class="field"><option value="">Select…</option><option v-for="p in products" :key="p.code">{{ p.name }}</option></select>
        </label>
        <label class="block text-sm font-semibold sm:col-span-2">Message<textarea v-model="f.msg" rows="3" required class="field" /></label>
      </div>
      <button class="btn btn-dark mt-6 w-full justify-center" type="submit">Send enquiry <span aria-hidden="true">→</span></button>
      <p class="mt-3 text-xs text-ink/50">Opens your email app with the enquiry pre-filled. (Prototype — a hosted form service replaces this at launch.)</p>
    </form>
    <div v-else class="py-10 text-center" role="status">
      <div class="mx-auto grid h-16 w-16 place-items-center rounded-full bg-lime text-2xl text-forest">✓</div>
      <h3 class="display mt-6 text-3xl">Thank you{{ f.name ? ', ' + f.name.split(' ')[0] : '' }}.</h3>
      <p class="mx-auto mt-3 max-w-sm text-ink/65">Your email app should have opened with your enquiry. If not, write to <a class="underline" href="mailto:info@premierveg.com">info@premierveg.com</a>.</p>
      <button class="btn btn-ghost mt-6 !text-forest" type="button" @click="sent = false">Send another</button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { products } from '~/data'
const props = defineProps<{ product?: string }>()
const f = reactive({ name: '', company: '', email: '', product: props.product || '', msg: '' })
const enquiry = useState<string>('enquiry', () => '')
watch(enquiry, (v) => { if (v) f.product = v }, { immediate: true })
watch(() => props.product, (v) => { if (v) f.product = v })
const sent = ref(false)
const send = () => {
  const body = `Name: ${f.name}\nCompany: ${f.company}\nEmail: ${f.email}\nProduct: ${f.product}\n\n${f.msg}`
  window.location.href = `mailto:info@premierveg.com?subject=${encodeURIComponent('Quote request — ' + (f.product || 'General'))}&body=${encodeURIComponent(body)}`
  sent.value = true
}
</script>
<style>
.field { margin-top: .4rem; width: 100%; border-radius: .75rem; border: 1px solid rgba(14,42,28,.2); background: #fff; padding: .75rem 1rem; font-weight: 400; }
</style>
