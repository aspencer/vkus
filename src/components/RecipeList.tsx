import React from 'react';

import { RecipeCard } from './RecipeCard'
import { Recipe } from '../data/recipe';

interface RecipeListProps {
  recipes: Array<Recipe>,
}

export const RecipeList = (props: RecipeListProps) => {

  const recipes = props.recipes;

  return (
    <ul className="space-y-8 max-w-96 mx-auto">
      {recipes.map(recipe => 
        <li
          key={recipe.id}
        >
          <RecipeCard
            recipe={recipe}
          />
        </li>
      )}
    </ul>
  );
};