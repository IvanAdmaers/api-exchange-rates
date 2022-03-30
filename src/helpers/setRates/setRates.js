import BankAPIService from '../../services/BankAPIService';

import { FileSystem } from '../../libs';
import { modifyWithBase, toFixed } from '../../utills';
import { RATES_CACHE_PATH, DEFAULT_BASE } from '../../constants';

/**
 * This function update rates
 */
const setRates = async () => {
  const ratesList = await BankAPIService.historical();
  const ratesBase = 'EUR';

  const rates = {};
  let lastRatesDate = null;

  Object.entries(ratesList).forEach(([key, value], index) => {
    if (index === 0) {
      lastRatesDate = key;
    }

    const modifiedWithBase = modifyWithBase(DEFAULT_BASE, {
      ...value,
      [ratesBase]: 1,
    });

    const ratesWithFixedValues = {};
    const fixDigits = 6;

    Object.entries(modifiedWithBase).forEach(([rateKey, rateValue]) => {
      ratesWithFixedValues[rateKey] = toFixed(rateValue, fixDigits);
    });

    rates[key] = ratesWithFixedValues;
  });

  const ratesJSON = JSON.stringify({ rates, lastRatesDate });

  await FileSystem.writeFile(RATES_CACHE_PATH, ratesJSON);
};

export default setRates;
