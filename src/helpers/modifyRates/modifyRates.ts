import {
  RatesListInterface,
  RatesInterface,
} from '../../typescript/interfaces';
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
const modifyRates = ({
  rates,
  base,
  symbols,
  amount,
  isTimeseries,
}: {
  rates: RatesListInterface | RatesInterface;
  base?: string;
  symbols?: string;
  amount?: number;
  isTimeseries?: boolean;
}) => {
  const doModify = (ratesItem: RatesInterface) => {
    const modifiedWithBase: RatesInterface = modifyWithBase(base, ratesItem);

    const modifiedWithSymbols: RatesInterface = modifyWithSymbols(
      symbols,
      modifiedWithBase
    );

    const paramAmount: number = amount ? +amount : 1;

    const modifiedWithAmount: RatesInterface = modifyWithAmount(
      paramAmount,
      modifiedWithSymbols
    );

    const modifiedWithToFixed: RatesInterface = modifyWithToFixed(
      modifiedWithAmount,
      TO_FIXED_DEFAULT_VALUE
    );

    const sortedByAlphabetically: object =
      sortObjectAlphabetically(modifiedWithToFixed);

    return sortedByAlphabetically as RatesInterface;
  };

  if (!isTimeseries) {
    return doModify(rates as RatesInterface);
  }

  const result: RatesListInterface = {};
  const entries: Array<object> = Object.entries(rates);

  entries.forEach(([date, value]: [string, RatesInterface]) => {
    const composed: RatesInterface = doModify(value);

    result[date] = composed;
  });

  return result;
};

export default modifyRates;