import { ChangeEvent } from 'react'

export type InputProps = {
	errors?: { message?: string } | undefined
	placeholder?: string
	type: 'email' | 'text'
	onChange?: (event: ChangeEvent<HTMLInputElement>) => void
	field?: {
		value: string
		onBlur: () => void
	}
	value?: string
}
