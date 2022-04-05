import { formatDate } from '../../utills';

/**
 * This function gets historical rates
 */
const getHistoricalRates = (rates, date) => {
  const formattedDate = formatDate(date);

  return rates[formattedDate];
};

export default getHistoricalRates;
