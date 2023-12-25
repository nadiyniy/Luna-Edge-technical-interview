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

	const openModal = () => {
		setModalOpen(true);
	};

	const closeModal = () => {
		setModalOpen(false);
	};

	const onSubmit: SubmitHandler<FormData> = () => {
		openModal();
	};
	console.log(selectedPokemons);

	return (
		<>
			<form className='flex gap-3 flex-col space-y-4 max-w-lg mx-auto p-4' onSubmit={handleSubmit(onSubmit)}>
				<label className='flex flex-col' htmlFor='name'>
					Name:
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
							<div className='relative'>
								<input
									className={`w-full px-2 rounded-md placeholder-shown:border-gray-300 border-2 
            ${
							errors.name
								? 'border-red-500 outline-0 placeholder-shown:border-red-500'
								: 'hover:border-indigo-900 focus:border-indigo-900 focus:outline-0 hover:outline-0 focus:outline-0 focus:border-green-900 hover:border-green-900 border-green-900'
						} placeholder-shown:hover:border-indigo-900 placeholder-shown:focus:border-indigo-900`}
									placeholder='Josh'
									type='text'
									{...field}
								/>

								{errors.name && <p className='absolute top-7 left-0 text-red-500'>{errors.name.message}</p>}
							</div>
						)}
					/>
				</label>

				<label className='flex flex-col' htmlFor='lastName'>
					Last Name:
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
							<div className='relative'>
								<input
									className={`w-full px-2 rounded-md placeholder-shown:border-gray-300   border-2 
									${
										errors.lastName
											? 'border-red-500 outline-0 placeholder-shown:border-red-500'
											: 'hover:border-indigo-900 focus:border-indigo-900 focus:outline-0 hover:outline-0 focus:outline-0 focus:border-green-900 hover:border-green-900 border-green-900'
									} placeholder-shown:hover:border-indigo-900 placeholder-shown:focus:border-indigo-900`}
									placeholder='Allen'
									type='text'
									{...field}
								/>
								{errors.lastName && <p className='absolute top-7 left-0 text-red-500'>{errors.lastName.message}</p>}
							</div>
						)}
					/>
				</label>

				<label className='flex flex-col' htmlFor='pokemon'>
					Select Your Pokémon Team:
					<Controller
						name='pokemon'
						control={control}
						defaultValue=''
						render={({ field }) => (
							<select
								className='w-full hover:border-indigo-900 hover:outline-0 focus:border-indigo-900 focus:outline-0 rounded-md px-2 border-gray-300 border-2 disabled:bg-gray-100 disabled:hover:border-gray-300'
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
				</label>

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

				<Button className='w-max' disabled={selectedPokemons.length < 4} variant='primary' value='View Pokémon Team' />
			</form>

			{modalOpen && <PokemonModal title='Your Pokémon Team' closeModal={closeModal} selectedItems={selectedPokemons} />}
		</>
	);
};

export default PokemonTrainerForm;
