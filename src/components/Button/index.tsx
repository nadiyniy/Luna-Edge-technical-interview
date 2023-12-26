import { ButtonProps } from './types';

const Button = ({ value, variant = 'primary', size = 'base', className, foo, children, ...restProps }: ButtonProps) => {
	const variantStyles = {
		outline:
			'border border-indigo-900 text-indigo-900 hover:bg-indigo-300 hover:text-indigo-500 hover:border-indigo-500 focus:border-2 focus:border-indigo-900 focus:bg-indigo-300 focus:text-indigo-900 disabled:opacity-40 disabled:text-indigo-900 disabled:bg-indigo-300 disabled:border-none disabled:cursor-default',
		primary:
			'bg-indigo-900 border-indigo-900 text-white hover:bg-indigo-500 disabled:opacity-40 disabled:text-indigo-900 disabled:bg-indigo-300 disabled:border-none disabled:cursor-default focus:border-2 focus:border-indigo-900 focus:bg-indigo-500',
		text: 'text-black hover:text-gray-700 disabled:opacity-40 disabled:text-indigo-900  disabled:border-none disabled:cursor-default hover:bg-indigo-300 hover:text-indigo-500 focus:border-2 focus:border-indigo-900 focus:text-indigo-900',
	};

	const sizeStyles = {
		xs: 'h-5 text-xs',
		sm: 'h-6 text-sm',
		base: 'h-8 text-base',
		lg: 'h-10 text-lg',
		xl: 'h-12 text-xl',
	};

	const baseStyle = `rounded-md focus:outline-none ${variantStyles[variant] || ''} ${
		sizeStyles[size] || ''
	} px-2 cursor-pointer`;

	const buttonStyle = `${baseStyle} ${className}`;

	return (
		<button className={buttonStyle} onClick={foo} {...restProps}>
			{value}
			{children}
		</button>
	);
};

export default Button;
