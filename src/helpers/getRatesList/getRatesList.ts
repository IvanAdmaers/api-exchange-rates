import getLatestRates from '../getLatestRates';
import getHistoricalRates from '../getHistoricalRates';
import getTimeseriesRates from '../getTimeseriesRates';

import { formatDate } from '../../utills';

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
    case 'latest': {
      const formattedLastRatesDate = formatDate(lastRatesDate);

      return getLatestRates(rates, formattedLastRatesDate);
    }

    case 'historical': {
      const formattedDate = formatDate(date);

      return getHistoricalRates(rates, formattedDate);
    }

    case 'timeseries':
      return getTimeseriesRates(rates, startDate, endDate);

    default:
      throw new Error('Endpoint is unknown');
  }
};

export default getRatesList;
