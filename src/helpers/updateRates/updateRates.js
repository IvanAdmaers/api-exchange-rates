import BankAPIService from '../../services/BankAPIService';

import { FileSystem } from '../../libs';
import { RATES_CACHE_PATH } from '../../constants';

/**
 * This function update rates
 */
const updateRates = async () => {
  const rates = await BankAPIService.historical();

  const ratesJSON = JSON.stringify(rates);

  await FileSystem.writeFile(RATES_CACHE_PATH, ratesJSON);
};

export default updateRates;
