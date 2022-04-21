import { RatesListInterface } from '../../typescript/interfaces';
import { FileSystem } from '../../libs';
import { BankAPIService } from '../../services';
import { RATES_CACHE_PATH } from '../../constants';

const getRatesFromService = async (): Promise<RatesListInterface> => {
  const ratesList: RatesListInterface = await BankAPIService.historical();

  return ratesList;
};

/**
 * This function gets rates from a service by default
 * If the `setRatesFromCache` is true its trying to get rates from cache
 * If cache doesn't exist it gets rates from a service
 * If the `ratesCacheUpdateTimeInMinutes` is passed and rates cache is actual it returns cached rates. If not it'll return rates from a service
 */
type Params = {
  setRatesFromCache?: boolean;
  ratesCacheUpdateTimeInMinutes?: number | undefined | null;
};

const getRates = async ({
  setRatesFromCache,
  ratesCacheUpdateTimeInMinutes,
}: Params = {}): Promise<RatesListInterface> => {
  if (!setRatesFromCache) {
    const ratesList: RatesListInterface = await getRatesFromService();

    return ratesList;
  }

  const cacheExists: boolean = await FileSystem.fileExists(RATES_CACHE_PATH);

  if (!cacheExists) {
    const ratesList: RatesListInterface = await getRatesFromService();

    return ratesList;
  }

  if (ratesCacheUpdateTimeInMinutes) {
    const ratesMeta = await FileSystem.getFileMeta(RATES_CACHE_PATH);

    const ratesRelevanceTimeInMilliseconds: number =
      ratesCacheUpdateTimeInMinutes * 60 * 1000;
    const difference: number = Date.now() - ratesRelevanceTimeInMilliseconds;

    if (difference >= ratesMeta.mtimeMs) {
      const ratesList: RatesListInterface = await getRatesFromService();

      return ratesList;
    }
  }

  const cachedRates = await FileSystem.readFile(RATES_CACHE_PATH);
  const rates = JSON.parse(cachedRates.toString());

  return rates;
};

export default getRates;
