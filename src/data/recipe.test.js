import { vkusDB } from './db';
import {
	recipe,
	createRecipe,
	addRecipe,
	getRecipe,
	RECIPE_STORE,
} from './recipe';

require('fake-indexeddb/auto');

describe('createRecipe', () => {
	it('should create default objects from scratch', () => {
		const emptyRecipe = createRecipe();
		expect(emptyRecipe).toStrictEqual(recipe);
	});

	it('should create full object from partial data', () => {
		/** @var Recipe */
		const targetRecipe = {
			title: 'Test Title',
			lastUsed: 1234,
		};
		const resultRecipe = createRecipe(targetRecipe);

		// full recipe object
		expect(Object.keys(resultRecipe)).toStrictEqual(Object.keys(recipe));
		// title, lastUsed should be set
		expect(resultRecipe.lastUsed).toBe(targetRecipe.lastUsed);
		expect(resultRecipe.title).toBe(targetRecipe.title);
	});

	it('should create respect extra data on the object', () => {
		/** @var Recipe */
		const targetRecipe = {
			title: 'Test Title',
			lastUsed: 1234,
			scale: 2, // Extra Data not in recipe model
		};
		const resultRecipe = createRecipe(targetRecipe);

		// full recipe object
		expect(Object.keys(resultRecipe)).not.toStrictEqual(Object.keys(recipe));
		// title, lastUsed should be set
		expect(resultRecipe.lastUsed).toBe(targetRecipe.lastUsed);
		expect(resultRecipe.title).toBe(targetRecipe.title);
		// Extra data should exist on the result model
		expect(resultRecipe.scale).toBe(targetRecipe.scale);
	});
});

describe('addRecipe', () => {
	it('should add a recipe to the recipe store', async () => {
		const targetRecipe = {
			title: 'Cool Recipe',
		};

		// Add new recipe
		const db = await vkusDB();
		const recipe = await addRecipe(db, targetRecipe);

		// Check recpie on target db
		const checkRecipe = await getRecipe(db, recipe.id);
		expect(checkRecipe.id).toBe(recipe.id);
		expect(checkRecipe.title).toBe(targetRecipe.title);
		expect(checkRecipe.lastUsed).toBe(0);
	});
});

describe('upgradeRecipeSchema', () => {
	it('should update the recipe schema on install', async () => {
		const db = await vkusDB();

		// Recipe Store should exist
		const includesRecipeStore = db.objectStoreNames.includes(RECIPE_STORE);
		expect(includesRecipeStore).toBe(true);

		// Indexes Should be set up
		const tx = db.transaction(RECIPE_STORE, 'readonly');
		const store = tx.store;
		expect(store.index('lastUsed')).toBeTruthy();
		expect(store.index('title')).toBeTruthy();
	});
});
