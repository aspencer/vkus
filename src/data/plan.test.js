import { plan, createPlan } from './plan';

it('should create default objects from scratch', () => {
	const emptyPlan = createPlan();
	expect(emptyPlan).toStrictEqual(plan);
});

it('should create full object from partial data', () => {
	/** @var Plan */
	const targetPlan = {
		id: 1234,
		days: 4,
	};
	const resultPlan = createPlan(targetPlan);

	// full Plan object
	expect(Object.keys(resultPlan)).toStrictEqual(Object.keys(plan));
	// id, days should be set
	expect(resultPlan.id).toBe(targetPlan.id);
	expect(resultPlan.days).toBe(targetPlan.days);
});

it('should create respect extra data on the object', () => {
	/** @var Plan */
	const targetPlan = {
		id: 1234,
		days: 4,
		vacation: true, // Extra Data not in Plan model
	};
	const resultPlan = createPlan(targetPlan);

	// full Plan object
	expect(Object.keys(resultPlan)).not.toStrictEqual(Object.keys(plan));
	// id, days should be set
	expect(resultPlan.id).toBe(targetPlan.id);
	expect(resultPlan.days).toBe(targetPlan.days);
	// Extra data should exist on the result model
	expect(resultPlan.vacation).toBe(targetPlan.vacation);
});
