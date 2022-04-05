import { modifyRates, getRatesList, defineEndpoint } from '../helpers';

import { rates as ratesList, lastRatesDate } from '../cache/rates.json';

export const rates = async (req, res) => {
  const { base, symbols, amount, start_date, end_date } = req.query;
  const { date: reqDate } = req.params;

  const startDate = start_date ? new Date(start_date) : null;
  const endDate = start_date ? new Date(end_date) : null;
  const date = reqDate ? new Date(reqDate) : null;

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
