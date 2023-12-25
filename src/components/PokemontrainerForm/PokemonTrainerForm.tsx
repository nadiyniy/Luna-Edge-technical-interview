import React, { useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { getAllPokemons, getPokemonDetails } from '../../../api/PokemonApi';
import { getItemFromLocalStorage, setItemToLocalStorage } from '../../helpers/localStorage';
import Button from '../Button';
import PokemonModal from '../Modal';
import Select from '../Select';

type Pokemon = {
	name: string;
	sprite: string;
};

type FormData = {
	name: string;
	lastName: string;
	pokemon: string;
	pokemons: object[];
};

const PokemonTrainerForm: React.FC = () => {
	const {
		control,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<FormData>({
		mode: 'onChange',
	});

	const [selectedPokemons, setSelectedPokemons] = useState<Pokemon[]>([]);
	const [modalOpen, setModalOpen] = useState(false);
	const [allPokemons, setAllPokemons] = useState<{ name: string }[]>([]);

	useEffect(() => {
		const selectedPokemonsFromLS = getItemFromLocalStorage('selectedPokemons');
		if (selectedPokemonsFromLS?.length) {
			setSelectedPokemons(selectedPokemonsFromLS);
		}

		getAllPokemons().then((res) => setAllPokemons(res));
	}, []);

	const handlePokemonSelection = async (selectedPokemonName: string) => {
		try {
			const response = await getPokemonDetails(selectedPokemonName);

			const selectedPokemon: Pokemon = {
				name: response.name,
				sprite: response?.sprites?.front_default || '',
			};

			if (selectedPokemon && selectedPokemons.length < 4) {
				const result = [...selectedPokemons, selectedPokemon];

				setItemToLocalStorage('selectedPokemons', JSON.stringify(result));
				setSelectedPokemons(result);
				setValue('pokemons', result);
			}
		} catch (error) {
			console.error('Error fetching Pokémon details:', error);
		}
	};

	const handleRemovePokemon = (pokemonName: string) => {
		const updatedPokemons = selectedPokemons.filter((pokemon) => pokemon.name !== pokemonName);
		setSelectedPokemons(updatedPokemons);
		setValue('pokemons', updatedPokemons);
		setItemToLocalStorage('selectedPokemons', JSON.stringify(updatedPokemons));
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
						rules={{
							required: 'This field is required',
							minLength: { value: 2, message: 'Name must be at least 2 characters long' },
							maxLength: { value: 12, message: 'Name must not exceed 12 characters' },
							pattern: {
								value: /^[a-zA-Z]+$/,
								message: 'Only characters from A-Z and a-z are accepted',
							},
						}}
						render={({ field }) => (
							<>
								<input type='text' {...field} className='' />
								{errors.name && <p>{errors.name.message}</p>}
							</>
						)}
					/>
				</div>

				<div>
					<label htmlFor='lastName'>Last Name:</label>
					<Controller
						name='lastName'
						control={control}
						defaultValue=''
						rules={{
							required: 'This field is required',
							minLength: { value: 2, message: 'Last name must be at least 2 characters long' },
							maxLength: { value: 12, message: 'Last name must not exceed 12 characters' },
							pattern: {
								value: /^[a-zA-Z]+$/,
								message: 'Only characters from A-Z and a-z are accepted',
							},
						}}
						render={({ field }) => (
							<>
								<input type='text' {...field} className='' />
								{errors.lastName && <p>{errors.lastName.message}</p>}
							</>
						)}
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

				<p>Your Pokémon Team:</p>
				{!selectedPokemons?.length ? (
					<p>Select 4 pokemons...</p>
				) : (
					<Select
						items={selectedPokemons}
						selectedPokemons={selectedPokemons}
						setSelectedPokemons={setSelectedPokemons}
						setValue={setValue}
					/>
				)}

				<Button disabled={!selectedPokemons.length} variant='primary' value='View Pokémon Team' />
			</form>

			{modalOpen && <PokemonModal title='Your Pokémon Team' closeModal={closeModal} selectedItems={selectedPokemons} />}
		</div>
	);
};

export default PokemonTrainerForm;
