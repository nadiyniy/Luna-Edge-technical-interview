import { UseFormSetValue } from 'react-hook-form';
import { Pokemon } from '../../../api/types';

export type SelectProps = {
	items: Pokemon[];
	selectedPokemons: Pokemon[];
	setSelectedPokemons: any;
	setValue: UseFormSetValue<any>;
	pokemonCount: number;
};
