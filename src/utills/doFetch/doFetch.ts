import fetch from 'node-fetch';

const doFetch = async (url: string) => {
  const req = await fetch(url);
  const res = await req.text();

  return res;
};

export default doFetch;
