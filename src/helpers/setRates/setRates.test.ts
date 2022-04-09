import { vol, fs } from 'memfs';
import {
  RatesListInterface,
  RatesInterface,
} from '../../typescript/interfaces';
import BankAPIService from '../../services/BankAPIService';
import { FileSystem } from '../../libs';
import { modifyWithBase, modifyWithToFixed } from '../../utills';
import setRates from '.';
import {
  RATES_CACHE_PATH_TO_FOLDER,
  RATES_CACHE_PATH,
  LAST_RATES_DATE_KEY,
  DEFAULT_BASE,
  TO_FIXED_DEFAULT_VALUE,
} from '../../constants';

vol.mkdirSync(RATES_CACHE_PATH_TO_FOLDER, { recursive: true });

jest.mock('fs/promises', () => fs.promises);

const date: string = '2022-04-08';
const rates: RatesListInterface = {
  [date]: { AUD: 1.455, CAD: 1.367, EUR: 1, GBP: 0.833, USD: 1.086 },
};

jest
  .spyOn(BankAPIService, 'historical')
  .mockReturnValue(Promise.resolve(rates));

describe('setRates', () => {
  it('should set rates correctly', async () => {
    await setRates();

    const file: Buffer = await FileSystem.readFile(RATES_CACHE_PATH);
    const fileContent: string = file.toString();

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

    const resultJSON: string = JSON.stringify({
      rates: expectRates,
      [LAST_RATES_DATE_KEY]: date,
    });

    expect(fileContent).toBe(resultJSON);
  });
});
