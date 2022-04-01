import {
  modifyWithBase,
  modifyWithSymbols,
  modifyWithAmount,
  modifyWithToFixed,
  sortObjectAlphabetically,
} from '../../utills';

import { TO_FIXED_DEFAULT_VALUE } from '../../constants';

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

    const modifiedWithToFixed = modifyWithToFixed(
      modifiedWithAmount,
      TO_FIXED_DEFAULT_VALUE
    );

    const sortedByAlphabetically = sortObjectAlphabetically(modifiedWithToFixed);

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
