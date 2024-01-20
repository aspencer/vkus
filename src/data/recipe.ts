import { upgradeSchema } from '../lib/db';

export const RECIPE_STORE = 'recipes';

export interface Recipe {
  /** Unique Identifier for the recipe */
  id: string;

  /** Name of the receipe */
  title: string;

  /** Link to image for recipe */
  image?: string;

  /** External link to recipe (paprika, blogpost) */
  link?: string;

  /** Applicable tags (ex: 'kid-friendly', 'quick', 'vegan') */
  tags: Array<string>;

  /** Timestamp for when the recipe was last in a plan */
  lastUsedTs: number;
}

/**
 * Create a recipe object
 *
 * @param {object} targetRecipe
 * @return {Recipe}
 */
export const createRecipe = function (targetRecipe: Object = {}): Recipe {
  const data: Object = {
    recipes: [], // default to empty
    ...targetRecipe,
  };

  const recipe = <Recipe>data;

  if (typeof recipe.id !== 'string') {
    recipe.id = crypto.randomUUID();
  }
  if ('title' in recipe && typeof recipe.title !== 'string') {
    recipe.title = String(recipe.title);
  }
  if ('image' in recipe && typeof recipe.image !== 'string') {
    recipe.image = String(recipe.image);
  }
  if ('link' in recipe && typeof recipe.link !== 'string') {
    recipe.link = String(recipe.link);
  }
  if ('lastUsedTs' in recipe && !Number.isInteger(recipe.lastUsedTs)) {
    recipe.lastUsedTs = 0;
  }

  if (!Array.isArray(recipe.tags)) {
    recipe.tags = [];
  }
  // Todo[tags] : validate types

  return recipe;
};

/**
 * Add a new recipe onto the store
 *
 * @param {object} db Wrapped IndexedDB Object
 * @param {Recipe} targetRecipe
 * @returns {Recipe}
 */
export const addRecipe = async (db, targetRecipe) => {
  const recipe = createRecipe(targetRecipe);

  recipe.id = await db.add(RECIPE_STORE, recipe);

  return recipe;
};

/**
 * Add a new recipe onto the store
 *
 * @param {object} db Wrapped IndexedDB Object
 * @param {any} key
 * @returns {Recipe}
 */
export const getRecipe = async (db, key) => {
  return await db.get(RECIPE_STORE, key);
};

/**
 * Recipe Schema
 *
 * @param {object} params
 * @param {object} params.db IDB Object
 * @param {number} params.oldVersion Old/Current DB Version
 * @param {number} params.newVersion New DB version
 * @param {object} params.tx IDB upgrade transaction
 */
export const upgradeRecipeSchema = function ({
  db,
  oldVersion,
  newVersion,
  tx,
}) {
  const changes = {
    1: ({ db }) => {
      // Create a store of objects
      const store = db.createObjectStore(RECIPE_STORE, {
        // The 'id' property of the object will be the key.
        keyPath: 'id',
        // If it isn't explicitly set, create a value by auto incrementing.
        autoIncrement: true,
      });
      // Create an index on the 'date' property of the objects.
      store.createIndex('lastUsedTs', 'lastUsedTs');
      store.createIndex('title', 'title');
    },
  };

  upgradeSchema({
    changes,
    db,
    oldVersion,
    newVersion,
    tx,
  });
};
