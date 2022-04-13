import { fs as memFS, vol } from 'memfs';

import { FileSystem } from '../../libs';
import { BankAPIService } from '../../services';
import getRates from '.';
import {
  RATES_CACHE_PATH_TO_FOLDER,
  LAST_RATES_DATE_MEMORY_KEY,
  RATES_CACHE_PATH,
} from '../../constants';

vol.mkdirSync(RATES_CACHE_PATH_TO_FOLDER, { recursive: true });

jest.mock('fs/promises', () => memFS.promises);

const serviceRatesDate = '2022-03-12';
const serviceCachedRates = {
  [serviceRatesDate]: { USD: 1, AUD: 1.5, GBP: 1.3 },
};

jest
  .spyOn(BankAPIService, 'historical')
  .mockReturnValue(Promise.resolve(serviceCachedRates));

jest.spyOn(FileSystem, 'readFile');

describe('getRates', () => {
  afterEach(() => {    
    jest.clearAllMocks();
    vol.reset();
  });

  it('should return rates from cache when the cache file exists', async () => {
    const date = '2022-03-13';
    const cachedRates = {
      [LAST_RATES_DATE_MEMORY_KEY]: [date],
      rates: { [date]: { USD: 1, AUD: 1.5, GBP: 1.3 } },
    };

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
});
