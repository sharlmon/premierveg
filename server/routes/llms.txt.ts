import { products, packages } from '~/data'
export default defineEventHandler((event) => {
  const base = String(useRuntimeConfig(event).public.siteUrl).replace(/\/$/, '')
  setHeader(event, 'content-type', 'text/plain; charset=utf-8')
  return `# Premier Veg Mondo Limited

> Exporter of fresh vegetables, fruit and herbs from Nairobi, Kenya. Established 2022, with operations also in Italy. Supplies customers in France, the Netherlands and Switzerland, year-round, to GlobalG.A.P. and SMETA standards.

## Key pages
- [Products](${base}/products/): ${products.map((p) => p.name).join(', ')}
- [Packages](${base}/packages/): ${packages.length} export cartons, top covers and retail punnets
- [About](${base}/about/): company, quality standards, certifications and FAQ
- [Team](${base}/team/): the people behind the produce
- [Contact and quotes](${base}/contact/): request a quote or place an order

## Contact
- Email: info@premierveg.com
- Phone / WhatsApp: +39 351 215 1931
- Address: Trystar Go Down, Airport North Road, P.O. Box 3468-00200, Nairobi, Kenya
- Quote requests are answered within 24 hours.
`
})
