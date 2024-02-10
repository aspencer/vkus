import {render, cleanup} from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest';

import { RecipeList, RecipeListProps } from './RecipeList';
import { createRecipe } from '../data/recipe';
import React, { useState } from 'react';

describe('RecipeList', () => {
    afterEach(cleanup);

    const renderList = (props: RecipeListProps) => {
        const recipes = props.recipes  || [];
        const testid = props.testid;
        return render(<RecipeList recipes={recipes} testid={testid}/>)
    } 

    it('should render without crashing', () => {
        const { getByTestId } = renderList({
            testid: 'foo',
            recipes: []
        });
        expect(getByTestId('recipe-list-foo')).toBeTruthy();
    });

    it('should include the recipes', () => {
        const recipe = createRecipe({
            id: '000-testing-id',
            title: 'foo',
        });
        const { getByTestId } = renderList({
            testid: null,
            recipes: [recipe],
        });
        const recipeCard = getByTestId('recipe-card-000-testing-id')
        expect(recipeCard).toBeTruthy();
        expect(recipeCard.textContent).toMatch('foo');
    });
});