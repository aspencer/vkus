import { create } from './model';

/**
 * @typedef {Object} Plan
 * @property {!number} id Unique Identifier for the plan
 * @property {number} date Timestamp for the start date of the meal plan
 * @property {number} days Number or Days
 * @property {[number]} recipes Recipies in the meal plan
 * @property {?string} notes Notes on the plan (Friends over Monday, XMAS, Need something fast Tues)
 */

/** @type Plan */
export const plan = {
	id: null,
	date: null,
	days: null,
	recipes: [],
	notes: null,
};

/**
 * Create a plan object
 *
 * @param {object} targetPlan
 * @return {Plan}
 */
export const createPlan = function (targetPlan = {}) {
	return create(plan, targetPlan);
};
