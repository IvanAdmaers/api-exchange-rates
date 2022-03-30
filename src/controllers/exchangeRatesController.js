import {
  formatDate,
  getDatesInRange,
} from '../utills';

import { modifyRates } from '../helpers';

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

const getLatestRates = () => ratesList[lastRatesDate];
const getHistoricalRates = (date) => ratesList[date];
const getTimeseriesRates = (startDate, endDate) => {
  const result = {};

  const dates = getDatesInRange(startDate, endDate);
  const dateList = dates.map((itemDate) => formatDate(itemDate));

  dateList.forEach((itemDate) => {
    const dateData = ratesList[itemDate];

    if (!dateData) {
      return;
    }

    result[itemDate] = dateData;
  });

  return result;
};

const getRatesList = ({ endpoint, date, startDate, endDate }) => {
  switch (endpoint) {
    case 'latest':
      return getLatestRates();

    case 'historical':
      return getHistoricalRates(date);

    case 'timeseries':
      return getTimeseriesRates(startDate, endDate);

    default:
      throw new Error('Endpoint is unknown');
  }
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
