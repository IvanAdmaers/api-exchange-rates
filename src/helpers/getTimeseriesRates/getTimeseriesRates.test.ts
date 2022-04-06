import { RatesListInterface } from '../../typescript/interfaces';
import getTimeseriesRates from '.';

const startDate: string = '2022-04-04';
const endDate: string = '2022-04-05';

const rates: RatesListInterface = {
  [startDate]: {
    AUD: 1.331,
    CAD: 1.249,
    EUR: 0.908,
    GBP: 0.762,
    USD: 1,
  },
  [endDate]: {
    AUD: 1.33,
    CAD: 1.244,
    EUR: 0.911,
    GBP: 0.761,
    USD: 1,
  },
};

describe('getTimeseriesRates', () => {
  it('should return a correct result', () => {
    expect(
      getTimeseriesRates(rates, new Date(startDate), new Date(endDate))
    ).toEqual(rates);
  });
});
