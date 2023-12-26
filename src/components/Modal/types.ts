import { Pokemon } from '../../../api/types'

export type ModalProps = {
	closeModal: () => void
	selectedItems: Pokemon[]
	title: string
}
