import { upgradeSchema } from "./db";

describe('upgradeSchema', () => {
	it('executes an upgrade function if it exists on the changes object', () => {
		const db = null;
		const tx = null;

		const changeV1 = jest.fn();

		const changes = {
			1: changeV1,
		};

		upgradeSchema({
			db,
			tx,
			changes,
			oldVersion: 0,
			newVersion: 1,
		});

		expect(changeV1).toHaveBeenCalled();
	});

	it('does not execute a change if the version number is in the past', () => {
		const db = null;
		const tx = null;

		const changeV1 = jest.fn();
		const changeV3 = jest.fn();

		const changes = {
			1: changeV1,
			2: 'no call',
			3: changeV3,
		};

		upgradeSchema({
			db,
			tx,
			changes,
			oldVersion: 1,
			newVersion: 3,
		});

		expect(changeV1).not.toHaveBeenCalled();
		expect(changeV3).toHaveBeenCalled();
	});

});


/*
export function upgradeSchema({ db, oldVersion, newVersion, tx, changes }) {
	// Start at the next version up from the current DB version
	let upgradeVersion = oldVersion + 1;
	// Check the change set for updates between the target version and the current version and apply them
	while (upgradeVersion <= newVersion) {
		const upgrade = changes[upgradeVersion];
		if (typeof upgrade === 'function') {
			upgrade({ db, tx });
		}

		upgradeVersion++;
	}
}
*/