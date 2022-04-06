import {
  RatesListInterface,
  RatesInterface,
} from '../../typescript/interfaces';

/**
 * This function gets latest rates
 */
const getLatestRates = (
  rates: RatesListInterface,
  date: string
): RatesInterface => rates[date];

export default getLatestRates;
