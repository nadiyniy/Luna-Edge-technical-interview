import { Pokemon } from '../../../../api/types'

export type SelectDropdownProps = {
	selectedPokemons: Pokemon[]
	setSelectedPokemons: any
	setShowDropdown: React.Dispatch<React.SetStateAction<boolean>>
}
