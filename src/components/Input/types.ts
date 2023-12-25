import { ChangeEvent } from 'react';

export type SelectProps = {
	errors: { message?: string } | undefined;
	field: {
		value: string;
		onChange: (event: ChangeEvent<HTMLInputElement>) => void;
		onBlur: () => void;
	};
};
