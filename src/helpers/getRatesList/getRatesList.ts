import { RatesListInterface } from '../../typescript/interfaces';
import { Endpoint } from '../../typescript/objects';

import getLatestRates from '../getLatestRates';
import getHistoricalRates from '../getHistoricalRates';
import getTimeseriesRates from '../getTimeseriesRates';

import { formatDate } from '../../utills';

const { Latest, Historical, Timeseries } = Endpoint;

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
}: {
  rates: RatesListInterface;
  lastRatesDate?: string;
  endpoint: string;
  date?: string;
  startDate?: string;
  endDate?: string;
}) => {
  switch (endpoint) {
    case Latest: {
      if (!lastRatesDate) {
        throw new Error('lastRatesDate is not set');
      }

      const formattedLastRatesDate: string = formatDate(lastRatesDate);

      return getLatestRates(rates, formattedLastRatesDate);
    }

    case Historical: {
      if (!date) {
        throw new Error('date is not set');
      }

      const formattedDate: string = formatDate(date);

      return getHistoricalRates(rates, formattedDate);
    }

    case Timeseries:
      if (!startDate || !endDate) {
        throw new Error('startDate or endDate is not set');
      }

      return getTimeseriesRates(rates, new Date(startDate), new Date(endDate));

    default:
      throw new Error('Endpoint is unknown');
  }
};

export default getRatesList;
