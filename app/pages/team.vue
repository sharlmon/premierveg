<template>
  <div>
    <TeamSection lead />
    <CtaBand />
  </div>
</template>
<script setup lang="ts">
usePageSeo({ title: 'Team — Premier Veg Mondo Limited', description: 'Meet the Premier Veg team: owner, administration, operations, quality control and finance.', path: '/team/' })
onMounted(async () => { await nextTick(); usePageMotion() })
</script>
