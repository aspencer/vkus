import { assertType, expect, expectTypeOf, it } from 'vitest';
import { MealPlan, createPlan } from './plan';

it('should create default objects from scratch', () => {
  const emptyPlan = createPlan();

  assertType<MealPlan>(emptyPlan);
});

it('should create full object from partial data', () => {
  const targetPlan = {
    id: '1234-abcd-4321',
    days: 4,
  };
  const resultPlan = createPlan(targetPlan);

  // full MealPlan object
  assertType<MealPlan>(resultPlan);
  // id, days should be set
  expect(resultPlan.id).toBe(targetPlan.id);
  expect(resultPlan.days).toBe(targetPlan.days);
});

it('should create respect extra data on the object', () => {
  const targetPlan = {
    id: '1234-abcd-4321',
    days: 4,
    vacation: true, // Extra Data not in Plan model
  };
  const resultPlan = createPlan(targetPlan);
  const plan = <MealPlan>{};

  // full Plan object
  assertType<MealPlan>(resultPlan);
  expect(Object.keys(resultPlan)).not.toStrictEqual(<MealPlan>{});
  // id, days should be set
  expect(resultPlan.id).toBe(targetPlan.id);
  expect(resultPlan.days).toBe(targetPlan.days);
  expect(resultPlan.recipes).toEqual([]);
  expect(resultPlan.notes).toBeTypeOf('undefined');
  // @ts-ignore: Extra data should exist on the result model (even though code won't use it)
  expect(resultPlan.vacation).toBe(targetPlan.vacation);
});

it('should discard bad data without throwing an error', () => {
  const targetPlan = {
    id: false,
    days: ['what'],
    recipes: 'blah',
    datets: 'asdf',
    notes: 333,
  };
  const resultPlan = createPlan(targetPlan);
  assertType<MealPlan>(resultPlan);
  expect(resultPlan.recipes).toEqual([]);
  expect(resultPlan.id).toBeTypeOf('string');
  expect(resultPlan.days).toEqual(0);
  expect(resultPlan.datets).toEqual(0);
  expect(resultPlan.notes).toEqual('333');
});
