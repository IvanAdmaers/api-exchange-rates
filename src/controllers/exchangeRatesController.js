import {
  modifyWithBase,
  sortObjectAlphabetically,
  modifyWithSymbols,
  modifyWithAmount,
} from '../utills';

import ratesList from '../cache/rates.json';

const latestDateKey = Object.keys(ratesList)[0];

export const latest = async (req, res) => {
  const { base, symbols, amount } = req.query;

  const rates = ratesList[latestDateKey];

  const modifiedWithBase = modifyWithBase(base, rates);

  const modifiedWithSymbols = modifyWithSymbols(symbols, modifiedWithBase);

  const paramAmount = amount ? +amount : 1;

  const modifiedWithAmount = modifyWithAmount(paramAmount, modifiedWithSymbols);

  const sortedByAlphabetically = sortObjectAlphabetically(modifiedWithAmount);

  return res.json({ rates: sortedByAlphabetically, date: latestDateKey });
};
