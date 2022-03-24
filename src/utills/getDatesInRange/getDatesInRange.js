/**
 * This function gets dates in a range
 * 
 * @param {string} start - Start date
 * @param {string} end - End date
 * @returns {Array} Dates in a range
 */
const getDatesInRange = (start, end) => {
  const startDate = new Date(start);
  const endDate = new Date(end);

  const date = new Date(startDate.getTime());

  const dates = [];

  while (date <= endDate) {
    dates.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }

  return dates;
};

export default getDatesInRange;
