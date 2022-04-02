import { ratesType } from '../../typescript/types';
import modifyWithAmount from '.';

const input: ratesType = {
  USD: 1.1051,
  AUD: 1.5055,
  CAD: 1.3998,
  GBP: 0.84315,
  EUR: 1,
};

describe('modifyWithAmount', () => {
  it('should return a correct result', () => {
    const amount: number = 3;

    const result: ratesType = {};
    Object.entries(input).forEach(([key, value]) => {
      result[key] = value * amount;
    });

    expect(modifyWithAmount(amount, input)).toEqual(result);
  });
});
