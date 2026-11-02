<template>
  <div>
    <PackagesSection lead />
    <CtaBand />
  </div>
</template>
<script setup lang="ts">
useHead({ title: 'Packages — Premier Veg', meta: [{ name: 'description', content: 'Export cartons and retail punnets, ready for shelf.' }] })
onMounted(async () => { await nextTick(); usePageMotion() })
</script>
