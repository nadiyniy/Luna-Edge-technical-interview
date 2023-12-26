export type Pokemon = {
	name: string
	sprites?: PokemonSprites
}

export type PokemonSprites = {
	back_default: string
	back_female: string | null
	back_shiny: string
	back_shiny_female: string | null
	front_default: string
	front_female: string | null
	front_shiny: string
	front_shiny_female: string | null
	other: {
		dream_world: {
			front_default: string
			front_female: string | null
		}
		home: {
			front_default: string
			front_female: string | null
			front_shiny: string
			front_shiny_female: string | null
		}
		'official-artwork': {
			front_default: string
			front_shiny: string
		}
		showdown: {
			back_default: string
			back_female: string | null
			back_shiny: string
			back_shiny_female: string | null
			front_default: string
			front_female: string | null
			front_shiny: string
			front_shiny_female: string | null
		}
	}
	versions: {
		'generation-i': {
			'red-blue': {
				back_default: string
				back_gray: string
				back_transparent: string
				front_default: string
				front_gray: string
				front_transparent: string
			}
			yellow: {
				back_default: string
				back_gray: string
				back_transparent: string
				front_default: string
				front_gray: string
				front_transparent: string
			}
		}
		'generation-ii': {
			crystal: {
				back_default: string
				back_shiny: string
				back_shiny_transparent: string
				back_transparent: string
				front_default: string
				front_shiny: string
				front_shiny_transparent: string
				front_transparent: string
			}
			gold: {
				back_default: string
				back_shiny: string
				front_default: string
				front_shiny: string
				front_transparent: string
			}
			silver: {
				back_default: string
				back_shiny: string
				front_default: string
				front_shiny: string
				front_transparent: string
			}
		}
		'generation-iii': {
			emerald: {
				front_default: string
				front_shiny: string
			}
			'firered-leafgreen': {
				back_default: string
				back_shiny: string
				front_default: string
				front_shiny: string
			}
			'ruby-sapphire': {
				back_default: string
				back_shiny: string
				front_default: string
				front_shiny: string
			}
		}
		'generation-iv': {
			'diamond-pearl': {
				back_default: string
				back_female: string | null
				back_shiny: string
				back_shiny_female: string | null
				front_default: string
				front_female: string | null
				front_shiny: string
				front_shiny_female: string | null
			}
			'heartgold-soulsilver': {
				back_default: string
				back_female: string | null
				back_shiny: string
				back_shiny_female: string | null
				front_default: string
				front_female: string | null
				front_shiny: string
				front_shiny_female: string | null
			}
			platinum: {
				back_default: string
				back_female: string | null
				back_shiny: string
				back_shiny_female: string | null
				front_default: string
				front_female: string | null
				front_shiny: string
				front_shiny_female: string | null
			}
		}
		'generation-v': {
			'black-white': {
				animated: {
					back_default: string
					back_female: string | null
					back_shiny: string
					back_shiny_female: string | null
					front_default: string
					front_female: string | null
					front_shiny: string
					front_shiny_female: string | null
				}
				back_default: string
				back_female: string | null
				back_shiny: string
				back_shiny_female: string | null
				front_default: string
				front_female: string | null
				front_shiny: string
				front_shiny_female: string | null
			}
		}
		'generation-vi': {
			'omegaruby-alphasapphire': {
				front_default: string
				front_female: string | null
				front_shiny: string
				front_shiny_female: string | null
			}
			'x-y': {
				front_default: string
				front_female: string | null
				front_shiny: string
				front_shiny_female: string | null
			}
		}
		'generation-vii': {
			icons: {
				front_default: string
				front_female: string | null
			}
			'ultra-sun-ultra-moon': {
				front_default: string
				front_female: string | null
				front_shiny: string
				front_shiny_female: string | null
			}
		}
		'generation-viii': {
			icons: {
				front_default: string
				front_female: string | null
			}
		}
	}
}
