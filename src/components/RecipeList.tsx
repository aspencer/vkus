import React from 'react';

import { RecipeCard } from './RecipeCard'
import { Recipe } from '../data/recipe';

export interface RecipeListProps {
  testid: string,
  recipes: Array<Recipe>,
}

export const RecipeList = (props: RecipeListProps) => {

  const {
    testid,
    recipes, 
  }= props;

  return (
    <ul 
      data-testid={`recipe-list-${testid}`}
      className="space-y-8 max-w-96 mx-auto"
    >
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