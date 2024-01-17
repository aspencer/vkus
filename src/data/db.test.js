import { describe, expect, it } from 'vitest';
import {
	vkusDB,
	KEYVAL_STORE,
	getValue,
	setValue,
	deleteValue,
	clearValues,
	getValues,
} from './db';

import 'fake-indexeddb/auto'; 

describe('App Key-Value Storage', () => {
	it('should create a app-level key-value store', async () => {
		const db = await vkusDB();

		// Recipe Store should exist
		const includesRecipeStore = db.objectStoreNames.includes(KEYVAL_STORE);
		expect(includesRecipeStore).toBe(true); 
	}); 

	it('should allow getting/setting key-value pairs', async () => {
		let keys = await getValues();
		expect(keys.length).toBe(0);

		// Set some values
		await setValue('foo', 'bar');
		await setValue('cool', 'guy');
		await setValue('sand', 'witch');
		expect(await getValue('foo')).toBe('bar');
		expect(await getValue('cool')).toBe('guy');
		expect(await getValue('sand')).toBe('witch');
		keys = await getValues();
		expect(keys.length).toBe(3);

		// Delete a value
		await deleteValue('foo');
		expect(await getValue('foo')).toBe(undefined);
		keys = await getValues();
		expect(keys.length).toBe(2);

		// Clear All Values
		await clearValues();
		keys = await getValues();
		expect(keys.length).toBe(0);
	});
});
