import { defaultBase } from '../../constants/index.js';

/**
 * This function modifies rates depending on currency
 *
 * @param {string | null} base - Current base
 * @param {Object} data - Rates data
 * @returns {Object} Modified data
 */
const modifyWithBase = (base = '', data = {}) => {
  const result = {};
  const currentBase = data[base];

  if (!currentBase) {
    return { ...data, [defaultBase]: 1 };
  }

  Object.entries(data).forEach(([key, value]) => {
    if (key === base) {
      result[key] = 1;

      return;
    }

    result[key] = value / currentBase;
  });

  result[defaultBase] = 1 / currentBase;

  return result;
};

export default modifyWithBase;
