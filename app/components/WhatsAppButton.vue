<template>
  <a :href="wa('Hello Premier Veg, I would like to enquire about your fresh produce.')" target="_blank" rel="noopener" class="wa group fixed bottom-5 right-4 z-[60] flex items-center rounded-full bg-[#25D366] p-1.5 text-[#06331a] shadow-[0_14px_34px_-10px_rgba(6,51,26,.65)] ring-1 ring-white/40 transition-[transform,opacity] duration-500 sm:right-6" :class="shown ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-6 opacity-0'" aria-label="Let's talk on WhatsApp">
    <span class="wa-label overflow-hidden whitespace-nowrap text-sm font-bold" aria-hidden="true"><span class="block pl-4 pr-2">Let’s talk on WhatsApp</span></span>
    <span class="relative grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#06331a] text-[#25D366] transition-transform duration-300 group-hover:scale-95">
      <span class="wa-ring absolute inset-0 rounded-full" aria-hidden="true" />
      <svg class="relative h-6 w-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.5a9.5 9.5 0 0 0-8.2 14.3L2.5 21.5l4.8-1.2A9.5 9.5 0 1 0 12 2.5Zm0 1.8a7.7 7.7 0 1 1-3.900 14.300l-.4-.2-2.700.7.7-2.600-.3-.4A7.700 7.700 0 0 1 12 4.300Zm-3 3.700c-.2 0-.5.100-.7.400-.3.300-.9.900-.9 2.200s1 2.600 1.100 2.700c.1.200 1.900 3 4.700 4.100 2.300.9 2.800.7 3.300.7.500-.1 1.600-.7 1.800-1.300.2-.6.2-1.200.2-1.300-.1-.1-.2-.2-.5-.3l-1.600-.8c-.2-.1-.4-.1-.6.100l-.8 1c-.1.200-.3.200-.5.100-.3-.1-1.100-.4-2.100-1.300-.8-.7-1.300-1.500-1.400-1.800-.2-.3 0-.4.100-.5l.4-.5.3-.4c.1-.2.1-.3 0-.5l-.7-1.700c-.2-.4-.4-.4-.5-.4H9Z"/></svg>
    </span>
  </a>
</template>
<script setup lang="ts">
const { wa } = useSite(); const route = useRoute()
const y = ref(0)
const shown = computed(() => route.path !== '/' || y.value > 600) // keep the home hero clean
onMounted(() => { const f = () => (y.value = window.scrollY); f(); window.addEventListener('scroll', f, { passive: true }) })
</script>
<style>
.wa-label { max-width: 0; opacity: 0; transition: max-width .5s cubic-bezier(.2,.8,.2,1), opacity .3s; }
.wa:hover .wa-label, .wa:focus-visible .wa-label { max-width: 16rem; opacity: 1; }
.wa-ring { box-shadow: 0 0 0 0 rgba(37,211,102,.7); animation: waping 2.4s cubic-bezier(.2,.6,.3,1) infinite; }
.wa:hover .wa-ring { animation: none; }
@keyframes waping { 0% { box-shadow: 0 0 0 0 rgba(37,211,102,.65); } 70%, 100% { box-shadow: 0 0 0 16px rgba(37,211,102,0); } }
@media (hover: none) { .wa-label { display: none; } }
@media (prefers-reduced-motion: reduce) { .wa-ring { animation: none; } .wa-label { transition: none; } }
</style>
