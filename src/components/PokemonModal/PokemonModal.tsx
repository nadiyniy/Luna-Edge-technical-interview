import React, { useEffect } from 'react';
import Button from '../Button';

interface PokemonModalProps {
	closeModal: () => void;
	selectedPokemons: { name: string; sprite: string }[];
}

const PokemonModal: React.FC<PokemonModalProps> = ({ selectedPokemons, closeModal }) => {
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
				<h2 className='text-2xl font-bold mb-4 '>Your Pokémon Team</h2>
				<div className='flex space-x-4'>
					{selectedPokemons.map((pokemon, index) => (
						<div key={index}>
							<img src={pokemon.sprite} alt={pokemon.name} className='w-16 h-16' />
							<p className='text-center'>{pokemon.name}</p>
						</div>
					))}
				</div>
				<Button variant='text' value='X' size='sm' foo={closeModal} className='absolute top-5 right-5' />
			</div>
		</div>
	);
};

export default PokemonModal;
