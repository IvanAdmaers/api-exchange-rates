import {
  modifyWithBase,
  sortObjectAlphabetically,
  modifyWithSymbols,
  modifyWithAmount,
} from '../utills';

import ratesList from '../cache/rates.json';

const latestDateKey = Object.keys(ratesList)[0];

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

const getDatesInRange = (start, end) => {
  const startDate = new Date(start);
  const endDate = new Date(end);

  const date = new Date(startDate.getTime());

  const dates = [];

  while (date <= endDate) {
    dates.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }

  return dates;
};

const formatDate = (date) => {
  const currentDate = new Date(date);

  let month = (currentDate.getMonth() + 1).toString();
  let day = date.getDate().toString();
  const year = currentDate.getFullYear();

  if (month.length < 2) {
    month = `0${month}`;
  }

  if (day.length < 2) {
    day = `0${day}`;
  }

  return [year, month, day].join('-');
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

const getRates = ({ base, symbols, amount, date, startDate, endDate }) => {
  const isTimeseries = startDate && endDate;

  const rates = getRatesList({ date, startDate, endDate, isTimeseries });

  const ratesData = !rates
    ? null
    : compose({ rates, base, symbols, amount, isTimeseries });

  return ratesData;
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

  const ratesData = getRates({
    base,
    symbols,
    amount,
    date,
    startDate,
    endDate,
  });

  return res.json({ rates: ratesData });
};
