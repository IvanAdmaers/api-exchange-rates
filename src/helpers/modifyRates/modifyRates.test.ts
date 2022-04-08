import {
  RatesListInterface,
  RatesInterface,
} from '../../typescript/interfaces';
import modifyRates from '.';
import {
  modifyWithToFixed,
  modifyWithBase,
  modifyWithSymbols,
  modifyWithAmount,
} from '../../utills';
import { TO_FIXED_DEFAULT_VALUE, DEFAULT_BASE } from '../../constants';

const date1: string = '2022-04-06';
const date2: string = '2022-04-07';

const ratesList: RatesListInterface = {
  [date1]: {
    AUD: 1.321,
    CAD: 1.249,
    EUR: 0.915,
    GBP: 0.764,
    USD: 1,
  },
  [date2]: {
    AUD: 1.31,
    CAD: 1.244,
    EUR: 0.911,
    GBP: 0.761,
    USD: 1,
  },
};

const rates: RatesListInterface = {};

// Modify rates value with toFixed
Object.entries(ratesList).forEach(([key, value]: [string, RatesInterface]) => {
  const ratesModifiedWithToFixed = modifyWithToFixed(
    value,
    TO_FIXED_DEFAULT_VALUE
  );

  rates[key] = ratesModifiedWithToFixed;
});

const ratesByDate: RatesInterface = rates[date1];

describe('modifyRates', () => {
  it('should modify rates only with toFixed', () => {
    expect(modifyRates({ rates: ratesByDate })).toEqual(ratesByDate);
  });

  it('should modify timeseries rates only with toFixed', () => {
    expect(modifyRates({ rates, isTimeseries: true })).toEqual(rates);
  });

  it('should modify rates with default base only with toFixed', () => {
    expect(modifyRates({ rates: ratesByDate, base: DEFAULT_BASE })).toEqual(
      ratesByDate
    );
  });

  it('should modify timeseries rates with default base only with toFixed', () => {
    expect(
      modifyRates({ rates, base: DEFAULT_BASE, isTimeseries: true })
    ).toEqual(rates);
  });

  it('should modify rates only with base and toFixed', () => {
    const base: string = 'EUR';
    const modifiedWithBase: RatesInterface = modifyWithBase(base, ratesByDate);
    const modifiedWithToFixed: RatesInterface = modifyWithToFixed(
      modifiedWithBase,
      TO_FIXED_DEFAULT_VALUE
    );

    expect(modifyRates({ rates: ratesByDate, base })).toEqual(
      modifiedWithToFixed
    );
  });

  it('should modify timeseries rates only with base and toFixed', () => {
    const base: string = 'EUR';
    const output: RatesListInterface = {};

    Object.entries(rates).forEach(([key, value]: [string, RatesInterface]) => {
      const ratesModifiedWithBase: RatesInterface = modifyWithBase(base, value);
      const ratesModifiedWithToFixed: RatesInterface = modifyWithToFixed(
        ratesModifiedWithBase,
        TO_FIXED_DEFAULT_VALUE
      );

      output[key] = ratesModifiedWithToFixed;
    });

    expect(modifyRates({ rates, base, isTimeseries: true })).toEqual(output);
  });

  it('should modify rates only with symbols and toFixed', () => {
    const symbols: string = 'EUR USD';
    const modifiedWithSymbols: RatesInterface = modifyWithSymbols(
      symbols,
      ratesByDate
    );

    expect(modifyRates({ rates: ratesByDate, symbols })).toEqual(
      modifiedWithSymbols
    );
  });

  it('should modify timeseries rates only with symbols and toFixed', () => {
    const symbols: string = 'EUR,USD';
    const output: RatesListInterface = {};

    Object.entries(rates).forEach(([key, value]: [string, RatesInterface]) => {
      output[key] = modifyWithSymbols(symbols, value);
    });

    expect(modifyRates({ rates, symbols, isTimeseries: true })).toEqual(output);
  });

  it('should modify rates only with amount and toFixed', () => {
    const amount: number = 5;
    const modifiedWithAmount: RatesInterface = modifyWithAmount(
      amount,
      ratesByDate
    );
    const modifiedWithToFixed: RatesInterface = modifyWithToFixed(
      modifiedWithAmount,
      TO_FIXED_DEFAULT_VALUE
    );

    expect(modifyRates({ rates: ratesByDate, amount })).toEqual(
      modifiedWithToFixed
    );
  });

  it('should modify timeseries rates only with amount and toFixed', () => {
    const amount: number = 5;
    const output: RatesListInterface = {};

    Object.entries(rates).forEach(([key, value]: [string, RatesInterface]) => {
      const modifiedWithAmount: RatesInterface = modifyWithAmount(
        amount,
        value
      );
      const modifiedWithToFixed: RatesInterface = modifyWithToFixed(
        modifiedWithAmount,
        TO_FIXED_DEFAULT_VALUE
      );

      output[key] = modifiedWithToFixed;
    });

    expect(modifyRates({ rates, amount, isTimeseries: true })).toEqual(output);
  });

  it('should modify rates with each argument', () => {
    const base: string = 'EUR';
    const symbols: string = 'AUD CAD USD EUR';
    const amount: number = 5;

    const modifiedWithBase: RatesInterface = modifyWithBase(base, ratesByDate);
    const modifiedWithSymbols: RatesInterface = modifyWithSymbols(
      symbols,
      modifiedWithBase
    );
    const modifiedWithAmount: RatesInterface = modifyWithAmount(
      amount,
      modifiedWithSymbols
    );
    const modifiedWithToFixed: RatesInterface = modifyWithToFixed(
      modifiedWithAmount,
      TO_FIXED_DEFAULT_VALUE
    );

    expect(modifyRates({ rates: ratesByDate, base, symbols, amount })).toEqual(
      modifiedWithToFixed
    );
  });

  it('should modify timeseries rates with each argument', () => {
    const base: string = 'EUR';
    const symbols: string = 'AUD CAD USD EUR';
    const amount: number = 5;

    const output: RatesListInterface = {};

    Object.entries(rates).forEach(([key, value]: [string, RatesInterface]) => {
      const modifiedWithBase: RatesInterface = modifyWithBase(base, value);
      const modifiedWithSymbols: RatesInterface = modifyWithSymbols(
        symbols,
        modifiedWithBase
      );
      const modifiedWithAmount: RatesInterface = modifyWithAmount(
        amount,
        modifiedWithSymbols
      );
      const modifiedWithToFixed: RatesInterface = modifyWithToFixed(
        modifiedWithAmount,
        TO_FIXED_DEFAULT_VALUE
      );

      output[key] = modifiedWithToFixed;
    });

    expect(
      modifyRates({ rates, base, symbols, amount, isTimeseries: true })
    ).toEqual(output);
  });
});
