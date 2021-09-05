import { create } from './model';

/**
 * @typedef {Object} RecipeList
 * @property {!number} id Unique Identifier for the RecipeList
 * @property {string} type Type of list (StandardRotation, Somtimes, Sides, New)
 * @property {[number]} recipes Recipies in the RecipeList
 */

/** @type RecipeList */
export const recipeList = {
	id: null,
	type: null,
	recipes: [],
};

/**
 * Create a RecipeList object
 *
 * @param {object} targetRecipeList
 * @return {RecipeList}
 */
export const createRecipeList = function (targetRecipeList = {}) {
	return create(recipeList, targetRecipeList);
};
