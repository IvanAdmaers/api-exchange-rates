import { RatesInterface } from '../../typescript/interfaces';
import { toFixed } from '..';

/**
 * This function modifies rates value by digits
 */
const modifyWithToFixed = (
  rates: RatesInterface,
  digits: number
): RatesInterface => {
  const result: RatesInterface = {};

  Object.entries(rates).forEach(([rateKey, rateValue]: [string, number]) => {
    result[rateKey] = toFixed(rateValue, digits);
  });

  return result;
};

export default modifyWithToFixed;
