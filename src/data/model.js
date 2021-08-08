
/**
 * Create a model from a base and target object
 *
 * @param {object} baseModel Base model object
 * @param {object} objectModel Target model object
 * @returns {object}
 */
export const create = function (baseModel, objectModel={}) {
	return {
		...baseModel,
		...objectModel,
	};
};