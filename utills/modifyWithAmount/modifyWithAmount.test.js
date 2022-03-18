import modifyWithAmount from './index.js';

const input = {
  USD: 1.1051,
  AUD: 1.5055,
  CAD: 1.3998,
  GBP: 0.84315,
  EUR: 1,
};

describe('modifyWithAmount', () => {
  it('should return a correct result', () => {
    const amount = 3;

    const result = {};
    Object.entries(input).forEach(([key, value]) => {
      result[key] = value * amount;
    });

    expect(modifyWithAmount(amount, input)).toEqual(result);
  });
});
