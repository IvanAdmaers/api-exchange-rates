import { RatesInterface } from '../../typescript/interfaces';
import { hasOwnProperty } from '..';

/**
 * This function returns an object of currencies by symbols
 */
const modifyWithSymbols = (
  symbols: string | undefined | null,
  data: RatesInterface
) => {
  const result: RatesInterface = {};
  const symbolsArray: string[] | undefined = symbols?.split(',');

  if (!symbols || !symbolsArray?.length) {
    return { ...data };
  }

  symbolsArray.forEach((symbol) => {
    if (!hasOwnProperty(data, symbol)) {
      return;
    }

    result[symbol] = data[symbol];
  });

  return result;
};

export default modifyWithSymbols;
