import cache from 'memory-cache-pro';

import BankAPIService from '../../services/BankAPIService';

import { FileSystem } from '../../libs';
import { modifyWithBase } from '../../utills';
import {
  RATES_CACHE_PATH,
  DEFAULT_BASE,
  LATEST_RATES_DATE_CACHE_KEY,
} from '../../constants';

/**
 * This function update rates
 */
const updateRates = async () => {
  const ratesList = await BankAPIService.historical();
  const ratesBase = 'EUR';

  const rates = {};

  Object.entries(ratesList).forEach(([key, value], index) => {
    if (index === 0) {
      cache.put(LATEST_RATES_DATE_CACHE_KEY, key);
    }

    rates[key] = modifyWithBase(DEFAULT_BASE, { ...value, [ratesBase]: 1 });
  });

  const ratesJSON = JSON.stringify(rates);

  await FileSystem.writeFile(RATES_CACHE_PATH, ratesJSON);
};

export default updateRates;
