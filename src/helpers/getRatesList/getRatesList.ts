import { RatesListInterface } from '../../typescript/interfaces';
import { EndpointObject } from '../../typescript/objects';
import { APIError } from '../../exceptions';
import getLatestRates from '../getLatestRates';
import getHistoricalRates from '../getHistoricalRates';
import getTimeseriesRates from '../getTimeseriesRates';
import { MAX_TIMESERIES_DATES_LENGTH } from '../../constants';
import { formatDate } from '../../utills';

const { Latest, Historical, Timeseries } = EndpointObject;

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
        throw APIError.dateNotSpecified();
      }

      const formattedDate: string = formatDate(date);

      return getHistoricalRates(rates, formattedDate);
    }

    case Timeseries: {
      if (!startDate || !endDate) {
        throw APIError.invalidDate('StartDate or endDate is not set');
      }

      const start: Date = new Date(startDate);
      const end: Date = new Date(endDate);

      try {
        return getTimeseriesRates(rates, start, end, {
          maxDatesLength: MAX_TIMESERIES_DATES_LENGTH,
        });
      } catch (error) {
        throw APIError.pecifiedTimeFrameIsTooLong();
      }
    }

    default:
      throw new Error('Endpoint is unknown');
  }
};

export default getRatesList;
