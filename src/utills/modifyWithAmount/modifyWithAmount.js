/**
 * This function multiplies each currency by amount
 *
 * @param {number} amount - Amount
 * @param {Object} data - Rates data
 * @returns {Object} Modified data
 */
const modifyWithAmount = (amount = 0, data = {}) => {
  const result = {};

  Object.keys(data).forEach((key) => {
    result[key] = data[key] * amount;
  });

  return result;
};

export default modifyWithAmount;
