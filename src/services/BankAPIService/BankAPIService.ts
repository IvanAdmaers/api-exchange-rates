import {
  RatesInterface,
  RatesListInterface,
} from '../../typescript/interfaces';
import { XMLToObject, doFetch } from '../../utills';

interface GetLatestDataInterface {
  rates: RatesInterface;
  date: string;
}

type RatesItemType = {
  _attributes: {
    currency: string;
    rate: string;
  };
};

const getLatestData = (list: object): GetLatestDataInterface => {
  const rates: RatesInterface = {};

  const date: string = list['gesmes:Envelope'].Cube.Cube._attributes.time;

  const exchangeRates: Array<object> = list['gesmes:Envelope'].Cube.Cube.Cube;

  exchangeRates.forEach((item: RatesItemType) => {
    const { currency, rate } = item._attributes;

    rates[currency] = +rate;
  });

  return { rates, date };
};

const getHistoricalData = (list: object): RatesListInterface => {
  const rates: RatesListInterface = {};

  const exchangeRates: Array<object> = list['gesmes:Envelope'].Cube.Cube;

  type ItemType = {
    _attributes: {
      time: string;
    };
    Cube: Array<RatesItemType>;
  };

  exchangeRates.forEach((item: ItemType) => {
    const { _attributes, Cube } = item;
    const { time } = _attributes;

    rates[time] = {};

    Cube.forEach((rateItem) => {
      const { currency, rate } = rateItem._attributes;

      rates[time][currency] = +rate;
    });
  });

  return rates;
};

class BankAPIService {
  private readonly base: string = 'EUR';

  private readonly latestURL: string =
    'https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml';

  private readonly historicalURL: string =
    'https://www.ecb.europa.eu/stats/eurofxref/eurofxref-hist.xml';

  public getBase(): string {
    return this.base;
  }

  private async getExchangeRates(
    type: 'latest' | 'historical'
  ): Promise<GetLatestDataInterface | RatesListInterface> {
    const isLatest: boolean = type === 'latest';

    const URL: string = isLatest ? this.latestURL : this.historicalURL;

    const exchangeRatesXML: string = await doFetch(URL);
    const exchangeRatesObject: object = XMLToObject(exchangeRatesXML);

    if (isLatest) {
      return getLatestData(exchangeRatesObject);
    }

    return getHistoricalData(exchangeRatesObject);
  }

  public async latest(): Promise<GetLatestDataInterface> {
    const exchangeRates = (await this.getExchangeRates(
      'latest'
    )) as GetLatestDataInterface;

    return exchangeRates;
  }

  public async historical(): Promise<RatesListInterface> {
    const exchangeRates: RatesListInterface = (await this.getExchangeRates(
      'historical'
    )) as RatesListInterface;

    return exchangeRates;
  }
}

export default new BankAPIService();
