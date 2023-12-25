import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import Button from '../Button';
import { getAllPokemons, getPokemonDetails } from '../../../api/PokemonApi';
import PokemonModal from '../PokemonModal/PokemonModal';

interface Pokemon {
	name: string;
	sprite: string;
}

interface FormData {
	name: string;
	lastName: string;
	pokemon: string;
}

const PokemonTrainerForm: React.FC = () => {
	const { control, handleSubmit, setValue } = useForm<FormData>();
	const [selectedPokemons, setSelectedPokemons] = useState<Pokemon[]>([]);
	const [modalOpen, setModalOpen] = useState(false);
	const [allPokemons, setAllPokemons] = useState<{ name: string }[]>([]);

	useEffect(() => {
		getAllPokemons().then((res) => setAllPokemons(res));
	}, []);

	// useEffect(() => {
	// 	const handleModalCloseKeyDown = (e: KeyboardEvent) => {
	// 		if (e.code === 'Escape') {
	// 			closeModal();
	// 		}
	// 	};

	// 	document.addEventListener('keydown', handleModalCloseKeyDown);
	// 	document.body.style.overflow = 'hidden';

	// 	return () => {
	// 		document.removeEventListener('keydown', handleModalCloseKeyDown);
	// 		document.body.style.overflow = 'visible';
	// 	};
	// }, []);

	// const handleModalClose = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
	// 	if (e.currentTarget === e.target) {
	// 		closeModal();
	// 	}
	// };

	const handlePokemonSelection = async (selectedPokemonName: string) => {
		try {
			const response = await getPokemonDetails(selectedPokemonName);

			const selectedPokemon: Pokemon = {
				name: response.name,
				sprite: response.sprites.front_default,
			};

			if (selectedPokemon && selectedPokemons.length < 4) {
				setSelectedPokemons([...selectedPokemons, selectedPokemon]);
				setValue('pokemon', '');
			}
		} catch (error) {
			console.error('Error fetching Pokémon details:', error);
		}
	};

	const handleRemovePokemon = (pokemonName: string) => {
		const updatedPokemons = selectedPokemons.filter((pokemon) => pokemon.name !== pokemonName);
		setSelectedPokemons(updatedPokemons);
	};

	const openModal = () => {
		setModalOpen(true);
	};

	const closeModal = () => {
		setModalOpen(false);
	};

	const onSubmit: SubmitHandler<FormData> = () => {
		openModal();
	};

	return (
		<div className='max-w-lg mx-auto p-4'>
			<form className='space-y-4' onSubmit={handleSubmit(onSubmit)}>
				<div>
					<label htmlFor='name'>Name:</label>
					<Controller
						name='name'
						control={control}
						defaultValue=''
						render={({ field }) => <input type='text' {...field} className='input' />}
					/>
				</div>

				<div>
					<label htmlFor='lastName'>Last Name:</label>
					<Controller
						name='lastName'
						control={control}
						defaultValue=''
						render={({ field }) => <input type='text' {...field} className='input' />}
					/>
				</div>

				<div>
					<label htmlFor='pokemon'>Select Your Pokémon Team:</label>
					<Controller
						name='pokemon'
						control={control}
						defaultValue=''
						render={({ field }) => (
							<select
								{...field}
								className='input'
								disabled={selectedPokemons.length >= 4}
								onChange={(e) => handlePokemonSelection(e.target.value)}
							>
								<option value='' disabled>
									Select Pokémon
								</option>
								{allPokemons.map((pokemon, index) => (
									<option key={index} value={pokemon.name}>
										{pokemon.name}
									</option>
								))}
							</select>
						)}
					/>
				</div>

				<div>
					<p>Your Pokémon Team:</p>
					<ul>
						{selectedPokemons.map((pokemon, index) => (
							<li key={index}>
								{pokemon.name}

								<Button
									variant='outline'
									type='button'
									value='Remove'
									size='xs'
									foo={() => handleRemovePokemon(pokemon.name)}
								/>
							</li>
						))}
					</ul>
				</div>

				<div>
					<Button disabled={!selectedPokemons.length} variant='primary' value='View Pokémon Team' />
				</div>
			</form>

			{modalOpen && <PokemonModal closeModal={closeModal} selectedPokemons={selectedPokemons} />}
		</div>
	);
};

export default PokemonTrainerForm;
