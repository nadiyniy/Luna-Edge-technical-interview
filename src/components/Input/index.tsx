import { InputProps } from './types'

const Input = ({ errors, field, type = 'text', ...restProps }: InputProps) => {
	return (
		<div className='relative'>
			<input
				className={`w-full px-2 rounded-md placeholder-shown:border-gray-300 border-2 
${
	errors
		? 'border-red-500 outline-0 placeholder-shown:border-red-500'
		: 'hover:border-indigo-900 focus:border-indigo-900 focus:outline-0 hover:outline-0 focus:outline-0 focus:border-green-900 hover:border-green-900 border-green-900'
} placeholder-shown:hover:border-indigo-900 placeholder-shown:focus:border-indigo-900`}
				{...field}
				type={type}
				{...restProps}
			/>
			{errors && <p className='absolute top-7 left-0 text-red-500'>{errors.message}</p>}
		</div>
	)
}

export default Input
