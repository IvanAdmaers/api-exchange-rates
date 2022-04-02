import { rates } from '../../typescript/types';

/**
 * This function multiplies each currency by amount
 */
const modifyWithAmount = (amount: number, data: rates): rates => {
  const result: rates = {};

  Object.keys(data).forEach((key) => {
    result[key] = data[key] * amount;
  });

  return result;
};

export default modifyWithAmount;
