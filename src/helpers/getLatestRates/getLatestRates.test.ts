import {
  RatesListInterface,
  RatesInterface,
} from '../../typescript/interfaces';
import getLatestRates from '.';

const date = '2022-04-05';

const rates: RatesListInterface = {
  [date]: {
    AUD: 1.33,
    CAD: 1.244,
    EUR: 0.911,
    GBP: 0.761,
    USD: 1,
  },
};

describe('getLatestRates', () => {
  it('should return a correct result', () => {
    const output: RatesInterface = { ...rates[date] };

    expect(getLatestRates(rates, date)).toEqual(output);
  });
});
