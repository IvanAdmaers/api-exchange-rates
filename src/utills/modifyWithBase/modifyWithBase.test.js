import modifyWithBase from '.';
import { defaultBase } from '../../constants';

const input = {
  USD: 1.1051,
  AUD: 1.5055,
  CAD: 1.3998,
  GBP: 0.84315,
};

describe('modifyWithBase', () => {
  it(`should add default base value and dont't do anything else if there is no current base`, () => {
    const output = { ...input, [defaultBase]: 1 };

    expect(modifyWithBase(defaultBase, input)).toEqual(output);
  });

  it('should modify rates by dividing a currency value by a current base value', () => {
    const base = 'USD';

    const baseValue = input[base];
    const output = {};

    Object.entries(input).forEach(([key, value]) => {
      if (key === base) {
        output[key] = 1;
        return;
      }

      output[key] = value / baseValue;
    });

    output[defaultBase] = 1 / baseValue;

    expect(modifyWithBase(base, input)).toEqual(output);
  });

  it(`should change nothing if a base doesn't exist`, () => {
    const output = { ...input, [defaultBase]: 1 };

    expect(modifyWithBase('I_DONT_EXIST', input)).toEqual(output);
  });
});
