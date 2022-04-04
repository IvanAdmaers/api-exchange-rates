/**
 * This function sort an object alphabetically
 */
const sortObjectAlphabetically = (data: object): object => {
  const result: object = {};

  const keys: Array<string> = Object.keys(data);
  const sorted: Array<string> = keys.sort();

  sorted.forEach((key: string) => {
    result[key] = data[key];
  });

  return result;
};

export default sortObjectAlphabetically;
