import memory from 'memory-cache-pro';
import {
  RatesListInterface,
  RatesInterface,
} from '../../typescript/interfaces';
import { BankAPIService } from '../../services';
import { FileSystem } from '../../libs';
import { getRates } from '..';
import { modifyWithBase, modifyWithToFixed } from '../../utills';
import {
  DEFAULT_BASE,
  TO_FIXED_DEFAULT_VALUE,
  RATES_MEMORY_KEY,
  LAST_RATES_DATE_MEMORY_KEY,
  RATES_CACHE_UPDATE_TIME_IN_MINUTES,
  RATES_CACHE_PATH,
} from '../../constants';

/**
 * This function update rates
 */
const setRates = async ({
  onRatesExpiredCallback = setRates,
  doCacheRates,
  setRatesFromCache,
}: {
  onRatesExpiredCallback?: Function;
  doCacheRates?: boolean;
  setRatesFromCache?: boolean;
} = {}): Promise<void> => {
  // TODO: add the type `RatesListInterface` below
  const ratesList = await getRates({ setRatesFromCache });
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

  const cacheTimeInMilliseconds = RATES_CACHE_UPDATE_TIME_IN_MINUTES * 60_000;

  if (doCacheRates) {
    await FileSystem.writeFile(RATES_CACHE_PATH, JSON.stringify(rates));
  }

  memory.put(
    RATES_MEMORY_KEY,
    rates,
    cacheTimeInMilliseconds,
    onRatesExpiredCallback
  );
  memory.put(LAST_RATES_DATE_MEMORY_KEY, lastRatesDate);
};

export default setRates;
