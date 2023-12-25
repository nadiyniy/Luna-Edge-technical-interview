export type ModalProps = {
	closeModal: () => void;
	selectedItems: { name: string; sprite: string }[];
	title: string;
};
