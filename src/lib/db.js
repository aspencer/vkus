/**
 * During IDB 'upgrade' event, process a list of changes by DB version
 *
 * Example changes object:
 *
 * const changes = {
 * 	1: ({ db }) => {
 *		// Create a store of objects
 *		const store = db.createObjectStore('articles', {
 *			keyPath: 'id',
 *			autoIncrement: true,
 *		});
 *		// Create an index on the 'date' property of the objects.
 *		store.createIndex('date', 'date');
 *	},
 *	3: ({ tx }) => {
 *		// Add 'name' index to previously-existing store
 *		const store = tx.objectStore('articles');
 *		store.createIndex('name', 'name');
 *	},
 * }
 *
 * @param {object} params
 * @param {object} params.db IDB Object
 * @param {number} params.oldVersion Old/Current DB Version
 * @param {number} params.newVersion New DB version
 * @param {object} params.tx IDB upgrade transaction
 * @param {object} params.changes Changes Object
 */
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
