import memory from 'memory-cache-pro';

import { APIError } from '../exceptions';
import {
  modifyRates,
  getRatesList,
  defineEndpoint,
  getRequestInfo,
} from '../helpers';
import {
  RATES_MEMORY_KEY,
  LAST_RATES_DATE_MEMORY_KEY,
  DEFAULT_BASE,
} from '../constants';

const ratesList = memory.get(RATES_MEMORY_KEY);
const lastRatesDate = memory.get(LAST_RATES_DATE_MEMORY_KEY);

export const rates = async (req, res, next) => {
  const { symbols, start_date: startDate, end_date: endDate } = req.query;
  const base = req.query.base ?? DEFAULT_BASE;
  const amount = +req.query.amount;

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

  if (!currentRatesList) {
    return next(APIError.noResult());
  }

  const ratesData = modifyRates({
    rates: currentRatesList,
    base,
    symbols,
    amount,
    isTimeseries,
  });

  const requestInfo = getRequestInfo({
    endpoint,
    lastRatesDate,
    date,
    startDate,
    endDate,
    symbols,
    amount,
    base,
  });

  return res.json({
    ...requestInfo,
    rates: ratesData,
  });
};
