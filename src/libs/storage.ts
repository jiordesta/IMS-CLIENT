export const saveToStorage = (key: string, value: any) => {
	try {
		localStorage.setItem(key, JSON.stringify(value));
	} catch (error) {
		console.error(error);
	}
};

export const getFromStorage = (key: string) => {
	try {
		const value = localStorage.getItem(key);
		if (value) {
			return JSON.parse(value);
		}
	} catch (error) {
		console.error(error);
	}
};
