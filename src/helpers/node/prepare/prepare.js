const fs = require('fs/promises');

const { RATES_CACHE_PATH, RATES_PLUG } = require('../../../constants');

const prepare = async () => {
  const ratesPlug = RATES_PLUG;

  await fs.writeFile(RATES_CACHE_PATH, ratesPlug);
};

module.exports = prepare;
