import type { Product, Pack, Member } from '~/data'

export type ModalState =
  | { type: 'product'; item: Product }
  | { type: 'package'; item: Pack }
  | { type: 'team'; item: Member }
  | { type: 'quote'; product?: string }
  | { type: 'lightbox'; index: number; items: { src: string; alt: string; cap: string; contain?: boolean }[] }
  | null

export const useModal = () => {
  const state = useState<ModalState>('modal', () => null)
  const open = (s: NonNullable<ModalState>) => { state.value = s }
  const close = () => { state.value = null }
  return { state, open, close }
}
