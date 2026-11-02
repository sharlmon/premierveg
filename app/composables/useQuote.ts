export type QItem = { id: string; name: string; kind: 'Product' | 'Package'; qty: string; code?: string }
const KEY = 'pv-quote'
export const useQuote = () => {
  const items = useState<QItem[]>('quote-items', () => [])
  const has = (id: string) => items.value.some((i) => i.id === id)
  const add = (i: Omit<QItem, 'qty'>) => { if (!has(i.id)) items.value = [...items.value, { ...i, qty: '' }] }
  const remove = (id: string) => { items.value = items.value.filter((i) => i.id !== id) }
  const toggle = (i: Omit<QItem, 'qty'>) => (has(i.id) ? remove(i.id) : add(i))
  const clear = () => { items.value = [] }
  const load = () => { try { const v = JSON.parse(localStorage.getItem(KEY) || '[]'); if (Array.isArray(v) && !items.value.length) items.value = v.filter((x) => x && x.id && x.name) } catch {} }
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(items.value)) } catch {} }
  return { items, has, add, remove, toggle, clear, load, save }
}
