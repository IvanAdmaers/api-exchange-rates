import cron from '.';
import { setRates } from '../../helpers';
import { RATES_CACHE_UPDATE_TIME_IN_MINUTES } from '../../constants';

jest.mock('../../helpers', () => ({ setRates: jest.fn() }));

const ratesUpdateTimeInMilliseconds =
  RATES_CACHE_UPDATE_TIME_IN_MINUTES * 60_000;

describe('cron', () => {
  beforeEach(() => {
    jest.useFakeTimers().setSystemTime(new Date(2022, 3, 11, 0, 0, 0, 0));
  });

  afterEach(() => {
    jest.clearAllMocks();
    jest.clearAllTimers();
  });

  it(`should not trigger setRates before ${RATES_CACHE_UPDATE_TIME_IN_MINUTES} minutes`, () => {
    cron();

    jest.advanceTimersByTime(ratesUpdateTimeInMilliseconds - 1);

    expect(setRates).not.toBeCalled();
  });

  it(`should trigger setRates in ${RATES_CACHE_UPDATE_TIME_IN_MINUTES} minutes`, () => {
    cron();

    jest.advanceTimersByTime(ratesUpdateTimeInMilliseconds);

    expect(setRates).toBeCalledTimes(1);
  });

  it(`should trigger setRates in ${RATES_CACHE_UPDATE_TIME_IN_MINUTES} minutes and then again in ${RATES_CACHE_UPDATE_TIME_IN_MINUTES} minutes`, () => {
    cron();

    jest.advanceTimersByTime(ratesUpdateTimeInMilliseconds);

    expect(setRates).toBeCalledTimes(1);

    jest.advanceTimersByTime(ratesUpdateTimeInMilliseconds);

    expect(setRates).toBeCalledTimes(2);
  });
});
