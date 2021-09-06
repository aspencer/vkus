import { openDB } from 'idb/with-async-ittr.js';

import { upgradeSchema } from '../lib/db';
import { upgradeRecipeSchema } from './recipe';

export const DB_NAME = 'VKUS';
const DB_VERSION = 1;

export const KEYVAL_STORE = 'app';

function dbPromise() {
	openDB(DB_NAME, DB_VERSION, {
		upgrade(db, oldVersion, newVersion, tx) {
			// General changes related to the app, keyval store
			const changes = {
				1: ({ db }) => {
					// Key-Value Store for the app
					db.createObjectStore(KEYVAL_STORE);
				},
			};
			upgradeSchema({
				changes,
				db,
				oldVersion,
				newVersion,
				tx,
			});

			// Recipe Schema changes
			upgradeRecipeSchema({
				changes,
				db,
				oldVersion,
				newVersion,
				tx,
			});
		},
	});
}

export async function vkusDB() {
	const db = await dbPromise();
	return db;
}

export async function getValue(key) {
	return (await dbPromise()).get(KEYVAL_STORE, key);
}
export async function setValue(key, val) {
	return (await dbPromise()).put(KEYVAL_STORE, val, key);
}
export async function deleteValue(key) {
	return (await dbPromise()).delete(KEYVAL_STORE, key);
}
export async function clearValues() {
	return (await dbPromise()).clear(KEYVAL_STORE);
}
export async function getValues() {
	return (await dbPromise()).getAllKeys(KEYVAL_STORE);
}
