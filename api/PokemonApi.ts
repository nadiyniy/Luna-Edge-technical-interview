import axios from 'axios'
import { Pokemon } from './types'

export const getAllPokemons = async (): Promise<Pokemon[]> => {
	try {
		const { data } = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151')
		return data.results
	} catch (error) {
		console.error('Error fetching Pokémon data:', error)
		throw error
	}
}

export const getPokemonDetails = async (pokemonName: string): Promise<Pokemon> => {
	try {
		const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
		return data
	} catch (error) {
		console.error('Error fetching Pokémon details:', error)
		throw error
	}
}
