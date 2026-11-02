<template>
  <Transition name="pill">
    <button v-if="items.length && !state" class="fixed bottom-5 left-1/2 z-[60] flex -translate-x-1/2 cursor-pointer items-center gap-3 rounded-full bg-forest py-2 pl-2 pr-5 text-sm font-semibold text-cream shadow-[0_16px_40px_-10px_rgba(0,0,0,.6)] ring-1 ring-white/15 transition hover:bg-leaf" aria-label="Open your quote list" @click="open({ type: 'quote' })">
      <span class="grid h-9 min-w-9 place-items-center rounded-full bg-lime px-2 font-bold text-forest">{{ items.length }}</span>
      Quote list <span class="text-lime" aria-hidden="true">→</span>
    </button>
  </Transition>
</template>
<script setup lang="ts">
const { items } = useQuote(); const { state, open } = useModal()
</script>
<style>
.pill-enter-active { transition: opacity .35s, transform .5s cubic-bezier(.2,.9,.2,1); }
.pill-leave-active { transition: opacity .2s, transform .2s; }
.pill-enter-from, .pill-leave-to { opacity: 0; transform: translate(-50%, 24px); }
</style>
