import { RatesInterface } from '../../typescript/interfaces';
import modifyWithSymbols from '.';

const input: RatesInterface = {
  USD: 1.1051,
  AUD: 1.5055,
  CAD: 1.3998,
  GBP: 0.84315,
  EUR: 1,
};

describe('modifyWithSymbols', () => {
  it('should modify nothing if there are no symbols', () => {
    const symbols: null = null;

    expect(modifyWithSymbols(symbols, input)).toEqual(input);
  });

  it('should return only currencies with correct symbols', () => {
    const symbols: string = [
      ...Object.keys(input),
      'I_DOESNT_EXIST',
      'I_DOESNT_EXIST_2',
    ].join(',');

    expect(modifyWithSymbols(symbols, input)).toEqual(input);
  });

  it('should return input data if there are no currencies sorted by symbols', () => {
    const symbols: 'none' = 'none';

    expect(modifyWithSymbols(symbols, input)).toEqual(input);
  });

  it('should return a correct result', () => {
    const symbols: 'USD,CAD' = 'USD,CAD';

    const symbolsArray: string[] = symbols.split(',');
    const result: RatesInterface = {};
    symbolsArray.forEach((key) => {
      result[key] = input[key];
    });

    expect(modifyWithSymbols(symbols, input)).toEqual(result);
  });
});
