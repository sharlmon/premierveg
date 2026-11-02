<template>
  <section id="top" class="grain relative min-h-[100svh] overflow-hidden bg-forest text-cream">
    <div class="pointer-events-none absolute -left-40 top-1/3 h-[34rem] w-[34rem] rounded-full bg-leaf/60 blur-3xl" />
    <div class="pointer-events-none absolute -right-32 -top-20 h-[26rem] w-[26rem] rounded-full bg-lime/20 blur-3xl" />
    <div class="relative mx-auto grid max-w-7xl gap-10 px-5 pb-20 pt-36 md:px-10 lg:grid-cols-12 lg:pt-44">
      <div class="lg:col-span-7">
        <p class="hero-fade eyebrow mb-8 flex items-center gap-3 text-lime"><span class="h-px w-10 bg-lime" /> Nairobi · Italy · Worldwide</p>
        <h1 class="display text-[clamp(2.9rem,6.4vw,6.2rem)]">
          <span class="line-mask"><span class="line-inner hero-line">Fresh from</span></span>
          <span class="line-mask"><span class="line-inner hero-line italic text-lime">Kenya,</span></span>
          <span class="line-mask"><span class="line-inner hero-line">on your shelf.</span></span>
        </h1>
        <p class="hero-fade mt-8 max-w-xl text-lg text-cream/75">Year-round fruit, vegetables and herbs from tropical partner farms — graded to Category 1, packed in a temperature-controlled pack-house and fully traceable to the field.</p>
        <div class="hero-fade mt-10 flex flex-wrap gap-4">
          <a href="#contact" class="btn btn-lime" data-magnetic>Request a quote <span aria-hidden="true">→</span></a>
          <a href="#products" class="btn btn-ghost" data-magnetic>Explore products</a>
        </div>
        <dl class="hero-fade mt-14 grid max-w-xl grid-cols-3 gap-6 border-t border-white/15 pt-8">
          <div><dt class="eyebrow text-cream/55">Since</dt><dd class="display mt-1 text-4xl">2022</dd></div>
          <div><dt class="eyebrow text-cream/55">Products</dt><dd class="display mt-1 text-4xl"><span data-count="10">10</span>+</dd></div>
          <div><dt class="eyebrow text-cream/55">Supply</dt><dd class="display mt-1 text-4xl">365<span class="text-lime">d</span></dd></div>
        </dl>
      </div>
      <div class="hero-media relative min-h-[26rem] lg:col-span-5" aria-hidden="true">
        <div class="hero-card float absolute right-0 top-0 h-[22rem] w-[48%] overflow-hidden rounded-t-full border border-white/15 shadow-2xl sm:h-[26rem]"><img :src="asset('img/vegetables_peas.jpg')" alt="" class="h-full w-full object-cover" /></div>
        <div class="hero-card float absolute bottom-0 left-0 h-[20rem] w-[48%] overflow-hidden rounded-t-full border border-white/15 shadow-2xl sm:h-[24rem]"><img :src="asset('img/herbs_chillis.jpg')" alt="" class="h-full w-full object-cover" /></div>
        <div class="hero-card float absolute left-[38%] top-[34%] grid h-28 w-28 place-items-center rounded-full bg-lime text-center text-forest shadow-xl">
          <span class="eyebrow leading-tight">Cat. 1<br />Export</span>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">const asset = useAsset()</script>
