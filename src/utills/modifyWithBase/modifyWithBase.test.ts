import { ratesType } from '../../typescript/types';
import modifyWithBase from '.';
import { DEFAULT_BASE } from '../../constants';

const input: ratesType = {
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
    const output: ratesType = {};

    Object.entries(input).forEach(([key, value]: [string, number]) => {
      if (key === base) {
        output[key] = 1;
        return;
      }

      output[key] = value / baseValue;
    });

    expect(modifyWithBase(base, input)).toEqual(output);
  });

  it(`should change nothing if a base doesn't exist`, () => {
    expect(modifyWithBase('I_DONT_EXIST', input)).toEqual(input);
  });
});
