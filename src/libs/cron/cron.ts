import nodeCron from 'node-cron';

import { setRates } from '../../helpers';

import { RATES_CACHE_UPDATE_TIME_IN_MINUTES } from '../../constants';

/**
 * This function runs cron tasks
 */
const cron = () => {
  nodeCron.schedule(`*/${RATES_CACHE_UPDATE_TIME_IN_MINUTES} * * * *`, () => {
    setRates();
  });
};

export default cron;
