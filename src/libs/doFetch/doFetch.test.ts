import doFetch from '.';

const returnValue = 'lol';

jest.mock('node-fetch', () =>
  jest.fn(() =>
    Promise.resolve({
      text: () => Promise.resolve(returnValue),
    })
  )
);

describe('doFetch', () => {
  it('fetch-mock test', async () => {
    const result = await doFetch('/');

    expect(result).toBe(returnValue);
  });
});
