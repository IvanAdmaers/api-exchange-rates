import mock from 'mock-fs';

import shouldUpdateRates from '.';
import {
  RATES_CACHE_PATH_TO_FOLDER,
  RATES_CACHE_FILE,
  RATES_CACHE_UPDATE_TIME_IN_MINUTES,
} from '../../constants';

const content: string =
  '{"rates":{"2022-04-05":{"USD":1,"JPY":122.85532,"BGN":1.783025,"CZK":22.187984,"DKK":6.780746,"GBP":0.761145,"HUF":338.162093,"PLN":4.217796,"RON":4.507065,"SEK":9.352995,"CHF":0.924515,"ISK":129.091075,"NOK":8.697055,"HRK":6.873826,"TRY":14.723311,"AUD":1.31042,"BRL":4.593308,"CAD":1.244143,"CNY":6.361838,"HKD":7.83271,"IDR":14342.939192,"ILS":3.204668,"INR":75.335035,"KRW":1213.246422,"MXN":19.826238,"MYR":4.210502,"NZD":1.427386,"PHP":51.22983,"SGD":1.355365,"THB":33.455192,"ZAR":14.543623,"EUR":0.91166}}}';

describe('shouldUpdateRates', () => {
  afterAll(() => {
    mock.restore();
  });

  it('should return true when there is no a rates cache file', async () => {
    mock({
      [RATES_CACHE_PATH_TO_FOLDER]: {},
    });

    const shouldUpdate: boolean = await shouldUpdateRates();

    expect(shouldUpdate).toBe(true);
  });

  it('should return true when there is a rates cache plug', async () => {
    mock({
      [RATES_CACHE_PATH_TO_FOLDER]: {
        [RATES_CACHE_FILE]: '{}',
      },
    });

    const shouldUpdate: boolean = await shouldUpdateRates();

    expect(shouldUpdate).toBe(true);
  });

  it('should return true when a rates cache file is outdated', async () => {
    const ratesCacheUpdateTimeInMilliseconds: number =
      RATES_CACHE_UPDATE_TIME_IN_MINUTES * 60000;
    const oneMinuteInMilliseconds: number = 1 * 60000;
    const fileLastModification: number =
      Date.now() - ratesCacheUpdateTimeInMilliseconds - oneMinuteInMilliseconds;

    mock({
      [RATES_CACHE_PATH_TO_FOLDER]: {
        [RATES_CACHE_FILE]: mock.file({
          content,
          mtime: fileLastModification,
        }),
      },
    });

    const shouldUpdate: boolean = await shouldUpdateRates();

    expect(shouldUpdate).toBe(true);
  });

  it('should return false when a rates cache file is not outdated', async () => {
    mock({
      [RATES_CACHE_PATH_TO_FOLDER]: {
        [RATES_CACHE_FILE]: mock.file({
          content,
          mtime: Date.now(),
        }),
      },
    });

    const shouldUpdate: boolean = await shouldUpdateRates();

    expect(shouldUpdate).toBe(false);
  });
});
