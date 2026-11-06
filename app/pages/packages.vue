<template>
  <div>
    <PackagesSection lead />
    <BoxExplorer />
    <CtaBand />
  </div>
</template>
<script setup lang="ts">
usePageSeo({ title: 'Packages — Export cartons & retail punnets | Premier Veg', description: 'Branded export cartons, top covers and retail punnets for fine beans, mangetouts, sugar snaps, baby corn and chillies, packed in Nairobi and ready for shelf.', name: 'Packages', path: '/packages/' })
onMounted(async () => { await nextTick(); usePageMotion() })
</script>
