import { create } from './model';

import { upgradeSchema } from '../lib/db';

export const RECIPE_STORE = 'recipes';

/**
 * @typedef {Object} Recipe
 * @property {!number} id Unique Identifier for the recipe
 * @property {!string} title Name of the receipe
 * @property {?string} image Link to image for recipe card
 * @property {?string} link External link to recipe (paprika, blog, online)
 * @property {[string]} tags Applicable tags (ex: 'kid-friendly', 'quick', 'vegan')
 * @property {number} lastUsed Timestamp for when the recipe was last in a plan
 */

/** @type Recipe */
export const recipe = {
	id: null,
	title: null,
	image: null,
	link: null,
	tags: [],
	lastUsed: 0,
};

/**
 * Create a recipe object
 *
 * @param {object} targetRecipe
 * @return {Recipe}
 */
export const createRecipe = function (targetRecipe = {}) {
	return create(recipe, targetRecipe);
};

/**
 * Add a new recipe onto the store
 *
 * @param {object} db Wrapped IndexedDB Object
 * @param {Recipe} targetRecipe
 * @returns {Recipe}
 */
export const addRecipe = async (db, targetRecipe) => {
	const recipe = createRecipe(targetRecipe);

	// default key will be returned
	delete recipe.id;

	recipe.id = await db.add(RECIPE_STORE, recipe);

	return recipe;
};

/**
 * Add a new recipe onto the store
 *
 * @param {object} db Wrapped IndexedDB Object
 * @param {any} key
 * @returns {Recipe}
 */
export const getRecipe = async (db, key) => {
	return await db.get(RECIPE_STORE, key);
};

/**
 * Recipe Schema
 *
 * @param {object} params
 * @param {object} params.db IDB Object
 * @param {number} params.oldVersion Old/Current DB Version
 * @param {number} params.newVersion New DB version
 * @param {object} params.tx IDB upgrade transaction
 */
export const upgradeRecipeSchema = function ({
	db,
	oldVersion,
	newVersion,
	tx,
}) {
	const changes = {
		1: ({ db }) => {
			// Create a store of objects
			const store = db.createObjectStore(RECIPE_STORE, {
				// The 'id' property of the object will be the key.
				keyPath: 'id',
				// If it isn't explicitly set, create a value by auto incrementing.
				autoIncrement: true,
			});
			// Create an index on the 'date' property of the objects.
			store.createIndex('lastUsed', 'lastUsed');
			store.createIndex('title', 'title');
		},
	};

	upgradeSchema({
		changes,
		db,
		oldVersion,
		newVersion,
		tx,
	});
};
