export type ButtonProps = {
	value: string;
	variant?: 'outline' | 'primary' | 'text';
	size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl';
	type?: 'submit' | 'button';
	className?: string;
	disabled?: boolean;
};
