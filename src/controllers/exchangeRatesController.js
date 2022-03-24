import {
  modifyWithBase,
  sortObjectAlphabetically,
  modifyWithSymbols,
  modifyWithAmount,
  formatDate,
  getDatesInRange,
} from '../utills';

import ratesList from '../cache/rates.json';

const latestDateKey = Object.keys(ratesList)[0];

const defineEndpoint = ({ startDate, endDate, date }) => {
  if (startDate && endDate) {
    return 'timeseries';
  }

  if (date) {
    return 'historical';
  }

  return 'latest';
};

const compose = ({ rates, base, symbols, amount, isTimeseries }) => {
  const doCompose = (ratesItem) => {
    const modifiedWithBase = modifyWithBase(base, ratesItem);

    const modifiedWithSymbols = modifyWithSymbols(symbols, modifiedWithBase);

    const paramAmount = amount ? +amount : 1;

    const modifiedWithAmount = modifyWithAmount(
      paramAmount,
      modifiedWithSymbols
    );

    const sortedByAlphabetically = sortObjectAlphabetically(modifiedWithAmount);

    return sortedByAlphabetically;
  };

  if (!isTimeseries) {
    return doCompose(rates);
  }

  const result = {};
  const keys = Object.entries(rates);

  keys.forEach(([date, value]) => {
    const composed = doCompose(value);

    result[date] = composed;
  });

  return result;
};

const getRatesList = ({ date, startDate, endDate, isTimeseries }) => {
  if (!isTimeseries) {
    const rates = !date ? ratesList[latestDateKey] : ratesList[date];

    return rates;
  }

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
    date,
    startDate,
    endDate,
    isTimeseries,
  });

  const ratesData = !currentRatesList
    ? null
    : compose({ rates: currentRatesList, base, symbols, amount, isTimeseries });

  return res.json({ rates: ratesData, endpoint });
};
