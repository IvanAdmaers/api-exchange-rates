const sortObjectAlphabetically = (data = {}) => {
  const result = {};

  const keys = Object.keys(data);
  const sorted = keys.sort();

  sorted.forEach((key) => {
    result[key] = data[key];
  });

  return result;
};

export default sortObjectAlphabetically;
