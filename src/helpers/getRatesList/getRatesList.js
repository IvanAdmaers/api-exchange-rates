import { getLatestRates, getHistoricalRates, getTimeseriesRates } from '..';

/**
 * This function gets rates list
 */
const getRatesList = ({
  rates,
  lastRatesDate,
  endpoint,
  date,
  startDate,
  endDate,
}) => {
  switch (endpoint) {
    case 'latest':
      return getLatestRates(rates, lastRatesDate);

    case 'historical':
      return getHistoricalRates(rates, date);

    case 'timeseries':
      return getTimeseriesRates(rates, startDate, endDate);

    default:
      throw new Error('Endpoint is unknown');
  }
};

export default getRatesList;
