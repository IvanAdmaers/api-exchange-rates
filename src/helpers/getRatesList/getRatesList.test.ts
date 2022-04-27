import { RatesListInterface } from '../../typescript/interfaces';
import { EndpointObject } from '../../typescript/objects';
import getRatesList from '.';

const { Latest, Historical, Timeseries } = EndpointObject;

const date1: string = '2022-03-30';
const date2: string = '2022-03-31';
const date3: string = '2022-04-01';

const rates: RatesListInterface = {
  [date1]: {
    AUD: 1.331,
    CAD: 1.248,
    EUR: 0.898,
    GBP: 0.76,
    USD: 1,
  },
  [date2]: {
    AUD: 1.335,
    CAD: 1.251,
    EUR: 0.9,
    GBP: 0.762,
    USD: 1,
  },
  [date3]: {
    AUD: 1.329,
    CAD: 1.249,
    EUR: 0.904,
    GBP: 0.761,
    USD: 1,
  },
};

const timeseriesOutput: RatesListInterface = {
  [date2]: { ...rates[date2] },
  [date3]: { ...rates[date3] },
};

jest.mock('../../constants', () => ({
  MAX_TIMESERIES_DATES_LENGTH: 366,
}));

describe('getRatesList', () => {
  it(`should return a correct result for the ${Latest} endpoint`, () => {
    const date: string = date1;

    expect(
      getRatesList({ rates, endpoint: Latest, lastRatesDate: date })
    ).toEqual(rates[date]);
  });

  it(`should return a correct result for the ${Historical} endpoint`, () => {
    const date: string = date2;

    expect(getRatesList({ rates, endpoint: Historical, date })).toEqual(
      rates[date]
    );
  });

  it(`should return a correct result for the ${Timeseries} endpoint`, () => {
    expect(
      getRatesList({
        rates,
        endpoint: Timeseries,
        startDate: date2,
        endDate: date3,
      })
    ).toEqual(timeseriesOutput);
  });

  it(`should throw an error when ${Timeseries} endpoint and start year is bigger than end year`, () => {
    expect(() => {
      getRatesList({
        rates,
        endpoint: Timeseries,
        startDate: '2022-01-01',
        endDate: '2021-01-1',
      });
    }).toThrow();
  });

  it(`should throw an error when ${Timeseries} endpoint and dates length is greater than set in maxDatesLength param`, () => {
    expect(() => {
      getRatesList({
        rates,
        endpoint: Timeseries,
        startDate: '1999-04-27',
        endDate: '2022-04-27',
      });
    }).toThrow();
  });
});
