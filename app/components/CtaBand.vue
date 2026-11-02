<template>
  <section class="grain relative overflow-hidden bg-lime py-24 text-forest md:py-32">
    <div class="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-5 md:flex-row md:items-end md:px-10">
      <h2 class="display text-4xl md:text-5xl lg:text-6xl" data-lines><span class="line-mask"><span class="line-inner">We are ready</span></span><span class="line-mask"><span class="line-inner italic">for orders!</span></span></h2>
      <div class="flex flex-wrap gap-3"><button class="btn btn-dark" data-magnetic @click="open({ type: 'quote' })">Request a quote <span aria-hidden="true">→</span></button><NuxtLink to="/contact" class="btn btn-ghost">Contact details</NuxtLink></div>
    </div>
  </section>
</template>

<script setup lang="ts">const { open } = useModal()</script>
