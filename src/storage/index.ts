import { Storage } from './storage';

let storage: Storage;

export function getStorage() {
	if (!storage) {
		storage = new Storage();
	}
	return storage;
};
