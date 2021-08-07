import { create } from './model';

/**
 * @typedef {Object} Recipe
 * @property {!number} id Unique Identifier for the recipe
 * @property {!string} title Name of the receipe
 * @property {?string} image Link to image for recipe card
 * @property {?string} link External link to recipe (paprika, blog, online)
 * @property {[string]} tags Applicable tags (ex: 'kid-friendly', 'quick', 'vegan')
 * @property {number} lastUsed Timestamp for when the recepe was last in a plan
 */

/** @type Recipe */
export const recipe = {
	id: null,
	title: null,
	image: null,
	link: null,
	tags: [],
	lastUsed: null,
};

/**
 * Create a recipe object
 *
 * @param {object} targetRecipe
 * @return {Recipe}
 */
export const createRecipe = function (targetRecipe={}) {
	return create(recipe, targetRecipe);
};