<template>
  <div><ContactSection lead /></div>
</template>
<script setup lang="ts">
useHead({ title: 'Contact — Premier Veg', meta: [{ name: 'description', content: 'Request a quote or place an order with Premier Veg Mondo Fresh, Nairobi.' }] })
onMounted(async () => { await nextTick(); usePageMotion() })
</script>
