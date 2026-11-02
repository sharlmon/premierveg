<template>
  <div>
    <div class="bg-white"><ProductsSection lead /></div>
    <CtaBand />
  </div>
</template>
<script setup lang="ts">
usePageSeo({ title: 'Products — Fresh vegetables, fruit & herbs from Kenya | Premier Veg', description: 'Haricot verts, mangetouts, sugar snaps, carrots, avocados, mangoes, passion fruit, chillies, rosemary and chives, exported fresh from Kenya.', path: '/products/' })
import { products } from '~/data'
const { siteUrl } = useSite()
useHead({ script: [{ type: 'application/ld+json', innerHTML: JSON.stringify({ '@context': 'https://schema.org', '@type': 'ItemList', itemListElement: products.map((p, i) => ({ '@type': 'ListItem', position: i + 1, item: { '@type': 'Product', name: p.name, sku: p.code, category: p.cat, description: p.blurb, image: siteUrl + '/' + p.img, brand: { '@type': 'Brand', name: 'Premier Veg' } } })) }) }] })
onMounted(async () => { await nextTick(); usePageMotion() })
</script>
