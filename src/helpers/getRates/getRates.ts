import { FileSystem } from '../../libs';
import { BankAPIService } from '../../services';
import { RATES_CACHE_PATH } from '../../constants';

/**
 * This function gets rates from service by default
 * If the `setRatesFromCache` is passed its trying to get rates from cache
 * If cache doesn't exist it gets rates from service
 */
const getRates = async ({
  setRatesFromCache,
}: { setRatesFromCache?: boolean } = {}): Promise<object> => {
  const cacheExists: boolean = await FileSystem.fileExists(RATES_CACHE_PATH);

  if (!setRatesFromCache || !cacheExists) {
    const ratesList: object = await BankAPIService.historical();

    return ratesList;
  }

  const cachedRates = await FileSystem.readFile(RATES_CACHE_PATH);
  const rates = JSON.parse(cachedRates.toString());

  return rates;
};

export default getRates;
