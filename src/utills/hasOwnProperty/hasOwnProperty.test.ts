import hasOwnProperty from './hasOwnProperty';

const object = {
  name: 'John',
  get userName(): string {
    return object.name;
  },
  set setUserName(name: string) {
    object.name = name;
  },
};

describe('hasOwnProperty', () => {
  it('should return true for an existing property', () => {
    expect(hasOwnProperty(object, 'name')).toBe(true);
  });

  it('should return true for a getter', () => {
    expect(hasOwnProperty(object, 'userName')).toBe(true);
  });

  it('should return true for a setter', () => {
    expect(hasOwnProperty(object, 'setUserName')).toBe(true);
  });

  it('should return false for a non-existent property', () => {
    expect(hasOwnProperty(object, 'property_that_doesnt_exist')).toBe(false);
  });

  it('should return false for a reference to the Object constructor', () => {
    expect(hasOwnProperty(object, 'constructor')).toBe(false);
  });
});
