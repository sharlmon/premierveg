// Content taken from premierveg.com (copy lightly cleaned for typos only).
// Product.specs (shelfLife / sizes) are still empty: fill them in once the client supplies real data. Supply is year-round for all products (confirmed by the client), so there is no seasonality calendar.
// Markets (confirmed): France, Netherlands, Switzerland. Certifications (confirmed): GlobalG.A.P. and SMETA.
// Anything left empty shows as "On request" in the product popup and the PDF spec sheet.
export type Product = { code: string; name: string; cat: 'Vegetables' | 'Fruits' | 'Herbs'; blurb: string; color: string; img: string; pack: string[]; specs?: { shelfLife?: string; sizes?: string } }
export type Pack = { id: string; code: string; name: string; note: string; kind: 'Carton' | 'Top cover' | 'Punnet'; img: string; photo?: string; product?: string }
export type Member = { name: string; role: string; email: string; phone: string; quote?: string; photo?: string; card?: string; bio: string[] }

export const products: Product[] = [
  { code: 'PVHV100', name: 'Haricot Verts', cat: 'Vegetables', blurb: 'Also known as French beans, they are planted from seedling and give tender produce and a dependable supply.', color: '#1F5B3A', img: 'img/products/haricot-verts.webp', pack: ['CHV001', 'PXF001'] },
  { code: 'PVMT100', name: 'Mangetouts', cat: 'Vegetables', blurb: 'A flat-podded variety of pea with an excellent fibre content.', color: '#3F8F4F', img: 'img/products/mangetouts.webp', pack: ['CMT001-T', 'CMT001-C', 'PSS001'] },
  { code: 'PVSS100', name: 'Sugar Snaps', cat: 'Vegetables', blurb: 'Rounded-shape peas, with fibre content.', color: '#6DB33F', img: 'img/products/sugar-snaps.webp', pack: ['PMT001'] },
  { code: 'PVBC100', name: 'Baby Corn', cat: 'Vegetables', blurb: 'Tender, sweet baby corn, trimmed and packed fresh in punnets for export.', color: '#E3B505', img: 'img/products/baby-corn.jpg', pack: ['PBC001'] },
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
  { id: 'CXF001-C', code: 'CXF001', name: 'Extra fine beans', note: 'This holds 12 × 250 g extra fine beans.', kind: 'Carton', img: 'img/packages/cxf001-carton.webp', product: 'Haricot Verts' },
  { id: 'CMT001-T', code: 'CMT001', name: 'Mangetouts', note: 'Top cover for mangetouts.', kind: 'Top cover', img: 'img/packages/cmt001-top.webp', photo: 'img/packages/cmt001-top-photo.webp', product: 'Mangetouts' },
  { id: 'CMT001-C', code: 'CMT001', name: 'Mangetouts', note: 'This holds 12 × 250 g mangetouts.', kind: 'Carton', img: 'img/packages/cmt001-carton.webp', photo: 'img/packages/cmt001-photo.webp', product: 'Mangetouts' },
  { id: 'PBC001', code: 'PBC001', name: 'Baby corn', note: 'Punnet of baby corn.', kind: 'Punnet', img: 'img/packages/pbc001.webp', photo: 'img/products/baby-corn-punnet.webp', product: 'Baby Corn' },
  { id: 'PXF001', code: 'PXF001', name: 'Fine beans TT', note: 'Punnet of fine beans TT.', kind: 'Punnet', img: 'img/packages/pxf001.webp', product: 'Haricot Verts' },
  { id: 'PMT001', code: 'PMT001', name: 'Sugar snaps', note: 'Punnet of sugar snaps.', kind: 'Punnet', img: 'img/packages/pmt001.webp', product: 'Sugar Snaps' },
  { id: 'PSS001', code: 'PSS001', name: 'Snow peas', note: 'Punnet of snow peas.', kind: 'Punnet', img: 'img/packages/pss001.webp', product: 'Mangetouts' },
  { id: 'PCG001', code: 'PCG001', name: 'Green chillies', note: 'Punnet of green chillies.', kind: 'Punnet', img: 'img/packages/pcg001.webp', product: 'Chillies' },
  { id: 'PCR001', code: 'PCR001', name: 'Red chillies', note: 'Punnet of red chillies.', kind: 'Punnet', img: 'img/packages/pcr001.webp', product: 'Chillies' },
  { id: 'PCM001', code: 'PCM001', name: 'Red & green chillies', note: 'Punnet of red and green chillies.', kind: 'Punnet', img: 'img/packages/pcm001.webp', product: 'Chillies' }
]

export const team: Member[] = [
  { name: 'Brenda Ogollah', role: 'Owner & Director', email: 'brenda@premierveg.com', phone: '+39 351 215 1931', photo: 'img/team/brenda.jpg', card: '/card/brenda', quote: 'Expert in global fresh produce markets',
    bio: ['Brenda Ogollah is the Owner and Director of Premier Veg, bringing over 17 years of extensive experience in the fresh produce industry across both Kenya and the Netherlands.',
      'She has worked with leading international companies, including Green Food Benelux Group and Fruit Advisor Group, where she served as an Account Manager in the Netherlands. Through these roles, she gained in-depth expertise in global fresh produce markets, quality standards, and international client management.',
      'Brenda is currently actively engaged with well-established companies in Kenya, with a key focus on promoting and supporting fast-growing Kenyan exporters of fresh fruits and vegetables. Her passion lies in connecting Kenyan producers to international markets while ensuring reliability, quality, and long-term partnerships.',
      'Her core principle and driving force is a strong commitment to exceptional customer service, ensuring that every client is professionally supported and well served.'] },
  { name: 'Andrea Ogada', role: 'Administrator', email: 'andrea@premierveg.com', phone: '+254 707 095 533', photo: 'img/team/andrea.jpg', quote: 'Core efficiency',
    bio: ['Andrea Ogada serves as the Administrator at Premier Veg Mondo, supporting the day-to-day operations and ensuring smooth internal and external communication.',
      'She plays a key role in coordinating administrative processes, documentation, and client support, helping to maintain efficiency and organization across the company’s operations.',
      'Andrea is committed to supporting the company’s growth by ensuring strong administrative systems, professional client interactions, and reliable operational support that contributes to Premier Veg’s overall success.'] },
  { name: 'Dominic Mwanya', role: 'Production & Packhouse Manager', email: 'dominic.mwanya@premierveg.com', phone: '+254 725 666 205', photo: 'img/team/dominic.jpg', quote: 'Traceability, food safety, and ethical compliance',
    bio: ['Dominic Mwanya is a specialized agronomist, compliance, and quality assurance expert who bridges the gap between field production and packhouse production by ensuring agricultural operations meet the world’s highest standards for food safety, ethical labour, and crop quality.',
      'He guides farms and packing facilities through the complexities of major international frameworks including GlobalG.A.P., BRC, SMETA, and GRASP. By building robust QA systems that link field agronomy with packhouse operations, he collaborates directly with harvesting and production teams to fine-tune growing practices, minimize waste, and meet target yields safely.',
      'Ultimately, he turns compliance from a yearly stress into a daily habit, conducting pre-audit assessments and training local teams to ensure every shipment strictly matches customer size, grade, safety, shelf-life, and individual customer specifications.'] },

  { name: 'Allan Omondi', role: 'Operations Personnel', email: 'allan@premierveg.com', phone: '+254 721 730 756', photo: 'img/team/allan.jpg', quote: 'Compliance with industry regulation',
    bio: ['Allan Omondi serves as Operations Personnel at Premier Veg Mondo Ltd, where he is responsible for ensuring that all fresh produce meets the required quality, safety, and regulatory standards for both local and international markets.',
      'In his role, Allan oversees product inspection and coordinates the collection and submission of fresh produce samples for laboratory testing to ensure compliance with industry regulations and export requirements. He works closely with relevant regulatory bodies and testing facilities to verify that all products meet the necessary food safety and phytosanitary standards before shipment.',
      'Through his commitment to quality control and regulatory compliance, Allan helps ensure that Premier Veg Mondo Ltd consistently delivers safe, high-quality fresh produce that meets the expectations of global markets.'] },
  { name: 'Fidelis Nduta', role: 'Accountant', email: 'finance@premierveg.com', phone: '+254 740 717 714', photo: 'img/team/fidelis.jpg', quote: 'Accurate, timely and transparent finances',
    bio: ['Fidelis Nduta is the Accountant at Premier Veg, a CPA (K) qualified accounting professional with extensive experience across all areas of company finance.',
      'She manages financial records and transactions, payroll and statutory returns, bank reconciliations, accounts payable and receivable, and prepares the monthly and quarterly management reports, budgets and cash flow for management meetings.',
      'Experienced in working with internal and external auditors, and compliant with IFRS and taxation requirements, Fidelis helps keep Premier Veg’s finances accurate, timely and transparent.'] }
]

export const markets = ['France', 'Netherlands', 'Switzerland']
export const certifications = [
  { name: 'GlobalG.A.P.', what: 'Good agricultural practice', d: 'Independent certification of safe, sustainable farming practices, from the farm through to harvest.' },
  { name: 'SMETA', what: 'Ethical trade audit', d: 'Sedex Members Ethical Trade Audit: responsible labour standards, health and safety, environment and business ethics.' }
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
  { src: 'img/packages/cxf001-carton.webp', alt: 'Extra fine beans carton, 12 × 250 g', cap: 'Extra fine beans carton, 12 × 250 g', tag: 'Packaging', contain: true },
  { src: 'img/sugar-closeup.webp', alt: 'Close-up of sugar snap peas', cap: 'Sugar snaps up close', tag: 'Sugar snaps' },
  { src: 'img/field-team.webp', alt: 'Four Premier Veg team members in white lab coats standing in a field', cap: 'Out in the field with our team', tag: 'In the field' }
]

export const exportShots = [
  { src: 'img/export-haricot-pallet.webp', alt: 'A pallet of Premier Veg haricots verts cartons stacked at the export office', cap: 'Haricots verts, palletised at the export office', tag: 'Ready to ship', w: 1200, h: 1536 },
  { src: 'img/export-mangetout-pallet.webp', alt: 'A pallet of Premier Veg mangetout cartons in the cold-chain hall', cap: 'Mangetout cartons, built and ready for the flight', tag: 'Mangetouts', w: 1200, h: 1472 },
  { src: 'img/export-mangetout-carton.webp', alt: 'An open carton of mangetouts packed in retail bags', cap: 'Inside a mangetout carton: sorted, bagged and graded', tag: 'Inside the carton', w: 897, h: 1440 },
  { src: 'img/export-pallet-strapped.webp', alt: 'A strapped, corner-protected pallet of haricots verts cartons', cap: 'Strapped and corner-protected for the journey', tag: 'Secured', w: 1200, h: 1375 },
  { src: 'img/export-haricot-warehouse.webp', alt: 'A full pallet of haricots verts cartons in the warehouse', cap: 'A full pallet of 12 × 250 g haricots verts cartons', tag: 'Warehouse', w: 1200, h: 1488 }
]
