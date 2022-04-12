const path = require('path');

const DEFAULT_BASE = 'USD';
const RATES_CACHE_FILE = 'rates.json';
const RATES_CACHE_PATH_TO_FOLDER = path.resolve(`./src/cache`);
const RATES_CACHE_PATH = path.resolve(
  `${RATES_CACHE_PATH_TO_FOLDER}/${RATES_CACHE_FILE}`
);
const RATES_CACHE_UPDATE_TIME_IN_MINUTES = 60;
const RATES_PLUG = '{}';
const TO_FIXED_DEFAULT_VALUE = 6;
const RATES_MEMORY_KEY = 'rates';
const LAST_RATES_DATE_MEMORY_KEY = 'lastRatesDate';

module.exports = {
  DEFAULT_BASE,
  RATES_CACHE_FILE,
  RATES_CACHE_PATH_TO_FOLDER,
  RATES_CACHE_PATH,
  RATES_CACHE_UPDATE_TIME_IN_MINUTES,
  RATES_PLUG,
  TO_FIXED_DEFAULT_VALUE,
  RATES_MEMORY_KEY,
  LAST_RATES_DATE_MEMORY_KEY,
};
