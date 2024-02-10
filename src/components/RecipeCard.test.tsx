import {render, cleanup} from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest';

import { RecipeCard } from './RecipeCard';
import { createRecipe } from '../data/recipe';
import React, { useState } from 'react';

describe('RecipeCard', () => {
    afterEach(cleanup);

    it('should render without crashing', () => {
        const recipe = createRecipe({
            id: '000-testing-id',
            title: 'foo',
        });
        const { getByTestId } = render(<RecipeCard recipe={recipe}/>);
        expect(getByTestId('recipe-card-000-testing-id')).toBeTruthy();
    });

    it('should include the recipe title', () => {
        const recipe = createRecipe({
            id: '000-testing-id',
            title: 'foo',
        });
        const { getByTestId } = render(<RecipeCard recipe={recipe}/>);
        const recipeCard = getByTestId('recipe-card-000-testing-id')
        expect(recipeCard).toBeTruthy();
        expect(recipeCard.textContent).toMatch('foo');
    });
});