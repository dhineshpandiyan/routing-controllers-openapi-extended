import { Storage } from './storage';
import { MetadataArgsStorage } from '../parser/rcTypes';

let storage: Storage;
let rcStorage: MetadataArgsStorage;

export function getStorage() {
	if (!storage) {
		storage = new Storage();
	}
	return storage;
};

export function getRCStorage(): MetadataArgsStorage {
	return rcStorage;
};

export function setRCStorage(rcStore: MetadataArgsStorage): void {
	rcStorage = rcStore
};
