import React, { useState } from 'react';

import { recipeTests, Recipe } from './data/recipe';

interface RecipeCardProps {
  recipe: Recipe,
}

const RecipeCard = (props: RecipeCardProps) => {
  const recipe = props.recipe;

  return (
    <div className="p-8 bg-slate-200 text-gray-900 text-lg font-medium rounded-md shadow-xl text-center">
      {recipe.title}
    </div>
  );
}

function App() {
  return (
    <>
      <div className="card">
        <ul className="space-y-8 max-w-96 mx-auto my-20">
          {recipeTests.map(recipe => 
            <li
              key={recipe.id}
            >
              <RecipeCard
                recipe={recipe}
              />
            </li>
          )}
        </ul>
      </div>
    </>
  );
}

export default App;
