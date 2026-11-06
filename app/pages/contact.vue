<template>
  <div><ContactSection lead /></div>
</template>
<script setup lang="ts">
usePageSeo({ title: 'Contact & quotes — Premier Veg Mondo Limited', description: 'Request a quote or place an order with Premier Veg Mondo Limited in Nairobi, Kenya. Email, phone or WhatsApp, and we respond within 24 hours.', name: 'Contact', path: '/contact/' })
onMounted(async () => { await nextTick(); usePageMotion() })
</script>
