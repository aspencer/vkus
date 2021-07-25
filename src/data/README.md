Recipe
```
	id        {number} [Required] // ex: 1234
	title     {string} [Required] // ex: Sausage and Veggies
	image     {string} // image link
	link      {string} // recipe link - paprika, others
	tags      [{string}] // tags [chris-friendly, kid-friendly, quick]
	lastUsed  {date} // date that this recipe was last used
```

Plan
```
	date  {timestamp} // TS for start date of the meal plan
	plan  [{PlanDay}] // Array of `PlanDays`
```

PlanDay
```
	dow     {string} // Monday
	recipes [Recipe.id] // Recipes associated with this day
	tags    [{string}] // chris-friendly, quick, yoyo
	notes   {string} // "Friends coming over, XMAS, Need something fast"
```

RecipeList
```
	type    {string} // Standard Rotation | Flavor | Once-in-awhile | Sides | New
	recipes [Recipe.id, Recipe.id] // List of recipes in this list
```