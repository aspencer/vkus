import React from 'react';

import { recipeTests } from './data/recipe';
import { RecipeList } from './components/RecipeList';

function App() {
  return (
    <>
      <div className="my-20">
        <RecipeList
          recipes={recipeTests}
        />
      </div>
    </>
  );
}

export default App;
