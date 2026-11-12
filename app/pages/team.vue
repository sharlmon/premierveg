<template>
  <div>
    <TeamSection lead />
    <CtaBand />
  </div>
</template>
<script setup lang="ts">
import { team } from '~/data'
const { siteUrl } = useSite()
usePageSeo({ title: 'Team — Premier Veg Mondo Limited', description: 'Meet the Premier Veg team in Nairobi: the owner and director, administration, production and pack-house, operations and finance, and how to reach each of them.', name: 'Team', path: '/team/' })
useHead({ script: [{ key: 'ld-team', type: 'application/ld+json', innerHTML: JSON.stringify({ '@context': 'https://schema.org', '@graph': team.map((m) => ({ '@type': 'Person', name: m.name, jobTitle: m.role, ...(m.photo ? { image: siteUrl + '/' + m.photo } : {}), ...(m.email ? { email: m.email } : {}), telephone: m.phone.replace(/\s/g, ''), worksFor: { '@id': siteUrl + '/#org' } })) }) }] })
onMounted(async () => { await nextTick(); usePageMotion() })
</script>
