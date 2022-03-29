import BankAPIService from '../../services/BankAPIService';

import { FileSystem } from '../../libs';
import { modifyWithBase } from '../../utills';
import { RATES_CACHE_PATH, DEFAULT_BASE } from '../../constants';

/**
 * This function update rates
 */
const updateRates = async () => {
  const ratesList = await BankAPIService.historical();
  const ratesBase = 'EUR';

  const rates = {};
  let lastRatesDate = null;

  Object.entries(ratesList).forEach(([key, value], index) => {
    if (index === 0) {
      lastRatesDate = key;
    }

    rates[key] = modifyWithBase(DEFAULT_BASE, {
      ...value,
      [ratesBase]: 1,
    });
  });

  const ratesJSON = JSON.stringify({ rates, lastRatesDate });

  await FileSystem.writeFile(RATES_CACHE_PATH, ratesJSON);
};

export default updateRates;
