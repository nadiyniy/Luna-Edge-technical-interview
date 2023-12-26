import { useState } from 'react'
import ChevronDown from '../../assets/icons/chevron_down.svg'
import { setItemToLocalStorage } from '../../helpers/localStorage'
import Badge from '../Badge'
import SelectDropdown from './Dropdown'
import { SelectProps } from './types'

const Select = ({ items, selectedPokemons, setSelectedPokemons, setValue }: SelectProps) => {
	const [showDropdown, setShowDropdown] = useState<boolean>(false)

	const arrowDownClassNames = `absolute right-2 top-1/2 transform translate-y-[-50%] ${
		showDropdown ? 'rotate-180' : 'rotate-0'
	} ${selectedPokemons.length >= 4 ? 'cursor-default' : 'cursor-pointer'}`

	const onBadgeClick = (pokemonName: string) => {
		const filteredItems = selectedPokemons.filter(pokemon => pokemon.name !== pokemonName)
		setSelectedPokemons(filteredItems)
		setValue('pokemons', filteredItems)
		setItemToLocalStorage('selectedPokemons', JSON.stringify(filteredItems))
	}

	const onArrowIconClick = () => {
		if (selectedPokemons.length >= 4) return
		setShowDropdown(!showDropdown)
	}

	return (
		<>
			<div className='h-10 relative px-2 border-2 rounded-md border-gray-300 flex justify-between align-middle'>
				<ul className='flex gap-2 absolute'>
					{items.map(({ name }) => (
						<li key={name}>
							<Badge text={name} onBadgeClick={() => onBadgeClick(name)} />
						</li>
					))}
				</ul>
				<img
					className={arrowDownClassNames}
					src={ChevronDown}
					alt='chevron icon'
					width={16}
					height={16}
					onClick={onArrowIconClick}
				/>
			</div>
			{showDropdown && (
				<SelectDropdown
					selectedPokemons={selectedPokemons}
					setSelectedPokemons={setSelectedPokemons}
					setShowDropdown={setShowDropdown}
				/>
			)}
		</>
	)
}

export default Select
