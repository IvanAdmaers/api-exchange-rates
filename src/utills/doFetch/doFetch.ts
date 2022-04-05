import fetch from 'node-fetch';

/**
 * This function does fetch
 */
const doFetch = async (url: string): Promise<string> => {
  const req = await fetch(url);
  const res = await req.text();

  return res;
};

export default doFetch;
