/**
 * This function modifies rates depending on currency
 *
 * @param {string | null} base - Current base
 * @param {Object} data - Rates data
 * @returns {Object} Modified data
 */
const modifyWithBase = (base = '', data = {}) => {
  const currentBase = data[base];

  if (!currentBase) {
    return { ...data };
  }

  const result = {};

  Object.entries(data).forEach(([key, value]) => {
    if (key === base) {
      result[key] = 1;

      return;
    }

    result[key] = value / currentBase;
  });

  return result;
};

export default modifyWithBase;
