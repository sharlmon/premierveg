<template>
  <section id="contact" v-spot :class="lead ? 'pt-40 md:pt-48' : 'pt-28 md:pt-40'" class="grain relative overflow-hidden bg-forest pb-28 text-cream md:pb-40">
    <img :src="asset('img/beans-bunch.webp')" alt="" aria-hidden="true" class="pointer-events-none absolute inset-0 h-full w-full object-cover opacity-35" />
    <div class="pointer-events-none absolute inset-0 bg-gradient-to-r from-forest/50 via-transparent to-forest/30" />
    <div class="pointer-events-none absolute -bottom-40 -left-40 h-[36rem] w-[36rem] rounded-full bg-leaf/50 blur-3xl" />
    <div class="pointer-events-none absolute inset-0" style="background: radial-gradient(520px circle at var(--mx, 70%) var(--my, 20%), rgba(198,240,74,.13), transparent 60%)" />
    <div class="relative mx-auto grid max-w-7xl gap-16 px-5 md:px-10 lg:grid-cols-12">
      <div class="lg:col-span-6">
        <p class="eyebrow mb-6 text-lime" data-reveal>Contact us</p>
        <component :is="lead ? 'h1' : 'h2'" class="display text-4xl md:text-6xl lg:text-7xl" data-lines><span class="line-mask"><span class="line-inner">We are ready</span></span><span class="line-mask"><span class="line-inner italic text-lime">to engage.</span></span></component>
        <p class="mt-8 max-w-md text-lg text-cream/75" data-reveal>For all your inquiry, requests, orders and comments, Premier Veg is ready to converse with you today! Your order will be shipped as fast as it is processed.</p>
        <dl class="mt-12 space-y-6" data-reveal>
          <div><dt class="eyebrow text-cream/70">E-mail</dt><dd class="display text-xl"><a href="mailto:info@premierveg.com" class="tap hover:text-lime">info@premierveg.com</a></dd></div>
          <div><dt class="eyebrow text-cream/70">Phone</dt><dd class="display text-xl"><a href="tel:+393512151931" class="tap hover:text-lime">+39 351 215 1931</a></dd></div>
          <div><dt class="eyebrow text-cream/70">WhatsApp</dt><dd class="display text-xl"><a :href="wa('Hello Premier Veg, I would like to enquire about your fresh produce.')" target="_blank" rel="noopener" class="tap hover:text-lime">Chat with us ↗</a></dd></div>
          <div><dt class="eyebrow text-cream/70">Location</dt><dd class="text-cream/85">Premier Veg Mondo Limited<br />Trystar Go Down, Airport North Road<br />P. O. Box 3468-00200, Nairobi, Kenya</dd></div>
        </dl>
        <div class="mt-10 flex max-w-md items-center gap-4 rounded-3xl bg-white/10 p-4 ring-1 ring-white/15 backdrop-blur" data-reveal>
          <img :src="asset('img/team/brenda.jpg')" alt="" width="72" height="72" loading="lazy" class="h-[4.5rem] w-[4.5rem] shrink-0 rounded-2xl object-cover object-top" />
          <div class="min-w-0">
            <p class="eyebrow text-lime">Talk to the director</p>
            <p class="display text-xl leading-tight">Brenda Ogollah</p>
            <p class="text-sm text-cream/70">Owner &amp; Director</p>
            <div class="mt-2.5 flex flex-wrap gap-2">
              <NuxtLink to="/card/brenda" class="rounded-full bg-lime px-4 py-2 text-xs font-bold text-forest transition hover:brightness-95">View contact card</NuxtLink>
              <a :href="asset('card/brenda/Brenda-Ogollah.vcf')" download class="rounded-full border border-white/30 px-4 py-2 text-xs font-semibold transition hover:bg-white/10">Save contact</a>
            </div>
          </div>
        </div>
        <div class="mt-10 max-w-sm" data-reveal><LiveClocks /></div>
      </div>
      <div class="rounded-[2rem] bg-cream p-8 text-ink md:p-10 lg:col-span-6 lg:self-start" data-reveal><QuoteForm heading="h2" /></div>
    </div>
  </section>
</template>
<script setup lang="ts">
defineProps<{ lead?: boolean }>()
const asset = useAsset()
const { wa } = useSite()
</script>
