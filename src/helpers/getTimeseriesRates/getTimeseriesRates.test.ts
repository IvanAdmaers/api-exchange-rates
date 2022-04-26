import { RatesListInterface } from '../../typescript/interfaces';
import getTimeseriesRates from '.';

const startDate: string = '2022-04-04';
const endDate: string = '2022-04-05';
const maxYearDays: number = 366;

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

  it('should not thrown an error if dates length is not bigger than allowed', () => {
    expect(() => {
      getTimeseriesRates(
        rates,
        new Date('1999-01-01'),
        new Date('2000-01-01'),
        {
          maxDatesLength: maxYearDays,
        }
      );
    }).not.toThrow();
  });

  it('should thrown an error if dates length is bigger than allowed', () => {
    expect(() => {
      getTimeseriesRates(
        rates,
        new Date('1999-01-01'),
        new Date('2000-01-03'),
        {
          maxDatesLength: maxYearDays,
        }
      );
    }).toThrow();
  });
});
