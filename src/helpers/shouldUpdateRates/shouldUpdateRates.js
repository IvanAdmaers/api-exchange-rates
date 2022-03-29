import { FileSystem } from '../../libs';

import {
  RATES_CACHE_PATH,
  RATES_CACHE_UPDATE_TIME_IN_MINUTES,
  RATES_FAKE_VALUE,
} from '../../constants';

/**
 * This function checks should update rates data
 * @returns {<Promise>boolean} True if yes
 */
const shouldUpdateRates = async () => {
  const ratesCacheExists = await FileSystem.fileExists(RATES_CACHE_PATH);

  if (!ratesCacheExists) {
    return true;
  }

  const ratesMeta = await FileSystem.getFileMeta(RATES_CACHE_PATH);

  if (ratesMeta.size === Buffer.byteLength(RATES_FAKE_VALUE)) {
    return true;
  }

  const difference = Date.now() - ratesMeta.mtimeMs;
  const minutes = Math.round(difference / 60000);

  if (minutes > RATES_CACHE_UPDATE_TIME_IN_MINUTES) {
    return true;
  }

  return false;
};

export default shouldUpdateRates;
