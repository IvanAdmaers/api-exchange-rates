import nodeCron from 'node-cron';

import { setRates } from '../../helpers';

import { RATES_CACHE_UPDATE_TIME_IN_MINUTES } from '../../constants';

const ratesUpdateTimeInMinutes = RATES_CACHE_UPDATE_TIME_IN_MINUTES - 1;

/**
 * This function runs cron tasks
 */
const cron = () => {
  nodeCron.schedule(`${ratesUpdateTimeInMinutes} * * * *`, () => {
    setRates();
  });
};

export default cron;
