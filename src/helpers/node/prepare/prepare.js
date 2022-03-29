const fs = require('fs/promises');

const { RATES_CACHE_PATH, RATES_FAKE_VALUE } = require('../../../constants');

const prepare = async () => {
  const fakeRates = RATES_FAKE_VALUE;

  await fs.writeFile(RATES_CACHE_PATH, fakeRates);
};

module.exports = prepare;
