import { useState } from 'react';
import { setItemToLocalStorage } from '../../helpers/localStorage';
import Badge from '../Badge';
import SelectDropdown from './Dropdown';
import { SelectProps } from './types';

const Select = ({ items, selectedPokemons, setSelectedPokemons, setValue }: SelectProps) => {
	const [showDropdown, setShowDropdown] = useState(false);
	const onBadgeClick = (pokemonName: string) => {
		const filteredItems = selectedPokemons.filter((pokemon) => pokemon.name !== pokemonName);
		setSelectedPokemons(filteredItems);
		setValue('pokemons', filteredItems);
		setItemToLocalStorage('selectedPokemons', JSON.stringify(filteredItems));
	};

	return (
		<>
			<ul>
				{items.map(({ name }) => (
					<li key={name}>
						<Badge text={name} onBadgeClick={() => onBadgeClick(name)} />
					</li>
				))}
			</ul>
			{showDropdown && <SelectDropdown />}
		</>
	);
};

export default Select;
