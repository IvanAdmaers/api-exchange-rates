import path from 'path';

export const DEFAULT_BASE: string = 'EUR';
export const RATES_CACHE_FILE: string = 'rates.json';
export const RATES_CACHE_PATH: string = path.resolve(
  `./src/cache/${RATES_CACHE_FILE}`
);
export const RATES_CACHE_UPDATE_TIME_IN_MINUTES: number = 60;
