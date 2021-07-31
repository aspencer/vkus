import {create} from './model';

it('should create default objects from scratch', () => {
	const model = {
		foo: null,
		baz: null,
	}
	const empty = create(model);
	expect(empty).toStrictEqual(model);
});

it('should create full object from partial data', () => {
	/** @var Recipe */
	const model = {
		foo: null,
		baz: null,
	}
	const target = {
		foo: 'bar',
	};
	const result = create(model, target);

	// full object
	expect(Object.keys(result)).toStrictEqual(Object.keys(model));
	// foo should be set
	expect(result.foo).toBe(target.foo);
});

it('should create respect extra data on the object', () => {
	/** @var Recipe */
	const model = {
		foo: null,
		baz: null,
	}
	const target = {
		foo: 'bar',
		baz: 1234,
		blonk: false,
	};
	const result = create(model, target);

	// full object has extra keys
	expect(Object.keys(result)).not.toStrictEqual(Object.keys(model));
	// title, lastUsed should be set
	expect(result.foo).toBe(target.foo);
	expect(result.baz).toBe(target.baz);
	expect(result.blonk).toBe(target.blonk);
});