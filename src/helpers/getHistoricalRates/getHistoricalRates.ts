import {
  RatesListInterface,
  RatesInterface,
} from '../../typescript/interfaces';

/**
 * This function gets historical rates
 */
const getHistoricalRates = (
  rates: RatesListInterface,
  date: string
): RatesInterface => rates[date];

export default getHistoricalRates;
