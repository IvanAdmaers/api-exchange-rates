import { ratesType } from '../../typescript/types';

/**
 * This function multiplies each currency by amount
 */
const modifyWithAmount = (amount: number, data: ratesType): ratesType => {
  const result: ratesType = {};

  Object.keys(data).forEach((key) => {
    result[key] = data[key] * amount;
  });

  return result;
};

export default modifyWithAmount;
