import Button from '.';

export default {
	component: Button,
	title: 'Button',
	tags: ['autodocs'],
	args: {
		value: 'Button',
		type: 'button',
		disabled: false,
		size: 'xs',
	},
};

export const Outline = {
	args: {
		variant: 'outline',
	},
};
