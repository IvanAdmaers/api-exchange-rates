import { Endpoint } from '../../typescript/objects';
import defineEndpoint from '.';

const { Latest, Historical, Timeseries } = Endpoint;

describe('defineEndpoint', () => {
  it(`should return a correct endpoint for ${Latest}`, () => {
    expect(defineEndpoint({})).toBe(Latest);
  });

  it(`should return a correct endpoint for ${Historical}`, () => {
    expect(defineEndpoint({ date: new Date() })).toBe(Historical);
  });

  it(`should return a correct endpoint for ${Timeseries}`, () => {
    expect(defineEndpoint({ startDate: new Date(), endDate: new Date() })).toBe(
      Timeseries
    );
  });
});
