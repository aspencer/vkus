import React from 'react';

import { recipeTests } from './data/recipe';
import { RecipeList } from './components/RecipeList';

function App() {
  return (
    <>
      <div className="my-20">
        <RecipeList
          testid='default-list'
          recipes={recipeTests}
        />
      </div>
    </>
  );
}

export default App;
