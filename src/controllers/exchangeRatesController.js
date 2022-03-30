import { modifyRates, getRatesList } from '../helpers';

import { rates as ratesList, lastRatesDate } from '../cache/rates.json';

const defineEndpoint = ({ startDate, endDate, date }) => {
  if (startDate && endDate) {
    return 'timeseries';
  }

  if (date) {
    return 'historical';
  }

  return 'latest';
};

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
