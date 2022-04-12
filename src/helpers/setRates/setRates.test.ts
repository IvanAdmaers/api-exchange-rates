import memory from 'memory-cache-pro';
import {
  RatesListInterface,
  RatesInterface,
} from '../../typescript/interfaces';
import { BankAPIService } from '../../services';
import { modifyWithBase, modifyWithToFixed } from '../../utills';
import setRates from '.';
import {
  DEFAULT_BASE,
  TO_FIXED_DEFAULT_VALUE,
  RATES_MEMORY_KEY,
  LAST_RATES_DATE_MEMORY_KEY,
} from '../../constants';

const date: string = '2022-04-08';
const rates: RatesListInterface = {
  [date]: { AUD: 1.455, CAD: 1.367, EUR: 1, GBP: 0.833, USD: 1.086 },
};

jest
  .spyOn(BankAPIService, 'historical')
  .mockReturnValue(Promise.resolve(rates));

describe('setRates', () => {
  it('should put rates and a last rates date to the memory', async () => {
    await setRates();

    const expectRates: RatesListInterface = {};

    Object.entries(rates).forEach(([key, value]: [string, RatesInterface]) => {
      const modifiedWithBase: RatesInterface = modifyWithBase(
        DEFAULT_BASE,
        value
      );
      const modifiedWithToFixed: RatesInterface = modifyWithToFixed(
        modifiedWithBase,
        TO_FIXED_DEFAULT_VALUE
      );

      expectRates[key] = modifiedWithToFixed;
    });

    expect(memory.get(RATES_MEMORY_KEY)).toEqual(expectRates);
    expect(memory.get(LAST_RATES_DATE_MEMORY_KEY)).toEqual(date);
  });
});
