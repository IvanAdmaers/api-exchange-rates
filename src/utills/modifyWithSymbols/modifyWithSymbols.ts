import { rates } from '../../typescript/types';

/**
 * This function returns an object of currencies by symbols
 *
 * @param {string | null} symbols - Symbols to sort
 * @param {Object} data - Rates data
 * @returns {Object} Modified data
 */
const modifyWithSymbols = (symbols: string | undefined | null, data: rates) => {
  const result: rates = {};
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
