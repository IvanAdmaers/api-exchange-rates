import {
  modifyWithBase,
  modifyWithSymbols,
  modifyWithAmount,
  sortObjectAlphabetically,
} from '../../utills';

/**
 * This function modifies rates. Call order: modifyWithBase => modifyWithSymbols => modifyWithAmount => sortObjectAlphabetically
 */
const modifyRates = ({ rates, base, symbols, amount, isTimeseries }) => {
  const doModify = (ratesItem) => {
    const modifiedWithBase = modifyWithBase(base, ratesItem);

    const modifiedWithSymbols = modifyWithSymbols(symbols, modifiedWithBase);

    const paramAmount = amount ? +amount : 1;

    const modifiedWithAmount = modifyWithAmount(
      paramAmount,
      modifiedWithSymbols
    );

    const sortedByAlphabetically = sortObjectAlphabetically(modifiedWithAmount);

    return sortedByAlphabetically;
  };

  if (!isTimeseries) {
    return doModify(rates);
  }

  const result = {};
  const keys = Object.entries(rates);

  keys.forEach(([date, value]) => {
    const composed = doModify(value);

    result[date] = composed;
  });

  return result;
};

export default modifyRates;
