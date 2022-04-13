import memory from 'memory-cache-pro';

import { modifyRates, getRatesList, defineEndpoint } from '../helpers';
import { RATES_MEMORY_KEY, LAST_RATES_DATE_MEMORY_KEY } from '../constants';

const ratesList = memory.get(RATES_MEMORY_KEY);
const lastRatesDate = memory.get(LAST_RATES_DATE_MEMORY_KEY);

export const rates = async (req, res) => {

  const {
    base,
    symbols,
    amount,
    start_date: startDate,
    end_date: endDate,
  } = req.query;
  const { date } = req.params;

  const endpoint = defineEndpoint({ date, startDate, endDate });
  const isTimeseries = endpoint === 'timeseries';

  const currentRatesList = getRatesList({
    rates: ratesList,
    lastRatesDate,
    endpoint,
    date,
    startDate,
    endDate,
  });

  const ratesData = !currentRatesList
    ? null
    : modifyRates({
        rates: currentRatesList,
        base,
        symbols,
        amount,
        isTimeseries,
      });

  return res.json({ rates: ratesData, endpoint });
};
