import { EndpointObject } from '../../typescript/objects';
import defineEndpoint from '.';

const { Latest, Historical, Timeseries } = EndpointObject;

const date = new Date().toString();

describe('defineEndpoint', () => {
  it(`should return a correct endpoint for ${Latest}`, () => {
    expect(defineEndpoint({})).toBe(Latest);
  });

  it(`should return a correct endpoint for ${Historical}`, () => {
    expect(defineEndpoint({ date })).toBe(Historical);
  });

  it(`should return a correct endpoint for ${Timeseries}`, () => {
    expect(defineEndpoint({ startDate: date, endDate: date })).toBe(Timeseries);
  });
});
