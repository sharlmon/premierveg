<template>
  <div>
    <TeamSection lead />
    <CtaBand />
  </div>
</template>
<script setup lang="ts">
usePageSeo({ title: 'Team — Premier Veg Mondo Limited', description: 'Meet the Premier Veg team in Nairobi: the owner and director, administration, production and pack-house, operations and finance, and how to reach each of them.', name: 'Team', path: '/team/' })
onMounted(async () => { await nextTick(); usePageMotion() })
</script>
