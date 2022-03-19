import BankAPIService from '../services/BankAPIService';

import {
  modifyWithBase,
  sortObjectAlphabetically,
  modifyWithSymbols,
  modifyWithAmount,
} from '../utills';

export const latest = async (req, res) => {
  const { base, symbols, amount } = req.query;

  const { rates, date } = await BankAPIService.latest();

  const modifiedWithBase = modifyWithBase(base, rates);

  const modifiedWithSymbols = modifyWithSymbols(symbols, modifiedWithBase);

  const paramAmount = amount ? +amount : 1;

  const modifiedWithAmount = modifyWithAmount(paramAmount, modifiedWithSymbols);

  const sortedByAlphabetically = sortObjectAlphabetically(modifiedWithAmount);

  return res.json({ rates: sortedByAlphabetically, date });
};
