import { Storage } from './storage';

export * from './types';

let storage: Storage;

export function getStorage() {
    if (!storage) {
        storage = new Storage();
    }
    return storage;
}
