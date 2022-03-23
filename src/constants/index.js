import path from 'path';

export const defaultBase = 'EUR';
export const RATES_CACHE_FILE = 'rates.json';
export const RATES_CACHE_PATH = path.resolve(`./src/cache/${RATES_CACHE_FILE}`);
export const RATES_CACHE_UPDATE_TIME_IN_MINUTES = 60;
