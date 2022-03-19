import fetch from 'node-fetch';

const doFetch = async (url = '') => {
  const req = await fetch(url);
  const res = await req.text();

  return res;
};

export default doFetch;
