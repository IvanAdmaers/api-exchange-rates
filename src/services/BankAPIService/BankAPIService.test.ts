import BankAPIService from '.';

const getMockRatesString = (historical?: boolean): string => `
<?xml version="1.0" encoding="UTF-8"?>
<gesmes:Envelope xmlns:gesmes="http://www.gesmes.org/xml/2002-08-01" xmlns="http://www.ecb.int/vocabulary/2002-08-01/eurofxref">
	<gesmes:subject>Reference rates</gesmes:subject>
	<gesmes:Sender>
		<gesmes:name>European Central Bank</gesmes:name>
	</gesmes:Sender>
	<Cube>
		<Cube time='2022-04-08'>
			<Cube currency='USD' rate='1.0861'/>
			<Cube currency='GBP' rate='0.83355'/>
			<Cube currency='AUD' rate='1.4552'/>
			<Cube currency='CAD' rate='1.3675'/>
		</Cube>
  ${
    historical
      ? `
  <Cube time="2022-04-07">
    <Cube currency='USD' rate='1.0961'/>
    <Cube currency='GBP' rate='0.8345'/>
    <Cube currency='AUD' rate='1.4578'/>
    <Cube currency='CAD' rate='1.3704'/>
  </Cube>
  `
      : ''
  }
  </Cube>
</gesmes:Envelope>
`;

jest.mock('../../libs', () => ({
  doFetch: jest
    .fn()
    .mockImplementationOnce(() => Promise.resolve(getMockRatesString()))
    .mockImplementationOnce(() => Promise.resolve(getMockRatesString(true))),
}));

const getExpectedRates = (historical?: boolean): object =>
  historical
    ? {
        '2022-04-08': { USD: 1.0861, GBP: 0.83355, AUD: 1.4552, CAD: 1.3675 },
        '2022-04-07': { USD: 1.0961, GBP: 0.8345, AUD: 1.4578, CAD: 1.3704 },
      }
    : {
        rates: { USD: 1.0861, GBP: 0.83355, AUD: 1.4552, CAD: 1.3675 },
        date: '2022-04-08',
      };

describe('BankAPIService', () => {
  it('should return a base', () => {
    const base: string = BankAPIService.getBase();

    expect(typeof base).toBe('string');
  });

  it('should return latest rates', async () => {
    const rates: object = await BankAPIService.latest();

    expect(rates).toEqual(getExpectedRates());
  });

  it('should return historical rates', async () => {
    const rates: object = await BankAPIService.historical();

    expect(rates).toEqual(getExpectedRates(true));
  });
});
