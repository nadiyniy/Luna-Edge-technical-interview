import React, { useEffect, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { Pokemon } from '../../../api/types';
import { getItemFromLocalStorage } from '../../helpers/localStorage';
import Button from '../Button';
import Input from '../Input';
import PokemonModal from '../Modal';
import Select from '../Select';
import { FormData } from './types';

const Form = () => {
	const {
		control,
		handleSubmit,
		setValue,
		watch,
		formState: { errors },
	} = useForm<FormData>({
		mode: 'onChange',
	});
	const data = watch();

	const [selectedPokemons, setSelectedPokemons] = useState<Pokemon[]>([]);
	const [modalOpen, setModalOpen] = useState(false);

	const maxPokemonCount = 4;
	const pokemonCount = maxPokemonCount - selectedPokemons.length;

	useEffect(() => {
		const selectedPokemonsFromLS = getItemFromLocalStorage('selectedPokemons');
		if (selectedPokemonsFromLS?.length) {
			setSelectedPokemons(selectedPokemonsFromLS);
		}
	}, []);

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
						render={({ field }) => <Input type='text' field={field} errors={errors.name} placeholder='Pitter' />}
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
						render={({ field }) => <Input type='text' field={field} errors={errors.lastName} placeholder='Parker' />}
					/>
				</label>

				<div className='flex flex-col'>
					{pokemonCount === 0
						? data.name && data.lastName
							? 'Team is ready!'
							: 'Write your name and last name'
						: pokemonCount === 4
						? 'Select Your Pokémon Team:'
						: `Select Your Pokémon Team: ${pokemonCount} left`}
				</div>
				<Select
					pokemonCount={pokemonCount}
					items={selectedPokemons}
					selectedPokemons={selectedPokemons}
					setSelectedPokemons={setSelectedPokemons}
					setValue={setValue}
				/>

				<Button disabled={selectedPokemons.length < 4} variant='primary' value='View Pokémon Team' />
			</form>

			{modalOpen && (
				<PokemonModal data={data} title='Your Pokémon Team' closeModal={closeModal} selectedItems={selectedPokemons} />
			)}
		</>
	);
};

export default Form;
