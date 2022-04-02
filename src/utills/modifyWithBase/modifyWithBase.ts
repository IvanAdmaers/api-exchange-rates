import { ratesType } from '../../typescript/types';

/**
 * This function modifies rates depending on currency
 */
const modifyWithBase = (
  base: string | undefined | null,
  data: ratesType
): ratesType => {
  const currentBaseExists: boolean = Boolean(base && base in data);

  if (!currentBaseExists) {
    return { ...data };
  }

  const currentBase: number = data[base!];

  const result: ratesType = {};

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
