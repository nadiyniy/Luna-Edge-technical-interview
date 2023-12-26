import React, { useEffect, useState } from 'react'
import { Controller, SubmitHandler, useForm } from 'react-hook-form'
import { getAllPokemons, getPokemonDetails } from '../../../api/PokemonApi'
import { getItemFromLocalStorage, setItemToLocalStorage } from '../../helpers/localStorage'
import Button from '../Button'
import Input from '../Input'
import PokemonModal from '../Modal'
import Select from '../Select'
import { FormData } from './types'
import { Pokemon } from '../../../api/types'

const Form: React.FC = () => {
	const {
		control,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<FormData>({
		mode: 'onChange',
	})

	const [selectedPokemons, setSelectedPokemons] = useState<Pokemon[]>([])
	const [modalOpen, setModalOpen] = useState(false)
	const [allPokemons, setAllPokemons] = useState<{ name: string }[]>([])

	const maxPokemonCount = 4
	const pokemonCount = maxPokemonCount - selectedPokemons.length

	useEffect(() => {
		const selectedPokemonsFromLS = getItemFromLocalStorage('selectedPokemons')
		if (selectedPokemonsFromLS?.length) {
			setSelectedPokemons(selectedPokemonsFromLS)
		}

		getAllPokemons().then(res => setAllPokemons(res))
	}, [])

	const handlePokemonSelection = async (selectedPokemonName: string) => {
		try {
			const response = await getPokemonDetails(selectedPokemonName)

			const selectedPokemon: Pokemon = {
				name: response.name,
				sprites: response.sprites,
			}

			if (selectedPokemon && selectedPokemons.length < 4) {
				const result = [...selectedPokemons, selectedPokemon]

				setItemToLocalStorage('selectedPokemons', JSON.stringify(result))

				setSelectedPokemons(result)
			}
		} catch (error) {
			console.error('Error fetching Pokémon details:', error)
		}
	}

	const openModal = () => {
		setModalOpen(true)
	}

	const closeModal = () => {
		setModalOpen(false)
	}

	const onSubmit: SubmitHandler<FormData> = () => {
		openModal()
	}

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
						render={({ field }) => <Input field={field} errors={errors.name} />}
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
						render={({ field }) => <Input field={field} errors={errors.lastName} />}
					/>
				</label>

				<label className='flex flex-col' htmlFor='pokemon'>
					{pokemonCount === 0
						? 'Team is ready'
						: pokemonCount === 4
						? 'Select Your Pokémon Team:'
						: `Select Your Pokémon Team: ${pokemonCount} left`}
					<Controller
						name='pokemon'
						control={control}
						defaultValue=''
						render={({ field }) => (
							<select
								className='w-full hover:border-indigo-900 hover:outline-0 focus:border-indigo-900 focus:outline-0 rounded-md px-2 border-gray-300 border-2 disabled:bg-gray-100 disabled:hover:border-gray-300'
								{...field}
								disabled={selectedPokemons.length >= 4}
								onChange={e => handlePokemonSelection(e.target.value)}
							>
								<option value='' disabled>
									Select Pokémon
								</option>

								{allPokemons.map((pokemon, index) => {
									const isPokemonSelected = selectedPokemons.some(
										selectedPokemon => selectedPokemon.name === pokemon.name
									)
									return (
										<option key={index} value={pokemon.name} disabled={isPokemonSelected}>
											{isPokemonSelected ? `${pokemon.name} (Selected)` : pokemon.name}
										</option>
									)
								})}
							</select>
						)}
					/>
				</label>

				<p>Your Pokémon Team:</p>
				{/* {!selectedPokemons?.length ? (
					<p>Select 4 pokemons...</p>
				) : (
					<Select
						items={selectedPokemons}
						selectedPokemons={selectedPokemons}
						setSelectedPokemons={setSelectedPokemons}
						setValue={setValue}
					/>
				)} */}
				<Select
					items={selectedPokemons}
					selectedPokemons={selectedPokemons}
					setSelectedPokemons={setSelectedPokemons}
					setValue={setValue}
				/>

				<Button disabled={selectedPokemons.length < 4} variant='primary' value='View Pokémon Team' />
			</form>

			{modalOpen && <PokemonModal title='Your Pokémon Team' closeModal={closeModal} selectedItems={selectedPokemons} />}
		</>
	)
}

export default Form
