/**
 * Defines an individual Meal Plan
 */
export interface MealPlan {
	/** Unique Identifier for the plan */
	id: string, 

	/** Timestamp for the start date of the meal plan */
	datets: number,
	
	/** Timestamp for the start date of the meal plan */
	days: number,

	/** Planned Recipes */
	recipes: Array<PlannedRecipe>, 

	/** Notes on the plan (Friends over Monday, XMAS, Need something fast Tues) */
	notes?: string,
};

// todo: work on this
export interface PlannedRecipe {
	recipeId: string,
	slot: number
}


export const createPlan = function (targetPlan: Object = {}): MealPlan {

	const data: Object = {
		recipes: [], // default to empty
		...targetPlan
	}

	const plan = <MealPlan>data;

	if ('id' in plan && typeof plan.id !== 'string') {
		plan.id = crypto.randomUUID();
	}
	if ('datets' in plan && !Number.isInteger(plan.datets)) {
		plan.datets = 0;
	}
	if ('days' in plan && !Number.isInteger(plan.days)) {
		plan.days = 0;
	}
	if ('notes' in plan && typeof plan.notes !== 'string') {
		plan.notes = String(plan.notes);
	}

	if (!Array.isArray(plan.recipes)) {
		plan.recipes = [];
	}
	// Todo[recipes] : validate types

	return plan;
}; 
