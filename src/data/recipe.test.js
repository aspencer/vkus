import {recipe, createRecipe} from './recipe';

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
		scale: 2,
	};
	const resultRecipe = createRecipe(targetRecipe);

	// full recipe object
	expect(Object.keys(resultRecipe)).not.toStrictEqual(Object.keys(recipe));
	// title, lastUsed should be set
	expect(resultRecipe.lastUsed).toBe(targetRecipe.lastUsed);
	expect(resultRecipe.title).toBe(targetRecipe.title);
	expect(resultRecipe.scale).toBe(targetRecipe.scale);
});