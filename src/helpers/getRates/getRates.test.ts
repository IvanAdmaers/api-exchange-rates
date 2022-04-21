import { fs as memFS, vol } from 'memfs';

import { FileSystem } from '../../libs';
import { BankAPIService } from '../../services';
import getRates from '.';
import {
  RATES_CACHE_PATH_TO_FOLDER,
  LAST_RATES_DATE_MEMORY_KEY,
  RATES_CACHE_PATH,
} from '../../constants';

jest.mock('fs/promises', () => memFS.promises);

const serviceRatesDate = '2022-03-12';
const serviceCachedRates = {
  [serviceRatesDate]: { USD: 1, AUD: 1.344, CAD: 1.263, GBP: 0.768, EUR: 0.92 },
};

jest
  .spyOn(BankAPIService, 'historical')
  .mockReturnValue(Promise.resolve(serviceCachedRates));

jest.spyOn(FileSystem, 'readFile');

const ratesCacheUpdateTimeInMinutes: number = 60;
const cachedRatesRelevanceTimeInMilliseconds: number =
  ratesCacheUpdateTimeInMinutes * 60 * 1000;

const date = '2022-03-11';
const cachedRates = {
  [LAST_RATES_DATE_MEMORY_KEY]: [date],
  rates: {
    [date]: { USD: 1, AUD: 1.344, CAD: 1.26, GBP: 0.767, EUR: 0.92 },
  },
};

describe('getRates', () => {
  afterEach(() => {
    jest.clearAllMocks();
    vol.reset();
  });

  beforeEach(() => {
    vol.mkdirSync(RATES_CACHE_PATH_TO_FOLDER, { recursive: true });
  });

  it('should return rates from cache when the cache file exists', async () => {
    await FileSystem.writeFile(RATES_CACHE_PATH, JSON.stringify(cachedRates));

    const rates = await getRates({ setRatesFromCache: true });

    expect(BankAPIService.historical).toBeCalledTimes(0);
    expect(FileSystem.readFile).toBeCalledTimes(1);
    expect(rates).toEqual(cachedRates);
  });

  it('should return rates from service when the cache file does not exist', async () => {
    const rates = await getRates({ setRatesFromCache: true });

    expect(FileSystem.readFile).toBeCalledTimes(0);
    expect(BankAPIService.historical).toBeCalledTimes(1);
    expect(rates).toEqual(serviceCachedRates);
  });

  it('should return rates from service', async () => {
    const rates = await getRates();

    expect(FileSystem.readFile).toBeCalledTimes(0);
    expect(BankAPIService.historical).toBeCalledTimes(1);
    expect(rates).toEqual(serviceCachedRates);
  });

  it('should return rates from cache when the cache file exists and actual', async () => {
    await FileSystem.writeFile(RATES_CACHE_PATH, JSON.stringify(cachedRates));

    const rates = await getRates({ setRatesFromCache: true, ratesCacheUpdateTimeInMinutes });

    expect(BankAPIService.historical).toBeCalledTimes(0);
    expect(FileSystem.readFile).toBeCalledTimes(1);
    expect(rates).toEqual(cachedRates);
  });

  it('should return rates from a service when the cache file exists but not actual', async () => {
    const actualCachedRatesRelevanceTimeDate: Date = new Date(
      Date.now() - cachedRatesRelevanceTimeInMilliseconds
    );

    await FileSystem.writeFile(RATES_CACHE_PATH, JSON.stringify(cachedRates));
    await FileSystem.utimes(
      RATES_CACHE_PATH,
      actualCachedRatesRelevanceTimeDate,
      actualCachedRatesRelevanceTimeDate
    );

    const rates = await getRates({ setRatesFromCache: true, ratesCacheUpdateTimeInMinutes });

    expect(FileSystem.readFile).toBeCalledTimes(0);
    expect(BankAPIService.historical).toBeCalledTimes(1);
    expect(rates).toEqual(serviceCachedRates);
  });
});
