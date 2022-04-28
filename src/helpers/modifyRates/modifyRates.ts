import {
  RatesListInterface,
  RatesInterface,
} from '../../typescript/interfaces';
import { APIError } from '../../exceptions';
import {
  modifyWithBase,
  modifyWithSymbols,
  modifyWithAmount,
  modifyWithToFixed,
  catchSyncError,
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
    const [error, modifiedWithBase] = catchSyncError<RatesInterface>(
      modifyWithBase,
      base,
      ratesItem
    );

    if (error) {
      throw APIError.invalidBase();
    }

    const modifiedWithSymbols: RatesInterface = modifyWithSymbols(
      symbols,
      modifiedWithBase as RatesInterface
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

    return modifiedWithToFixed;
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
