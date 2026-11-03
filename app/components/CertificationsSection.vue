<template>
  <section id="certifications" class="bg-white py-24 md:py-32">
    <div class="mx-auto grid max-w-7xl items-start gap-12 px-5 md:px-10 lg:grid-cols-12">
      <div class="lg:col-span-5">
        <p class="eyebrow mb-6 text-leaf" data-reveal>Certified &amp; compliant</p>
        <h2 class="display text-3xl md:text-5xl" data-lines><span class="line-mask"><span class="line-inner">Audited to</span></span><span class="line-mask"><span class="line-inner italic text-leaf">international standards.</span></span></h2>
        <p class="mt-6 max-w-md text-ink/70" data-reveal>Our produce is grown and handled to recognised international standards, with a dedicated compliance team behind every shipment to {{ markets.join(', ').replace(/, ([^,]*)$/, ' and $1') }}.</p>
        <NuxtLink to="/team" class="btn btn-dark mt-8" data-magnetic>Meet the compliance team <span aria-hidden="true">→</span></NuxtLink>
      </div>
      <ul class="grid gap-5 sm:grid-cols-2 lg:col-span-7" data-stagger>
        <li v-for="c in certifications" :key="c.name" class="reveal rounded-3xl border border-forest/15 bg-cream p-7">
          <span class="inline-block rounded-md border-2 border-forest px-3 py-1.5 font-mono text-sm font-bold tracking-wider text-forest" aria-hidden="true">{{ c.name === 'SMETA' ? 'SMETA' : 'G.A.P.' }}</span>
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
