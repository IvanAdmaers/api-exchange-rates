import { ratesType } from '../../typescript/types';

/**
 * This function returns an object of currencies by symbols
 */
const modifyWithSymbols = (
  symbols: string | undefined | null,
  data: ratesType
) => {
  const result: ratesType = {};
  const symbolsArray: string[] | undefined = symbols?.split(',');

  if (!symbols || !symbolsArray?.length) {
    return { ...data };
  }

  symbolsArray.forEach((symbol) => {
    if (!data[symbol]) {
      return;
    }

    result[symbol] = data[symbol];
  });

  if (!Object.keys(result).length) {
    return { ...data };
  }

  return result;
};

export default modifyWithSymbols;
