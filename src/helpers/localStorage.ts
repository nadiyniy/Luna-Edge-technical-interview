export const setItemToLocalStorage = (key: string, value: string) => {
	localStorage.setItem(key, value);
};

export const getItemFromLocalStorage = (key: string) => {
	const storedValue: string | null = localStorage.getItem(key);
	return storedValue ? JSON.parse(storedValue) : [];
};
