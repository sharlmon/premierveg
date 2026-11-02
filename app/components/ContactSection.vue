<template>
  <section id="contact" :class="lead ? 'pt-40 md:pt-48' : 'pt-28 md:pt-40'" class="grain relative overflow-hidden bg-forest pb-28 text-cream md:pb-40">
    <div class="pointer-events-none absolute -bottom-40 -left-40 h-[36rem] w-[36rem] rounded-full bg-leaf/50 blur-3xl" />
    <div class="relative mx-auto grid max-w-7xl gap-16 px-5 md:px-10 lg:grid-cols-12">
      <div class="lg:col-span-6">
        <p class="eyebrow mb-6 text-lime" data-reveal>Contact us</p>
        <component :is="lead ? 'h1' : 'h2'" class="display text-4xl md:text-6xl lg:text-7xl" data-lines><span class="line-mask"><span class="line-inner">We are ready</span></span><span class="line-mask"><span class="line-inner italic text-lime">to engage.</span></span></component>
        <p class="mt-8 max-w-md text-lg text-cream/75" data-reveal>For all your inquiry, requests, orders and comments, Premier Veg is ready to converse with you today! Your order will be shipped as fast as it is processed.</p>
        <dl class="mt-12 space-y-6" data-reveal>
          <div><dt class="eyebrow text-cream/50">E-mail</dt><dd class="display text-xl"><a href="mailto:info@premierveg.com" class="hover:text-lime">info@premierveg.com</a></dd></div>
          <div><dt class="eyebrow text-cream/50">Phone</dt><dd class="display text-xl"><a href="tel:+393512151931" class="hover:text-lime">+39 351 215 1931</a></dd></div>
          <div><dt class="eyebrow text-cream/50">Location</dt><dd class="text-cream/85">Premier Veg Mondo Fresh<br />P. O. Box 3468-00200, Kileleshwa Birchwoods<br />Nairobi, Kenya</dd></div>
        </dl>
      </div>
      <div class="rounded-[2rem] bg-cream p-8 text-ink md:p-10 lg:col-span-6" data-reveal><QuoteForm /></div>
    </div>
  </section>
</template>
<script setup lang="ts">
defineProps<{ lead?: boolean }>()
</script>
