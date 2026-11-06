export type Faq = { q: string; a: string }
export const usePageSeo = (o: { title: string; description: string; path: string; name?: string; faq?: Faq[] }) => {
  const { siteUrl } = useSite()
  const url = siteUrl + o.path
  const image = siteUrl + '/og.jpg'
  useSeoMeta({
    title: o.title, description: o.description,
    ogTitle: o.title, ogDescription: o.description, ogType: 'website', ogUrl: url, ogImage: image, ogImageWidth: 1200, ogImageHeight: 630, ogImageAlt: 'Premier Veg: fresh fruit, vegetables and herbs from Kenya', ogSiteName: 'Premier Veg Mondo Limited', ogLocale: 'en_GB',
    twitterCard: 'summary_large_image', twitterTitle: o.title, twitterDescription: o.description, twitterImage: image, twitterImageAlt: 'Premier Veg: fresh fruit, vegetables and herbs from Kenya'
  })
  const ld: object[] = []
  if (o.path !== '/') ld.push({ '@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: siteUrl + '/' }, { '@type': 'ListItem', position: 2, name: o.name || o.title.split(/ [—|·] /)[0], item: url }] })
  if (o.faq?.length) ld.push({ '@context': 'https://schema.org', '@type': 'FAQPage', mainEntity: o.faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })) })
  useHead({ link: [{ rel: 'canonical', href: url }], script: ld.map((j, i) => ({ key: 'ld-page-' + i, type: 'application/ld+json', innerHTML: JSON.stringify(j) })) })
}
