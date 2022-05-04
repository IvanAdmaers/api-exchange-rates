import { RatesInterface } from '../../typescript/interfaces';
import { hasOwnProperty } from '..';

/**
 * This function modifies rates depending on currency
 */
const modifyWithBase = (
  base: string | undefined | null,
  data: RatesInterface
): RatesInterface => {
  const currentBaseExists: boolean = Boolean(
    base && hasOwnProperty(data, base)
  );

  if (!currentBaseExists) {
    throw new Error('Base is invalid');
  }

  const currentBase: number = data[base!];

  const result: RatesInterface = {};

  Object.entries(data).forEach(([key, value]: [string, number]) => {
    if (key === base) {
      result[key] = 1;

      return;
    }

    result[key] = value / currentBase;
  });

  return result;
};

export default modifyWithBase;
