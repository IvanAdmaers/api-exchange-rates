import isProduction from '.';

describe('isProduction', () => {
  const envName = 'NODE_ENV';
  const initialEnv = process.env[envName];

  afterEach(() => {
    process.env[envName] = initialEnv;
  });

  it('should return true when we are in production', () => {
    process.env[envName] = 'production';

    expect(isProduction()).toBe(true);
  });

  it('should return false when we are not in production', () => {
    expect(isProduction()).toBe(false);
  });
});
