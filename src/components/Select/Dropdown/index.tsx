import { useEffect, useState } from 'react'
import { getAllPokemons, getPokemonDetails } from '../../../../api/PokemonApi'
import { Pokemon } from '../../../../api/types'
import { setItemToLocalStorage } from '../../../helpers/localStorage'
import { SelectDropdownProps } from './types'

const SelectDropdown = ({ selectedPokemons, setSelectedPokemons, setShowDropdown }: SelectDropdownProps) => {
	const [pokemonList, setPokemonList] = useState<Pokemon[]>([])
	useEffect(() => {
		getAllPokemons().then(pokemonList => {
			setPokemonList(pokemonList)
		})
	}, [])

	const onPokemonClick = async (selectedPokemonName: string, isPokemonSelected: boolean) => {
		if (isPokemonSelected) return
		try {
			const response = await getPokemonDetails(selectedPokemonName)

			const selectedPokemon: Pokemon = {
				name: response.name,
				sprites: response?.sprites,
			}

			if (selectedPokemon && selectedPokemons?.length < 4) {
				const result = [...selectedPokemons, selectedPokemon]
				setItemToLocalStorage('selectedPokemons', JSON.stringify(result))
				setSelectedPokemons(result)
				if (result.length >= 4) {
					setShowDropdown(false)
				}
			}
		} catch (error) {
			console.error('Error fetching Pokémon details:', error)
		}
	}

	return (
		<div>
			{/* <Input /> */}
			<ul>
				{pokemonList.map((pokemon, index) => {
					const isPokemonSelected = selectedPokemons.some(selectedPokemon => selectedPokemon.name === pokemon.name)
					return (
						<li key={index} value={pokemon.name} onClick={() => onPokemonClick(pokemon.name, isPokemonSelected)}>
							{isPokemonSelected ? `${pokemon.name} (Selected)` : pokemon.name}
						</li>
					)
				})}
			</ul>
		</div>
	)
}

export default SelectDropdown
