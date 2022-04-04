import { XMLToObject, doFetch } from '../utills/index';

const getLatestData = (list = {}) => {
  const rates = {};

  const date = list['gesmes:Envelope'].Cube.Cube._attributes.time;

  const exchangeRates = list['gesmes:Envelope'].Cube.Cube.Cube;

  exchangeRates.forEach((item) => {
    const { currency, rate } = item._attributes;

    rates[currency] = +rate;
  });

  return { rates, date };
};

const getHistoricalData = (list = {}) => {
  const rates = {};

  const exchangeRates = list['gesmes:Envelope'].Cube.Cube;

  exchangeRates.forEach((item) => {
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
  #defaultBase;

  #latestURL;

  #historicalURL;

  constructor() {
    this.#defaultBase = 'EUR';
    this.#latestURL =
      'https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml';
    this.#historicalURL =
      'https://www.ecb.europa.eu/stats/eurofxref/eurofxref-hist.xml';
  }

  get defaultBase() {
    return this.#defaultBase;
  }

  async #getExchangeRates(type = '') {
    const isLatest = type === 'latest';

    const URL = isLatest ? this.#latestURL : this.#historicalURL;

    const exchangeRatesXML = await doFetch(URL);
    const exchangeRatesObject = XMLToObject(exchangeRatesXML);

    if (isLatest) {
      return getLatestData(exchangeRatesObject);
    }

    return getHistoricalData(exchangeRatesObject);
  }

  async latest() {
    const exchangeRates = await this.#getExchangeRates('latest');

    return exchangeRates;
  }

  async historical() {
    const exchangeRates = await this.#getExchangeRates('historical');

    return exchangeRates;
  }
}

export default new BankAPIService();
