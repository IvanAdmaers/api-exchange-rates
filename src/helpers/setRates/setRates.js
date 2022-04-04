import BankAPIService from '../../services/BankAPIService';

import FileSystem from '../../libs/FileSystem';
import { modifyWithBase, modifyWithToFixed } from '../../utills';
import {
  RATES_CACHE_PATH,
  DEFAULT_BASE,
  TO_FIXED_DEFAULT_VALUE,
} from '../../constants';

/**
 * This function update rates
 */
const setRates = async () => {
  const ratesList = await BankAPIService.historical();
  const ratesBase = BankAPIService.defaultBase;

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

    const modifiedWithToFixed = modifyWithToFixed(
      modifiedWithBase,
      TO_FIXED_DEFAULT_VALUE
    );

    rates[key] = modifiedWithToFixed;
  });

  const ratesJSON = JSON.stringify({ rates, lastRatesDate });

  await FileSystem.writeFile(RATES_CACHE_PATH, ratesJSON);
};

export default setRates;
