import { getDatesInRange, formatDate } from '../../utills';

/**
 * This function gets timeseries rates
 */
const getTimeseriesRates = (rates, startDate, endDate) => {
  const result = {};

  const dates = getDatesInRange(startDate, endDate);
  const dateList = dates.map((itemDate) => formatDate(itemDate));

  dateList.forEach((itemDate) => {
    const dateData = rates[itemDate];

    if (!dateData) {
      return;
    }

    result[itemDate] = dateData;
  });

  return result;
};

export default getTimeseriesRates;
