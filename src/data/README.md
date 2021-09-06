Recipe

```
	id        {number} [Required] // ex: 1234
	title     {string} [Required] // ex: Sausage and Veggies
	image     {string} // image link
	link      {string} // recipe link - paprika, others
	tags      [{string}] // tags [chris-friendly, kid-friendly, quick]
	lastUsed  {number} // timestamp that this recipe was last used
```

Plan

```
	date     {timestamp} // TS for start date of the meal plan
	days     {number} // Number of days
	recipes  [{number}] // Included Recipes [Recipe.id, Recipe.id]
	notes    {string} // "Friends coming over on Monday, XMAS, Need something fast"
```

RecipeList

```
	type    {string} // Standard Rotation | Flavor | Once-in-awhile | Sides | New
	recipes [{number}] // Included Recipes [Recipe.id, Recipe.id]
```
