import modifyWithSymbols from './index.js';

const input = {
  USD: 1.1051,
  AUD: 1.5055,
  CAD: 1.3998,
  GBP: 0.84315,
  EUR: 1,
};

describe('modifyWithSymbols', () => {
  it('should modify nothing if there are no symbols', () => {
    const symbols = null;

    expect(modifyWithSymbols(symbols, input)).toEqual(input);
  });

  it('should return only currencies with correct symbols', () => {
    const symbols = [
      ...Object.keys(input),
      'I_DOESNT_EXIST',
      'I_DOESNT_EXIST_2',
    ].join(',');

    expect(modifyWithSymbols(symbols, input)).toEqual(input);
  });

  it('should return input data if there are no currencies sorted by symbols', () => {
    const symbols = 'none';

    expect(modifyWithSymbols(symbols, input)).toEqual(input);
  });

  it('should return a correct result', () => {
    const symbols = 'USD,CAD';

    const symbolsArray = symbols.split(',');
    const result = {};
    symbolsArray.forEach((key) => {
      result[key] = input[key];
    });

    expect(modifyWithSymbols(symbols, input)).toEqual(result);
  });
});
