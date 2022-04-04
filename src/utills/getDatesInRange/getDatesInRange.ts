/**
 * This function gets dates in a range inclusive
 */
const getDatesInRange = (startDate: Date, endDate: Date) => {
  const date: Date = new Date(startDate.getTime());

  const dates: Array<Date> = [];

  while (date <= endDate) {
    dates.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }

  return dates;
};

export default getDatesInRange;
