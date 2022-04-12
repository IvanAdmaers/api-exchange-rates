import cache from 'memory-cache-pro';
import {
  RatesListInterface,
  RatesInterface,
} from '../../typescript/interfaces';
import { BankAPIService } from '../../services';
import { modifyWithBase, modifyWithToFixed } from '../../utills';
import {
  DEFAULT_BASE,
  TO_FIXED_DEFAULT_VALUE,
  RATES_MEMORY_KEY,
  LAST_RATES_DATE_MEMORY_KEY,
} from '../../constants';

/**
 * This function update rates
 */
const setRates = async (): Promise<void> => {
  // TODO: add the type `RatesListInterface` below
  const ratesList: object = await BankAPIService.historical();
  const ratesBase: string = BankAPIService.getBase();

  const rates: RatesListInterface = {};
  let lastRatesDate: string | null = null;

  Object.entries(ratesList).forEach(
    ([key, value]: [string, RatesInterface], index: number) => {
      if (index === 0) {
        lastRatesDate = key;
      }

      const modifiedWithBase: RatesInterface = modifyWithBase(DEFAULT_BASE, {
        ...value,
        [ratesBase]: 1,
      });

      const modifiedWithToFixed: RatesInterface = modifyWithToFixed(
        modifiedWithBase,
        TO_FIXED_DEFAULT_VALUE
      );

      rates[key] = modifiedWithToFixed;
    }
  );

  cache.put(RATES_MEMORY_KEY, rates);
  cache.put(LAST_RATES_DATE_MEMORY_KEY, lastRatesDate);
};

export default setRates;
