<template>
  <div>
    <ProductsSection lead />
    <CtaBand />
  </div>
</template>
<script setup lang="ts">
useHead({ title: 'Products — Premier Veg', meta: [{ name: 'description', content: 'Ten export lines of fresh vegetables, fruit and herbs from Kenya.' }] })
onMounted(async () => { await nextTick(); usePageMotion() })
</script>
