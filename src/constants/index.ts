import path from 'path';

export const DEFAULT_BASE: string = 'USD';
export const RATES_CACHE_FILE: string = 'rates.json';
export const RATES_CACHE_PATH_TO_FOLDER: string = path.resolve(`./src/cache`);
export const RATES_CACHE_PATH: string = path.resolve(
  `${RATES_CACHE_PATH_TO_FOLDER}/${RATES_CACHE_FILE}`
);
export const RATES_CACHE_UPDATE_TIME_IN_MINUTES: number = 60;
export const TO_FIXED_DEFAULT_VALUE: number = 6;
export const RATES_MEMORY_KEY: string = 'rates';
export const LAST_RATES_DATE_MEMORY_KEY: string = 'lastRatesDate';
