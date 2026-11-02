<template>
  <div>
    <PackagesSection lead />
    <BoxExplorer />
    <CtaBand />
  </div>
</template>
<script setup lang="ts">
usePageSeo({ title: 'Packages — Export cartons & retail punnets | Premier Veg', description: 'Export cartons and retail punnets for beans, mangetouts, baby corn and chillies, ready for shelf.', path: '/packages/' })
onMounted(async () => { await nextTick(); usePageMotion() })
</script>
