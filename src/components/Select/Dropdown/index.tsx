import { useEffect, useState } from 'react';
import { getAllPokemons, getPokemonDetails } from '../../../../api/PokemonApi';
import { Pokemon } from '../../../../api/types';
import { setItemToLocalStorage } from '../../../helpers/localStorage';
import Input from '../../Input';
import { SelectDropdownProps } from './types';
import CheckIcon from '../../../assets/icons/check.svg';

const SelectDropdown = ({ selectedPokemons, setSelectedPokemons, setShowDropdown }: SelectDropdownProps) => {
	const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
	const [filteredPokemonList, setFilteredPokemonList] = useState<Pokemon[]>([]);
	const [searchedPokemon, setSearchedPokemon] = useState<string>('');

	useEffect(() => {
		getAllPokemons().then((pokemonList) => {
			setPokemonList(pokemonList);
			setFilteredPokemonList(pokemonList);
		});
	}, []);

	useEffect(() => {
		if (!searchedPokemon) {
			setFilteredPokemonList(pokemonList);
		} else {
			setFilteredPokemonList(pokemonList.filter((pokemon) => pokemon.name.toLowerCase().includes(searchedPokemon)));
		}
	}, [searchedPokemon]);

	const onPokemonClick = async (selectedPokemonName: string, isPokemonSelected: boolean) => {
		if (isPokemonSelected) return;
		try {
			const response = await getPokemonDetails(selectedPokemonName);

			const selectedPokemon: Pokemon = {
				name: response.name,
				sprites: response?.sprites,
			};

			if (selectedPokemon && selectedPokemons?.length < 4) {
				const result = [...selectedPokemons, selectedPokemon];
				setItemToLocalStorage('selectedPokemons', JSON.stringify(result));
				setSelectedPokemons(result);
				setSearchedPokemon('');
				if (result.length >= 4) {
					setShowDropdown(false);
				}
			}
		} catch (error) {
			console.error('Error fetching Pokémon details:', error);
		}
	};

	const onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSearchedPokemon(event.target.value.trim().toLowerCase());
	};

	return (
		<div>
			<Input placeholder='search' type='text' value={searchedPokemon} onChange={onSearchChange} />
			<ul className='h-60 overflow-y-auto'>
				{filteredPokemonList.map((pokemon, index) => {
					const isPokemonSelected = selectedPokemons.some((selectedPokemon) => selectedPokemon.name === pokemon.name);
					return (
						<li
							className='flex gap-2 cursor-pointer border-b-2	'
							key={index}
							value={pokemon.name}
							onClick={() => onPokemonClick(pokemon.name, isPokemonSelected)}
						>
							<span>{pokemon.name}</span> {isPokemonSelected && <img src={CheckIcon} width={16} height={16} />}
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default SelectDropdown;
