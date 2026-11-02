<template>
  <div>
    <TeamSection lead />
    <CtaBand />
  </div>
</template>
<script setup lang="ts">
useHead({ title: 'Team — Premier Veg', meta: [{ name: 'description', content: 'The people behind Premier Veg Mondo Fresh.' }] })
onMounted(async () => { await nextTick(); usePageMotion() })
</script>
