<template>
  <div>
    <ContactSection lead />
    <FaqSection :items="contactFaqs" />
  </div>
</template>
<script setup lang="ts">
import { contactFaqs } from '~/data'
usePageSeo({ title: 'Contact & quotes — Premier Veg Mondo Limited', description: 'Request a quote or place an order with Premier Veg Mondo Limited in Nairobi, Kenya. Email, phone or WhatsApp, and we respond within 24 hours.', name: 'Contact', path: '/contact/', faq: contactFaqs })
onMounted(async () => { await nextTick(); usePageMotion() })
</script>
