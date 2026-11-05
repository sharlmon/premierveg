export const usePageSeo = (o: { title: string; description: string; path: string }) => {
  const { siteUrl } = useSite()
  const url = siteUrl + o.path
  const image = siteUrl + '/og.jpg'
  useSeoMeta({
    title: o.title, description: o.description,
    ogTitle: o.title, ogDescription: o.description, ogType: 'website', ogUrl: url, ogImage: image, ogImageWidth: 1200, ogImageHeight: 630, ogSiteName: 'Premier Veg Mondo Limited', ogLocale: 'en_GB',
    twitterCard: 'summary_large_image', twitterTitle: o.title, twitterDescription: o.description, twitterImage: image
  })
  useHead({ link: [{ rel: 'canonical', href: url }] })
}
