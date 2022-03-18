import sortObjectAlphabetically from './index.js';

describe('sortObjectAlphabetically', () => {
  it('should return a correct result', () => {
    const object = { c: 3, b: 2, a: 1 };
    const correctly = { a: 1, b: 2, c: 3 };

    expect(sortObjectAlphabetically(object)).toEqual(correctly);
  });
});
