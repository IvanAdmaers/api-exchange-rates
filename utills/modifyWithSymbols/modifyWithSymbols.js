/**
 * This function returns an object of currencies by symbols
 *
 * @param {string | null} symbols - Symbols to sort
 * @param {Object} data - Rates data
 * @returns {Object} Modified data
 */
const modifyWithSymbols = (symbols = '', data = {}) => {
  const result = {};
  const symbolsArray = symbols?.split(',');

  if (!symbols || !symbolsArray.length) {
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
