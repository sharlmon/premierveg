<template>
  <div><ContactSection lead /></div>
</template>
<script setup lang="ts">
usePageSeo({ title: 'Contact & quotes — Premier Veg Mondo Fresh', description: 'Request a quote or place an order with Premier Veg Mondo Fresh, Nairobi, Kenya. Email, phone and WhatsApp.', path: '/contact/' })
onMounted(async () => { await nextTick(); usePageMotion() })
</script>
