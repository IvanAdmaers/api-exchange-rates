import { RatesInterface } from '../../typescript/interfaces';

/**
 * This function multiplies each currency by amount
 */
const modifyWithAmount = (
  amount: number,
  data: RatesInterface
): RatesInterface => {
  const result: RatesInterface = {};

  Object.keys(data).forEach((key) => {
    result[key] = data[key] * amount;
  });

  return result;
};

export default modifyWithAmount;
