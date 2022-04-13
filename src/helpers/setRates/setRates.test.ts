import memory from 'memory-cache-pro';
import { fs as memFS, vol } from 'memfs';
import {
  RatesListInterface,
  RatesInterface,
} from '../../typescript/interfaces';
import { FileSystem } from '../../libs';
import { modifyWithBase, modifyWithToFixed } from '../../utills';
import setRates from '.';
import { getRates } from '..';
import {
  DEFAULT_BASE,
  TO_FIXED_DEFAULT_VALUE,
  RATES_MEMORY_KEY,
  LAST_RATES_DATE_MEMORY_KEY,
  RATES_CACHE_UPDATE_TIME_IN_MINUTES,
  RATES_CACHE_PATH_TO_FOLDER,
  RATES_CACHE_PATH,
} from '../../constants';

const cacheTimeInMilliseconds: number =
  RATES_CACHE_UPDATE_TIME_IN_MINUTES * 60_000;

const date: string = '2022-04-08';
const rates: RatesListInterface = {
  [date]: { AUD: 1.455, CAD: 1.367, EUR: 1, GBP: 0.833, USD: 1.086 },
};

jest
  .spyOn(jest.requireActual('..'), 'getRates')
  .mockReturnValue(Promise.resolve(rates));

jest.mock('fs/promises', () => memFS.promises);

describe('setRates', () => {
  beforeEach(async () => {
    await vol.promises.mkdir(RATES_CACHE_PATH_TO_FOLDER, { recursive: true });
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
    vol.reset();
  });

  const getModifiedRates = (): RatesListInterface => {
    const result: RatesListInterface = {};

    Object.entries(rates).forEach(([key, value]: [string, RatesInterface]) => {
      const modifiedWithBase: RatesInterface = modifyWithBase(
        DEFAULT_BASE,
        value
      );
      const modifiedWithToFixed: RatesInterface = modifyWithToFixed(
        modifiedWithBase,
        TO_FIXED_DEFAULT_VALUE
      );

      result[key] = modifiedWithToFixed;
    });

    return result;
  };

  const expectRates: RatesListInterface = getModifiedRates();

  it('should put rates and a last rates date to the memory', async () => {
    await setRates();

    expect(memory.get(RATES_MEMORY_KEY)).toEqual(expectRates);
    expect(memory.get(LAST_RATES_DATE_MEMORY_KEY)).toEqual(date);
  });

  it('should call a callback after the expiration of rates', async () => {
    const onRatesExpiredCallbackMock = jest.fn();

    await setRates({ onRatesExpiredCallback: onRatesExpiredCallbackMock });

    expect(onRatesExpiredCallbackMock).toBeCalledTimes(0);

    jest.advanceTimersByTime(cacheTimeInMilliseconds);

    expect(onRatesExpiredCallbackMock).toBeCalledTimes(1);
  });

  it('should not call a callback before the expiration of rates', async () => {
    const onRatesExpiredCallbackMock = jest.fn();

    await setRates({ onRatesExpiredCallback: onRatesExpiredCallbackMock });

    expect(onRatesExpiredCallbackMock).toBeCalledTimes(0);

    jest.advanceTimersByTime(cacheTimeInMilliseconds - 1);

    expect(onRatesExpiredCallbackMock).toBeCalledTimes(0);
  });

  it('should call getRates with `setRatesFromCache` = false', async () => {
    await setRates();
    expect(getRates).toHaveBeenCalledWith({ setRatesFromCache: false });
  });

  it('should call getRates with `setRatesFromCache` = true', async () => {
    await setRates({ setRatesFromCache: true });
    expect(getRates).toHaveBeenCalledWith({ setRatesFromCache: true });
  });

  it('should do cache of rates when `doCacheRates` = true', async () => {
    await setRates({ doCacheRates: true });

    const ratesCacheBuffer = await FileSystem.readFile(RATES_CACHE_PATH);
    const ratesCacheJSON = ratesCacheBuffer.toString();
    const ratesCache = JSON.parse(ratesCacheJSON);

    expect(ratesCache).toEqual(expectRates);
  });

  it('should not do cache of rates when `doCacheRates` = false', async () => {
    await setRates({ doCacheRates: false });

    const fileExists = await FileSystem.fileExists(RATES_CACHE_PATH);

    expect(fileExists).toBe(false);
  });
});
