import {
  RatesListInterface,
  RatesInterface,
} from '../../typescript/interfaces';
import getHistoricalRates from '.';

const date = '2022-04-06';

const rates: RatesListInterface = {
  [date]: {
    AUD: 1.331,
    CAD: 1.249,
    EUR: 0.908,
    GBP: 0.762,
    USD: 1,
  },
};

describe('getHistoricalRates', () => {
  it('should return a correct result', () => {
    const output: RatesInterface = { ...rates[date] };

    expect(getHistoricalRates(rates, date)).toEqual(output);
  });
});
