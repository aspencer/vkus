import React, { useState } from 'react';

import { Recipe } from '../data/recipe';

interface RecipeCardProps {
  recipe: Recipe,
}

export const RecipeCard = (props: RecipeCardProps) => {
  const recipe = props.recipe;

  return (
    <div 
      data-testid={`recipe-card-${recipe.id}`}
      className="p-8 bg-slate-200 text-gray-900 text-lg font-medium rounded-md shadow-xl text-center"
    >
      {recipe.title}
    </div>
  );
};