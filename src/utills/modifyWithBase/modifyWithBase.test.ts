import { RatesInterface } from '../../typescript/interfaces';
import modifyWithBase from '.';
import { DEFAULT_BASE } from '../../constants';

const input: RatesInterface = {
  USD: 1,
  EUR: 0.911,
  AUD: 1.33,
  CAD: 1.249,
  GBP: 0.762,
};

describe('modifyWithBase', () => {
  it('should not modify anything', () => {
    expect(modifyWithBase(DEFAULT_BASE, input)).toEqual(input);
  });

  it('should modify rates by dividing a currency value by a current base value', () => {
    const base: string = 'EUR';

    const baseValue: number = input[base];
    const output: RatesInterface = {};

    Object.entries(input).forEach(([key, value]: [string, number]) => {
      if (key === base) {
        output[key] = 1;
        return;
      }

      output[key] = value / baseValue;
    });

    expect(modifyWithBase(base, input)).toEqual(output);
  });

  it(`should throw and error when base doesn't exist`, () => {
    expect(() => {
      modifyWithBase('BASE_THAT_DOESNT_EXIST', input);
    }).toThrow();
  });
});
