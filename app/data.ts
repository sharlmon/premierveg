// Content taken from premierveg.com (copy lightly cleaned for typos only).
// Product.specs (shelfLife / season / sizes) are intentionally empty: fill them in once the client supplies real data.
// Anything left empty shows as "On request" in the product popup and the PDF spec sheet.
export type Product = { code: string; name: string; cat: 'Vegetables' | 'Fruits' | 'Herbs'; blurb: string; color: string; img: string; pack: string[]; specs?: { shelfLife?: string; season?: string; sizes?: string } }
export type Pack = { id: string; code: string; name: string; note: string; kind: 'Carton' | 'Top cover' | 'Punnet'; img: string; product?: string }
export type Member = { name: string; role: string; email: string; phone: string; quote?: string; photo?: string; bio: string[] }

export const products: Product[] = [
  { code: 'PVHV100', name: 'Haricot Verts', cat: 'Vegetables', blurb: 'Also known as French beans, they are planted from seedling and give tender produce and a dependable supply.', color: '#1F5B3A', img: 'img/products/haricot-verts.webp', pack: ['CHV001', 'PXF001'] },
  { code: 'PVMT100', name: 'Mangetouts', cat: 'Vegetables', blurb: 'A flat-podded variety of pea with an excellent fibre content.', color: '#3F8F4F', img: 'img/products/mangetouts.webp', pack: ['CMT001-T', 'CMT001-C', 'PSS001'] },
  { code: 'PVSS100', name: 'Sugar Snaps', cat: 'Vegetables', blurb: 'Rounded-shape peas, with fibre content.', color: '#6DB33F', img: 'img/products/sugar-snaps.webp', pack: ['PMT001'] },
  { code: 'PVCT100', name: 'Carrots', cat: 'Vegetables', blurb: 'Rich in beta-carotene, which is good for eyesight.', color: '#E8700A', img: 'img/products/carrots.webp', pack: [] },
  { code: 'PVAV100', name: 'Avocados', cat: 'Fruits', blurb: 'The fruit of the avocado plant, rich in oil.', color: '#2E5A2B', img: 'img/products/avocados.webp', pack: [] },
  { code: 'PVMG100', name: 'Mangoes', cat: 'Fruits', blurb: 'Mangoes have juicy, edible fruit and make great puddings.', color: '#E09A00', img: 'img/products/mangoes.webp', pack: [] },
  { code: 'PVPF100', name: 'Passion Fruits', cat: 'Fruits', blurb: 'Rich in vitamin C, riboflavin and potassium.', color: '#7B2D8E', img: 'img/products/passion-fruits.webp', pack: [] },
  { code: 'PVCH100', name: 'Chillies', cat: 'Herbs', blurb: 'These peppers are a rich source of vitamin C and vitamin B6, with the desired amount of heat.', color: '#C8102E', img: 'img/products/chillies.webp', pack: ['PCG001', 'PCR001', 'PCM001'] },
  { code: 'PVRM100', name: 'Rosemary', cat: 'Herbs', blurb: 'Loved for its anti-microbial, anti-inflammatory and anti-oxidant properties.', color: '#4C7A5B', img: 'img/products/rosemary.webp', pack: [] },
  { code: 'PVCV100', name: 'Chives', cat: 'Herbs', blurb: 'Used for flavouring and as a garnish on egg dishes. They pair well with a variety of cheeses.', color: '#2F8F6B', img: 'img/products/chives.webp', pack: [] }
]

export const packages: Pack[] = [
  { id: 'CHV001', code: 'CHV001', name: 'Haricot verts carton', note: 'This carton is meant to contain haricot verts.', kind: 'Carton', img: 'img/packages/chv001.webp', product: 'Haricot Verts' },
  { id: 'CXF001-T', code: 'CXF001', name: 'Extra fine beans', note: 'Top cover for extra fine beans.', kind: 'Top cover', img: 'img/packages/cxf001-top.webp', product: 'Haricot Verts' },
  { id: 'CXF001-C', code: 'CXF001', name: 'Extra fine beans', note: 'This holds 12 × 250 g extra fine beans.', kind: 'Carton', img: 'img/packages/cxf001-carton.png', product: 'Haricot Verts' },
  { id: 'CMT001-T', code: 'CMT001', name: 'Mangetouts', note: 'Top cover for mangetouts.', kind: 'Top cover', img: 'img/packages/cmt001-top.webp', product: 'Mangetouts' },
  { id: 'CMT001-C', code: 'CMT001', name: 'Mangetouts', note: 'This holds 12 × 250 g mangetouts.', kind: 'Carton', img: 'img/packages/cmt001-carton.webp', product: 'Mangetouts' },
  { id: 'PBC001', code: 'PBC001', name: 'Baby corn', note: 'Punnet of baby corn.', kind: 'Punnet', img: 'img/packages/pbc001.webp' },
  { id: 'PXF001', code: 'PXF001', name: 'Fine beans TT', note: 'Punnet of fine beans TT.', kind: 'Punnet', img: 'img/packages/pxf001.webp', product: 'Haricot Verts' },
  { id: 'PMT001', code: 'PMT001', name: 'Sugar snaps', note: 'Punnet of sugar snaps.', kind: 'Punnet', img: 'img/packages/pmt001.webp', product: 'Sugar Snaps' },
  { id: 'PSS001', code: 'PSS001', name: 'Snow peas', note: 'Punnet of snow peas.', kind: 'Punnet', img: 'img/packages/pss001.webp', product: 'Mangetouts' },
  { id: 'PCG001', code: 'PCG001', name: 'Green chillies', note: 'Punnet of green chillies.', kind: 'Punnet', img: 'img/packages/pcg001.webp', product: 'Chillies' },
  { id: 'PCR001', code: 'PCR001', name: 'Red chillies', note: 'Punnet of red chillies.', kind: 'Punnet', img: 'img/packages/pcr001.webp', product: 'Chillies' },
  { id: 'PCM001', code: 'PCM001', name: 'Red & green chillies', note: 'Punnet of red and green chillies.', kind: 'Punnet', img: 'img/packages/pcm001.webp', product: 'Chillies' }
]

export const team: Member[] = [
  { name: 'Brenda Ogollah', role: 'Owner & Director', email: 'brenda@premierveg.com', phone: '+39 351 215 1931', photo: 'img/team/brenda.jpg', quote: 'Expert in global fresh produce markets',
    bio: ['Brenda Ogollah is the Owner and Director of Premier Veg, bringing over 17 years of extensive experience in the fresh produce industry across both Kenya and the Netherlands.',
      'She has worked with leading international companies, including Green Food Benelux Group and Fruit Advisor Group, where she served as an Account Manager in the Netherlands. Through these roles, she gained in-depth expertise in global fresh produce markets, quality standards, and international client management.',
      'Brenda is currently actively engaged with well-established companies in Kenya, with a key focus on promoting and supporting fast-growing Kenyan exporters of fresh fruits and vegetables. Her passion lies in connecting Kenyan producers to international markets while ensuring reliability, quality, and long-term partnerships.',
      'Her core principle and driving force is a strong commitment to exceptional customer service, ensuring that every client is professionally supported and well served.'] },
  { name: 'Andrea Ogada', role: 'Administrator', email: 'andrea@premierveg.com', phone: '+254 707 095 533', photo: 'img/team/andrea.jpg', quote: 'Core efficiency',
    bio: ['Andrea Ogada serves as the Administrator at Premier Veg Mondo, supporting the day-to-day operations and ensuring smooth internal and external communication.',
      'She plays a key role in coordinating administrative processes, documentation, and client support, helping to maintain efficiency and organization across the company’s operations.',
      'Andrea is committed to supporting the company’s growth by ensuring strong administrative systems, professional client interactions, and reliable operational support that contributes to Premier Veg’s overall success.'] },
  { name: 'Dominic Mwanya', role: 'Compliance & Agronomy Partner', email: 'dominic.mwanya@premierveg.com', phone: '+254 725 666 205', quote: 'Traceability, food safety, and ethical compliance',
    bio: ['Dominic Mwanya is an experienced Agronomist and Compliance Auditor, providing professional compliance and agronomy support to Premier Veg and its partner farms.'] },
  { name: 'Allan Omondi', role: 'Compliance Officer', email: 'allan@premierveg.com', phone: '+254 721 730 756', photo: 'img/team/allan.jpg', quote: 'Compliance with industry regulation',
    bio: ['Allan Omondi serves as the Compliance Officer at Premier Veg Mondo Ltd, where he is responsible for ensuring that all fresh produce meets the required quality, safety, and regulatory standards for both local and international markets.',
      'In his role, Allan oversees product inspection and coordinates the collection and submission of fresh produce samples for laboratory testing to ensure compliance with industry regulations and export requirements. He works closely with relevant regulatory bodies and testing facilities to verify that all products meet the necessary food safety and phytosanitary standards before shipment.',
      'Through his commitment to quality control and regulatory compliance, Allan helps ensure that Premier Veg Mondo Ltd consistently delivers safe, high-quality fresh produce that meets the expectations of global markets.'] },
  { name: 'Fidelis Nduta', role: 'Accountant', email: 'finance@premierveg.com', phone: '+254 740 717 714',
    bio: ['Fidelis is our Accountant. Her role is managing financial records, tracking transactions, and supporting budgeting and reporting, helping to maintain financial stability and transparency within our organization.'] },
  { name: 'Susan Ayoo', role: 'Quality Assurance', email: 'qualityassurance@premierveg.com', phone: '+254 707 498 237',
    bio: ['Susan Ayoo is our Quality Assurance Officer.'] }
]

export const steps = [
  { n: '01', t: 'Grown on partner farms', d: 'We work closely with farms in tropical climatic regions, which provide ideal growing conditions throughout the year.' },
  { n: '02', t: 'Sorted & graded', d: 'Careful sorting and grading to meet Category 1 export standards.' },
  { n: '03', t: 'Checked & packed', d: 'Quality checks for freshness, size uniformity and appearance, with hygienic handling by trained staff following food safety protocols.' },
  { n: '04', t: 'Cold-stored & shipped', d: 'Temperature-controlled cold rooms, proper ventilation and efficient workflow, with full traceability from farm to final market.' }
]

export const categories = [
  { name: 'Vegetables', blurb: 'Our vegetables are grown and packed with energy, minerals and vitamins.', color: '#1F5B3A', imgs: ['img/products/haricot-verts.webp', 'img/products/carrots.webp', 'img/products/mangetouts.webp'] },
  { name: 'Fruits', blurb: 'Fruits are foods that are grown to be eaten raw. These have rich vitamin content.', color: '#AE3A0A', imgs: ['img/products/avocados.webp', 'img/products/mangoes.webp', 'img/products/passion-fruits.webp'] },
  { name: 'Herbs', blurb: 'Our herbs’ essential properties turn simple meals into a delicious experience.', color: '#7C2D3A', imgs: ['img/products/chillies.webp', 'img/products/rosemary.webp', 'img/products/chives.webp'] }
]

export const gallery = [
  { src: 'img/about/packhouse.jpg', alt: 'The Premier Veg pack-house team at work', cap: 'The pack-house: sorting, grading and packing the day-to-day orders', tag: 'Pack-house' },
  { src: 'img/hero-workers.webp', alt: 'Premier Veg team sorting haricot verts', cap: 'Our team sorting and packing haricot verts', tag: 'Our team' },
  { src: 'img/beans-bunch.webp', alt: 'Freshly harvested haricot verts', cap: 'Haricot verts, freshly harvested', tag: 'Haricot verts' },
  { src: 'img/snow-peas.webp', alt: 'Tray of snow peas', cap: 'Mangetouts, packed in retail trays', tag: 'Mangetouts' },
  { src: 'img/packages/cxf001-carton.png', alt: 'Extra fine beans carton, 12 × 250 g', cap: 'Extra fine beans carton, 12 × 250 g', tag: 'Packaging', contain: true },
  { src: 'img/sugar-closeup.webp', alt: 'Close-up of sugar snap peas', cap: 'Sugar snaps up close', tag: 'Sugar snaps' }
]
