import {
  RatesListInterface,
  RatesInterface,
} from '../../typescript/interfaces';
import { getDatesInRange, formatDate } from '../../utills';

/**
 * This function gets timeseries rates
 */
const getTimeseriesRates = (
  rates: RatesListInterface,
  startDate: Date,
  endDate: Date,
  { maxDatesLength }: { maxDatesLength?: number } = {}
): RatesListInterface => {
  const result: RatesListInterface = {};

  const dates: Array<Date> = getDatesInRange(startDate, endDate);

  if (maxDatesLength && dates.length - 1 > maxDatesLength) {
    throw new Error('Dates length is bigger than maxDatesLength');
  }

  const dateList: Array<string> = dates.map((itemDate) =>
    formatDate(itemDate.toDateString())
  );

  dateList.forEach((itemDate: string) => {
    const dateData: RatesInterface = rates[itemDate];

    if (!dateData) {
      return;
    }

    result[itemDate] = dateData;
  });

  return result;
};

export default getTimeseriesRates;
