import React, { useEffect } from 'react';
import Button from '../Button';
import { ModalProps } from './types';
import CloseIcon from '../../assets/icons/x-mark.svg';

const PokemonModal: React.FC<ModalProps> = ({ title, selectedItems, closeModal }) => {
	useEffect(() => {
		const handleModalCloseKeyDown = (e: KeyboardEvent) => {
			if (e.code === 'Escape') {
				closeModal();
			}
		};

		document.addEventListener('keydown', handleModalCloseKeyDown);
		document.body.style.overflow = 'hidden';

		return () => {
			document.removeEventListener('keydown', handleModalCloseKeyDown);
			document.body.style.overflow = 'visible';
		};
	}, []);

	const handleModalClose = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		if (e.currentTarget === e.target) {
			closeModal();
		}
	};

	return (
		<div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50' onClick={handleModalClose}>
			<div className='bg-white p-8 max-w-md relative'>
				<h2 className='text-2xl font-bold mb-4 '>{title}</h2>
				<div className='flex space-x-4'>
					{selectedItems.map(({ name, sprite }, index) => (
						<div key={index}>
							<img src={sprite} alt={name} className='w-16 h-16' />
							<p className='text-center'>{name}</p>
						</div>
					))}
				</div>
				<img
					className='absolute top-5 right-5 cursor-pointer'
					src={CloseIcon}
					width={24}
					height={24}
					onClick={closeModal}
				/>
			</div>
		</div>
	);
};

export default PokemonModal;
