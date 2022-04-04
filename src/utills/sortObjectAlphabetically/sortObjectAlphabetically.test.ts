import sortObjectAlphabetically from '.';

describe('sortObjectAlphabetically', () => {
  it('should return a correct result', () => {
    const object: object = { c: 3, b: 2, a: 1 };
    const correctly: object = { a: 1, b: 2, c: 3 };

    expect(sortObjectAlphabetically(object)).toEqual(correctly);
  });

  it('should return a correct result when some of keys are a number', () => {
    const object: object = { 4: 'number', c: 3, b: 2, a: 1 };
    const correctly: object = { 4: 'number', a: 1, b: 2, c: 3 };

    expect(sortObjectAlphabetically(object)).toEqual(correctly);
  });
});
