import { toFixed } from '..';

/**
 * This function modifies rates value by digits
 *
 * @param {Object} rates - Rates
 * @param {number} [digits=6] - Digits
 * @returns {Object} - Modified rates
 */
const modifyWithToFixed = (rates, digits = 6) => {
  const result = {};

  Object.entries(rates).forEach(([rateKey, rateValue]) => {
    result[rateKey] = toFixed(rateValue, digits);
  });

  return result;
};

export default modifyWithToFixed;
