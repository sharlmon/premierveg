import { packages, type Product } from '~/data'

export type SpecRow = { label: string; value: string; known: boolean }

export const productSpecRows = (p: Product): SpecRow[] => {
  const pk = p.pack.map((id) => packages.find((x) => x.id === id)).filter(Boolean) as typeof packages
  const label = (x: (typeof packages)[number]) => (x.kind === 'Top cover' ? x.name + ' (top cover)' : x.name.toLowerCase().includes(x.kind.toLowerCase()) ? x.name : x.name + ' ' + x.kind.toLowerCase())
  const names = [...new Set(pk.map(label))]
  const on = 'On request'
  return [
    { label: 'Origin', value: 'Kenya', known: true },
    { label: 'Category', value: p.cat, known: true },
    { label: 'Grading', value: p.cat === 'Vegetables' ? 'Category 1 export standard' : on, known: p.cat === 'Vegetables' },
    { label: 'Supply', value: 'Year-round', known: true },
    { label: 'Packaging', value: names.length ? names.join(', ') : on, known: !!names.length },
    { label: 'Pack sizes', value: p.specs?.sizes || on, known: !!p.specs?.sizes },
    { label: 'Shelf life', value: p.specs?.shelfLife || on, known: !!p.specs?.shelfLife }
  ]
}

const toDataUrl = async (url: string, maxW = 700) => {
  const blob = await (await fetch(url)).blob()
  const src: string = await new Promise((res) => { const r = new FileReader(); r.onload = () => res(String(r.result)); r.readAsDataURL(blob) })
  const img: HTMLImageElement = await new Promise((res, rej) => { const i = new Image(); i.onload = () => res(i); i.onerror = rej; i.src = src })
  const k = Math.min(1, maxW / img.naturalWidth), w = Math.round(img.naturalWidth * k), h = Math.round(img.naturalHeight * k)
  const c = document.createElement('canvas'); c.width = w; c.height = h
  const x = c.getContext('2d')!; x.fillStyle = '#fff'; x.fillRect(0, 0, w, h); x.drawImage(img, 0, 0, w, h)
  return { data: c.toDataURL('image/jpeg', 0.86), w, h }
}

/** Builds and downloads a one-page A4 spec sheet. jsPDF is loaded only when asked for. */
export const downloadSpecSheet = async (p: Product, asset: (s: string) => string) => {
  const { jsPDF } = await import('jspdf')
  const doc = new jsPDF({ unit: 'mm', format: 'a4' })
  const W = 210, M = 16
  const rows = productSpecRows(p)
  // header band
  doc.setFillColor(14, 42, 28); doc.rect(0, 0, W, 38, 'F')
  try { const l = await toDataUrl(asset('img/logo.jpg'), 300); doc.addImage(l.data, 'JPEG', M, 7, 24, 24) } catch {}
  doc.setTextColor(245, 241, 230); doc.setFont('helvetica', 'bold'); doc.setFontSize(17); doc.text('Premier Veg Mondo Fresh', M + 30, 18)
  doc.setFont('helvetica', 'normal'); doc.setFontSize(10); doc.setTextColor(198, 240, 74); doc.text('PRODUCT SPECIFICATION SHEET', M + 30, 25)
  // title
  doc.setTextColor(14, 42, 28); doc.setFont('helvetica', 'bold'); doc.setFontSize(28); doc.text(p.name, M, 62)
  doc.setFont('helvetica', 'normal'); doc.setFontSize(11); doc.setTextColor(90, 100, 94); doc.text(`${p.cat}  ·  Product code ${p.code}`, M, 70)
  // image
  try {
    const im = await toDataUrl(asset(p.img)); const bw = 70, bh = (bw * im.h) / im.w
    doc.setDrawColor(220, 229, 218); doc.roundedRect(W - M - 78, 46, 78, 56, 3, 3, 'S')
    doc.addImage(im.data, 'JPEG', W - M - 74, 46 + (56 - Math.min(bh, 52)) / 2, bw * (Math.min(bh, 52) / bh), Math.min(bh, 52))
  } catch {}
  // description
  doc.setFontSize(11); doc.setTextColor(40, 50, 44)
  doc.text(doc.splitTextToSize(p.blurb, 100), M, 82)
  // table
  let y = 112
  doc.setFont('helvetica', 'bold'); doc.setFontSize(9); doc.setTextColor(31, 91, 58); doc.text('SPECIFICATIONS', M, y - 10)
  rows.forEach((r, i) => {
    if (i % 2 === 0) { doc.setFillColor(245, 247, 244); doc.rect(M, y - 5.5, W - 2 * M, 10, 'F') }
    doc.setFont('helvetica', 'bold'); doc.setFontSize(10); doc.setTextColor(14, 42, 28); doc.text(r.label, M + 3, y)
    doc.setFont('helvetica', r.known ? 'normal' : 'italic'); doc.setTextColor(r.known ? 40 : 140, r.known ? 50 : 140, r.known ? 44 : 140)
    const lines = doc.splitTextToSize(r.value, W - 2 * M - 52); doc.text(lines, M + 48, y); y += 10 + (lines.length - 1) * 4.5
  })
  doc.setFont('helvetica', 'italic'); doc.setFontSize(9); doc.setTextColor(120, 130, 124)
  doc.text('Items marked "On request" are confirmed per order. Please ask for current availability, sizes and pricing.', M, y + 6)
  // footer
  doc.setFillColor(198, 240, 74); doc.rect(0, 262, W, 35, 'F')
  doc.setFont('helvetica', 'bold'); doc.setFontSize(11); doc.setTextColor(14, 42, 28); doc.text('Request a quote', M, 273)
  doc.setFont('helvetica', 'normal'); doc.setFontSize(10)
  doc.text('info@premierveg.com  ·  +39 351 215 1931', M, 280)
  doc.text('P. O. Box 3468-00200, Kileleshwa Birchwoods, Nairobi, Kenya', M, 286)
  doc.save(`Premier-Veg-${p.name.replace(/\s+/g, '-')}-spec-sheet.pdf`)
}
