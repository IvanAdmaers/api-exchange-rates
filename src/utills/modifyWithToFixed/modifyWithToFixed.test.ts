import { RatesInterface } from '../../typescript/interfaces';
import modifyWithToFixed from '.';

const input: RatesInterface = {
  USD: 1,
  EUR: 0.904,
  AUD: 1.329,
  CAD: 1.249,
  GBP: 0.761,
};

describe('modifyWithToFixed', () => {
  it('should return a correct result', () => {
    const toFixedValue: number = 1;

    const output: RatesInterface = {
      USD: 1,
      EUR: 0.9,
      AUD: 1.3,
      CAD: 1.2,
      GBP: 0.8,
    };

    expect(modifyWithToFixed(input, toFixedValue)).toEqual(output);
  });
});
