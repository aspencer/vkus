import { describe, expect, it, assertType } from 'vitest';
import { vkusDB } from './db';
import {
  Recipe,
  createRecipe,
  addRecipe,
  getRecipe,
  RECIPE_STORE,
} from './recipe';

import 'fake-indexeddb/auto';

describe('createRecipe', () => {
  it('should create default objects from scratch', () => {
    const emptyRecipe = createRecipe();
    assertType<Recipe>(emptyRecipe);
  });

  it('should create full object from partial data', () => {
    /** @var Recipe */
    const targetRecipe = {
      title: 'Test Title',
      lastUsedTs: 1234,
    };
    const resultRecipe = createRecipe(targetRecipe);

    // full recipe object
    assertType<Recipe>(resultRecipe);
    // title, lastUsedTs should be set
    expect(resultRecipe.lastUsedTs).toBe(targetRecipe.lastUsedTs);
    expect(resultRecipe.title).toBe(targetRecipe.title);
  });

  it('should create respect extra data on the object', () => {
    /** @var Recipe */
    const targetRecipe = {
      title: 'Test Title',
      lastUsedTs: 1234,
      scale: 2, // Extra Data not in recipe model
    };
    const resultRecipe = createRecipe(targetRecipe);

    // full recipe object
    assertType<Recipe>(resultRecipe);
    // title, lastUsedTs should be set
    expect(resultRecipe.lastUsedTs).toBe(targetRecipe.lastUsedTs);
    expect(resultRecipe.title).toBe(targetRecipe.title);
    // @ts-ignore: Extra data should exist on the result model
    expect(resultRecipe.scale).toBe(targetRecipe.scale);
  });

  it('should discard bad data without throwing an error', () => {
    const targetRecipe = {
      title: 4321,
      image: 4321,
      link: 4321,
      tags: 'asdf',
      lastUsedTs: true,
    };
    const resultRecipe = createRecipe(targetRecipe);
    assertType<Recipe>(resultRecipe);
    expect(resultRecipe.id).toBeTypeOf('string');
    expect(resultRecipe.tags).toEqual([]);
    expect(resultRecipe.title).toEqual('4321');
    expect(resultRecipe.link).toEqual('4321');
    expect(resultRecipe.image).toEqual('4321');
  });
});

describe('addRecipe', () => {
  it('should add a recipe to the recipe store', async () => {
    const targetRecipe = {
      title: 'Cool Recipe',
    };

    // Add new recipe
    const db = await vkusDB();
    const recipe = await addRecipe(db, targetRecipe);

    // Check recipe on target db
    const checkRecipe = await getRecipe(db, recipe.id);
    expect(checkRecipe.id).toBe(recipe.id);
    expect(checkRecipe.title).toBe(targetRecipe.title);
  });
});

describe('upgradeRecipeSchema', () => {
  it('should update the recipe schema on install', async () => {
    const db = await vkusDB();

    // Recipe Store should exist
    const includesRecipeStore = db.objectStoreNames.contains(RECIPE_STORE);
    expect(includesRecipeStore).toBe(true);

    // Indexes Should be set up
    const tx = db.transaction(RECIPE_STORE, 'readonly');
    const store = tx.store;
    expect(store.index('lastUsedTs')).toBeTruthy();
    expect(store.index('title')).toBeTruthy();
  });
});
