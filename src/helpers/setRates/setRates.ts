import memory from 'memory-cache-pro';
import {
  RatesListInterface,
  RatesInterface,
} from '../../typescript/interfaces';
import { BankAPIService } from '../../services';
import { FileSystem } from '../../libs';
import { getRates } from '..';
import { modifyWithBase, modifyWithToFixed, sortObjectAlphabetically } from '../../utills';
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
  doCacheRates = false,
  setRatesFromCache = false,
  ratesCacheUpdateTimeInMinutes = null,
}: {
  onRatesExpiredCallback?: Function;
  doCacheRates?: boolean;
  setRatesFromCache?: boolean;
  ratesCacheUpdateTimeInMinutes?: number | undefined | null;
} = {}): Promise<void> => {
  const ratesList: RatesListInterface = await getRates({
    setRatesFromCache,
    ratesCacheUpdateTimeInMinutes,
  });
  const ratesBase: string = BankAPIService.getBase();

  const rates: RatesListInterface = {};
  let lastRatesDate: string | null = null;

  Object.entries(ratesList).forEach(
    ([key, value]: [string, RatesInterface], index: number) => {
      if (index === 0) {
        lastRatesDate = key;
      }

      const modifiedWithBase: RatesInterface = modifyWithBase(DEFAULT_BASE, {
        [ratesBase]: 1,
        ...value,
      });

      const modifiedWithToFixed: RatesInterface = modifyWithToFixed(
        modifiedWithBase,
        TO_FIXED_DEFAULT_VALUE
      );

      const sortedAlphabetically = sortObjectAlphabetically(modifiedWithToFixed);

      rates[key] = sortedAlphabetically as RatesInterface;
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
