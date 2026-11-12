<template>
  <div>
    <PackagesSection lead />
    <BoxExplorer />
    <CtaBand />
  </div>
</template>
<script setup lang="ts">
import { packages } from '~/data'
const { siteUrl } = useSite()
usePageSeo({ title: 'Packages — Export cartons & retail punnets | Premier Veg', description: 'Branded export cartons, top covers and retail punnets for fine beans, mangetouts, sugar snaps, baby corn and chillies, packed in Nairobi and ready for shelf.', name: 'Packages', path: '/packages/' })
useHead({ script: [{ key: 'ld-packages', type: 'application/ld+json', innerHTML: JSON.stringify({ '@context': 'https://schema.org', '@type': 'ItemList', itemListElement: packages.map((p, i) => ({ '@type': 'ListItem', position: i + 1, item: { '@type': 'Product', name: p.name + ' (' + p.kind.toLowerCase() + ')', sku: p.code, description: p.note, image: siteUrl + '/' + p.img, brand: { '@type': 'Brand', name: 'Premier Veg' } } })) }) }] })
onMounted(async () => { await nextTick(); usePageMotion() })
</script>
