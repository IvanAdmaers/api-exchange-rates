const path = require('path');

const DEFAULT_BASE = 'USD';
const RATES_CACHE_FILE = 'rates.json';
const RATES_CACHE_PATH = path.resolve(`./src/cache/${RATES_CACHE_FILE}`);
const RATES_CACHE_UPDATE_TIME_IN_MINUTES = 60;
const RATES_FAKE_VALUE = '{}';

module.exports = {
  DEFAULT_BASE,
  RATES_CACHE_FILE,
  RATES_CACHE_PATH,
  RATES_CACHE_UPDATE_TIME_IN_MINUTES,
  RATES_FAKE_VALUE,
};
