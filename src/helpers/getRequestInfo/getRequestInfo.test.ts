import { EndpointObject } from '../../typescript/objects';
import { DEFAULT_BASE } from '../../constants';
import getRequestInfo from '.';

const { Latest, Historical, Timeseries } = EndpointObject;

const lastRatesDate = '2022-04-23';

describe('getRequestInfo', () => {
  it(`should return a correct result for the ${Latest} endpoint`, () => {
    const base = 'CAD';

    const output = {
      date: lastRatesDate,
      base,
    };

    expect(getRequestInfo({ endpoint: Latest, lastRatesDate, base })).toEqual(
      output
    );
  });

  it(`should return a correct result for the ${Historical} endpoint`, () => {
    const symbols = 'AUD,GBP';

    const output = {
      date: lastRatesDate,
      symbols,
      base: DEFAULT_BASE,
    };

    expect(
      getRequestInfo({ endpoint: Historical, date: lastRatesDate, symbols })
    ).toEqual(output);
  });

  it(`should return a correct result for the ${Timeseries} endpoint`, () => {
    const startDate = '2022-04-22';
    const endDate = '2022-04-23';
    const amount = 999;

    const output = {
      startDate,
      endDate,
      amount,
      base: DEFAULT_BASE,
    };

    expect(
      getRequestInfo({ endpoint: Timeseries, startDate, endDate, amount })
    ).toEqual(output);
  });
});
