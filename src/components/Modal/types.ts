import { Pokemon } from '../../../api/types';

export type ModalProps = {
	closeModal: () => void;
	selectedItems: Pokemon[];
	title: string;
	data: {
		name: string;
		lastName: string;
	};
};
