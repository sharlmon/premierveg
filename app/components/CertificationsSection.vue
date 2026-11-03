<template>
  <section id="certifications" class="bg-white py-24 md:py-32">
    <div class="mx-auto grid max-w-7xl items-start gap-12 px-5 md:px-10 lg:grid-cols-12">
      <div class="lg:col-span-5">
        <p class="eyebrow mb-6 text-leaf" data-reveal>Certified &amp; compliant</p>
        <h2 class="display text-3xl md:text-5xl" data-lines><span class="line-mask"><span class="line-inner">Quality you can</span></span><span class="line-mask"><span class="line-inner italic text-leaf">audit and trust.</span></span></h2>
        <p class="mt-6 max-w-md text-ink/70" data-reveal>Our produce is grown and handled to recognised international standards, with a dedicated compliance team behind every shipment to {{ markets.join(', ').replace(/, ([^,]*)$/, ' and $1') }}.</p>
        <NuxtLink to="/team" class="btn btn-dark mt-8" data-magnetic>Meet the compliance team <span aria-hidden="true">→</span></NuxtLink>
      </div>
      <ul class="grid gap-5 sm:grid-cols-2 lg:col-span-7" data-stagger>
        <li v-for="c in certifications" :key="c.name" class="reveal rounded-3xl border border-forest/15 bg-cream p-7">
          <span class="grid h-14 w-14 place-items-center rounded-full bg-forest text-lime" aria-hidden="true"><svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l7 3v5c0 4.500-3 8-7 10-4-2-7-5.500-7-10V6l7-3Z"/><path d="m9 12 2 2 4-4"/></svg></span>
          <h3 class="display mt-6 text-3xl">{{ c.name }}</h3>
          <p class="eyebrow mt-1 text-leaf">{{ c.what }}</p>
          <p class="mt-4 text-sm text-ink/70">{{ c.d }}</p>
        </li>
      </ul>
    </div>
  </section>
</template>
<script setup lang="ts">
import { certifications, markets } from '~/data'
</script>
