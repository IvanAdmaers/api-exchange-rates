import FileSystem from '../../libs/FileSystem';

import {
  RATES_CACHE_PATH,
  RATES_CACHE_UPDATE_TIME_IN_MINUTES,
  RATES_PLUG,
} from '../../constants';

/**
 * This function checks should update rates data
 */
const shouldUpdateRates = async () => {
  const ratesCacheExists = await FileSystem.fileExists(RATES_CACHE_PATH);

  if (!ratesCacheExists) {
    return true;
  }

  const ratesMeta = await FileSystem.getFileMeta(RATES_CACHE_PATH);

  if (ratesMeta.size === Buffer.byteLength(RATES_PLUG)) {
    return true;
  }

  const difference = Date.now() - ratesMeta.mtimeMs;
  const minutes = Math.round(difference / 60000);

  if (minutes >= RATES_CACHE_UPDATE_TIME_IN_MINUTES) {
    return true;
  }

  return false;
};

export default shouldUpdateRates;
