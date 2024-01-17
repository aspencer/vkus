import { expect, it } from 'vitest'; 
import { recipeList, createRecipeList } from './recipeList.js'; 

it('should create default objects from scratch', () => {
	const emptyRecipeList = createRecipeList();
	expect(emptyRecipeList).toStrictEqual(recipeList);
});

it('should create full object from partial data', () => {
	/** @var RecipeList */
	const targetRecipeList = {
		id: 1234,
		type: 'SOMETIMES',
	};
	const resultRecipeList = createRecipeList(targetRecipeList);

	// full RecipeList object
	expect(Object.keys(resultRecipeList)).toStrictEqual(Object.keys(recipeList));
	// id, type should be set
	expect(resultRecipeList.id).toBe(targetRecipeList.id);
	expect(resultRecipeList.type).toBe(targetRecipeList.type);
});

it('should create respect extra data on the object', () => {
	/** @var RecipeList */
	const targetRecipeList = {
		id: 1234,
		type: 'SOMETIMES',
		lastUsed: 1234, // Extra Data not in RecipeList model
	};
	const resultRecipeList = createRecipeList(targetRecipeList);

	// full RecipeList object
	expect(Object.keys(resultRecipeList)).not.toStrictEqual(
		Object.keys(recipeList)
	);
	// id, type should be set
	expect(resultRecipeList.id).toBe(targetRecipeList.id);
	expect(resultRecipeList.type).toBe(targetRecipeList.type);
	// Extra data should exist on the result model
	expect(resultRecipeList.lastUsed).toBe(targetRecipeList.lastUsed);
});
