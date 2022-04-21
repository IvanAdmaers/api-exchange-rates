import { RatesListInterface } from '../../typescript/interfaces';
import { FileSystem } from '../../libs';
import { BankAPIService } from '../../services';
import { RATES_CACHE_PATH } from '../../constants';

const getRatesFromService = async (): Promise<RatesListInterface> => {
  const ratesList: RatesListInterface = await BankAPIService.historical();

  return ratesList;
};

/**
 * This function gets rates from service by default
 * If the `setRatesFromCache` is passed its trying to get rates from cache
 * If cache doesn't exist it gets rates from service
 */
const getRates = async ({
  setRatesFromCache,
}: { setRatesFromCache?: boolean } = {}): Promise<RatesListInterface> => {
  if (!setRatesFromCache) {
    const ratesList: RatesListInterface = await getRatesFromService();

    return ratesList;
  }

  const cacheExists: boolean = await FileSystem.fileExists(RATES_CACHE_PATH);

  if (!cacheExists) {
    const ratesList: RatesListInterface = await getRatesFromService();

    return ratesList;
  }

  const cachedRates = await FileSystem.readFile(RATES_CACHE_PATH);
  const rates = JSON.parse(cachedRates.toString());

  return rates;
};

export default getRates;
